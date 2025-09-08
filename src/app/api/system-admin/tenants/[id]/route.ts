import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { requireSuperAdmin } from '@/lib/auth/super-admin'

interface Params {
  params: Promise<{ id: string }>
}

export async function GET(request: NextRequest, { params }: Params) {
  // Verificar se o usuário é SUPER_ADMIN
  const authError = await requireSuperAdmin(request)
  if (authError) {
    return authError
  }

  try {
    const { id } = await params

    const tenant = await prisma.tenant.findUnique({
      where: { id },
      include: {
        users: {
          select: {
            id: true,
            email: true,
            name: true,
            role: true,
            createdAt: true,
          },
        },
        jobs: {
          select: {
            id: true,
            title: true,
            status: true,
            createdAt: true,
          },
          take: 10,
          orderBy: {
            createdAt: 'desc',
          },
        },
        _count: {
          select: {
            users: true,
            jobs: true,
          },
        },
      },
    })

    if (!tenant) {
      return NextResponse.json(
        { error: 'Tenant não encontrado' },
        { status: 404 }
      )
    }

    return NextResponse.json(tenant)
  } catch (error) {
    console.error('Erro ao buscar tenant:', error)
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 }
    )
  }
}

export async function PUT(request: NextRequest, { params }: Params) {
  // Verificar se o usuário é SUPER_ADMIN
  const authError = await requireSuperAdmin(request)
  if (authError) {
    return authError
  }

  try {
    const { id } = await params
    const body = await request.json()
    
    const {
      name,
      email,
      plan,
      status,
      domain,
      primaryColor,
      secondaryColor,
      accentColor,
      description,
      website,
      phone,
      address,
    } = body

    // Verificar se tenant existe
    const existingTenant = await prisma.tenant.findUnique({
      where: { id },
    })

    if (!existingTenant) {
      return NextResponse.json(
        { error: 'Tenant não encontrado' },
        { status: 404 }
      )
    }

    // Verificar se domínio já existe em outro tenant (se fornecido)
    if (domain && domain !== existingTenant.domain) {
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

    // Atualizar tenant
    const updatedTenant = await prisma.tenant.update({
      where: { id },
      data: {
        ...(name && { name }),
        ...(email && { email }),
        ...(plan && { plan }),
        ...(status && { status }),
        ...(domain !== undefined && { domain }),
        ...(primaryColor && { primaryColor }),
        ...(secondaryColor && { secondaryColor }),
        ...(accentColor && { accentColor }),
        ...(description !== undefined && { description }),
        ...(website !== undefined && { website }),
        ...(phone !== undefined && { phone }),
        ...(address !== undefined && { address }),
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

    return NextResponse.json(updatedTenant)
  } catch (error) {
    console.error('Erro ao atualizar tenant:', error)
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 }
    )
  }
}

export async function DELETE(request: NextRequest, { params }: Params) {
  // Verificar se o usuário é SUPER_ADMIN
  const authError = await requireSuperAdmin(request)
  if (authError) {
    return authError
  }

  try {
    const { id } = await params

    // Verificar se tenant existe
    const existingTenant = await prisma.tenant.findUnique({
      where: { id },
      include: {
        _count: {
          select: {
            users: true,
            jobs: true,
          },
        },
      },
    })

    if (!existingTenant) {
      return NextResponse.json(
        { error: 'Tenant não encontrado' },
        { status: 404 }
      )
    }

    // Verificar se há dados associados
    if (existingTenant._count.users > 0 || existingTenant._count.jobs > 0) {
      return NextResponse.json(
        { 
          error: 'Não é possível deletar tenant com usuários ou vagas associadas',
          details: {
            users: existingTenant._count.users,
            jobs: existingTenant._count.jobs,
          },
        },
        { status: 409 }
      )
    }

    // Deletar tenant
    await prisma.tenant.delete({
      where: { id },
    })

    return NextResponse.json(
      { message: 'Tenant deletado com sucesso' },
      { status: 200 }
    )
  } catch (error) {
    console.error('Erro ao deletar tenant:', error)
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 }
    )
  }
}