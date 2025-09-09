require('dotenv').config({ path: '.env.local' });
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function checkCasaVerdeWebhook() {
  try {
    const sessionId = 'cs_test_b1OHOlYxPYrGJsKZhYZMItipauK2k6AFlBksOOuLoeRnRlBJLGeUI2JVc3';
    
    console.log('🔍 Verificando eventos de webhook para sessão CasaVerde...');
    console.log('Session ID:', sessionId);
    
    // Verificar evento de finalização
    const finalizeEvent = await prisma.webhookEvent.findUnique({
      where: { id: `finalize:${sessionId}` }
    });
    
    if (finalizeEvent) {
      console.log('✅ Evento de finalização encontrado:');
      console.log('- ID:', finalizeEvent.id);
      console.log('- Tipo:', finalizeEvent.type);
      console.log('- Data:', finalizeEvent.createdAt);
    } else {
      console.log('❌ Nenhum evento de finalização encontrado');
    }
    
    // Verificar eventos de webhook relacionados
    console.log('\n🔍 Procurando eventos de webhook relacionados...');
    const allEvents = await prisma.webhookEvent.findMany({
      where: {
        OR: [
          { id: { contains: sessionId } },
          { id: { contains: 'casaverde' } },
          { id: { contains: 'CasaVerde' } }
        ]
      },
      orderBy: { createdAt: 'desc' }
    });
    
    if (allEvents.length > 0) {
      console.log(`📊 Encontrados ${allEvents.length} eventos relacionados:`);
      allEvents.forEach((event, i) => {
        console.log(`${i+1}. ${event.id} (${event.type}) - ${event.createdAt}`);
      });
    } else {
      console.log('❌ Nenhum evento relacionado encontrado');
    }
    
    // Verificar se há algum tenant com customerId relacionado à sessão
    console.log('\n🔍 Verificando tenants com customerId relacionado...');
    const tenants = await prisma.tenant.findMany({
      where: {
        OR: [
          { slug: 'casaverde' },
          { slug: 'CasaVerde' },
          { name: { contains: 'CasaVerde' } },
          { name: { contains: 'casaverde' } }
        ]
      }
    });
    
    if (tenants.length > 0) {
      console.log('✅ Tenants relacionados encontrados:');
      tenants.forEach(tenant => {
        console.log(`- ${tenant.name} (${tenant.slug}) - Customer: ${tenant.customerId}`);
      });
    } else {
      console.log('❌ Nenhum tenant CasaVerde encontrado');
    }
    
  } catch (error) {
    console.error('❌ Erro:', error.message);
  } finally {
    await prisma.$disconnect();
  }
}

checkCasaVerdeWebhook();