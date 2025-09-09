import { NextRequest, NextResponse } from 'next/server'
import { createAdminClient } from '@/lib/supabase/admin'
import { auditLogger } from '@/lib/audit/audit-logger'
import { getClientIP } from '@/lib/utils/ip'

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json()

    if (!email) {
      return NextResponse.json(
        { error: 'Email é obrigatório' },
        { status: 400 }
      )
    }

    // Validar formato do email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Formato de email inválido' },
        { status: 400 }
      )
    }

    const supabaseAdmin = createAdminClient()
    const clientIP = getClientIP(request)

    // Enviar email de recuperação de senha
    const { error } = await supabaseAdmin.auth.resetPasswordForEmail(email, {
      redirectTo: `${process.env.NEXT_PUBLIC_APP_URL}/reset-password`
    })

    if (error) {
      console.error('Erro ao enviar email de recuperação:', error)
      
      // Log da tentativa de recuperação falhada
      await auditLogger.logPasswordResetAttempt({
        email,
        success: false,
        error: error.message,
        ipAddress: clientIP,
        userAgent: request.headers.get('user-agent') || 'Unknown'
      })

      return NextResponse.json(
        { error: 'Erro ao enviar email de recuperação' },
        { status: 500 }
      )
    }

    // Log da tentativa de recuperação bem-sucedida
    await auditLogger.logPasswordResetAttempt({
      email,
      success: true,
      ipAddress: clientIP,
      userAgent: request.headers.get('user-agent') || 'Unknown'
    })

    return NextResponse.json({
      message: 'Email de recuperação enviado com sucesso. Verifique sua caixa de entrada.'
    })

  } catch (error) {
    console.error('Erro na recuperação de senha:', error)
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 }
    )
  }
}