// Script para testar o salvamento das configurações
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function testSettingsSave() {
  try {
    console.log('🔍 Testando salvamento de configurações...');
    
    // Verificar se o tenant 'futura' existe
    const tenant = await prisma.tenant.findUnique({
      where: { slug: 'futura' },
      select: {
        id: true,
        name: true,
        slug: true,
        settings: true
      }
    });
    
    if (!tenant) {
      console.log('❌ Tenant "futura" não encontrado!');
      return;
    }
    
    console.log('✅ Tenant encontrado:', tenant.slug);
    console.log('📋 Configurações atuais:', JSON.stringify(tenant.settings, null, 2));
    
    // Testar atualização das configurações
    const newSettings = {
      name: 'Futura Teste',
      description: 'Empresa inovadora focada em soluções tecnológicas avançadas - TESTE',
      website: 'https://futura.com.br',
      email: 'contato@futura.com.br',
      phone: '+55 11 99999-9999',
      address: 'São Paulo, SP - Brasil',
      logo: '',
      favicon: '',
      primaryColor: '#3B82F6',
      secondaryColor: '#1E40AF',
      accentColor: '#10B981'
    };
    
    console.log('💾 Salvando novas configurações...');
    
    const updatedTenant = await prisma.tenant.update({
      where: { slug: 'futura' },
      data: {
        name: newSettings.name,
        settings: newSettings
      }
    });
    
    console.log('✅ Configurações salvas com sucesso!');
    console.log('📋 Novas configurações:', JSON.stringify(updatedTenant.settings, null, 2));
    
  } catch (error) {
    console.error('❌ Erro ao testar salvamento:', error);
  } finally {
    await prisma.$disconnect();
  }
}

testSettingsSave();