import { NextRequest, NextResponse } from 'next/server'
import { getProjectsByTenant, createProjectForTenant } from '@/lib/prisma'
import { getCurrentTenant } from '@/lib/prisma'
import { requireAuth } from '@/lib/auth/api-auth'

// Use Node.js runtime for Prisma compatibility
export const runtime = 'nodejs'

export async function GET(request: NextRequest) {
  try {
    // Verificar autenticação
    const { user, error: authError } = await requireAuth(request)
    
    if (authError) {
      return authError
    }
    
    const tenantContext = await getCurrentTenant(request)
    
    if (!tenantContext.tenant || !tenantContext.id) {
      return NextResponse.json(
        { error: 'Tenant not found' },
        { status: 400 }
      )
    }

    const projects = await getProjectsByTenant(tenantContext.id)
    return NextResponse.json({ projects })
  } catch (error) {
    console.error('Error fetching projects:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    // Verificar autenticação
    const { user, error: authError } = await requireAuth(request)
    
    if (authError) {
      return authError
    }
    
    const tenantContext = await getCurrentTenant(request)
    
    if (!tenantContext.tenant || !tenantContext.id) {
      return NextResponse.json(
        { error: 'Tenant not found' },
        { status: 400 }
      )
    }

    const body = await request.json()
    const { name, description } = body

    if (!name) {
      return NextResponse.json(
        { error: 'Project name is required' },
        { status: 400 }
      )
    }

    const project = await createProjectForTenant(tenantContext.id, {
      name,
      description,
      userId: user!.id
    })

    return NextResponse.json({ project }, { status: 201 })
  } catch (error) {
    console.error('Error creating project:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}