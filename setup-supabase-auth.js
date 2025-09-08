const { createClient } = require('@supabase/supabase-js')
require('dotenv').config()

// Configuração do Supabase Admin (precisa das chaves de admin)
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY // Chave de serviço

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('❌ Variáveis de ambiente não configuradas:')
  console.log('   NEXT_PUBLIC_SUPABASE_URL:', supabaseUrl ? '✅' : '❌')
  console.log('   SUPABASE_SERVICE_ROLE_KEY:', supabaseServiceKey ? '✅' : '❌')
  console.log('\n💡 Adicione a SUPABASE_SERVICE_ROLE_KEY no arquivo .env')
  process.exit(1)
}

const supabase = createClient(supabaseUrl, supabaseServiceKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false
  }
})

async function setupSuperAdminAuth() {
  try {
    console.log('\n🔐 CONFIGURAÇÃO DE AUTENTICAÇÃO SUPER_ADMIN')
    console.log('=' .repeat(50))
    
    const email = 'vivendamirassol@gmail.com'
    const password = 'Triaxia2025!' // Senha temporária segura
    
    console.log(`\n📧 Configurando autenticação para: ${email}`)
    
    // Verificar se o usuário já existe
    const { data: existingUsers, error: listError } = await supabase.auth.admin.listUsers()
    
    if (listError) {
      console.error('❌ Erro ao listar usuários:', listError.message)
      return
    }
    
    const existingUser = existingUsers.users.find(user => user.email === email)
    
    if (existingUser) {
      console.log('👤 Usuário já existe no Supabase Auth')
      console.log(`   ID: ${existingUser.id}`)
      console.log(`   Email: ${existingUser.email}`)
      console.log(`   Confirmado: ${existingUser.email_confirmed_at ? 'Sim' : 'Não'}`)
      
      // Atualizar senha
      const { error: updateError } = await supabase.auth.admin.updateUserById(
        existingUser.id,
        { 
          password: password,
          email_confirm: true
        }
      )
      
      if (updateError) {
        console.error('❌ Erro ao atualizar senha:', updateError.message)
        return
      }
      
      console.log('✅ Senha atualizada com sucesso!')
    } else {
      console.log('👤 Criando novo usuário no Supabase Auth...')
      
      // Criar novo usuário
      const { data: newUser, error: createError } = await supabase.auth.admin.createUser({
        email: email,
        password: password,
        email_confirm: true // Confirmar email automaticamente
      })
      
      if (createError) {
        console.error('❌ Erro ao criar usuário:', createError.message)
        return
      }
      
      console.log('✅ Usuário criado com sucesso!')
      console.log(`   ID: ${newUser.user.id}`)
      console.log(`   Email: ${newUser.user.email}`)
    }
    
    console.log('\n🎯 CREDENCIAIS DE ACESSO:')
    console.log(`   Email: ${email}`)
    console.log(`   Senha: ${password}`)
    console.log(`   URL: http://localhost:3001/login`)
    
    console.log('\n🛡️  SEGURANÇA:')
    console.log('   - Altere a senha após o primeiro login')
    console.log('   - Use uma senha forte e única')
    console.log('   - Considere ativar 2FA quando disponível')
    
  } catch (error) {
    console.error('❌ Erro inesperado:', error)
  }
}

// Executar o script
setupSuperAdminAuth().catch(console.error)