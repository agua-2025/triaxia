const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function checkTenants() {
  try {
    const tenants = await prisma.tenant.findMany({
      orderBy: { createdAt: 'desc' },
      take: 10
    });
    
    console.log('\n=== ÚLTIMOS TENANTS CRIADOS ===');
    tenants.forEach((t, i) => {
      console.log(`${i + 1}. Nome: "${t.name}" | Slug: "${t.slug}" | Criado: ${t.createdAt}`);
    });
    
    // Verificar especificamente os tenants "prada" e "todinho"
    const prada = await prisma.tenant.findFirst({ where: { slug: 'prada' } });
    const todinho = await prisma.tenant.findFirst({ where: { slug: 'todinho' } });
    
    console.log('\n=== TENANTS ESPECÍFICOS ===');
    if (prada) {
      console.log(`Prada encontrado: Nome="${prada.name}", ID=${prada.id}`);
    } else {
      console.log('Tenant "prada" não encontrado');
    }
    
    if (todinho) {
      console.log(`Todinho encontrado: Nome="${todinho.name}", ID=${todinho.id}`);
    } else {
      console.log('Tenant "todinho" não encontrado');
    }
    
  } catch (error) {
    console.error('Erro:', error);
  } finally {
    await prisma.$disconnect();
  }
}

checkTenants();