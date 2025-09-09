// simulate-paid-session.js
// Script para simular uma sessão paga e demonstrar o funcionamento correto

require('dotenv').config({ path: '.env.local' });
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function simulatePaidSession() {
  console.log('🧪 Simulando uma sessão PAGA para demonstrar o funcionamento correto...');
  
  try {
    // 1. Criar um tenant "prada" diretamente no banco para simular uma sessão paga
    console.log('1️⃣ Criando tenant "prada" (simulando sessão paga)...');
    
    // Primeiro, verificar se já existe
    let pradaTenant = await prisma.tenant.findFirst({ where: { slug: 'prada' } });
    
    if (pradaTenant) {
      console.log('✅ Tenant "prada" já existe:', pradaTenant.name);
    } else {
      pradaTenant = await prisma.tenant.create({
        data: {
          name: 'Prada', // Nome correto da empresa
          slug: 'prada',
          domain: 'prada.triaxia.com.br',
          plan: 'starter',
          status: 'active',
          customerId: 'cus_simulated_prada',
          subscriptionId: 'sub_simulated_prada',
          settings: {
            onboardingCompleted: false,
            setupStep: 'company_info',
          },
        },
      });
      console.log('✅ Tenant "prada" criado:', pradaTenant.name);
    }
    
    // 2. Criar/atualizar usuário
    console.log('2️⃣ Criando/atualizando usuário...');
    const user = await prisma.user.upsert({
      where: { 
        email_tenantId: { 
          email: 'vivendamirassol@gmail.com', 
          tenantId: pradaTenant.id 
        } 
      },
      create: {
        email: 'vivendamirassol@gmail.com',
        name: 'vivendamirassol',
        role: 'ADMIN',
        tenantId: pradaTenant.id,
      },
      update: {},
    });
    console.log('✅ Usuário criado/atualizado:', user.email);
    
    // 3. Simular envio de email de ativação
    console.log('3️⃣ Simulando envio de email de ativação...');
    
    // Importar a função de envio de email
    const { sendActivationEmail } = require('./src/lib/email/activation-email.ts');
    const { createActivationToken } = require('./src/lib/auth/activation-service.ts');
    
    // Criar token de ativação
    const token = await createActivationToken({
      email: user.email,
      userId: user.id,
      tenantId: pradaTenant.id,
      expiresInHours: 48,
      createdFromIp: 'simulation',
    });
    
    // Enviar email
    const emailResult = await sendActivationEmail({
      email: user.email,
      name: user.name || user.email.split('@')[0],
      tenantName: pradaTenant.name, // Aqui está o nome correto: "Prada"
      tenantSlug: pradaTenant.slug,
      activationToken: token,
      expiresInHours: 48,
    });
    
    if (emailResult.success) {
      console.log('✅ Email de ativação enviado com sucesso!');
      console.log('📧 Destinatário:', user.email);
      console.log('🏢 Nome da empresa no email:', pradaTenant.name);
      console.log('🔗 O email deve mostrar "Bem-vindo à Prada!" no cabeçalho');
    } else {
      console.log('❌ Erro ao enviar email:', emailResult.error);
    }
    
    // 4. Mostrar comparação
    console.log('\n=== COMPARAÇÃO DOS TENANTS ===');
    const allTenants = await prisma.tenant.findMany({
      orderBy: { createdAt: 'desc' }
    });
    
    allTenants.forEach((t, i) => {
      console.log(`${i + 1}. Nome: "${t.name}" | Slug: "${t.slug}"`);
    });
    
  } catch (error) {
    console.error('❌ Erro durante a simulação:', error.message);
  } finally {
    await prisma.$disconnect();
  }
}

simulatePaidSession();