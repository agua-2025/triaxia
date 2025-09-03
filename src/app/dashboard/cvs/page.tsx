'use client'

import { useState, useRef } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Progress } from '@/components/ui/progress'
import { 
  Upload, 
  FileText, 
  Brain, 
  Search, 
  Filter, 
  Download, 
  Eye, 
  Star, 
  Clock, 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  Briefcase, 
  GraduationCap, 
  Award, 
  TrendingUp, 
  CheckCircle, 
  AlertCircle, 
  Zap,
  MoreHorizontal,
  Trash2,
  Send
} from 'lucide-react'

interface CV {
  id: string
  fileName: string
  candidateName: string
  email: string
  phone: string
  location: string
  uploadDate: string
  status: 'Analisando' | 'Analisado' | 'Erro'
  aiScore: number
  matchedJobs: string[]
  skills: string[]
  experience: string
  education: string
  summary: string
  strengths: string[]
  recommendations: string[]
}

const mockCVs: CV[] = [
  {
    id: '1',
    fileName: 'joao_silva_cv.pdf',
    candidateName: 'João Silva',
    email: 'joao.silva@email.com',
    phone: '(11) 99999-9999',
    location: 'São Paulo, SP',
    uploadDate: '2024-01-15T10:30:00Z',
    status: 'Analisado',
    aiScore: 92,
    matchedJobs: ['Desenvolvedor Full Stack Senior', 'Tech Lead'],
    skills: ['React', 'Node.js', 'TypeScript', 'PostgreSQL', 'AWS', 'Docker'],
    experience: '8 anos',
    education: 'Bacharelado em Ciência da Computação',
    summary: 'Desenvolvedor experiente com forte background em tecnologias web modernas.',
    strengths: ['Liderança técnica', 'Arquitetura de software', 'Metodologias ágeis'],
    recommendations: ['Ideal para posições de liderança', 'Forte fit cultural', 'Experiência relevante']
  },
  {
    id: '2',
    fileName: 'maria_santos_cv.pdf',
    candidateName: 'Maria Santos',
    email: 'maria.santos@email.com',
    phone: '(21) 88888-8888',
    location: 'Rio de Janeiro, RJ',
    uploadDate: '2024-01-14T14:20:00Z',
    status: 'Analisado',
    aiScore: 88,
    matchedJobs: ['Designer UX/UI', 'Product Designer'],
    skills: ['Figma', 'Adobe Creative Suite', 'Prototipagem', 'Design System', 'User Research'],
    experience: '5 anos',
    education: 'Bacharelado em Design',
    summary: 'Designer UX/UI com experiência em produtos digitais e pesquisa de usuário.',
    strengths: ['Design thinking', 'Pesquisa de usuário', 'Prototipagem rápida'],
    recommendations: ['Excelente portfólio', 'Experiência em startups', 'Visão de produto']
  },
  {
    id: '3',
    fileName: 'carlos_oliveira_cv.pdf',
    candidateName: 'Carlos Oliveira',
    email: 'carlos.oliveira@email.com',
    phone: '(31) 77777-7777',
    location: 'Belo Horizonte, MG',
    uploadDate: '2024-01-13T09:15:00Z',
    status: 'Analisando',
    aiScore: 0,
    matchedJobs: [],
    skills: [],
    experience: '',
    education: '',
    summary: '',
    strengths: [],
    recommendations: []
  }
]

export default function CVsPage() {
  const [cvs, setCvs] = useState<CV[]>(mockCVs)
  const [selectedCV, setSelectedCV] = useState<CV | null>(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState<string>('all')
  const [isUploading, setIsUploading] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const filteredCVs = cvs.filter(cv => {
    const matchesSearch = cv.candidateName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         cv.fileName.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === 'all' || cv.status === statusFilter
    return matchesSearch && matchesStatus
  })

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files
    if (!files) return

    setIsUploading(true)
    
    for (const file of Array.from(files)) {
      const newCV: CV = {
        id: Date.now().toString() + Math.random(),
        fileName: file.name,
        candidateName: 'Analisando...',
        email: '',
        phone: '',
        location: '',
        uploadDate: new Date().toISOString(),
        status: 'Analisando',
        aiScore: 0,
        matchedJobs: [],
        skills: [],
        experience: '',
        education: '',
        summary: '',
        strengths: [],
        recommendations: []
      }
      
      setCvs(prev => [newCV, ...prev])
      
      // Simulate AI analysis
      setTimeout(() => {
        setCvs(prev => prev.map(cv => 
          cv.id === newCV.id 
            ? {
                ...cv,
                status: 'Analisado' as const,
                candidateName: `Candidato ${Math.floor(Math.random() * 1000)}`,
                email: `candidato${Math.floor(Math.random() * 1000)}@email.com`,
                aiScore: Math.floor(Math.random() * 30) + 70,
                skills: ['JavaScript', 'React', 'CSS'],
                experience: `${Math.floor(Math.random() * 8) + 1} anos`,
                education: 'Superior Completo'
              }
            : cv
        ))
      }, 3000)
    }
    
    setIsUploading(false)
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Analisado': return 'bg-green-100 text-green-800'
      case 'Analisando': return 'bg-yellow-100 text-yellow-800'
      case 'Erro': return 'bg-red-100 text-red-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getScoreColor = (score: number) => {
    if (score >= 90) return 'text-green-600'
    if (score >= 80) return 'text-blue-600'
    if (score >= 70) return 'text-yellow-600'
    return 'text-red-600'
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold text-gray-900">Análise de CVs</h1>
              <Badge className="ml-3">{filteredCVs.length} CVs</Badge>
            </div>
            <div className="flex items-center space-x-4">
              <Button variant="outline" size="sm">
                <Filter className="h-4 w-4 mr-2" />
                Filtros
              </Button>
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileUpload}
                multiple
                accept=".pdf,.doc,.docx"
                className="hidden"
              />
              <Button 
                size="sm" 
                onClick={() => fileInputRef.current?.click()}
                disabled={isUploading}
              >
                <Upload className="h-4 w-4 mr-2" />
                {isUploading ? 'Enviando...' : 'Upload CVs'}
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
                placeholder="Buscar por nome ou arquivo..."
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
              <option value="Analisado">Analisado</option>
              <option value="Analisando">Analisando</option>
              <option value="Erro">Erro</option>
            </select>
          </div>
        </div>

        {/* CVs Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {filteredCVs.map((cv) => (
            <Card key={cv.id} className="hover:shadow-lg transition-shadow cursor-pointer" onClick={() => setSelectedCV(cv)}>
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <CardTitle className="text-lg mb-1">{cv.candidateName}</CardTitle>
                    <CardDescription className="text-sm text-gray-600">{cv.fileName}</CardDescription>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Button variant="ghost" size="sm" onClick={(e) => { e.stopPropagation(); }}>
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                <div className="flex items-center justify-between mt-3">
                  <Badge className={getStatusColor(cv.status)}>
                    {cv.status === 'Analisando' && <Clock className="h-3 w-3 mr-1" />}
                    {cv.status === 'Analisado' && <CheckCircle className="h-3 w-3 mr-1" />}
                    {cv.status === 'Erro' && <AlertCircle className="h-3 w-3 mr-1" />}
                    {cv.status}
                  </Badge>
                  {cv.status === 'Analisado' && (
                    <div className={`flex items-center ${getScoreColor(cv.aiScore)}`}>
                      <Brain className="h-4 w-4 mr-1" />
                      <span className="font-semibold">{cv.aiScore}%</span>
                    </div>
                  )}
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {cv.email && (
                    <div className="flex items-center text-sm text-gray-600">
                      <Mail className="h-4 w-4 mr-2" />
                      {cv.email}
                    </div>
                  )}
                  {cv.location && (
                    <div className="flex items-center text-sm text-gray-600">
                      <MapPin className="h-4 w-4 mr-2" />
                      {cv.location}
                    </div>
                  )}
                  {cv.experience && (
                    <div className="flex items-center text-sm text-gray-600">
                      <Briefcase className="h-4 w-4 mr-2" />
                      {cv.experience} de experiência
                    </div>
                  )}
                  
                  {cv.status === 'Analisando' && (
                    <div className="mt-4">
                      <div className="flex justify-between text-sm mb-1">
                        <span>Analisando com IA...</span>
                        <span>75%</span>
                      </div>
                      <Progress value={75} className="h-2" />
                    </div>
                  )}
                  
                  {cv.status === 'Analisado' && cv.skills.length > 0 && (
                    <div>
                      <p className="text-xs text-gray-500 mb-2">Principais Skills:</p>
                      <div className="flex flex-wrap gap-1">
                        {cv.skills.slice(0, 3).map((skill, index) => (
                          <Badge key={index} variant="outline" className="text-xs">
                            {skill}
                          </Badge>
                        ))}
                        {cv.skills.length > 3 && (
                          <Badge variant="outline" className="text-xs">
                            +{cv.skills.length - 3}
                          </Badge>
                        )}
                      </div>
                    </div>
                  )}
                  
                  <div className="flex items-center text-xs text-gray-500">
                    <Clock className="h-3 w-3 mr-1" />
                    {new Date(cv.uploadDate).toLocaleDateString('pt-BR')}
                  </div>
                </div>
                
                {cv.status === 'Analisado' && (
                  <div className="mt-4 pt-4 border-t border-gray-100">
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline" className="flex-1" onClick={(e) => { e.stopPropagation(); }}>
                        <Eye className="h-4 w-4 mr-1" />
                        Ver
                      </Button>
                      <Button size="sm" variant="outline" className="flex-1" onClick={(e) => { e.stopPropagation(); }}>
                        <Send className="h-4 w-4 mr-1" />
                        Match
                      </Button>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Empty State */}
        {filteredCVs.length === 0 && (
          <div className="text-center py-12">
            <div className="mx-auto h-24 w-24 text-gray-400">
              <FileText className="h-full w-full" />
            </div>
            <h3 className="mt-4 text-lg font-medium text-gray-900">Nenhum CV encontrado</h3>
            <p className="mt-2 text-gray-500">
              {searchTerm || statusFilter !== 'all' 
                ? 'Tente ajustar os filtros de busca.' 
                : 'Faça upload dos primeiros CVs para começar a análise.'}
            </p>
            <Button className="mt-4" onClick={() => fileInputRef.current?.click()}>
              <Upload className="h-4 w-4 mr-2" />
              Upload CVs
            </Button>
          </div>
        )}
      </main>

      {/* CV Detail Modal */}
      {selectedCV && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50" onClick={() => setSelectedCV(null)}>
          <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            <div className="p-6">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">{selectedCV.candidateName}</h2>
                  <p className="text-gray-600">{selectedCV.fileName}</p>
                </div>
                <div className="flex items-center space-x-3">
                  {selectedCV.status === 'Analisado' && (
                    <div className={`flex items-center ${getScoreColor(selectedCV.aiScore)}`}>
                      <Brain className="h-5 w-5 mr-2" />
                      <span className="text-xl font-bold">{selectedCV.aiScore}%</span>
                      <span className="text-sm ml-1">AI Score</span>
                    </div>
                  )}
                  <Button variant="ghost" onClick={() => setSelectedCV(null)}>
                    ×
                  </Button>
                </div>
              </div>
              
              {selectedCV.status === 'Analisado' ? (
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  {/* Main Info */}
                  <div className="lg:col-span-2 space-y-6">
                    {/* Contact Info */}
                    <Card>
                      <CardHeader>
                        <CardTitle className="flex items-center">
                          <User className="h-5 w-5 mr-2" />
                          Informações de Contato
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="flex items-center">
                            <Mail className="h-4 w-4 mr-2 text-gray-500" />
                            <span className="text-sm">{selectedCV.email}</span>
                          </div>
                          <div className="flex items-center">
                            <Phone className="h-4 w-4 mr-2 text-gray-500" />
                            <span className="text-sm">{selectedCV.phone}</span>
                          </div>
                          <div className="flex items-center">
                            <MapPin className="h-4 w-4 mr-2 text-gray-500" />
                            <span className="text-sm">{selectedCV.location}</span>
                          </div>
                          <div className="flex items-center">
                            <Briefcase className="h-4 w-4 mr-2 text-gray-500" />
                            <span className="text-sm">{selectedCV.experience}</span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    {/* Summary */}
                    {selectedCV.summary && (
                      <Card>
                        <CardHeader>
                          <CardTitle className="flex items-center">
                            <FileText className="h-5 w-5 mr-2" />
                            Resumo Profissional
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <p className="text-gray-700">{selectedCV.summary}</p>
                        </CardContent>
                      </Card>
                    )}

                    {/* Skills */}
                    {selectedCV.skills.length > 0 && (
                      <Card>
                        <CardHeader>
                          <CardTitle className="flex items-center">
                            <Zap className="h-5 w-5 mr-2" />
                            Habilidades Técnicas
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="flex flex-wrap gap-2">
                            {selectedCV.skills.map((skill, index) => (
                              <Badge key={index} variant="outline">{skill}</Badge>
                            ))}
                          </div>
                        </CardContent>
                      </Card>
                    )}

                    {/* Strengths */}
                    {selectedCV.strengths.length > 0 && (
                      <Card>
                        <CardHeader>
                          <CardTitle className="flex items-center">
                            <Award className="h-5 w-5 mr-2" />
                            Pontos Fortes
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <ul className="space-y-2">
                            {selectedCV.strengths.map((strength, index) => (
                              <li key={index} className="flex items-center">
                                <CheckCircle className="h-4 w-4 mr-2 text-green-500" />
                                <span className="text-sm">{strength}</span>
                              </li>
                            ))}
                          </ul>
                        </CardContent>
                      </Card>
                    )}
                  </div>

                  {/* Sidebar */}
                  <div className="space-y-6">
                    {/* Matched Jobs */}
                    {selectedCV.matchedJobs.length > 0 && (
                      <Card>
                        <CardHeader>
                          <CardTitle className="flex items-center">
                            <TrendingUp className="h-5 w-5 mr-2" />
                            Vagas Compatíveis
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-2">
                            {selectedCV.matchedJobs.map((job, index) => (
                              <div key={index} className="p-2 bg-gray-50 rounded flex items-center justify-between">
                                <span className="text-sm">{job}</span>
                                <Star className="h-4 w-4 text-yellow-500 fill-current" />
                              </div>
                            ))}
                          </div>
                        </CardContent>
                      </Card>
                    )}

                    {/* AI Recommendations */}
                    {selectedCV.recommendations.length > 0 && (
                      <Card>
                        <CardHeader>
                          <CardTitle className="flex items-center">
                            <Brain className="h-5 w-5 mr-2" />
                            Recomendações da IA
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <ul className="space-y-2">
                            {selectedCV.recommendations.map((rec, index) => (
                              <li key={index} className="flex items-start">
                                <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-2 flex-shrink-0"></div>
                                <span className="text-sm text-gray-700">{rec}</span>
                              </li>
                            ))}
                          </ul>
                        </CardContent>
                      </Card>
                    )}

                    {/* Actions */}
                    <Card>
                      <CardHeader>
                        <CardTitle>Ações</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-3">
                        <Button className="w-full">
                          <Send className="h-4 w-4 mr-2" />
                          Enviar para Vaga
                        </Button>
                        <Button variant="outline" className="w-full">
                          <Download className="h-4 w-4 mr-2" />
                          Download CV
                        </Button>
                        <Button variant="outline" className="w-full">
                          <Mail className="h-4 w-4 mr-2" />
                          Contatar Candidato
                        </Button>
                        <Button variant="outline" className="w-full text-red-600 hover:text-red-700">
                          <Trash2 className="h-4 w-4 mr-2" />
                          Remover CV
                        </Button>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              ) : (
                <div className="text-center py-12">
                  <Brain className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">Analisando CV...</h3>
                  <p className="text-gray-500 mb-4">Nossa IA está processando o currículo</p>
                  <Progress value={75} className="max-w-xs mx-auto" />
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}