// resend-stripe-event.js
// Script para reenviar um evento específico do Stripe

require('dotenv').config({ path: '.env.local' });
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

async function resendStripeEvent() {
  console.log('🔄 Reenviando evento do Stripe...');
  
  try {
    // ID do evento que queremos reenviar
    const eventId = 'evt_1S3pnJ1VWrgEVy2mXERV4lZn';
    
    // Busca o evento
    const event = await stripe.events.retrieve(eventId);
    console.log('📋 Evento encontrado:', event.type);
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
      
      // Simula o reenvio criando um novo evento de teste
      console.log('\n🧪 Criando evento de teste para simular o reenvio...');
      
      // Como não podemos reenviar eventos reais, vamos criar um evento de teste
      // que simule o checkout.session.completed
      const testEvent = {
        type: 'checkout.session.completed',
        data: event.data
      };
      
      console.log('\n📝 Evento simulado criado com sucesso!');
      console.log('💡 Para reenviar o evento real, acesse o Stripe Dashboard:');
      console.log(`   https://dashboard.stripe.com/test/events/${eventId}`);
      console.log('   E clique em "Resend webhook"');
      
    } else {
      console.log('\n❌ Nenhum endpoint de webhook encontrado para este projeto');
    }
    
  } catch (error) {
    console.error('❌ Erro ao reenviar evento:', error.message);
  }
}

// Executa o script
resendStripeEvent();