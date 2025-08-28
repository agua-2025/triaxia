import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth/next'
import { authOptions } from '@/lib/auth'
import { db } from '@/lib/db'
import { analyzeCandidateWithAI } from '@/lib/ai'
import { CandidateFormData } from '@/types'

// GET /api/candidates - Listar candidatos
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
    const skills = searchParams.get('skills')?.split(',').filter(Boolean) || []
    const minExperience = searchParams.get('minExperience')
    const maxExperience = searchParams.get('maxExperience')

    const skip = (page - 1) * limit

    // Construir filtros
    const where: Record<string, unknown> = {
      companyId: session.user.companyId,
      isActive: true,
    }

    if (search) {
      where.OR = [
        { name: { contains: search, mode: 'insensitive' } },
        { email: { contains: search, mode: 'insensitive' } },
        { location: { contains: search, mode: 'insensitive' } },
      ]
    }

    if (status) {
      where.status = status
    }

    if (skills.length > 0) {
      where.skills = {
        hasSome: skills
      }
    }

    if (minExperience) {
      where.experience = {
        ...(where.experience as object || {}),
        gte: parseInt(minExperience)
      }
    }

    if (maxExperience) {
      where.experience = {
        ...(where.experience as object || {}),
        lte: parseInt(maxExperience)
      }
    }

    // Buscar candidatos
    const [candidates, total] = await Promise.all([
      db.candidate.findMany({
        where,
        skip,
        take: limit,
        orderBy: { createdAt: 'desc' },
        include: {
          applications: {
            include: {
              position: true
            }
          }
        }
      }),
      db.candidate.count({ where })
    ])

    return NextResponse.json({
      success: true,
      data: candidates,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit)
      }
    })
  } catch (error) {
    console.error('Error fetching candidates:', error)
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 }
    )
  }
}

// POST /api/candidates - Criar candidato
export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user?.companyId) {
      return NextResponse.json({ error: 'Não autorizado' }, { status: 401 })
    }

    const body: CandidateFormData = await request.json()

    // Validar dados obrigatórios
    if (!body.name || !body.email || !body.availability || !body.skills?.length) {
      return NextResponse.json(
        { error: 'Dados obrigatórios não fornecidos' },
        { status: 400 }
      )
    }

    // Verificar se já existe candidato com o mesmo email na empresa
    const existingCandidate = await db.candidate.findFirst({
      where: {
        email: body.email,
        companyId: session.user.companyId,
        isActive: true
      }
    })

    if (existingCandidate) {
      return NextResponse.json(
        { error: 'Já existe um candidato com este email' },
        { status: 409 }
      )
    }

    // Criar candidato
    const candidate = await db.candidate.create({
      data: {
        name: body.name,
        email: body.email,
        phone: body.phone,
        location: body.location,
        age: body.age,
        summary: body.summary,
        experience: body.experience,
        education: body.education,
        salary: body.salary,
        availability: body.availability,
        skills: body.skills,
        status: 'disponivel',
        isActive: true,
        companyId: session.user.companyId,
      },
      include: {
        applications: {
          include: {
            position: true
          }
        }
      }
    })

    // Executar análise de IA em background (não bloquear a resposta)
    if (body.summary || body.skills.length > 0) {
      analyzeCandidateWithAI({
        name: candidate.name,
        summary: candidate.summary || '',
        skills: Array.isArray(candidate.skills) ? candidate.skills as string[] : [],
        experience: candidate.experience,
        education: candidate.education || ''
      })
        .then(async (aiAnalysis) => {
          await db.candidate.update({
            where: { id: candidate.id },
            data: {
              aiAnalysis: JSON.parse(JSON.stringify(aiAnalysis)),
              overallScore: aiAnalysis.overallScore
            }
          })
        })
        .catch((error) => {
          console.error('Error in AI analysis:', error)
        })
    }

    return NextResponse.json({
      success: true,
      data: candidate,
      message: 'Candidato criado com sucesso'
    }, { status: 201 })
  } catch (error) {
    console.error('Error creating candidate:', error)
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 }
    )
  }
}