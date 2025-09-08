'use client'

import { useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { ArrowLeft, Save } from 'lucide-react'

interface JobFormData {
  title: string
  department: string
  location: string
  type: 'Tempo Integral' | 'Meio Período' | 'Contrato' | 'Estágio'
  level: 'Júnior' | 'Pleno' | 'Sênior' | 'Especialista'
  salary: string
  description: string
  requirements: string
  benefits: string
}

export default function NovaVagaPage() {
  const params = useParams()
  const router = useRouter()
  const tenantSlug = params?.tenant as string
  
  const [formData, setFormData] = useState<JobFormData>({
    title: '',
    department: '',
    location: '',
    type: 'Tempo Integral',
    level: 'Pleno',
    salary: '',
    description: '',
    requirements: '',
    benefits: ''
  })
  
  const [isSubmitting, setIsSubmitting] = useState(false)
  
  const handleInputChange = (field: keyof JobFormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    // Validação no lado do cliente
    if (!formData.title.trim()) {
      alert('Título da vaga é obrigatório')
      setIsSubmitting(false)
      return
    }
    if (!formData.department.trim()) {
      alert('Departamento é obrigatório')
      setIsSubmitting(false)
      return
    }
    if (!formData.location.trim()) {
      alert('Localização é obrigatória')
      setIsSubmitting(false)
      return
    }
    if (!formData.type.trim()) {
      alert('Tipo de contrato é obrigatório')
      setIsSubmitting(false)
      return
    }
    if (!formData.level.trim()) {
      alert('Nível da vaga é obrigatório')
      setIsSubmitting(false)
      return
    }
    if (!formData.description.trim()) {
      alert('Descrição da vaga é obrigatória')
      setIsSubmitting(false)
      return
    }
    if (!formData.requirements.trim()) {
      alert('Requisitos são obrigatórios')
      setIsSubmitting(false)
      return
    }
    
    console.log('Dados do formulário antes do envio:', formData)
    
    try {
      const response = await fetch(`/api/${tenantSlug}/jobs`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          requirements: formData.requirements.split('\n').filter(req => req.trim()),
          benefits: formData.benefits.split('\n').filter(benefit => benefit.trim())
        })
      })
      
      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || 'Erro ao criar vaga')
      }
      
      const result = await response.json()
      console.log('Vaga criada com sucesso:', result)
      
      // Redirecionar de volta para a lista de vagas
      router.push(`/${tenantSlug}/dashboard/vagas`)
    } catch (error) {
      console.error('Erro ao criar vaga:', error)
      const errorMessage = error instanceof Error ? error.message : 'Erro desconhecido ao criar vaga'
      alert(`Erro ao criar vaga: ${errorMessage}`)
    } finally {
      setIsSubmitting(false)
    }
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
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-4 mb-4">
            <Link href={`/${tenantSlug}/dashboard/vagas`}>
              <Button variant="outline" size="sm">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Voltar
              </Button>
            </Link>
          </div>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Nova Vaga</h1>
            <p className="text-gray-600 mt-2">
              Preencha as informações abaixo para criar uma nova vaga
            </p>
          </div>
        </div>
        
        {/* Form */}
        <form onSubmit={handleSubmit}>
          <div className="space-y-6">
            {/* Informações Básicas */}
            <Card>
              <CardHeader>
                <CardTitle>Informações Básicas</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Título da Vaga *
                    </label>
                    <Input
                      value={formData.title}
                      onChange={(e) => handleInputChange('title', e.target.value)}
                      placeholder="Ex: Desenvolvedor Frontend React"
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Departamento *
                    </label>
                    <Input
                      value={formData.department}
                      onChange={(e) => handleInputChange('department', e.target.value)}
                      placeholder="Ex: Tecnologia"
                      required
                    />
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Localização *
                    </label>
                    <Input
                      value={formData.location}
                      onChange={(e) => handleInputChange('location', e.target.value)}
                      placeholder="Ex: São Paulo, SP"
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Tipo de Contrato *
                    </label>
                    <Select value={formData.type} onValueChange={(value) => handleInputChange('type', value)}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Tempo Integral">Tempo Integral</SelectItem>
                        <SelectItem value="Meio Período">Meio Período</SelectItem>
                        <SelectItem value="Contrato">Contrato</SelectItem>
                        <SelectItem value="Estágio">Estágio</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Nível *
                    </label>
                    <Select value={formData.level} onValueChange={(value) => handleInputChange('level', value)}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Júnior">Júnior</SelectItem>
                        <SelectItem value="Pleno">Pleno</SelectItem>
                        <SelectItem value="Sênior">Sênior</SelectItem>
                        <SelectItem value="Especialista">Especialista</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Faixa Salarial
                  </label>
                  <Input
                    value={formData.salary}
                    onChange={(e) => handleInputChange('salary', e.target.value)}
                    placeholder="Ex: R$ 5.000 - R$ 8.000"
                  />
                </div>
              </CardContent>
            </Card>
            
            {/* Descrição e Requisitos */}
            <Card>
              <CardHeader>
                <CardTitle>Descrição e Requisitos</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Descrição da Vaga *
                  </label>
                  <Textarea
                    value={formData.description}
                    onChange={(e) => handleInputChange('description', e.target.value)}
                    placeholder="Descreva as principais responsabilidades e atividades da vaga..."
                    rows={4}
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Requisitos *
                  </label>
                  <Textarea
                    value={formData.requirements}
                    onChange={(e) => handleInputChange('requirements', e.target.value)}
                    placeholder="Liste os requisitos técnicos e experiências necessárias..."
                    rows={4}
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Benefícios
                  </label>
                  <Textarea
                    value={formData.benefits}
                    onChange={(e) => handleInputChange('benefits', e.target.value)}
                    placeholder="Descreva os benefícios oferecidos pela empresa..."
                    rows={3}
                  />
                </div>
              </CardContent>
            </Card>
            
            {/* Actions */}
            <div className="flex items-center justify-end gap-4">
              <Link href={`/${tenantSlug}/dashboard/vagas`}>
                <Button type="button" variant="outline">
                  Cancelar
                </Button>
              </Link>
              <Button type="submit" disabled={isSubmitting}>
                <Save className="w-4 h-4 mr-2" />
                {isSubmitting ? 'Salvando...' : 'Criar Vaga'}
              </Button>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}