// test-webhook-redirect.js
// Script para testar o redirecionamento do webhook

require('dotenv').config({ path: '.env.local' });
const crypto = require('crypto');

// Simula um evento checkout.session.completed
const mockEvent = {
  id: 'evt_test_webhook',
  object: 'event',
  api_version: '2020-08-27',
  created: Math.floor(Date.now() / 1000),
  data: {
    object: {
      id: 'cs_test_webhook_session',
      object: 'checkout.session',
      status: 'complete',
      payment_status: 'paid',
      metadata: {
        tenantSlug: 'jubasupermercado',
        plan: 'professional',
        userEmail: 'marcio_luiz_mt@hotmail.com'
      },
      customer_details: {
        email: 'marcio_luiz_mt@hotmail.com'
      }
    }
  },
  livemode: false,
  pending_webhooks: 1,
  request: {
    id: 'req_test',
    idempotency_key: null
  },
  type: 'checkout.session.completed'
};

const payload = JSON.stringify(mockEvent);
const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET;

if (!endpointSecret) {
  console.error('❌ STRIPE_WEBHOOK_SECRET não encontrado no .env.local');
  process.exit(1);
}

// Cria a assinatura correta do Stripe
const timestamp = Math.floor(Date.now() / 1000);
const signature = crypto
  .createHmac('sha256', endpointSecret)
  .update(timestamp + '.' + payload, 'utf8')
  .digest('hex');

const stripeSignature = `t=${timestamp},v1=${signature}`;

async function testWebhookRedirect() {
  console.log('🧪 Testando redirecionamento do webhook...');
  
  try {
    // Testa o endpoint antigo (que deve redirecionar)
    const response = await fetch('http://localhost:3000/api/webhooks/stripe', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'stripe-signature': stripeSignature
      },
      body: payload
    });
    
    console.log('📊 Status da resposta:', response.status);
    console.log('📊 Headers da resposta:', Object.fromEntries(response.headers));
    
    const responseText = await response.text();
    console.log('📊 Corpo da resposta:', responseText);
    
    if (response.ok) {
      console.log('✅ Redirecionamento funcionou!');
    } else {
      console.log('❌ Redirecionamento falhou');
    }
    
  } catch (error) {
    console.error('❌ Erro ao testar webhook:', error.message);
  }
}

// Executa o teste
testWebhookRedirect();