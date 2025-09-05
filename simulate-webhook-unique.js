// simulate-webhook-unique.js
// Script para simular o webhook localmente com ID único

require('dotenv').config({ path: '.env.local' });
const crypto = require('crypto');

// Gera um ID único para o evento
const uniqueEventId = `evt_test_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
const uniqueSessionId = `cs_test_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

// Dados do evento checkout.session.completed com IDs únicos
const realEvent = {
  id: uniqueEventId,
  object: 'event',
  api_version: '2020-08-27',
  created: Math.floor(Date.now() / 1000),
  data: {
    object: {
      id: uniqueSessionId,
      object: 'checkout.session',
      status: 'complete',
      payment_status: 'paid',
      mode: 'payment',
      customer: 'cus_test_jubasupermercado',
      subscription: null,
      metadata: {
        plan: 'professional',
        tenantSlug: 'jubasupermercado',
        userEmail: 'marcio_luiz_mt@hotmail.com'
      },
      customer_details: {
        email: 'marcio_luiz_mt@hotmail.com'
      },
      amount_total: 2900,
      currency: 'brl'
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

const payload = JSON.stringify(realEvent);
const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET;

// Cria a assinatura correta do Stripe
const timestamp = Math.floor(Date.now() / 1000);
const signature = crypto
  .createHmac('sha256', endpointSecret)
  .update(timestamp + '.' + payload, 'utf8')
  .digest('hex');

const stripeSignature = `t=${timestamp},v1=${signature}`;

async function simulateWebhookUnique() {
  console.log('🎯 Simulando webhook local com IDs únicos...');
  console.log('📋 Evento ID:', uniqueEventId);
  console.log('📋 Session ID:', uniqueSessionId);
  console.log('📋 Tenant:', realEvent.data.object.metadata.tenantSlug);
  console.log('📋 Email:', realEvent.data.object.metadata.userEmail);
  console.log('📋 Plano:', realEvent.data.object.metadata.plan);
  
  try {
    // Envia para o endpoint correto
    const response = await fetch('http://localhost:3000/api/stripe/webhook', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'stripe-signature': stripeSignature
      },
      body: payload
    });
    
    console.log('\n📊 Status da resposta:', response.status);
    
    const responseText = await response.text();
    console.log('📊 Corpo da resposta:', responseText);
    
    if (response.ok) {
      console.log('\n✅ Webhook processado com sucesso!');
      console.log('🔍 Aguardando processamento...');
      
      // Aguarda um pouco para o processamento
      await new Promise(resolve => setTimeout(resolve, 3000));
      
    } else {
      console.log('\n❌ Webhook falhou');
    }
    
  } catch (error) {
    console.error('❌ Erro ao simular webhook:', error.message);
  }
}

// Executa a simulação
simulateWebhookUnique();