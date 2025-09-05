'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { XCircle, ArrowLeft, MessageCircle, Mail, AlertTriangle, Shield, Heart, Sparkles, CheckCircle, Clock } from 'lucide-react'
import { Logo } from '@/components/ui/logo'
import Link from 'next/link'

export default function CancelPage() {
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
            <Badge className="bg-gradient-to-r from-orange-500 to-red-600 text-white border-0 px-4 py-2 text-sm font-semibold shadow-lg">
              <AlertTriangle className="w-4 h-4 mr-2" />
              Checkout Cancelado
            </Badge>
          </div>
        </div>
      </div>
      
      <div className="relative z-10 container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          {/* Welcome Section */}
          <div className="text-center mb-12">
            <div className="relative mb-8">
              <div className="w-24 h-24 bg-gradient-to-r from-orange-500 to-red-600 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-2xl">
                <XCircle className="w-12 h-12 text-white" />
              </div>
              <div className="absolute -top-2 -right-2 w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                <Heart className="w-4 h-4 text-white" />
              </div>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Tudo bem, <span className="bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">sem problemas</span>!
            </h1>
            <p className="text-xl text-gray-600 leading-relaxed max-w-2xl mx-auto">
              Você cancelou o processo de pagamento. Isso é completamente normal e você pode tentar novamente quando quiser.
            </p>
          </div>
          
          {/* Cancel Card */}
          <Card className="bg-white/90 backdrop-blur-xl border-0 shadow-2xl mb-8">
            <CardHeader className="text-center pb-4">
              <CardTitle className="text-2xl text-gray-900 mb-2">
                Checkout Cancelado
              </CardTitle>
              <CardDescription className="text-gray-600 text-lg">
                Não se preocupe, estamos aqui quando você estiver pronto
              </CardDescription>
            </CardHeader>
            
            <CardContent className="pt-6">
              <div className="grid md:grid-cols-2 gap-8">
                {/* O que aconteceu */}
                <div className="bg-gradient-to-br from-orange-50 to-red-50 rounded-2xl p-6 border border-orange-200/50">
                  <div className="flex items-center mb-4">
                    <div className="w-10 h-10 bg-gradient-to-r from-orange-500 to-red-600 rounded-xl flex items-center justify-center mr-3">
                      <AlertTriangle className="w-5 h-5 text-white" />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900">O que aconteceu?</h3>
                  </div>
                  <p className="text-gray-700 mb-4">
                    Você cancelou o processo de pagamento. Nenhuma cobrança foi feita em seu cartão.
                  </p>
                  <div className="flex items-center text-sm text-gray-600">
                    <Shield className="w-4 h-4 mr-2 text-green-600" />
                    <span>Seus dados estão seguros</span>
                  </div>
                </div>
                
                {/* Próximos passos */}
                <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-6 border border-blue-200/50">
                  <div className="flex items-center mb-4">
                    <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center mr-3">
                      <Sparkles className="w-5 h-5 text-white" />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900">Próximos Passos</h3>
                  </div>
                  <ul className="space-y-3 text-gray-700">
                    <li className="flex items-center">
                      <CheckCircle className="w-4 h-4 mr-3 text-green-600" />
                      <span>Revisar os planos disponíveis</span>
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="w-4 h-4 mr-3 text-green-600" />
                      <span>Entrar em contato se tiver dúvidas</span>
                    </li>
                    <li className="flex items-center">
                      <Clock className="w-4 h-4 mr-3 text-blue-600" />
                      <span>Tentar novamente quando quiser</span>
                    </li>
                  </ul>
                </div>
              </div>
              
              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
                <Button asChild className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white border-0 px-8 py-3 text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300">
                  <Link href="/pricing">
                    <ArrowLeft className="w-5 h-5 mr-2" />
                    Voltar aos Planos
                  </Link>
                </Button>
                
                <Button asChild variant="outline" className="border-2 border-gray-300 text-gray-700 hover:bg-gray-50 px-8 py-3 text-lg font-semibold transition-all duration-300">
                  <Link href="/">
                    <Heart className="w-5 h-5 mr-2" />
                    Ir para Home
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Help Section */}
          <Card className="bg-white/90 backdrop-blur-xl border-0 shadow-2xl mb-8">
            <CardHeader className="text-center pb-6">
              <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Heart className="w-8 h-8 text-white" />
              </div>
              <CardTitle className="text-2xl text-gray-900 mb-2">Precisa de ajuda?</CardTitle>
              <CardDescription className="text-gray-600 text-lg">
                Nossa equipe está aqui para esclarecer qualquer dúvida e ajudar você
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-6 border border-blue-200/50 hover:shadow-lg transition-all duration-300">
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center mr-4">
                      <MessageCircle className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h4 className="text-gray-900 font-semibold text-lg">Chat ao Vivo</h4>
                      <p className="text-gray-600 text-sm">Resposta imediata</p>
                    </div>
                  </div>
                  <p className="text-gray-700 mb-4">
                    Converse conosco em tempo real e tire suas dúvidas instantaneamente
                  </p>
                  <Button className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white border-0 shadow-lg">
                    <MessageCircle className="w-4 h-4 mr-2" />
                    Iniciar Chat
                  </Button>
                </div>
                
                <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-6 border border-green-200/50 hover:shadow-lg transition-all duration-300">
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-600 rounded-xl flex items-center justify-center mr-4">
                      <Mail className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h4 className="text-gray-900 font-semibold text-lg">Email Suporte</h4>
                      <p className="text-gray-600 text-sm">Resposta em até 2h</p>
                    </div>
                  </div>
                  <p className="text-gray-700 mb-4">
                    Envie sua dúvida detalhada e receba uma resposta completa
                  </p>
                  <Button className="w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white border-0 shadow-lg">
                    <Mail className="w-4 h-4 mr-2" />
                    Enviar Email
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
          
          {/* FAQ Section */}
          <Card className="bg-white/90 backdrop-blur-xl border-0 shadow-2xl">
            <CardHeader className="text-center pb-6">
              <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Sparkles className="w-8 h-8 text-white" />
              </div>
              <CardTitle className="text-2xl text-gray-900 mb-2">Dúvidas Comuns</CardTitle>
              <CardDescription className="text-gray-600 text-lg">
                Respostas rápidas para as perguntas mais frequentes
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-4 border border-purple-200/50">
                    <div className="flex items-start">
                      <div className="w-6 h-6 bg-gradient-to-r from-purple-500 to-pink-600 rounded-lg flex items-center justify-center mr-3 mt-0.5">
                        <Shield className="w-3 h-3 text-white" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-1">Segurança dos Dados</h4>
                        <p className="text-gray-700 text-sm">Todos os pagamentos são processados pelo Stripe com criptografia de nível bancário</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-4 border border-blue-200/50">
                    <div className="flex items-start">
                      <div className="w-6 h-6 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center mr-3 mt-0.5">
                        <Clock className="w-3 h-3 text-white" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-1">Trial Gratuito</h4>
                        <p className="text-gray-700 text-sm">14 dias completamente grátis, sem necessidade de cartão de crédito</p>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-4 border border-green-200/50">
                    <div className="flex items-start">
                      <div className="w-6 h-6 bg-gradient-to-r from-green-500 to-emerald-600 rounded-lg flex items-center justify-center mr-3 mt-0.5">
                        <CheckCircle className="w-3 h-3 text-white" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-1">Cancelamento</h4>
                        <p className="text-gray-700 text-sm">Pode ser feito a qualquer momento, sem multas ou compromissos</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-gradient-to-br from-orange-50 to-red-50 rounded-xl p-4 border border-orange-200/50">
                    <div className="flex items-start">
                      <div className="w-6 h-6 bg-gradient-to-r from-orange-500 to-red-600 rounded-lg flex items-center justify-center mr-3 mt-0.5">
                        <Heart className="w-3 h-3 text-white" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-1">Suporte Dedicado</h4>
                        <p className="text-gray-700 text-sm">Equipe especializada disponível durante todo o período de trial</p>
                      </div>
                    </div>
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