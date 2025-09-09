require('dotenv').config({ path: '.env.local' });
const Stripe = require('stripe');
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: '2025-08-27.basil',
});

async function checkStripeSessions() {
  try {
    console.log('🔍 Verificando sessões do Stripe...');
    
    // Buscar as últimas 10 sessões
    const sessions = await stripe.checkout.sessions.list({
      limit: 10,
      expand: ['data.customer']
    });
    
    console.log(`📊 Encontradas ${sessions.data.length} sessões:`);
    
    sessions.data.forEach((session, i) => {
      const tenantSlug = session.metadata?.tenantSlug || 'N/A';
      const email = session.customer_details?.email || session.metadata?.userEmail || 'N/A';
      const status = session.status;
      const paymentStatus = session.payment_status;
      
      console.log(`${i+1}. Session: ${session.id}`);
      console.log(`   Tenant: ${tenantSlug}`);
      console.log(`   Email: ${email}`);
      console.log(`   Status: ${status} | Payment: ${paymentStatus}`);
      console.log(`   Created: ${new Date(session.created * 1000).toLocaleString()}`);
      console.log('---');
    });
    
    // Procurar especificamente por CasaVerde
    console.log('\n🔍 Procurando sessões do CasaVerde...');
    const casaVerdeSessions = sessions.data.filter(s => 
      s.metadata?.tenantSlug?.toLowerCase().includes('casaverde') ||
      s.customer_details?.email?.toLowerCase().includes('casaverde')
    );
    
    if (casaVerdeSessions.length > 0) {
      console.log('✅ Sessões CasaVerde encontradas:');
      casaVerdeSessions.forEach(session => {
        console.log(`- ${session.id} | Status: ${session.status} | Payment: ${session.payment_status}`);
        console.log(`  Metadata:`, session.metadata);
      });
    } else {
      console.log('❌ Nenhuma sessão encontrada para CasaVerde');
    }
    
  } catch (error) {
    console.error('❌ Erro:', error.message);
  }
}

checkStripeSessions();