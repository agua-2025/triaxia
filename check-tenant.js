const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function checkTenant() {
  try {
    console.log('🔍 Verificando tenants no banco...');
    
    const tenants = await prisma.tenant.findMany({
      include: {
        users: true
      }
    });
    
    console.log(`📊 Total de tenants encontrados: ${tenants.length}`);
    
    tenants.forEach((tenant, index) => {
      console.log(`\n${index + 1}. Tenant:`);
      console.log(`   ID: ${tenant.id}`);
      console.log(`   Nome: ${tenant.name}`);
      console.log(`   Slug: ${tenant.slug}`);
      console.log(`   Email: ${tenant.email}`);
      console.log(`   Status: ${tenant.status}`);
      console.log(`   Criado em: ${tenant.createdAt}`);
      console.log(`   Usuários: ${tenant.users.length}`);
      
      if (tenant.users.length > 0) {
        tenant.users.forEach((user, userIndex) => {
          console.log(`     ${userIndex + 1}. ${user.email} (${user.role})`);
        });
      }
    });
    
  } catch (error) {
    console.error('❌ Erro ao consultar banco:', error);
  } finally {
    await prisma.$disconnect();
  }
}

checkTenant();