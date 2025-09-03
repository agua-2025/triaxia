import { NextRequest, NextResponse } from 'next/server'
import { stripe, STRIPE_PLANS, StripePlan } from '@/lib/stripe'
import { headers } from 'next/headers'

export async function POST(request: NextRequest) {
  try {
    console.log('Iniciando criação de sessão de checkout...')
    
    if (!stripe) {
      console.error('Stripe não está configurado')
      return NextResponse.json(
        { error: 'Stripe não está configurado' },
        { status: 500 }
      )
    }

    const { plan, tenantSlug, userEmail } = await request.json()

    if (!plan || !STRIPE_PLANS[plan as StripePlan]) {
      return NextResponse.json(
        { error: 'Plano inválido' },
        { status: 400 }
      )
    }

    if (!tenantSlug || !userEmail) {
      return NextResponse.json(
        { error: 'Dados obrigatórios não fornecidos' },
        { status: 400 }
      )
    }

    const selectedPlan = STRIPE_PLANS[plan as StripePlan]
    const headersList = await headers()
    const origin = headersList.get('origin') || headersList.get('host') || process.env.APP_URL || 'http://localhost:3000'
    
    console.log('Dados recebidos:', { plan, tenantSlug, userEmail, origin })

    // Create or retrieve customer
    let customer
    const existingCustomers = await stripe.customers.list({
      email: userEmail,
      limit: 1
    })

    if (existingCustomers.data.length > 0) {
      customer = existingCustomers.data[0]
    } else {
      customer = await stripe.customers.create({
        email: userEmail,
        metadata: {
          tenantSlug
        }
      })
    }

    // Create product if it doesn't exist
    const products = await stripe.products.list({
      active: true,
      limit: 100
    })

    let product = products.data.find(p => p.metadata.plan === plan)
    
    if (!product) {
      product = await stripe.products.create({
        name: `Triaxia ${selectedPlan.name}`,
        description: selectedPlan.description,
        metadata: {
          plan
        }
      })
    }

    // Create price if it doesn't exist
    const prices = await stripe.prices.list({
      product: product.id,
      active: true,
      limit: 100
    })

    let price = prices.data.find(p => 
      p.unit_amount === selectedPlan.price && 
      p.currency === selectedPlan.currency &&
      p.recurring?.interval === selectedPlan.interval
    )

    if (!price) {
      price = await stripe.prices.create({
        product: product.id,
        unit_amount: selectedPlan.price,
        currency: selectedPlan.currency,
        recurring: {
          interval: selectedPlan.interval
        },
        metadata: {
          plan
        }
      })
    }

    // Create checkout session
    console.log('Criando sessão de checkout...')
    const session = await stripe.checkout.sessions.create({
      customer: customer.id,
      payment_method_types: ['card'],
      line_items: [
        {
          price: price.id,
          quantity: 1,
        },
      ],
      mode: 'subscription',
      success_url: `${origin}/onboarding?session_id={CHECKOUT_SESSION_ID}&tenant=${tenantSlug}`,
      cancel_url: `${origin}/pricing?canceled=true`,
      metadata: {
        tenantSlug,
        plan,
        userEmail
      },
      subscription_data: {
        metadata: {
          tenantSlug,
          plan
        },
        trial_period_days: 14 // 14 dias de trial gratuito
      },
      allow_promotion_codes: true,
      billing_address_collection: 'required',
      customer_update: {
        address: 'auto',
        name: 'auto'
      }
    })

    console.log('Sessão criada com sucesso:', { sessionId: session.id, url: session.url })

    if (!session.url) {
      console.error('URL da sessão não foi gerada')
      return NextResponse.json(
        { error: 'Erro ao gerar URL de checkout' },
        { status: 500 }
      )
    }

    return NextResponse.json({ 
      sessionId: session.id,
      url: session.url 
    })

  } catch (error) {
    console.error('Erro ao criar sessão de checkout:', error)
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 }
    )
  }
}