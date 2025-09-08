import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { requireSuperAdmin } from '@/lib/auth/super-admin'

export async function GET(request: NextRequest) {
  // Verificar se o usuário é SUPER_ADMIN
  const authError = await requireSuperAdmin(request)
  if (authError) {
    return authError
  }

  try {
    const { searchParams } = new URL(request.url)
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '50')
    const status = searchParams.get('status')
    const plan = searchParams.get('plan')
    const search = searchParams.get('search')

    // Construir filtros
    const where: any = {}
    
    if (status) {
      where.status = status
    }
    
    if (plan) {
      where.plan = plan
    }
    
    if (search) {
      where.OR = [
        { name: { contains: search, mode: 'insensitive' } },
        { slug: { contains: search, mode: 'insensitive' } },
        { email: { contains: search, mode: 'insensitive' } },
        { domain: { contains: search, mode: 'insensitive' } },
      ]
    }

    // Buscar tenants com paginação
    const [tenants, total] = await Promise.all([
      prisma.tenant.findMany({
        where,
        include: {
          _count: {
            select: {
              users: true,
              jobs: true,
            },
          },
        },
        orderBy: {
          createdAt: 'desc',
        },
        skip: (page - 1) * limit,
        take: limit,
      }),
      
      prisma.tenant.count({ where }),
    ])

    return NextResponse.json({
      tenants,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit),
      },
    })
  } catch (error) {
    console.error('Erro ao buscar tenants:', error)
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  // Verificar se o usuário é SUPER_ADMIN
  const authError = await requireSuperAdmin(request)
  if (authError) {
    return authError
  }

  try {
    const body = await request.json()
    const { name, slug, email, plan = 'starter', domain } = body

    // Validações básicas
    if (!name || !slug || !email) {
      return NextResponse.json(
        { error: 'Nome, slug e email são obrigatórios' },
        { status: 400 }
      )
    }

    // Verificar se slug já existe
    const existingTenant = await prisma.tenant.findUnique({
      where: { slug },
    })

    if (existingTenant) {
      return NextResponse.json(
        { error: 'Já existe um tenant com este slug' },
        { status: 409 }
      )
    }

    // Verificar se domínio já existe (se fornecido)
    if (domain) {
      const existingDomain = await prisma.tenant.findUnique({
        where: { domain },
      })

      if (existingDomain) {
        return NextResponse.json(
          { error: 'Já existe um tenant com este domínio' },
          { status: 409 }
        )
      }
    }

    // Criar novo tenant
    const newTenant = await prisma.tenant.create({
      data: {
        name,
        slug,
        email,
        plan,
        domain,
        status: 'trial',
        trialEndsAt: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000), // 14 dias
      },
      include: {
        _count: {
          select: {
            users: true,
            jobs: true,
          },
        },
      },
    })

    return NextResponse.json(newTenant, { status: 201 })
  } catch (error) {
    console.error('Erro ao criar tenant:', error)
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 }
    )
  }
}