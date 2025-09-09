// check-casaverde-metadata.js
const Stripe = require('stripe');
require('dotenv').config();

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

async function checkCasaVerdeMetadata() {
  try {
    const sessionId = 'cs_test_b1OHOlYxPYrGJsKZhYZMItipauK2k6AFlBksOOuLoeRnRlBJLGeUI2JVc3';
    
    console.log('🔍 Verificando metadata da sessão CasaVerde...');
    const session = await stripe.checkout.sessions.retrieve(sessionId);
    
    console.log('📊 Dados da sessão:');
    console.log('- ID:', session.id);
    console.log('- Customer ID:', session.customer);
    console.log('- Status:', session.status);
    console.log('- Payment Status:', session.payment_status);
    console.log('- Metadata:', JSON.stringify(session.metadata, null, 2));
    
    const tenantSlug = session.metadata?.tenantSlug;
    console.log('\n🏷️ TenantSlug extraído:', tenantSlug || 'UNDEFINED');
    
    if (!tenantSlug) {
      console.log('❌ PROBLEMA: tenantSlug não está definido no metadata!');
      console.log('💡 Isso explica por que o endpoint busca por customerId e encontra o tenant "todinho"');
    } else {
      console.log('✅ TenantSlug definido:', tenantSlug);
    }
    
  } catch (error) {
    console.error('❌ Erro:', error.message);
  }
}

checkCasaVerdeMetadata();