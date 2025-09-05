const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function checkInnovatechTenant() {
  try {
    console.log('🔍 Verificando tenant "innovatech"...');
    
    // Buscar o tenant
    const tenant = await prisma.tenant.findUnique({
      where: {
        slug: 'innovatech'
      },
      include: {
        users: true
      }
    });

    if (tenant) {
      console.log('✅ Tenant "innovatech" encontrado:');
      console.log(`- ID: ${tenant.id}`);
      console.log(`- Nome: ${tenant.name}`);
      console.log(`- Slug: ${tenant.slug}`);
      console.log(`- Domínio: ${tenant.domain}`);
      console.log(`- Plano: ${tenant.plan}`);
      console.log(`- Status: ${tenant.status}`);
      console.log(`- Customer ID: ${tenant.customerId}`);
      console.log(`- Subscription ID: ${tenant.subscriptionId}`);
      console.log(`- Usuários: ${tenant.users.length}`);
      
      if (tenant.users.length > 0) {
        console.log('\n👥 Usuários do tenant:');
        tenant.users.forEach(user => {
          console.log(`- ${user.email} (${user.role})`);
        });
      }
    } else {
      console.log('❌ Tenant "innovatech" não encontrado.');
    }

    // Verificar eventos de webhook recentes
    console.log('\n📝 Verificando eventos de webhook recentes...');
    const recentEvents = await prisma.webhookEvent.findMany({
      orderBy: {
        createdAt: 'desc'
      },
      take: 5
    });

    if (recentEvents.length > 0) {
      console.log('Últimos eventos de webhook:');
      recentEvents.forEach(event => {
        console.log(`- ${event.type} - ${event.status} - ${event.createdAt}`);
      });
    } else {
      console.log('Nenhum evento de webhook encontrado.');
    }

  } catch (error) {
    console.error('Erro ao verificar tenant:', error);
  } finally {
    await prisma.$disconnect();
  }
}

checkInnovatechTenant();