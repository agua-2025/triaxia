const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

async function checkAdmins() {
  try {
    const admins = await prisma.systemAdmin.findMany({
      where: { isActive: true }
    })
    
    console.log('\n📋 SUPER_ADMINs ativos no sistema:')
    console.log('=' .repeat(50))
    
    if (admins.length === 0) {
      console.log('❌ Nenhum SUPER_ADMIN ativo encontrado!')
    } else {
      admins.forEach((admin, index) => {
        console.log(`\n${index + 1}. ${admin.email}`)
        console.log(`   Nome: ${admin.name || 'Não informado'}`)
        console.log(`   ID: ${admin.id}`)
        console.log(`   Role: ${admin.role}`)
        console.log(`   Ativo: ${admin.isActive ? 'Sim' : 'Não'}`)
        console.log(`   Criado em: ${admin.createdAt.toLocaleString('pt-BR')}`)
        console.log(`   Último login: ${admin.lastLogin ? admin.lastLogin.toLocaleString('pt-BR') : 'Nunca'}`)
      })
    }
    
    console.log('\n' + '=' .repeat(50))
    console.log(`Total: ${admins.length} SUPER_ADMIN(s) ativo(s)`)
    
  } catch (error) {
    console.error('❌ Erro ao verificar admins:', error)
  } finally {
    await prisma.$disconnect()
  }
}

checkAdmins()