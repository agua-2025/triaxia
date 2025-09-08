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
  Heart,
  Zap,
  Target,
  TrendingUp,
  Brain,
  Sparkles,
  ArrowRight,
  ThumbsUp,
  ThumbsDown,
  Send
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
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from '@/components/ui/avatar'
import { Progress } from '@/components/ui/progress'
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui/tabs'

interface Match {
  id: string
  candidate: {
    id: string
    name: string
    email: string
    phone: string
    location: string
    position: string
    experience: string
    skills: string[]
    photo?: string
    resume?: string
  }
  job: {
    id: string
    title: string
    department: string
    location: string
    type: string
    requiredSkills: string[]
    experience: string
    salary: string
  }
  matchScore: number
  skillsMatch: number
  experienceMatch: number
  locationMatch: number
  salaryMatch: number
  aiInsights: string[]
  status: 'Novo' | 'Visualizado' | 'Interessado' | 'Rejeitado' | 'Contatado'
  createdAt: string
  lastActivity: string
}

const mockMatches: Match[] = [
  {
    id: '1',
    candidate: {
      id: '1',
      name: 'João Silva',
      email: 'joao.silva@email.com',
      phone: '+55 11 99999-9999',
      location: 'São Paulo, SP',
      position: 'Desenvolvedor Full Stack',
      experience: '8 anos',
      skills: ['React', 'Node.js', 'TypeScript', 'PostgreSQL', 'AWS', 'Docker'],
      photo: '',
      resume: 'joao-silva-cv.pdf'
    },
    job: {
      id: '1',
      title: 'Desenvolvedor Full Stack Senior',
      department: 'Tecnologia',
      location: 'São Paulo, SP',
      type: 'CLT',
      requiredSkills: ['React', 'Node.js', 'TypeScript', 'PostgreSQL', 'AWS'],
      experience: '5+ anos',
      salary: 'R$ 12.000 - R$ 18.000'
    },
    matchScore: 95,
    skillsMatch: 98,
    experienceMatch: 95,
    locationMatch: 100,
    salaryMatch: 85,
    aiInsights: [
      'Candidato possui todas as skills técnicas necessárias',
      'Experiência superior ao mínimo exigido',
      'Localização perfeita para trabalho presencial',
      'Histórico de projetos similares identificado'
    ],
    status: 'Novo',
    createdAt: '2024-01-22',
    lastActivity: '2024-01-22'
  },
  {
    id: '2',
    candidate: {
      id: '2',
      name: 'Maria Santos',
      email: 'maria.santos@email.com',
      phone: '+55 21 88888-8888',
      location: 'Rio de Janeiro, RJ',
      position: 'Designer UX/UI',
      experience: '5 anos',
      skills: ['Figma', 'Adobe Creative Suite', 'Prototipagem', 'Design System', 'User Research'],
      photo: '',
      resume: 'maria-santos-cv.pdf'
    },
    job: {
      id: '2',
      title: 'Designer UX/UI',
      department: 'Design',
      location: 'Remoto',
      type: 'CLT',
      requiredSkills: ['Figma', 'Prototipagem', 'Design System', 'User Research'],
      experience: '3+ anos',
      salary: 'R$ 8.000 - R$ 12.000'
    },
    matchScore: 92,
    skillsMatch: 95,
    experienceMatch: 90,
    locationMatch: 85,
    salaryMatch: 95,
    aiInsights: [
      'Portfolio demonstra expertise em design systems',
      'Experiência em user research é diferencial',
      'Trabalho remoto pode ser atrativo',
      'Salário alinhado com expectativas'
    ],
    status: 'Visualizado',
    createdAt: '2024-01-21',
    lastActivity: '2024-01-22'
  },
  {
    id: '3',
    candidate: {
      id: '3',
      name: 'Carlos Oliveira',
      email: 'carlos.oliveira@email.com',
      phone: '+55 11 77777-7777',
      location: 'São Paulo, SP',
      position: 'Analista de Dados',
      experience: '6 anos',
      skills: ['Python', 'SQL', 'Power BI', 'Machine Learning', 'Excel Avançado'],
      photo: '',
      resume: 'carlos-oliveira-cv.pdf'
    },
    job: {
      id: '3',
      title: 'Analista de Dados Senior',
      department: 'Analytics',
      location: 'São Paulo, SP',
      type: 'CLT',
      requiredSkills: ['Python', 'SQL', 'Power BI', 'Machine Learning'],
      experience: '4+ anos',
      salary: 'R$ 10.000 - R$ 15.000'
    },
    matchScore: 88,
    skillsMatch: 92,
    experienceMatch: 85,
    locationMatch: 100,
    salaryMatch: 80,
    aiInsights: [
      'Forte background em machine learning',
      'Experiência com ferramentas de BI',
      'Localização ideal para colaboração',
      'Pode aceitar salário dentro da faixa'
    ],
    status: 'Interessado',
    createdAt: '2024-01-20',
    lastActivity: '2024-01-21'
  },
  {
    id: '4',
    candidate: {
      id: '4',
      name: 'Ana Costa',
      email: 'ana.costa@email.com',
      phone: '+55 11 66666-6666',
      location: 'São Paulo, SP',
      position: 'Gerente de Marketing',
      experience: '10 anos',
      skills: ['Google Ads', 'Facebook Ads', 'Analytics', 'SEO', 'Growth Hacking'],
      photo: '',
      resume: 'ana-costa-cv.pdf'
    },
    job: {
      id: '4',
      title: 'Gerente de Marketing Digital',
      department: 'Marketing',
      location: 'São Paulo, SP',
      type: 'CLT',
      requiredSkills: ['Google Ads', 'Facebook Ads', 'Analytics', 'Growth'],
      experience: '7+ anos',
      salary: 'R$ 15.000 - R$ 22.000'
    },
    matchScore: 85,
    skillsMatch: 88,
    experienceMatch: 95,
    locationMatch: 100,
    salaryMatch: 70,
    aiInsights: [
      'Experiência sólida em marketing digital',
      'Conhecimento avançado em growth hacking',
      'Pode estar acima da faixa salarial',
      'Perfil de liderança identificado'
    ],
    status: 'Contatado',
    createdAt: '2024-01-19',
    lastActivity: '2024-01-20'
  }
]

const getStatusBadge = (status: Match['status']) => {
  const variants = {
    'Novo': 'bg-blue-100 text-blue-800',
    'Visualizado': 'bg-yellow-100 text-yellow-800',
    'Interessado': 'bg-green-100 text-green-800',
    'Rejeitado': 'bg-red-100 text-red-800',
    'Contatado': 'bg-purple-100 text-purple-800'
  }
  
  const icons = {
    'Novo': <Sparkles className="w-3 h-3" />,
    'Visualizado': <Eye className="w-3 h-3" />,
    'Interessado': <ThumbsUp className="w-3 h-3" />,
    'Rejeitado': <ThumbsDown className="w-3 h-3" />,
    'Contatado': <Send className="w-3 h-3" />
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

export default function MatchingPage() {
  const params = useParams()
  const tenantSlug = Array.isArray(params?.tenant) ? params.tenant[0] : (params?.tenant as string) || ''
  
  const [matches, setMatches] = useState<Match[]>(mockMatches)
  const [filteredMatches, setFilteredMatches] = useState<Match[]>(mockMatches)
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState<string>('all')
  const [jobFilter, setJobFilter] = useState<string>('all')
  const [minMatchScore, setMinMatchScore] = useState<number>(70)
  const [sortBy, setSortBy] = useState<string>('score')
  
  // Filtros únicos
  const jobs = Array.from(new Set(matches.map(match => match.job.title)))
  const statuses = Array.from(new Set(matches.map(match => match.status)))
  
  useEffect(() => {
    let filtered = matches
    
    // Filtro por busca
    if (searchTerm) {
      filtered = filtered.filter(match => 
        match.candidate.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        match.candidate.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        match.job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        match.candidate.skills.some(skill => skill.toLowerCase().includes(searchTerm.toLowerCase()))
      )
    }
    
    // Filtro por status
    if (statusFilter !== 'all') {
      filtered = filtered.filter(match => match.status === statusFilter)
    }
    
    // Filtro por vaga
    if (jobFilter !== 'all') {
      filtered = filtered.filter(match => match.job.title === jobFilter)
    }
    
    // Filtro por score mínimo
    filtered = filtered.filter(match => match.matchScore >= minMatchScore)
    
    // Ordenação
    switch (sortBy) {
      case 'score':
        filtered.sort((a, b) => b.matchScore - a.matchScore)
        break
      case 'recent':
        filtered.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
        break
      case 'candidate':
        filtered.sort((a, b) => a.candidate.name.localeCompare(b.candidate.name))
        break
    }
    
    setFilteredMatches(filtered)
  }, [matches, searchTerm, statusFilter, jobFilter, minMatchScore, sortBy])
  
  const handleStatusChange = (matchId: string, newStatus: Match['status']) => {
    setMatches(matches.map(match => 
      match.id === matchId 
        ? { ...match, status: newStatus, lastActivity: new Date().toISOString().split('T')[0] }
        : match
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
              <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
                <div className="p-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg">
                  <Brain className="w-8 h-8 text-white" />
                </div>
                Matching IA
              </h1>
              <p className="text-gray-600 mt-2">
                Descubra os melhores candidatos para suas vagas com inteligência artificial
              </p>
            </div>
            <div className="flex items-center gap-4">
              <Button className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600">
                <Zap className="w-4 h-4 mr-2" />
                Gerar Novos Matches
              </Button>
              <Link href={`/${tenantSlug}/dashboard`}>
                <Button variant="outline">
                  Voltar ao Dashboard
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
                  <p className="text-sm font-medium text-gray-600">Total de Matches</p>
                  <p className="text-2xl font-bold text-gray-900">{matches.length}</p>
                  <p className="text-xs text-green-600 mt-1">+12% esta semana</p>
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
                  <p className="text-sm font-medium text-gray-600">Score Médio</p>
                  <p className="text-2xl font-bold text-green-600">
                    {Math.round(matches.reduce((acc, match) => acc + match.matchScore, 0) / matches.length)}%
                  </p>
                  <p className="text-xs text-green-600 mt-1">+5% este mês</p>
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
                  <p className="text-sm font-medium text-gray-600">Matches Novos</p>
                  <p className="text-2xl font-bold text-blue-600">
                    {matches.filter(m => m.status === 'Novo').length}
                  </p>
                  <p className="text-xs text-blue-600 mt-1">Últimas 24h</p>
                </div>
                <div className="p-3 bg-blue-100 rounded-lg">
                  <Sparkles className="w-6 h-6 text-blue-600" />
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Taxa de Conversão</p>
                  <p className="text-2xl font-bold text-orange-600">24%</p>
                  <p className="text-xs text-orange-600 mt-1">Match → Contato</p>
                </div>
                <div className="p-3 bg-orange-100 rounded-lg">
                  <Award className="w-6 h-6 text-orange-600" />
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
                    placeholder="Buscar matches por candidato, vaga ou skills..."
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
                
                <Select value={jobFilter} onValueChange={setJobFilter}>
                  <SelectTrigger className="w-40">
                    <SelectValue placeholder="Todas as Vagas" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Todas as Vagas</SelectItem>
                    {jobs.map(job => (
                      <SelectItem key={job} value={job}>{job}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                
                <Select value={minMatchScore.toString()} onValueChange={(value) => setMinMatchScore(Number(value))}>
                  <SelectTrigger className="w-40">
                    <SelectValue placeholder="Score Mínimo" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="50">50%+ Match</SelectItem>
                    <SelectItem value="70">70%+ Match</SelectItem>
                    <SelectItem value="80">80%+ Match</SelectItem>
                    <SelectItem value="90">90%+ Match</SelectItem>
                  </SelectContent>
                </Select>
                
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="w-40">
                    <SelectValue placeholder="Ordenar por" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="score">Melhor Score</SelectItem>
                    <SelectItem value="recent">Mais Recentes</SelectItem>
                    <SelectItem value="candidate">Nome A-Z</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>
        
        {/* Matches List */}
        <div className="space-y-6">
          {filteredMatches.length === 0 ? (
            <Card>
              <CardContent className="p-12 text-center">
                <Brain className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  Nenhum match encontrado
                </h3>
                <p className="text-gray-600 mb-4">
                  {searchTerm || statusFilter !== 'all' || jobFilter !== 'all'
                    ? 'Tente ajustar os filtros para encontrar matches.'
                    : 'Aguarde a IA processar novos matches.'}
                </p>
                <Button className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600">
                  <Zap className="w-4 h-4 mr-2" />
                  Gerar Matches Agora
                </Button>
              </CardContent>
            </Card>
          ) : (
            filteredMatches.map((match) => (
              <Card key={match.id} className="hover:shadow-lg transition-all duration-200 border-l-4 border-l-purple-500">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-6">
                    <div className="flex items-center gap-4">
                      <div className={`px-3 py-2 rounded-full text-lg font-bold ${getMatchScoreColor(match.matchScore)}`}>
                        {match.matchScore}%
                      </div>
                      {getStatusBadge(match.status)}
                      <div className="text-sm text-gray-500">
                        Gerado em {new Date(match.createdAt).toLocaleDateString('pt-BR')}
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <Button variant="outline" size="sm" onClick={() => handleStatusChange(match.id, 'Visualizado')}>
                        <Eye className="w-4 h-4" />
                      </Button>
                      <Button variant="outline" size="sm" onClick={() => handleStatusChange(match.id, 'Interessado')}>
                        <ThumbsUp className="w-4 h-4" />
                      </Button>
                      <Button variant="outline" size="sm" onClick={() => handleStatusChange(match.id, 'Rejeitado')}>
                        <ThumbsDown className="w-4 h-4" />
                      </Button>
                      <Button size="sm" onClick={() => handleStatusChange(match.id, 'Contatado')}>
                        <Send className="w-4 h-4 mr-2" />
                        Contatar
                      </Button>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* Candidato */}
                    <div className="space-y-4">
                      <div className="flex items-center gap-3">
                        <Avatar className="w-12 h-12">
                          <AvatarImage src={match.candidate.photo} alt={match.candidate.name} />
                          <AvatarFallback>
                            {match.candidate.name.split(' ').map(n => n[0]).join('').toUpperCase()}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <h3 className="text-lg font-semibold text-gray-900">
                            {match.candidate.name}
                          </h3>
                          <p className="text-sm text-gray-600">{match.candidate.position}</p>
                        </div>
                      </div>
                      
                      <div className="space-y-2 text-sm">
                        <div className="flex items-center gap-2">
                          <Mail className="w-4 h-4 text-gray-400" />
                          <span>{match.candidate.email}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <MapPin className="w-4 h-4 text-gray-400" />
                          <span>{match.candidate.location}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <GraduationCap className="w-4 h-4 text-gray-400" />
                          <span>{match.candidate.experience} de experiência</span>
                        </div>
                      </div>
                      
                      <div>
                        <p className="text-sm font-medium text-gray-700 mb-2">Skills:</p>
                        <div className="flex flex-wrap gap-1">
                          {match.candidate.skills.map((skill, index) => (
                            <Badge key={index} variant="secondary" className="text-xs">
                              {skill}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                    
                    {/* Vaga */}
                    <div className="space-y-4">
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-blue-100 rounded-lg">
                          <Briefcase className="w-6 h-6 text-blue-600" />
                        </div>
                        <div>
                          <h3 className="text-lg font-semibold text-gray-900">
                            {match.job.title}
                          </h3>
                          <p className="text-sm text-gray-600">{match.job.department}</p>
                        </div>
                      </div>
                      
                      <div className="space-y-2 text-sm">
                        <div className="flex items-center gap-2">
                          <MapPin className="w-4 h-4 text-gray-400" />
                          <span>{match.job.location}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Clock className="w-4 h-4 text-gray-400" />
                          <span>{match.job.type}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Award className="w-4 h-4 text-gray-400" />
                          <span>{match.job.experience}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-green-600 font-medium">{match.job.salary}</span>
                        </div>
                      </div>
                      
                      <div>
                        <p className="text-sm font-medium text-gray-700 mb-2">Skills Necessárias:</p>
                        <div className="flex flex-wrap gap-1">
                          {match.job.requiredSkills.map((skill, index) => (
                            <Badge key={index} variant="outline" className="text-xs">
                              {skill}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Match Details */}
                  <div className="mt-6 pt-6 border-t">
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
                      <div>
                        <p className="text-xs text-gray-500 mb-1">Skills Match</p>
                        <div className="flex items-center gap-2">
                          <Progress value={match.skillsMatch} className="flex-1" />
                          <span className="text-sm font-medium">{match.skillsMatch}%</span>
                        </div>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500 mb-1">Experiência</p>
                        <div className="flex items-center gap-2">
                          <Progress value={match.experienceMatch} className="flex-1" />
                          <span className="text-sm font-medium">{match.experienceMatch}%</span>
                        </div>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500 mb-1">Localização</p>
                        <div className="flex items-center gap-2">
                          <Progress value={match.locationMatch} className="flex-1" />
                          <span className="text-sm font-medium">{match.locationMatch}%</span>
                        </div>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500 mb-1">Salário</p>
                        <div className="flex items-center gap-2">
                          <Progress value={match.salaryMatch} className="flex-1" />
                          <span className="text-sm font-medium">{match.salaryMatch}%</span>
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <p className="text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                        <Brain className="w-4 h-4" />
                        Insights da IA:
                      </p>
                      <ul className="space-y-1">
                        {match.aiInsights.map((insight, index) => (
                          <li key={index} className="text-sm text-gray-600 flex items-start gap-2">
                            <ArrowRight className="w-3 h-3 mt-0.5 text-purple-500 flex-shrink-0" />
                            {insight}
                          </li>
                        ))}
                      </ul>
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