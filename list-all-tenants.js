const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function listAllTenants() {
  try {
    console.log('🔍 Listando todos os tenants no banco de dados...');
    
    // Buscar todos os tenants
    const tenants = await prisma.tenant.findMany({
      include: {
        users: true
      },
      orderBy: {
        createdAt: 'desc'
      }
    });

    if (tenants.length > 0) {
      console.log(`\n✅ Encontrados ${tenants.length} tenant(s):\n`);
      
      tenants.forEach((tenant, index) => {
        console.log(`${index + 1}. ${tenant.name}`);
        console.log(`   - Slug: ${tenant.slug}`);
        console.log(`   - Domínio: ${tenant.domain || 'null'}`);
        console.log(`   - Plano: ${tenant.plan}`);
        console.log(`   - Status: ${tenant.status}`);
        console.log(`   - Customer ID: ${tenant.customerId || 'null'}`);
        console.log(`   - Subscription ID: ${tenant.subscriptionId || 'null'}`);
        console.log(`   - Usuários: ${tenant.users.length}`);
        console.log(`   - Criado em: ${tenant.createdAt}`);
        
        if (tenant.users.length > 0) {
          console.log(`   - Admin: ${tenant.users.find(u => u.role === 'ADMIN')?.email || 'N/A'}`);
        }
        console.log('');
      });
    } else {
      console.log('❌ Nenhum tenant encontrado no banco de dados.');
    }

  } catch (error) {
    console.error('❌ Erro ao listar tenants:', error);
  } finally {
    await prisma.$disconnect();
  }
}

listAllTenants();