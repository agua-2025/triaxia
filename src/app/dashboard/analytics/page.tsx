'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { 
  TrendingUp, 
  TrendingDown, 
  Users, 
  Briefcase, 
  Target, 
  Clock, 
  DollarSign, 
  Award, 
  Calendar, 
  Filter, 
  Download, 
  RefreshCw, 
  BarChart3, 
  PieChart, 
  LineChart, 
  Activity, 
  Eye, 
  Heart, 
  Send, 
  CheckCircle, 
  XCircle, 
  AlertCircle, 
  Star,
  ArrowUp,
  ArrowDown,
  Minus
} from 'lucide-react'

interface MetricCard {
  title: string
  value: string
  change: number
  changeType: 'increase' | 'decrease' | 'neutral'
  icon: React.ReactNode
  description: string
}

interface ChartData {
  name: string
  value: number
  color?: string
}

const mockMetrics: MetricCard[] = [
  {
    title: 'Total de Vagas',
    value: '127',
    change: 12,
    changeType: 'increase',
    icon: <Briefcase className="h-6 w-6" />,
    description: 'Vagas ativas no sistema'
  },
  {
    title: 'Candidatos Ativos',
    value: '2,847',
    change: 8,
    changeType: 'increase',
    icon: <Users className="h-6 w-6" />,
    description: 'Candidatos cadastrados'
  },
  {
    title: 'Taxa de Match',
    value: '73%',
    change: -2,
    changeType: 'decrease',
    icon: <Target className="h-6 w-6" />,
    description: 'Compatibilidade média'
  },
  {
    title: 'Tempo Médio de Contratação',
    value: '18 dias',
    change: -5,
    changeType: 'increase',
    icon: <Clock className="h-6 w-6" />,
    description: 'Desde publicação até contratação'
  },
  {
    title: 'CVs Analisados',
    value: '1,234',
    change: 15,
    changeType: 'increase',
    icon: <Activity className="h-6 w-6" />,
    description: 'CVs processados pela IA'
  },
  {
    title: 'Taxa de Conversão',
    value: '24%',
    change: 3,
    changeType: 'increase',
    icon: <Award className="h-6 w-6" />,
    description: 'Candidatos contratados'
  }
]

const applicationsByMonth: ChartData[] = [
  { name: 'Jan', value: 245 },
  { name: 'Fev', value: 312 },
  { name: 'Mar', value: 428 },
  { name: 'Abr', value: 389 },
  { name: 'Mai', value: 467 },
  { name: 'Jun', value: 523 },
  { name: 'Jul', value: 612 }
]

const jobsByCategory: ChartData[] = [
  { name: 'Tecnologia', value: 45, color: '#3B82F6' },
  { name: 'Marketing', value: 23, color: '#10B981' },
  { name: 'Vendas', value: 18, color: '#F59E0B' },
  { name: 'Design', value: 14, color: '#EF4444' }
]

const topPerformingJobs = [
  {
    id: '1',
    title: 'Desenvolvedor Full Stack Senior',
    company: 'TechCorp',
    applications: 89,
    matches: 67,
    hires: 3,
    conversionRate: 75
  },
  {
    id: '2',
    title: 'Designer UX/UI',
    company: 'StartupXYZ',
    applications: 156,
    matches: 98,
    hires: 2,
    conversionRate: 63
  },
  {
    id: '3',
    title: 'Gerente de Marketing',
    company: 'MarketingPro',
    applications: 234,
    matches: 145,
    hires: 1,
    conversionRate: 62
  }
]

const recentActivity = [
  {
    id: '1',
    type: 'match',
    description: 'Novo match encontrado: João Silva → Desenvolvedor Senior',
    time: '2 min atrás',
    icon: <Heart className="h-4 w-4 text-red-500" />
  },
  {
    id: '2',
    type: 'application',
    description: 'Nova candidatura recebida para Designer UX/UI',
    time: '5 min atrás',
    icon: <Send className="h-4 w-4 text-blue-500" />
  },
  {
    id: '3',
    type: 'hire',
    description: 'Candidato contratado: Maria Santos → Product Manager',
    time: '1 hora atrás',
    icon: <CheckCircle className="h-4 w-4 text-green-500" />
  },
  {
    id: '4',
    type: 'cv_analysis',
    description: '15 novos CVs analisados pela IA',
    time: '2 horas atrás',
    icon: <Activity className="h-4 w-4 text-purple-500" />
  }
]

export default function AnalyticsPage() {
  const [timeRange, setTimeRange] = useState('7d')
  const [selectedMetric, setSelectedMetric] = useState<string | null>(null)

  const getChangeIcon = (changeType: string) => {
    switch (changeType) {
      case 'increase': return <ArrowUp className="h-4 w-4 text-green-500" />
      case 'decrease': return <ArrowDown className="h-4 w-4 text-red-500" />
      default: return <Minus className="h-4 w-4 text-gray-500" />
    }
  }

  const getChangeColor = (changeType: string) => {
    switch (changeType) {
      case 'increase': return 'text-green-600'
      case 'decrease': return 'text-red-600'
      default: return 'text-gray-600'
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold text-gray-900">Analytics & Relatórios</h1>
              <Badge className="ml-3">Tempo Real</Badge>
            </div>
            <div className="flex items-center space-x-4">
              <select 
                value={timeRange} 
                onChange={(e) => setTimeRange(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="24h">Últimas 24h</option>
                <option value="7d">Últimos 7 dias</option>
                <option value="30d">Últimos 30 dias</option>
                <option value="90d">Últimos 90 dias</option>
              </select>
              <Button variant="outline" size="sm">
                <Filter className="h-4 w-4 mr-2" />
                Filtros
              </Button>
              <Button variant="outline" size="sm">
                <Download className="h-4 w-4 mr-2" />
                Exportar
              </Button>
              <Button size="sm">
                <RefreshCw className="h-4 w-4 mr-2" />
                Atualizar
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6 mb-8">
          {mockMetrics.map((metric, index) => (
            <Card 
              key={index} 
              className={`hover:shadow-lg transition-shadow cursor-pointer ${
                selectedMetric === metric.title ? 'ring-2 ring-blue-500' : ''
              }`}
              onClick={() => setSelectedMetric(selectedMetric === metric.title ? null : metric.title)}
            >
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-gray-600">
                  {metric.title}
                </CardTitle>
                <div className="text-gray-400">
                  {metric.icon}
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-gray-900 mb-1">
                  {metric.value}
                </div>
                <div className="flex items-center text-sm">
                  {getChangeIcon(metric.changeType)}
                  <span className={`ml-1 ${getChangeColor(metric.changeType)}`}>
                    {Math.abs(metric.change)}%
                  </span>
                  <span className="text-gray-500 ml-1">vs período anterior</span>
                </div>
                <p className="text-xs text-gray-500 mt-1">{metric.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Applications Trend */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <LineChart className="h-5 w-5 mr-2" />
                Tendência de Candidaturas
              </CardTitle>
              <CardDescription>Candidaturas recebidas por mês</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-64 flex items-end justify-between space-x-2">
                {applicationsByMonth.map((data, index) => (
                  <div key={index} className="flex flex-col items-center flex-1">
                    <div 
                      className="bg-blue-500 rounded-t w-full transition-all hover:bg-blue-600 cursor-pointer"
                      style={{ height: `${(data.value / 612) * 200}px` }}
                      title={`${data.name}: ${data.value} candidaturas`}
                    ></div>
                    <span className="text-xs text-gray-600 mt-2">{data.name}</span>
                    <span className="text-xs font-medium text-gray-900">{data.value}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Jobs by Category */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <PieChart className="h-5 w-5 mr-2" />
                Vagas por Categoria
              </CardTitle>
              <CardDescription>Distribuição das vagas ativas</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {jobsByCategory.map((category, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div 
                        className="w-4 h-4 rounded mr-3"
                        style={{ backgroundColor: category.color }}
                      ></div>
                      <span className="text-sm font-medium">{category.name}</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="w-24">
                        <Progress 
                          value={(category.value / 100) * 100} 
                          className="h-2"
                        />
                      </div>
                      <span className="text-sm font-bold w-8">{category.value}%</span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Performance Tables */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Top Performing Jobs */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Award className="h-5 w-5 mr-2" />
                Vagas com Melhor Performance
              </CardTitle>
              <CardDescription>Baseado na taxa de conversão</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {topPerformingJobs.map((job, index) => (
                  <div key={job.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex-1">
                      <div className="flex items-center mb-1">
                        <Badge variant="outline" className="mr-2">#{index + 1}</Badge>
                        <h4 className="font-medium text-sm">{job.title}</h4>
                      </div>
                      <p className="text-xs text-gray-600">{job.company}</p>
                      <div className="flex items-center space-x-4 mt-2 text-xs text-gray-500">
                        <span>{job.applications} candidaturas</span>
                        <span>{job.matches} matches</span>
                        <span>{job.hires} contratações</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-lg font-bold text-green-600">
                        {job.conversionRate}%
                      </div>
                      <p className="text-xs text-gray-500">conversão</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Recent Activity */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Activity className="h-5 w-5 mr-2" />
                Atividade Recente
              </CardTitle>
              <CardDescription>Últimas ações no sistema</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentActivity.map((activity) => (
                  <div key={activity.id} className="flex items-start space-x-3">
                    <div className="flex-shrink-0 mt-1">
                      {activity.icon}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm text-gray-900">{activity.description}</p>
                      <p className="text-xs text-gray-500">{activity.time}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-4 pt-4 border-t border-gray-200">
                <Button variant="outline" size="sm" className="w-full">
                  <Eye className="h-4 w-4 mr-2" />
                  Ver Todas as Atividades
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Detailed Analytics */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Conversion Funnel */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <BarChart3 className="h-5 w-5 mr-2" />
                Funil de Conversão
              </CardTitle>
              <CardDescription>Jornada do candidato</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm">Candidaturas</span>
                  <div className="flex items-center">
                    <div className="w-20 bg-blue-200 h-4 rounded mr-2"></div>
                    <span className="text-sm font-medium">2,847</span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Triagem IA</span>
                  <div className="flex items-center">
                    <div className="w-16 bg-blue-300 h-4 rounded mr-2"></div>
                    <span className="text-sm font-medium">2,134</span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Matches</span>
                  <div className="flex items-center">
                    <div className="w-12 bg-blue-400 h-4 rounded mr-2"></div>
                    <span className="text-sm font-medium">1,567</span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Entrevistas</span>
                  <div className="flex items-center">
                    <div className="w-8 bg-blue-500 h-4 rounded mr-2"></div>
                    <span className="text-sm font-medium">892</span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Contratações</span>
                  <div className="flex items-center">
                    <div className="w-4 bg-blue-600 h-4 rounded mr-2"></div>
                    <span className="text-sm font-medium">234</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* AI Performance */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Target className="h-5 w-5 mr-2" />
                Performance da IA
              </CardTitle>
              <CardDescription>Métricas de precisão</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm">Precisão de Matching</span>
                    <span className="text-sm font-medium">87%</span>
                  </div>
                  <Progress value={87} className="h-2" />
                </div>
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm">Análise de CVs</span>
                    <span className="text-sm font-medium">94%</span>
                  </div>
                  <Progress value={94} className="h-2" />
                </div>
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm">Predição de Sucesso</span>
                    <span className="text-sm font-medium">76%</span>
                  </div>
                  <Progress value={76} className="h-2" />
                </div>
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm">Tempo de Processamento</span>
                    <span className="text-sm font-medium">2.3s</span>
                  </div>
                  <div className="text-xs text-gray-500">Média por CV</div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* System Health */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Activity className="h-5 w-5 mr-2" />
                Saúde do Sistema
              </CardTitle>
              <CardDescription>Status operacional</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm">API Response Time</span>
                  <div className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-1" />
                    <span className="text-sm font-medium">145ms</span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Database Performance</span>
                  <div className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-1" />
                    <span className="text-sm font-medium">Excelente</span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">AI Model Status</span>
                  <div className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-1" />
                    <span className="text-sm font-medium">Online</span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Storage Usage</span>
                  <div className="flex items-center">
                    <AlertCircle className="h-4 w-4 text-yellow-500 mr-1" />
                    <span className="text-sm font-medium">78%</span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Active Users</span>
                  <div className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-1" />
                    <span className="text-sm font-medium">24</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}