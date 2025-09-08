'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Loader2, Mail, Lock, Shield, ArrowRight } from 'lucide-react'
import Link from 'next/link'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [loadingMessage, setLoadingMessage] = useState<string>('')
  const [error, setError] = useState<string | null>(null)
  const [message, setMessage] = useState<string | null>(null)
  const router = useRouter()
  const supabase = createClient()

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
        
        // Verificar se é SUPER_ADMIN
        if (email === 'vivendamirassol@gmail.com') {
          setLoadingMessage('Redirecionando para painel administrativo...')
          const targetUrl = redirectTo && redirectTo.startsWith('/system-admin') ? redirectTo : '/system-admin'
          setTimeout(() => {
            router.push(targetUrl)
          }, 1000)
        } else {
          setLoadingMessage('Redirecionando para dashboard...')
          let targetUrl = '/dashboard'
          
          if (redirectTo && !redirectTo.startsWith('/system-admin')) {
            targetUrl = redirectTo
          } else if (tenant) {
            targetUrl = `/${tenant}/dashboard`
          }
          
          setTimeout(() => {
            router.push(targetUrl)
          }, 1000)
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
          <div className="mx-auto w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mb-4">
            <Shield className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Triaxia</h1>
          <p className="text-gray-600">Sistema de Administração</p>
        </div>

        <Card className="shadow-xl">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl text-center">Fazer Login</CardTitle>
            <CardDescription className="text-center">
              Entre com suas credenciais para acessar o sistema
            </CardDescription>
          </CardHeader>
          <CardContent>
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

                <div className="text-center text-sm text-gray-600">
                  🔒 Acesso restrito apenas para administradores autorizados
                </div>
              </div>
            </form>

            <div className="mt-6 pt-6 border-t border-gray-200">
              <div className="text-center space-y-2">
                <p className="text-sm text-gray-600">
                  Para acessar como SUPER_ADMIN:
                </p>
                <p className="text-xs text-gray-500 bg-gray-50 p-2 rounded">
                  Email: vivendamirassol@gmail.com
                </p>
                <Link 
                  href="/" 
                  className="text-sm text-blue-600 hover:text-blue-800 inline-flex items-center"
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