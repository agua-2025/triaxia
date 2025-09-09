// check-activation-tokens.js
const { PrismaClient } = require('@prisma/client');
require('dotenv').config();

const prisma = new PrismaClient();

async function checkActivationTokens() {
  try {
    console.log('🔍 Verificando tokens de ativação...');
    
    // Buscar tokens de ativação recentes
    const tokens = await prisma.activationToken.findMany({
      where: {
        email: 'vivendamirassol@gmail.com'
      },
      include: {
        tenant: {
          select: {
            id: true,
            name: true,
            slug: true
          }
        }
      },
      orderBy: {
        createdAt: 'desc'
      },
      take: 5
    });
    
    console.log(`📊 Encontrados ${tokens.length} tokens para vivendamirassol@gmail.com:`);
    
    tokens.forEach((token, index) => {
      console.log(`\n${index + 1}. Token ID: ${token.id}`);
      console.log(`   - Email: ${token.email}`);
      console.log(`   - Usado: ${token.isUsed ? 'SIM' : 'NÃO'}`);
      console.log(`   - Expira em: ${token.expiresAt}`);
      console.log(`   - Criado em: ${token.createdAt}`);
      console.log(`   - Tenant: ${token.tenant?.name} (${token.tenant?.slug})`);
      console.log(`   - User ID: ${token.userId}`);
      
      if (token.usedAt) {
        console.log(`   - Usado em: ${token.usedAt}`);
      }
    });
    
    // Verificar se há tokens não utilizados
    const unusedTokens = tokens.filter(t => !t.isUsed);
    console.log(`\n🎯 Tokens não utilizados: ${unusedTokens.length}`);
    
    if (unusedTokens.length > 0) {
      console.log('✅ Há tokens de ativação pendentes - o email provavelmente foi enviado');
      console.log('💡 O usuário precisa clicar no link do email para ativar a conta');
    } else {
      console.log('⚠️ Todos os tokens foram utilizados ou não há tokens pendentes');
    }
    
  } catch (error) {
    console.error('❌ Erro:', error.message);
  } finally {
    await prisma.$disconnect();
  }
}

checkActivationTokens();