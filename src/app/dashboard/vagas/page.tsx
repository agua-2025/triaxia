'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { 
  Plus, 
  Search, 
  Filter, 
  MoreHorizontal, 
  Eye, 
  Edit, 
  Trash2, 
  Users, 
  Calendar, 
  MapPin, 
  DollarSign,
  Star,
  Clock,
  CheckCircle,
  AlertCircle,
  Pause
} from 'lucide-react'

interface Job {
  id: string
  title: string
  company: string
  location: string
  type: 'CLT' | 'PJ' | 'Freelance' | 'Estágio'
  salary: string
  status: 'Ativa' | 'Pausada' | 'Finalizada' | 'Rascunho'
  candidates: number
  matchRate: number
  createdAt: string
  description: string
  requirements: string[]
}

const mockJobs: Job[] = [
  {
    id: '1',
    title: 'Desenvolvedor Full Stack Senior',
    company: 'Tech Solutions',
    location: 'São Paulo, SP',
    type: 'CLT',
    salary: 'R$ 12.000 - R$ 18.000',
    status: 'Ativa',
    candidates: 45,
    matchRate: 92,
    createdAt: '2024-01-15',
    description: 'Buscamos um desenvolvedor full stack experiente para liderar projetos inovadores.',
    requirements: ['React', 'Node.js', 'TypeScript', 'PostgreSQL', '5+ anos experiência']
  },
  {
    id: '2',
    title: 'Designer UX/UI',
    company: 'Creative Agency',
    location: 'Rio de Janeiro, RJ',
    type: 'PJ',
    salary: 'R$ 8.000 - R$ 12.000',
    status: 'Ativa',
    candidates: 28,
    matchRate: 88,
    createdAt: '2024-01-12',
    description: 'Designer criativo para desenvolver interfaces incríveis.',
    requirements: ['Figma', 'Adobe Creative Suite', 'Prototipagem', 'Design System']
  },
  {
    id: '3',
    title: 'Analista de Dados',
    company: 'Data Corp',
    location: 'Belo Horizonte, MG',
    type: 'CLT',
    salary: 'R$ 7.000 - R$ 10.000',
    status: 'Pausada',
    candidates: 67,
    matchRate: 95,
    createdAt: '2024-01-08',
    description: 'Profissional para análise e interpretação de dados complexos.',
    requirements: ['Python', 'SQL', 'Power BI', 'Estatística', 'Machine Learning']
  },
  {
    id: '4',
    title: 'Gerente de Produto',
    company: 'Startup Inc',
    location: 'Remoto',
    type: 'CLT',
    salary: 'R$ 15.000 - R$ 22.000',
    status: 'Ativa',
    candidates: 23,
    matchRate: 89,
    createdAt: '2024-01-10',
    description: 'Liderar estratégia de produto e roadmap de desenvolvimento.',
    requirements: ['Product Management', 'Agile', 'Analytics', 'Liderança']
  }
]

export default function VagasPage() {
  const [jobs, setJobs] = useState<Job[]>(mockJobs)
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState<string>('all')
  const [selectedJob, setSelectedJob] = useState<Job | null>(null)

  const filteredJobs = jobs.filter(job => {
    const matchesSearch = job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         job.company.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === 'all' || job.status === statusFilter
    return matchesSearch && matchesStatus
  })

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Ativa': return 'bg-green-100 text-green-800'
      case 'Pausada': return 'bg-yellow-100 text-yellow-800'
      case 'Finalizada': return 'bg-gray-100 text-gray-800'
      case 'Rascunho': return 'bg-blue-100 text-blue-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Ativa': return <CheckCircle className="h-4 w-4" />
      case 'Pausada': return <Pause className="h-4 w-4" />
      case 'Finalizada': return <Clock className="h-4 w-4" />
      case 'Rascunho': return <Edit className="h-4 w-4" />
      default: return <AlertCircle className="h-4 w-4" />
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold text-gray-900">Gerenciar Vagas</h1>
              <Badge className="ml-3">{filteredJobs.length} vagas</Badge>
            </div>
            <div className="flex items-center space-x-4">
              <Button variant="outline" size="sm">
                <Filter className="h-4 w-4 mr-2" />
                Filtros
              </Button>
              <Button size="sm">
                <Plus className="h-4 w-4 mr-2" />
                Nova Vaga
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search and Filters */}
        <div className="mb-6 flex flex-col sm:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Buscar vagas por título ou empresa..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>
          <div className="flex gap-2">
            <select 
              value={statusFilter} 
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">Todos os Status</option>
              <option value="Ativa">Ativa</option>
              <option value="Pausada">Pausada</option>
              <option value="Finalizada">Finalizada</option>
              <option value="Rascunho">Rascunho</option>
            </select>
          </div>
        </div>

        {/* Jobs Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {filteredJobs.map((job) => (
            <Card key={job.id} className="hover:shadow-lg transition-shadow cursor-pointer" onClick={() => setSelectedJob(job)}>
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <CardTitle className="text-lg mb-1">{job.title}</CardTitle>
                    <CardDescription className="text-sm text-gray-600">{job.company}</CardDescription>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Button variant="ghost" size="sm" onClick={(e) => { e.stopPropagation(); }}>
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                <div className="flex items-center justify-between mt-3">
                  <Badge className={`${getStatusColor(job.status)} flex items-center gap-1`}>
                    {getStatusIcon(job.status)}
                    {job.status}
                  </Badge>
                  <Badge variant="outline">{job.type}</Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center text-sm text-gray-600">
                    <MapPin className="h-4 w-4 mr-2" />
                    {job.location}
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <DollarSign className="h-4 w-4 mr-2" />
                    {job.salary}
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center text-gray-600">
                      <Users className="h-4 w-4 mr-1" />
                      {job.candidates} candidatos
                    </div>
                    <div className="flex items-center text-green-600">
                      <Star className="h-4 w-4 mr-1 fill-current" />
                      {job.matchRate}% match
                    </div>
                  </div>
                  <div className="flex items-center text-xs text-gray-500">
                    <Calendar className="h-3 w-3 mr-1" />
                    Criada em {new Date(job.createdAt).toLocaleDateString('pt-BR')}
                  </div>
                </div>
                <div className="mt-4 pt-4 border-t border-gray-100">
                  <div className="flex gap-2">
                    <Button size="sm" variant="outline" className="flex-1" onClick={(e) => { e.stopPropagation(); }}>
                      <Eye className="h-4 w-4 mr-1" />
                      Ver
                    </Button>
                    <Button size="sm" variant="outline" className="flex-1" onClick={(e) => { e.stopPropagation(); }}>
                      <Edit className="h-4 w-4 mr-1" />
                      Editar
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Empty State */}
        {filteredJobs.length === 0 && (
          <div className="text-center py-12">
            <div className="mx-auto h-24 w-24 text-gray-400">
              <Search className="h-full w-full" />
            </div>
            <h3 className="mt-4 text-lg font-medium text-gray-900">Nenhuma vaga encontrada</h3>
            <p className="mt-2 text-gray-500">
              {searchTerm || statusFilter !== 'all' 
                ? 'Tente ajustar os filtros de busca.' 
                : 'Comece criando sua primeira vaga.'}
            </p>
            <Button className="mt-4">
              <Plus className="h-4 w-4 mr-2" />
              Criar Nova Vaga
            </Button>
          </div>
        )}
      </main>

      {/* Job Detail Modal */}
      {selectedJob && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50" onClick={() => setSelectedJob(null)}>
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">{selectedJob.title}</h2>
                  <p className="text-gray-600">{selectedJob.company}</p>
                </div>
                <Button variant="ghost" onClick={() => setSelectedJob(null)}>
                  ×
                </Button>
              </div>
              
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="flex items-center">
                  <MapPin className="h-4 w-4 mr-2 text-gray-500" />
                  <span className="text-sm">{selectedJob.location}</span>
                </div>
                <div className="flex items-center">
                  <DollarSign className="h-4 w-4 mr-2 text-gray-500" />
                  <span className="text-sm">{selectedJob.salary}</span>
                </div>
                <div className="flex items-center">
                  <Users className="h-4 w-4 mr-2 text-gray-500" />
                  <span className="text-sm">{selectedJob.candidates} candidatos</span>
                </div>
                <div className="flex items-center">
                  <Star className="h-4 w-4 mr-2 text-yellow-500 fill-current" />
                  <span className="text-sm">{selectedJob.matchRate}% match rate</span>
                </div>
              </div>

              <div className="mb-6">
                <h3 className="font-semibold mb-2">Descrição</h3>
                <p className="text-gray-700">{selectedJob.description}</p>
              </div>

              <div className="mb-6">
                <h3 className="font-semibold mb-2">Requisitos</h3>
                <div className="flex flex-wrap gap-2">
                  {selectedJob.requirements.map((req, index) => (
                    <Badge key={index} variant="outline">{req}</Badge>
                  ))}
                </div>
              </div>

              <div className="flex gap-3">
                <Button className="flex-1">
                  <Edit className="h-4 w-4 mr-2" />
                  Editar Vaga
                </Button>
                <Button variant="outline" className="flex-1">
                  <Users className="h-4 w-4 mr-2" />
                  Ver Candidatos
                </Button>
                <Button variant="outline">
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}