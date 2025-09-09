require('dotenv').config({ path: '.env.local' });

async function testFullFlow() {
  console.log('🧪 Testando fluxo completo de checkout...');
  
  const testData = {
    plan: 'starter',
    tenantSlug: 'teste-email-flow',
    userEmail: 'vivendamirassol@gmail.com'
  };
  
  try {
    // 1. Criar sessão de checkout
    console.log('1️⃣ Criando sessão de checkout...');
    const checkoutResponse = await fetch('http://localhost:3001/api/stripe/checkout', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(testData)
    });
    
    const checkoutData = await checkoutResponse.json();
    console.log('✅ Checkout criado:', checkoutData.sessionId);
    console.log('🔗 URL:', checkoutData.url);
    
    // 2. Simular finalização (normalmente seria feita pelo Stripe)
    console.log('\n2️⃣ Simulando finalização do pagamento...');
    const finalizeResponse = await fetch('http://localhost:3001/api/stripe/finalize', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        session_id: checkoutData.sessionId
      })
    });
    
    const finalizeData = await finalizeResponse.json();
    console.log('✅ Finalização:', finalizeData.message);
    
    if (finalizeData.ok) {
      console.log('🎉 Fluxo completo funcionando!');
      console.log('📧 Email de ativação deve ter sido enviado para:', testData.userEmail);
    } else {
      console.log('❌ Erro na finalização:', finalizeData.message);
    }
    
  } catch (error) {
    console.error('❌ Erro no teste:', error.message);
  }
}

testFullFlow();