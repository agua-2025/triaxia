'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { 
  Save, 
  ArrowLeft, 
  Plus, 
  X, 
  MapPin, 
  DollarSign, 
  Users, 
  Clock,
  Building,
  FileText,
  Target,
  Briefcase
} from 'lucide-react'

interface JobForm {
  title: string
  company: string
  location: string
  type: 'CLT' | 'PJ' | 'Freelance' | 'Estágio'
  salaryMin: string
  salaryMax: string
  description: string
  requirements: string[]
  benefits: string[]
  experience: string
  education: string
  status: 'Ativa' | 'Pausada' | 'Rascunho'
}

const initialForm: JobForm = {
  title: '',
  company: '',
  location: '',
  type: 'CLT',
  salaryMin: '',
  salaryMax: '',
  description: '',
  requirements: [],
  benefits: [],
  experience: '',
  education: '',
  status: 'Rascunho'
}

export default function NovaVagaPage() {
  const [form, setForm] = useState<JobForm>(initialForm)
  const [newRequirement, setNewRequirement] = useState('')
  const [newBenefit, setNewBenefit] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleInputChange = (field: keyof JobForm, value: string) => {
    setForm(prev => ({ ...prev, [field]: value }))
  }

  const addRequirement = () => {
    if (newRequirement.trim()) {
      setForm(prev => ({
        ...prev,
        requirements: [...prev.requirements, newRequirement.trim()]
      }))
      setNewRequirement('')
    }
  }

  const removeRequirement = (index: number) => {
    setForm(prev => ({
      ...prev,
      requirements: prev.requirements.filter((_, i) => i !== index)
    }))
  }

  const addBenefit = () => {
    if (newBenefit.trim()) {
      setForm(prev => ({
        ...prev,
        benefits: [...prev.benefits, newBenefit.trim()]
      }))
      setNewBenefit('')
    }
  }

  const removeBenefit = (index: number) => {
    setForm(prev => ({
      ...prev,
      benefits: prev.benefits.filter((_, i) => i !== index)
    }))
  }

  const handleSubmit = async (status: 'Ativa' | 'Pausada' | 'Rascunho') => {
    setIsSubmitting(true)
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    const jobData = {
      ...form,
      status,
      id: Date.now().toString(),
      candidates: 0,
      matchRate: 0,
      createdAt: new Date().toISOString()
    }
    
    console.log('Vaga criada:', jobData)
    setIsSubmitting(false)
    
    // Redirect to jobs list
    // router.push('/dashboard/vagas')
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Button variant="ghost" size="sm" className="mr-4">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Voltar
              </Button>
              <h1 className="text-2xl font-bold text-gray-900">Nova Vaga</h1>
            </div>
            <div className="flex items-center space-x-3">
              <Button 
                variant="outline" 
                onClick={() => handleSubmit('Rascunho')}
                disabled={isSubmitting}
              >
                <Save className="h-4 w-4 mr-2" />
                Salvar Rascunho
              </Button>
              <Button 
                onClick={() => handleSubmit('Ativa')}
                disabled={isSubmitting || !form.title || !form.description}
              >
                <Save className="h-4 w-4 mr-2" />
                Publicar Vaga
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Form */}
          <div className="lg:col-span-2 space-y-6">
            {/* Basic Information */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Briefcase className="h-5 w-5 mr-2" />
                  Informações Básicas
                </CardTitle>
                <CardDescription>
                  Defina as informações principais da vaga
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Título da Vaga *
                  </label>
                  <Input
                    placeholder="Ex: Desenvolvedor Full Stack Senior"
                    value={form.title}
                    onChange={(e) => handleInputChange('title', e.target.value)}
                  />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Empresa
                    </label>
                    <Input
                      placeholder="Nome da empresa"
                      value={form.company}
                      onChange={(e) => handleInputChange('company', e.target.value)}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Localização
                    </label>
                    <Input
                      placeholder="São Paulo, SP ou Remoto"
                      value={form.location}
                      onChange={(e) => handleInputChange('location', e.target.value)}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Tipo de Contrato
                    </label>
                    <select 
                      value={form.type}
                      onChange={(e) => handleInputChange('type', e.target.value as any)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="CLT">CLT</option>
                      <option value="PJ">PJ</option>
                      <option value="Freelance">Freelance</option>
                      <option value="Estágio">Estágio</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Salário Mínimo
                    </label>
                    <Input
                      placeholder="R$ 5.000"
                      value={form.salaryMin}
                      onChange={(e) => handleInputChange('salaryMin', e.target.value)}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Salário Máximo
                    </label>
                    <Input
                      placeholder="R$ 8.000"
                      value={form.salaryMax}
                      onChange={(e) => handleInputChange('salaryMax', e.target.value)}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Job Description */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <FileText className="h-5 w-5 mr-2" />
                  Descrição da Vaga
                </CardTitle>
                <CardDescription>
                  Descreva as responsabilidades e o que a pessoa fará
                </CardDescription>
              </CardHeader>
              <CardContent>
                <textarea
                  placeholder="Descreva as principais responsabilidades, objetivos e o que a pessoa fará no dia a dia..."
                  value={form.description}
                  onChange={(e) => handleInputChange('description', e.target.value)}
                  rows={6}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                />
              </CardContent>
            </Card>

            {/* Requirements */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Target className="h-5 w-5 mr-2" />
                  Requisitos
                </CardTitle>
                <CardDescription>
                  Adicione as habilidades e experiências necessárias
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex gap-2">
                  <Input
                    placeholder="Ex: React, Node.js, 3+ anos experiência"
                    value={newRequirement}
                    onChange={(e) => setNewRequirement(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && addRequirement()}
                  />
                  <Button onClick={addRequirement} size="sm">
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
                
                {form.requirements.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {form.requirements.map((req, index) => (
                      <Badge key={index} variant="outline" className="flex items-center gap-1">
                        {req}
                        <button onClick={() => removeRequirement(index)}>
                          <X className="h-3 w-3" />
                        </button>
                      </Badge>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Benefits */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Users className="h-5 w-5 mr-2" />
                  Benefícios
                </CardTitle>
                <CardDescription>
                  Adicione os benefícios oferecidos pela empresa
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex gap-2">
                  <Input
                    placeholder="Ex: Vale refeição, Plano de saúde, Home office"
                    value={newBenefit}
                    onChange={(e) => setNewBenefit(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && addBenefit()}
                  />
                  <Button onClick={addBenefit} size="sm">
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
                
                {form.benefits.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {form.benefits.map((benefit, index) => (
                      <Badge key={index} variant="outline" className="flex items-center gap-1">
                        {benefit}
                        <button onClick={() => removeBenefit(index)}>
                          <X className="h-3 w-3" />
                        </button>
                      </Badge>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Preview */}
            <Card>
              <CardHeader>
                <CardTitle>Preview da Vaga</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div>
                    <h3 className="font-semibold text-lg">
                      {form.title || 'Título da vaga'}
                    </h3>
                    <p className="text-gray-600">{form.company || 'Nome da empresa'}</p>
                  </div>
                  
                  {form.location && (
                    <div className="flex items-center text-sm text-gray-600">
                      <MapPin className="h-4 w-4 mr-2" />
                      {form.location}
                    </div>
                  )}
                  
                  {(form.salaryMin || form.salaryMax) && (
                    <div className="flex items-center text-sm text-gray-600">
                      <DollarSign className="h-4 w-4 mr-2" />
                      {form.salaryMin && form.salaryMax 
                        ? `${form.salaryMin} - ${form.salaryMax}`
                        : form.salaryMin || form.salaryMax}
                    </div>
                  )}
                  
                  <Badge variant="outline">{form.type}</Badge>
                  
                  {form.description && (
                    <div className="mt-4">
                      <h4 className="font-medium mb-2">Descrição</h4>
                      <p className="text-sm text-gray-700 line-clamp-3">
                        {form.description}
                      </p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Additional Info */}
            <Card>
              <CardHeader>
                <CardTitle>Informações Adicionais</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Experiência Mínima
                  </label>
                  <select 
                    value={form.experience}
                    onChange={(e) => handleInputChange('experience', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">Selecione</option>
                    <option value="Sem experiência">Sem experiência</option>
                    <option value="1-2 anos">1-2 anos</option>
                    <option value="3-5 anos">3-5 anos</option>
                    <option value="5+ anos">5+ anos</option>
                    <option value="10+ anos">10+ anos</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Escolaridade
                  </label>
                  <select 
                    value={form.education}
                    onChange={(e) => handleInputChange('education', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">Selecione</option>
                    <option value="Ensino Médio">Ensino Médio</option>
                    <option value="Técnico">Técnico</option>
                    <option value="Superior Incompleto">Superior Incompleto</option>
                    <option value="Superior Completo">Superior Completo</option>
                    <option value="Pós-graduação">Pós-graduação</option>
                    <option value="Mestrado">Mestrado</option>
                    <option value="Doutorado">Doutorado</option>
                  </select>
                </div>
              </CardContent>
            </Card>

            {/* Tips */}
            <Card>
              <CardHeader>
                <CardTitle>💡 Dicas</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 text-sm text-gray-600">
                  <p>• Use títulos claros e específicos</p>
                  <p>• Seja detalhado na descrição</p>
                  <p>• Liste requisitos essenciais</p>
                  <p>• Destaque os benefícios</p>
                  <p>• Revise antes de publicar</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  )
}