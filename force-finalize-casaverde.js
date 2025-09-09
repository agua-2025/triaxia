require('dotenv').config({ path: '.env.local' });
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function forceFinalizeCasaVerde() {
  try {
    const sessionId = 'cs_test_b1OHOlYxPYrGJsKZhYZMItipauK2k6AFlBksOOuLoeRnRlBJLGeUI2JVc3';
    const idemId = `finalize:${sessionId}`;
    
    console.log('🔄 Removendo evento de idempotência para forçar nova finalização...');
    
    // Remover o evento de idempotência
    const deleted = await prisma.webhookEvent.deleteMany({
      where: { id: idemId }
    });
    
    console.log(`✅ Removidos ${deleted.count} eventos de idempotência`);
    
    console.log('\n🚀 Chamando endpoint de finalização...');
    
    // Chamar o endpoint de finalização
    const response = await fetch('http://localhost:5000/api/stripe/finalize', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        session_id: sessionId
      })
    });
    
    const result = await response.json();
    
    console.log('📊 Resposta do endpoint:');
    console.log('- Status:', response.status);
    console.log('- Resultado:', JSON.stringify(result, null, 2));
    
    // Verificar se o tenant foi criado agora
    console.log('\n🔍 Verificando se o tenant CasaVerde foi criado...');
    const tenant = await prisma.tenant.findFirst({
      where: {
        OR: [
          { slug: 'casaverde' },
          { slug: 'CasaVerde' },
          { name: { contains: 'CasaVerde' } },
          { name: { contains: 'casaverde' } }
        ]
      },
      include: {
        users: true
      }
    });
    
    if (tenant) {
      console.log('✅ Tenant CasaVerde encontrado:');
      console.log('- ID:', tenant.id);
      console.log('- Nome:', tenant.name);
      console.log('- Slug:', tenant.slug);
      console.log('- Status:', tenant.status);
      console.log('- Customer ID:', tenant.customerId);
      console.log('- Usuários:', tenant.users.length);
      tenant.users.forEach(user => {
        console.log(`  - ${user.email} (${user.role})`);
      });
    } else {
      console.log('❌ Tenant CasaVerde ainda não foi criado');
    }
    
  } catch (error) {
    console.error('❌ Erro:', error.message);
  } finally {
    await prisma.$disconnect();
  }
}

forceFinalizeCasaVerde();