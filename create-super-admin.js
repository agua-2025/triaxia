const { PrismaClient } = require('@prisma/client')
const readline = require('readline')

const prisma = new PrismaClient()

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
})

function question(query) {
  return new Promise(resolve => {
    rl.question(query, resolve)
  })
}

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
}

async function createSuperAdmin() {
  try {
    console.log('\n🔐 CRIAÇÃO DE SUPER ADMINISTRADOR DO SISTEMA')
    console.log('=' .repeat(50))
    console.log('\n⚠️  ATENÇÃO: Este script cria um usuário com acesso total ao sistema!')
    console.log('   Use apenas para criar o primeiro administrador.\n')

    // Verificar se já existem super admins
    const existingAdmins = await prisma.systemAdmin.findMany({
      where: {
        role: 'SUPER_ADMIN',
        isActive: true
      }
    })

    if (existingAdmins.length > 0) {
      console.log('\n📋 SUPER_ADMINs existentes:')
      existingAdmins.forEach((admin, index) => {
        console.log(`   ${index + 1}. ${admin.email} (${admin.name || 'Sem nome'}) - Criado em: ${admin.createdAt.toLocaleDateString('pt-BR')}`)
      })
      
      const confirm = await question('\n❓ Já existem SUPER_ADMINs. Deseja criar outro? (s/N): ')
      if (confirm.toLowerCase() !== 's' && confirm.toLowerCase() !== 'sim') {
        console.log('\n✅ Operação cancelada.')
        return
      }
    }

    // Coletar dados do novo admin
    let email
    while (true) {
      email = await question('\n📧 Email do SUPER_ADMIN: ')
      if (isValidEmail(email)) {
        break
      }
      console.log('❌ Email inválido. Tente novamente.')
    }

    // Verificar se o email já existe
    const existingAdmin = await prisma.systemAdmin.findUnique({
      where: { email }
    })

    if (existingAdmin) {
      console.log(`\n❌ Já existe um administrador com o email: ${email}`)
      console.log(`   Status: ${existingAdmin.isActive ? 'Ativo' : 'Inativo'}`)
      console.log(`   Criado em: ${existingAdmin.createdAt.toLocaleDateString('pt-BR')}`)
      return
    }

    const name = await question('👤 Nome do administrador (opcional): ')
    
    console.log('\n📝 RESUMO:')
    console.log(`   Email: ${email}`)
    console.log(`   Nome: ${name || 'Não informado'}`)
    console.log(`   Role: SUPER_ADMIN`)
    console.log(`   Status: Ativo`)
    
    const confirm = await question('\n❓ Confirma a criação? (s/N): ')
    if (confirm.toLowerCase() !== 's' && confirm.toLowerCase() !== 'sim') {
      console.log('\n✅ Operação cancelada.')
      return
    }

    // Criar o SUPER_ADMIN
    const newAdmin = await prisma.systemAdmin.create({
      data: {
        email,
        name: name || null,
        role: 'SUPER_ADMIN',
        isActive: true
      }
    })

    console.log('\n✅ SUPER_ADMIN criado com sucesso!')
    console.log(`   ID: ${newAdmin.id}`)
    console.log(`   Email: ${newAdmin.email}`)
    console.log(`   Nome: ${newAdmin.name || 'Não informado'}`)
    console.log(`   Criado em: ${newAdmin.createdAt.toLocaleString('pt-BR')}`)
    
    console.log('\n🔑 PRÓXIMOS PASSOS:')
    console.log('   1. O usuário deve fazer login no sistema usando este email')
    console.log('   2. Após o login, ele poderá acessar /system-admin')
    console.log('   3. Lembre-se de configurar a autenticação no Supabase para este email')
    
    console.log('\n🛡️  SEGURANÇA:')
    console.log('   - Mantenha este email seguro')
    console.log('   - Use autenticação de dois fatores quando possível')
    console.log('   - Monitore os acessos regularmente')
    
  } catch (error) {
    console.error('\n❌ Erro ao criar SUPER_ADMIN:', error)
    
    if (error.code === 'P2002') {
      console.log('\n💡 Este email já está cadastrado como SUPER_ADMIN.')
    }
  } finally {
    rl.close()
    await prisma.$disconnect()
  }
}

// Executar o script
createSuperAdmin().catch(console.error)