const fetch = require('node-fetch');

// Simular webhook do Stripe para criar tenant 'genial'
async function simulateWebhookGenial() {
  const webhookData = {
    id: 'evt_test_genial_' + Date.now(),
    object: 'event',
    type: 'checkout.session.completed',
    data: {
      object: {
        id: 'cs_test_genial_' + Date.now(),
        object: 'checkout.session',
        status: 'complete',
        payment_status: 'paid',
        mode: 'payment',
        customer: 'cus_test_genial',
        subscription: null,
        metadata: {
          plan: 'professional',
          tenantSlug: 'genial',
          userEmail: 'admin@genial.com.br'
        },
        customer_details: {
          email: 'admin@genial.com.br'
        },
        amount_total: 2900,
        currency: 'brl'
      }
    }
  };

  try {
    console.log('🚀 Simulando webhook para criar tenant "genial"...');
    
    const response = await fetch('http://localhost:3000/api/stripe/webhook', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'stripe-signature': 'test_signature'
      },
      body: JSON.stringify(webhookData)
    });

    const responseText = await response.text();
    
    console.log('📊 Status da resposta:', response.status);
    console.log('📄 Corpo da resposta:', responseText);
    
    if (response.ok) {
      console.log('✅ Webhook processado com sucesso!');
      console.log('🎯 Tenant "genial" deve ter sido criado automaticamente');
    } else {
      console.log('❌ Erro no processamento do webhook');
    }
  } catch (error) {
    console.error('💥 Erro ao simular webhook:', error.message);
  }
}

simulateWebhookGenial();