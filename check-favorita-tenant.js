const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function checkFavoritaTenant() {
  try {
    console.log('🔍 Verificando tenant "favorita"...');
    
    const tenant = await prisma.tenant.findUnique({
      where: { slug: 'favorita' },
      include: {
        users: true
      }
    });
    
    if (tenant) {
      console.log('✅ Tenant "favorita" encontrado:');
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
      console.log('❌ Tenant "favorita" NÃO foi encontrado!');
      
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
    
  } catch (error) {
    console.error('❌ Erro ao verificar tenant:', error);
  } finally {
    await prisma.$disconnect();
  }
}

checkFavoritaTenant();