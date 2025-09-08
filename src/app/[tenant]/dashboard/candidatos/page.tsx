'use client'

import { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'
import Link from 'next/link'
import {
  Search,
  Filter,
  MoreVertical,
  Eye,
  MessageCircle,
  Star,
  Download,
  Users,
  Calendar,
  MapPin,
  Briefcase,
  Mail,
  Phone,
  GraduationCap,
  Award,
  Clock,
  CheckCircle,
  XCircle,
  AlertCircle,
  Heart
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
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

interface Candidate {
  id: string
  name: string
  email: string
  phone: string
  location: string
  position: string
  experience: string
  education: string
  skills: string[]
  salary: string
  availability: string
  status: 'Novo' | 'Em Análise' | 'Entrevista' | 'Aprovado' | 'Rejeitado'
  appliedJobs: string[]
  matchScore: number
  appliedAt: string
  lastActivity: string
  photo?: string
  resume?: string
  notes?: string
}

const mockCandidates: Candidate[] = [
  {
    id: '1',
    name: 'João Silva',
    email: 'joao.silva@email.com',
    phone: '+55 11 99999-9999',
    location: 'São Paulo, SP',
    position: 'Desenvolvedor Full Stack',
    experience: '8 anos',
    education: 'Bacharelado em Ciência da Computação',
    skills: ['React', 'Node.js', 'TypeScript', 'PostgreSQL', 'AWS', 'Docker'],
    salary: 'R$ 12.000 - R$ 15.000',
    availability: 'Imediata',
    status: 'Em Análise',
    appliedJobs: ['Desenvolvedor Full Stack Senior', 'Tech Lead'],
    matchScore: 95,
    appliedAt: '2024-01-20',
    lastActivity: '2024-01-22',
    photo: '',
    resume: 'joao-silva-cv.pdf'
  },
  {
    id: '2',
    name: 'Maria Santos',
    email: 'maria.santos@email.com',
    phone: '+55 21 88888-8888',
    location: 'Rio de Janeiro, RJ',
    position: 'Designer UX/UI',
    experience: '5 anos',
    education: 'Bacharelado em Design',
    skills: ['Figma', 'Adobe Creative Suite', 'Prototipagem', 'Design System', 'User Research'],
    salary: 'R$ 8.000 - R$ 12.000',
    availability: '30 dias',
    status: 'Entrevista',
    appliedJobs: ['Designer UX/UI', 'Product Designer'],
    matchScore: 88,
    appliedAt: '2024-01-18',
    lastActivity: '2024-01-21',
    photo: '',
    resume: 'maria-santos-cv.pdf'
  },
  {
    id: '3',
    name: 'Carlos Oliveira',
    email: 'carlos.oliveira@email.com',
    phone: '+55 11 77777-7777',
    location: 'São Paulo, SP',
    position: 'Analista de Dados',
    experience: '6 anos',
    education: 'Mestrado em Estatística',
    skills: ['Python', 'SQL', 'Power BI', 'Machine Learning', 'Excel Avançado'],
    salary: 'R$ 9.000 - R$ 13.000',
    availability: '15 dias',
    status: 'Aprovado',
    appliedJobs: ['Analista de Dados Senior'],
    matchScore: 92,
    appliedAt: '2024-01-15',
    lastActivity: '2024-01-20',
    photo: '',
    resume: 'carlos-oliveira-cv.pdf'
  },
  {
    id: '4',
    name: 'Ana Costa',
    email: 'ana.costa@email.com',
    phone: '+55 11 66666-6666',
    location: 'São Paulo, SP',
    position: 'Gerente de Marketing',
    experience: '10 anos',
    education: 'MBA em Marketing Digital',
    skills: ['Google Ads', 'Facebook Ads', 'Analytics', 'SEO', 'Growth Hacking'],
    salary: 'R$ 15.000 - R$ 20.000',
    availability: '45 dias',
    status: 'Novo',
    appliedJobs: ['Gerente de Marketing Digital'],
    matchScore: 85,
    appliedAt: '2024-01-22',
    lastActivity: '2024-01-22',
    photo: '',
    resume: 'ana-costa-cv.pdf'
  },
  {
    id: '5',
    name: 'Pedro Almeida',
    email: 'pedro.almeida@email.com',
    phone: '+55 11 55555-5555',
    location: 'São Paulo, SP',
    position: 'Desenvolvedor Frontend',
    experience: '3 anos',
    education: 'Tecnólogo em Sistemas para Internet',
    skills: ['React', 'Vue.js', 'JavaScript', 'CSS', 'HTML'],
    salary: 'R$ 6.000 - R$ 9.000',
    availability: 'Imediata',
    status: 'Rejeitado',
    appliedJobs: ['Desenvolvedor Frontend Pleno'],
    matchScore: 72,
    appliedAt: '2024-01-12',
    lastActivity: '2024-01-18',
    photo: '',
    resume: 'pedro-almeida-cv.pdf'
  }
]

const getStatusBadge = (status: Candidate['status']) => {
  const variants = {
    'Novo': 'bg-blue-100 text-blue-800',
    'Em Análise': 'bg-yellow-100 text-yellow-800',
    'Entrevista': 'bg-purple-100 text-purple-800',
    'Aprovado': 'bg-green-100 text-green-800',
    'Rejeitado': 'bg-red-100 text-red-800'
  }
  
  const icons = {
    'Novo': <Clock className="w-3 h-3" />,
    'Em Análise': <AlertCircle className="w-3 h-3" />,
    'Entrevista': <MessageCircle className="w-3 h-3" />,
    'Aprovado': <CheckCircle className="w-3 h-3" />,
    'Rejeitado': <XCircle className="w-3 h-3" />
  }
  
  return (
    <Badge className={`${variants[status]} flex items-center gap-1`}>
      {icons[status]}
      {status}
    </Badge>
  )
}

const getMatchScoreColor = (score: number) => {
  if (score >= 90) return 'text-green-600 bg-green-100'
  if (score >= 80) return 'text-yellow-600 bg-yellow-100'
  if (score >= 70) return 'text-orange-600 bg-orange-100'
  return 'text-red-600 bg-red-100'
}

export default function CandidatosPage() {
  const params = useParams()
  const tenantSlug = Array.isArray(params?.tenant) ? params.tenant[0] : (params?.tenant as string) || ''
  
  const [candidates, setCandidates] = useState<Candidate[]>(mockCandidates)
  const [filteredCandidates, setFilteredCandidates] = useState<Candidate[]>(mockCandidates)
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState<string>('all')
  const [positionFilter, setPositionFilter] = useState<string>('all')
  const [locationFilter, setLocationFilter] = useState<string>('all')
  const [sortBy, setSortBy] = useState<string>('recent')
  
  // Filtros únicos
  const positions = Array.from(new Set(candidates.map(candidate => candidate.position)))
  const locations = Array.from(new Set(candidates.map(candidate => candidate.location)))
  const statuses = Array.from(new Set(candidates.map(candidate => candidate.status)))
  
  useEffect(() => {
    let filtered = candidates
    
    // Filtro por busca
    if (searchTerm) {
      filtered = filtered.filter(candidate => 
        candidate.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        candidate.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        candidate.position.toLowerCase().includes(searchTerm.toLowerCase()) ||
        candidate.skills.some(skill => skill.toLowerCase().includes(searchTerm.toLowerCase()))
      )
    }
    
    // Filtro por status
    if (statusFilter !== 'all') {
      filtered = filtered.filter(candidate => candidate.status === statusFilter)
    }
    
    // Filtro por posição
    if (positionFilter !== 'all') {
      filtered = filtered.filter(candidate => candidate.position === positionFilter)
    }
    
    // Filtro por localização
    if (locationFilter !== 'all') {
      filtered = filtered.filter(candidate => candidate.location === locationFilter)
    }
    
    // Ordenação
    switch (sortBy) {
      case 'recent':
        filtered.sort((a, b) => new Date(b.appliedAt).getTime() - new Date(a.appliedAt).getTime())
        break
      case 'match':
        filtered.sort((a, b) => b.matchScore - a.matchScore)
        break
      case 'name':
        filtered.sort((a, b) => a.name.localeCompare(b.name))
        break
    }
    
    setFilteredCandidates(filtered)
  }, [candidates, searchTerm, statusFilter, positionFilter, locationFilter, sortBy])
  
  const handleStatusChange = (candidateId: string, newStatus: Candidate['status']) => {
    setCandidates(candidates.map(candidate => 
      candidate.id === candidateId 
        ? { ...candidate, status: newStatus, lastActivity: new Date().toISOString().split('T')[0] }
        : candidate
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
  
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Candidatos</h1>
              <p className="text-gray-600 mt-2">
                Gerencie todos os candidatos que se aplicaram às suas vagas
              </p>
            </div>
            <div className="flex items-center gap-4">
              <Link href={`/${tenantSlug}/dashboard`}>
                <Button variant="outline">
                  Voltar ao Dashboard
                </Button>
              </Link>
            </div>
          </div>
        </div>
        
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total</p>
                  <p className="text-2xl font-bold text-gray-900">{candidates.length}</p>
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
                  <p className="text-sm font-medium text-gray-600">Novos</p>
                  <p className="text-2xl font-bold text-blue-600">
                    {candidates.filter(c => c.status === 'Novo').length}
                  </p>
                </div>
                <div className="p-3 bg-blue-100 rounded-lg">
                  <Clock className="w-6 h-6 text-blue-600" />
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Em Análise</p>
                  <p className="text-2xl font-bold text-yellow-600">
                    {candidates.filter(c => c.status === 'Em Análise').length}
                  </p>
                </div>
                <div className="p-3 bg-yellow-100 rounded-lg">
                  <AlertCircle className="w-6 h-6 text-yellow-600" />
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Entrevistas</p>
                  <p className="text-2xl font-bold text-purple-600">
                    {candidates.filter(c => c.status === 'Entrevista').length}
                  </p>
                </div>
                <div className="p-3 bg-purple-100 rounded-lg">
                  <MessageCircle className="w-6 h-6 text-purple-600" />
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Aprovados</p>
                  <p className="text-2xl font-bold text-green-600">
                    {candidates.filter(c => c.status === 'Aprovado').length}
                  </p>
                </div>
                <div className="p-3 bg-green-100 rounded-lg">
                  <CheckCircle className="w-6 h-6 text-green-600" />
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
                    placeholder="Buscar candidatos por nome, email, posição ou skills..."
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
                
                <Select value={positionFilter} onValueChange={setPositionFilter}>
                  <SelectTrigger className="w-40">
                    <SelectValue placeholder="Todas as Posições" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Todas as Posições</SelectItem>
                    {positions.map(position => (
                      <SelectItem key={position} value={position}>{position}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                
                <Select value={locationFilter} onValueChange={setLocationFilter}>
                  <SelectTrigger className="w-40">
                    <SelectValue placeholder="Todas as Localizações" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Todas as Localizações</SelectItem>
                    {locations.map(location => (
                      <SelectItem key={location} value={location}>{location}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="w-40">
                    <SelectValue placeholder="Mais Recentes" />
                  </SelectTrigger>
                  <SelectContent>
                     <SelectItem value="recent">Mais Recentes</SelectItem>
                     <SelectItem value="match">Melhor Match</SelectItem>
                     <SelectItem value="name">Nome A-Z</SelectItem>
                   </SelectContent>
                 </Select>
              </div>
            </div>
          </CardContent>
        </Card>
        
        {/* Candidates List */}
        <div className="space-y-4">
          {filteredCandidates.length === 0 ? (
            <Card>
              <CardContent className="p-12 text-center">
                <Users className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  Nenhum candidato encontrado
                </h3>
                <p className="text-gray-600">
                  {searchTerm || statusFilter !== 'all' || positionFilter !== 'all' || locationFilter !== 'all'
                    ? 'Tente ajustar os filtros para encontrar candidatos.'
                    : 'Aguarde candidatos se aplicarem às suas vagas.'}
                </p>
              </CardContent>
            </Card>
          ) : (
            filteredCandidates.map((candidate) => (
              <Card key={candidate.id} className="hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-4 flex-1">
                      <Avatar>
                        <AvatarImage src={candidate.photo} alt={candidate.name} />
                        <AvatarFallback>
                          {candidate.name.split(' ').map(n => n[0]).join('').toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                      
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="text-xl font-semibold text-gray-900">
                            {candidate.name}
                          </h3>
                          {getStatusBadge(candidate.status)}
                          <div className={`px-2 py-1 rounded-full text-xs font-medium ${getMatchScoreColor(candidate.matchScore)}`}>
                            {candidate.matchScore}% match
                          </div>
                        </div>
                        
                        <div className="flex items-center gap-6 text-sm text-gray-600 mb-3">
                          <div className="flex items-center gap-1">
                            <Briefcase className="w-4 h-4" />
                            {candidate.position}
                          </div>
                          <div className="flex items-center gap-1">
                            <MapPin className="w-4 h-4" />
                            {candidate.location}
                          </div>
                          <div className="flex items-center gap-1">
                            <GraduationCap className="w-4 h-4" />
                            {candidate.experience} de experiência
                          </div>
                          <div className="flex items-center gap-1">
                            <Calendar className="w-4 h-4" />
                            Aplicou em {new Date(candidate.appliedAt).toLocaleDateString('pt-BR')}
                          </div>
                        </div>
                        
                        <div className="flex items-center gap-6 text-sm text-gray-600 mb-3">
                          <div className="flex items-center gap-1">
                            <Mail className="w-4 h-4" />
                            {candidate.email}
                          </div>
                          <div className="flex items-center gap-1">
                            <Phone className="w-4 h-4" />
                            {candidate.phone}
                          </div>
                        </div>
                        
                        <div className="mb-3">
                          <p className="text-sm text-gray-600 mb-2">Vagas aplicadas:</p>
                          <div className="flex flex-wrap gap-2">
                            {candidate.appliedJobs.map((job, index) => (
                              <Badge key={index} variant="outline" className="text-xs">
                                {job}
                              </Badge>
                            ))}
                          </div>
                        </div>
                        
                        <div className="mb-4">
                          <p className="text-sm text-gray-600 mb-2">Skills principais:</p>
                          <div className="flex flex-wrap gap-2">
                            {candidate.skills.slice(0, 6).map((skill, index) => (
                              <Badge key={index} variant="secondary" className="text-xs">
                                {skill}
                              </Badge>
                            ))}
                            {candidate.skills.length > 6 && (
                              <Badge variant="outline" className="text-xs">
                                +{candidate.skills.length - 6} mais
                              </Badge>
                            )}
                          </div>
                        </div>
                        
                        <div className="flex items-center gap-6 text-sm">
                          <div>
                            <span className="text-gray-600">Pretensão salarial: </span>
                            <span className="font-medium text-gray-900">{candidate.salary}</span>
                          </div>
                          <div>
                            <span className="text-gray-600">Disponibilidade: </span>
                            <span className="font-medium text-gray-900">{candidate.availability}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <Button variant="outline" size="sm">
                        <Eye className="w-4 h-4" />
                      </Button>
                      <Button variant="outline" size="sm">
                        <MessageCircle className="w-4 h-4" />
                      </Button>
                      <Button variant="outline" size="sm">
                        <Download className="w-4 h-4" />
                      </Button>
                      <Button variant="outline" size="sm">
                        <Heart className="w-4 h-4" />
                      </Button>
                      
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="outline" size="sm">
                            <MoreVertical className="w-4 h-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem onClick={() => handleStatusChange(candidate.id, 'Em Análise')}>
                            <AlertCircle className="w-4 h-4 mr-2" />
                            Marcar como Em Análise
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleStatusChange(candidate.id, 'Entrevista')}>
                            <MessageCircle className="w-4 h-4 mr-2" />
                            Agendar Entrevista
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleStatusChange(candidate.id, 'Aprovado')}>
                            <CheckCircle className="w-4 h-4 mr-2" />
                            Aprovar Candidato
                          </DropdownMenuItem>
                          <DropdownMenuItem 
                            onClick={() => handleStatusChange(candidate.id, 'Rejeitado')}
                            className="text-red-600"
                          >
                            <XCircle className="w-4 h-4 mr-2" />
                            Rejeitar Candidato
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