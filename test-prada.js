// test-prada.js
// Script para testar especificamente a empresa "prada"

require('dotenv').config({ path: '.env.local' });

async function testPradaCompany() {
  console.log('🧪 Testando criação de conta para empresa "prada"...');
  
  const testData = {
    tenantSlug: 'prada',
    userEmail: 'vivendamirassol@gmail.com',
    plan: 'starter'
  };
  
  try {
    // Criar uma sessão de checkout para a empresa "prada"
    console.log('1️⃣ Criando sessão de checkout para "prada"...');
    const checkoutResponse = await fetch('http://localhost:3001/api/stripe/checkout', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        plan: testData.plan,
        tenantSlug: testData.tenantSlug,
        userEmail: testData.userEmail
      })
    });
    
    const checkoutData = await checkoutResponse.json();
    console.log('✅ Sessão criada:', checkoutData.sessionId);
    console.log('📋 Dados da sessão:', JSON.stringify(checkoutData, null, 2));
    
    // Simular a finalização com o session_id
    console.log('\n2️⃣ Simulando finalização para "prada"...');
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
    console.log(`\n📊 Status: ${response.status}`);
    console.log(`📋 Resposta: ${result}`);
    
    if (response.status === 200) {
      console.log('\n✅ Teste concluído com sucesso!');
      console.log('📧 Verifique se o email de ativação foi enviado para:', testData.userEmail);
      console.log('🏢 O email deve mostrar "Bem-vindo à Prada!" no cabeçalho');
    } else {
      console.log('\n⚠️ Sessão não paga (comportamento esperado para teste)');
    }
    
  } catch (error) {
    console.error('❌ Erro durante o teste:', error.message);
  }
}

testPradaCompany();