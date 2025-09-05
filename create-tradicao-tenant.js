const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function createTradicaoTenant() {
  try {
    console.log('Criando tenant "tradicao"...');
    
    const tenant = await prisma.tenant.create({
      data: {
        name: 'Tradição',
        slug: 'tradicao',
        domain: 'tradicao.triaxia.com.br',
        plan: 'professional',
        status: 'active',
        description: 'Empresa Tradição - Soluções inovadoras',
        website: 'https://tradicao.com.br',
        email: 'contato@tradicao.com.br',
        phone: '+55 11 99999-9999',
        address: 'São Paulo, SP - Brasil',
        primaryColor: '#8B5CF6',
        secondaryColor: '#7C3AED',
        accentColor: '#A855F7',
        settings: {
          onboardingCompleted: true,
          setupStep: 'completed'
        }
      }
    });
    
    console.log('✅ Tenant "tradicao" criado com sucesso:');
    console.log(JSON.stringify(tenant, null, 2));
    
    // Criar um usuário admin para o tenant
    const user = await prisma.user.create({
      data: {
        email: 'admin@tradicao.com.br',
        name: 'Administrador Tradição',
        tenantId: tenant.id,
        role: 'ADMIN'
      }
    });
    
    console.log('✅ Usuário admin criado:');
    console.log(JSON.stringify(user, null, 2));
    
  } catch (error) {
    if (error.code === 'P2002') {
      console.log('⚠️ Tenant "tradicao" já existe!');
    } else {
      console.error('Erro ao criar tenant:', error);
    }
  } finally {
    await prisma.$disconnect();
  }
}

createTradicaoTenant();