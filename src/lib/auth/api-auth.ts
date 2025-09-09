import { NextRequest, NextResponse } from 'next/server'
import { createServerClient } from '@supabase/ssr'
import { User } from '@supabase/supabase-js'

/**
 * Middleware para proteger rotas de API que requerem autenticação
 * @param request - NextRequest object
 * @returns Promise<{ user: User; error: null } | { user: null; error: Response }>
 */
export async function requireAuth(request: NextRequest): Promise<{
  user: User | null
  error: Response | null
}> {
  try {
    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!.replace(/"/g, ''),
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!.replace(/"/g, ''),
      {
        cookies: {
          getAll() {
            return request.cookies.getAll()
          },
          setAll() {
            // No-op para API routes
          },
        },
      }
    )

    const { data: { user }, error } = await supabase.auth.getUser()
    
    if (error || !user) {
      return {
        user: null,
        error: NextResponse.json(
          { 
            error: 'Não autorizado. Faça login para acessar este recurso.',
            code: 'AUTHENTICATION_REQUIRED'
          },
          { status: 401 }
        )
      }
    }

    return { user, error: null }
  } catch (err) {
    console.error('Erro na verificação de autenticação:', err)
    return {
      user: null,
      error: NextResponse.json(
        { 
          error: 'Erro interno na verificação de autenticação',
          code: 'INTERNAL_AUTH_ERROR'
        },
        { status: 500 }
      )
    }
  }
}

/**
 * Middleware para proteger rotas de API que requerem autenticação e verificação de tenant
 * @param request - NextRequest object
 * @param tenantSlug - Slug do tenant para verificação
 * @returns Promise<{ user: User; tenant: any; error: null } | { user: null; tenant: null; error: Response }>
 */
export async function requireAuthWithTenant(request: NextRequest, tenantSlug: string): Promise<{
  user: User | null
  tenant: any | null
  error: Response | null
}> {
  // First check authentication
  const { user, error: authError } = await requireAuth(request)
  
  if (authError) {
    return { user: null, tenant: null, error: authError }
  }

  try {
    // Import prisma here to avoid circular dependencies
    const { prisma } = await import('@/lib/prisma')
    
    // Find tenant
    const tenant = await prisma.tenant.findUnique({
      where: { slug: tenantSlug },
      select: { id: true, slug: true, name: true, status: true }
    })

    if (!tenant) {
      return {
        user: null,
        tenant: null,
        error: NextResponse.json(
          { 
            error: 'Tenant não encontrado',
            code: 'TENANT_NOT_FOUND'
          },
          { status: 404 }
        )
      }
    }

    if (tenant.status !== 'active' && tenant.status !== 'trial') {
      return {
        user: null,
        tenant: null,
        error: NextResponse.json(
          { 
            error: 'Tenant inativo',
            code: 'TENANT_INACTIVE'
          },
          { status: 403 }
        )
      }
    }

    // Check if user belongs to this tenant
    const userTenant = await prisma.user.findFirst({
      where: {
        email: user!.email!,
        tenantId: tenant.id
      },
      select: { id: true, role: true }
    })

    if (!userTenant) {
      return {
        user: null,
        tenant: null,
        error: NextResponse.json(
          { 
            error: 'Usuário não pertence a este tenant',
            code: 'USER_NOT_IN_TENANT'
          },
          { status: 403 }
        )
      }
    }

    return { 
      user, 
      tenant: { ...tenant, userRole: userTenant.role }, 
      error: null 
    }
  } catch (err) {
    console.error('Erro na verificação de tenant:', err)
    return {
      user: null,
      tenant: null,
      error: NextResponse.json(
        { 
          error: 'Erro interno na verificação de tenant',
          code: 'INTERNAL_TENANT_ERROR'
        },
        { status: 500 }
      )
    }
  }
}

/**
 * Helper para extrair informações do usuário autenticado sem bloquear a requisição
 * @param request - NextRequest object
 * @returns Promise<User | null>
 */
export async function getAuthUser(request: NextRequest): Promise<User | null> {
  try {
    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!.replace(/"/g, ''),
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!.replace(/"/g, ''),
      {
        cookies: {
          getAll() {
            return request.cookies.getAll()
          },
          setAll() {},
        },
      }
    )

    const { data: { user } } = await supabase.auth.getUser()
    return user
  } catch (err) {
    console.error('Erro ao obter usuário:', err)
    return null
  }
}