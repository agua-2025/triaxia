'use client'

import { useState, useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Loader2, Mail, Lock, Shield, ArrowRight, CheckCircle, Info } from 'lucide-react'
import Link from 'next/link'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [loadingMessage, setLoadingMessage] = useState<string>('')
  const [error, setError] = useState<string | null>(null)
  const [message, setMessage] = useState<string | null>(null)
  const [activationMessage, setActivationMessage] = useState<string | null>(null)
  const router = useRouter()
  const searchParams = useSearchParams()
  const supabase = createClient()

  useEffect(() => {
    const messageParam = searchParams?.get('message')
    if (messageParam === 'account-activated') {
      setActivationMessage('Conta ativada com sucesso! Agora você pode fazer login com seu email e senha.')
    }
  }, [searchParams])

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setLoadingMessage('Verificando credenciais...')
    setError(null)
    setMessage(null)

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      })

      if (error) {
        setError(error.message)
        return
      }

      if (data.user) {
        setLoadingMessage('Login realizado com sucesso! Redirecionando...')
        setMessage('Login realizado com sucesso! Redirecionando...')
        
        // Get redirect URL and tenant from query params
        const urlParams = new URLSearchParams(window.location.search)
        const redirectTo = urlParams.get('redirect')
        const tenant = urlParams.get('tenant')
        
        // Debug logs
        console.log('🔍 Debug - Parâmetros de redirecionamento:')
        console.log('- redirectTo:', redirectTo)
        console.log('- tenant:', tenant)
        console.log('- activationMessage:', activationMessage)
        console.log('- email:', email)
        
        // Verificar permissões de usuário
        const { data: profile } = await supabase
          .from('profiles')
          .select('role')
          .eq('id', data.user.id)
          .single()
        
        if (profile?.role === 'super_admin') {
          setLoadingMessage('Redirecionando para painel administrativo...')
          const targetUrl = redirectTo && redirectTo.startsWith('/system-admin') ? redirectTo : '/system-admin'
          router.push(targetUrl)
        } else {
          setLoadingMessage('Redirecionando para dashboard...')
          let targetUrl = '/dashboard'
          
          if (redirectTo && !redirectTo.startsWith('/system-admin')) {
            targetUrl = redirectTo
          } else if (tenant) {
            targetUrl = `/${tenant}/dashboard`
          }
          
          // Se é um usuário recém-ativado com tenant, redirecionar para onboarding
          if (activationMessage && tenant) {
            targetUrl = `/${tenant}/onboarding`
          }
          
          console.log('🎯 Redirecionando usuário para:', targetUrl)
          console.log('🔍 URL atual antes do push:', window.location.href)
          console.log('🔍 Pathname atual:', window.location.pathname)
          
          // Tentar redirecionamento
          try {
            router.push(targetUrl)
            console.log('✅ router.push executado')
            
            // Verificar se mudou após um tempo
            setTimeout(() => {
              console.log('🌐 URL após redirecionamento:', window.location.href)
              console.log('🌐 Pathname após redirecionamento:', window.location.pathname)
              
              if (window.location.pathname === '/login') {
                console.error('❌ Redirecionamento falhou - ainda na página de login')
                console.log('🔧 Tentando redirecionamento alternativo...')
                window.location.href = targetUrl
              }
            }, 1000)
          } catch (error) {
            console.error('❌ Erro no router.push:', error)
            console.log('🔧 Tentando redirecionamento com window.location...')
            window.location.href = targetUrl
          }
        }
      }
    } catch (err) {
      setError('Erro inesperado ao fazer login')
    } finally {
      setLoading(false)
      setLoadingMessage('')
    }
  }

  // Função de criação de conta removida por segurança

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="mx-auto w-16 h-16 bg-gradient-to-br from-blue-600 to-blue-700 rounded-xl flex items-center justify-center mb-4 shadow-lg border-2 border-blue-500/20">
            <Shield className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Triaxia</h1>
          <p className="text-gray-600">Sistema de Administração Seguro</p>
        </div>

        <Card className="shadow-xl">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl text-center">Fazer Login</CardTitle>
            <CardDescription className="text-center">
              Entre com suas credenciais para acessar o sistema
            </CardDescription>
          </CardHeader>
          <CardContent>
            {/* Mensagem de ativação bem-sucedida */}
            {activationMessage && (
              <Alert className="border-green-200 bg-green-50 mb-4">
                <CheckCircle className="h-4 w-4 text-green-600" />
                <AlertDescription className="text-green-800">
                  {activationMessage}
                </AlertDescription>
              </Alert>
            )}

            {/* Instruções para novos usuários */}
            <div className="mb-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <div className="flex items-start space-x-2">
                <Info className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
                <div className="text-sm text-blue-800">
                  <p className="font-medium mb-1">Novo usuário?</p>
                  <p>Use o <strong>email</strong> que você forneceu na compra e a <strong>senha</strong> que você criou durante a ativação da conta.</p>
                </div>
              </div>
            </div>
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="seu@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="pl-10"
                    required
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="password">Senha</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input
                    id="password"
                    type="password"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="pl-10"
                    required
                  />
                </div>
              </div>

              {error && (
                <Alert className="border-red-200 bg-red-50">
                  <AlertDescription className="text-red-800">
                    {error}
                  </AlertDescription>
                </Alert>
              )}

              {message && (
                <Alert className="border-green-200 bg-green-50">
                  <AlertDescription className="text-green-800">
                    {message}
                  </AlertDescription>
                </Alert>
              )}

              <div className="space-y-3">
                <Button 
                  type="submit" 
                  className="w-full bg-blue-600 hover:bg-blue-700"
                  disabled={loading}
                >
                  {loading ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      {loadingMessage || 'Entrando...'}
                    </>
                  ) : (
                    <>
                      Entrar
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </>
                  )}
                </Button>

                <div className="text-center space-y-2">
                  <Link 
                    href="/forgot-password" 
                    className="text-sm text-blue-600 hover:text-blue-800 underline"
                  >
                    Esqueceu sua senha?
                  </Link>
                  <div className="text-sm text-gray-600">
                    🔒 Acesso restrito apenas para administradores autorizados
                  </div>
                </div>
              </div>
            </form>

            <div className="mt-6 pt-6 border-t border-gray-200">
              <div className="text-center">
                <Link 
                  href="/" 
                  className="text-sm text-blue-600 hover:text-blue-800 inline-flex items-center justify-center"
                >
                  ← Voltar ao início
                </Link>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="mt-8 text-center">
          <p className="text-xs text-gray-500">
            Sistema protegido com autenticação segura
          </p>
        </div>
      </div>
    </div>
  )
}