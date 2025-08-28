import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth/next'
import { authOptions } from '@/lib/auth'
import { db } from '@/lib/db'

// GET /api/candidates/stats - Estatísticas de candidatos
export async function GET() {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user?.companyId) {
      return NextResponse.json({ error: 'Não autorizado' }, { status: 401 })
    }

    const companyId = session.user.companyId

    // Buscar estatísticas básicas
    const [totalCandidates, candidatesByStatus, averageScoreResult] = await Promise.all([
      // Total de candidatos ativos
      db.candidate.count({
        where: {
          companyId,
          isActive: true
        }
      }),

      // Candidatos por status
      db.candidate.groupBy({
        by: ['status'],
        where: {
          companyId,
          isActive: true
        },
        _count: {
          id: true
        }
      }),

      // Score médio dos candidatos
      db.candidate.aggregate({
        where: {
          companyId,
          isActive: true,
          overallScore: {
            not: null
          }
        },
        _avg: {
          overallScore: true
        }
      })
    ])

    // Organizar dados por status
    const statusCounts = {
      disponivel: 0,
      em_processo: 0,
      contratado: 0,
      rejeitado: 0,
      inativo: 0
    }

    candidatesByStatus.forEach((item: { status: string; _count: { id: number } }) => {
      const status = item.status as keyof typeof statusCounts
      statusCounts[status] = item._count.id
    })

    // Buscar candidatos recentes (últimos 30 dias)
    const thirtyDaysAgo = new Date()
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30)

    const recentCandidates = await db.candidate.count({
      where: {
        companyId,
        isActive: true,
        createdAt: {
          gte: thirtyDaysAgo
        }
      }
    })

    // Buscar top skills
    const candidatesWithSkills = await db.candidate.findMany({
      where: {
        companyId,
        isActive: true
      },
      select: {
        skills: true
      }
    })

    // Contar frequência de skills
    const skillCounts: Record<string, number> = {}
    candidatesWithSkills.forEach((candidate: { skills: any }) => {
      const skills = Array.isArray(candidate.skills) ? candidate.skills : []
      skills.forEach((skill: any) => {
        skillCounts[skill] = (skillCounts[skill] || 0) + 1
      })
    })

    // Top 10 skills mais comuns
    const topSkills = Object.entries(skillCounts)
      .sort(([, a], [, b]) => b - a)
      .slice(0, 10)
      .map(([skill, count]) => ({ skill, count }))

    // Distribuição por experiência
    const experienceDistribution = await db.candidate.groupBy({
      by: ['experience'],
      where: {
        companyId,
        isActive: true
      },
      _count: {
        id: true
      },
      orderBy: {
        experience: 'asc'
      }
    })

    // Agrupar experiência em faixas
    const experienceRanges = {
      'Júnior (0-2 anos)': 0,
      'Pleno (3-5 anos)': 0,
      'Sênior (6-10 anos)': 0,
      'Especialista (11+ anos)': 0
    }

    experienceDistribution.forEach((item: { experience: number; _count: { id: number } }) => {
      const years = item.experience
      if (years <= 2) {
        experienceRanges['Júnior (0-2 anos)'] = (experienceRanges['Júnior (0-2 anos)'] || 0) + item._count.id
      } else if (years <= 5) {
        experienceRanges['Pleno (3-5 anos)'] = (experienceRanges['Pleno (3-5 anos)'] || 0) + item._count.id
      } else if (years <= 10) {
        experienceRanges['Sênior (6-10 anos)'] = (experienceRanges['Sênior (6-10 anos)'] || 0) + item._count.id
      } else {
        experienceRanges['Especialista (11+ anos)'] = (experienceRanges['Especialista (11+ anos)'] || 0) + item._count.id
      }
    })

    // Candidatos com melhor score
    const topCandidates = await db.candidate.findMany({
      where: {
        companyId,
        isActive: true,
        overallScore: {
          not: null
        }
      },
      select: {
        id: true,
        name: true,
        email: true,
        overallScore: true,
        skills: true
      },
      orderBy: {
        overallScore: 'desc'
      },
      take: 5
    })

    const stats = {
      total: totalCandidates,
      disponivel: statusCounts.disponivel,
      em_processo: statusCounts.em_processo,
      contratado: statusCounts.contratado,
      rejeitado: statusCounts.rejeitado,
      inativo: statusCounts.inativo,
      averageScore: Math.round(averageScoreResult._avg.overallScore || 0),
      recentCandidates,
      topSkills,
      experienceRanges,
      topCandidates
    }

    return NextResponse.json({
      success: true,
      data: stats
    })
  } catch (error) {
    console.error('Error fetching candidate stats:', error)
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 }
    )
  }
}