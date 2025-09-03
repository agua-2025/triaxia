'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { 
  Upload, 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  Briefcase, 
  GraduationCap, 
  Calendar, 
  FileText, 
  CheckCircle, 
  AlertCircle, 
  Loader2, 
  Star, 
  Award, 
  Globe, 
  Github, 
  Linkedin, 
  Send, 
  ArrowRight, 
  Building, 
  Clock, 
  Target
} from 'lucide-react'

interface FormData {
  nome: string
  email: string
  telefone: string
  cidade: string
  estado: string
  linkedin: string
  github: string
  website: string
  experiencia: string
  escolaridade: string
  area_interesse: string
  salario_pretendido: string
  disponibilidade: string
  resumo_profissional: string
  habilidades: string[]
  idiomas: string[]
}

interface Vaga {
  id: string
  titulo: string
  empresa: string
  localizacao: string
  tipo: string
  salario: string
  descricao: string
  requisitos: string[]
  beneficios: string[]
  match_score?: number
}

export default function CandidatosPage() {
  const [step, setStep] = useState(1)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitSuccess, setSubmitSuccess] = useState(false)
  const [cvFile, setCvFile] = useState<File | null>(null)
  const [dragActive, setDragActive] = useState(false)
  
  // Informações da empresa/tenant (normalmente viria do contexto ou URL)
  const empresaInfo = {
    nome: 'Triaxia Recrutamento',
    logo: '/logo-empresa.png',
    descricao: 'Plataforma de recrutamento inteligente com IA',
    website: 'https://triaxia.com'
  }
  const [formData, setFormData] = useState<FormData>({
    nome: '',
    email: '',
    telefone: '',
    cidade: '',
    estado: '',
    linkedin: '',
    github: '',
    website: '',
    experiencia: '',
    escolaridade: '',
    area_interesse: '',
    salario_pretendido: '',
    disponibilidade: '',
    resumo_profissional: '',
    habilidades: [],
    idiomas: []
  })

  // Dados mockados de vagas disponíveis
  const vagasDisponiveis: Vaga[] = [
    {
      id: '1',
      titulo: 'Desenvolvedor Full Stack',
      empresa: 'TechCorp',
      localizacao: 'São Paulo, SP',
      tipo: 'CLT',
      salario: 'R$ 8.000 - R$ 12.000',
      descricao: 'Desenvolvimento de aplicações web modernas',
      requisitos: ['React', 'Node.js', 'TypeScript', '3+ anos experiência'],
      beneficios: ['Vale refeição', 'Plano de saúde', 'Home office'],
      match_score: 92
    },
    {
      id: '2',
      titulo: 'Product Manager',
      empresa: 'StartupXYZ',
      localizacao: 'Rio de Janeiro, RJ',
      tipo: 'CLT',
      salario: 'R$ 10.000 - R$ 15.000',
      descricao: 'Gestão de produtos digitais',
      requisitos: ['Experiência em produtos', 'Metodologias ágeis', '5+ anos'],
      beneficios: ['Stock options', 'Flexibilidade', 'Desenvolvimento'],
      match_score: 85
    },
    {
      id: '3',
      titulo: 'UX/UI Designer',
      empresa: 'DesignStudio',
      localizacao: 'Belo Horizonte, MG',
      tipo: 'PJ',
      salario: 'R$ 6.000 - R$ 9.000',
      descricao: 'Design de interfaces e experiência do usuário',
      requisitos: ['Figma', 'Adobe Creative', 'Portfolio', '2+ anos'],
      beneficios: ['Horário flexível', 'Projetos variados', 'Mentoria'],
      match_score: 78
    }
  ]

  const handleInputChange = (field: keyof FormData, value: string | string[]) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const handleFileUpload = (file: File) => {
    setCvFile(file)
  }

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true)
    } else if (e.type === 'dragleave') {
      setDragActive(false)
    }
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileUpload(e.dataTransfer.files[0])
    }
  }

  const handleSubmit = async () => {
    setIsSubmitting(true)
    
    // Simular envio
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    setIsSubmitting(false)
    setSubmitSuccess(true)
  }

  const nextStep = () => {
    if (step < 4) setStep(step + 1)
  }

  const prevStep = () => {
    if (step > 1) setStep(step - 1)
  }

  const getStepTitle = () => {
    switch (step) {
      case 1: return 'Informações Pessoais'
      case 2: return 'Upload do Currículo'
      case 3: return 'Informações Profissionais'
      case 4: return 'Vagas Recomendadas'
      default: return ''
    }
  }

  if (submitSuccess) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
        <Card className="w-full max-w-2xl">
          <CardContent className="p-8 text-center">
            <div className="mb-6">
              <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Candidatura Enviada!</h1>
              <p className="text-gray-600 text-lg">
                Obrigado por se candidatar! Analisaremos seu perfil e entraremos em contato em breve.
              </p>
            </div>
            
            <div className="bg-blue-50 rounded-lg p-6 mb-6">
              <h3 className="font-semibold text-blue-900 mb-2">Próximos Passos:</h3>
              <ul className="text-blue-800 text-left space-y-2">
                <li className="flex items-center">
                  <CheckCircle className="h-4 w-4 mr-2" />
                  Análise do seu CV com nossa IA
                </li>
                <li className="flex items-center">
                  <CheckCircle className="h-4 w-4 mr-2" />
                  Matching com vagas compatíveis
                </li>
                <li className="flex items-center">
                  <CheckCircle className="h-4 w-4 mr-2" />
                  Contato da nossa equipe de RH
                </li>
              </ul>
            </div>
            
            <Button 
              onClick={() => window.location.reload()}
              className="bg-blue-600 hover:bg-blue-700"
            >
              Enviar Nova Candidatura
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-4xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="bg-blue-600 text-white p-3 rounded-lg">
                <Building className="h-8 w-8" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">{empresaInfo.nome}</h1>
                <p className="text-gray-600">{empresaInfo.descricao}</p>
                <p className="text-sm text-blue-600">Envie seu currículo e encontre oportunidades incríveis</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-sm text-gray-500">Etapa {step} de 4</p>
              <Progress value={(step / 4) * 100} className="w-32 mt-1" />
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto p-4 py-8">
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center">
              {step === 1 && <User className="h-5 w-5 mr-2" />}
              {step === 2 && <Upload className="h-5 w-5 mr-2" />}
              {step === 3 && <Briefcase className="h-5 w-5 mr-2" />}
              {step === 4 && <Target className="h-5 w-5 mr-2" />}
              {getStepTitle()}
            </CardTitle>
            <CardDescription>
              {step === 1 && 'Conte-nos um pouco sobre você'}
              {step === 2 && 'Faça upload do seu currículo para análise com IA'}
              {step === 3 && 'Informações sobre sua carreira e objetivos'}
              {step === 4 && 'Vagas que combinam com seu perfil'}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Etapa 1: Informações Pessoais */}
            {step === 1 && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Nome Completo *
                  </label>
                  <input
                    type="text"
                    value={formData.nome}
                    onChange={(e) => handleInputChange('nome', e.target.value)}
                    className="w-full h-10 rounded-md border border-input bg-background px-3 py-2 text-sm"
                    placeholder="Seu nome completo"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    E-mail *
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    className="w-full h-10 rounded-md border border-input bg-background px-3 py-2 text-sm"
                    placeholder="seu@email.com"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Telefone *
                  </label>
                  <input
                    type="tel"
                    value={formData.telefone}
                    onChange={(e) => handleInputChange('telefone', e.target.value)}
                    className="w-full h-10 rounded-md border border-input bg-background px-3 py-2 text-sm"
                    placeholder="(11) 99999-9999"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Cidade *
                  </label>
                  <input
                    type="text"
                    value={formData.cidade}
                    onChange={(e) => handleInputChange('cidade', e.target.value)}
                    className="w-full h-10 rounded-md border border-input bg-background px-3 py-2 text-sm"
                    placeholder="São Paulo"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    LinkedIn
                  </label>
                  <input
                    type="url"
                    value={formData.linkedin}
                    onChange={(e) => handleInputChange('linkedin', e.target.value)}
                    className="w-full h-10 rounded-md border border-input bg-background px-3 py-2 text-sm"
                    placeholder="https://linkedin.com/in/seuperfil"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    GitHub
                  </label>
                  <input
                    type="url"
                    value={formData.github}
                    onChange={(e) => handleInputChange('github', e.target.value)}
                    className="w-full h-10 rounded-md border border-input bg-background px-3 py-2 text-sm"
                    placeholder="https://github.com/seuusuario"
                  />
                </div>
              </div>
            )}

            {/* Etapa 2: Upload do CV */}
            {step === 2 && (
              <div className="space-y-6">
                <div
                  className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
                    dragActive ? 'border-blue-500 bg-blue-50' : 'border-gray-300'
                  }`}
                  onDragEnter={handleDrag}
                  onDragLeave={handleDrag}
                  onDragOver={handleDrag}
                  onDrop={handleDrop}
                >
                  {cvFile ? (
                    <div className="space-y-4">
                      <CheckCircle className="h-12 w-12 text-green-500 mx-auto" />
                      <div>
                        <p className="text-lg font-medium text-gray-900">{cvFile.name}</p>
                        <p className="text-sm text-gray-500">
                          {(cvFile.size / 1024 / 1024).toFixed(2)} MB
                        </p>
                      </div>
                      <Button
                        variant="outline"
                        onClick={() => setCvFile(null)}
                        className="mt-2"
                      >
                        Remover Arquivo
                      </Button>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      <Upload className="h-12 w-12 text-gray-400 mx-auto" />
                      <div>
                        <p className="text-lg font-medium text-gray-900">
                          Arraste seu currículo aqui
                        </p>
                        <p className="text-sm text-gray-500">
                          ou clique para selecionar (PDF, DOC, DOCX - máx. 10MB)
                        </p>
                      </div>
                      <input
                        type="file"
                        accept=".pdf,.doc,.docx"
                        onChange={(e) => e.target.files?.[0] && handleFileUpload(e.target.files[0])}
                        className="hidden"
                        id="cv-upload"
                      />
                      <Button
                        onClick={() => document.getElementById('cv-upload')?.click()}
                        className="bg-blue-600 hover:bg-blue-700"
                      >
                        Selecionar Arquivo
                      </Button>
                    </div>
                  )}
                </div>
                
                {cvFile && (
                  <div className="bg-blue-50 rounded-lg p-4">
                    <div className="flex items-start">
                      <Loader2 className="h-5 w-5 text-blue-600 animate-spin mt-0.5 mr-3" />
                      <div>
                        <h4 className="font-medium text-blue-900">Análise com IA em Andamento</h4>
                        <p className="text-sm text-blue-700 mt-1">
                          Nossa IA está analisando seu currículo para identificar habilidades, experiências e compatibilidade com vagas.
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Etapa 3: Informações Profissionais */}
            {step === 3 && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Nível de Experiência *
                    </label>
                    <select
                      value={formData.experiencia}
                      onChange={(e) => handleInputChange('experiencia', e.target.value)}
                      className="w-full h-10 rounded-md border border-input bg-background px-3 py-2 text-sm"
                    >
                      <option value="">Selecione...</option>
                      <option value="junior">Júnior (0-2 anos)</option>
                      <option value="pleno">Pleno (3-5 anos)</option>
                      <option value="senior">Sênior (6+ anos)</option>
                      <option value="especialista">Especialista (10+ anos)</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Escolaridade *
                    </label>
                    <select
                      value={formData.escolaridade}
                      onChange={(e) => handleInputChange('escolaridade', e.target.value)}
                      className="w-full h-10 rounded-md border border-input bg-background px-3 py-2 text-sm"
                    >
                      <option value="">Selecione...</option>
                      <option value="medio">Ensino Médio</option>
                      <option value="tecnico">Técnico</option>
                      <option value="superior">Superior</option>
                      <option value="pos">Pós-graduação</option>
                      <option value="mestrado">Mestrado</option>
                      <option value="doutorado">Doutorado</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Área de Interesse *
                    </label>
                    <select
                      value={formData.area_interesse}
                      onChange={(e) => handleInputChange('area_interesse', e.target.value)}
                      className="w-full h-10 rounded-md border border-input bg-background px-3 py-2 text-sm"
                    >
                      <option value="">Selecione...</option>
                      <option value="tecnologia">Tecnologia</option>
                      <option value="marketing">Marketing</option>
                      <option value="vendas">Vendas</option>
                      <option value="rh">Recursos Humanos</option>
                      <option value="financeiro">Financeiro</option>
                      <option value="operacoes">Operações</option>
                      <option value="design">Design</option>
                      <option value="produto">Produto</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Salário Pretendido
                    </label>
                    <select
                      value={formData.salario_pretendido}
                      onChange={(e) => handleInputChange('salario_pretendido', e.target.value)}
                      className="w-full h-10 rounded-md border border-input bg-background px-3 py-2 text-sm"
                    >
                      <option value="">Selecione...</option>
                      <option value="ate-3k">Até R$ 3.000</option>
                      <option value="3k-5k">R$ 3.000 - R$ 5.000</option>
                      <option value="5k-8k">R$ 5.000 - R$ 8.000</option>
                      <option value="8k-12k">R$ 8.000 - R$ 12.000</option>
                      <option value="12k-20k">R$ 12.000 - R$ 20.000</option>
                      <option value="acima-20k">Acima de R$ 20.000</option>
                    </select>
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Resumo Profissional
                  </label>
                  <textarea
                    value={formData.resumo_profissional}
                    onChange={(e) => handleInputChange('resumo_profissional', e.target.value)}
                    rows={4}
                    className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                    placeholder="Conte um pouco sobre sua trajetória profissional, principais conquistas e objetivos..."
                  />
                </div>
              </div>
            )}

            {/* Etapa 4: Vagas Recomendadas */}
            {step === 4 && (
              <div className="space-y-6">
                <div className="text-center mb-6">
                  <Star className="h-12 w-12 text-yellow-500 mx-auto mb-2" />
                  <h3 className="text-xl font-semibold text-gray-900">Vagas Recomendadas para Você</h3>
                  <p className="text-gray-600">Baseado na análise do seu perfil, encontramos estas oportunidades</p>
                </div>
                
                <div className="grid gap-6">
                  {vagasDisponiveis.map((vaga) => (
                    <Card key={vaga.id} className="border-l-4 border-l-blue-500">
                      <CardContent className="p-6">
                        <div className="flex justify-between items-start mb-4">
                          <div>
                            <h4 className="text-lg font-semibold text-gray-900">{vaga.titulo}</h4>
                            <p className="text-gray-600 flex items-center mt-1">
                              <Building className="h-4 w-4 mr-1" />
                              {vaga.empresa} • {vaga.localizacao}
                            </p>
                          </div>
                          <div className="text-right">
                            <Badge className="bg-green-100 text-green-800 mb-2">
                              {vaga.match_score}% Match
                            </Badge>
                            <p className="text-sm font-medium text-gray-900">{vaga.salario}</p>
                          </div>
                        </div>
                        
                        <p className="text-gray-700 mb-4">{vaga.descricao}</p>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                          <div>
                            <h5 className="font-medium text-gray-900 mb-2">Requisitos:</h5>
                            <div className="flex flex-wrap gap-1">
                              {vaga.requisitos.map((req, index) => (
                                <Badge key={index} variant="outline" className="text-xs">
                                  {req}
                                </Badge>
                              ))}
                            </div>
                          </div>
                          <div>
                            <h5 className="font-medium text-gray-900 mb-2">Benefícios:</h5>
                            <div className="flex flex-wrap gap-1">
                              {vaga.beneficios.map((beneficio, index) => (
                                <Badge key={index} variant="outline" className="text-xs bg-blue-50">
                                  {beneficio}
                                </Badge>
                              ))}
                            </div>
                          </div>
                        </div>
                        
                        <div className="flex justify-between items-center">
                          <div className="flex items-center text-sm text-gray-500">
                            <Clock className="h-4 w-4 mr-1" />
                            Publicada há 2 dias
                          </div>
                          <Button className="bg-blue-600 hover:bg-blue-700">
                            <Send className="h-4 w-4 mr-2" />
                            Candidatar-se
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            )}

            {/* Navegação */}
            <div className="flex justify-between pt-6 border-t">
              <Button
                variant="outline"
                onClick={prevStep}
                disabled={step === 1}
              >
                Anterior
              </Button>
              
              {step < 4 ? (
                <Button
                  onClick={nextStep}
                  className="bg-blue-600 hover:bg-blue-700"
                  disabled={step === 1 && (!formData.nome || !formData.email || !formData.telefone)}
                >
                  Próximo
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
              ) : (
                <Button
                  onClick={handleSubmit}
                  disabled={isSubmitting}
                  className="bg-green-600 hover:bg-green-700"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                      Enviando...
                    </>
                  ) : (
                    <>
                      <Send className="h-4 w-4 mr-2" />
                      Finalizar Candidatura
                    </>
                  )}
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}