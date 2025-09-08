import { NextRequest, NextResponse } from 'next/server';
import { stripe } from '@/lib/stripe';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';
export const revalidate = 0;

function badRequest(message: string) {
  return NextResponse.json({ error: message }, { status: 400 });
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const sessionId = searchParams.get('session_id');

  if (!sessionId) return badRequest('session_id is required');
  if (!/^cs_(test|live)_[A-Za-z0-9]+$/.test(sessionId)) {
    return badRequest('invalid session_id format');
  }

  try {
    if (!stripe) {
      throw new Error('Stripe not initialized');
    }
    
    const session = await stripe.checkout.sessions.retrieve(sessionId, {
      expand: ['customer', 'subscription', 'line_items.data.price.product'],
    });

    const status = (session.status as string) ?? 'open';
    const paymentStatus = (session.payment_status as string) ?? 'unpaid';
    const isComplete = status === 'complete';
    const isPaid =
      paymentStatus === 'paid' || paymentStatus === 'no_payment_required';

    const meta = (session.metadata ?? {}) as Record<string, string | undefined>;
    const tenantSlug = meta.tenantSlug ?? null;
    const plan = meta.plan ?? null;

    const li = session.line_items?.data?.[0];
    const priceId = (li?.price?.id ?? null) as string | null;
    const productId = (
      li?.price?.product && typeof li.price.product === 'object'
        ? li.price.product.id
        : null
    ) as string | null;

    const subscriptionId =
      typeof session.subscription === 'string'
        ? session.subscription
        : (session.subscription?.id ?? null);

    const rawEmail =
      session.customer_details?.email ||
      (typeof session.customer === 'object' && session.customer && 'email' in session.customer
        ? (session.customer.email ?? null)
        : null);
    const customerEmail = rawEmail?.trim().toLowerCase() ?? null;

    const nextPath = tenantSlug
      ? `/${tenantSlug}/dashboard/configuracoes`
      : '/onboarding';

    const res = NextResponse.json({
      ok: true,
      sessionId: session.id,
      mode: session.mode,
      status,
      paymentStatus,
      isComplete,
      isPaid,
      customerEmail,
      tenantSlug,
      plan,
      priceId,
      productId,
      subscriptionId,
      amountTotal: session.amount_total,
      currency: session.currency,
      nextPath,
      created: session.created,
    });
    res.headers.set(
      'Cache-Control',
      'no-store, no-cache, must-revalidate, proxy-revalidate'
    );
    res.headers.set('Pragma', 'no-cache');
    res.headers.set('Expires', '0');
    return res;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    const code = err?.raw?.code || err?.code;
    const type = err?.raw?.type || err?.type;
    const message = err?.message || 'Failed to retrieve session';
    const status = typeof err?.statusCode === 'number' ? err.statusCode : 400;

    return NextResponse.json({ error: message, code, type }, { status });
  }
}
