// simulate-webhook.js
// Script para simular o processamento do webhook do Stripe localmente

require('dotenv').config({ path: '.env.local' });
const { PrismaClient } = require('@prisma/client');
const crypto = require('crypto');
const nodemailer = require('nodemailer');

const prisma = new PrismaClient();

// Função para buscar dados do evento do Stripe
async function getEventData(eventId) {
  const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
  
  try {
    const event = await stripe.events.retrieve(eventId);
    const session = event.data.object;
    
    return {
      tenantSlug: session.metadata.tenantSlug,
      userEmail: session.metadata.userEmail,
      plan: session.metadata.plan,
      sessionId: session.id
    };
  } catch (error) {
    console.error('❌ Erro ao buscar evento do Stripe:', error.message);
    return null;
  }
}

async function simulateWebhookProcessing(eventId) {
  // Buscar dados do evento
  const webhookData = await getEventData(eventId);
  
  if (!webhookData) {
    console.log('❌ Não foi possível obter dados do evento');
    return;
  }
  
  console.log(`🔄 Simulando processamento do webhook para o tenant "${webhookData.tenantSlug}"...`);
  console.log(`📧 Email do usuário: ${webhookData.userEmail}`);
  console.log(`📋 Plano: ${webhookData.plan}`);
  
  try {
    // 1. Verificar se o tenant já existe
    console.log('\n1️⃣ Verificando se o tenant já existe...');
    const existingTenant = await prisma.tenant.findUnique({
      where: { slug: webhookData.tenantSlug }
    });
    
    if (existingTenant) {
      console.log('⚠️ Tenant já existe:', existingTenant.name);
      console.log('   Status atual:', existingTenant.status);
      
      // Atualizar para ativo se estiver em trial
      if (existingTenant.status === 'trial') {
        console.log('\n🔄 Atualizando tenant para status "active"...');
        await prisma.tenant.update({
          where: { id: existingTenant.id },
          data: { status: 'active' }
        });
        console.log('✅ Tenant atualizado para ativo!');
      }
      
      return;
    }
    
    // 2. Criar o tenant
    console.log('\n2️⃣ Criando novo tenant...');
    const tenant = await prisma.tenant.create({
      data: {
        name: webhookData.tenantSlug.charAt(0).toUpperCase() + webhookData.tenantSlug.slice(1),
        slug: webhookData.tenantSlug,
        email: webhookData.userEmail,
        status: 'active', // Direto para ativo já que foi pago
        plan: webhookData.plan
      }
    });
    
    console.log('✅ Tenant criado:', tenant.name);
    console.log('   ID:', tenant.id);
    console.log('   Slug:', tenant.slug);
    console.log('   Status:', tenant.status);
    
    // 3. Verificar se o usuário já existe
    console.log('\n3️⃣ Verificando usuário...');
    let user = await prisma.user.findUnique({
      where: { email: webhookData.userEmail }
    });
    
    if (!user) {
      // Criar usuário temporário
      console.log('\n4️⃣ Criando usuário temporário...');
      
      // Gerar token de ativação
      const activationToken = crypto.randomBytes(32).toString('hex');
      const tokenExpiry = new Date(Date.now() + 48 * 60 * 60 * 1000); // 48 horas
      
      user = await prisma.user.create({
        data: {
          email: webhookData.userEmail,
          name: 'Usuário Trae',
          role: 'ADMIN',
          tenantId: tenant.id,
          isActive: false, // Inativo até ativar
          activationToken,
          activationTokenExpiry: tokenExpiry
        }
      });
      
      console.log('✅ Usuário criado:', user.email);
      console.log('   Role:', user.role);
      console.log('   Status:', user.isActive ? 'Ativo' : 'Aguardando ativação');
      
      // 5. Simular envio de email de ativação
      console.log('\n5️⃣ Simulando envio de email de ativação...');
      const activationUrl = `http://localhost:3000/activate?token=${activationToken}`;
      
      console.log('📧 Email de ativação seria enviado para:', user.email);
      console.log('🔗 Link de ativação:', activationUrl);
      console.log('⏰ Token expira em:', tokenExpiry.toLocaleString('pt-BR'));
      
    } else {
      console.log('✅ Usuário já existe:', user.email);
      
      // Associar ao tenant se não estiver associado
      if (user.tenantId !== tenant.id) {
        console.log('\n🔄 Associando usuário ao tenant...');
        await prisma.user.update({
          where: { id: user.id },
          data: { tenantId: tenant.id }
        });
        console.log('✅ Usuário associado ao tenant!');
      }
    }
    
    console.log('\n🎉 Processamento do webhook simulado com sucesso!');
    console.log('\n📋 Resumo:');
    console.log(`   - Tenant: ${tenant.name} (${tenant.slug})`);
    console.log(`   - Status: ${tenant.status}`);
    console.log(`   - Usuário: ${user.email} (${user.role})`);
    console.log(`   - Ativo: ${user.isActive ? 'Sim' : 'Não - Aguardando ativação'}`);
    
  } catch (error) {
    console.error('❌ Erro ao simular webhook:', error.message);
    console.error(error);
  } finally {
    await prisma.$disconnect();
  }
}

// Executar a simulação
const eventId = process.argv[2];

if (!eventId) {
  console.log('❌ Por favor, forneça o ID do evento do Stripe');
  console.log('Uso: node simulate-webhook.js <event_id>');
  process.exit(1);
}

simulateWebhookProcessing(eventId)
  .then(() => {
    console.log('\n✅ Simulação concluída!');
    process.exit(0);
  })
  .catch((error) => {
    console.error('❌ Erro na simulação:', error);
    process.exit(1);
  });