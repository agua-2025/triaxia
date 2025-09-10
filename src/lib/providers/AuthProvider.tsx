// src/lib/providers/AuthProvider.tsx
'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { useAuth, type AuthState } from '@/lib/hooks/useAuth';
import { LoadingSpinner } from '@/components/ui/loading-spinner';

interface AuthContextType extends AuthState {
  signOut: () => Promise<void>;
  refreshSession: () => Promise<boolean>;
  isTokenExpiringSoon: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: React.ReactNode;
}

// Rotas que não precisam de autenticação
const PUBLIC_ROUTES = [
  '/',
  '/login',
  '/register',
  '/forgot-password',
  '/reset-password',
  '/activate',
];

// Rotas que devem redirecionar usuários autenticados
const AUTH_ROUTES = ['/login', '/register'];

export function AuthProvider({ children }: AuthProviderProps) {
  const auth = useAuth();
  const router = useRouter();
  const pathname = usePathname();
  const [isInitialized, setIsInitialized] = useState(false);

  // Verificar se a rota atual é pública
  const isPublicRoute = pathname
    ? PUBLIC_ROUTES.some(route => pathname.startsWith(route))
    : false;
  const isAuthRoute = pathname
    ? AUTH_ROUTES.some(route => pathname.startsWith(route))
    : false;

  useEffect(() => {
    // Aguardar o carregamento inicial da autenticação
    if (!auth.loading) {
      setIsInitialized(true);
    }
  }, [auth.loading]);

  useEffect(() => {
    if (!isInitialized || auth.loading) return;

    // A responsabilidade de redirecionar um usuário autenticado que está
    // na página de login foi movida para a própria página de login,
    // para evitar condições de corrida e simplificar o fluxo.

    // A única responsabilidade do AuthProvider agora é garantir que usuários
    // não autenticados não acessem rotas protegidas.
    if (!auth.user && !isPublicRoute) {
      console.log(
        '🔄 AuthProvider: Redirecionando usuário não autenticado para login'
      );
      router.replace('/login');
      return;
    }
  }, [auth.user, auth.loading, isInitialized, isPublicRoute, router, pathname]);

  // Mostrar loading durante a inicialização
  if (!isInitialized) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <LoadingSpinner size="lg" />
          <p className="mt-4 text-gray-600">Carregando...</p>
        </div>
      </div>
    );
  }

  // Mostrar loading durante verificação de autenticação em rotas protegidas
  if (auth.loading && !isPublicRoute) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <LoadingSpinner size="lg" />
          <p className="mt-4 text-gray-600">Verificando autenticação...</p>
        </div>
      </div>
    );
  }

  const contextValue: AuthContextType = {
    ...auth,
  };

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
}

export function useAuthContext() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuthContext deve ser usado dentro de um AuthProvider');
  }
  return context;
}

// Hook para verificar se o usuário está autenticado
export function useRequireAuth() {
  const { user, loading } = useAuthContext();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (
      !loading &&
      !user &&
      pathname &&
      !PUBLIC_ROUTES.some(route => pathname.startsWith(route))
    ) {
      router.replace('/login');
    }
  }, [user, loading, router, pathname]);

  return { user, loading };
}
