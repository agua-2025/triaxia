// src/lib/auth/tenant-permissions.ts
import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { requireAuth } from './api-auth'

export type UserRole = 'ADMIN' | 'USER' | 'VIEWER'

export interface TenantPermission {
  canRead: boolean
  canWrite: boolean
  canDelete: boolean
  canManageUsers: boolean
  canManageSettings: boolean
}

/**
 * Verifica se o usuário tem permissão para acessar um tenant específico
 */
export async function checkTenantPermission(
  request: NextRequest,
  tenantSlug: string,
  requiredRole?: UserRole
): Promise<{
  user: any | null
  tenantData: any | null
  userRole: UserRole | null
  permissions: TenantPermission | null
  error: Response | null
}> {
  // Primeiro verificar autenticação
  const { user, error: authError } = await requireAuth(request)
  
  if (authError) {
    return {
      user: null,
      tenantData: null,
      userRole: null,
      permissions: null,
      error: authError
    }
  }

  try {
    // Buscar o tenant
    const tenantData = await prisma.tenant.findUnique({
      where: { slug: tenantSlug },
      select: { id: true, name: true, slug: true }
    })

    if (!tenantData) {
      return {
        user,
        tenantData: null,
        userRole: null,
        permissions: null,
        error: NextResponse.json(
          { error: 'Tenant não encontrado' },
          { status: 404 }
        )
      }
    }

    // Buscar o usuário no banco e sua relação com o tenant
    const userData = await prisma.user.findUnique({
      where: { 
        email_tenantId: {
          email: user!.email!,
          tenantId: tenantData.id
        }
      }
    })

    if (!userData) {
      return {
        user,
        tenantData,
        userRole: null,
        permissions: null,
        error: NextResponse.json(
          { error: 'Usuário não encontrado no sistema' },
          { status: 404 }
        )
      }
    }

    // O usuário já foi encontrado com a chave composta, então pertence ao tenant
    const userRole = userData.role as UserRole
    
    // Verificar se tem o papel necessário
    if (requiredRole && !hasRequiredRole(userRole, requiredRole)) {
      return {
        user,
        tenantData,
        userRole,
        permissions: null,
        error: NextResponse.json(
          { error: 'Permissões insuficientes' },
          { status: 403 }
        )
      }
    }

    // Calcular permissões baseadas no papel
    const permissions = calculatePermissions(userRole)

    return {
      user,
      tenantData,
      userRole,
      permissions,
      error: null
    }
  } catch (error) {
    console.error('Erro ao verificar permissões do tenant:', error)
    return {
      user,
      tenantData: null,
      userRole: null,
      permissions: null,
      error: NextResponse.json(
        { error: 'Erro interno do servidor' },
        { status: 500 }
      )
    }
  }
}

/**
 * Verifica se o usuário tem o papel necessário
 */
function hasRequiredRole(userRole: UserRole, requiredRole: UserRole): boolean {
  const roleHierarchy: Record<UserRole, number> = {
    'VIEWER': 1,
    'USER': 2,
    'ADMIN': 3
  }

  return roleHierarchy[userRole] >= roleHierarchy[requiredRole]
}

/**
 * Calcula as permissões baseadas no papel do usuário
 */
function calculatePermissions(role: UserRole): TenantPermission {
  switch (role) {
    case 'ADMIN':
      return {
        canRead: true,
        canWrite: true,
        canDelete: true,
        canManageUsers: true,
        canManageSettings: true
      }
    case 'USER':
      return {
        canRead: true,
        canWrite: true,
        canDelete: false,
        canManageUsers: false,
        canManageSettings: false
      }
    case 'VIEWER':
      return {
        canRead: true,
        canWrite: false,
        canDelete: false,
        canManageUsers: false,
        canManageSettings: false
      }
    default:
      return {
        canRead: false,
        canWrite: false,
        canDelete: false,
        canManageUsers: false,
        canManageSettings: false
      }
  }
}

/**
 * Função de conveniência para verificar permissões específicas
 */
export async function requireTenantPermission(
  request: NextRequest,
  tenantSlug: string,
  permission: keyof TenantPermission
) {
  const result = await checkTenantPermission(request, tenantSlug)
  
  if (result.error) {
    return result
  }

  if (!result.permissions || !result.permissions[permission]) {
    return {
      ...result,
      error: NextResponse.json(
        { error: `Permissão '${permission}' necessária` },
        { status: 403 }
      )
    }
  }

  return result
}

/**
 * Função de conveniência para verificar papel mínimo
 */
export async function requireTenantRole(
  request: NextRequest,
  tenantSlug: string,
  requiredRole: UserRole
) {
  return await checkTenantPermission(request, tenantSlug, requiredRole)
}