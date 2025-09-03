'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Progress } from '@/components/ui/progress'
import { 
  Search, 
  Filter, 
  Users, 
  Briefcase, 
  TrendingUp, 
  Star, 
  Heart, 
  X, 
  Check, 
  Eye, 
  Send, 
  Brain, 
  Target, 
  Zap, 
  Award, 
  MapPin, 
  Clock, 
  DollarSign, 
  User, 
  Building, 
  GraduationCap, 
  Calendar,
  ArrowRight,
  Sparkles,
  ThumbsUp,
  ThumbsDown,
  MoreHorizontal
} from 'lucide-react'

interface Candidate {
  id: string
  name: string
  email: string
  location: string
  experience: string
  education: string
  skills: string[]
  salary: string
  availability: string
  photo?: string
}

interface Job {
  id: string
  title: string
  company: string
  location: string
  type: string
  salary: string
  requirements: string[]
  description: string
  posted: string
}

interface Match {
  id: string
  candidate: Candidate
  job: Job
  score: number
  reasons: string[]
  status: 'pending' | 'liked' | 'rejected' | 'contacted'
  skillsMatch: number
  experienceMatch: number
  locationMatch: number
  salaryMatch: number
}

const mockCandidates: Candidate[] = [
  {
    id: '1',
    name: 'João Silva',
    email: 'joao.silva@email.com',
    location: 'São Paulo, SP',
    experience: '8 anos',
    education: 'Bacharelado em Ciência da Computação',
    skills: ['React', 'Node.js', 'TypeScript', 'PostgreSQL', 'AWS', 'Docker'],
    salary: 'R$ 12.000 - R$ 15.000',
    availability: 'Imediata'
  },
  {
    id: '2',
    name: 'Maria Santos',
    email: 'maria.santos@email.com',
    location: 'Rio de Janeiro, RJ',
    experience: '5 anos',
    education: 'Bacharelado em Design',
    skills: ['Figma', 'Adobe Creative Suite', 'Prototipagem', 'Design System', 'User Research'],
    salary: 'R$ 8.000 - R$ 12.000',
    availability: '30 dias'
  }
]

const mockJobs: Job[] = [
  {
    id: '1',
    title: 'Desenvolvedor Full Stack Senior',
    company: 'TechCorp',
    location: 'São Paulo, SP',
    type: 'CLT',
    salary: 'R$ 12.000 - R$ 18.000',
    requirements: ['React', 'Node.js', 'TypeScript', 'PostgreSQL', '5+ anos experiência'],
    description: 'Desenvolvedor experiente para liderar projetos...',
    posted: '2024-01-15'
  },
  {
    id: '2',
    title: 'Designer UX/UI',
    company: 'StartupXYZ',
    location: 'Rio de Janeiro, RJ',
    type: 'PJ',
    salary: 'R$ 8.000 - R$ 12.000',
    requirements: ['Figma', 'Design System', 'Prototipagem', '3+ anos experiência'],
    description: 'Designer para criar experiências incríveis...',
    posted: '2024-01-14'
  }
]

const mockMatches: Match[] = [
  {
    id: '1',
    candidate: mockCandidates[0],
    job: mockJobs[0],
    score: 95,
    reasons: [
      'Experiência sólida em React e Node.js',
      'Conhecimento em TypeScript e PostgreSQL',
      'Localização compatível',
      'Expectativa salarial alinhada'
    ],
    status: 'pending',
    skillsMatch: 95,
    experienceMatch: 90,
    locationMatch: 100,
    salaryMatch: 85
  },
  {
    id: '2',
    candidate: mockCandidates[1],
    job: mockJobs[1],
    score: 88,
    reasons: [
      'Expertise em Figma e Design System',
      'Experiência em prototipagem',
      'Localização compatível',
      'Portfólio relevante'
    ],
    status: 'pending',
    skillsMatch: 90,
    experienceMatch: 85,
    locationMatch: 100,
    salaryMatch: 90
  }
]

export default function MatchingPage() {
  const [matches, setMatches] = useState<Match[]>(mockMatches)
  const [selectedMatch, setSelectedMatch] = useState<Match | null>(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState<string>('all')
  const [scoreFilter, setScoreFilter] = useState<number>(0)
  const [viewMode, setViewMode] = useState<'cards' | 'swipe'>('cards')
  const [currentSwipeIndex, setCurrentSwipeIndex] = useState(0)

  const filteredMatches = matches.filter(match => {
    const matchesSearch = match.candidate.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         match.job.title.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === 'all' || match.status === statusFilter
    const matchesScore = match.score >= scoreFilter
    return matchesSearch && matchesStatus && matchesScore
  })

  const handleMatchAction = (matchId: string, action: 'like' | 'reject' | 'contact') => {
    setMatches(prev => prev.map(match => 
      match.id === matchId 
        ? { ...match, status: action === 'like' ? 'liked' : action === 'reject' ? 'rejected' : 'contacted' }
        : match
    ))
    
    if (viewMode === 'swipe' && currentSwipeIndex < filteredMatches.length - 1) {
      setCurrentSwipeIndex(prev => prev + 1)
    }
  }

  const getScoreColor = (score: number) => {
    if (score >= 90) return 'text-green-600'
    if (score >= 80) return 'text-blue-600'
    if (score >= 70) return 'text-yellow-600'
    return 'text-red-600'
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'liked': return 'bg-green-100 text-green-800'
      case 'rejected': return 'bg-red-100 text-red-800'
      case 'contacted': return 'bg-blue-100 text-blue-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'liked': return <Heart className="h-3 w-3 mr-1" />
      case 'rejected': return <X className="h-3 w-3 mr-1" />
      case 'contacted': return <Send className="h-3 w-3 mr-1" />
      default: return <Clock className="h-3 w-3 mr-1" />
    }
  }

  const currentSwipeMatch = filteredMatches[currentSwipeIndex]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold text-gray-900">Matching IA</h1>
              <Badge className="ml-3">{filteredMatches.length} matches</Badge>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex bg-gray-100 rounded-lg p-1">
                <Button 
                  variant={viewMode === 'cards' ? 'default' : 'ghost'} 
                  size="sm"
                  onClick={() => setViewMode('cards')}
                >
                  <Users className="h-4 w-4 mr-2" />
                  Cards
                </Button>
                <Button 
                  variant={viewMode === 'swipe' ? 'default' : 'ghost'} 
                  size="sm"
                  onClick={() => setViewMode('swipe')}
                >
                  <Sparkles className="h-4 w-4 mr-2" />
                  Swipe
                </Button>
              </div>
              <Button variant="outline" size="sm">
                <Filter className="h-4 w-4 mr-2" />
                Filtros
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
                placeholder="Buscar por candidato ou vaga..."
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
              <option value="pending">Pendente</option>
              <option value="liked">Curtido</option>
              <option value="rejected">Rejeitado</option>
              <option value="contacted">Contatado</option>
            </select>
            <select 
              value={scoreFilter} 
              onChange={(e) => setScoreFilter(Number(e.target.value))}
              className="px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value={0}>Todos os Scores</option>
              <option value={90}>90%+ (Excelente)</option>
              <option value={80}>80%+ (Muito Bom)</option>
              <option value={70}>70%+ (Bom)</option>
            </select>
          </div>
        </div>

        {/* Content based on view mode */}
        {viewMode === 'cards' ? (
          /* Cards View */
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
            {filteredMatches.map((match) => (
              <Card key={match.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <Badge className={getStatusColor(match.status)}>
                          {getStatusIcon(match.status)}
                          {match.status === 'pending' ? 'Pendente' : 
                           match.status === 'liked' ? 'Curtido' :
                           match.status === 'rejected' ? 'Rejeitado' : 'Contatado'}
                        </Badge>
                        <div className={`flex items-center ${getScoreColor(match.score)}`}>
                          <Brain className="h-4 w-4 mr-1" />
                          <span className="font-bold">{match.score}%</span>
                        </div>
                      </div>
                      <CardTitle className="text-lg mb-1">Match Encontrado!</CardTitle>
                      <CardDescription>Compatibilidade alta entre candidato e vaga</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {/* Candidate Info */}
                    <div className="bg-blue-50 p-4 rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-semibold text-blue-900 flex items-center">
                          <User className="h-4 w-4 mr-2" />
                          Candidato
                        </h4>
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          onClick={() => setSelectedMatch(match)}
                        >
                          <Eye className="h-4 w-4" />
                        </Button>
                      </div>
                      <p className="font-medium text-blue-800">{match.candidate.name}</p>
                      <div className="text-sm text-blue-700 mt-1 space-y-1">
                        <div className="flex items-center">
                          <MapPin className="h-3 w-3 mr-1" />
                          {match.candidate.location}
                        </div>
                        <div className="flex items-center">
                          <Briefcase className="h-3 w-3 mr-1" />
                          {match.candidate.experience}
                        </div>
                        <div className="flex items-center">
                          <DollarSign className="h-3 w-3 mr-1" />
                          {match.candidate.salary}
                        </div>
                      </div>
                      <div className="mt-2">
                        <div className="flex flex-wrap gap-1">
                          {match.candidate.skills.slice(0, 3).map((skill, index) => (
                            <Badge key={index} variant="outline" className="text-xs bg-white">
                              {skill}
                            </Badge>
                          ))}
                          {match.candidate.skills.length > 3 && (
                            <Badge variant="outline" className="text-xs bg-white">
                              +{match.candidate.skills.length - 3}
                            </Badge>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Job Info */}
                    <div className="bg-green-50 p-4 rounded-lg">
                      <h4 className="font-semibold text-green-900 flex items-center mb-2">
                        <Building className="h-4 w-4 mr-2" />
                        Vaga
                      </h4>
                      <p className="font-medium text-green-800">{match.job.title}</p>
                      <p className="text-sm text-green-700">{match.job.company}</p>
                      <div className="text-sm text-green-700 mt-1 space-y-1">
                        <div className="flex items-center">
                          <MapPin className="h-3 w-3 mr-1" />
                          {match.job.location}
                        </div>
                        <div className="flex items-center">
                          <DollarSign className="h-3 w-3 mr-1" />
                          {match.job.salary}
                        </div>
                        <div className="flex items-center">
                          <Calendar className="h-3 w-3 mr-1" />
                          Publicada em {new Date(match.job.posted).toLocaleDateString('pt-BR')}
                        </div>
                      </div>
                    </div>

                    {/* Match Details */}
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <h4 className="font-semibold text-gray-900 flex items-center mb-3">
                        <Target className="h-4 w-4 mr-2" />
                        Detalhes do Match
                      </h4>
                      <div className="grid grid-cols-2 gap-3 text-sm">
                        <div>
                          <div className="flex justify-between mb-1">
                            <span>Skills</span>
                            <span className="font-medium">{match.skillsMatch}%</span>
                          </div>
                          <Progress value={match.skillsMatch} className="h-2" />
                        </div>
                        <div>
                          <div className="flex justify-between mb-1">
                            <span>Experiência</span>
                            <span className="font-medium">{match.experienceMatch}%</span>
                          </div>
                          <Progress value={match.experienceMatch} className="h-2" />
                        </div>
                        <div>
                          <div className="flex justify-between mb-1">
                            <span>Localização</span>
                            <span className="font-medium">{match.locationMatch}%</span>
                          </div>
                          <Progress value={match.locationMatch} className="h-2" />
                        </div>
                        <div>
                          <div className="flex justify-between mb-1">
                            <span>Salário</span>
                            <span className="font-medium">{match.salaryMatch}%</span>
                          </div>
                          <Progress value={match.salaryMatch} className="h-2" />
                        </div>
                      </div>
                    </div>

                    {/* Reasons */}
                    <div>
                      <h4 className="font-semibold text-gray-900 flex items-center mb-2">
                        <Zap className="h-4 w-4 mr-2" />
                        Por que é um bom match?
                      </h4>
                      <ul className="space-y-1">
                        {match.reasons.map((reason, index) => (
                          <li key={index} className="flex items-start text-sm">
                            <div className="w-2 h-2 bg-green-500 rounded-full mt-2 mr-2 flex-shrink-0"></div>
                            <span className="text-gray-700">{reason}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Actions */}
                    {match.status === 'pending' && (
                      <div className="flex gap-2 pt-4 border-t border-gray-200">
                        <Button 
                          variant="outline" 
                          className="flex-1 text-red-600 hover:text-red-700"
                          onClick={() => handleMatchAction(match.id, 'reject')}
                        >
                          <ThumbsDown className="h-4 w-4 mr-2" />
                          Rejeitar
                        </Button>
                        <Button 
                          variant="outline" 
                          className="flex-1 text-green-600 hover:text-green-700"
                          onClick={() => handleMatchAction(match.id, 'like')}
                        >
                          <ThumbsUp className="h-4 w-4 mr-2" />
                          Curtir
                        </Button>
                        <Button 
                          className="flex-1"
                          onClick={() => handleMatchAction(match.id, 'contact')}
                        >
                          <Send className="h-4 w-4 mr-2" />
                          Contatar
                        </Button>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          /* Swipe View */
          <div className="max-w-2xl mx-auto">
            {currentSwipeMatch ? (
              <div className="relative">
                <Card className="shadow-xl">
                  <CardHeader className="text-center">
                    <div className="flex justify-between items-center mb-4">
                      <Badge variant="outline">
                        {currentSwipeIndex + 1} de {filteredMatches.length}
                      </Badge>
                      <div className={`flex items-center ${getScoreColor(currentSwipeMatch.score)}`}>
                        <Brain className="h-5 w-5 mr-2" />
                        <span className="text-2xl font-bold">{currentSwipeMatch.score}%</span>
                      </div>
                    </div>
                    <CardTitle className="text-2xl">Match Encontrado!</CardTitle>
                    <CardDescription>Avalie esta compatibilidade</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {/* Candidate */}
                    <div className="text-center">
                      <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <User className="h-10 w-10 text-blue-600" />
                      </div>
                      <h3 className="text-xl font-semibold">{currentSwipeMatch.candidate.name}</h3>
                      <p className="text-gray-600">{currentSwipeMatch.candidate.experience} • {currentSwipeMatch.candidate.location}</p>
                    </div>

                    <div className="flex items-center justify-center">
                      <ArrowRight className="h-8 w-8 text-gray-400" />
                    </div>

                    {/* Job */}
                    <div className="text-center">
                      <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Building className="h-10 w-10 text-green-600" />
                      </div>
                      <h3 className="text-xl font-semibold">{currentSwipeMatch.job.title}</h3>
                      <p className="text-gray-600">{currentSwipeMatch.job.company} • {currentSwipeMatch.job.location}</p>
                    </div>

                    {/* Match Breakdown */}
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <h4 className="font-semibold mb-3 text-center">Breakdown do Match</h4>
                      <div className="space-y-3">
                        <div>
                          <div className="flex justify-between mb-1">
                            <span>Skills</span>
                            <span className="font-medium">{currentSwipeMatch.skillsMatch}%</span>
                          </div>
                          <Progress value={currentSwipeMatch.skillsMatch} className="h-2" />
                        </div>
                        <div>
                          <div className="flex justify-between mb-1">
                            <span>Experiência</span>
                            <span className="font-medium">{currentSwipeMatch.experienceMatch}%</span>
                          </div>
                          <Progress value={currentSwipeMatch.experienceMatch} className="h-2" />
                        </div>
                        <div>
                          <div className="flex justify-between mb-1">
                            <span>Localização</span>
                            <span className="font-medium">{currentSwipeMatch.locationMatch}%</span>
                          </div>
                          <Progress value={currentSwipeMatch.locationMatch} className="h-2" />
                        </div>
                        <div>
                          <div className="flex justify-between mb-1">
                            <span>Salário</span>
                            <span className="font-medium">{currentSwipeMatch.salaryMatch}%</span>
                          </div>
                          <Progress value={currentSwipeMatch.salaryMatch} className="h-2" />
                        </div>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex gap-4 justify-center pt-4">
                      <Button 
                        variant="outline" 
                        size="lg"
                        className="w-20 h-20 rounded-full text-red-600 hover:text-red-700 border-red-200 hover:border-red-300"
                        onClick={() => handleMatchAction(currentSwipeMatch.id, 'reject')}
                      >
                        <X className="h-8 w-8" />
                      </Button>
                      <Button 
                        variant="outline" 
                        size="lg"
                        className="w-20 h-20 rounded-full text-green-600 hover:text-green-700 border-green-200 hover:border-green-300"
                        onClick={() => handleMatchAction(currentSwipeMatch.id, 'like')}
                      >
                        <Heart className="h-8 w-8" />
                      </Button>
                      <Button 
                        size="lg"
                        className="w-20 h-20 rounded-full"
                        onClick={() => handleMatchAction(currentSwipeMatch.id, 'contact')}
                      >
                        <Send className="h-8 w-8" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            ) : (
              <div className="text-center py-12">
                <div className="mx-auto h-24 w-24 text-gray-400">
                  <Target className="h-full w-full" />
                </div>
                <h3 className="mt-4 text-lg font-medium text-gray-900">Todos os matches foram avaliados!</h3>
                <p className="mt-2 text-gray-500">Parabéns! Você revisou todos os matches disponíveis.</p>
                <Button className="mt-4" onClick={() => setCurrentSwipeIndex(0)}>
                  Revisar Novamente
                </Button>
              </div>
            )}
          </div>
        )}

        {/* Empty State */}
        {filteredMatches.length === 0 && (
          <div className="text-center py-12">
            <div className="mx-auto h-24 w-24 text-gray-400">
              <Target className="h-full w-full" />
            </div>
            <h3 className="mt-4 text-lg font-medium text-gray-900">Nenhum match encontrado</h3>
            <p className="mt-2 text-gray-500">
              {searchTerm || statusFilter !== 'all' || scoreFilter > 0
                ? 'Tente ajustar os filtros de busca.' 
                : 'Aguarde enquanto nossa IA encontra os melhores matches.'}
            </p>
          </div>
        )}
      </main>

      {/* Match Detail Modal */}
      {selectedMatch && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50" onClick={() => setSelectedMatch(null)}>
          <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            <div className="p-6">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">Detalhes do Match</h2>
                  <p className="text-gray-600">Análise completa da compatibilidade</p>
                </div>
                <div className="flex items-center space-x-3">
                  <div className={`flex items-center ${getScoreColor(selectedMatch.score)}`}>
                    <Brain className="h-5 w-5 mr-2" />
                    <span className="text-xl font-bold">{selectedMatch.score}%</span>
                  </div>
                  <Button variant="ghost" onClick={() => setSelectedMatch(null)}>
                    ×
                  </Button>
                </div>
              </div>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Candidate Details */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <User className="h-5 w-5 mr-2" />
                      {selectedMatch.candidate.name}
                    </CardTitle>
                    <CardDescription>Perfil do Candidato</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 gap-3">
                      <div className="flex items-center">
                        <MapPin className="h-4 w-4 mr-2 text-gray-500" />
                        <span className="text-sm">{selectedMatch.candidate.location}</span>
                      </div>
                      <div className="flex items-center">
                        <Briefcase className="h-4 w-4 mr-2 text-gray-500" />
                        <span className="text-sm">{selectedMatch.candidate.experience}</span>
                      </div>
                      <div className="flex items-center">
                        <GraduationCap className="h-4 w-4 mr-2 text-gray-500" />
                        <span className="text-sm">{selectedMatch.candidate.education}</span>
                      </div>
                      <div className="flex items-center">
                        <DollarSign className="h-4 w-4 mr-2 text-gray-500" />
                        <span className="text-sm">{selectedMatch.candidate.salary}</span>
                      </div>
                    </div>
                    
                    <div>
                      <p className="text-sm font-medium text-gray-700 mb-2">Skills:</p>
                      <div className="flex flex-wrap gap-1">
                        {selectedMatch.candidate.skills.map((skill, index) => (
                          <Badge key={index} variant="outline">{skill}</Badge>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Job Details */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Building className="h-5 w-5 mr-2" />
                      {selectedMatch.job.title}
                    </CardTitle>
                    <CardDescription>{selectedMatch.job.company}</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 gap-3">
                      <div className="flex items-center">
                        <MapPin className="h-4 w-4 mr-2 text-gray-500" />
                        <span className="text-sm">{selectedMatch.job.location}</span>
                      </div>
                      <div className="flex items-center">
                        <Briefcase className="h-4 w-4 mr-2 text-gray-500" />
                        <span className="text-sm">{selectedMatch.job.type}</span>
                      </div>
                      <div className="flex items-center">
                        <DollarSign className="h-4 w-4 mr-2 text-gray-500" />
                        <span className="text-sm">{selectedMatch.job.salary}</span>
                      </div>
                      <div className="flex items-center">
                        <Calendar className="h-4 w-4 mr-2 text-gray-500" />
                        <span className="text-sm">Publicada em {new Date(selectedMatch.job.posted).toLocaleDateString('pt-BR')}</span>
                      </div>
                    </div>
                    
                    <div>
                      <p className="text-sm font-medium text-gray-700 mb-2">Requisitos:</p>
                      <div className="flex flex-wrap gap-1">
                        {selectedMatch.job.requirements.map((req, index) => (
                          <Badge key={index} variant="outline">{req}</Badge>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Match Analysis */}
              <Card className="mt-6">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Brain className="h-5 w-5 mr-2" />
                    Análise de Compatibilidade
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                    <div className="text-center">
                      <div className={`text-2xl font-bold ${getScoreColor(selectedMatch.skillsMatch)}`}>
                        {selectedMatch.skillsMatch}%
                      </div>
                      <p className="text-sm text-gray-600">Skills</p>
                    </div>
                    <div className="text-center">
                      <div className={`text-2xl font-bold ${getScoreColor(selectedMatch.experienceMatch)}`}>
                        {selectedMatch.experienceMatch}%
                      </div>
                      <p className="text-sm text-gray-600">Experiência</p>
                    </div>
                    <div className="text-center">
                      <div className={`text-2xl font-bold ${getScoreColor(selectedMatch.locationMatch)}`}>
                        {selectedMatch.locationMatch}%
                      </div>
                      <p className="text-sm text-gray-600">Localização</p>
                    </div>
                    <div className="text-center">
                      <div className={`text-2xl font-bold ${getScoreColor(selectedMatch.salaryMatch)}`}>
                        {selectedMatch.salaryMatch}%
                      </div>
                      <p className="text-sm text-gray-600">Salário</p>
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold mb-3">Razões para o Match:</h4>
                    <ul className="space-y-2">
                      {selectedMatch.reasons.map((reason, index) => (
                        <li key={index} className="flex items-start">
                          <Award className="h-4 w-4 mr-2 text-green-500 mt-0.5 flex-shrink-0" />
                          <span className="text-sm">{reason}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </CardContent>
              </Card>

              {/* Actions */}
              {selectedMatch.status === 'pending' && (
                <div className="flex gap-3 mt-6">
                  <Button 
                    variant="outline" 
                    className="flex-1 text-red-600 hover:text-red-700"
                    onClick={() => {
                      handleMatchAction(selectedMatch.id, 'reject')
                      setSelectedMatch(null)
                    }}
                  >
                    <X className="h-4 w-4 mr-2" />
                    Rejeitar Match
                  </Button>
                  <Button 
                    variant="outline" 
                    className="flex-1 text-green-600 hover:text-green-700"
                    onClick={() => {
                      handleMatchAction(selectedMatch.id, 'like')
                      setSelectedMatch(null)
                    }}
                  >
                    <Heart className="h-4 w-4 mr-2" />
                    Curtir Match
                  </Button>
                  <Button 
                    className="flex-1"
                    onClick={() => {
                      handleMatchAction(selectedMatch.id, 'contact')
                      setSelectedMatch(null)
                    }}
                  >
                    <Send className="h-4 w-4 mr-2" />
                    Contatar Candidato
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}