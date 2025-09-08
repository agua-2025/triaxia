// list-recent-events.js
// Script para listar eventos recentes do Stripe

require('dotenv').config({ path: '.env.local' });
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

async function listRecentEvents() {
  console.log('📋 Listando eventos recentes do Stripe...');
  
  try {
    // Lista os últimos 50 eventos
    const events = await stripe.events.list({
      limit: 50,
      types: ['checkout.session.completed']
    });
    
    console.log(`\n✅ Encontrados ${events.data.length} eventos de checkout.session.completed:`);
    
    // Procura especificamente por "trae"
    const traeEvents = events.data.filter(event => {
      const metadata = event.data.object.metadata || {};
      const email = event.data.object.customer_details?.email || '';
      return (
        metadata.tenantSlug?.toLowerCase().includes('trae') ||
        metadata.userEmail?.toLowerCase().includes('trae') ||
        email.toLowerCase().includes('trae')
      );
    });
    
    if (traeEvents.length > 0) {
      console.log(`\n🎯 Encontrados ${traeEvents.length} eventos relacionados a "trae":`);
      traeEvents.forEach((event, index) => {
        const session = event.data.object;
        const metadata = session.metadata || {};
        
        console.log(`\n${index + 1}. Evento ID: ${event.id}`);
        console.log(`   Data: ${new Date(event.created * 1000).toLocaleString('pt-BR')}`);
        console.log(`   Session ID: ${session.id}`);
        console.log(`   Customer Email: ${session.customer_details?.email || 'N/A'}`);
        console.log(`   Amount: ${session.amount_total ? (session.amount_total / 100).toFixed(2) : 'N/A'}`);
        console.log(`   Metadata:`, JSON.stringify(metadata, null, 4));
      });
    } else {
      console.log('\n❌ Nenhum evento encontrado para "trae"');
    }
    
    // Lista os 10 eventos mais recentes para referência
    console.log('\n📋 Os 10 eventos mais recentes:');
    events.data.slice(0, 10).forEach((event, index) => {
      const session = event.data.object;
      const metadata = session.metadata || {};
      
      console.log(`\n${index + 1}. Evento ID: ${event.id}`);
      console.log(`   Data: ${new Date(event.created * 1000).toLocaleString('pt-BR')}`);
      console.log(`   Tenant: ${metadata.tenantSlug || 'N/A'}`);
      console.log(`   Email: ${session.customer_details?.email || 'N/A'}`);
    });
    
  } catch (error) {
    console.error('❌ Erro ao listar eventos:', error.message);
  }
}

listRecentEvents();