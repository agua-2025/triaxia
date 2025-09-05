const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function createTenantGenial() {
  try {
    console.log('🚀 Criando tenant "genial" diretamente no banco de dados...');
    
    // Verificar se o tenant já existe
    const existingTenant = await prisma.tenant.findUnique({
      where: { slug: 'genial' }
    });
    
    if (existingTenant) {
      console.log('⚠️ Tenant "genial" já existe!');
      console.log('📊 Dados do tenant:', existingTenant);
      return;
    }
    
    // Criar o tenant
    const newTenant = await prisma.tenant.create({
      data: {
        name: 'Empresa Genial',
        slug: 'genial',
        domain: 'genial.triaxia.com.br',
        plan: 'professional',
        status: 'active',
        customerId: 'cus_manual_genial',
        subscriptionId: null,
        trialEndsAt: null,
      },
    });
    
    console.log('✅ Tenant "genial" criado com sucesso!');
    console.log('📊 ID do tenant:', newTenant.id);
    console.log('📊 Slug:', newTenant.slug);
    console.log('📊 Domínio:', newTenant.domain);
    
    // Criar usuário administrador
    const adminUser = await prisma.user.create({
      data: {
        email: 'admin@genial.com.br',
        name: 'Administrador Genial',
        role: 'ADMIN',
        tenantId: newTenant.id,
      },
    });
    
    console.log('✅ Usuário administrador criado!');
    console.log('📊 Email:', adminUser.email);
    console.log('📊 ID:', adminUser.id);
    
    console.log('🎯 Tenant "genial" está pronto para uso!');
    console.log('🌐 Acesse: http://localhost:3000/genial');
    console.log('⚙️ Dashboard: http://localhost:3000/dashboard');
    
  } catch (error) {
    console.error('❌ Erro ao criar tenant "genial":', error);
  } finally {
    await prisma.$disconnect();
  }
}

createTenantGenial();