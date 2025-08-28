'use client'

import { useState } from 'react'
import { useTenant, useBranding } from '@/contexts/TenantContext'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Separator } from '@/components/ui/separator'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { ArrowLeft, Mail, Lock, Eye, EyeOff, Github, Chrome, Loader2 } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'

export function TenantLoginPage() {
  const { tenant, isLoading } = useTenant()
  const branding = useBranding()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError('')

    try {
      // Aqui seria implementada a lógica de autenticação
      // Por enquanto, simular um delay
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      // Simular erro para demonstração
      if (email === 'error@test.com') {
        throw new Error('Credenciais inválidas')
      }
      
      // Redirecionar para dashboard ou página anterior
      console.log('Login realizado com sucesso')
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro ao fazer login')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleOAuthLogin = (provider: 'google' | 'github') => {
    // Implementar OAuth com contexto do tenant
    console.log(`Login com ${provider} para tenant ${tenant?.slug}`)
  }

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4 text-blue-600" />
          <p className="text-gray-600">Carregando...</p>
        </div>
      </div>
    )
  }

  if (!tenant) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            Portal não encontrado
          </h1>
          <p className="text-gray-600">
            O portal solicitado não existe ou não está disponível.
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <Link href={`/tenant/${tenant.slug}`}>
                <Button variant="ghost" size="sm">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Voltar
                </Button>
              </Link>
              {tenant.logo && (
                <Image
                  src={tenant.logo}
                  alt={`${tenant.name} logo`}
                  width={32}
                  height={32}
                  className="rounded"
                />
              )}
              <div>
                <h1 className="text-lg font-bold" style={{ color: branding.primaryColor }}>
                  {tenant.name}
                </h1>
                <p className="text-sm text-gray-600">Portal de Carreiras</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Login Form */}
      <div className="flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          <Card className="shadow-lg">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl font-bold">
                Acesse sua conta
              </CardTitle>
              <CardDescription>
                Entre no portal de carreiras da {tenant.name}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {error && (
                <Alert variant="destructive">
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">E-mail</Label>
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
                      type={showPassword ? 'text' : 'password'}
                      placeholder="Sua senha"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="pl-10 pr-10"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    >
                      {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <input
                      id="remember-me"
                      name="remember-me"
                      type="checkbox"
                      className="h-4 w-4 rounded border-gray-300 focus:ring-2"
                      style={{ accentColor: branding.primaryColor }}
                    />
                    <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
                      Lembrar de mim
                    </label>
                  </div>
                  <Link 
                    href={`/tenant/${tenant.slug}/forgot-password`}
                    className="text-sm hover:underline"
                    style={{ color: branding.primaryColor }}
                  >
                    Esqueceu a senha?
                  </Link>
                </div>

                <Button
                  type="submit"
                  className="w-full text-white"
                  style={{ backgroundColor: branding.primaryColor }}
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Entrando...
                    </>
                  ) : (
                    'Entrar'
                  )}
                </Button>
              </form>

              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <Separator className="w-full" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-white px-2 text-gray-500">Ou continue com</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <Button
                  variant="outline"
                  onClick={() => handleOAuthLogin('google')}
                  className="w-full"
                >
                  <Chrome className="mr-2 h-4 w-4" />
                  Google
                </Button>
                <Button
                  variant="outline"
                  onClick={() => handleOAuthLogin('github')}
                  className="w-full"
                >
                  <Github className="mr-2 h-4 w-4" />
                  GitHub
                </Button>
              </div>

              <div className="text-center">
                <p className="text-sm text-gray-600">
                  Não tem uma conta?{' '}
                  <Link 
                    href={`/tenant/${tenant.slug}/register`}
                    className="font-medium hover:underline"
                    style={{ color: branding.primaryColor }}
                  >
                    Cadastre-se
                  </Link>
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Informações adicionais */}
          <div className="text-center">
            <p className="text-xs text-gray-500">
              Ao fazer login, você concorda com os{' '}
              <Link 
                href={`/tenant/${tenant.slug}/terms`}
                className="hover:underline"
                style={{ color: branding.primaryColor }}
              >
                Termos de Uso
              </Link>
              {' '}e{' '}
              <Link 
                href={`/tenant/${tenant.slug}/privacy`}
                className="hover:underline"
                style={{ color: branding.primaryColor }}
              >
                Política de Privacidade
              </Link>
              {' '}da {tenant.name}.
            </p>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-white border-t py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-sm text-gray-600">
            &copy; 2024 {tenant.name}. Todos os direitos reservados.
          </p>
          <p className="mt-2 text-xs text-gray-500">
            Powered by <span style={{ color: branding.primaryColor }}>TalentIA</span>
          </p>
        </div>
      </footer>
    </div>
  )
}