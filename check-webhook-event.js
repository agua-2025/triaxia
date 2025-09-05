const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function checkWebhookEvent() {
  try {
    console.log('🔍 Verificando se o evento foi processado pelo webhook...');
    
    const eventId = 'evt_1S3pnJ1VWrgEVy2mXERV4lZn';
    console.log('Event ID:', eventId);
    
    const webhookEvent = await prisma.webhookEvent.findUnique({
      where: { id: eventId }
    });
    
    if (webhookEvent) {
      console.log('✅ Evento foi processado pelo webhook:');
      console.log('- ID:', webhookEvent.id);
      console.log('- Type:', webhookEvent.type);
      console.log('- Created At:', webhookEvent.createdAt);
    } else {
      console.log('❌ Evento NÃO foi processado pelo webhook!');
      console.log('Isso indica que o webhook não foi chamado ou falhou.');
    }
    
    // Verificar todos os eventos de webhook
    console.log('\n📝 Listando todos os eventos de webhook:');
    const allEvents = await prisma.webhookEvent.findMany({
      orderBy: {
        createdAt: 'desc'
      },
      take: 10
    });
    
    if (allEvents.length > 0) {
      allEvents.forEach(event => {
        console.log(`- ${event.id} (${event.type}) - ${event.createdAt}`);
      });
    } else {
      console.log('Nenhum evento de webhook encontrado no banco.');
    }
    
    // Verificar se o tenant foi criado
    console.log('\n🏢 Verificando tenant jubasupermercado:');
    const tenant = await prisma.tenant.findUnique({
      where: { slug: 'jubasupermercado' }
    });
    
    if (tenant) {
      console.log('✅ Tenant encontrado:', tenant.slug, tenant.name);
    } else {
      console.log('❌ Tenant NÃO encontrado!');
    }
    
  } catch (error) {
    console.error('❌ Erro ao verificar evento:', error);
  } finally {
    await prisma.$disconnect();
  }
}

checkWebhookEvent();