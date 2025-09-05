const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function checkJubasupermercadoTenant() {
  try {
    console.log('🔍 Verificando tenant "jubasupermercado"...');
    
    const tenant = await prisma.tenant.findUnique({
      where: { slug: 'jubasupermercado' },
      include: {
        users: true
      }
    });
    
    if (tenant) {
      console.log('✅ Tenant "jubasupermercado" encontrado:');
      console.log('- ID:', tenant.id);
      console.log('- Nome:', tenant.name);
      console.log('- Slug:', tenant.slug);
      console.log('- Domínio:', tenant.domain);
      console.log('- Plano:', tenant.plan);
      console.log('- Status:', tenant.status);
      console.log('- Customer ID:', tenant.customerId);
      console.log('- Subscription ID:', tenant.subscriptionId);
      console.log('- Usuários:', tenant.users.length);
      
      if (tenant.users.length > 0) {
        console.log('\n👥 Usuários do tenant:');
        tenant.users.forEach(user => {
          console.log(`- ${user.email} (${user.role})`);
        });
      }
    } else {
      console.log('❌ Tenant "jubasupermercado" NÃO foi encontrado!');
      
      console.log('\n📋 Listando todos os tenants existentes:');
      const allTenants = await prisma.tenant.findMany({
        select: {
          id: true,
          name: true,
          slug: true,
          domain: true,
          plan: true,
          status: true,
          createdAt: true
        },
        orderBy: {
          createdAt: 'desc'
        }
      });
      
      if (allTenants.length === 0) {
        console.log('Nenhum tenant encontrado no banco de dados.');
      } else {
        allTenants.forEach(tenant => {
          console.log(`- ${tenant.slug} (${tenant.name}) - ${tenant.status} - ${tenant.createdAt}`);
        });
      }
    }
    
    // Verificar eventos de webhook recentes
    console.log('\n📝 Verificando eventos de webhook recentes...');
    const recentWebhookEvents = await prisma.webhookEvent.findMany({
      orderBy: {
        createdAt: 'desc'
      },
      take: 10
    });
    
    if (recentWebhookEvents.length > 0) {
      console.log('Últimos eventos de webhook:');
      recentWebhookEvents.forEach(event => {
        console.log(`- ${event.eventType} - ${event.eventId} - ${event.createdAt}`);
      });
    } else {
      console.log('Nenhum evento de webhook encontrado.');
    }
    
  } catch (error) {
    console.error('❌ Erro ao verificar tenant:', error);
  } finally {
    await prisma.$disconnect();
  }
}

checkJubasupermercadoTenant();