import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth/next'
import { authOptions } from '@/lib/auth'
import { db } from '@/lib/db'
import { analyzeCandidateWithAI } from '@/lib/ai'
import { CandidateFormData } from '@/types'

interface RouteParams {
  params: Promise<{
    id: string
  }>
}

// GET /api/candidates/[id] - Buscar candidato por ID
export async function GET(
  request: NextRequest,
  { params }: RouteParams
) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user?.companyId) {
      return NextResponse.json({ error: 'Não autorizado' }, { status: 401 })
    }

    const resolvedParams = await params
    const candidate = await db.candidate.findFirst({
      where: {
        id: resolvedParams.id,
        companyId: session.user.companyId,
        isActive: true
      },
      include: {
        applications: {
          include: {
            position: true
          },
          orderBy: {
            createdAt: 'desc'
          }
        }
      }
    })

    if (!candidate) {
      return NextResponse.json(
        { error: 'Candidato não encontrado' },
        { status: 404 }
      )
    }

    return NextResponse.json({
      success: true,
      data: candidate
    })
  } catch (error) {
    console.error('Error fetching candidate:', error)
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 }
    )
  }
}

// PUT /api/candidates/[id] - Atualizar candidato
export async function PUT(
  request: NextRequest,
  { params }: RouteParams
) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user?.companyId) {
      return NextResponse.json({ error: 'Não autorizado' }, { status: 401 })
    }

    const resolvedParams = await params
    const body: Partial<CandidateFormData> = await request.json()

    // Verificar se o candidato existe e pertence à empresa
    const existingCandidate = await db.candidate.findFirst({
      where: {
        id: resolvedParams.id,
        companyId: session.user.companyId,
        isActive: true
      }
    })

    if (!existingCandidate) {
      return NextResponse.json(
        { error: 'Candidato não encontrado' },
        { status: 404 }
      )
    }

    // Se o email está sendo alterado, verificar se não existe outro candidato com o mesmo email
    if (body.email && body.email !== existingCandidate.email) {
      const emailExists = await db.candidate.findFirst({
        where: {
          email: body.email,
          companyId: session.user.companyId,
          isActive: true,
          id: { not: resolvedParams.id }
        }
      })

      if (emailExists) {
        return NextResponse.json(
          { error: 'Já existe um candidato com este email' },
          { status: 409 }
        )
      }
    }

    // Atualizar candidato
    const updatedCandidate = await db.candidate.update({
      where: { id: resolvedParams.id },
      data: {
        ...(body.name && { name: body.name }),
        ...(body.email && { email: body.email }),
        ...(body.phone !== undefined && { phone: body.phone }),
        ...(body.location !== undefined && { location: body.location }),
        ...(body.age !== undefined && { age: body.age }),
        ...(body.summary !== undefined && { summary: body.summary }),
        ...(body.experience !== undefined && { experience: body.experience }),
        ...(body.education !== undefined && { education: body.education }),
        ...(body.salary !== undefined && { salary: body.salary }),
        ...(body.availability && { availability: body.availability }),
        ...(body.skills && { skills: body.skills }),
        updatedAt: new Date()
      },
      include: {
        applications: {
          include: {
            position: true
          }
        }
      }
    })

    // Se dados relevantes para IA foram alterados, executar nova análise
    const aiRelevantFields = ['summary', 'skills', 'experience', 'education']
    const hasAiRelevantChanges = aiRelevantFields.some(field => body[field as keyof CandidateFormData] !== undefined)

    if (hasAiRelevantChanges) {
      analyzeCandidateWithAI({
        name: updatedCandidate.name,
        summary: updatedCandidate.summary || '',
        skills: Array.isArray(updatedCandidate.skills) ? updatedCandidate.skills as string[] : [],
        experience: updatedCandidate.experience,
        education: updatedCandidate.education || ''
      })
        .then(async (aiAnalysis) => {
          await db.candidate.update({
            where: { id: resolvedParams.id },
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
      data: updatedCandidate,
      message: 'Candidato atualizado com sucesso'
    })
  } catch (error) {
    console.error('Error updating candidate:', error)
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 }
    )
  }
}

// DELETE /api/candidates/[id] - Excluir candidato (soft delete)
export async function DELETE(
  request: NextRequest,
  { params }: RouteParams
) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user?.companyId) {
      return NextResponse.json({ error: 'Não autorizado' }, { status: 401 })
    }

    const resolvedParams = await params
    // Verificar se o candidato existe e pertence à empresa
    const existingCandidate = await db.candidate.findFirst({
      where: {
        id: resolvedParams.id,
        companyId: session.user.companyId,
        isActive: true
      }
    })

    if (!existingCandidate) {
      return NextResponse.json(
        { error: 'Candidato não encontrado' },
        { status: 404 }
      )
    }

    // Soft delete - marcar como inativo
    await db.candidate.update({
      where: { id: resolvedParams.id },
      data: {
        isActive: false,
        status: 'inativo',
        updatedAt: new Date()
      }
    })

    return NextResponse.json({
      success: true,
      message: 'Candidato excluído com sucesso'
    })
  } catch (error) {
    console.error('Error deleting candidate:', error)
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 }
    )
  }
}