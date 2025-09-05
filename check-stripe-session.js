const Stripe = require('stripe');
require('dotenv').config();

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

async function checkStripeSession() {
  try {
    console.log('🔍 Verificando sessão de checkout do Stripe...');
    
    // ID da sessão que vimos nos logs
    const sessionId = 'cs_test_b1bWCOv3ZhY2hAS5C3Fp9hwwGfMKabFCKb4Cfal4Jw6ZEVWdd0offybUzb';
    
    console.log('Session ID:', sessionId);
    
    const session = await stripe.checkout.sessions.retrieve(sessionId);
    
    console.log('\n📋 Detalhes da sessão:');
    console.log('- Status:', session.status);
    console.log('- Payment Status:', session.payment_status);
    console.log('- Mode:', session.mode);
    console.log('- Customer:', session.customer);
    console.log('- Subscription:', session.subscription);
    console.log('- Created:', new Date(session.created * 1000).toLocaleString());
    
    console.log('\n🏷️ Metadados:');
    console.log('- Tenant Slug:', session.metadata?.tenantSlug);
    console.log('- Plan:', session.metadata?.plan);
    console.log('- User Email:', session.metadata?.userEmail);
    
    if (session.status === 'complete') {
      console.log('\n✅ Sessão foi completada com sucesso!');
      
      // Verificar eventos relacionados
      console.log('\n🔍 Buscando eventos relacionados...');
      const events = await stripe.events.list({
        type: 'checkout.session.completed',
        limit: 10
      });
      
      const relatedEvent = events.data.find(event => 
        event.data.object.id === sessionId
      );
      
      if (relatedEvent) {
        console.log('✅ Evento checkout.session.completed encontrado:');
        console.log('- Event ID:', relatedEvent.id);
        console.log('- Created:', new Date(relatedEvent.created * 1000).toLocaleString());
      } else {
        console.log('❌ Evento checkout.session.completed NÃO encontrado!');
      }
    } else {
      console.log('\n⏳ Sessão ainda não foi completada.');
      console.log('Status atual:', session.status);
      console.log('Payment Status:', session.payment_status);
    }
    
  } catch (error) {
    console.error('❌ Erro ao verificar sessão:', error.message);
  }
}

checkStripeSession();