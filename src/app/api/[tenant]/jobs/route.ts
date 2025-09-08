import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { requireTenantPermission } from '@/lib/auth/tenant-permissions'

export const runtime = 'nodejs'

interface Params {
  params: Promise<{ tenant: string }>
}

export async function POST(req: NextRequest, { params }: Params) {
  try {
    console.log('=== INÍCIO DA CRIAÇÃO DE VAGA ===')
    const { tenant } = await params
    console.log('Tenant recebido:', tenant)
    
    if (!tenant) {
      console.log('Erro: Tenant não fornecido')
      return NextResponse.json(
        { error: 'Tenant é obrigatório' },
        { status: 400 }
      )
    }

    // Verificar autenticação e permissão para criar jobs
    const { user, tenantData, permissions, error: authError } = await requireTenantPermission(req, tenant, 'canWrite')
    
    if (authError) {
      return authError
    }
    
    console.log('Usuário autenticado:', user!.email)
    console.log('Tenant validado:', tenantData!.name)
    console.log('Permissões:', permissions)

    // Buscar o usuário no banco
    const userData = await prisma.user.findUnique({
      where: {
        email_tenantId: {
          email: user.email!,
          tenantId: tenantData!.id
        }
      },
      select: { id: true }
    })

    if (!userData) {
      return NextResponse.json(
        { error: 'Usuário não encontrado' },
        { status: 404 }
      )
    }

    const body = await req.json()
    console.log('Dados recebidos:', JSON.stringify(body, null, 2))
    
    const { 
      title, 
      department, 
      location, 
      type, 
      level, 
      salary, 
      description, 
      requirements, 
      benefits 
    } = body

    console.log('Campos extraídos:', {
      title: !!title,
      department: !!department,
      location: !!location,
      type: !!type,
      level: !!level,
      description: !!description,
      requirements: !!requirements
    })

    // Validar campos obrigatórios
    if (!title || !department || !location || !type || !level || !description || !requirements) {
      console.log('Erro: Campos obrigatórios faltando')
      return NextResponse.json(
        { error: 'Campos obrigatórios: título, departamento, localização, tipo, nível, descrição e requisitos' },
        { status: 400 }
      )
    }

    // Criar a vaga no banco
    const job = await prisma.job.create({
      data: {
        title,
        department,
        location,
        type,
        level,
        salary: salary || null,
        description,
        requirements: Array.isArray(requirements) ? requirements : [requirements],
        benefits: Array.isArray(benefits) ? benefits : (benefits ? [benefits] : []),
        status: 'ACTIVE',
        tenantId: tenantData.id,
        userId: userData.id
      },
      select: {
        id: true,
        title: true,
        department: true,
        location: true,
        type: true,
        level: true,
        salary: true,
        description: true,
        requirements: true,
        benefits: true,
        status: true,
        createdAt: true
      }
    })

    return NextResponse.json({
      success: true,
      job
    }, { status: 201 })

  } catch (error) {
    console.error('Erro ao criar vaga:', error)
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 }
    )
  }
}

export async function GET(req: NextRequest, { params }: Params) {
  try {
    const { tenant } = await params
    
    if (!tenant) {
      return NextResponse.json(
        { error: 'Tenant é obrigatório' },
        { status: 400 }
      )
    }

    // Verificar autenticação e permissão para ler jobs
    const { user, tenantData, permissions, error: authError } = await requireTenantPermission(req, tenant, 'canRead')
    
    if (authError) {
      return authError
    }
    
    console.log('Usuário autenticado:', user!.email)
    console.log('Tenant validado:', tenantData!.name)
    console.log('Permissões:', permissions)

    // Buscar vagas do tenant
    const jobs = await prisma.job.findMany({
      where: { 
        tenantId: tenantData.id
      },
      select: {
        id: true,
        title: true,
        department: true,
        location: true,
        type: true,
        level: true,
        salary: true,
        description: true,
        requirements: true,
        benefits: true,
        status: true,
        createdAt: true,
        updatedAt: true
      },
      orderBy: {
        createdAt: 'desc'
      }
    })

    return NextResponse.json({
      success: true,
      jobs
    })

  } catch (error) {
    console.error('Erro ao buscar vagas:', error)
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 }
    )
  }
}