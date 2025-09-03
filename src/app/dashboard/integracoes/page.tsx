'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { 
  Settings, 
  Link, 
  CheckCircle, 
  AlertCircle, 
  Clock, 
  Plus, 
  Search, 
  Filter, 
  MoreHorizontal, 
  Zap, 
  Globe, 
  Database, 
  Mail, 
  Calendar, 
  FileText, 
  Users, 
  Building, 
  Briefcase, 
  Target, 
  Activity, 
  Key, 
  Shield, 
  Eye, 
  Edit, 
  Trash2, 
  Download, 
  Upload, 
  RefreshCw, 
  ExternalLink, 
  AlertTriangle, 
  Info, 
  CheckSquare, 
  X
} from 'lucide-react'

interface Integration {
  id: string
  name: string
  description: string
  category: 'job_boards' | 'ats' | 'communication' | 'analytics' | 'hr_systems'
  status: 'connected' | 'disconnected' | 'error' | 'syncing'
  logo?: string
  features: string[]
  lastSync?: string
  syncFrequency: string
  dataTypes: string[]
  metrics?: {
    jobsImported: number
    candidatesImported: number
    applicationsExported: number
  }
}

interface SyncLog {
  id: string
  integration: string
  type: 'import' | 'export' | 'sync'
  status: 'success' | 'error' | 'warning'
  timestamp: string
  details: string
  recordsProcessed?: number
}

const mockIntegrations: Integration[] = [
  {
    id: '1',
    name: 'LinkedIn Jobs',
    description: 'Publique vagas e importe candidatos do LinkedIn',
    category: 'job_boards',
    status: 'connected',
    features: ['Publicação de vagas', 'Importação de candidatos', 'Análise de perfis'],
    lastSync: '2024-01-15T10:30:00Z',
    syncFrequency: 'A cada 4 horas',
    dataTypes: ['Vagas', 'Candidatos', 'Aplicações'],
    metrics: {
      jobsImported: 45,
      candidatesImported: 234,
      applicationsExported: 12
    }
  },
  {
    id: '2',
    name: 'Indeed',
    description: 'Integração com a maior plataforma de empregos',
    category: 'job_boards',
    status: 'connected',
    features: ['Publicação automática', 'Importação de CVs', 'Métricas de performance'],
    lastSync: '2024-01-15T09:45:00Z',
    syncFrequency: 'Diário',
    dataTypes: ['Vagas', 'Candidatos'],
    metrics: {
      jobsImported: 78,
      candidatesImported: 456,
      applicationsExported: 23
    }
  },
  {
    id: '3',
    name: 'Workday',
    description: 'Sistema de gestão de recursos humanos',
    category: 'hr_systems',
    status: 'syncing',
    features: ['Sincronização de funcionários', 'Gestão de cargos', 'Relatórios'],
    lastSync: '2024-01-15T08:20:00Z',
    syncFrequency: 'Semanal',
    dataTypes: ['Funcionários', 'Cargos', 'Departamentos']
  },
  {
    id: '4',
    name: 'Slack',
    description: 'Notificações e comunicação da equipe',
    category: 'communication',
    status: 'connected',
    features: ['Notificações automáticas', 'Comandos de bot', 'Relatórios'],
    lastSync: '2024-01-15T10:25:00Z',
    syncFrequency: 'Tempo real',
    dataTypes: ['Notificações', 'Mensagens']
  },
  {
    id: '5',
    name: 'Google Calendar',
    description: 'Agendamento de entrevistas e eventos',
    category: 'communication',
    status: 'connected',
    features: ['Agendamento automático', 'Lembretes', 'Sincronização de calendário'],
    lastSync: '2024-01-15T10:15:00Z',
    syncFrequency: 'Tempo real',
    dataTypes: ['Eventos', 'Entrevistas']
  },
  {
    id: '6',
    name: 'Greenhouse',
    description: 'Sistema de rastreamento de candidatos',
    category: 'ats',
    status: 'error',
    features: ['Importação de candidatos', 'Sincronização de vagas', 'Relatórios'],
    lastSync: '2024-01-14T15:30:00Z',
    syncFrequency: 'A cada 6 horas',
    dataTypes: ['Candidatos', 'Vagas', 'Entrevistas']
  },
  {
    id: '7',
    name: 'Microsoft Teams',
    description: 'Entrevistas virtuais e comunicação',
    category: 'communication',
    status: 'disconnected',
    features: ['Entrevistas virtuais', 'Gravação de sessões', 'Integração com calendário'],
    syncFrequency: 'Tempo real',
    dataTypes: ['Reuniões', 'Gravações']
  },
  {
    id: '8',
    name: 'Google Analytics',
    description: 'Análise de performance de vagas',
    category: 'analytics',
    status: 'connected',
    features: ['Métricas de visualização', 'Análise de conversão', 'Relatórios customizados'],
    lastSync: '2024-01-15T10:00:00Z',
    syncFrequency: 'Diário',
    dataTypes: ['Métricas', 'Eventos']
  }
]

const mockSyncLogs: SyncLog[] = [
  {
    id: '1',
    integration: 'LinkedIn Jobs',
    type: 'import',
    status: 'success',
    timestamp: '2024-01-15T10:30:00Z',
    details: 'Importados 15 novos candidatos',
    recordsProcessed: 15
  },
  {
    id: '2',
    integration: 'Indeed',
    type: 'export',
    status: 'success',
    timestamp: '2024-01-15T09:45:00Z',
    details: 'Publicadas 3 novas vagas',
    recordsProcessed: 3
  },
  {
    id: '3',
    integration: 'Greenhouse',
    type: 'sync',
    status: 'error',
    timestamp: '2024-01-15T08:15:00Z',
    details: 'Erro de autenticação - Token expirado',
    recordsProcessed: 0
  },
  {
    id: '4',
    integration: 'Workday',
    type: 'import',
    status: 'warning',
    timestamp: '2024-01-15T07:30:00Z',
    details: 'Sincronização parcial - 2 registros com erro',
    recordsProcessed: 48
  }
]

export default function IntegracoesPage() {
  const [activeTab, setActiveTab] = useState<'integrations' | 'logs' | 'settings'>('integrations')
  const [selectedCategory, setSelectedCategory] = useState<string>('all')
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedIntegration, setSelectedIntegration] = useState<Integration | null>(null)

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'connected': return 'bg-green-100 text-green-800'
      case 'disconnected': return 'bg-gray-100 text-gray-800'
      case 'error': return 'bg-red-100 text-red-800'
      case 'syncing': return 'bg-blue-100 text-blue-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'connected': return <CheckCircle className="h-4 w-4 text-green-600" />
      case 'disconnected': return <X className="h-4 w-4 text-gray-400" />
      case 'error': return <AlertCircle className="h-4 w-4 text-red-600" />
      case 'syncing': return <RefreshCw className="h-4 w-4 text-blue-600 animate-spin" />
      default: return <Clock className="h-4 w-4 text-gray-400" />
    }
  }

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'job_boards': return <Globe className="h-5 w-5" />
      case 'ats': return <Database className="h-5 w-5" />
      case 'communication': return <Mail className="h-5 w-5" />
      case 'analytics': return <Activity className="h-5 w-5" />
      case 'hr_systems': return <Building className="h-5 w-5" />
      default: return <Settings className="h-5 w-5" />
    }
  }

  const getCategoryName = (category: string) => {
    switch (category) {
      case 'job_boards': return 'Portais de Emprego'
      case 'ats': return 'Sistemas ATS'
      case 'communication': return 'Comunicação'
      case 'analytics': return 'Analytics'
      case 'hr_systems': return 'Sistemas de RH'
      default: return 'Outros'
    }
  }

  const getSyncLogStatusColor = (status: string) => {
    switch (status) {
      case 'success': return 'bg-green-100 text-green-800'
      case 'error': return 'bg-red-100 text-red-800'
      case 'warning': return 'bg-yellow-100 text-yellow-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const filteredIntegrations = mockIntegrations.filter(integration => {
    const matchesSearch = integration.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         integration.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === 'all' || integration.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  const connectedIntegrations = mockIntegrations.filter(i => i.status === 'connected').length
  const totalSyncs = mockSyncLogs.length
  const successfulSyncs = mockSyncLogs.filter(log => log.status === 'success').length
  const errorSyncs = mockSyncLogs.filter(log => log.status === 'error').length

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold text-gray-900">Integrações</h1>
              <Badge className="ml-3">{connectedIntegrations} conectadas</Badge>
            </div>
            <div className="flex items-center space-x-4">
              <Button variant="outline" size="sm">
                <Download className="h-4 w-4 mr-2" />
                Exportar Logs
              </Button>
              <Button variant="outline" size="sm">
                <Settings className="h-4 w-4 mr-2" />
                Configurações
              </Button>
              <Button size="sm">
                <Plus className="h-4 w-4 mr-2" />
                Nova Integração
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Navigation Tabs */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex space-x-8">
            <button
              onClick={() => setActiveTab('integrations')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'integrations'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              <Link className="h-4 w-4 inline mr-2" />
              Integrações
            </button>
            <button
              onClick={() => setActiveTab('logs')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'logs'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              <FileText className="h-4 w-4 inline mr-2" />
              Logs de Sincronização
            </button>
            <button
              onClick={() => setActiveTab('settings')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'settings'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              <Settings className="h-4 w-4 inline mr-2" />
              Configurações Globais
            </button>
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeTab === 'integrations' && (
          <div className="space-y-6">
            {/* Overview Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center">
                    <Link className="h-8 w-8 text-blue-600" />
                    <div className="ml-4">
                      <p className="text-2xl font-bold text-gray-900">{mockIntegrations.length}</p>
                      <p className="text-gray-600">Total de Integrações</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center">
                    <CheckCircle className="h-8 w-8 text-green-600" />
                    <div className="ml-4">
                      <p className="text-2xl font-bold text-gray-900">{connectedIntegrations}</p>
                      <p className="text-gray-600">Conectadas</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center">
                    <RefreshCw className="h-8 w-8 text-purple-600" />
                    <div className="ml-4">
                      <p className="text-2xl font-bold text-gray-900">{totalSyncs}</p>
                      <p className="text-gray-600">Sincronizações Hoje</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center">
                    <Activity className="h-8 w-8 text-orange-600" />
                    <div className="ml-4">
                      <p className="text-2xl font-bold text-gray-900">{Math.round((successfulSyncs / totalSyncs) * 100)}%</p>
                      <p className="text-gray-600">Taxa de Sucesso</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Search and Filters */}
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <input
                  placeholder="Buscar integrações..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="max-w-sm h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                />
                </div>
              </div>
              <div className="flex gap-2">
                <select 
                  value={selectedCategory} 
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="all">Todas as Categorias</option>
                  <option value="job_boards">Portais de Emprego</option>
                  <option value="ats">Sistemas ATS</option>
                  <option value="communication">Comunicação</option>
                  <option value="analytics">Analytics</option>
                  <option value="hr_systems">Sistemas de RH</option>
                </select>
              </div>
            </div>

            {/* Integrations Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
              {filteredIntegrations.map((integration) => (
                <Card key={integration.id} className="hover:shadow-lg transition-shadow cursor-pointer" onClick={() => setSelectedIntegration(integration)}>
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div className="flex items-center space-x-3">
                        <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                          {getCategoryIcon(integration.category)}
                        </div>
                        <div>
                          <CardTitle className="text-lg">{integration.name}</CardTitle>
                          <CardDescription className="text-sm">{getCategoryName(integration.category)}</CardDescription>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        {getStatusIcon(integration.status)}
                        <Badge className={getStatusColor(integration.status)}>
                          {integration.status === 'connected' ? 'Conectado' :
                           integration.status === 'disconnected' ? 'Desconectado' :
                           integration.status === 'error' ? 'Erro' : 'Sincronizando'}
                        </Badge>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <p className="text-sm text-gray-600">{integration.description}</p>
                      
                      <div>
                        <p className="text-sm font-medium text-gray-700 mb-1">Recursos:</p>
                        <div className="flex flex-wrap gap-1">
                          {integration.features.slice(0, 2).map((feature, index) => (
                            <Badge key={index} variant="outline" className="text-xs">
                              {feature}
                            </Badge>
                          ))}
                          {integration.features.length > 2 && (
                            <Badge variant="outline" className="text-xs">
                              +{integration.features.length - 2} mais
                            </Badge>
                          )}
                        </div>
                      </div>
                      
                      {integration.status === 'connected' && integration.lastSync && (
                        <div className="flex items-center justify-between text-sm">
                          <div className="flex items-center text-gray-500">
                            <Clock className="h-4 w-4 mr-1" />
                            <span>Última sync: {new Date(integration.lastSync).toLocaleString('pt-BR')}</span>
                          </div>
                        </div>
                      )}
                      
                      {integration.metrics && (
                        <div className="grid grid-cols-3 gap-2 text-center">
                          <div>
                            <p className="text-lg font-bold text-blue-600">{integration.metrics.jobsImported}</p>
                            <p className="text-xs text-gray-500">Vagas</p>
                          </div>
                          <div>
                            <p className="text-lg font-bold text-green-600">{integration.metrics.candidatesImported}</p>
                            <p className="text-xs text-gray-500">Candidatos</p>
                          </div>
                          <div>
                            <p className="text-lg font-bold text-purple-600">{integration.metrics.applicationsExported}</p>
                            <p className="text-xs text-gray-500">Aplicações</p>
                          </div>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'logs' && (
          <div className="space-y-6">
            {/* Logs Overview */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center">
                    <CheckCircle className="h-8 w-8 text-green-600" />
                    <div className="ml-4">
                      <p className="text-2xl font-bold text-gray-900">{successfulSyncs}</p>
                      <p className="text-gray-600">Sucessos</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center">
                    <AlertCircle className="h-8 w-8 text-red-600" />
                    <div className="ml-4">
                      <p className="text-2xl font-bold text-gray-900">{errorSyncs}</p>
                      <p className="text-gray-600">Erros</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center">
                    <Database className="h-8 w-8 text-blue-600" />
                    <div className="ml-4">
                      <p className="text-2xl font-bold text-gray-900">{mockSyncLogs.reduce((acc, log) => acc + (log.recordsProcessed || 0), 0)}</p>
                      <p className="text-gray-600">Registros Processados</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Sync Logs */}
            <Card>
              <CardHeader>
                <CardTitle>Logs de Sincronização</CardTitle>
                <CardDescription>Histórico de sincronizações e operações</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {mockSyncLogs.map((log) => (
                    <div key={log.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div className="flex items-center space-x-4">
                        <div className={`w-3 h-3 rounded-full ${
                          log.status === 'success' ? 'bg-green-500' :
                          log.status === 'error' ? 'bg-red-500' : 'bg-yellow-500'
                        }`} />
                        <div>
                          <div className="flex items-center space-x-2">
                            <h4 className="font-medium text-gray-900">{log.integration}</h4>
                            <Badge variant="outline" className="text-xs">
                              {log.type === 'import' ? 'Importação' :
                               log.type === 'export' ? 'Exportação' : 'Sincronização'}
                            </Badge>
                            <Badge className={getSyncLogStatusColor(log.status)}>
                              {log.status === 'success' ? 'Sucesso' :
                               log.status === 'error' ? 'Erro' : 'Aviso'}
                            </Badge>
                          </div>
                          <p className="text-sm text-gray-600">{log.details}</p>
                          {log.recordsProcessed !== undefined && (
                            <p className="text-xs text-gray-500">{log.recordsProcessed} registros processados</p>
                          )}
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-sm text-gray-500">
                          {new Date(log.timestamp).toLocaleString('pt-BR')}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {activeTab === 'settings' && (
          <div className="space-y-6">
            {/* Global Settings */}
            <Card>
              <CardHeader>
                <CardTitle>Configurações Globais</CardTitle>
                <CardDescription>Configurações que se aplicam a todas as integrações</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Frequência de Sincronização Padrão
                    </label>
                    <select className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
                      <option>A cada hora</option>
                      <option>A cada 4 horas</option>
                      <option>Diário</option>
                      <option>Semanal</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Timeout de Conexão (segundos)
                    </label>
                    <input type="number" defaultValue="30" className="h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Máximo de Tentativas
                    </label>
                    <input type="number" defaultValue="3" className="h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Retenção de Logs (dias)
                    </label>
                    <input type="number" defaultValue="30" className="h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm" />
                  </div>
                </div>
                
                <div className="border-t pt-6">
                  <h3 className="text-lg font-medium text-gray-900 mb-4">Notificações</h3>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium text-gray-700">Notificar sobre erros de sincronização</p>
                        <p className="text-sm text-gray-500">Receba alertas quando uma sincronização falhar</p>
                      </div>
                      <input type="checkbox" defaultChecked className="h-4 w-4 text-blue-600 rounded" />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium text-gray-700">Relatório diário de sincronizações</p>
                        <p className="text-sm text-gray-500">Resumo diário das atividades de integração</p>
                      </div>
                      <input type="checkbox" defaultChecked className="h-4 w-4 text-blue-600 rounded" />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium text-gray-700">Alertas de quota de API</p>
                        <p className="text-sm text-gray-500">Aviso quando próximo do limite de requisições</p>
                      </div>
                      <input type="checkbox" className="h-4 w-4 text-blue-600 rounded" />
                    </div>
                  </div>
                </div>
                
                <div className="border-t pt-6">
                  <h3 className="text-lg font-medium text-gray-900 mb-4">Segurança</h3>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium text-gray-700">Criptografia de dados em trânsito</p>
                        <p className="text-sm text-gray-500">Usar HTTPS para todas as comunicações</p>
                      </div>
                      <input type="checkbox" defaultChecked disabled className="h-4 w-4 text-blue-600 rounded" />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium text-gray-700">Rotação automática de tokens</p>
                        <p className="text-sm text-gray-500">Renovar tokens de acesso automaticamente</p>
                      </div>
                      <input type="checkbox" defaultChecked className="h-4 w-4 text-blue-600 rounded" />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium text-gray-700">Log de auditoria</p>
                        <p className="text-sm text-gray-500">Registrar todas as ações de integração</p>
                      </div>
                      <input type="checkbox" defaultChecked className="h-4 w-4 text-blue-600 rounded" />
                    </div>
                  </div>
                </div>
                
                <div className="flex justify-end space-x-3 pt-6">
                  <Button variant="outline">Cancelar</Button>
                  <Button>Salvar Configurações</Button>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </main>

      {/* Integration Detail Modal */}
      {selectedIntegration && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50" onClick={() => setSelectedIntegration(null)}>
          <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            <div className="p-6">
              <div className="flex justify-between items-start mb-6">
                <div className="flex items-center space-x-4">
                  <div className="w-16 h-16 bg-blue-100 rounded-lg flex items-center justify-center">
                    {getCategoryIcon(selectedIntegration.category)}
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900">{selectedIntegration.name}</h2>
                    <p className="text-gray-600">{selectedIntegration.description}</p>
                    <div className="flex items-center space-x-3 mt-2">
                      <Badge className={getStatusColor(selectedIntegration.status)}>
                        {selectedIntegration.status === 'connected' ? 'Conectado' :
                         selectedIntegration.status === 'disconnected' ? 'Desconectado' :
                         selectedIntegration.status === 'error' ? 'Erro' : 'Sincronizando'}
                      </Badge>
                      <Badge variant="outline">{getCategoryName(selectedIntegration.category)}</Badge>
                    </div>
                  </div>
                </div>
                <Button variant="ghost" onClick={() => setSelectedIntegration(null)}>
                  ×
                </Button>
              </div>
              
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Main Content */}
                <div className="lg:col-span-2 space-y-6">
                  {/* Features */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center">
                        <Zap className="h-5 w-5 mr-2" />
                        Recursos Disponíveis
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {selectedIntegration.features.map((feature, index) => (
                          <div key={index} className="flex items-center space-x-2">
                            <CheckSquare className="h-4 w-4 text-green-600" />
                            <span className="text-sm">{feature}</span>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                  
                  {/* Data Types */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center">
                        <Database className="h-5 w-5 mr-2" />
                        Tipos de Dados
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="flex flex-wrap gap-2">
                        {selectedIntegration.dataTypes.map((type, index) => (
                          <Badge key={index} variant="outline">{type}</Badge>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                  
                  {/* Metrics */}
                  {selectedIntegration.metrics && (
                    <Card>
                      <CardHeader>
                        <CardTitle className="flex items-center">
                          <Activity className="h-5 w-5 mr-2" />
                          Métricas de Performance
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="grid grid-cols-3 gap-4">
                          <div className="text-center">
                            <p className="text-2xl font-bold text-blue-600">{selectedIntegration.metrics.jobsImported}</p>
                            <p className="text-sm text-gray-600">Vagas Importadas</p>
                          </div>
                          <div className="text-center">
                            <p className="text-2xl font-bold text-green-600">{selectedIntegration.metrics.candidatesImported}</p>
                            <p className="text-sm text-gray-600">Candidatos Importados</p>
                          </div>
                          <div className="text-center">
                            <p className="text-2xl font-bold text-purple-600">{selectedIntegration.metrics.applicationsExported}</p>
                            <p className="text-sm text-gray-600">Aplicações Exportadas</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  )}
                </div>

                {/* Sidebar */}
                <div className="space-y-4">
                  {/* Connection Status */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-sm">Status da Conexão</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <span className="text-sm">Status:</span>
                          <div className="flex items-center space-x-2">
                            {getStatusIcon(selectedIntegration.status)}
                            <span className="text-sm font-medium">
                              {selectedIntegration.status === 'connected' ? 'Conectado' :
                               selectedIntegration.status === 'disconnected' ? 'Desconectado' :
                               selectedIntegration.status === 'error' ? 'Erro' : 'Sincronizando'}
                            </span>
                          </div>
                        </div>
                        {selectedIntegration.lastSync && (
                          <div className="flex items-center justify-between">
                            <span className="text-sm">Última Sync:</span>
                            <span className="text-sm">
                              {new Date(selectedIntegration.lastSync).toLocaleString('pt-BR')}
                            </span>
                          </div>
                        )}
                        <div className="flex items-center justify-between">
                          <span className="text-sm">Frequência:</span>
                          <span className="text-sm">{selectedIntegration.syncFrequency}</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Actions */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-sm">Ações</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-2">
                      {selectedIntegration.status === 'connected' ? (
                        <>
                          <Button className="w-full" size="sm">
                            <RefreshCw className="h-4 w-4 mr-2" />
                            Sincronizar Agora
                          </Button>
                          <Button variant="outline" className="w-full" size="sm">
                            <Settings className="h-4 w-4 mr-2" />
                            Configurar
                          </Button>
                          <Button variant="outline" className="w-full" size="sm">
                            <Eye className="h-4 w-4 mr-2" />
                            Ver Logs
                          </Button>
                          <Button variant="destructive" className="w-full" size="sm">
                            <X className="h-4 w-4 mr-2" />
                            Desconectar
                          </Button>
                        </>
                      ) : (
                        <>
                          <Button className="w-full" size="sm">
                            <Link className="h-4 w-4 mr-2" />
                            Conectar
                          </Button>
                          <Button variant="outline" className="w-full" size="sm">
                            <Settings className="h-4 w-4 mr-2" />
                            Configurar
                          </Button>
                        </>
                      )}
                    </CardContent>
                  </Card>

                  {/* Help */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-sm">Ajuda</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-2">
                      <Button variant="ghost" className="w-full justify-start" size="sm">
                        <FileText className="h-4 w-4 mr-2" />
                        Documentação
                      </Button>
                      <Button variant="ghost" className="w-full justify-start" size="sm">
                        <ExternalLink className="h-4 w-4 mr-2" />
                        Suporte
                      </Button>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}