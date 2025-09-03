'use client'

import { useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { CheckCircle, Loader2, ArrowRight } from 'lucide-react'
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
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-violet-900 flex items-center justify-center">
        <Card className="bg-gray-800/50 border-gray-700 max-w-md w-full mx-4">
          <CardContent className="pt-6">
            <div className="text-center">
              <Loader2 className="w-12 h-12 text-purple-500 animate-spin mx-auto mb-4" />
              <h2 className="text-xl font-semibold text-white mb-2">Processando seu pagamento...</h2>
              <p className="text-gray-400">Aguarde enquanto confirmamos sua assinatura.</p>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  if (!sessionId || !sessionData) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-violet-900 flex items-center justify-center">
        <Card className="bg-gray-800/50 border-gray-700 max-w-md w-full mx-4">
          <CardContent className="pt-6">
            <div className="text-center">
              <h2 className="text-xl font-semibold text-white mb-2">Sessão não encontrada</h2>
              <p className="text-gray-400 mb-4">Não foi possível verificar seu pagamento.</p>
              <Link href="/pricing">
                <Button className="bg-purple-600 hover:bg-purple-700 text-white">
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
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-violet-900">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-2xl mx-auto">
          {/* Success Card */}
          <Card className="bg-gray-800/50 border-gray-700 mb-8">
            <CardHeader className="text-center">
              <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="w-8 h-8 text-white" />
              </div>
              <CardTitle className="text-3xl text-white mb-2">
                Pagamento Confirmado!
              </CardTitle>
              <CardDescription className="text-gray-400 text-lg">
                Sua assinatura foi ativada com sucesso
              </CardDescription>
            </CardHeader>
            
            <CardContent className="space-y-6">
              <div className="bg-gray-700/50 rounded-lg p-4">
                <h3 className="text-lg font-semibold text-white mb-3">Detalhes da sua conta:</h3>
                <div className="space-y-2 text-gray-300">
                  <p><span className="font-medium">Email:</span> {sessionData.customerEmail}</p>
                  <p><span className="font-medium">Empresa:</span> {sessionData.tenantSlug}</p>
                  <p><span className="font-medium">Plano:</span> {sessionData.plan}</p>
                  <p><span className="font-medium">Trial:</span> 14 dias grátis</p>
                </div>
              </div>

              <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-4">
                <h4 className="text-blue-400 font-semibold mb-2">Próximos passos:</h4>
                <ul className="text-blue-300 space-y-1 text-sm">
                  <li>• Sua conta está sendo configurada automaticamente</li>
                  <li>• Você receberá um email com instruções de acesso</li>
                  <li>• O período de trial de 14 dias já começou</li>
                  <li>• Você pode acessar sua plataforma em alguns minutos</li>
                </ul>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Button className="flex-1 bg-purple-600 hover:bg-purple-700 text-white">
                  <ArrowRight className="w-4 h-4 mr-2" />
                  Acessar Plataforma
                </Button>
                <Button variant="outline" className="flex-1 border-gray-600 text-gray-300 hover:bg-gray-700">
                  Ver Documentação
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Next Steps */}
          <Card className="bg-gray-800/50 border-gray-700">
            <CardHeader>
              <CardTitle className="text-white">O que acontece agora?</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-purple-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-white text-sm font-bold">1</span>
                  </div>
                  <div>
                    <h4 className="text-white font-medium">Configuração Automática</h4>
                    <p className="text-gray-400 text-sm">Estamos criando sua instância personalizada da plataforma</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-purple-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-white text-sm font-bold">2</span>
                  </div>
                  <div>
                    <h4 className="text-white font-medium">Email de Boas-vindas</h4>
                    <p className="text-gray-400 text-sm">Você receberá instruções de acesso e primeiros passos</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-purple-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-white text-sm font-bold">3</span>
                  </div>
                  <div>
                    <h4 className="text-white font-medium">Onboarding Guiado</h4>
                    <p className="text-gray-400 text-sm">Nossa equipe te ajudará a configurar tudo perfeitamente</p>
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