import { PrismaClient } from '@prisma/client'

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined
}

export const prisma = globalForPrisma.prisma ?? new PrismaClient({
  log: process.env.NODE_ENV === 'development' ? ['query', 'error', 'warn'] : ['error'],
})

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma

// Simple tenant-aware functions
export async function getUsersByTenant(tenantId: string) {
  return prisma.user.findMany({
    where: { tenantId }
  })
}

export async function getProjectsByTenant(tenantId: string) {
  return prisma.project.findMany({
    where: { tenantId }
  })
}

export async function createUserForTenant(tenantId: string, data: {
  email: string
  name?: string
  role?: 'ADMIN' | 'USER'
}) {
  return prisma.user.create({
    data: {
      ...data,
      tenantId,
      role: data.role || 'USER'
    }
  })
}

export async function createProjectForTenant(tenantId: string, data: {
  name: string
  description?: string
  userId?: string
}) {
  return prisma.project.create({
    data: {
      name: data.name,
      description: data.description,
      tenantId,
      // If userId is not provided, we'll need to get it from the session
      // For now, we'll make it optional and handle it in the API route
      ...(data.userId && { userId: data.userId })
    }
  })
}

// Helper function to get current tenant from request
export async function getCurrentTenant(request: Request): Promise<string | null> {
  try {
    const url = new URL(request.url)
    const subdomain = url.hostname.split('.')[0]
    const tenantHeader = request.headers.get('x-tenant-id')
    
    if (tenantHeader) return tenantHeader
    if (subdomain && subdomain !== 'www' && subdomain !== 'localhost') return subdomain
    
    return null
  } catch {
    return null
  }
}