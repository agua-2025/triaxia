require('dotenv').config({ path: '.env.local' });
const Stripe = require('stripe');
const { PrismaClient } = require('@prisma/client');

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: '2025-08-27.basil',
});
const prisma = new PrismaClient();

async function debugCasaVerdeSession() {
  try {
    const sessionId = 'cs_test_b1OHOlYxPYrGJsKZhYZMItipauK2k6AFlBksOOuLoeRnRlBJLGeUI2JVc3';
    
    console.log('🔍 Analisando sessão CasaVerde em detalhes...');
    
    // Buscar a sessão no Stripe
    const session = await stripe.checkout.sessions.retrieve(sessionId);
    
    console.log('📊 Dados da sessão:');
    console.log('- ID:', session.id);
    console.log('- Status:', session.status);
    console.log('- Payment Status:', session.payment_status);
    console.log('- Customer ID:', session.customer);
    console.log('- Subscription ID:', session.subscription);
    console.log('- Metadata:', JSON.stringify(session.metadata, null, 2));
    
    const tenantSlug = session.metadata?.tenantSlug;
    const customerId = session.customer;
    const subscriptionId = session.subscription;
    
    console.log('\n🔍 Verificando busca de tenant...');
    
    // Simular a lógica de busca do endpoint
    let tenant = null;
    
    // 1. Buscar por slug
    if (tenantSlug) {
      console.log(`1. Buscando por slug: "${tenantSlug}"`);
      tenant = await prisma.tenant.findUnique({ where: { slug: tenantSlug } });
      if (tenant) {
        console.log('✅ Tenant encontrado por slug:', tenant.name, `(${tenant.slug})`);
      } else {
        console.log('❌ Nenhum tenant encontrado por slug');
      }
    }
    
    // 2. Buscar por customerId
    if (!tenant && customerId) {
      console.log(`2. Buscando por customerId: "${customerId}"`);
      tenant = await prisma.tenant.findUnique({ where: { customerId: String(customerId) } });
      if (tenant) {
        console.log('✅ Tenant encontrado por customerId:', tenant.name, `(${tenant.slug})`);
        console.log('⚠️  PROBLEMA: Este é o tenant que está sendo retornado!');
      } else {
        console.log('❌ Nenhum tenant encontrado por customerId');
      }
    }
    
    // 3. Buscar por subscriptionId
    if (!tenant && subscriptionId) {
      console.log(`3. Buscando por subscriptionId: "${subscriptionId}"`);
      tenant = await prisma.tenant.findUnique({ where: { subscriptionId: String(subscriptionId) } });
      if (tenant) {
        console.log('✅ Tenant encontrado por subscriptionId:', tenant.name, `(${tenant.slug})`);
      } else {
        console.log('❌ Nenhum tenant encontrado por subscriptionId');
      }
    }
    
    // Verificar todos os tenants com esse customerId
    if (customerId) {
      console.log('\n🔍 Todos os tenants com este customerId:');
      const allTenants = await prisma.tenant.findMany({
        where: { customerId: String(customerId) }
      });
      
      allTenants.forEach((t, i) => {
        console.log(`${i+1}. ${t.name} (${t.slug}) - Customer: ${t.customerId}`);
      });
    }
    
    console.log('\n💡 Conclusão:');
    if (tenant) {
      console.log('- O endpoint está encontrando um tenant existente em vez de criar um novo');
      console.log('- Isso acontece porque o customerId já está associado a outro tenant');
      console.log('- Solução: Verificar por que o mesmo customerId está sendo reutilizado');
    } else {
      console.log('- Nenhum tenant foi encontrado, um novo deveria ser criado');
    }
    
  } catch (error) {
    console.error('❌ Erro:', error.message);
  } finally {
    await prisma.$disconnect();
  }
}

debugCasaVerdeSession();