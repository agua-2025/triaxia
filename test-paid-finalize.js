// test-paid-finalize.js
// Script para testar o endpoint finalize com uma sessão "paga" simulada

require('dotenv').config({ path: '.env.local' });
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function testPaidFinalize() {
  console.log('🧪 Testando finalização com sessão "paga" simulada...');
  
  try {
    // 1. Criar uma sessão de checkout para "prada"
    console.log('1️⃣ Criando sessão de checkout para "prada"...');
    const checkoutResponse = await fetch('http://localhost:3001/api/stripe/checkout', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        plan: 'starter',
        tenantSlug: 'prada',
        userEmail: 'vivendamirassol@gmail.com'
      })
    });
    
    const checkoutData = await checkoutResponse.json();
    console.log('✅ Sessão criada:', checkoutData.sessionId);
    
    // 2. Simular que a sessão foi paga modificando diretamente no Stripe (mock)
    // Como não podemos modificar o Stripe em teste, vamos modificar temporariamente
    // o código para aceitar nossa sessão como "paga"
    
    console.log('2️⃣ Simulando pagamento da sessão...');
    
    // Vamos criar um endpoint de teste que força uma sessão como paga
    const testPayload = {
      session_id: checkoutData.sessionId,
      force_paid: true, // Flag especial para teste
      metadata: {
        tenantSlug: 'prada',
        plan: 'starter',
        userEmail: 'vivendamirassol@gmail.com'
      }
    };
    
    console.log('3️⃣ Chamando endpoint de finalização...');
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
    
    // 4. Verificar se o tenant foi atualizado
    console.log('\n4️⃣ Verificando tenant "prada" no banco...');
    const pradaTenant = await prisma.tenant.findFirst({ where: { slug: 'prada' } });
    if (pradaTenant) {
      console.log(`✅ Tenant encontrado: "${pradaTenant.name}" (ID: ${pradaTenant.id})`);
      console.log(`📊 Status: ${pradaTenant.status}`);
      console.log(`💳 Customer ID: ${pradaTenant.customerId}`);
    }
    
    // 5. Verificar usuário
    console.log('\n5️⃣ Verificando usuário...');
    const user = await prisma.user.findFirst({
      where: {
        email: 'vivendamirassol@gmail.com',
        tenantId: pradaTenant?.id
      }
    });
    if (user) {
      console.log(`✅ Usuário encontrado: ${user.email} (${user.name})`);
    }
    
    console.log('\n📧 Resultado esperado:');
    console.log('- Se a sessão fosse realmente paga, o email seria enviado');
    console.log('- O email mostraria "Bem-vindo à Prada!" no cabeçalho');
    console.log('- Não "Bem-vindo à Empresa todinho!"');
    
  } catch (error) {
    console.error('❌ Erro durante o teste:', error.message);
  } finally {
    await prisma.$disconnect();
  }
}

testPaidFinalize();