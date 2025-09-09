// check-webhook-events.js
require('dotenv').config({ path: '.env.local' });
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function checkWebhookEvents() {
  try {
    console.log('📋 Verificando eventos de webhook...');
    
    const events = await prisma.webhookEvent.findMany({
      orderBy: { createdAt: 'desc' },
      take: 10
    });
    
    if (events.length === 0) {
      console.log('❌ Nenhum evento de webhook encontrado no banco');
      return;
    }
    
    console.log(`✅ Encontrados ${events.length} eventos:`);
    events.forEach((event, index) => {
      console.log(`${index + 1}. ID: ${event.id}`);
      console.log(`   Tipo: ${event.type}`);
      console.log(`   Data: ${event.createdAt}`);
      console.log('---');
    });
    
  } catch (error) {
    console.error('❌ Erro ao verificar eventos:', error.message);
  } finally {
    await prisma.$disconnect();
  }
}

checkWebhookEvents();