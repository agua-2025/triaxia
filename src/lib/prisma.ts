import { PrismaClient } from '@prisma/client'

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined
}

export const prisma = globalForPrisma.prisma ?? new PrismaClient({
  log: process.env.NODE_ENV === 'development' ? ['query', 'error', 'warn'] : ['error'],
})

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma

// Export prisma types for better TypeScript support
export type { Tenant, User, Project, Job, ActivationToken, SystemAdmin } from '@prisma/client'

// === TENANT RESOLUTION FUNCTIONS ===

/**
 * Resolve tenant context from request headers (set by middleware)
 */
export async function getCurrentTenant(request: Request): Promise<{
  tenant: any | null
  slug: string | null
  id: string | null
}> {
  try {
    // Check middleware headers first
    const tenantSlug = request.headers.get('x-tenant-slug')
    const isSubdomain = request.headers.get('x-tenant-subdomain') === 'true'
    
    if (tenantSlug) {
      // Find tenant by slug
      const tenant = await prisma.tenant.findUnique({
        where: { slug: tenantSlug },
        select: {
          id: true,
          name: true,
          slug: true,
          domain: true,
          status: true,
          plan: true,
          primaryColor: true,
          secondaryColor: true,
          accentColor: true
        }
      })
      
      return {
        tenant,
        slug: tenantSlug,
        id: tenant?.id || null
      }
    }
    
    // Fallback: resolve from URL directly
    const url = new URL(request.url)
    const parts = url.hostname.split('.')
    
    if (parts.length >= 3) {
      const subdomain = parts[0]
      
      if (!['www', 'api', 'admin', 'app', 'staging', 'dev', 'localhost'].includes(subdomain)) {
        const tenant = await prisma.tenant.findUnique({
          where: { slug: subdomain },
          select: {
            id: true,
            name: true,
            slug: true,
            domain: true,
            status: true,
            plan: true,
            primaryColor: true,
            secondaryColor: true,
            accentColor: true
          }
        })
        
        return {
          tenant,
          slug: subdomain,
          id: tenant?.id || null
        }
      }
    }
    
    // Check path-based tenant (/t/{slug})
    const pathMatch = url.pathname.match(/^\/t\/([^/]+)/)
    if (pathMatch) {
      const slug = pathMatch[1]
      const tenant = await prisma.tenant.findUnique({
        where: { slug },
        select: {
          id: true,
          name: true,
          slug: true,
          domain: true,
          status: true,
          plan: true,
          primaryColor: true,
          secondaryColor: true,
          accentColor: true
        }
      })
      
      return {
        tenant,
        slug,
        id: tenant?.id || null
      }
    }
    
    return {
      tenant: null,
      slug: null,
      id: null
    }
  } catch (error) {
    console.error('Error resolving tenant:', error)
    return {
      tenant: null,
      slug: null,
      id: null
    }
  }
}

/**
 * Get tenant by ID with full details
 */
export async function getTenantById(tenantId: string) {
  return prisma.tenant.findUnique({
    where: { id: tenantId },
    include: {
      _count: {
        select: {
          users: true,
          jobs: true,
          projects: true
        }
      }
    }
  })
}

/**
 * Get tenant by slug with full details
 */
export async function getTenantBySlug(slug: string) {
  return prisma.tenant.findUnique({
    where: { slug },
    include: {
      _count: {
        select: {
          users: true,
          jobs: true,
          projects: true
        }
      }
    }
  })
}

// === TENANT-AWARE FUNCTIONS ===

/**
 * Get users by tenant ID with proper scoping
 */
export async function getUsersByTenant(tenantId: string) {
  return prisma.user.findMany({
    where: { 
      tenantId,
      isActive: true // Only active users
    },
    select: {
      id: true,
      email: true,
      name: true,
      role: true,
      isActive: true,
      createdAt: true,
      updatedAt: true
    },
    orderBy: {
      createdAt: 'desc'
    }
  })
}

/**
 * Get projects by tenant ID with proper scoping
 */
export async function getProjectsByTenant(tenantId: string) {
  return prisma.project.findMany({
    where: { tenantId },
    include: {
      user: {
        select: {
          id: true,
          name: true,
          email: true
        }
      }
    },
    orderBy: {
      updatedAt: 'desc'
    }
  })
}

/**
 * Get jobs by tenant ID with proper scoping
 */
export async function getJobsByTenant(tenantId: string) {
  return prisma.job.findMany({
    where: { tenantId },
    include: {
      user: {
        select: {
          id: true,
          name: true,
          email: true
        }
      }
    },
    orderBy: {
      createdAt: 'desc'
    }
  })
}

/**
 * Create user for tenant with validation
 */
export async function createUserForTenant(tenantId: string, userData: {
  email: string
  name: string
  role?: string
}) {
  // Verify tenant exists and is active
  const tenant = await prisma.tenant.findFirst({
    where: { 
      id: tenantId,
      status: 'active'
    }
  })
  
  if (!tenant) {
    throw new Error('Tenant not found or inactive')
  }
  
  // Check if user already exists in this tenant
  const existingUser = await prisma.user.findUnique({
    where: {
      email_tenantId: {
        email: userData.email.toLowerCase(),
        tenantId
      }
    }
  })
  
  if (existingUser) {
    throw new Error('User already exists in this tenant')
  }
  
  return prisma.user.create({
    data: {
      email: userData.email.toLowerCase(),
      name: userData.name,
      tenantId,
      role: userData.role as any || 'USER',
      isActive: false // Will be activated via email
    },
    select: {
      id: true,
      email: true,
      name: true,
      role: true,
      isActive: true,
      createdAt: true
    }
  })
}

/**
 * Create project for tenant with validation
 */
export async function createProjectForTenant(tenantId: string, projectData: {
  name: string
  description?: string
  userId: string
}) {
  // Verify tenant exists
  const tenant = await prisma.tenant.findUnique({
    where: { id: tenantId }
  })
  
  if (!tenant) {
    throw new Error('Tenant not found')
  }
  
  // Verify user belongs to tenant
  const user = await prisma.user.findUnique({
    where: {
      id: projectData.userId,
      tenantId
    }
  })
  
  if (!user) {
    throw new Error('User not found in tenant')
  }
  
  return prisma.project.create({
    data: {
      name: projectData.name,
      description: projectData.description,
      tenantId,
      userId: projectData.userId
    },
    include: {
      user: {
        select: {
          id: true,
          name: true,
          email: true
        }
      },
      tenant: {
        select: {
          id: true,
          name: true,
          slug: true
        }
      }
    }
  })
}

// === UTILITY FUNCTIONS ===

/**
 * Validate tenant access for user
 */
export async function validateTenantAccess(userEmail: string, tenantId: string): Promise<{
  hasAccess: boolean
  user: any | null
  tenant: any | null
}> {
  try {
    const user = await prisma.user.findUnique({
      where: {
        email_tenantId: {
          email: userEmail.toLowerCase(),
          tenantId
        }
      },
      include: {
        tenant: {
          select: {
            id: true,
            name: true,
            slug: true,
            status: true
          }
        }
      }
    })
    
    return {
      hasAccess: !!(user && user.isActive && user.tenant.status === 'active'),
      user,
      tenant: user?.tenant || null
    }
  } catch (error) {
    console.error('Error validating tenant access:', error)
    return {
      hasAccess: false,
      user: null,
      tenant: null
    }
  }
}