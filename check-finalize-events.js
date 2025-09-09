require('dotenv').config({ path: '.env.local' });
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function checkFinalizeEvents() {
  try {
    console.log('🔍 Verificando eventos de finalização...');
    
    const events = await prisma.webhookEvent.findMany({
      where: {
        type: {
          startsWith: 'finalize'
        }
      },
      orderBy: {
        createdAt: 'desc'
      },
      take: 10
    });
    
    console.log(`📊 Encontrados ${events.length} eventos de finalização:`);
    
    events.forEach((e, i) => {
      console.log(`${i+1}. ID: ${e.id} | Tipo: ${e.type} | Data: ${e.createdAt}`);
    });
    
    // Verificar se há algum evento relacionado ao CasaVerde
    console.log('\n🔍 Procurando eventos relacionados ao CasaVerde...');
    const casaVerdeEvents = events.filter(e => e.id.includes('CasaVerde') || e.id.includes('casaverde'));
    
    if (casaVerdeEvents.length > 0) {
      console.log('✅ Eventos CasaVerde encontrados:');
      casaVerdeEvents.forEach(e => {
        console.log(`- ${e.id} (${e.type})`);
      });
    } else {
      console.log('❌ Nenhum evento de finalização encontrado para CasaVerde');
    }
    
  } catch (error) {
    console.error('❌ Erro:', error.message);
  } finally {
    await prisma.$disconnect();
  }
}

checkFinalizeEvents();