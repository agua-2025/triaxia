import { NextResponse } from 'next/server';
import { stripe } from '@/lib/stripe';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const sessionId = searchParams.get('session_id');

  if (!sessionId) {
    return NextResponse.json(
      { error: 'Session ID is required' },
      { status: 400 }
    );
  }

  try {
    // Busca a sessão do Stripe, expandindo para obter detalhes do cliente
    const session = await stripe!.checkout.sessions.retrieve(sessionId, {
      expand: ['customer'],
    });

    // Extrai os dados. Ajuste conforme os metadados que você envia ao criar a sessão.
    const customerEmail = session.customer_details?.email;
    const plan = session.metadata?.plan || 'unknown';
    const tenantSlug = session.metadata?.tenantSlug || 'default-slug';

    if (!customerEmail) {
      return NextResponse.json(
        { error: 'Customer details not found in session.' },
        { status: 404 }
      );
    }

    // TODO: Aqui é o lugar ideal para salvar os dados no seu banco de dados.
    // 1. Encontre ou crie o usuário com `customerEmail`.
    // 2. Crie a organização/tenant com `tenantSlug`.
    // 3. Associe o usuário à assinatura do Stripe.

    const sessionData = {
      customerEmail,
      tenantSlug,
      plan,
    };

    return NextResponse.json(sessionData);
  } catch (error) {
    console.error('Error retrieving Stripe session:', error);
    return NextResponse.json(
      { error: 'Could not retrieve session' },
      { status: 500 }
    );
  }
}
