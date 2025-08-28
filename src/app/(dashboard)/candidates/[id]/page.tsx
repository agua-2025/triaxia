'use client'

import { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { ArrowLeft, Edit, Trash2, Mail, Phone, MapPin, Calendar, Briefcase, GraduationCap, DollarSign, Clock, Brain, Star, TrendingUp, AlertCircle, CheckCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { Progress } from '@/components/ui/progress'
import { useToast } from '@/components/ui/use-toast'
import { DashboardLayout } from '@/components/layout/dashboard-layout'
import { Loading } from '@/components/ui/loading'
import { Candidate, CandidateStatus, AIAnalysis } from '@/types'

interface CandidateResponse {
  success: boolean
  data: Candidate
}

interface RouteParams {
  params: {
    id: string
  }
}

const statusColors: Record<CandidateStatus, string> = {
  disponivel: 'bg-green-100 text-green-800',
  em_processo: 'bg-blue-100 text-blue-800',
  contratado: 'bg-purple-100 text-purple-800',
  inativo: 'bg-gray-100 text-gray-800'
}

const statusLabels: Record<CandidateStatus, string> = {
  disponivel: 'Disponível',
  em_processo: 'Em Processo',
  contratado: 'Contratado',
  inativo: 'Inativo'
}

export default function CandidateDetailPage({ params }: RouteParams) {
  const { data: session, status } = useSession()
  const router = useRouter()
  const { toast } = useToast()
  const [candidate, setCandidate] = useState<Candidate | null>(null)
  const [loading, setLoading] = useState(true)
  const [deleting, setDeleting] = useState(false)

  // Buscar dados do candidato
  const fetchCandidate = async () => {
    try {
      setLoading(true)
      const response = await fetch(`/api/candidates/${params.id}`)
      const data: CandidateResponse = await response.json()

      if (data.success) {
        setCandidate(data.data)
      } else {
        toast({
          title: 'Erro',
          description: 'Candidato não encontrado',
          variant: 'destructive',
        })
        router.push('/candidates')
      }
    } catch (error) {
      console.error('Error fetching candidate:', error)
      toast({
        title: 'Erro',
        description: 'Erro ao carregar candidato',
        variant: 'destructive',
      })
    } finally {
      setLoading(false)
    }
  }

  // Excluir candidato
  const handleDelete = async () => {
    if (!confirm('Tem certeza que deseja excluir este candidato? Esta ação não pode ser desfeita.')) {
      return
    }

    try {
      setDeleting(true)
      const response = await fetch(`/api/candidates/${params.id}`, {
        method: 'DELETE',
      })

      const result = await response.json()

      if (result.success) {
        toast({
          title: 'Sucesso',
          description: 'Candidato excluído com sucesso',
        })
        router.push('/candidates')
      } else {
        toast({
          title: 'Erro',
          description: result.error || 'Erro ao excluir candidato',
          variant: 'destructive',
        })
      }
    } catch (error) {
      console.error('Error deleting candidate:', error)
      toast({
        title: 'Erro',
        description: 'Erro interno do servidor',
        variant: 'destructive',
      })
    } finally {
      setDeleting(false)
    }
  }

  // Renderizar análise de IA
  const renderAIAnalysis = (analysis: AIAnalysis) => {
    const getScoreColor = (score: number) => {
      if (score >= 80) return 'text-green-600'
      if (score >= 60) return 'text-yellow-600'
      return 'text-red-600'
    }

    const getScoreIcon = (score: number) => {
      if (score >= 80) return CheckCircle
      if (score >= 60) return AlertCircle
      return AlertCircle
    }

    const overallScore = analysis.overallScore || 0
    const ScoreIcon = getScoreIcon(overallScore)

    return (
      <div className="space-y-6">
        {/* Score Geral */}
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <ScoreIcon className={`h-6 w-6 ${getScoreColor(overallScore)}`} />
            <span className={`text-2xl font-bold ${getScoreColor(overallScore)}`}>
              {overallScore}%
            </span>
          </div>
          <div className="flex-1">
            <Progress value={overallScore} className="h-3" />
          </div>
        </div>

        {/* Resumo */}
        {analysis.summary && (
          <div>
            <h4 className="font-semibold mb-2 flex items-center gap-2">
              <Brain className="h-4 w-4" />
              Resumo da Análise
            </h4>
            <p className="text-sm text-muted-foreground">{analysis.summary}</p>
          </div>
        )}

        {/* Pontos Fortes */}
        {analysis.strengths && analysis.strengths.length > 0 && (
          <div>
            <h4 className="font-semibold mb-2 flex items-center gap-2">
              <TrendingUp className="h-4 w-4 text-green-600" />
              Pontos Fortes
            </h4>
            <ul className="space-y-1">
              {analysis.strengths.map((strength: string, index: number) => (
                <li key={index} className="text-sm text-muted-foreground flex items-start gap-2">
                  <CheckCircle className="h-3 w-3 text-green-600 mt-0.5 flex-shrink-0" />
                  {strength}
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Áreas de Melhoria */}
        {analysis.weaknesses && analysis.weaknesses.length > 0 && (
          <div>
            <h4 className="font-semibold mb-2 flex items-center gap-2">
              <AlertCircle className="h-4 w-4 text-yellow-600" />
              Áreas de Melhoria
            </h4>
            <ul className="space-y-1">
              {analysis.weaknesses.map((weakness: string, index: number) => (
                <li key={index} className="text-sm text-muted-foreground flex items-start gap-2">
                  <AlertCircle className="h-3 w-3 text-yellow-600 mt-0.5 flex-shrink-0" />
                  {weakness}
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Nível de Experiência */}
        {analysis.experienceLevel && (
          <div>
            <h4 className="font-semibold mb-2">Nível de Experiência</h4>
            <Badge variant="outline">{analysis.experienceLevel}</Badge>
          </div>
        )}

        {/* Compatibilidade de Habilidades */}
        {analysis.skillsMatch && (
          <div>
            <h4 className="font-semibold mb-2">Compatibilidade de Habilidades</h4>
            <div className="flex items-center gap-2">
              <Progress value={analysis.skillsMatch} className="flex-1 h-2" />
              <span className="text-sm font-medium">{analysis.skillsMatch}%</span>
            </div>
          </div>
        )}

        {/* Recomendações */}
        {analysis.recommendations && analysis.recommendations.length > 0 && (
          <div>
            <h4 className="font-semibold mb-2 flex items-center gap-2">
              <Star className="h-4 w-4 text-blue-600" />
              Recomendações
            </h4>
            <ul className="space-y-1">
              {analysis.recommendations.map((recommendation: string, index: number) => (
                <li key={index} className="text-sm text-muted-foreground flex items-start gap-2">
                  <Star className="h-3 w-3 text-blue-600 mt-0.5 flex-shrink-0" />
                  {recommendation}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    )
  }

  useEffect(() => {
    if (status === 'authenticated') {
      fetchCandidate()
    }
  }, [status, params.id])

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/signin')
    }
  }, [status, router])

  if (status === 'loading' || loading) {
    return (
      <DashboardLayout>
        <Loading text="Carregando candidato..." />
      </DashboardLayout>
    )
  }

  if (status === 'unauthenticated' || !candidate) {
    return null
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
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
              <h1 className="text-3xl font-bold tracking-tight">{candidate.name}</h1>
              <p className="text-muted-foreground">{candidate.email}</p>
            </div>
          </div>
          <div className="flex gap-2">
            <Button
              variant="outline"
              onClick={() => router.push(`/candidates/${candidate.id}/edit`)}
            >
              <Edit className="h-4 w-4 mr-2" />
              Editar
            </Button>
            <Button
              variant="destructive"
              onClick={handleDelete}
              disabled={deleting}
            >
              <Trash2 className="h-4 w-4 mr-2" />
              {deleting ? 'Excluindo...' : 'Excluir'}
            </Button>
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          {/* Informações Principais */}
          <div className="lg:col-span-2 space-y-6">
            {/* Dados Pessoais */}
            <Card>
              <CardHeader>
                <CardTitle>Informações Pessoais</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="flex items-center gap-2">
                    <Mail className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">{candidate.email}</span>
                  </div>
                  {candidate.phone && (
                    <div className="flex items-center gap-2">
                      <Phone className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm">{candidate.phone}</span>
                    </div>
                  )}
                  {candidate.location && (
                    <div className="flex items-center gap-2">
                      <MapPin className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm">{candidate.location}</span>
                    </div>
                  )}
                  {candidate.age && (
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm">{candidate.age} anos</span>
                    </div>
                  )}
                </div>

                <Separator />

                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="flex items-center gap-2">
                    <Briefcase className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">{candidate.experience} anos de experiência</span>
                  </div>
                  {candidate.education && (
                    <div className="flex items-center gap-2">
                      <GraduationCap className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm">{candidate.education}</span>
                    </div>
                  )}
                  {candidate.salary && (
                    <div className="flex items-center gap-2">
                      <DollarSign className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm">R$ {candidate.salary}</span>
                    </div>
                  )}
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">{candidate.availability}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Resumo Profissional */}
            {candidate.summary && (
              <Card>
                <CardHeader>
                  <CardTitle>Resumo Profissional</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground whitespace-pre-wrap">
                    {candidate.summary}
                  </p>
                </CardContent>
              </Card>
            )}

            {/* Skills */}
            <Card>
              <CardHeader>
                <CardTitle>Habilidades</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {candidate.skills.map((skill, index) => (
                    <Badge key={index} variant="secondary">
                      {skill}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Análise de IA */}
            {candidate.aiAnalysis && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Brain className="h-5 w-5" />
                    Análise de IA
                  </CardTitle>
                  <CardDescription>
                    Análise automática baseada no perfil do candidato
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {renderAIAnalysis(candidate.aiAnalysis)}
                </CardContent>
              </Card>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Status */}
            <Card>
              <CardHeader>
                <CardTitle>Status</CardTitle>
              </CardHeader>
              <CardContent>
                <Badge className={statusColors[candidate.status as CandidateStatus]}>
                  {statusLabels[candidate.status as CandidateStatus]}
                </Badge>
              </CardContent>
            </Card>

            {/* Datas */}
            <Card>
              <CardHeader>
                <CardTitle>Informações do Sistema</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div>
                  <span className="text-sm font-medium">Cadastrado em:</span>
                  <p className="text-sm text-muted-foreground">
                    {new Date(candidate.createdAt).toLocaleDateString('pt-BR', {
                      day: '2-digit',
                      month: '2-digit',
                      year: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit'
                    })}
                  </p>
                </div>
                <div>
                  <span className="text-sm font-medium">Última atualização:</span>
                  <p className="text-sm text-muted-foreground">
                    {new Date(candidate.updatedAt).toLocaleDateString('pt-BR', {
                      day: '2-digit',
                      month: '2-digit',
                      year: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit'
                    })}
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Aplicações */}
            {candidate.applications && candidate.applications.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle>Aplicações</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {candidate.applications.map((application) => (
                      <div key={application.id} className="border rounded-lg p-3">
                        <h4 className="font-medium text-sm">{application.position?.title || 'Vaga não encontrada'}</h4>
                        <p className="text-xs text-muted-foreground">
                          {new Date(application.createdAt).toLocaleDateString('pt-BR')}
                        </p>
                        <Badge variant="outline" className="mt-1">
                          {application.status}
                        </Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}