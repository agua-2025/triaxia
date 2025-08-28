import { NextRequest, NextResponse } from 'next/server'
// Prefira este import no App Router:
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { db } from '@/lib/db'
import { matchCandidateToPosition } from '@/lib/ai'

interface RouteParams {
  params: Promise<{ id: string }>
}

interface CandidateMatch {
  candidate: {
    id: string
    name: string
    email: string
    location: string | null
    experience: number
    skills: string[]
    summary: string | null
    overallScore: number | null
    status: string
  }
  matchScore: number
  matchReasons: string[]
  skillGaps: string[]
  recommendations: string[]
  fitAnalysis: {
    skillsMatch: number
    experienceMatch: number
    locationMatch: number
    availabilityMatch: number
  }
}

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
    const { searchParams } = new URL(request.url)
    const limitRaw = Number.parseInt(searchParams.get('limit') ?? '20', 10)
    const minScoreRaw = Number.parseInt(searchParams.get('minScore') ?? '0', 10)
    const limit = Number.isFinite(limitRaw) ? Math.min(Math.max(limitRaw, 1), 100) : 20
    const minScore = Number.isFinite(minScoreRaw) ? Math.min(Math.max(minScoreRaw, 0), 100) : 0

    // Buscar a vaga (+ location se existir no schema)
    const position = await db.position.findFirst({
      where: {
        id: resolvedParams.id,
        companyId: session.user.companyId,
        isActive: true
      },
      select: {
        id: true,
        title: true,
        description: true,
        requiredSkills: true,   // pode ser Json
        department: true,
        minExperience: true,
        salaryRange: true,
        workType: true,
        // Removido location pois não existe no schema
      }
    })

    if (!position) {
      return NextResponse.json({ error: 'Vaga não encontrada' }, { status: 404 })
    }

    // Normalizar skills da vaga
    const positionSkillsRaw = Array.isArray(position.requiredSkills) ? position.requiredSkills : []
    const positionSkills = positionSkillsRaw
      .filter((s: unknown): s is string => typeof s === 'string')
      .map((s: string) => s.trim())
      .filter(Boolean)

    const candidates = await db.candidate.findMany({
      where: {
        companyId: session.user.companyId,
        isActive: true,
        status: { in: ['disponivel', 'em_processo'] }
      },
      select: {
        id: true,
        name: true,
        email: true,
        location: true,
        experience: true,      // number | null em alguns schemas
        skills: true,          // Json | null
        summary: true,
        overallScore: true,    // number | null
        status: true,
        availability: true     // se existir (integral/parcial/...)
      },
      take: 100
    })

    const matches: CandidateMatch[] = []

    for (const c of candidates) {
      try {
        const candidateSkillsRaw = Array.isArray(c.skills) ? c.skills : []
        const candidateSkills = candidateSkillsRaw
          .filter((s: unknown): s is string => typeof s === 'string')
          .map((s: string) => s.trim())
          .filter(Boolean)

        const experience = (typeof c.experience === 'number' && Number.isFinite(c.experience)) ? c.experience : 0
        const availability = (c.availability as string | undefined) ?? 'integral'

        // IA
        const aiMatch = await matchCandidateToPosition(
          {
            name: c.name,
            summary: c.summary ?? '',
            skills: candidateSkills,
            experience,
            education: '',
            salary: '',
            availability
          },
          {
            title: position.title,
            description: position.description ?? '',
            department: position.department ?? '',
            requiredSkills: positionSkills,
            minExperience: position.minExperience ?? 0,
            requiredEducation: '',
            salaryRange: position.salaryRange ?? '',
            workType: position.workType ?? 'integral'
          }
        )

        // Cálculos auxiliares
        const skillsMatch = calculateSkillsMatch(candidateSkills, positionSkills)
        const experienceMatch = calculateExperienceMatch(experience, position.minExperience ?? 0)
        // Como não temos location na Position, sempre retorna 100:
        const locationMatch = 100
        const availabilityMatch =
          availability === 'integral' ? 100 :
          availability === 'parcial' ? 70 :
          50

        // Monte um objeto do tipo esperado (sem propriedades extras)
        const slimCandidate: CandidateMatch['candidate'] = {
          id: c.id,
          name: c.name,
          email: c.email,
          location: c.location ?? null,
          experience,
          skills: candidateSkills,
          summary: c.summary ?? null,
          overallScore: c.overallScore ?? null,
          status: c.status
        }

        const match: CandidateMatch = {
          candidate: slimCandidate,
          matchScore: aiMatch?.matchScore ?? skillsMatch, // fallback
          matchReasons: Array.isArray(aiMatch?.matchReasons) ? aiMatch.matchReasons : [],
          skillGaps: [], // preencha se o seu helper devolver gaps
          recommendations: Array.isArray(aiMatch?.recommendations) ? aiMatch.recommendations : [],
          fitAnalysis: { skillsMatch, experienceMatch, locationMatch, availabilityMatch }
        }

        if (match.matchScore >= minScore) {
          matches.push(match)
        }
      } catch (err) {
        console.error(`Error matching candidate ${c.id}:`, err)
        // continua
      }
    }

    matches.sort((a, b) => b.matchScore - a.matchScore)

    const limitedMatches = matches.slice(0, limit)
    const averageScore =
      matches.length > 0
        ? Math.round(matches.reduce((sum, m) => sum + m.matchScore, 0) / matches.length)
        : 0

    return NextResponse.json({
      success: true,
      data: {
        position: {
          id: position.id,
          title: position.title,
          description: position.description,
          requiredSkills: positionSkills,
          department: position.department,
          minExperience: position.minExperience,
          // Campo location removido pois não existe no schema
          location: null
        },
        matches: limitedMatches,
        totalMatches: matches.length,
        averageScore
      }
    })
  } catch (error) {
    console.error('Error matching candidates to position:', error)
    return NextResponse.json({ error: 'Erro interno do servidor' }, { status: 500 })
  }
}

// Helpers

function calculateSkillsMatch(candidateSkills: string[], positionRequirements: string[]): number {
  if (positionRequirements.length === 0) return 100
  const cand = candidateSkills.map(s => s.toLowerCase())
  const reqs = positionRequirements.map(r => r.toLowerCase())
  let hits = 0
  for (const r of reqs) {
    if (cand.some(s => s.includes(r) || r.includes(s))) hits++
  }
  return Math.round((hits / reqs.length) * 100)
}

function calculateExperienceMatch(candidateExperience: number, requiredExperience: number): number {
  const req = requiredExperience || 0
  const cand = candidateExperience || 0
  if (req === 0) return 100
  if (cand >= req) {
    const excess = cand - req
    if (excess <= 2) return 100
    if (excess <= 5) return 90
    return 80
  } else {
    const deficit = req - cand
    if (deficit <= 1) return 85
    if (deficit <= 2) return 70
    if (deficit <= 3) return 50
    return 30
  }
}
