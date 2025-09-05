'use client'

import { useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { CheckCircle, Loader2, ArrowRight, Sparkles, Shield, Zap, Rocket, Mail, Calendar, Settings } from 'lucide-react'
import { Logo } from '@/components/ui/logo'
import Link from 'next/link'

export default function SuccessPage() {
  const [loading, setLoading] = useState(true)
  const [sessionData, setSessionData] = useState<any>(null)
  const searchParams = useSearchParams()
  const sessionId = searchParams?.get('session_id')

  useEffect(() => {
    if (sessionId) {
      // Aqui você pode fazer uma chamada para verificar o status da sessão
      // Por enquanto, vamos simular um delay
      setTimeout(() => {
        setSessionData({
          customerEmail: 'usuario@exemplo.com',
          tenantSlug: 'minha-empresa',
          plan: 'professional'
        })
        setLoading(false)
      }, 2000)
    } else {
      setLoading(false)
    }
  }, [sessionId])

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
              <p className="text-gray-600 leading-relaxed">Aguarde enquanto confirmamos sua assinatura e preparamos sua conta.</p>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  if (!sessionId || !sessionData) {
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
              <div className="w-20 h-20 bg-gradient-to-r from-red-500 to-orange-500 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
                <Shield className="w-10 h-10 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-3">Sessão não encontrada</h2>
              <p className="text-gray-600 mb-6 leading-relaxed">Não foi possível verificar seu pagamento. Por favor, tente novamente.</p>
              <Link href="/pricing">
                <Button className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white px-8 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300">
                  <ArrowRight className="w-4 h-4 mr-2" />
                  Voltar aos Planos
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

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
      <div className="relative z-10 border-b border-gray-200/50 bg-white/80 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Logo size="md" showIcon={true} />
            <Badge className="bg-gradient-to-r from-green-500 to-emerald-600 text-white border-0 px-4 py-2 text-sm font-semibold shadow-lg">
              <CheckCircle className="w-4 h-4 mr-2" />
              Pagamento Confirmado
            </Badge>
          </div>
        </div>
      </div>
      
      <div className="relative z-10 container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          {/* Welcome Section */}
          <div className="text-center mb-12">
            <div className="relative mb-8">
              <div className="w-24 h-24 bg-gradient-to-r from-green-500 to-emerald-600 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-2xl">
                <CheckCircle className="w-12 h-12 text-white" />
              </div>
              <div className="absolute -top-2 -right-2 w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                <Sparkles className="w-4 h-4 text-white" />
              </div>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Bem-vindo à <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Triaxia</span>!
            </h1>
            <p className="text-xl text-gray-600 leading-relaxed max-w-2xl mx-auto">
              Sua assinatura foi ativada com sucesso. Agora você pode explorar todas as funcionalidades da nossa plataforma.
            </p>
          </div>
          
          {/* Success Card */}
          <Card className="bg-white/90 backdrop-blur-xl border-0 shadow-2xl mb-8">
            <CardHeader className="text-center pb-4">
              <CardTitle className="text-2xl text-gray-900 mb-2">
                Conta Ativada com Sucesso
              </CardTitle>
              <CardDescription className="text-gray-600 text-lg">
                Sua jornada na Triaxia começa agora
              </CardDescription>
            </CardHeader>
            
            <CardContent className="space-y-8">
              {/* Account Details Grid */}
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-200/50 rounded-2xl p-6">
                  <div className="flex items-center mb-4">
                    <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center mr-3">
                      <Mail className="w-5 h-5 text-white" />
                    </div>
                    <h3 className="text-lg font-bold text-blue-900">Detalhes da Conta</h3>
                  </div>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-blue-700 font-medium">Email:</span>
                      <span className="text-blue-900 font-semibold">{sessionData.customerEmail}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-blue-700 font-medium">Empresa:</span>
                      <span className="text-blue-900 font-semibold">{sessionData.tenantSlug}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-blue-700 font-medium">Plano:</span>
                      <Badge className="bg-gradient-to-r from-purple-500 to-pink-600 text-white border-0">
                        {sessionData.plan}
                      </Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-blue-700 font-medium">Trial:</span>
                      <Badge className="bg-gradient-to-r from-green-500 to-emerald-600 text-white border-0">
                        14 dias grátis
                      </Badge>
                    </div>
                  </div>
                </div>
                
                <div className="bg-gradient-to-br from-green-50 to-emerald-50 border border-green-200/50 rounded-2xl p-6">
                  <div className="flex items-center mb-4">
                    <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-emerald-600 rounded-xl flex items-center justify-center mr-3">
                      <Rocket className="w-5 h-5 text-white" />
                    </div>
                    <h3 className="text-lg font-bold text-green-900">Próximos Passos</h3>
                  </div>
                  <ul className="space-y-3 text-green-800">
                    <li className="flex items-start">
                      <CheckCircle className="w-4 h-4 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                      <span className="text-sm">Conta configurada automaticamente</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="w-4 h-4 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                      <span className="text-sm">Email de boas-vindas enviado</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="w-4 h-4 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                      <span className="text-sm">Período de trial iniciado</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="w-4 h-4 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                      <span className="text-sm">Plataforma pronta para uso</span>
                    </li>
                  </ul>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <Link href="/dashboard/configuracoes" className="flex-1">
                  <Button className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white px-8 py-4 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 text-lg">
                    <Settings className="w-5 h-5 mr-2" />
                    Configurar Empresa
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </Button>
                </Link>
                <Link href="/dashboard" className="flex-1">
                  <Button variant="outline" className="border-2 border-gray-300 text-gray-700 hover:bg-gray-50 px-8 py-4 rounded-xl font-semibold transition-all duration-300 text-lg">
                    <Rocket className="w-5 h-5 mr-2" />
                    Ir para Dashboard
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>

          {/* Timeline Card */}
          <Card className="bg-white/90 backdrop-blur-xl border-0 shadow-2xl">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl text-gray-900 mb-2">Sua Jornada na Triaxia</CardTitle>
              <CardDescription className="text-gray-600">
                Acompanhe os próximos passos para aproveitar ao máximo nossa plataforma
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="relative mb-4">
                    <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center mx-auto shadow-lg">
                      <Settings className="w-8 h-8 text-white" />
                    </div>
                    <div className="absolute -top-1 -right-1 w-6 h-6 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full flex items-center justify-center">
                      <span className="text-white text-xs font-bold">1</span>
                    </div>
                  </div>
                  <h4 className="text-lg font-bold text-gray-900 mb-2">Configuração Automática</h4>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    Sua instância personalizada está sendo criada com todas as configurações necessárias
                  </p>
                </div>
                
                <div className="text-center">
                  <div className="relative mb-4">
                    <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-600 rounded-2xl flex items-center justify-center mx-auto shadow-lg">
                      <Mail className="w-8 h-8 text-white" />
                    </div>
                    <div className="absolute -top-1 -right-1 w-6 h-6 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full flex items-center justify-center">
                      <span className="text-white text-xs font-bold">2</span>
                    </div>
                  </div>
                  <h4 className="text-lg font-bold text-gray-900 mb-2">Email de Boas-vindas</h4>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    Você receberá instruções detalhadas e dicas para começar da melhor forma
                  </p>
                </div>
                
                <div className="text-center">
                  <div className="relative mb-4">
                    <div className="w-16 h-16 bg-gradient-to-r from-orange-500 to-red-600 rounded-2xl flex items-center justify-center mx-auto shadow-lg">
                      <Rocket className="w-8 h-8 text-white" />
                    </div>
                    <div className="absolute -top-1 -right-1 w-6 h-6 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full flex items-center justify-center">
                      <span className="text-white text-xs font-bold">3</span>
                    </div>
                  </div>
                  <h4 className="text-lg font-bold text-gray-900 mb-2">Onboarding Guiado</h4>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    Nossa equipe especializada te ajudará a configurar tudo perfeitamente
                  </p>
                </div>
              </div>
              
              {/* Support Section */}
              <div className="mt-8 bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-200/50 rounded-2xl p-6">
                <div className="text-center">
                  <div className="flex items-center justify-center mb-4">
                    <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl flex items-center justify-center mr-3">
                      <Zap className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900">Suporte Premium Incluído</h3>
                  </div>
                  <p className="text-gray-700 mb-4 leading-relaxed">
                    Durante seu período de trial, você terá acesso completo ao nosso suporte especializado para garantir o melhor aproveitamento da plataforma.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-3 justify-center">
                    <Badge className="bg-gradient-to-r from-green-500 to-emerald-600 text-white border-0 px-4 py-2">
                      <Calendar className="w-4 h-4 mr-2" />
                      Suporte 24/7
                    </Badge>
                    <Badge className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white border-0 px-4 py-2">
                      <Shield className="w-4 h-4 mr-2" />
                      Onboarding Personalizado
                    </Badge>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}