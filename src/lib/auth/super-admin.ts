import { createServerClient } from '@supabase/ssr'
import { NextRequest } from 'next/server'
import { prisma } from '@/lib/prisma'

/**
 * Verifica se o usuário atual é um SUPER_ADMIN
 * @param request - NextRequest object
 * @returns Promise<boolean> - true se for SUPER_ADMIN, false caso contrário
 */
export async function isSuperAdmin(request: NextRequest): Promise<boolean> {
  try {
    // Criar cliente Supabase para verificar autenticação
    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!.replace(/"/g, ''),
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!.replace(/"/g, ''),
      {
        cookies: {
          getAll: () => request.cookies.getAll(),
          setAll: () => {}, // no-op em verificações
        },
      }
    )

    // Verificar se o usuário está autenticado
    const { data: { user }, error } = await supabase.auth.getUser()
    
    if (error || !user?.email) {
      return false
    }

    // Verificar se o email existe na tabela system_admins e está ativo
    const systemAdmin = await prisma.systemAdmin.findUnique({
      where: {
        email: user.email,
      },
      select: {
        id: true,
        isActive: true,
        role: true,
      },
    })

    // Retorna true apenas se o admin existe, está ativo e tem role SUPER_ADMIN
    return !!systemAdmin && systemAdmin.isActive && systemAdmin.role === 'SUPER_ADMIN'
  } catch (error) {
    console.error('Erro ao verificar SUPER_ADMIN:', error)
    return false
  }
}

/**
 * Middleware para proteger rotas que requerem SUPER_ADMIN
 * @param request - NextRequest object
 * @returns Promise<Response | null> - Response de erro se não autorizado, null se autorizado
 */
export async function requireSuperAdmin(request: NextRequest): Promise<Response | null> {
  const isAuthorized = await isSuperAdmin(request)
  
  if (!isAuthorized) {
    return new Response(
      JSON.stringify({ 
        error: 'Acesso negado. Apenas SUPER_ADMIN pode acessar este recurso.',
        code: 'SUPER_ADMIN_REQUIRED'
      }),
      {
        status: 403,
        headers: {
          'Content-Type': 'application/json',
        },
      }
    )
  }
  
  return null
}

/**
 * Atualiza o último login do SUPER_ADMIN
 * @param email - Email do admin
 */
export async function updateSuperAdminLastLogin(email: string): Promise<void> {
  try {
    await prisma.systemAdmin.update({
      where: { email },
      data: { lastLogin: new Date() },
    })
  } catch (error) {
    console.error('Erro ao atualizar último login do SUPER_ADMIN:', error)
  }
}

/**
 * Cria um novo SUPER_ADMIN (apenas outros SUPER_ADMINs podem fazer isso)
 * @param data - Dados do novo admin
 * @param createdByEmail - Email do admin que está criando
 */
export async function createSuperAdmin(
  data: {
    email: string
    name?: string
  },
  createdByEmail: string
): Promise<{ success: boolean; error?: string; admin?: any }> {
  try {
    // Verificar se o criador é um SUPER_ADMIN ativo
    const creator = await prisma.systemAdmin.findUnique({
      where: { email: createdByEmail },
      select: { id: true, isActive: true, role: true },
    })

    if (!creator || !creator.isActive || creator.role !== 'SUPER_ADMIN') {
      return {
        success: false,
        error: 'Apenas SUPER_ADMINs ativos podem criar novos administradores',
      }
    }

    // Verificar se o email já existe
    const existingAdmin = await prisma.systemAdmin.findUnique({
      where: { email: data.email },
    })

    if (existingAdmin) {
      return {
        success: false,
        error: 'Já existe um administrador com este email',
      }
    }

    // Criar o novo SUPER_ADMIN
    const newAdmin = await prisma.systemAdmin.create({
      data: {
        email: data.email,
        name: data.name,
        role: 'SUPER_ADMIN',
        isActive: true,
        createdBy: creator.id,
      },
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
        isActive: true,
        createdAt: true,
      },
    })

    return {
      success: true,
      admin: newAdmin,
    }
  } catch (error) {
    console.error('Erro ao criar SUPER_ADMIN:', error)
    return {
      success: false,
      error: 'Erro interno do servidor',
    }
  }
}