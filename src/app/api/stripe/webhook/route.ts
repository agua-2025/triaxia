import { NextRequest, NextResponse } from 'next/server'
import { stripe } from '@/lib/stripe'
import { headers } from 'next/headers'
import Stripe from 'stripe'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function POST(request: NextRequest) {
  if (!stripe) {
    return NextResponse.json(
      { error: 'Stripe não está configurado' },
      { status: 500 }
    )
  }

  const body = await request.text()
  const headersList = await headers()
  const signature = headersList.get('stripe-signature')

  if (!signature) {
    return NextResponse.json(
      { error: 'Assinatura do webhook não encontrada' },
      { status: 400 }
    )
  }

  let event: Stripe.Event

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    )
  } catch (error) {
    console.error('Erro na verificação do webhook:', error)
    return NextResponse.json(
      { error: 'Webhook signature verification failed' },
      { status: 400 }
    )
  }

  try {
    switch (event.type) {
      case 'checkout.session.completed': {
        const session = event.data.object as Stripe.Checkout.Session
        await handleCheckoutCompleted(session)
        break
      }

      case 'customer.subscription.created': {
        const subscription = event.data.object as Stripe.Subscription
        await handleSubscriptionCreated(subscription)
        break
      }

      case 'customer.subscription.updated': {
        const subscription = event.data.object as Stripe.Subscription
        await handleSubscriptionUpdated(subscription)
        break
      }

      case 'customer.subscription.deleted': {
        const subscription = event.data.object as Stripe.Subscription
        await handleSubscriptionDeleted(subscription)
        break
      }

      case 'invoice.payment_succeeded': {
        const invoice = event.data.object as Stripe.Invoice
        await handlePaymentSucceeded(invoice)
        break
      }

      case 'invoice.payment_failed': {
        const invoice = event.data.object as Stripe.Invoice
        await handlePaymentFailed(invoice)
        break
      }

      default:
        console.log(`Evento não tratado: ${event.type}`)
    }

    return NextResponse.json({ received: true })
  } catch (error) {
    console.error('Erro ao processar webhook:', error)
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 }
    )
  }
}

async function handleCheckoutCompleted(session: Stripe.Checkout.Session) {
  const { tenantSlug, plan, userEmail } = session.metadata || {}
  
  if (!tenantSlug || !plan || !userEmail) {
    console.error('Metadados obrigatórios não encontrados na sessão')
    return
  }

  try {
    // Verificar se o tenant já existe
    const existingTenant = await prisma.tenant.findUnique({
      where: { slug: tenantSlug }
    })

    if (!existingTenant) {
      // Criar novo tenant
      await prisma.tenant.create({
        data: {
          name: `Empresa ${tenantSlug}`,
          slug: tenantSlug,
          domain: `${tenantSlug}.triaxia.com`,
          plan,
          subscriptionStatus: 'trialing',
          stripeCustomerId: session.customer as string,
          stripeSubscriptionId: session.subscription as string,
          trialEndsAt: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000), // 14 dias
          settings: {
            onboardingCompleted: false,
            setupStep: 'company_info'
          }
        }
      })

      console.log(`Tenant criado: ${tenantSlug}`)
    } else {
      // Atualizar tenant existente
      await prisma.tenant.update({
        where: { slug: tenantSlug },
        data: {
          plan,
          subscriptionStatus: 'trialing',
          stripeCustomerId: session.customer as string,
          stripeSubscriptionId: session.subscription as string,
          trialEndsAt: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000)
        }
      })

      console.log(`Tenant atualizado: ${tenantSlug}`)
    }
  } catch (error) {
    console.error('Erro ao processar checkout completo:', error)
  }
}

async function handleSubscriptionCreated(subscription: Stripe.Subscription) {
  const { tenantSlug } = subscription.metadata || {}
  
  if (!tenantSlug) return

  try {
    await prisma.tenant.update({
      where: { slug: tenantSlug },
      data: {
        subscriptionStatus: subscription.status === 'trialing' ? 'trialing' : 'active',
        stripeSubscriptionId: subscription.id
      }
    })

    console.log(`Assinatura criada para tenant: ${tenantSlug}`)
  } catch (error) {
    console.error('Erro ao processar criação de assinatura:', error)
  }
}

async function handleSubscriptionUpdated(subscription: Stripe.Subscription) {
  const { tenantSlug } = subscription.metadata || {}
  
  if (!tenantSlug) return

  try {
    let subscriptionStatus: string
    
    switch (subscription.status) {
      case 'active':
        subscriptionStatus = 'active'
        break
      case 'trialing':
        subscriptionStatus = 'trialing'
        break
      case 'past_due':
        subscriptionStatus = 'past_due'
        break
      case 'canceled':
      case 'unpaid':
        subscriptionStatus = 'canceled'
        break
      default:
        subscriptionStatus = subscription.status
    }

    await prisma.tenant.update({
      where: { slug: tenantSlug },
      data: {
        subscriptionStatus,
        trialEndsAt: subscription.trial_end ? new Date(subscription.trial_end * 1000) : null
      }
    })

    console.log(`Assinatura atualizada para tenant: ${tenantSlug} - Status: ${subscriptionStatus}`)
  } catch (error) {
    console.error('Erro ao processar atualização de assinatura:', error)
  }
}

async function handleSubscriptionDeleted(subscription: Stripe.Subscription) {
  const { tenantSlug } = subscription.metadata || {}
  
  if (!tenantSlug) return

  try {
    await prisma.tenant.update({
      where: { slug: tenantSlug },
      data: {
        subscriptionStatus: 'canceled'
      }
    })

    console.log(`Assinatura cancelada para tenant: ${tenantSlug}`)
  } catch (error) {
    console.error('Erro ao processar cancelamento de assinatura:', error)
  }
}

async function handlePaymentSucceeded(invoice: Stripe.Invoice) {
  const subscription = await stripe.subscriptions.retrieve(invoice.subscription as string)
  const { tenantSlug } = subscription.metadata || {}
  
  if (!tenantSlug) return

  try {
    await prisma.tenant.update({
      where: { slug: tenantSlug },
      data: {
        subscriptionStatus: 'active'
      }
    })

    console.log(`Pagamento bem-sucedido para tenant: ${tenantSlug}`)
  } catch (error) {
    console.error('Erro ao processar pagamento bem-sucedido:', error)
  }
}

async function handlePaymentFailed(invoice: Stripe.Invoice) {
  const subscription = await stripe.subscriptions.retrieve(invoice.subscription as string)
  const { tenantSlug } = subscription.metadata || {}
  
  if (!tenantSlug) return

  try {
    await prisma.tenant.update({
      where: { slug: tenantSlug },
      data: {
        subscriptionStatus: 'past_due'
      }
    })

    console.log(`Pagamento falhou para tenant: ${tenantSlug}`)
  } catch (error) {
    console.error('Erro ao processar falha de pagamento:', error)
  }
}