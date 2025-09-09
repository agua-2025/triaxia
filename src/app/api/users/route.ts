import { NextRequest, NextResponse } from 'next/server'
import { getUsersByTenant, createUserForTenant } from '@/lib/prisma'
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

    const users = await getUsersByTenant(tenantContext.id)
    return NextResponse.json({ users })
  } catch (error) {
    console.error('Error fetching users:', error)
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
    const { email, name, role = 'USER' } = body

    if (!email || !name) {
      return NextResponse.json(
        { error: 'Email and name are required' },
        { status: 400 }
      )
    }

    const newUser = await createUserForTenant(tenantContext.id, {
      email,
      name,
      role,
    })

    return NextResponse.json({ user: newUser }, { status: 201 })
  } catch (error) {
    console.error('Error creating user:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}