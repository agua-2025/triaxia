'use client'

import { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'
import Link from 'next/link'
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  AreaChart,
  Area
} from 'recharts'
import {
  TrendingUp,
  TrendingDown,
  Users,
  Briefcase,
  Target,
  Clock,
  Calendar,
  Download,
  Filter,
  Eye,
  MessageCircle,
  CheckCircle,
  XCircle,
  AlertCircle,
  BarChart3,
  PieChart as PieChartIcon,
  Activity,
  DollarSign,
  UserCheck,
  Building
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
// Componente select não disponível - usando select nativo
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui/tabs'

// Mock data for charts
const applicationsByMonth = [
  { month: 'Jan', applications: 45, hires: 8 },
  { month: 'Fev', applications: 52, hires: 12 },
  { month: 'Mar', applications: 48, hires: 9 },
  { month: 'Abr', applications: 61, hires: 15 },
  { month: 'Mai', applications: 55, hires: 11 },
  { month: 'Jun', applications: 67, hires: 18 },
]

const jobsByDepartment = [
  { name: 'Tecnologia', value: 35, color: '#8884d8' },
  { name: 'Marketing', value: 25, color: '#82ca9d' },
  { name: 'Vendas', value: 20, color: '#ffc658' },
  { name: 'RH', value: 12, color: '#ff7300' },
  { name: 'Financeiro', value: 8, color: '#00ff88' },
]

const conversionFunnel = [
  { stage: 'Candidaturas', count: 324, percentage: 100 },
  { stage: 'Triagem', count: 156, percentage: 48 },
  { stage: 'Entrevistas', count: 89, percentage: 27 },
  { stage: 'Ofertas', count: 34, percentage: 10 },
  { stage: 'Contratações', count: 28, percentage: 9 },
]

const timeToHire = [
  { week: 'Sem 1', days: 12 },
  { week: 'Sem 2', days: 15 },
  { week: 'Sem 3', days: 18 },
  { week: 'Sem 4', days: 14 },
  { week: 'Sem 5', days: 16 },
  { week: 'Sem 6', days: 13 },
]

const topSkills = [
  { skill: 'React', demand: 85, supply: 45 },
  { skill: 'Node.js', demand: 78, supply: 52 },
  { skill: 'Python', demand: 72, supply: 38 },
  { skill: 'TypeScript', demand: 68, supply: 41 },
  { skill: 'AWS', demand: 65, supply: 28 },
  { skill: 'Docker', demand: 58, supply: 35 },
]

const salaryRanges = [
  { range: '3k-5k', count: 45 },
  { range: '5k-8k', count: 78 },
  { range: '8k-12k', count: 92 },
  { range: '12k-18k', count: 56 },
  { range: '18k+', count: 23 },
]

export default function AnalyticsPage() {
  const params = useParams()
  const tenantSlug = Array.isArray(params?.tenant) ? params.tenant[0] : (params?.tenant as string) || ''
  
  const [timeRange, setTimeRange] = useState('6months')
  const [selectedMetric, setSelectedMetric] = useState('applications')
  
  if (!tenantSlug) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Erro</h1>
          <p className="text-gray-600">Tenant não encontrado.</p>
        </div>
      </div>
    )
  }
  
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
                <div className="p-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg">
                  <BarChart3 className="w-8 h-8 text-white" />
                </div>
                Analytics & Relatórios
              </h1>
              <p className="text-gray-600 mt-2">
                Acompanhe métricas e insights do seu processo de recrutamento
              </p>
            </div>
            <div className="flex items-center gap-4">
              <select
                value={timeRange}
                onChange={(e) => setTimeRange(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 w-40"
              >
                <option value="1month">Último mês</option>
                <option value="3months">Últimos 3 meses</option>
                <option value="6months">Últimos 6 meses</option>
                <option value="1year">Último ano</option>
              </select>
              <Button variant="outline">
                <Download className="w-4 h-4 mr-2" />
                Exportar
              </Button>
              <Link href={`/${tenantSlug}/dashboard`}>
                <Button variant="outline">
                  Voltar ao Dashboard
                </Button>
              </Link>
            </div>
          </div>
        </div>
        
        {/* KPI Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total de Candidaturas</p>
                  <p className="text-2xl font-bold text-gray-900">324</p>
                  <div className="flex items-center mt-1">
                    <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
                    <span className="text-sm text-green-600">+12% vs mês anterior</span>
                  </div>
                </div>
                <div className="p-3 bg-blue-100 rounded-lg">
                  <Users className="w-6 h-6 text-blue-600" />
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Vagas Ativas</p>
                  <p className="text-2xl font-bold text-gray-900">18</p>
                  <div className="flex items-center mt-1">
                    <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
                    <span className="text-sm text-green-600">+3 esta semana</span>
                  </div>
                </div>
                <div className="p-3 bg-green-100 rounded-lg">
                  <Briefcase className="w-6 h-6 text-green-600" />
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Taxa de Conversão</p>
                  <p className="text-2xl font-bold text-gray-900">8.6%</p>
                  <div className="flex items-center mt-1">
                    <TrendingDown className="w-4 h-4 text-red-500 mr-1" />
                    <span className="text-sm text-red-600">-1.2% vs mês anterior</span>
                  </div>
                </div>
                <div className="p-3 bg-purple-100 rounded-lg">
                  <Target className="w-6 h-6 text-purple-600" />
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Tempo Médio de Contratação</p>
                  <p className="text-2xl font-bold text-gray-900">14 dias</p>
                  <div className="flex items-center mt-1">
                    <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
                    <span className="text-sm text-green-600">-2 dias vs mês anterior</span>
                  </div>
                </div>
                <div className="p-3 bg-orange-100 rounded-lg">
                  <Clock className="w-6 h-6 text-orange-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        
        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Visão Geral</TabsTrigger>
            <TabsTrigger value="recruitment">Recrutamento</TabsTrigger>
            <TabsTrigger value="candidates">Candidatos</TabsTrigger>
            <TabsTrigger value="performance">Performance</TabsTrigger>
          </TabsList>
          
          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Applications & Hires Chart */}
              <Card>
                <CardHeader>
                  <CardTitle>Candidaturas e Contratações</CardTitle>
                  <CardDescription>
                    Evolução mensal de candidaturas recebidas e contratações realizadas
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={applicationsByMonth}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip />
                      <Bar dataKey="applications" fill="#3b82f6" name="Candidaturas" />
                      <Bar dataKey="hires" fill="#10b981" name="Contratações" />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
              
              {/* Jobs by Department */}
              <Card>
                <CardHeader>
                  <CardTitle>Vagas por Departamento</CardTitle>
                  <CardDescription>
                    Distribuição de vagas ativas por área da empresa
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                      <Pie
                        data={jobsByDepartment}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={({ name, percent }) => `${name} ${percent ? (percent * 100).toFixed(0) : 0}%`}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                      >
                        {jobsByDepartment.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Time to Hire */}
              <Card>
                <CardHeader>
                  <CardTitle>Tempo de Contratação</CardTitle>
                  <CardDescription>
                    Tempo médio em dias para completar uma contratação
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={timeToHire}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="week" />
                      <YAxis />
                      <Tooltip />
                      <Line type="monotone" dataKey="days" stroke="#f59e0b" strokeWidth={2} />
                    </LineChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
              
              {/* Salary Ranges */}
              <Card>
                <CardHeader>
                  <CardTitle>Faixas Salariais</CardTitle>
                  <CardDescription>
                    Distribuição de candidatos por faixa salarial pretendida
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={salaryRanges} layout="horizontal">
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis type="number" />
                      <YAxis dataKey="range" type="category" />
                      <Tooltip />
                      <Bar dataKey="count" fill="#8b5cf6" />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          
          <TabsContent value="recruitment" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Conversion Funnel */}
              <Card>
                <CardHeader>
                  <CardTitle>Funil de Conversão</CardTitle>
                  <CardDescription>
                    Acompanhe o progresso dos candidatos através do processo seletivo
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {conversionFunnel.map((stage, index) => (
                      <div key={stage.stage} className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className={`w-3 h-3 rounded-full ${
                            index === 0 ? 'bg-blue-500' :
                            index === 1 ? 'bg-yellow-500' :
                            index === 2 ? 'bg-orange-500' :
                            index === 3 ? 'bg-purple-500' :
                            'bg-green-500'
                          }`} />
                          <span className="font-medium">{stage.stage}</span>
                        </div>
                        <div className="flex items-center gap-4">
                          <span className="text-2xl font-bold">{stage.count}</span>
                          <Badge variant="outline">{stage.percentage}%</Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
              
              {/* Top Skills */}
              <Card>
                <CardHeader>
                  <CardTitle>Skills em Demanda</CardTitle>
                  <CardDescription>
                    Comparação entre demanda das vagas e oferta dos candidatos
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {topSkills.map((skill) => (
                      <div key={skill.skill} className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="font-medium">{skill.skill}</span>
                          <span className="text-gray-500">Demanda: {skill.demand}% | Oferta: {skill.supply}%</span>
                        </div>
                        <div className="flex gap-2">
                          <div className="flex-1 bg-gray-200 rounded-full h-2">
                            <div 
                              className="bg-red-500 h-2 rounded-full" 
                              style={{ width: `${skill.demand}%` }}
                            />
                          </div>
                          <div className="flex-1 bg-gray-200 rounded-full h-2">
                            <div 
                              className="bg-green-500 h-2 rounded-full" 
                              style={{ width: `${skill.supply}%` }}
                            />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          
          <TabsContent value="candidates" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Candidatos Únicos</p>
                      <p className="text-2xl font-bold text-gray-900">1,247</p>
                      <p className="text-xs text-green-600 mt-1">+18% este mês</p>
                    </div>
                    <div className="p-3 bg-blue-100 rounded-lg">
                      <UserCheck className="w-6 h-6 text-blue-600" />
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Taxa de Resposta</p>
                      <p className="text-2xl font-bold text-gray-900">76%</p>
                      <p className="text-xs text-green-600 mt-1">+5% este mês</p>
                    </div>
                    <div className="p-3 bg-green-100 rounded-lg">
                      <MessageCircle className="w-6 h-6 text-green-600" />
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Qualidade Média</p>
                      <p className="text-2xl font-bold text-gray-900">8.4/10</p>
                      <p className="text-xs text-green-600 mt-1">+0.3 este mês</p>
                    </div>
                    <div className="p-3 bg-purple-100 rounded-lg">
                      <Target className="w-6 h-6 text-purple-600" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            <Card>
              <CardHeader>
                <CardTitle>Origem dos Candidatos</CardTitle>
                <CardDescription>
                  De onde vêm os melhores candidatos
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { source: 'LinkedIn', candidates: 156, quality: 8.7, color: 'bg-blue-500' },
                    { source: 'Site da Empresa', candidates: 89, quality: 9.1, color: 'bg-green-500' },
                    { source: 'Indicações', candidates: 45, quality: 9.3, color: 'bg-purple-500' },
                    { source: 'Indeed', candidates: 78, quality: 7.2, color: 'bg-orange-500' },
                    { source: 'Outros', candidates: 32, quality: 6.8, color: 'bg-gray-500' },
                  ].map((source) => (
                    <div key={source.source} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center gap-3">
                        <div className={`w-4 h-4 rounded-full ${source.color}`} />
                        <span className="font-medium">{source.source}</span>
                      </div>
                      <div className="flex items-center gap-6">
                        <div className="text-center">
                          <p className="text-sm text-gray-500">Candidatos</p>
                          <p className="font-bold">{source.candidates}</p>
                        </div>
                        <div className="text-center">
                          <p className="text-sm text-gray-500">Qualidade</p>
                          <p className="font-bold">{source.quality}/10</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="performance" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Custo por Contratação</p>
                      <p className="text-2xl font-bold text-gray-900">R$ 2.450</p>
                      <p className="text-xs text-red-600 mt-1">+R$ 200 vs mês anterior</p>
                    </div>
                    <div className="p-3 bg-red-100 rounded-lg">
                      <DollarSign className="w-6 h-6 text-red-600" />
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">ROI de Recrutamento</p>
                      <p className="text-2xl font-bold text-gray-900">340%</p>
                      <p className="text-xs text-green-600 mt-1">+15% este trimestre</p>
                    </div>
                    <div className="p-3 bg-green-100 rounded-lg">
                      <TrendingUp className="w-6 h-6 text-green-600" />
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Satisfação do Candidato</p>
                      <p className="text-2xl font-bold text-gray-900">4.6/5</p>
                      <p className="text-xs text-green-600 mt-1">+0.2 este mês</p>
                    </div>
                    <div className="p-3 bg-yellow-100 rounded-lg">
                      <Activity className="w-6 h-6 text-yellow-600" />
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Retenção 90 dias</p>
                      <p className="text-2xl font-bold text-gray-900">94%</p>
                      <p className="text-xs text-green-600 mt-1">+2% este trimestre</p>
                    </div>
                    <div className="p-3 bg-purple-100 rounded-lg">
                      <Building className="w-6 h-6 text-purple-600" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            <Card>
              <CardHeader>
                <CardTitle>Benchmarks do Setor</CardTitle>
                <CardDescription>
                  Compare sua performance com a média do mercado
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {[
                    { metric: 'Tempo de Contratação', company: 14, market: 21, unit: 'dias', better: true },
                    { metric: 'Taxa de Conversão', company: 8.6, market: 6.2, unit: '%', better: true },
                    { metric: 'Custo por Contratação', company: 2450, market: 3200, unit: 'R$', better: true },
                    { metric: 'Qualidade de Contratação', company: 8.4, market: 7.1, unit: '/10', better: true },
                  ].map((benchmark) => (
                    <div key={benchmark.metric} className="flex items-center justify-between p-4 border rounded-lg">
                      <div>
                        <p className="font-medium">{benchmark.metric}</p>
                        <p className="text-sm text-gray-500">Sua empresa vs. mercado</p>
                      </div>
                      <div className="flex items-center gap-6">
                        <div className="text-center">
                          <p className="text-sm text-gray-500">Sua empresa</p>
                          <p className={`font-bold ${benchmark.better ? 'text-green-600' : 'text-red-600'}`}>
                            {benchmark.company}{benchmark.unit}
                          </p>
                        </div>
                        <div className="text-center">
                          <p className="text-sm text-gray-500">Mercado</p>
                          <p className="font-bold text-gray-600">
                            {benchmark.market}{benchmark.unit}
                          </p>
                        </div>
                        <div className="flex items-center">
                          {benchmark.better ? (
                            <TrendingUp className="w-5 h-5 text-green-500" />
                          ) : (
                            <TrendingDown className="w-5 h-5 text-red-500" />
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}