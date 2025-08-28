'use client'

import { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { ArrowLeft, Users, Brain, Star, MapPin, Briefcase, Mail, Phone, TrendingUp, AlertTriangle, CheckCircle2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { DashboardLayout } from '@/components/layout/dashboard-layout'
import { Loading } from '@/components/ui/loading'
import { EmptyState } from '@/components/ui/empty-state'

interface Position {
  id: string
  title: string
  description: string
  requiredSkills: string[]
  department: string | null
  minExperience: number
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

interface MatchResponse {
  success: boolean
  data: {
    position: Position
    matches: CandidateMatch[]
    totalMatches: number
    averageScore: number
  }
}

interface RouteParams {
  params: {
    id: string
  }
}

export default function PositionMatchPage({ params }: RouteParams) {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [position, setPosition] = useState<Position | null>(null)
  const [matches, setMatches] = useState<CandidateMatch[]>([])
  const [totalMatches, setTotalMatches] = useState(0)
  const [averageScore, setAverageScore] = useState(0)
  const [loading, setLoading] = useState(true)
  const [minScore, setMinScore] = useState(60)
  const [limit, setLimit] = useState(20)

  // Buscar matches
  const fetchMatches = async () => {
    try {
      setLoading(true)
      const searchParams = new URLSearchParams({
        minScore: minScore.toString(),
        limit: limit.toString()
      })

      const response = await fetch(`/api/positions/${params.id}/match?${searchParams}`)
      const data: MatchResponse = await response.json()

      if (data.success) {
        setPosition(data.data.position)
        setMatches(data.data.matches)
        setTotalMatches(data.data.totalMatches)
        setAverageScore(data.data.averageScore)
      }
    } catch (error) {
      console.error('Error fetching matches:', error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (status === 'authenticated') {
      fetchMatches()
    }
  }, [status, params.id, minScore, limit])

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/signin')
    }
  }, [status, router])

  // Função para obter cor do score
  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-600'
    if (score >= 60) return 'text-yellow-600'
    return 'text-red-600'
  }

  // Função para obter ícone do score
  const getScoreIcon = (score: number) => {
    if (score >= 80) return CheckCircle2
    if (score >= 60) return AlertTriangle
    return AlertTriangle
  }

  if (status === 'loading' || loading) {
    return (
      <DashboardLayout>
        <Loading text="Analisando compatibilidade..." />
      </DashboardLayout>
    )
  }

  if (status === 'unauthenticated') {
    return null
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center gap-4">
          <Button
            variant="outline"
            size="sm"
            onClick={() => router.back()}
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Voltar
          </Button>
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Matching Inteligente</h1>
            <p className="text-muted-foreground">
              {position ? `Candidatos compatíveis para: ${position.title}` : 'Carregando...'}
            </p>
          </div>
        </div>

        {position && (
          <>
            {/* Informações da Vaga */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Briefcase className="h-5 w-5" />
                  {position.title}
                </CardTitle>
                <CardDescription>
                  {position.department && (
                    <span className="flex items-center gap-1">
                      <MapPin className="h-4 w-4" />
                      {position.department}
                    </span>
                  )}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-medium mb-2">Descrição</h4>
                    <p className="text-sm text-muted-foreground">{position.description}</p>
                  </div>
                  
                  {position.requiredSkills.length > 0 && (
                    <div>
                      <h4 className="font-medium mb-2">Habilidades Necessárias</h4>
                      <div className="flex flex-wrap gap-2">
                        {position.requiredSkills.map((skill, index) => (
                          <Badge key={index} variant="outline">{skill}</Badge>
                        ))}
                      </div>
                    </div>
                  )}
                  
                  <div>
                    <h4 className="font-medium mb-2">Experiência Necessária</h4>
                    <p className="text-sm text-muted-foreground">
                      {position.minExperience} anos
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Estatísticas */}
            <div className="grid gap-4 md:grid-cols-3">
              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-center gap-2">
                    <Users className="h-4 w-4 text-blue-600" />
                    <div>
                      <p className="text-2xl font-bold">{totalMatches}</p>
                      <p className="text-sm text-muted-foreground">Candidatos Compatíveis</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-center gap-2">
                    <Brain className="h-4 w-4 text-purple-600" />
                    <div>
                      <p className="text-2xl font-bold">{averageScore}%</p>
                      <p className="text-sm text-muted-foreground">Score Médio</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-center gap-2">
                    <TrendingUp className="h-4 w-4 text-green-600" />
                    <div>
                      <p className="text-2xl font-bold">
                        {matches.filter(m => m.matchScore >= 80).length}
                      </p>
                      <p className="text-sm text-muted-foreground">Matches Excelentes</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Filtros */}
            <Card>
              <CardHeader>
                <CardTitle>Filtros</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 md:grid-cols-2">
                  <div>
                    <Label htmlFor="minScore">Score Mínimo (%)</Label>
                    <Input
                      id="minScore"
                      type="number"
                      min="0"
                      max="100"
                      value={minScore}
                      onChange={(e) => setMinScore(parseInt(e.target.value) || 0)}
                    />
                  </div>
                  <div>
                    <Label htmlFor="limit">Limite de Resultados</Label>
                    <Input
                      id="limit"
                      type="number"
                      min="1"
                      max="100"
                      value={limit}
                      onChange={(e) => setLimit(parseInt(e.target.value) || 20)}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Lista de Candidatos */}
            {matches.length > 0 ? (
              <div className="space-y-4">
                <h2 className="text-xl font-semibold">Candidatos Compatíveis</h2>
                {matches.map((match) => {
                  const ScoreIcon = getScoreIcon(match.matchScore)
                  
                  return (
                    <Card key={match.candidate.id} className="hover:shadow-md transition-shadow">
                      <CardContent className="pt-6">
                        <div className="grid gap-6 lg:grid-cols-3">
                          {/* Informações do Candidato */}
                          <div className="lg:col-span-2">
                            <div className="flex items-start justify-between mb-4">
                              <div>
                                <h3 className="text-lg font-semibold">{match.candidate.name}</h3>
                                <div className="flex items-center gap-4 text-sm text-muted-foreground mt-1">
                                  <span className="flex items-center gap-1">
                                    <Mail className="h-3 w-3" />
                                    {match.candidate.email}
                                  </span>
                                  {match.candidate.location && (
                                    <span className="flex items-center gap-1">
                                      <MapPin className="h-3 w-3" />
                                      {match.candidate.location}
                                    </span>
                                  )}
                                  <span className="flex items-center gap-1">
                                    <Briefcase className="h-3 w-3" />
                                    {match.candidate.experience} anos
                                  </span>
                                </div>
                              </div>
                              
                              <div className="flex items-center gap-2">
                                <ScoreIcon className={`h-5 w-5 ${getScoreColor(match.matchScore)}`} />
                                <span className={`text-xl font-bold ${getScoreColor(match.matchScore)}`}>
                                  {match.matchScore}%
                                </span>
                              </div>
                            </div>

                            {/* Skills */}
                            <div className="mb-4">
                              <h4 className="font-medium mb-2">Habilidades</h4>
                              <div className="flex flex-wrap gap-1">
                                {match.candidate.skills.slice(0, 8).map((skill, index) => (
                                  <Badge key={index} variant="secondary" className="text-xs">
                                    {skill}
                                  </Badge>
                                ))}
                                {match.candidate.skills.length > 8 && (
                                  <Badge variant="outline" className="text-xs">
                                    +{match.candidate.skills.length - 8}
                                  </Badge>
                                )}
                              </div>
                            </div>

                            {/* Resumo */}
                            {match.candidate.summary && (
                              <div className="mb-4">
                                <h4 className="font-medium mb-2">Resumo</h4>
                                <p className="text-sm text-muted-foreground line-clamp-2">
                                  {match.candidate.summary}
                                </p>
                              </div>
                            )}

                            {/* Razões do Match */}
                            {match.matchReasons.length > 0 && (
                              <div>
                                <h4 className="font-medium mb-2 flex items-center gap-2">
                                  <CheckCircle2 className="h-4 w-4 text-green-600" />
                                  Por que é um bom match
                                </h4>
                                <ul className="text-sm text-muted-foreground space-y-1">
                                  {match.matchReasons.slice(0, 3).map((reason, index) => (
                                    <li key={index} className="flex items-start gap-2">
                                      <span className="w-1 h-1 bg-green-600 rounded-full mt-2 flex-shrink-0" />
                                      {reason}
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            )}
                          </div>

                          {/* Análise de Compatibilidade */}
                          <div className="space-y-4">
                            <div>
                              <h4 className="font-medium mb-3">Análise de Compatibilidade</h4>
                              
                              <div className="space-y-3">
                                <div>
                                  <div className="flex justify-between text-sm mb-1">
                                    <span>Habilidades</span>
                                    <span>{match.fitAnalysis.skillsMatch}%</span>
                                  </div>
                                  <Progress value={match.fitAnalysis.skillsMatch} className="h-2" />
                                </div>
                                
                                <div>
                                  <div className="flex justify-between text-sm mb-1">
                                    <span>Experiência</span>
                                    <span>{match.fitAnalysis.experienceMatch}%</span>
                                  </div>
                                  <Progress value={match.fitAnalysis.experienceMatch} className="h-2" />
                                </div>
                                
                                <div>
                                  <div className="flex justify-between text-sm mb-1">
                                    <span>Localização</span>
                                    <span>{match.fitAnalysis.locationMatch}%</span>
                                  </div>
                                  <Progress value={match.fitAnalysis.locationMatch} className="h-2" />
                                </div>
                                
                                <div>
                                  <div className="flex justify-between text-sm mb-1">
                                    <span>Disponibilidade</span>
                                    <span>{match.fitAnalysis.availabilityMatch}%</span>
                                  </div>
                                  <Progress value={match.fitAnalysis.availabilityMatch} className="h-2" />
                                </div>
                              </div>
                            </div>

                            {/* Gaps de Habilidades */}
                            {match.skillGaps.length > 0 && (
                              <div>
                                <h4 className="font-medium mb-2 flex items-center gap-2">
                                  <AlertTriangle className="h-4 w-4 text-yellow-600" />
                                  Gaps de Habilidades
                                </h4>
                                <ul className="text-sm text-muted-foreground space-y-1">
                                  {match.skillGaps.slice(0, 3).map((gap, index) => (
                                    <li key={index} className="flex items-start gap-2">
                                      <span className="w-1 h-1 bg-yellow-600 rounded-full mt-2 flex-shrink-0" />
                                      {gap}
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            )}

                            {/* Ações */}
                            <div className="pt-4 border-t">
                              <div className="flex gap-2">
                                <Button
                                  size="sm"
                                  onClick={() => router.push(`/candidates/${match.candidate.id}`)}
                                >
                                  Ver Perfil
                                </Button>
                                <Button
                                  variant="outline"
                                  size="sm"
                                  onClick={() => {
                                    // TODO: Implementar convite para vaga
                                    console.log('Convidar candidato')
                                  }}
                                >
                                  Convidar
                                </Button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  )
                })}
              </div>
            ) : (
              <EmptyState
                icon={Users}
                title="Nenhum candidato compatível encontrado"
                description="Tente ajustar os filtros ou revisar os requisitos da vaga."
                action={{
                  label: 'Remover Filtro de Score',
                  onClick: () => setMinScore(0)
                }}
              />
            )}
          </>
        )}
      </div>
    </DashboardLayout>
  )
}