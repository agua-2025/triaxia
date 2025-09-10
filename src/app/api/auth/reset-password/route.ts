import { NextRequest, NextResponse } from 'next/server'
import { createAdminClient } from '@/lib/supabase/admin'
import { validatePasswordSecurity } from '@/lib/auth/password-security'
import { auditLogger } from '@/lib/audit/audit-logger'
import { getClientIP } from '@/lib/utils/ip'

export async function POST(request: NextRequest) {
  try {
    const { token, password } = await request.json()

    if (!token || !password) {
      return NextResponse.json(
        { error: 'Token e nova senha são obrigatórios' },
        { status: 400 }
      )
    }

    // Validar força da senha
    const passwordValidation = validatePasswordSecurity(password)
    if (!passwordValidation.isValid) {
      return NextResponse.json(
        { 
          error: 'Senha não atende aos requisitos de segurança',
          details: passwordValidation.errors
        },
        { status: 400 }
      )
    }

    const supabaseAdmin = createAdminClient()
    const clientIP = getClientIP(request)

    // Verificar e usar o token para resetar a senha
    const { data, error } = await supabaseAdmin.auth.verifyOtp({
      token_hash: token,
      type: 'recovery'
    })

    if (error || !data.user) {
      console.error('Erro ao verificar token de recuperação:', error)
      
      // Log da tentativa de reset falhada
      await auditLogger.logPasswordReset({
        email: 'unknown',
        success: false,
        error: error?.message || 'Token inválido',
        ipAddress: clientIP,
        userAgent: request.headers.get('user-agent') || 'Unknown'
      })

      return NextResponse.json(
        { error: 'Token inválido ou expirado' },
        { status: 400 }
      )
    }

    // Atualizar a senha do usuário
    const { error: updateError } = await supabaseAdmin.auth.admin.updateUserById(
      data.user.id,
      { password }
    )

    if (updateError) {
      console.error('Erro ao atualizar senha:', updateError)
      
      // Log da tentativa de reset falhada
      await auditLogger.logPasswordReset({
        email: data.user.email || 'unknown',
        success: false,
        error: updateError.message,
        ipAddress: clientIP,
        userAgent: request.headers.get('user-agent') || 'Unknown'
      })

      return NextResponse.json(
        { error: 'Erro ao atualizar senha' },
        { status: 500 }
      )
    }

    // Log do reset bem-sucedido
    await auditLogger.logPasswordReset({
      email: data.user.email || 'unknown',
      success: true,
      ipAddress: clientIP,
      userAgent: request.headers.get('user-agent') || 'Unknown'
    })

    return NextResponse.json({
      message: 'Senha atualizada com sucesso. Você pode fazer login com a nova senha.'
    })

  } catch (error) {
    console.error('Erro no reset de senha:', error)
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 }
    )
  }
}