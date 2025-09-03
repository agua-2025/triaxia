'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { XCircle, ArrowLeft, MessageCircle, Mail } from 'lucide-react'
import Link from 'next/link'

export default function CancelPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-violet-900">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-2xl mx-auto">
          {/* Cancel Card */}
          <Card className="bg-gray-800/50 border-gray-700 mb-8">
            <CardHeader className="text-center">
              <div className="w-16 h-16 bg-orange-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <XCircle className="w-8 h-8 text-white" />
              </div>
              <CardTitle className="text-3xl text-white mb-2">
                Checkout Cancelado
              </CardTitle>
              <CardDescription className="text-gray-400 text-lg">
                Não se preocupe, você pode tentar novamente quando quiser
              </CardDescription>
            </CardHeader>
            
            <CardContent className="space-y-6">
              <div className="bg-gray-700/50 rounded-lg p-4">
                <h3 className="text-lg font-semibold text-white mb-3">O que aconteceu?</h3>
                <p className="text-gray-300">
                  Você cancelou o processo de pagamento antes de finalizar. Isso é completamente normal 
                  e não há problema algum. Seus dados não foram salvos e nenhuma cobrança foi realizada.
                </p>
              </div>

              <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-4">
                <h4 className="text-blue-400 font-semibold mb-2">Ainda interessado?</h4>
                <p className="text-blue-300 text-sm mb-3">
                  Você pode voltar aos planos e tentar novamente. Todos os nossos planos incluem:
                </p>
                <ul className="text-blue-300 space-y-1 text-sm">
                  <li>• 14 dias de teste grátis</li>
                  <li>• Cancelamento a qualquer momento</li>
                  <li>• Suporte completo durante o trial</li>
                  <li>• Sem compromisso ou multas</li>
                </ul>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/pricing" className="flex-1">
                  <Button className="w-full bg-purple-600 hover:bg-purple-700 text-white">
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Voltar aos Planos
                  </Button>
                </Link>
                <Link href="/" className="flex-1">
                  <Button variant="outline" className="w-full border-gray-600 text-gray-300 hover:bg-gray-700">
                    Página Inicial
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>

          {/* Help Section */}
          <Card className="bg-gray-800/50 border-gray-700">
            <CardHeader>
              <CardTitle className="text-white">Precisa de ajuda?</CardTitle>
              <CardDescription className="text-gray-400">
                Nossa equipe está aqui para esclarecer qualquer dúvida
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="bg-gray-700/50 rounded-lg p-4">
                  <div className="flex items-center space-x-3 mb-3">
                    <div className="w-10 h-10 bg-green-500 rounded-lg flex items-center justify-center">
                      <MessageCircle className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h4 className="text-white font-medium">Chat ao Vivo</h4>
                      <p className="text-gray-400 text-sm">Resposta imediata</p>
                    </div>
                  </div>
                  <Button variant="outline" className="w-full border-gray-600 text-gray-300 hover:bg-gray-700">
                    Iniciar Chat
                  </Button>
                </div>
                
                <div className="bg-gray-700/50 rounded-lg p-4">
                  <div className="flex items-center space-x-3 mb-3">
                    <div className="w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center">
                      <Mail className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h4 className="text-white font-medium">Email</h4>
                      <p className="text-gray-400 text-sm">contato@triaxia.com</p>
                    </div>
                  </div>
                  <Button variant="outline" className="w-full border-gray-600 text-gray-300 hover:bg-gray-700">
                    Enviar Email
                  </Button>
                </div>
              </div>
              
              <div className="mt-6 bg-yellow-500/10 border border-yellow-500/20 rounded-lg p-4">
                <h4 className="text-yellow-400 font-semibold mb-2">Dúvidas Comuns:</h4>
                <ul className="text-yellow-300 space-y-1 text-sm">
                  <li>• <strong>Segurança:</strong> Todos os pagamentos são processados pelo Stripe</li>
                  <li>• <strong>Trial:</strong> 14 dias completamente grátis, sem cartão necessário</li>
                  <li>• <strong>Cancelamento:</strong> Pode ser feito a qualquer momento</li>
                  <li>• <strong>Suporte:</strong> Equipe dedicada durante todo o trial</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}