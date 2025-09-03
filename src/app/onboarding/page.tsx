'use client'

import { useState, useEffect } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { CheckCircle, Loader2, Building2, Users, Settings, Rocket } from 'lucide-react'
import Link from 'next/link'

export default function OnboardingPage() {
  const [loading, setLoading] = useState(true)
  const [sessionData, setSessionData] = useState<any>(null)
  const [currentStep, setCurrentStep] = useState(1)
  const searchParams = useSearchParams()
  const router = useRouter()
  const sessionId = searchParams?.get('session_id')
  const tenantSlug = searchParams?.get('tenant')

  useEffect(() => {
    if (sessionId && tenantSlug) {
      // Simular verificação da sessão do Stripe
      setTimeout(() => {
        setSessionData({
          sessionId,
          tenantSlug,
          customerEmail: 'usuario@exemplo.com',
          plan: 'professional'
        })
        setLoading(false)
      }, 2000)
    } else {
      setLoading(false)
    }
  }, [sessionId, tenantSlug])

  const handleNextStep = () => {
    if (currentStep < 4) {
      setCurrentStep(currentStep + 1)
    } else {
      // Redirecionar para o dashboard
      router.push('/dashboard')
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 flex items-center justify-center">
        <Card className="bg-white/80 backdrop-blur-sm border-gray-200/50 shadow-xl max-w-md w-full mx-4">
          <CardContent className="pt-6">
            <div className="text-center">
              <Loader2 className="w-12 h-12 text-blue-500 animate-spin mx-auto mb-4" />
              <h2 className="text-xl font-semibold text-gray-800 mb-2">Processando seu pagamento...</h2>
              <p className="text-gray-600">Aguarde enquanto confirmamos sua assinatura e configuramos sua conta.</p>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  if (!sessionId || !tenantSlug || !sessionData) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 flex items-center justify-center">
        <Card className="bg-white/80 backdrop-blur-sm border-gray-200/50 shadow-xl max-w-md w-full mx-4">
          <CardContent className="pt-6">
            <div className="text-center">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-red-500 text-2xl">⚠️</span>
              </div>
              <h2 className="text-xl font-semibold text-gray-800 mb-2">Sessão Inválida</h2>
              <p className="text-gray-600 mb-4">Não foi possível verificar seu pagamento.</p>
              <Link href="/pricing">
                <Button className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white">
                  Voltar aos Planos
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  const steps = [
    {
      id: 1,
      title: 'Pagamento Confirmado',
      description: 'Sua assinatura foi ativada com sucesso',
      icon: CheckCircle,
      color: 'text-green-500'
    },
    {
      id: 2,
      title: 'Configuração da Empresa',
      description: 'Vamos configurar os dados da sua empresa',
      icon: Building2,
      color: 'text-blue-500'
    },
    {
      id: 3,
      title: 'Convite da Equipe',
      description: 'Convide membros para sua equipe',
      icon: Users,
      color: 'text-purple-500'
    },
    {
      id: 4,
      title: 'Configurações Iniciais',
      description: 'Defina as configurações básicas do sistema',
      icon: Settings,
      color: 'text-orange-500'
    }
  ]

  const currentStepData = steps[currentStep - 1]
  const Icon = currentStepData.icon

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      {/* Header */}
      <header className="border-b border-gray-200/50 backdrop-blur-sm bg-white/10">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <Link href="/" className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Triaxia
            </Link>
            <Badge className="bg-gradient-to-r from-green-500 to-emerald-500 text-white">
              Conta Ativa
            </Badge>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          {/* Progress Steps */}
          <div className="mb-12">
            <div className="flex items-center justify-between mb-8">
              {steps.map((step, index) => (
                <div key={step.id} className="flex items-center">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                    step.id <= currentStep 
                      ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white' 
                      : 'bg-gray-200 text-gray-500'
                  }`}>
                    {step.id < currentStep ? (
                      <CheckCircle className="w-5 h-5" />
                    ) : (
                      <span className="text-sm font-semibold">{step.id}</span>
                    )}
                  </div>
                  {index < steps.length - 1 && (
                    <div className={`w-20 h-1 mx-4 ${
                      step.id < currentStep ? 'bg-gradient-to-r from-blue-500 to-purple-500' : 'bg-gray-200'
                    }`} />
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Current Step Content */}
          <Card className="bg-white/80 backdrop-blur-sm border-gray-200/50 shadow-xl">
            <CardHeader className="text-center">
              <div className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 bg-gradient-to-r from-blue-100 to-purple-100`}>
                <Icon className={`w-8 h-8 ${currentStepData.color}`} />
              </div>
              <CardTitle className="text-3xl text-gray-800 mb-2">
                {currentStepData.title}
              </CardTitle>
              <CardDescription className="text-gray-600 text-lg">
                {currentStepData.description}
              </CardDescription>
            </CardHeader>
            
            <CardContent className="space-y-6">
              {currentStep === 1 && (
                <div className="space-y-4">
                  <div className="bg-green-50 border border-green-200 rounded-xl p-4">
                    <h3 className="text-lg font-semibold text-green-800 mb-3">Detalhes da sua conta:</h3>
                    <div className="space-y-2 text-green-700">
                      <p><span className="font-medium">Email:</span> {sessionData.customerEmail}</p>
                      <p><span className="font-medium">Empresa:</span> {sessionData.tenantSlug}</p>
                      <p><span className="font-medium">Plano:</span> {sessionData.plan}</p>
                      <p><span className="font-medium">Trial:</span> 14 dias grátis</p>
                    </div>
                  </div>
                  <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
                    <h3 className="text-lg font-semibold text-blue-800 mb-2">Próximos passos:</h3>
                    <p className="text-blue-700">
                      Vamos configurar sua conta em alguns passos simples. Isso levará apenas alguns minutos.
                    </p>
                  </div>
                </div>
              )}

              {currentStep === 2 && (
                <div className="space-y-4">
                  <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
                    <h3 className="text-lg font-semibold text-blue-800 mb-2">Configuração da Empresa</h3>
                    <p className="text-blue-700 mb-4">
                      Aqui você poderá configurar o logo, cores e informações da sua empresa.
                    </p>
                    <p className="text-sm text-blue-600">
                      Esta funcionalidade estará disponível em breve no dashboard.
                    </p>
                  </div>
                </div>
              )}

              {currentStep === 3 && (
                <div className="space-y-4">
                  <div className="bg-purple-50 border border-purple-200 rounded-xl p-4">
                    <h3 className="text-lg font-semibold text-purple-800 mb-2">Convite da Equipe</h3>
                    <p className="text-purple-700 mb-4">
                      Convide membros da sua equipe para colaborar na plataforma.
                    </p>
                    <p className="text-sm text-purple-600">
                      Você poderá gerenciar sua equipe através do dashboard.
                    </p>
                  </div>
                </div>
              )}

              {currentStep === 4 && (
                <div className="space-y-4">
                  <div className="bg-orange-50 border border-orange-200 rounded-xl p-4">
                    <h3 className="text-lg font-semibold text-orange-800 mb-2">Configurações Iniciais</h3>
                    <p className="text-orange-700 mb-4">
                      Defina as configurações básicas do sistema de acordo com suas necessidades.
                    </p>
                    <p className="text-sm text-orange-600">
                      Todas as configurações podem ser alteradas posteriormente no dashboard.
                    </p>
                  </div>
                  <div className="bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-xl p-4">
                    <div className="flex items-center mb-2">
                      <Rocket className="w-5 h-5 text-green-600 mr-2" />
                      <h3 className="text-lg font-semibold text-green-800">Pronto para começar!</h3>
                    </div>
                    <p className="text-green-700">
                      Sua conta está configurada e pronta para uso. Clique em "Ir para Dashboard" para começar a usar a plataforma.
                    </p>
                  </div>
                </div>
              )}

              <div className="flex justify-center pt-6">
                <Button
                  onClick={handleNextStep}
                  className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-semibold px-8 py-3 rounded-xl transition-all duration-300"
                >
                  {currentStep === 4 ? 'Ir para Dashboard' : 'Continuar'}
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}