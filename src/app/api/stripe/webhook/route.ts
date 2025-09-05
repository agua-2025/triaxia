// src/app/api/stripe/webhook/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { headers } from 'next/headers';
import Stripe from 'stripe';
import { stripe } from '@/lib/stripe';
import { PrismaClient } from '@prisma/client';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

// Prisma singleton (evita abrir várias conexões em serverless)
const prisma =
  (globalThis as any).prisma ??
  new PrismaClient({
    log: process.env.NODE_ENV === 'development' ? ['error', 'warn'] : ['error'],
  });
if (process.env.NODE_ENV !== 'production') (globalThis as any).prisma = prisma;

export async function POST(request: NextRequest) {
  if (!stripe) {
    return NextResponse.json({ error: 'Stripe não está configurado' }, { status: 500 });
  }
  if (!process.env.STRIPE_WEBHOOK_SECRET) {
    return NextResponse.json({ error: 'STRIPE_WEBHOOK_SECRET ausente' }, { status: 500 });
  }

  // Corpo cru (obrigatório para verificar assinatura)
  const body = await request.text();
  const signature = (await headers()).get('stripe-signature');
  if (!signature) {
    return NextResponse.json({ error: 'Assinatura do webhook não encontrada' }, { status: 400 });
  }

  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(body, signature, process.env.STRIPE_WEBHOOK_SECRET);
  } catch (err) {
    console.error('Webhook signature verification failed:', (err as any)?.message);
    return NextResponse.json({ error: 'Invalid signature' }, { status: 400 });
  }

  try {
    // Idempotência básica: não processe o mesmo evento duas vezes
    const already = await prisma.webhookEvent.findUnique({ where: { id: event.id } }).catch(() => null);
    if (!already) {
      await prisma.webhookEvent.create({
        data: { id: event.id, type: event.type }, // crie esse model simples: id (PK), type (string), createdAt
      });

      switch (event.type) {
        case 'checkout.session.completed': {
          await handleCheckoutCompleted(event.data.object as Stripe.Checkout.Session);
          break;
        }
        case 'customer.subscription.created': {
          await handleSubscriptionCreated(event.data.object as Stripe.Subscription);
          break;
        }
        case 'customer.subscription.updated': {
          await handleSubscriptionUpdated(event.data.object as Stripe.Subscription);
          break;
        }
        case 'customer.subscription.deleted': {
          await handleSubscriptionDeleted(event.data.object as Stripe.Subscription);
          break;
        }
        case 'invoice.payment_succeeded': {
          await handlePaymentSucceeded(event.data.object as Stripe.Invoice);
          break;
        }
        case 'invoice.payment_failed': {
          await handlePaymentFailed(event.data.object as Stripe.Invoice);
          break;
        }
        default: {
          // OK ignorar eventos não tratados
          // console.log(`Evento ignorado: ${event.type}`);
        }
      }
    }
    // Sempre responda 200 rapidamente; não bloqueie o Stripe
    return NextResponse.json({ received: true }, { status: 200 });
  } catch (err) {
    console.error('Erro ao processar webhook:', err);
    // Mesmo em erro interno, devolva 200 para evitar reentregas infinitas se o erro for nosso.
    // Se preferir reentrega, troque para 500.
    return NextResponse.json({ received: true }, { status: 200 });
  }
}

async function handleCheckoutCompleted(session: Stripe.Checkout.Session) {
  console.log('=== WEBHOOK CHECKOUT COMPLETED DEBUG START ===');
  console.log('Session ID:', session.id);
  console.log('Session metadata:', session.metadata);
  console.log('Session customer:', session.customer);
  console.log('Session subscription:', session.subscription);
  console.log('Session mode:', session.mode);
  console.log('Session full object:', JSON.stringify(session, null, 2));
  
  const { tenantSlug, plan, userEmail } = session.metadata ?? {};
  console.log('Extracted metadata:', { tenantSlug, plan, userEmail });
  
  if (!tenantSlug || !plan || !userEmail) {
    console.error('Metadados obrigatórios ausentes em checkout.session.completed:', {
      tenantSlug: tenantSlug || 'MISSING',
      plan: plan || 'MISSING',
      userEmail: userEmail || 'MISSING'
    });
    return;
  }
  // Para pagamentos únicos, subscription pode não existir
  if (!session.customer) {
    console.error('Session sem customer:', {
      customer: session.customer || 'MISSING',
      subscription: session.subscription || 'MISSING (OK para pagamento único)'
    });
    return;
  }

  const trialEndsAt =
    session.mode === 'subscription' && session.subscription
      ? new Date(Date.now() + 14 * 24 * 60 * 60 * 1000)
      : null;
      
  // Para pagamentos únicos, definir status como 'active' diretamente
  const tenantStatus = session.mode === 'subscription' ? (trialEndsAt ? 'trial' : 'active') : 'active';

  console.log('Verificando se tenant já existe:', tenantSlug);
  const existing = await prisma.tenant.findUnique({ where: { slug: tenantSlug } });
  console.log('Tenant existente encontrado:', existing ? 'SIM' : 'NÃO');
  
  if (!existing) {
    console.log('Criando novo tenant com dados:', {
      name: `Empresa ${tenantSlug}`,
      slug: tenantSlug,
      domain: `${tenantSlug}.triaxia.com`,
      plan,
      status: trialEndsAt ? 'trial' : 'active',
      customerId: session.customer as string,
      subscriptionId: session.subscription as string,
      trialEndsAt
    });
    
    try {
      const newTenant = await prisma.tenant.create({
        data: {
          name: `Empresa ${tenantSlug}`,
          slug: tenantSlug,
          domain: `${tenantSlug}.triaxia.com`,
          plan,
          status: tenantStatus,
          customerId: session.customer as string,
          subscriptionId: session.subscription as string | null,
          trialEndsAt,
          settings: { onboardingCompleted: false, setupStep: 'company_info' } as any,
        },
    });
       console.log('✅ Tenant criado com sucesso:', newTenant.id, newTenant.slug);
       
       // Criar usuário administrador
       console.log('Criando usuário administrador para:', userEmail);
       try {
         const adminUser = await prisma.user.create({
           data: {
             email: userEmail,
             name: userEmail.split('@')[0],
             role: 'ADMIN',
             tenantId: newTenant.id,
           },
         });
         console.log('✅ Usuário administrador criado:', adminUser.id, adminUser.email);
       } catch (userError) {
         console.error('❌ Erro ao criar usuário administrador:', userError);
       }
       
     } catch (tenantError) {
       console.error('❌ Erro ao criar tenant:', tenantError);
       throw tenantError;
     }
   } else {
     console.log('Atualizando tenant existente:', tenantSlug);
     try {
       const updatedTenant = await prisma.tenant.update({
         where: { slug: tenantSlug },
         data: {
           plan,
           status: tenantStatus,
           customerId: session.customer as string,
           subscriptionId: session.subscription as string | null,
           trialEndsAt,
         },
       });
       console.log('✅ Tenant atualizado com sucesso:', updatedTenant.id, updatedTenant.slug);
     } catch (updateError) {
       console.error('❌ Erro ao atualizar tenant:', updateError);
       throw updateError;
     }
   }
   
   console.log('=== WEBHOOK CHECKOUT COMPLETED DEBUG END ===');
 }

async function handleSubscriptionCreated(subscription: Stripe.Subscription) {
  const { tenantSlug } = subscription.metadata ?? {};
  if (!tenantSlug) return;

  await prisma.tenant.update({
    where: { slug: tenantSlug },
    data: {
      status: subscription.status === 'trialing' ? 'trial' : 'active',
      subscriptionId: subscription.id,
      // Se você mapeia limite de vagas por priceId:
      // vagasAbertasLimit: mapPriceToLimit(subscription.items.data[0].price.id),
    },
  });
}

async function handleSubscriptionUpdated(subscription: Stripe.Subscription) {
  const { tenantSlug } = subscription.metadata ?? {};
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
      trialEndsAt: subscription.trial_end ? new Date(subscription.trial_end * 1000) : null,
      // Ex.: atualizar limite ao trocar de plano:
      // vagasAbertasLimit: mapPriceToLimit(subscription.items.data[0].price.id),
    },
  });
}

async function handleSubscriptionDeleted(subscription: Stripe.Subscription) {
  const { tenantSlug } = subscription.metadata ?? {};
  if (!tenantSlug) return;

  await prisma.tenant.update({
    where: { slug: tenantSlug },
    data: { status: 'cancelled' },
  });
}

async function handlePaymentSucceeded(invoice: Stripe.Invoice) {
  const subscriptionId = (invoice as any).subscription as string | undefined;
  if (!subscriptionId || !stripe) return;

  const subscription = await stripe.subscriptions.retrieve(subscriptionId);
  const { tenantSlug } = subscription.metadata ?? {};
  if (!tenantSlug) return;

  await prisma.tenant.update({
    where: { slug: tenantSlug },
    data: { status: 'active' },
  });
}

async function handlePaymentFailed(invoice: Stripe.Invoice) {
  const subscriptionId = (invoice as any).subscription as string | undefined;
  if (!subscriptionId || !stripe) return;

  const subscription = await stripe.subscriptions.retrieve(subscriptionId);
  const { tenantSlug } = subscription.metadata ?? {};
  if (!tenantSlug) return;

  await prisma.tenant.update({
    where: { slug: tenantSlug },
    data: { status: 'suspended' },
  });
}

// Exemplo (opcional) se quiser mapear limite de vagas por priceId
// const PRICE_LIMITS: Record<string, number> = {
//   [process.env.STRIPE_PRICE_STARTER!]: 10,
//   [process.env.STRIPE_PRICE_PROF!]: 50,
//   [process.env.STRIPE_PRICE_ENT!]: 200,
// };
// function mapPriceToLimit(priceId: string) { return PRICE_LIMITS[priceId] ?? 10; }
