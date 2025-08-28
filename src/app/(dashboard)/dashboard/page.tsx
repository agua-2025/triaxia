'use client'

import { useSession } from 'next-auth/react'
import { DashboardLayout } from '@/components/layout/dashboard-layout'
import { StatsCard } from '@/components/ui/stats-card'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { LoadingPage } from '@/components/ui/loading'
import {
  Users,
  Briefcase,
  FileText,
  TrendingUp,
  Brain,
  Clock,
  CheckCircle,
  AlertCircle
} from 'lucide-react'

// Dados mockados para demonstração
const mockStats = {
  totalCandidates: 1247,
  activeCandidates: 892,
  totalPositions: 23,
  activePositions: 15,
  totalApplications: 3456,
  pendingApplications: 127,
  averageMatchScore: 78.5,
  topSkills: [
    { skill: 'JavaScript', count: 234 },
    { skill: 'React', count: 189 },
    { skill: 'Python', count: 156 },
    { skill: 'Node.js', count: 134 },
    { skill: 'TypeScript', count: 98 }
  ]
}

const recentActivities = [
  {
    id: 1,
    type: 'candidate_added',
    message: 'Novo candidato: Maria Silva foi adicionado',
    time: '2 minutos atrás',
    icon: Users
  },
  {
    id: 2,
    type: 'ai_analysis',
    message: 'Análise de IA concluída para João Santos (Score: 85%)',
    time: '15 minutos atrás',
    icon: Brain
  },
  {
    id: 3,
    type: 'position_filled',
    message: 'Vaga de Desenvolvedor Frontend foi preenchida',
    time: '1 hora atrás',
    icon: CheckCircle
  },
  {
    id: 4,
    type: 'application_received',
    message: '5 novas candidaturas para Analista de Dados',
    time: '2 horas atrás',
    icon: FileText
  }
]

export default function DashboardPage() {
  const { data: session, status } = useSession()

  if (status === 'loading') {
    return <LoadingPage text="Carregando dashboard..." />
  }

  if (status === 'unauthenticated') {
    return <div>Não autorizado</div>
  }

  return (
    <DashboardLayout>
      <div className="space-y-8">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            Bem-vindo, {session?.user?.name}!
          </h1>
          <p className="mt-2 text-gray-600">
            Aqui está um resumo da atividade da sua empresa {session?.user?.company?.name}
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatsCard
            title="Total de Candidatos"
            value={mockStats.totalCandidates.toLocaleString()}
            description={`${mockStats.activeCandidates} ativos`}
            icon={Users}
            trend={{
              value: 12,
              label: 'vs mês anterior',
              isPositive: true
            }}
          />
          
          <StatsCard
            title="Vagas Abertas"
            value={mockStats.activePositions}
            description={`${mockStats.totalPositions} total`}
            icon={Briefcase}
            trend={{
              value: 8,
              label: 'vs mês anterior',
              isPositive: true
            }}
          />
          
          <StatsCard
            title="Candidaturas"
            value={mockStats.totalApplications.toLocaleString()}
            description={`${mockStats.pendingApplications} pendentes`}
            icon={FileText}
            trend={{
              value: 23,
              label: 'vs mês anterior',
              isPositive: true
            }}
          />
          
          <StatsCard
            title="Score Médio IA"
            value={`${mockStats.averageMatchScore}%`}
            description="Compatibilidade média"
            icon={Brain}
            trend={{
              value: 5,
              label: 'vs mês anterior',
              isPositive: true
            }}
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Recent Activities */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="h-5 w-5" />
                Atividades Recentes
              </CardTitle>
              <CardDescription>
                Últimas atividades do sistema
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentActivities.map((activity) => {
                  const IconComponent = activity.icon
                  return (
                    <div key={activity.id} className="flex items-start gap-3">
                      <div className="flex-shrink-0">
                        <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                          <IconComponent className="h-4 w-4 text-blue-600" />
                        </div>
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm text-gray-900">{activity.message}</p>
                        <p className="text-xs text-gray-500">{activity.time}</p>
                      </div>
                    </div>
                  )
                })}
              </div>
            </CardContent>
          </Card>

          {/* Top Skills */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5" />
                Habilidades Mais Procuradas
              </CardTitle>
              <CardDescription>
                Skills mais comuns entre os candidatos
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {mockStats.topSkills.map((skill, index) => (
                  <div key={skill.skill} className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-6 h-6 bg-gray-100 rounded-full flex items-center justify-center text-xs font-medium text-gray-600">
                        {index + 1}
                      </div>
                      <span className="text-sm font-medium text-gray-900">{skill.skill}</span>
                    </div>
                    <span className="text-sm text-gray-500">{skill.count} candidatos</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle>Ações Rápidas</CardTitle>
            <CardDescription>
              Acesse rapidamente as funcionalidades mais utilizadas
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <button className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors text-left">
                <Users className="h-8 w-8 text-blue-600 mb-2" />
                <h3 className="font-medium text-gray-900">Adicionar Candidato</h3>
                <p className="text-sm text-gray-500">Cadastrar novo candidato no sistema</p>
              </button>
              
              <button className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors text-left">
                <Briefcase className="h-8 w-8 text-green-600 mb-2" />
                <h3 className="font-medium text-gray-900">Nova Vaga</h3>
                <p className="text-sm text-gray-500">Criar nova posição em aberto</p>
              </button>
              
              <button className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors text-left">
                <Brain className="h-8 w-8 text-purple-600 mb-2" />
                <h3 className="font-medium text-gray-900">Análise IA</h3>
                <p className="text-sm text-gray-500">Executar análise inteligente</p>
              </button>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  )
}