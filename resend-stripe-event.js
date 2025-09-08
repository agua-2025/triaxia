// resend-stripe-event.js
// Script para reenviar um evento específico do Stripe

require('dotenv').config({ path: '.env.local' });
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

async function resendStripeEvent() {
  console.log('🔄 Reenviando evento do Stripe para o tenant "Trae"...');
  
  try {
    // ID do evento mais recente do tenant "Trae"
    const eventId = 'evt_1S4tfH1VWrgEVy2mogYBb4yI';
    
    // Busca o evento
    const event = await stripe.events.retrieve(eventId);
    console.log('📋 Evento encontrado:', event.type);
    console.log('📋 Data do evento:', new Date(event.created * 1000).toLocaleString('pt-BR'));
    console.log('📋 Dados do evento:', JSON.stringify(event.data.object.metadata, null, 2));
    
    // Lista os endpoints de webhook
    const endpoints = await stripe.webhookEndpoints.list();
    console.log('\n🔗 Endpoints de webhook configurados:');
    endpoints.data.forEach(endpoint => {
      console.log(`- ${endpoint.url} (${endpoint.status})`);
    });
    
    // Verifica se existe um endpoint para o URL correto
    const correctEndpoint = endpoints.data.find(ep => 
      ep.url.includes('/api/stripe/webhook') || ep.url.includes('/api/webhooks/stripe')
    );
    
    if (correctEndpoint) {
      console.log('\n✅ Endpoint encontrado:', correctEndpoint.url);
      
      // Simula o processamento do webhook localmente
      console.log('\n🧪 Simulando processamento do webhook localmente...');
      
      const session = event.data.object;
      const metadata = session.metadata;
      
      console.log('\n📝 Dados que seriam processados pelo webhook:');
      console.log(`   - Tenant Slug: ${metadata.tenantSlug}`);
      console.log(`   - User Email: ${metadata.userEmail}`);
      console.log(`   - Plan: ${metadata.plan}`);
      console.log(`   - Session ID: ${session.id}`);
      console.log(`   - Customer Email: ${session.customer_details?.email}`);
      
      console.log('\n💡 Para reenviar o evento real via Stripe Dashboard:');
      console.log(`   https://dashboard.stripe.com/test/events/${eventId}`);
      console.log('   E clique em "Resend webhook"');
      
      console.log('\n🔧 Ou você pode processar manualmente executando o webhook localmente.');
      
    } else {
      console.log('\n❌ Nenhum endpoint de webhook encontrado para este projeto');
    }
    
  } catch (error) {
    console.error('❌ Erro ao buscar evento:', error.message);
  }
}

resendStripeEvent();