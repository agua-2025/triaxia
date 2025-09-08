import { NextRequest, NextResponse } from 'next/server'
import { isSuperAdmin, updateSuperAdminLastLogin } from '@/lib/auth/super-admin'
import { createServerClient } from '@supabase/ssr'

export async function GET(request: NextRequest) {
  try {
    // Verificar se o usuário é SUPER_ADMIN
    const authorized = await isSuperAdmin(request)
    
    if (authorized) {
      // Obter email do usuário para atualizar último login
      const supabase = createServerClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
        {
          cookies: {
            getAll: () => request.cookies.getAll(),
            setAll: () => {}, // no-op em verificações
          },
        }
      )

      const { data: { user } } = await supabase.auth.getUser()
      
      if (user?.email) {
        // Atualizar último login (não aguardar para não atrasar a resposta)
        updateSuperAdminLastLogin(user.email).catch(console.error)
      }
    }

    return NextResponse.json({
      authorized,
      timestamp: new Date().toISOString(),
    })
  } catch (error) {
    console.error('Erro na verificação de autorização:', error)
    return NextResponse.json(
      { 
        authorized: false, 
        error: 'Erro interno na verificação de acesso',
        timestamp: new Date().toISOString(),
      },
      { status: 500 }
    )
  }
}