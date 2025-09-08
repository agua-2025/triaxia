// Webhook Stripe — cria/atualiza tenant e dispara e-mail de ativação
export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

import { headers } from 'next/headers';
import Stripe from 'stripe';
import { PrismaClient } from '@prisma/client';
import { sendActivationEmail } from '@/lib/email/activation-email';
// Se já existe esse serviço no teu projeto, ok. Se não, crie-o conforme você já vinha usando:
import { createActivationToken } from '@/lib/auth/activation-service';

const prisma =
  (globalThis as any).prisma ??
  new PrismaClient({
    log: process.env.NODE_ENV === 'development' ? ['error', 'warn'] : ['error'],
  });
if (process.env.NODE_ENV !== 'production') (globalThis as any).prisma = prisma;

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2025-08-27.basil',
});

export async function POST(req: Request) {
  try {
    const body = await req.text();
    const h = await headers();
    const sig = h.get('stripe-signature') ?? '';
    const secret = process.env.STRIPE_WEBHOOK_SECRET;
    if (!secret)
      return new Response('Missing STRIPE_WEBHOOK_SECRET', { status: 500 });

    // Em dev, se não veio assinatura (ex.: testes manuais), aceita JSON puro
    let event: Stripe.Event;
    if (process.env.NODE_ENV === 'development' && !sig) {
      event = JSON.parse(body);
    } else {
      event = stripe.webhooks.constructEvent(body, sig, secret);
    }

    // Idempotência (não processa duas vezes)
    const already = await prisma.webhookEvent.findUnique({
      where: { id: event.id },
    });
    if (already) {
      return Response.json(
        { received: true, duplicate: true },
        { status: 200 }
      );
    }

    switch (event.type) {
      case 'checkout.session.completed': {
        const session = event.data.object as Stripe.Checkout.Session;
        await handleCheckoutCompleted(session);
        break;
      }

      case 'customer.subscription.created': {
        const sub = event.data.object as Stripe.Subscription;
        await handleSubscriptionCreated(sub);
        break;
      }

      case 'customer.subscription.updated': {
        const sub = event.data.object as Stripe.Subscription;
        await handleSubscriptionUpdated(sub);
        break;
      }

      case 'customer.subscription.deleted': {
        const sub = event.data.object as Stripe.Subscription;
        await handleSubscriptionDeleted(sub);
        break;
      }

      case 'invoice.payment_succeeded': {
        const inv = event.data.object as Stripe.Invoice;
        await handlePaymentSucceeded(inv);
        break;
      }

      case 'invoice.payment_failed': {
        const inv = event.data.object as Stripe.Invoice;
        await handlePaymentFailed(inv);
        break;
      }

      default:
        // ignore outros
        break;
    }

    // Marca idempotência
    await prisma.webhookEvent.create({
      data: { id: event.id, type: event.type },
    });

    return Response.json({ received: true }, { status: 200 });
  } catch (err: any) {
    console.error('[WEBHOOK] Error:', err?.message || err);
    return new Response(`Webhook Error: ${err?.message || 'unknown'}`, {
      status: 400,
    });
  }
}

// ---------- helpers de negócio ----------

async function handleCheckoutCompleted(session: Stripe.Checkout.Session) {
  // Metadados enviados na criação da session pelo teu endpoint /api/stripe/checkout
  const tenantSlug = session.metadata?.tenantSlug;
  const plan = session.metadata?.plan || 'starter';

  // Detecta e-mail de forma robusta
  const email =
    session.customer_details?.email ??
    (typeof session.customer === 'string'
      ? (async () => {
          const customer = await stripe.customers.retrieve(session.customer as string);
          return 'email' in customer ? customer.email : undefined;
        })()
      : undefined) ??
    (session.metadata?.userEmail as string | undefined) ??
    process.env.DEBUG_EMAIL_TO;

  const resolvedEmail = await email;

  if (!tenantSlug) throw new Error('Missing tenantSlug in metadata');
  if (!resolvedEmail)
    console.warn(
      '[WEBHOOK] checkout.session.completed sem e-mail (usando fallback?)'
    );

  // status e trial (se quiser)
  const trialEndsAt =
    session.mode === 'subscription' && session.subscription
      ? null /* ajuste se quiser trial server-side */
      : null;
  const tenantStatus: 'active' | 'trial' = trialEndsAt ? 'trial' : 'active';

  const existing = await prisma.tenant.findUnique({
    where: { slug: tenantSlug },
  });
  const tenant = existing
    ? await prisma.tenant.update({
        where: { slug: tenantSlug },
        data: {
          plan,
          status: tenantStatus,
          customerId: String(session.customer),
          subscriptionId: (session.subscription as string) || null,
          trialEndsAt,
        },
      })
    : await prisma.tenant.create({
        data: {
          name: tenantSlug.charAt(0).toUpperCase() + tenantSlug.slice(1),
          slug: tenantSlug,
          domain: `${tenantSlug}.triaxia.com.br`,
          plan,
          status: tenantStatus,
          customerId: String(session.customer),
          subscriptionId: (session.subscription as string) || null,
          trialEndsAt,
          settings: {
            onboardingCompleted: false,
            setupStep: 'company_info',
          } as any,
        },
      });

  if (resolvedEmail) {
    // Cria user "pendente" e manda ativação
    const user = await prisma.user.upsert({
      where: { email_tenantId: { email: resolvedEmail, tenantId: tenant.id } },
      create: {
        email: resolvedEmail,
        name: resolvedEmail.split('@')[0],
        role: 'ADMIN',
        tenantId: tenant.id,
        isActive: false,
      },
      update: {},
    });

    const token = await createActivationToken({
      email: resolvedEmail,
      userId: user.id,
      tenantId: tenant.id,
      expiresInHours: 48,
      createdFromIp: 'stripe-webhook',
    });

    if (token) {
      await sendActivationEmail({
        email: resolvedEmail,
        name: user.name || resolvedEmail.split('@')[0],
        tenantName: tenant.name,
        tenantSlug: tenant.slug,
        activationToken: token,
        expiresInHours: 48,
      });
    } else {
      console.error('[WEBHOOK] Failed to create activation token for', resolvedEmail);
    }
  }
}

async function handleSubscriptionCreated(subscription: Stripe.Subscription) {
  const tenantSlug = subscription.metadata?.tenantSlug;
  if (!tenantSlug) return;
  await prisma.tenant.update({
    where: { slug: tenantSlug },
    data: {
      status: subscription.status === 'trialing' ? 'trial' : 'active',
      subscriptionId: subscription.id,
    },
  });
}

async function handleSubscriptionUpdated(subscription: Stripe.Subscription) {
  const tenantSlug = subscription.metadata?.tenantSlug;
  if (!tenantSlug) return;

  let status: 'active' | 'trial' | 'suspended' | 'cancelled';
  switch (subscription.status) {
    case 'active':
      status = 'active';
      break;
    case 'trialing':
      status = 'trial';
      break;
    case 'past_due':
      status = 'suspended';
      break;
    case 'canceled':
    case 'unpaid':
      status = 'cancelled';
      break;
    default:
      status = 'active';
  }

  await prisma.tenant.update({
    where: { slug: tenantSlug },
    data: {
      status,
      trialEndsAt: subscription.trial_end
        ? new Date(subscription.trial_end * 1000)
        : null,
    },
  });
}

async function handleSubscriptionDeleted(subscription: Stripe.Subscription) {
  const tenantSlug = subscription.metadata?.tenantSlug;
  if (!tenantSlug) return;
  await prisma.tenant.update({
    where: { slug: tenantSlug },
    data: { status: 'cancelled' },
  });
}

async function handlePaymentSucceeded(invoice: Stripe.Invoice) {
  const subId = (invoice as any).subscription as string | undefined;
  if (!subId) return;
  const sub = await stripe.subscriptions.retrieve(subId);
  const tenantSlug = sub.metadata?.tenantSlug;
  if (!tenantSlug) return;
  await prisma.tenant.update({
    where: { slug: tenantSlug },
    data: { status: 'active' },
  });
}

async function handlePaymentFailed(invoice: Stripe.Invoice) {
  const subId = (invoice as any).subscription as string | undefined;
  if (!subId) return;
  const sub = await stripe.subscriptions.retrieve(subId);
  const tenantSlug = sub.metadata?.tenantSlug;
  if (!tenantSlug) return;
  await prisma.tenant.update({
    where: { slug: tenantSlug },
    data: { status: 'suspended' },
  });
}
