'use client'

import { useState, useEffect } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { CheckCircle, Loader2, Building2, Users, Settings, Rocket, Sparkles, Shield, Zap, ChevronRight } from 'lucide-react'
import { Logo } from '@/components/ui/logo'
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
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-50 flex items-center justify-center relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: `radial-gradient(circle at 25% 25%, rgba(59, 130, 246, 0.1) 0%, transparent 50%),
                             radial-gradient(circle at 75% 75%, rgba(147, 51, 234, 0.1) 0%, transparent 50%)`
          }} />
        </div>
        
        <Card className="bg-white/90 backdrop-blur-xl border-0 shadow-2xl max-w-lg w-full mx-4 relative">
          <CardContent className="pt-8 pb-8">
            <div className="text-center">
              <div className="relative mb-6">
                <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                  <Loader2 className="w-10 h-10 text-white animate-spin" />
                </div>
                <div className="absolute -top-2 -right-2 w-6 h-6 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full flex items-center justify-center">
                  <Sparkles className="w-3 h-3 text-white" />
                </div>
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-3">Processando seu pagamento</h2>
              <p className="text-gray-600 mb-6">Aguarde enquanto confirmamos sua assinatura e configuramos sua conta com segurança.</p>
              <div className="flex items-center justify-center space-x-4 text-sm text-gray-500">
                <div className="flex items-center space-x-1">
                  <Shield className="w-4 h-4 text-green-500" />
                  <span>Seguro</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Zap className="w-4 h-4 text-blue-500" />
                  <span>Rápido</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  if (!sessionId || !tenantSlug || !sessionData) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-50 flex items-center justify-center relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: `radial-gradient(circle at 25% 25%, rgba(59, 130, 246, 0.1) 0%, transparent 50%),
                             radial-gradient(circle at 75% 75%, rgba(147, 51, 234, 0.1) 0%, transparent 50%)`
          }} />
        </div>
        
        <Card className="bg-white/90 backdrop-blur-xl border-0 shadow-2xl max-w-lg w-full mx-4 relative">
          <CardContent className="pt-8 pb-8">
            <div className="text-center">
              <div className="w-20 h-20 bg-gradient-to-r from-red-100 to-orange-100 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
                <span className="text-red-500 text-3xl">⚠️</span>
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-3">Sessão Inválida</h2>
              <p className="text-gray-600 mb-6">Não foi possível verificar seu pagamento. Por favor, tente novamente.</p>
              <div className="space-y-3">
                <Link href="/pricing">
                  <Button className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-semibold py-3 rounded-xl transition-all duration-300 transform hover:scale-105">
                    Voltar aos Planos
                  </Button>
                </Link>
                <p className="text-sm text-gray-500">Precisa de ajuda? Entre em contato conosco</p>
              </div>
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
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-50 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 25% 25%, rgba(59, 130, 246, 0.1) 0%, transparent 50%),
                           radial-gradient(circle at 75% 75%, rgba(147, 51, 234, 0.1) 0%, transparent 50%)`
        }} />
      </div>
      
      {/* Header */}
      <header className="relative z-10 border-b border-white/20 backdrop-blur-xl bg-white/80">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <Logo href="/" size="md" variant="default" />
            <div className="flex items-center space-x-4">
              <Badge className="bg-gradient-to-r from-green-500 to-emerald-500 text-white px-4 py-2 rounded-full font-medium shadow-lg">
                <CheckCircle className="w-4 h-4 mr-2" />
                Conta Ativa
              </Badge>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-6 py-12 relative z-10">
        <div className="max-w-5xl mx-auto">
          {/* Welcome Section */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Bem-vindo à <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Triaxia</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Vamos configurar sua conta em alguns passos simples para você começar a usar nossa plataforma.
            </p>
          </div>
          
          {/* Progress Steps */}
          <div className="mb-16">
            <div className="flex items-center justify-between mb-8 max-w-3xl mx-auto">
              {steps.map((step, index) => (
                <div key={step.id} className="flex items-center">
                  <div className="flex flex-col items-center">
                    <div className={`w-12 h-12 rounded-2xl flex items-center justify-center shadow-lg transition-all duration-300 ${
                      step.id <= currentStep 
                        ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white scale-110' 
                        : 'bg-white border-2 border-gray-200 text-gray-400'
                    }`}>
                      {step.id < currentStep ? (
                        <CheckCircle className="w-6 h-6" />
                      ) : (
                        <span className="text-sm font-bold">{step.id}</span>
                      )}
                    </div>
                    <span className={`text-xs font-medium mt-2 transition-colors duration-300 ${
                      step.id <= currentStep ? 'text-gray-900' : 'text-gray-400'
                    }`}>
                      {step.title.split(' ')[0]}
                    </span>
                  </div>
                  {index < steps.length - 1 && (
                    <div className={`flex-1 h-1 mx-4 rounded-full transition-all duration-500 ${
                      step.id < currentStep 
                        ? 'bg-gradient-to-r from-blue-500 to-purple-600' 
                        : 'bg-gray-200'
                    }`} />
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Current Step Content */}
          <Card className="bg-white/90 backdrop-blur-xl border-0 shadow-2xl max-w-4xl mx-auto">
            <CardHeader className="text-center pb-8">
              <div className="relative mb-6">
                <div className={`w-20 h-20 rounded-3xl flex items-center justify-center mx-auto shadow-xl bg-gradient-to-r from-blue-500 to-purple-600`}>
                  <Icon className="w-10 h-10 text-white" />
                </div>
                <div className="absolute -top-2 -right-2 w-8 h-8 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full flex items-center justify-center shadow-lg">
                  <span className="text-white text-xs font-bold">{currentStep}</span>
                </div>
              </div>
              <CardTitle className="text-3xl font-bold text-gray-900 mb-3">
                {currentStepData.title}
              </CardTitle>
              <CardDescription className="text-gray-600 text-lg max-w-2xl mx-auto">
                {currentStepData.description}
              </CardDescription>
            </CardHeader>
            
            <CardContent className="space-y-8 px-8 pb-8">
              {currentStep === 1 && (
                <div className="space-y-6">
                  <div className="bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200/50 rounded-2xl p-6 shadow-sm">
                    <div className="flex items-center mb-4">
                      <CheckCircle className="w-6 h-6 text-green-600 mr-3" />
                      <h3 className="text-xl font-bold text-green-800">Pagamento Confirmado</h3>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-green-700">
                      <div className="bg-white/60 rounded-xl p-4">
                        <p className="text-sm text-green-600 font-medium mb-1">Email da Conta</p>
                        <p className="font-semibold">{sessionData.customerEmail}</p>
                      </div>
                      <div className="bg-white/60 rounded-xl p-4">
                        <p className="text-sm text-green-600 font-medium mb-1">Empresa</p>
                        <p className="font-semibold capitalize">{sessionData.tenantSlug}</p>
                      </div>
                      <div className="bg-white/60 rounded-xl p-4">
                        <p className="text-sm text-green-600 font-medium mb-1">Plano Selecionado</p>
                        <p className="font-semibold capitalize">{sessionData.plan}</p>
                      </div>
                      <div className="bg-white/60 rounded-xl p-4">
                        <p className="text-sm text-green-600 font-medium mb-1">Período de Teste</p>
                        <p className="font-semibold">14 dias grátis</p>
                      </div>
                    </div>
                  </div>
                  <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200/50 rounded-2xl p-6 shadow-sm">
                    <div className="flex items-center mb-4">
                      <Rocket className="w-6 h-6 text-blue-600 mr-3" />
                      <h3 className="text-xl font-bold text-blue-800">Próximos Passos</h3>
                    </div>
                    <p className="text-blue-700 text-lg leading-relaxed">
                      Sua assinatura está ativa! Agora vamos configurar sua conta em alguns passos simples para você aproveitar ao máximo nossa plataforma.
                    </p>
                  </div>
                </div>
              )}

              {currentStep === 2 && (
                <div className="space-y-6">
                  <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200/50 rounded-2xl p-6 shadow-sm">
                    <div className="flex items-center mb-4">
                      <Building2 className="w-6 h-6 text-blue-600 mr-3" />
                      <h3 className="text-xl font-bold text-blue-800">Configuração da Empresa</h3>
                    </div>
                    <p className="text-blue-700 text-lg leading-relaxed mb-6">
                      Personalize sua empresa com logo, cores e informações específicas para criar uma experiência única.
                    </p>
                    <div className="bg-white/60 rounded-xl p-4 border border-blue-200/30">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center">
                          <Sparkles className="w-5 h-5 text-blue-600 mr-2" />
                          <span className="text-sm font-medium text-blue-800">Configure Agora</span>
                        </div>
                        <Link href="/dashboard/configuracoes">
                          <Button size="sm" className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white">
                            <Settings className="w-4 h-4 mr-1" />
                            Configurar
                          </Button>
                        </Link>
                      </div>
                      <p className="text-sm text-blue-600">
                        Personalize logo, cores e informações da sua empresa.
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {currentStep === 3 && (
                <div className="space-y-6">
                  <div className="bg-gradient-to-r from-purple-50 to-pink-50 border border-purple-200/50 rounded-2xl p-6 shadow-sm">
                    <div className="flex items-center mb-4">
                      <Users className="w-6 h-6 text-purple-600 mr-3" />
                      <h3 className="text-xl font-bold text-purple-800">Convite da Equipe</h3>
                    </div>
                    <p className="text-purple-700 text-lg leading-relaxed mb-6">
                      Convide membros da sua equipe para colaborar e maximizar a produtividade da sua organização.
                    </p>
                    <div className="bg-white/60 rounded-xl p-4 border border-purple-200/30">
                      <div className="flex items-center mb-2">
                        <Users className="w-5 h-5 text-purple-600 mr-2" />
                        <span className="text-sm font-medium text-purple-800">Gerenciamento de Equipe</span>
                      </div>
                      <p className="text-sm text-purple-600">
                        Gerencie convites, permissões e colaboradores através do dashboard.
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {currentStep === 4 && (
                <div className="space-y-6">
                  <div className="bg-gradient-to-r from-orange-50 to-amber-50 border border-orange-200/50 rounded-2xl p-6 shadow-sm">
                    <div className="flex items-center mb-4">
                      <Settings className="w-6 h-6 text-orange-600 mr-3" />
                      <h3 className="text-xl font-bold text-orange-800">Configurações Iniciais</h3>
                    </div>
                    <p className="text-orange-700 text-lg leading-relaxed mb-6">
                      Defina as configurações básicas do sistema de acordo com as necessidades da sua empresa.
                    </p>
                    <div className="bg-white/60 rounded-xl p-4 border border-orange-200/30 mb-4">
                      <div className="flex items-center mb-2">
                        <Settings className="w-5 h-5 text-orange-600 mr-2" />
                        <span className="text-sm font-medium text-orange-800">Configurações Flexíveis</span>
                      </div>
                      <p className="text-sm text-orange-600">
                        Todas as configurações podem ser alteradas posteriormente no dashboard.
                      </p>
                    </div>
                  </div>
                  <div className="bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200/50 rounded-2xl p-6 shadow-sm">
                    <div className="flex items-center mb-4">
                      <Rocket className="w-6 h-6 text-green-600 mr-3" />
                      <h3 className="text-xl font-bold text-green-800">Tudo Pronto!</h3>
                    </div>
                    <p className="text-green-700 text-lg leading-relaxed">
                      Sua conta está configurada e pronta para uso. Clique em "Ir para Dashboard" para começar a explorar todas as funcionalidades da plataforma.
                    </p>
                  </div>
                </div>
              )}

              <div className="flex justify-center pt-8">
                <Button
                  onClick={handleNextStep}
                  className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-bold px-12 py-4 rounded-2xl transition-all duration-300 transform hover:scale-105 shadow-xl hover:shadow-2xl text-lg"
                >
                  {currentStep === 4 ? (
                    <div className="flex items-center space-x-2">
                      <Rocket className="w-5 h-5" />
                      <span>Ir para Dashboard</span>
                    </div>
                  ) : (
                    <div className="flex items-center space-x-2">
                      <span>Continuar</span>
                      <ChevronRight className="w-5 h-5" />
                    </div>
                  )}
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}