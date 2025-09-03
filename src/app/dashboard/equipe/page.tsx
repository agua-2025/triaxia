'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Progress } from '@/components/ui/progress'
import { 
  Users, 
  MessageSquare, 
  Star, 
  Clock, 
  CheckCircle, 
  AlertCircle, 
  Plus, 
  Search, 
  Filter, 
  MoreHorizontal, 
  Send, 
  ThumbsUp, 
  ThumbsDown, 
  Eye, 
  Edit, 
  Trash2, 
  UserPlus, 
  Settings, 
  Bell, 
  Calendar, 
  FileText, 
  Target, 
  Award, 
  Activity, 
  Mail, 
  Phone, 
  MapPin, 
  Briefcase, 
  User, 
  Building, 
  Hash,
  Reply,
  Heart,
  Share,
  Bookmark
} from 'lucide-react'

interface TeamMember {
  id: string
  name: string
  email: string
  role: 'admin' | 'recruiter' | 'manager' | 'viewer'
  avatar?: string
  status: 'online' | 'offline' | 'away'
  lastActive: string
  permissions: string[]
}

interface Comment {
  id: string
  author: TeamMember
  content: string
  timestamp: string
  type: 'comment' | 'evaluation' | 'decision'
  rating?: number
  replies?: Comment[]
}

interface Candidate {
  id: string
  name: string
  email: string
  position: string
  status: 'new' | 'reviewing' | 'interview' | 'approved' | 'rejected'
  assignedTo: TeamMember[]
  comments: Comment[]
  rating: number
  stage: string
}

interface Workflow {
  id: string
  name: string
  stages: string[]
  currentStage: number
  assignedMembers: TeamMember[]
  dueDate: string
}

const mockTeamMembers: TeamMember[] = [
  {
    id: '1',
    name: 'Ana Silva',
    email: 'ana.silva@empresa.com',
    role: 'admin',
    status: 'online',
    lastActive: '2024-01-15T10:30:00Z',
    permissions: ['manage_team', 'manage_candidates', 'manage_jobs', 'view_analytics']
  },
  {
    id: '2',
    name: 'Carlos Santos',
    email: 'carlos.santos@empresa.com',
    role: 'recruiter',
    status: 'online',
    lastActive: '2024-01-15T10:25:00Z',
    permissions: ['manage_candidates', 'view_analytics']
  },
  {
    id: '3',
    name: 'Maria Oliveira',
    email: 'maria.oliveira@empresa.com',
    role: 'manager',
    status: 'away',
    lastActive: '2024-01-15T09:45:00Z',
    permissions: ['view_candidates', 'approve_hires']
  },
  {
    id: '4',
    name: 'João Costa',
    email: 'joao.costa@empresa.com',
    role: 'viewer',
    status: 'offline',
    lastActive: '2024-01-14T16:30:00Z',
    permissions: ['view_candidates']
  }
]

const mockCandidates: Candidate[] = [
  {
    id: '1',
    name: 'Pedro Almeida',
    email: 'pedro.almeida@email.com',
    position: 'Desenvolvedor Full Stack',
    status: 'reviewing',
    assignedTo: [mockTeamMembers[0], mockTeamMembers[1]],
    rating: 4.2,
    stage: 'Análise Técnica',
    comments: [
      {
        id: '1',
        author: mockTeamMembers[1],
        content: 'Candidato com excelente background técnico. Experiência sólida em React e Node.js.',
        timestamp: '2024-01-15T09:30:00Z',
        type: 'comment'
      },
      {
        id: '2',
        author: mockTeamMembers[0],
        content: 'Concordo com o Carlos. Vamos agendar uma entrevista técnica.',
        timestamp: '2024-01-15T10:15:00Z',
        type: 'decision'
      }
    ]
  },
  {
    id: '2',
    name: 'Lucia Ferreira',
    email: 'lucia.ferreira@email.com',
    position: 'Designer UX/UI',
    status: 'interview',
    assignedTo: [mockTeamMembers[2]],
    rating: 4.8,
    stage: 'Entrevista Final',
    comments: [
      {
        id: '3',
        author: mockTeamMembers[2],
        content: 'Portfólio impressionante! Demonstrou grande conhecimento em design systems.',
        timestamp: '2024-01-14T14:20:00Z',
        type: 'evaluation',
        rating: 5
      }
    ]
  }
]

const mockWorkflows: Workflow[] = [
  {
    id: '1',
    name: 'Processo Desenvolvedor',
    stages: ['Triagem CV', 'Análise Técnica', 'Entrevista RH', 'Entrevista Técnica', 'Entrevista Final', 'Aprovação'],
    currentStage: 2,
    assignedMembers: [mockTeamMembers[0], mockTeamMembers[1]],
    dueDate: '2024-01-20'
  },
  {
    id: '2',
    name: 'Processo Designer',
    stages: ['Triagem CV', 'Análise Portfolio', 'Entrevista RH', 'Teste Prático', 'Entrevista Final'],
    currentStage: 4,
    assignedMembers: [mockTeamMembers[2]],
    dueDate: '2024-01-18'
  }
]

export default function EquipePage() {
  const [activeTab, setActiveTab] = useState<'team' | 'candidates' | 'workflows'>('team')
  const [selectedCandidate, setSelectedCandidate] = useState<Candidate | null>(null)
  const [newComment, setNewComment] = useState('')
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState<string>('all')

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'online': return 'bg-green-100 text-green-800'
      case 'away': return 'bg-yellow-100 text-yellow-800'
      case 'offline': return 'bg-gray-100 text-gray-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'online': return <div className="w-2 h-2 bg-green-500 rounded-full" />
      case 'away': return <div className="w-2 h-2 bg-yellow-500 rounded-full" />
      case 'offline': return <div className="w-2 h-2 bg-gray-400 rounded-full" />
      default: return <div className="w-2 h-2 bg-gray-400 rounded-full" />
    }
  }

  const getCandidateStatusColor = (status: string) => {
    switch (status) {
      case 'new': return 'bg-blue-100 text-blue-800'
      case 'reviewing': return 'bg-yellow-100 text-yellow-800'
      case 'interview': return 'bg-purple-100 text-purple-800'
      case 'approved': return 'bg-green-100 text-green-800'
      case 'rejected': return 'bg-red-100 text-red-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'admin': return 'bg-red-100 text-red-800'
      case 'recruiter': return 'bg-blue-100 text-blue-800'
      case 'manager': return 'bg-purple-100 text-purple-800'
      case 'viewer': return 'bg-gray-100 text-gray-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const handleAddComment = () => {
    if (!newComment.trim() || !selectedCandidate) return
    
    const comment: Comment = {
      id: Date.now().toString(),
      author: mockTeamMembers[0], // Current user
      content: newComment,
      timestamp: new Date().toISOString(),
      type: 'comment'
    }
    
    setSelectedCandidate({
      ...selectedCandidate,
      comments: [...selectedCandidate.comments, comment]
    })
    
    setNewComment('')
  }

  const filteredCandidates = mockCandidates.filter(candidate => {
    const matchesSearch = candidate.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         candidate.position.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === 'all' || candidate.status === statusFilter
    return matchesSearch && matchesStatus
  })

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold text-gray-900">Colaboração em Equipe</h1>
              <Badge className="ml-3">{mockTeamMembers.filter(m => m.status === 'online').length} online</Badge>
            </div>
            <div className="flex items-center space-x-4">
              <Button variant="outline" size="sm">
                <Bell className="h-4 w-4 mr-2" />
                Notificações
              </Button>
              <Button variant="outline" size="sm">
                <Settings className="h-4 w-4 mr-2" />
                Configurações
              </Button>
              <Button size="sm">
                <UserPlus className="h-4 w-4 mr-2" />
                Convidar Membro
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
              onClick={() => setActiveTab('team')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'team'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              <Users className="h-4 w-4 inline mr-2" />
              Equipe
            </button>
            <button
              onClick={() => setActiveTab('candidates')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'candidates'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              <Target className="h-4 w-4 inline mr-2" />
              Candidatos Colaborativos
            </button>
            <button
              onClick={() => setActiveTab('workflows')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'workflows'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              <Activity className="h-4 w-4 inline mr-2" />
              Workflows
            </button>
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeTab === 'team' && (
          <div className="space-y-6">
            {/* Team Overview */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center">
                    <Users className="h-8 w-8 text-blue-600" />
                    <div className="ml-4">
                      <p className="text-2xl font-bold text-gray-900">{mockTeamMembers.length}</p>
                      <p className="text-gray-600">Membros da Equipe</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center">
                    <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                      <div className="w-3 h-3 bg-green-500 rounded-full" />
                    </div>
                    <div className="ml-4">
                      <p className="text-2xl font-bold text-gray-900">{mockTeamMembers.filter(m => m.status === 'online').length}</p>
                      <p className="text-gray-600">Online Agora</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center">
                    <MessageSquare className="h-8 w-8 text-purple-600" />
                    <div className="ml-4">
                      <p className="text-2xl font-bold text-gray-900">47</p>
                      <p className="text-gray-600">Comentários Hoje</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center">
                    <CheckCircle className="h-8 w-8 text-green-600" />
                    <div className="ml-4">
                      <p className="text-2xl font-bold text-gray-900">12</p>
                      <p className="text-gray-600">Decisões Tomadas</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Team Members */}
            <Card>
              <CardHeader>
                <CardTitle>Membros da Equipe</CardTitle>
                <CardDescription>Gerencie permissões e acompanhe atividades</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {mockTeamMembers.map((member) => (
                    <div key={member.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div className="flex items-center space-x-4">
                        <div className="relative">
                          <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                            <User className="h-6 w-6 text-blue-600" />
                          </div>
                          <div className="absolute -bottom-1 -right-1">
                            {getStatusIcon(member.status)}
                          </div>
                        </div>
                        <div>
                          <h4 className="font-medium text-gray-900">{member.name}</h4>
                          <p className="text-sm text-gray-600">{member.email}</p>
                          <div className="flex items-center space-x-2 mt-1">
                            <Badge className={getRoleColor(member.role)}>
                              {member.role}
                            </Badge>
                            <Badge className={getStatusColor(member.status)}>
                              {member.status}
                            </Badge>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className="text-sm text-gray-500">
                          {member.status === 'online' ? 'Ativo agora' : 
                           `Último acesso: ${new Date(member.lastActive).toLocaleDateString('pt-BR')}`}
                        </span>
                        <Button variant="ghost" size="sm">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {activeTab === 'candidates' && (
          <div className="space-y-6">
            {/* Search and Filters */}
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input
                    placeholder="Buscar candidatos..."
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
                  <option value="new">Novo</option>
                  <option value="reviewing">Em Análise</option>
                  <option value="interview">Entrevista</option>
                  <option value="approved">Aprovado</option>
                  <option value="rejected">Rejeitado</option>
                </select>
              </div>
            </div>

            {/* Candidates List */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {filteredCandidates.map((candidate) => (
                <Card key={candidate.id} className="hover:shadow-lg transition-shadow cursor-pointer" onClick={() => setSelectedCandidate(candidate)}>
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <CardTitle className="text-lg">{candidate.name}</CardTitle>
                        <CardDescription>{candidate.position}</CardDescription>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Badge className={getCandidateStatusColor(candidate.status)}>
                          {candidate.status === 'new' ? 'Novo' :
                           candidate.status === 'reviewing' ? 'Em Análise' :
                           candidate.status === 'interview' ? 'Entrevista' :
                           candidate.status === 'approved' ? 'Aprovado' : 'Rejeitado'}
                        </Badge>
                        <div className="flex items-center">
                          <Star className="h-4 w-4 text-yellow-500 fill-current" />
                          <span className="ml-1 text-sm font-medium">{candidate.rating}</span>
                        </div>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex items-center text-sm text-gray-600">
                        <Hash className="h-4 w-4 mr-2" />
                        <span>{candidate.stage}</span>
                      </div>
                      
                      <div>
                        <p className="text-sm font-medium text-gray-700 mb-2">Equipe Responsável:</p>
                        <div className="flex -space-x-2">
                          {candidate.assignedTo.map((member, index) => (
                            <div key={index} className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center border-2 border-white">
                              <span className="text-xs font-medium text-blue-600">
                                {member.name.split(' ').map(n => n[0]).join('')}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between text-sm">
                        <div className="flex items-center text-gray-500">
                          <MessageSquare className="h-4 w-4 mr-1" />
                          <span>{candidate.comments.length} comentários</span>
                        </div>
                        <div className="flex items-center text-gray-500">
                          <Clock className="h-4 w-4 mr-1" />
                          <span>Atualizado há 2h</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'workflows' && (
          <div className="space-y-6">
            {/* Workflows */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {mockWorkflows.map((workflow) => (
                <Card key={workflow.id}>
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle>{workflow.name}</CardTitle>
                        <CardDescription>
                          Prazo: {new Date(workflow.dueDate).toLocaleDateString('pt-BR')}
                        </CardDescription>
                      </div>
                      <Button variant="ghost" size="sm">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {/* Progress */}
                      <div>
                        <div className="flex justify-between text-sm mb-2">
                          <span>Progresso</span>
                          <span>{Math.round((workflow.currentStage / workflow.stages.length) * 100)}%</span>
                        </div>
                        <Progress value={(workflow.currentStage / workflow.stages.length) * 100} className="h-2" />
                      </div>
                      
                      {/* Stages */}
                      <div>
                        <p className="text-sm font-medium text-gray-700 mb-2">Etapas:</p>
                        <div className="space-y-2">
                          {workflow.stages.map((stage, index) => (
                            <div key={index} className={`flex items-center text-sm ${
                              index < workflow.currentStage ? 'text-green-600' :
                              index === workflow.currentStage ? 'text-blue-600 font-medium' :
                              'text-gray-400'
                            }`}>
                              {index < workflow.currentStage ? (
                                <CheckCircle className="h-4 w-4 mr-2" />
                              ) : index === workflow.currentStage ? (
                                <Clock className="h-4 w-4 mr-2" />
                              ) : (
                                <div className="w-4 h-4 border-2 border-gray-300 rounded-full mr-2" />
                              )}
                              <span>{stage}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                      
                      {/* Assigned Members */}
                      <div>
                        <p className="text-sm font-medium text-gray-700 mb-2">Responsáveis:</p>
                        <div className="flex -space-x-2">
                          {workflow.assignedMembers.map((member, index) => (
                            <div key={index} className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center border-2 border-white">
                              <span className="text-xs font-medium text-blue-600">
                                {member.name.split(' ').map(n => n[0]).join('')}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}
      </main>

      {/* Candidate Detail Modal */}
      {selectedCandidate && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50" onClick={() => setSelectedCandidate(null)}>
          <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            <div className="p-6">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">{selectedCandidate.name}</h2>
                  <p className="text-gray-600">{selectedCandidate.position}</p>
                  <div className="flex items-center space-x-3 mt-2">
                    <Badge className={getCandidateStatusColor(selectedCandidate.status)}>
                      {selectedCandidate.status === 'new' ? 'Novo' :
                       selectedCandidate.status === 'reviewing' ? 'Em Análise' :
                       selectedCandidate.status === 'interview' ? 'Entrevista' :
                       selectedCandidate.status === 'approved' ? 'Aprovado' : 'Rejeitado'}
                    </Badge>
                    <div className="flex items-center">
                      <Star className="h-4 w-4 text-yellow-500 fill-current" />
                      <span className="ml-1 text-sm font-medium">{selectedCandidate.rating}</span>
                    </div>
                  </div>
                </div>
                <Button variant="ghost" onClick={() => setSelectedCandidate(null)}>
                  ×
                </Button>
              </div>
              
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Comments Section */}
                <div className="lg:col-span-2">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center">
                        <MessageSquare className="h-5 w-5 mr-2" />
                        Discussão da Equipe
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4 mb-4 max-h-96 overflow-y-auto">
                        {selectedCandidate.comments.map((comment) => (
                          <div key={comment.id} className="flex space-x-3">
                            <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                              <span className="text-xs font-medium text-blue-600">
                                {comment.author.name.split(' ').map(n => n[0]).join('')}
                              </span>
                            </div>
                            <div className="flex-1">
                              <div className="flex items-center space-x-2 mb-1">
                                <span className="font-medium text-sm">{comment.author.name}</span>
                                <Badge variant="outline" className="text-xs">
                                  {comment.type === 'comment' ? 'Comentário' :
                                   comment.type === 'evaluation' ? 'Avaliação' : 'Decisão'}
                                </Badge>
                                <span className="text-xs text-gray-500">
                                  {new Date(comment.timestamp).toLocaleString('pt-BR')}
                                </span>
                              </div>
                              <p className="text-sm text-gray-700">{comment.content}</p>
                              {comment.rating && (
                                <div className="flex items-center mt-1">
                                  {[...Array(5)].map((_, i) => (
                                    <Star 
                                      key={i} 
                                      className={`h-3 w-3 ${
                                        i < comment.rating! ? 'text-yellow-500 fill-current' : 'text-gray-300'
                                      }`} 
                                    />
                                  ))}
                                </div>
                              )}
                              <div className="flex items-center space-x-3 mt-2">
                                <Button variant="ghost" size="sm" className="text-xs">
                                  <ThumbsUp className="h-3 w-3 mr-1" />
                                  Curtir
                                </Button>
                                <Button variant="ghost" size="sm" className="text-xs">
                                  <Reply className="h-3 w-3 mr-1" />
                                  Responder
                                </Button>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                      
                      {/* Add Comment */}
                      <div className="border-t pt-4">
                        <div className="flex space-x-3">
                          <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                            <User className="h-4 w-4 text-blue-600" />
                          </div>
                          <div className="flex-1">
                            <Input
                              placeholder="Adicionar comentário..."
                              value={newComment}
                              onChange={(e) => setNewComment(e.target.value)}
                              onKeyPress={(e) => e.key === 'Enter' && handleAddComment()}
                            />
                            <div className="flex justify-between items-center mt-2">
                              <div className="flex space-x-2">
                                <Button variant="ghost" size="sm">
                                  <Star className="h-4 w-4 mr-1" />
                                  Avaliar
                                </Button>
                                <Button variant="ghost" size="sm">
                                  <CheckCircle className="h-4 w-4 mr-1" />
                                  Decisão
                                </Button>
                              </div>
                              <Button size="sm" onClick={handleAddComment} disabled={!newComment.trim()}>
                                <Send className="h-4 w-4 mr-1" />
                                Enviar
                              </Button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Sidebar */}
                <div className="space-y-4">
                  {/* Assigned Team */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-sm">Equipe Responsável</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        {selectedCandidate.assignedTo.map((member, index) => (
                          <div key={index} className="flex items-center space-x-2">
                            <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center">
                              <span className="text-xs font-medium text-blue-600">
                                {member.name.split(' ').map(n => n[0]).join('')}
                              </span>
                            </div>
                            <span className="text-sm">{member.name}</span>
                            <Badge className={getRoleColor(member.role)} variant="outline">
                              {member.role}
                            </Badge>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>

                  {/* Actions */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-sm">Ações</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-2">
                      <Button className="w-full" size="sm">
                        <Calendar className="h-4 w-4 mr-2" />
                        Agendar Entrevista
                      </Button>
                      <Button variant="outline" className="w-full" size="sm">
                        <Mail className="h-4 w-4 mr-2" />
                        Enviar Email
                      </Button>
                      <Button variant="outline" className="w-full" size="sm">
                        <FileText className="h-4 w-4 mr-2" />
                        Ver CV Completo
                      </Button>
                      <Button variant="outline" className="w-full" size="sm">
                        <Share className="h-4 w-4 mr-2" />
                        Compartilhar
                      </Button>
                    </CardContent>
                  </Card>

                  {/* Stage Progress */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-sm">Progresso</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Etapa Atual</span>
                          <span className="font-medium">{selectedCandidate.stage}</span>
                        </div>
                        <Progress value={60} className="h-2" />
                        <p className="text-xs text-gray-500">3 de 5 etapas concluídas</p>
                      </div>
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