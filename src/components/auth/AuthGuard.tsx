'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { Loader2, Shield, AlertTriangle } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface AuthGuardProps {
  children: React.ReactNode
  fallback?: React.ReactNode
  redirectTo?: string
}

export function AuthGuard({ 
  children, 
  fallback, 
  redirectTo = '/login' 
}: AuthGuardProps) {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()
  const supabase = createClient()

  useEffect(() => {
    const checkAuth = async () => {
      try {
        setIsLoading(true)
        setError(null)

        const { data: { user }, error: authError } = await supabase.auth.getUser()
        
        if (authError) {
          console.error('Erro na verificação de autenticação:', authError)
          setError('Erro ao verificar autenticação')
          setIsAuthenticated(false)
          return
        }

        setIsAuthenticated(!!user)
        
        if (!user) {
          // Redirecionar para login com URL de retorno
          const currentPath = window.location.pathname + window.location.search
          const loginUrl = `${redirectTo}?redirect=${encodeURIComponent(currentPath)}`
          router.push(loginUrl)
        }
      } catch (err) {
        console.error('Erro inesperado na verificação de autenticação:', err)
        setError('Erro inesperado')
        setIsAuthenticated(false)
      } finally {
        setIsLoading(false)
      }
    }

    checkAuth()

    // Listen for auth state changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        console.log('Auth state changed:', event, session?.user?.email)
        
        if (event === 'SIGNED_OUT' || !session) {
          setIsAuthenticated(false)
          const currentPath = window.location.pathname + window.location.search
          const loginUrl = `${redirectTo}?redirect=${encodeURIComponent(currentPath)}`
          router.push(loginUrl)
        } else if (event === 'SIGNED_IN' || event === 'TOKEN_REFRESHED') {
          setIsAuthenticated(true)
        }
      }
    )

    return () => {
      subscription.unsubscribe()
    }
  }, [router, redirectTo, supabase.auth])

  // Loading state
  if (isLoading) {
    if (fallback) {
      return <>{fallback}</>
    }

    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-8 h-8 animate-spin mx-auto mb-4 text-blue-600" />
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Verificando Acesso</h2>
          <p className="text-gray-600">Validando sua autenticação...</p>
        </div>
      </div>
    )
  }

  // Error state
  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8 text-center">
          <div className="mb-6">
            <div className="mx-auto w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mb-4">
              <AlertTriangle className="w-8 h-8 text-red-600" />
            </div>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Erro de Autenticação</h1>
            <p className="text-gray-600 mb-6">{error}</p>
          </div>
          
          <div className="space-y-3">
            <Button 
              onClick={() => window.location.reload()} 
              className="w-full bg-blue-600 hover:bg-blue-700"
            >
              Tentar Novamente
            </Button>
            
            <Button 
              onClick={() => router.push(redirectTo)} 
              variant="outline" 
              className="w-full"
            >
              Ir para Login
            </Button>
          </div>
          
          <div className="mt-8 pt-6 border-t border-gray-200">
            <div className="flex items-center justify-center text-sm text-gray-500">
              <Shield className="w-4 h-4 mr-2" />
              Área protegida - autenticação necessária
            </div>
          </div>
        </div>
      </div>
    )
  }

  // Not authenticated - will redirect via useEffect
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-8 h-8 animate-spin mx-auto mb-4 text-blue-600" />
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Redirecionando</h2>
          <p className="text-gray-600">Você será redirecionado para o login...</p>
        </div>
      </div>
    )
  }

  // Authenticated - render children
  return <>{children}</>
}

// Hook para usar em componentes
export function useAuth() {
  const [user, setUser] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const supabase = createClient()

  useEffect(() => {
    const getUser = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      setUser(user)
      setLoading(false)
    }

    getUser()

    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setUser(session?.user ?? null)
        setLoading(false)
      }
    )

    return () => subscription.unsubscribe()
  }, [supabase.auth])

  return {
    user,
    loading,
    signOut: () => supabase.auth.signOut()
  }
}