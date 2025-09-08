'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { Shield, AlertTriangle, RefreshCw } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface SystemAdminLayoutProps {
  children: React.ReactNode
}

export default function SystemAdminLayout({ children }: SystemAdminLayoutProps) {
  const [isAuthorized, setIsAuthorized] = useState<boolean | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()
  const supabase = createClient()

  useEffect(() => {
    checkAuthorization()
  }, [])

  const checkAuthorization = async () => {
    try {
      setIsLoading(true)
      setError(null)

      // Verificar se o usuário está autenticado
      const { data: { user }, error: authError } = await supabase.auth.getUser()
      
      if (authError || !user) {
        setIsAuthorized(false)
        setError('Você precisa estar autenticado para acessar esta área')
        return
      }

      // Verificar se o usuário é SUPER_ADMIN
      const response = await fetch('/api/system-admin/auth/check', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      })

      if (response.ok) {
        const data = await response.json()
        setIsAuthorized(data.authorized)
        
        if (!data.authorized) {
          setError('Acesso negado. Apenas SUPER_ADMINs podem acessar esta área.')
        }
      } else {
        setIsAuthorized(false)
        setError('Erro ao verificar permissões de acesso')
      }
    } catch (err) {
      console.error('Erro na verificação de autorização:', err)
      setIsAuthorized(false)
      setError('Erro interno na verificação de acesso')
    } finally {
      setIsLoading(false)
    }
  }

  const handleSignOut = async () => {
    await supabase.auth.signOut()
    router.push('/')
  }

  const handleRetry = () => {
    checkAuthorization()
  }

  // Loading state
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <RefreshCw className="w-8 h-8 animate-spin mx-auto mb-4 text-blue-600" />
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Verificando Acesso</h2>
          <p className="text-gray-600">Validando suas permissões de administrador...</p>
        </div>
      </div>
    )
  }

  // Unauthorized state
  if (!isAuthorized) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8 text-center">
          <div className="mb-6">
            <div className="mx-auto w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mb-4">
              <AlertTriangle className="w-8 h-8 text-red-600" />
            </div>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Acesso Negado</h1>
            <p className="text-gray-600 mb-6">
              {error || 'Você não tem permissão para acessar esta área.'}
            </p>
          </div>
          
          <div className="space-y-3">
            <Button 
              onClick={handleRetry} 
              className="w-full bg-blue-600 hover:bg-blue-700"
            >
              <RefreshCw className="w-4 h-4 mr-2" />
              Tentar Novamente
            </Button>
            
            <Button 
              onClick={handleSignOut} 
              variant="outline" 
              className="w-full"
            >
              Fazer Logout
            </Button>
            
            <Button 
              onClick={() => router.push('/')} 
              variant="ghost" 
              className="w-full"
            >
              Voltar ao Início
            </Button>
          </div>
          
          <div className="mt-8 pt-6 border-t border-gray-200">
            <div className="flex items-center justify-center text-sm text-gray-500">
              <Shield className="w-4 h-4 mr-2" />
              Área restrita para administradores do sistema
            </div>
          </div>
        </div>
      </div>
    )
  }

  // Authorized - render children
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Security indicator */}
      <div className="bg-red-600 text-white py-2">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-center text-sm font-medium">
            <Shield className="w-4 h-4 mr-2" />
            ÁREA DE ADMINISTRAÇÃO DO SISTEMA - ACESSO RESTRITO
          </div>
        </div>
      </div>
      
      {children}
    </div>
  )
}