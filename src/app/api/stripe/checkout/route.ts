// src/app/api/stripe/checkout/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { headers } from 'next/headers';
import { stripe } from '@/lib/stripe';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic'; // evita cache em serverless

// Mapeia os prices por plano a partir das ENVs (defina na Vercel)
const PRICE_BY_PLAN: Record<string, string | undefined> = {
  starter: process.env.STRIPE_PRICE_STARTER,
  professional: process.env.STRIPE_PRICE_PROF,
  enterprise: process.env.STRIPE_PRICE_ENT,
};

type Body = {
  plan: 'starter' | 'professional' | 'enterprise';
  tenantSlug: string;
  userEmail: string;
};

export async function POST(request: NextRequest) {
  try {
    if (!stripe) {
      return NextResponse.json(
        { error: 'Stripe não configurado' },
        { status: 500 }
      );
    }

    const body = (await request.json()) as Partial<Body>;
    const plan = body?.plan ?? 'starter';
    const tenantSlug = body?.tenantSlug;
    const userEmail = body?.userEmail;

    // Validações básicas
    if (!PRICE_BY_PLAN[plan]) {
      return NextResponse.json({ error: 'Plano inválido' }, { status: 400 });
    }
    if (!tenantSlug || !userEmail) {
      return NextResponse.json(
        { error: 'Dados obrigatórios ausentes' },
        { status: 400 }
      );
    }

    // Resolve a origem para URLs de retorno
    const hdr = await headers();
    const origin =
      process.env.NEXT_PUBLIC_APP_URL ??
      process.env.APP_URL ??
      hdr.get('origin') ??
      'http://localhost:3000';

    // Busca ou cria o cliente por e-mail
    const { data: found } = await stripe.customers.list({
      email: userEmail,
      limit: 1,
    });
    const customer =
      found[0] ??
      (await stripe.customers.create({
        email: userEmail,
        metadata: { tenantSlug, plan },
      }));

    const priceId = PRICE_BY_PLAN[plan]!;

    // Cria a sessão de checkout
    const session = await stripe.checkout.sessions.create({
      customer: customer.id,
      mode: 'subscription', // use 'payment' se for cobrança única
      line_items: [{ price: priceId, quantity: 1 }],
      allow_promotion_codes: true,
      billing_address_collection: 'required',
      customer_update: { address: 'auto', name: 'auto' },
      subscription_data: {
        trial_period_days: 14,
        metadata: { tenantSlug, plan },
      },
      metadata: { tenantSlug, plan, userEmail },
      success_url: `${origin}/onboarding?session_id={CHECKOUT_SESSION_ID}&tenant=${tenantSlug}`,
      cancel_url: `${origin}/pricing?canceled=true`,
    });

    if (!session.url) {
      return NextResponse.json(
        { error: 'Falha ao gerar URL de checkout' },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { sessionId: session.id, url: session.url },
      { status: 200 }
    );
  } catch (err: any) {
    // Log detalhado aparece nos logs do deployment
    console.error('Stripe Checkout error:', {
      message: err?.message,
      type: err?.type,
      code: err?.code,
      status: err?.statusCode,
      raw: err?.raw,
    });

    // Resposta genérica para o client
    return NextResponse.json(
      { error: 'Erro interno' },
      { status: err?.statusCode ?? 500 }
    );
  }
}
