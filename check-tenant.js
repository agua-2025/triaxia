const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function checkTenant() {
  try {
    console.log('Verificando tenant "tradicao"...');
    
    const tenant = await prisma.tenant.findUnique({
      where: { slug: 'tradicao' }
    });
    
    if (tenant) {
      console.log('✅ Tenant "tradicao" encontrado:');
      console.log(JSON.stringify(tenant, null, 2));
    } else {
      console.log('❌ Tenant "tradicao" NÃO encontrado');
      
      // Listar todos os tenants existentes
      const allTenants = await prisma.tenant.findMany({
        select: { slug: true, name: true, createdAt: true }
      });
      
      console.log('\nTenants existentes:');
      allTenants.forEach(t => {
        console.log(`- ${t.slug} (${t.name}) - criado em ${t.createdAt}`);
      });
    }
  } catch (error) {
    console.error('Erro ao verificar tenant:', error);
  } finally {
    await prisma.$disconnect();
  }
}

checkTenant();