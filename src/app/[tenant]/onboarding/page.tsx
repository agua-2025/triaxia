'use client'

import { useState, useEffect } from 'react'
import { useRouter, useParams } from 'next/navigation'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { 
  CheckCircle, 
  Building2, 
  Users, 
  Settings, 
  ArrowRight, 
  ArrowLeft,
  Loader2,
  Sparkles,
  Target,
  Zap
} from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import Link from 'next/link'

interface OnboardingStep {
  id: number
  title: string
  description: string
  icon: any
  completed: boolean
}

interface CompanyData {
  name: string
  description: string
  industry: string
  size: string
}

export default function TenantOnboardingPage() {
  const [currentStep, setCurrentStep] = useState(1)
  const [loading, setLoading] = useState(false)
  const [companyData, setCompanyData] = useState<CompanyData>({
    name: '',
    description: '',
    industry: '',
    size: ''
  })
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)
  
  const router = useRouter()
  const params = useParams()
  const tenantSlug = params?.tenant as string

  const steps: OnboardingStep[] = [
    {
      id: 1,
      title: 'Bem-vindo!',
      description: 'Configure os dados básicos da sua empresa',
      icon: Building2,
      completed: false
    },
    {
      id: 2,
      title: 'Configurações',
      description: 'Defina as configurações iniciais do sistema',
      icon: Settings,
      completed: false
    },
    {
      id: 3,
      title: 'Pronto!',
      description: 'Sua conta está configurada e pronta para uso',
      icon: CheckCircle,
      completed: false
    }
  ]

  const handleCompanyDataSubmit = async () => {
    if (!companyData.name.trim()) {
      setError('Nome da empresa é obrigatório')
      return
    }

    setLoading(true)
    setError(null)

    try {
      // Aqui você pode fazer uma chamada para API para salvar os dados da empresa
      // await fetch('/api/tenant/company', { method: 'POST', body: JSON.stringify(companyData) })
      
      // Simular delay
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      setSuccess('Dados da empresa salvos com sucesso!')
      setTimeout(() => {
        setCurrentStep(2)
        setSuccess(null)
      }, 1500)
    } catch (err) {
      setError('Erro ao salvar dados da empresa')
    } finally {
      setLoading(false)
    }
  }

  const handleFinishOnboarding = () => {
    setCurrentStep(3)
    setTimeout(() => {
      // Redirecionar para configurações primeiro, depois dashboard
      router.push(`/${tenantSlug}/dashboard/configuracoes`)
    }, 2000)
  }

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <div className="text-center space-y-2">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Building2 className="w-8 h-8 text-blue-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900">
                Bem-vindo à sua nova conta!
              </h2>
              <p className="text-gray-600 max-w-md mx-auto">
                Vamos configurar os dados básicos da sua empresa para personalizar sua experiência.
              </p>
            </div>

            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="company-name">Nome da Empresa *</Label>
                <Input
                  id="company-name"
                  placeholder="Ex: Minha Empresa Ltda"
                  value={companyData.name}
                  onChange={(e) => setCompanyData(prev => ({ ...prev, name: e.target.value }))}
                  className="text-lg"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="company-description">Descrição da Empresa</Label>
                <Textarea
                  id="company-description"
                  placeholder="Conte-nos um pouco sobre sua empresa..."
                  value={companyData.description}
                  onChange={(e) => setCompanyData(prev => ({ ...prev, description: e.target.value }))}
                  rows={3}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="industry">Setor</Label>
                  <Input
                    id="industry"
                    placeholder="Ex: Tecnologia"
                    value={companyData.industry}
                    onChange={(e) => setCompanyData(prev => ({ ...prev, industry: e.target.value }))}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="size">Tamanho</Label>
                  <Input
                    id="size"
                    placeholder="Ex: 1-10 funcionários"
                    value={companyData.size}
                    onChange={(e) => setCompanyData(prev => ({ ...prev, size: e.target.value }))}
                  />
                </div>
              </div>
            </div>

            {error && (
              <Alert className="border-red-200 bg-red-50">
                <AlertDescription className="text-red-800">
                  {error}
                </AlertDescription>
              </Alert>
            )}

            {success && (
              <Alert className="border-green-200 bg-green-50">
                <CheckCircle className="h-4 w-4 text-green-600" />
                <AlertDescription className="text-green-800">
                  {success}
                </AlertDescription>
              </Alert>
            )}

            <Button 
              onClick={handleCompanyDataSubmit}
              className="w-full bg-blue-600 hover:bg-blue-700"
              disabled={loading}
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Salvando...
                </>
              ) : (
                <>
                  Continuar
                  <ArrowRight className="w-4 h-4 ml-2" />
                </>
              )}
            </Button>
          </div>
        )

      case 2:
        return (
          <div className="space-y-6">
            <div className="text-center space-y-2">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Settings className="w-8 h-8 text-green-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900">
                Configurações Iniciais
              </h2>
              <p className="text-gray-600 max-w-md mx-auto">
                Sua empresa foi configurada! Agora vamos definir algumas configurações básicas.
              </p>
            </div>

            <div className="space-y-4">
              <div className="grid gap-4">
                <div className="p-4 border border-gray-200 rounded-lg">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <Target className="w-5 h-5 text-blue-600" />
                      <div>
                        <h3 className="font-medium">Configurações Básicas</h3>
                        <p className="text-sm text-gray-600">Timezone, moeda, idioma</p>
                      </div>
                    </div>
                    <Badge variant="secondary">Configurado</Badge>
                  </div>
                </div>

                <div className="p-4 border border-gray-200 rounded-lg">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <Users className="w-5 h-5 text-green-600" />
                      <div>
                        <h3 className="font-medium">Permissões de Usuário</h3>
                        <p className="text-sm text-gray-600">Você é o administrador principal</p>
                      </div>
                    </div>
                    <Badge variant="secondary">Ativo</Badge>
                  </div>
                </div>

                <div className="p-4 border border-gray-200 rounded-lg">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <Zap className="w-5 h-5 text-purple-600" />
                      <div>
                        <h3 className="font-medium">Integrações</h3>
                        <p className="text-sm text-gray-600">Configure depois no painel</p>
                      </div>
                    </div>
                    <Badge variant="outline">Opcional</Badge>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex space-x-3">
              <Button 
                variant="outline"
                onClick={() => setCurrentStep(1)}
                className="flex-1"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Voltar
              </Button>
              <Button 
                onClick={handleFinishOnboarding}
                className="flex-1 bg-green-600 hover:bg-green-700"
              >
                Finalizar Configuração
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
          </div>
        )

      case 3:
        return (
          <div className="text-center space-y-6">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto">
              <Sparkles className="w-10 h-10 text-green-600" />
            </div>
            <div className="space-y-2">
              <h2 className="text-2xl font-bold text-gray-900">
                Tudo Pronto! 🎉
              </h2>
              <p className="text-gray-600 max-w-md mx-auto">
                Sua conta está configurada e pronta para uso. Você será redirecionado para o dashboard em alguns segundos.
              </p>
            </div>
            <div className="flex items-center justify-center space-x-2 text-sm text-gray-500">
              <Loader2 className="w-4 h-4 animate-spin" />
              <span>Redirecionando...</span>
            </div>
          </div>
        )

      default:
        return null
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">T</span>
              </div>
              <div>
                <h1 className="font-semibold text-gray-900">Triaxia</h1>
                <p className="text-xs text-gray-500 capitalize">{tenantSlug}</p>
              </div>
            </div>
            <Badge className="bg-blue-100 text-blue-800">
              Configuração Inicial
            </Badge>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-6 py-8">
        <div className="max-w-2xl mx-auto">
          {/* Progress Steps */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-6">
              {steps.map((step, index) => (
                <div key={step.id} className="flex items-center">
                  <div className={`
                    w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium
                    ${currentStep >= step.id 
                      ? 'bg-blue-600 text-white' 
                      : 'bg-gray-200 text-gray-600'
                    }
                  `}>
                    {currentStep > step.id ? (
                      <CheckCircle className="w-5 h-5" />
                    ) : (
                      step.id
                    )}
                  </div>
                  {index < steps.length - 1 && (
                    <div className={`
                      w-16 h-1 mx-2
                      ${currentStep > step.id ? 'bg-blue-600' : 'bg-gray-200'}
                    `} />
                  )}
                </div>
              ))}
            </div>
            <div className="text-center">
              <h3 className="text-lg font-medium text-gray-900">
                {steps[currentStep - 1]?.title}
              </h3>
              <p className="text-sm text-gray-600">
                {steps[currentStep - 1]?.description}
              </p>
            </div>
          </div>

          {/* Step Content */}
          <Card className="shadow-xl">
            <CardContent className="p-8">
              {renderStepContent()}
            </CardContent>
          </Card>

          {/* Footer */}
          <div className="mt-8 text-center">
            <p className="text-xs text-gray-500">
              Precisa de ajuda? Entre em contato com nosso suporte
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}