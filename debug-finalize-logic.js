// debug-finalize-logic.js
const { PrismaClient } = require('@prisma/client');
const Stripe = require('stripe');
require('dotenv').config();

const prisma = new PrismaClient();
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

async function debugFinalizeLogic() {
  try {
    const sessionId = 'cs_test_b1OHOlYxPYrGJsKZhYZMItipauK2k6AFlBksOOuLoeRnRlBJLGeUI2JVc3';
    
    console.log('🔍 Simulando lógica do endpoint de finalização...');
    
    // 1. Buscar sessão no Stripe
    const session = await stripe.checkout.sessions.retrieve(sessionId);
    console.log('✅ Sessão encontrada:', session.id);
    
    // 2. Extrair dados
    const tenantSlug = (session.metadata?.tenantSlug) ?? '';
    const plan = (session.metadata?.plan) ?? 'starter';
    
    console.log('📊 Dados extraídos:');
    console.log('- tenantSlug:', tenantSlug);
    console.log('- plan:', plan);
    console.log('- customer:', session.customer);
    console.log('- subscription:', session.subscription);
    
    // 3. Simular lógica de busca de tenant
    let tenant = null;
    
    console.log('\n🔍 Iniciando busca de tenant...');
    
    // 1. Primeiro, busca por tenantSlug se fornecido
    if (tenantSlug) {
      console.log('🔍 Buscando por tenantSlug:', tenantSlug);
      tenant = await prisma.tenant.findUnique({ where: { slug: tenantSlug } });
      console.log('📊 Resultado busca por slug:', tenant ? `Encontrado: ${tenant.slug}` : 'Não encontrado');
    }
    
    // 2. Se não encontrou por slug E não há slug definido, busca por customerId
    if (!tenant && !tenantSlug && session.customer) {
      console.log('🔍 Buscando por customerId:', session.customer);
      tenant = await prisma.tenant.findUnique({
        where: { customerId: String(session.customer) },
      });
      console.log('📊 Resultado busca por customerId:', tenant ? `Encontrado: ${tenant.slug}` : 'Não encontrado');
    }
    
    // 3. Se ainda não encontrou, busca por subscriptionId
    if (!tenant && session.subscription) {
      console.log('🔍 Buscando por subscriptionId:', session.subscription);
      tenant = await prisma.tenant.findUnique({
        where: { subscriptionId: String(session.subscription) },
      });
      console.log('📊 Resultado busca por subscriptionId:', tenant ? `Encontrado: ${tenant.slug}` : 'Não encontrado');
    }
    
    console.log('\n🎯 Resultado final da busca:');
    if (tenant) {
      console.log('✅ Tenant encontrado:', {
        id: tenant.id,
        slug: tenant.slug,
        name: tenant.name,
        customerId: tenant.customerId
      });
    } else {
      console.log('❌ Nenhum tenant encontrado - deveria criar novo');
      console.log('📝 Dados para criação:');
      console.log('- name:', tenantSlug ? tenantSlug.charAt(0).toUpperCase() + tenantSlug.slice(1) : 'Empresa');
      console.log('- slug:', tenantSlug || `t-${sessionId.slice(-8)}`);
      console.log('- customerId:', String(session.customer));
    }
    
  } catch (error) {
    console.error('❌ Erro:', error.message);
  } finally {
    await prisma.$disconnect();
  }
}

debugFinalizeLogic();