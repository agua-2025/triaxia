// src/lib/hooks/useAuth.ts
'use client'

import { useEffect, useState, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import type { User, Session } from '@supabase/supabase-js'

export interface AuthState {
  user: User | null
  session: Session | null
  loading: boolean
  error: string | null
}

export function useAuth() {
  const [authState, setAuthState] = useState<AuthState>({
    user: null,
    session: null,
    loading: true,
    error: null
  })
  const router = useRouter()
  const supabase = createClient()

  // Função para atualizar o estado de autenticação
  const updateAuthState = useCallback((session: Session | null, error?: string) => {
    setAuthState({
      user: session?.user ?? null,
      session,
      loading: false,
      error: error ?? null
    })
  }, [])

  // Função para fazer logout
  const signOut = useCallback(async () => {
    try {
      setAuthState(prev => ({ ...prev, loading: true }))
      const { error } = await supabase.auth.signOut()
      if (error) {
        console.error('Erro ao fazer logout:', error)
        setAuthState(prev => ({ ...prev, error: error.message, loading: false }))
      } else {
        updateAuthState(null)
        router.push('/login')
      }
    } catch (err) {
      console.error('Erro inesperado ao fazer logout:', err)
      setAuthState(prev => ({ ...prev, error: 'Erro inesperado', loading: false }))
    }
  }, [supabase.auth, updateAuthState, router])

  // Função para refresh manual da sessão
  const refreshSession = useCallback(async () => {
    try {
      const { data, error } = await supabase.auth.refreshSession()
      if (error) {
        console.error('Erro ao renovar sessão:', error)
        // Se o refresh falhar, fazer logout automático
        await signOut()
        return false
      }
      updateAuthState(data.session)
      return true
    } catch (err) {
      console.error('Erro inesperado ao renovar sessão:', err)
      await signOut()
      return false
    }
  }, [supabase.auth, updateAuthState, signOut])

  // Verificar se o token está próximo do vencimento
  const isTokenExpiringSoon = useCallback((session: Session | null): boolean => {
    if (!session?.expires_at) return false
    
    const expiresAt = session.expires_at * 1000 // Converter para milliseconds
    const now = Date.now()
    const timeUntilExpiry = expiresAt - now
    
    // Renovar se faltam menos de 5 minutos para expirar
    return timeUntilExpiry < 5 * 60 * 1000
  }, [])

  // Efeito para configurar o listener de mudanças de autenticação
  useEffect(() => {
    let mounted = true
    let refreshTimer: NodeJS.Timeout | null = null

    // Função para configurar o timer de refresh automático
    const setupRefreshTimer = (session: Session | null) => {
      if (refreshTimer) {
        clearInterval(refreshTimer)
        refreshTimer = null
      }

      if (!session?.expires_at) return

      const expiresAt = session.expires_at * 1000
      const now = Date.now()
      const timeUntilExpiry = expiresAt - now
      
      // Configurar timer para renovar 2 minutos antes do vencimento
      const refreshTime = Math.max(timeUntilExpiry - 2 * 60 * 1000, 30000) // Mínimo 30 segundos
      
      refreshTimer = setTimeout(async () => {
        if (mounted) {
          console.log('Renovando sessão automaticamente...')
          await refreshSession()
        }
      }, refreshTime)
    }

    // Obter sessão inicial
    const getInitialSession = async () => {
      try {
        const { data: { session }, error } = await supabase.auth.getSession()
        
        if (error) {
          console.error('Erro ao obter sessão inicial:', error)
          if (mounted) {
            updateAuthState(null, error.message)
          }
          return
        }

        if (mounted) {
          updateAuthState(session)
          setupRefreshTimer(session)
        }
      } catch (err) {
        console.error('Erro inesperado ao obter sessão:', err)
        if (mounted) {
          updateAuthState(null, 'Erro inesperado')
        }
      }
    }

    // Configurar listener para mudanças de autenticação
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        console.log('Mudança de estado de autenticação:', event, session?.user?.email)
        
        if (!mounted) return

        switch (event) {
          case 'SIGNED_IN':
          case 'TOKEN_REFRESHED':
            updateAuthState(session)
            setupRefreshTimer(session)
            break
          case 'SIGNED_OUT':
            updateAuthState(null)
            if (refreshTimer) {
              clearInterval(refreshTimer)
              refreshTimer = null
            }
            break
          case 'USER_UPDATED':
            updateAuthState(session)
            break
          default:
            break
        }
      }
    )

    // Inicializar
    getInitialSession()

    // Cleanup
    return () => {
      mounted = false
      subscription.unsubscribe()
      if (refreshTimer) {
        clearInterval(refreshTimer)
      }
    }
  }, [supabase.auth, updateAuthState, refreshSession])

  // Efeito para verificar periodicamente se o token precisa ser renovado
  useEffect(() => {
    if (!authState.session || authState.loading) return

    const checkTokenExpiry = () => {
      if (isTokenExpiringSoon(authState.session)) {
        console.log('Token expirando em breve, renovando...')
        refreshSession()
      }
    }

    // Verificar a cada minuto
    const interval = setInterval(checkTokenExpiry, 60000)

    return () => clearInterval(interval)
  }, [authState.session, authState.loading, isTokenExpiringSoon, refreshSession])

  return {
    ...authState,
    signOut,
    refreshSession,
    isTokenExpiringSoon: isTokenExpiringSoon(authState.session)
  }
}