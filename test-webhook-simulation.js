// test-webhook-simulation.js
// Script para simular um webhook de pagamento completo

require('dotenv').config({ path: '.env.local' });

async function simulatePaymentWebhook() {
  console.log('🧪 Simulando webhook de pagamento completo...');
  
  const webhookData = {
    sessionId: 'cs_test_simulated_session',
    tenantSlug: 'teste-webhook',
    userEmail: 'vivendamirassol@gmail.com',
    plan: 'starter'
  };
  
  try {
    // Primeiro, criar uma sessão de checkout real
    console.log('1️⃣ Criando sessão de checkout...');
    const checkoutResponse = await fetch('http://localhost:3001/api/stripe/checkout', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        plan: webhookData.plan,
        tenantSlug: webhookData.tenantSlug,
        userEmail: webhookData.userEmail
      })
    });
    
    const checkoutData = await checkoutResponse.json();
    console.log('✅ Sessão criada:', checkoutData.sessionId);
    
    // Agora simular a finalização com o session_id real
    console.log('2️⃣ Simulando finalização...');
    const response = await fetch('http://localhost:3001/api/stripe/finalize', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        session_id: checkoutData.sessionId
      })
    });
    
    const result = await response.text();
    console.log(`📊 Status: ${response.status}`);
    console.log(`📋 Resposta: ${result}`);
    
    if (response.ok) {
      console.log('✅ Webhook processado com sucesso!');
      console.log('📧 Verifique se o email de ativação foi enviado para:', webhookData.userEmail);
    } else {
      console.log('❌ Erro no processamento do webhook');
    }
    
  } catch (error) {
    console.error('❌ Erro na simulação:', error.message);
  }
}

simulatePaymentWebhook().finally(() => {
  console.log('\n🏁 Simulação finalizada.');
  process.exit(0);
});