// src/app/api/stripe/checkout/route.ts
import { NextRequest, NextResponse } from 'next/server'
import Stripe from 'stripe'
import { createClient } from '@/lib/supabase/server'
import { headers } from 'next/headers'

export const runtime = 'nodejs'

export async function POST(request: NextRequest) {
  try {
    console.log('Iniciando criação de sessão de checkout...');

    if (!stripe) {
      console.error('Stripe não está configurado');
      return NextResponse.json(
        { error: 'Stripe não está configurado' },
        { status: 500 }
      );
    }

    const { plan, tenantSlug, userEmail } = await request.json();

    if (!plan || !((plan as string) in STRIPE_PLANS)) {
      return NextResponse.json({ error: 'Plano inválido' }, { status: 400 });
    }
    if (!tenantSlug || !userEmail) {
      return NextResponse.json(
        { error: 'Dados obrigatórios não fornecidos' },
        { status: 400 }
      );
    }

    const selectedPlan = STRIPE_PLANS[plan as StripePlan]
    const headersList = await headers()
    const origin = process.env.APP_URL ?? new URL(request.url).origin
    
    console.log('Dados recebidos:', { plan, tenantSlug, userEmail, origin })

    // Buscar ou criar cliente por e-mail
    const { data: found } = await stripe.customers.list({
      email: userEmail,
      limit: 1,
    });
    const customer =
      found[0] ??
      (await stripe.customers.create({
        email: userEmail,
        metadata: { tenantSlug },
      }));

    // Produto único por plano
    const products = await stripe.products.list({ active: true, limit: 100 });
    let product = products.data.find(p => p.metadata?.plan === plan);
    if (!product) {
      product = await stripe.products.create({
        name: `Triaxia ${selectedPlan.name}`,
        description: selectedPlan.description,
        metadata: { plan },
      });
    }

    // Price compatível (unit_amount/currency/interval)
    const prices = await stripe.prices.list({
      product: product.id,
      active: true,
      limit: 100,
    });
    let price = prices.data.find(
      p =>
        p.unit_amount === selectedPlan.price &&
        p.currency === selectedPlan.currency &&
        p.recurring?.interval === selectedPlan.interval
    );
    if (!price) {
      price = await stripe.prices.create({
        product: product.id,
        unit_amount: selectedPlan.price,
        currency: selectedPlan.currency,
        recurring: { interval: selectedPlan.interval },
        metadata: { plan },
      });
    }

    // Sessão de checkout
    console.log('Criando sessão de checkout...');
    const session = await stripe.checkout.sessions.create({
      customer: customer.id,
      line_items: [
        {
          price: price.id,
          quantity: 1,
        },
      ],
      mode: 'subscription',
      success_url: `${origin}/onboarding?session_id={CHECKOUT_SESSION_ID}&tenant=${tenantSlug}`,
      cancel_url: `${origin}/pricing?canceled=true`,
      metadata: { tenantSlug, plan, userEmail },
      subscription_data: {
        trial_period_days: 14,
        metadata: { tenantSlug, plan },
      },
      allow_promotion_codes: true,
      billing_address_collection: 'required',
      customer_update: { address: 'auto', name: 'auto' },
    });

    console.log('Sessão criada com sucesso:', {
      sessionId: session.id,
      url: session.url,
    });

    if (!session.url) {
      console.error('URL da sessão não foi gerada');
      return NextResponse.json(
        { error: 'Erro ao gerar URL de checkout' },
        { status: 500 }
      );
    }

    return NextResponse.json({ sessionId: session.id, url: session.url });
  } catch (error) {
    console.error('Erro ao criar sessão de checkout:', error);

    if (error instanceof Error) {
      console.error('Error message:', error.message);
      console.error('Error stack:', error.stack);
    }
    if (error && typeof error === 'object' && 'type' in error) {
      console.error('Stripe error type:', (error as any).type);
      console.error('Stripe error code:', (error as any).code);
      console.error('Stripe error message:', (error as any).message);
    }

    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 }
    );
  }
}
