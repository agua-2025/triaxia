'use client'

import { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'
import Link from 'next/link'
import {
  Plus,
  Search,
  Filter,
  MoreVertical,
  MoreHorizontal,
  Edit,
  Trash2,
  Eye,
  Users,
  Calendar,
  MapPin,
  DollarSign,
  Briefcase,
  Clock,
  CheckCircle,
  XCircle,
  AlertCircle
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

interface Job {
  id: string
  title: string
  department: string
  location: string
  type: 'CLT' | 'PJ' | 'Freelance' | 'Estágio'
  salary: string
  status: 'Ativa' | 'Pausada' | 'Fechada' | 'Rascunho'
  applicants: number
  matches: number
  createdAt: string
  updatedAt: string
  description: string
  requirements: string[]
  benefits: string[]
}

// Função para buscar dados reais da API
  const fetchJobs = async (tenantSlug: string): Promise<Job[]> => {
    try {
      const response = await fetch(`/api/${tenantSlug}/jobs`)
      if (!response.ok) {
        throw new Error('Falha ao carregar vagas')
      }
      const data = await response.json()
      return data.jobs || []
    } catch (error) {
      console.error('Erro ao buscar vagas:', error)
      return []
    }
  }

const getStatusBadge = (status: Job['status']) => {
  const variants = {
    'Ativa': 'bg-green-100 text-green-800',
    'Pausada': 'bg-yellow-100 text-yellow-800',
    'Fechada': 'bg-red-100 text-red-800',
    'Rascunho': 'bg-gray-100 text-gray-800'
  }
  
  const icons = {
    'Ativa': <CheckCircle className="w-3 h-3" />,
    'Pausada': <AlertCircle className="w-3 h-3" />,
    'Fechada': <XCircle className="w-3 h-3" />,
    'Rascunho': <Clock className="w-3 h-3" />
  }
  
  return (
    <Badge className={`${variants[status]} flex items-center gap-1`}>
      {icons[status]}
      {status}
    </Badge>
  )
}

const getTypeBadge = (type: Job['type']) => {
  const colors = {
    'CLT': 'bg-blue-100 text-blue-800',
    'PJ': 'bg-purple-100 text-purple-800',
    'Freelance': 'bg-orange-100 text-orange-800',
    'Estágio': 'bg-green-100 text-green-800'
  }
  
  return (
    <Badge className={colors[type]}>
      {type}
    </Badge>
  )
}

export default function VagasPage() {
  const params = useParams()
  const tenantSlug = Array.isArray(params?.tenant) ? params.tenant[0] : (params?.tenant as string) || ''
  
  const [jobs, setJobs] = useState<Job[]>([])
  const [filteredJobs, setFilteredJobs] = useState<Job[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState<string>('all')
  const [typeFilter, setTypeFilter] = useState<string>('all')
  const [departmentFilter, setDepartmentFilter] = useState<string>('all')
  
  // Filtros únicos
  const departments = Array.from(new Set(jobs.map(job => job.department)))
  const types = Array.from(new Set(jobs.map(job => job.type)))
  const statuses = Array.from(new Set(jobs.map(job => job.status)))
  
  // Carregar dados da API
  useEffect(() => {
    const loadJobs = async () => {
      if (!tenantSlug) return
      
      setLoading(true)
      setError(null)
      
      try {
        const jobsData = await fetchJobs(tenantSlug)
        setJobs(jobsData)
        setFilteredJobs(jobsData)
      } catch (err) {
        setError('Erro ao carregar vagas')
      } finally {
        setLoading(false)
      }
    }
    
    loadJobs()
  }, [tenantSlug])
  
  useEffect(() => {
    let filtered = jobs
    
    // Filtro por busca
    if (searchTerm) {
      filtered = filtered.filter(job => 
        job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        job.department.toLowerCase().includes(searchTerm.toLowerCase()) ||
        job.location.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }
    
    // Filtro por status
    if (statusFilter !== 'all') {
      filtered = filtered.filter(job => job.status === statusFilter)
    }
    
    // Filtro por tipo
    if (typeFilter !== 'all') {
      filtered = filtered.filter(job => job.type === typeFilter)
    }
    
    // Filtro por departamento
    if (departmentFilter !== 'all') {
      filtered = filtered.filter(job => job.department === departmentFilter)
    }
    
    setFilteredJobs(filtered)
  }, [jobs, searchTerm, statusFilter, typeFilter, departmentFilter])
  
  const handleDeleteJob = (jobId: string) => {
    setJobs(jobs.filter(job => job.id !== jobId))
  }
  
  const handleStatusChange = (jobId: string, newStatus: Job['status']) => {
    setJobs(jobs.map(job => 
      job.id === jobId 
        ? { ...job, status: newStatus, updatedAt: new Date().toISOString().split('T')[0] }
        : job
    ))
  }
  
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
  
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Carregando vagas...</p>
        </div>
      </div>
    )
  }
  
  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Erro</h1>
          <p className="text-gray-600 mb-4">{error}</p>
          <Button onClick={() => window.location.reload()}>Tentar Novamente</Button>
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
              <h1 className="text-3xl font-bold text-gray-900">Gerenciamento de Vagas</h1>
              <p className="text-gray-600 mt-2">
                Gerencie todas as vagas da sua empresa em um só lugar
              </p>
            </div>
            <div className="flex items-center gap-4">
              <Link href={`/${tenantSlug}/dashboard`}>
                <Button variant="outline">
                  Voltar ao Dashboard
                </Button>
              </Link>
              <Link href={`/${tenantSlug}/dashboard/vagas/nova`}>
                <Button className="flex items-center gap-2">
                  <Plus className="w-4 h-4" />
                  Nova Vaga
                </Button>
              </Link>
            </div>
          </div>
        </div>
        
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total de Vagas</p>
                  <p className="text-2xl font-bold text-gray-900">{jobs.length}</p>
                </div>
                <div className="p-3 bg-blue-100 rounded-lg">
                  <Briefcase className="w-6 h-6 text-blue-600" />
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Vagas Ativas</p>
                  <p className="text-2xl font-bold text-green-600">
                    {jobs.filter(job => job.status === 'Ativa').length}
                  </p>
                </div>
                <div className="p-3 bg-green-100 rounded-lg">
                  <CheckCircle className="w-6 h-6 text-green-600" />
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Candidatos</p>
                  <p className="text-2xl font-bold text-purple-600">
                    {jobs.reduce((sum, job) => sum + job.applicants, 0)}
                  </p>
                </div>
                <div className="p-3 bg-purple-100 rounded-lg">
                  <Users className="w-6 h-6 text-purple-600" />
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Matches Gerados</p>
                  <p className="text-2xl font-bold text-orange-600">
                    {jobs.reduce((sum, job) => sum + job.matches, 0)}
                  </p>
                </div>
                <div className="p-3 bg-orange-100 rounded-lg">
                  <Users className="w-6 h-6 text-orange-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        
        {/* Filters */}
        <Card className="mb-6">
          <CardContent className="p-6">
            <div className="flex flex-col lg:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <Input
                    placeholder="Buscar vagas por título, departamento ou localização..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              
              <div className="flex gap-4">
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="w-40">
                    <SelectValue placeholder="Todos os Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Todos os Status</SelectItem>
                    {statuses.map(status => (
                      <SelectItem key={status} value={status}>{status}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                
                <Select value={typeFilter} onValueChange={setTypeFilter}>
                  <SelectTrigger className="w-40">
                    <SelectValue placeholder="Todos os Tipos" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Todos os Tipos</SelectItem>
                    {types.map(type => (
                      <SelectItem key={type} value={type}>{type}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                
                <Select value={departmentFilter} onValueChange={setDepartmentFilter}>
                  <SelectTrigger className="w-40">
                    <SelectValue placeholder="Todos os Departamentos" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Todos os Departamentos</SelectItem>
                    {departments.map(dept => (
                       <SelectItem key={dept} value={dept}>{dept}</SelectItem>
                     ))}
                   </SelectContent>
                 </Select>
              </div>
            </div>
          </CardContent>
        </Card>
        
        {/* Jobs List */}
        <div className="space-y-4">
          {filteredJobs.length === 0 ? (
            <Card>
              <CardContent className="p-12 text-center">
                <Briefcase className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  Nenhuma vaga encontrada
                </h3>
                <p className="text-gray-600 mb-6">
                  {searchTerm || statusFilter !== 'all' || typeFilter !== 'all' || departmentFilter !== 'all'
                    ? 'Tente ajustar os filtros para encontrar vagas.'
                    : 'Comece criando sua primeira vaga.'}
                </p>
                <Button>
                  <Plus className="w-4 h-4 mr-2" />
                  Criar Nova Vaga
                </Button>
              </CardContent>
            </Card>
          ) : (
            filteredJobs.map((job) => (
              <Card key={job.id} className="hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-start gap-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <h3 className="text-xl font-semibold text-gray-900">
                              {job.title}
                            </h3>
                            {getStatusBadge(job.status)}
                            {getTypeBadge(job.type)}
                          </div>
                          
                          <div className="flex items-center gap-6 text-sm text-gray-600 mb-3">
                            <div className="flex items-center gap-1">
                              <Briefcase className="w-4 h-4" />
                              {job.department}
                            </div>
                            <div className="flex items-center gap-1">
                              <MapPin className="w-4 h-4" />
                              {job.location}
                            </div>
                            <div className="flex items-center gap-1">
                              <DollarSign className="w-4 h-4" />
                              {job.salary}
                            </div>
                            <div className="flex items-center gap-1">
                              <Calendar className="w-4 h-4" />
                              Criada em {new Date(job.createdAt).toLocaleDateString('pt-BR')}
                            </div>
                          </div>
                          
                          <p className="text-gray-700 mb-4 line-clamp-2">
                            {job.description}
                          </p>
                          
                          <div className="flex items-center gap-6">
                            <div className="flex items-center gap-2">
                              <Users className="w-4 h-4 text-blue-500" />
                              <span className="text-sm font-medium text-gray-900">
                                {job.applicants}
                              </span>
                              <span className="text-sm text-gray-600">candidatos</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <CheckCircle className="w-4 h-4 text-green-500" />
                              <span className="text-sm font-medium text-gray-900">
                                {job.matches}
                              </span>
                              <span className="text-sm text-gray-600">matches</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <Button variant="outline" size="sm">
                        <Eye className="w-4 h-4" />
                      </Button>
                      <Button variant="outline" size="sm">
                        <Edit className="w-4 h-4" />
                      </Button>
                      
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="outline" size="sm">
                            <MoreHorizontal className="w-4 h-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          {job.status === 'Ativa' && (
                            <DropdownMenuItem onClick={() => handleStatusChange(job.id, 'Pausada')}>
                              <AlertCircle className="w-4 h-4 mr-2" />
                              Pausar
                            </DropdownMenuItem>
                          )}
                          {job.status === 'Pausada' && (
                            <DropdownMenuItem onClick={() => handleStatusChange(job.id, 'Ativa')}>
                              <CheckCircle className="w-4 h-4 mr-2" />
                              Ativar
                            </DropdownMenuItem>
                          )}
                          {job.status !== 'Fechada' && (
                            <DropdownMenuItem onClick={() => handleStatusChange(job.id, 'Fechada')}>
                              <XCircle className="w-4 h-4 mr-2" />
                              Fechar
                            </DropdownMenuItem>
                          )}
                          <DropdownMenuItem 
                            onClick={() => handleDeleteJob(job.id)}
                            className="text-red-600"
                          >
                            <Trash2 className="w-4 h-4 mr-2" />
                            Excluir
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>
      </div>
    </div>
  )
}