import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth/next'
import { authOptions } from '@/lib/auth'
import { db } from '@/lib/db'
import { PositionFormData } from '@/types'

// GET /api/positions - Listar vagas
export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user?.companyId) {
      return NextResponse.json({ error: 'Não autorizado' }, { status: 401 })
    }

    const { searchParams } = new URL(request.url)
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '10')
    const search = searchParams.get('search') || ''
    const status = searchParams.get('status') || ''
    const workType = searchParams.get('workType') || ''
    const urgency = searchParams.get('urgency') || ''

    const skip = (page - 1) * limit

    // Construir filtros
    const where: Record<string, unknown> = {
      companyId: session.user.companyId,
      isActive: true,
    }

    if (search) {
      where.OR = [
        { title: { contains: search, mode: 'insensitive' } },
        { description: { contains: search, mode: 'insensitive' } },
        { location: { contains: search, mode: 'insensitive' } },
      ]
    }

    if (status) {
      where.status = status
    }

    if (workType) {
      where.workType = workType
    }

    if (urgency) {
      where.urgency = urgency
    }

    // Buscar vagas
    const [positions, total] = await Promise.all([
      db.position.findMany({
        where,
        skip,
        take: limit,
        orderBy: { createdAt: 'desc' },
        include: {
          applications: {
            include: {
              candidate: {
                select: {
                  id: true,
                  name: true,
                  email: true,
                  overallScore: true
                }
              }
            }
          },
          _count: {
            select: {
              applications: true
            }
          }
        }
      }),
      db.position.count({ where })
    ])

    return NextResponse.json({
      success: true,
      data: positions,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit)
      }
    })
  } catch (error) {
    console.error('Error fetching positions:', error)
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 }
    )
  }
}

// POST /api/positions - Criar vaga
export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user?.companyId) {
      return NextResponse.json({ error: 'Não autorizado' }, { status: 401 })
    }

    const body: PositionFormData = await request.json()

    // Validar dados obrigatórios
    if (!body.title || !body.description || !body.workType || !body.urgency) {
      return NextResponse.json(
        { error: 'Dados obrigatórios não fornecidos' },
        { status: 400 }
      )
    }

    // Criar vaga
    const position = await db.position.create({
      data: {
        title: body.title,
        description: body.description,
        department: body.department,
        requiredSkills: body.requiredSkills || [],
        minExperience: body.minExperience || 0,
        requiredEducation: body.requiredEducation || 'ensino_medio',
        salaryRange: body.salaryRange,
        workType: body.workType || 'integral',
        urgency: body.urgency || 'media',
        isActive: true,
        companyId: session.user.companyId,
      },
      include: {
        applications: {
          include: {
            candidate: {
              select: {
                id: true,
                name: true,
                email: true,
                overallScore: true
              }
            }
          }
        },
        _count: {
          select: {
            applications: true
          }
        }
      }
    })

    return NextResponse.json({
      success: true,
      data: position,
      message: 'Vaga criada com sucesso'
    }, { status: 201 })
  } catch (error) {
    console.error('Error creating position:', error)
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 }
    )
  }
}