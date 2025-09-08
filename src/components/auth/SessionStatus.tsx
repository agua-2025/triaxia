// src/components/auth/SessionStatus.tsx
'use client'

import React from 'react'
import { useAuthContext } from '@/lib/providers/AuthProvider'
import { Button } from '@/components/ui/button'
import { LoadingSpinner } from '@/components/ui/loading-spinner'
import { formatDistanceToNow } from 'date-fns'
import { ptBR } from 'date-fns/locale'

export function SessionStatus() {
  const { user, session, loading, signOut, refreshSession, isTokenExpiringSoon } = useAuthContext()

  if (loading) {
    return (
      <div className="flex items-center gap-2 text-sm text-gray-600">
        <LoadingSpinner size="sm" />
        Verificando sessão...
      </div>
    )
  }

  if (!user || !session) {
    return (
      <div className="text-sm text-gray-600">
        Não autenticado
      </div>
    )
  }

  const expiresAt = session.expires_at ? new Date(session.expires_at * 1000) : null
  const timeUntilExpiry = expiresAt ? formatDistanceToNow(expiresAt, { 
    addSuffix: true, 
    locale: ptBR 
  }) : 'Desconhecido'

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <div className="text-sm">
          <div className="font-medium text-gray-900">
            {user.email}
          </div>
          <div className="text-gray-600">
            Sessão expira {timeUntilExpiry}
          </div>
          {isTokenExpiringSoon && (
            <div className="text-amber-600 font-medium">
              ⚠️ Token expirando em breve
            </div>
          )}
        </div>
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={refreshSession}
            className="text-xs"
          >
            Renovar
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={signOut}
            className="text-xs"
          >
            Sair
          </Button>
        </div>
      </div>
    </div>
  )
}