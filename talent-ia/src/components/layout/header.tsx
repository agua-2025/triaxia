'use client'

import { useSession, signIn, signOut } from 'next-auth/react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { User, LogOut, Menu } from 'lucide-react'

export function Header() {
  const { data: session, status } = useSession()

  return (
    <header className="border-b bg-white">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link href="/" className="text-2xl font-bold text-blue-600">
          TalentIA
        </Link>

        <nav className="hidden md:flex items-center space-x-6">
          <Link href="/" className="text-gray-600 hover:text-gray-900">
            Início
          </Link>
          <Link href="/jobs" className="text-gray-600 hover:text-gray-900">
            Vagas
          </Link>
          <Link href="/companies" className="text-gray-600 hover:text-gray-900">
            Empresas
          </Link>
        </nav>

        <div className="flex items-center space-x-4">
          {status === 'loading' ? (
            <div className="w-8 h-8 bg-gray-200 rounded-full animate-pulse" />
          ) : session ? (
            <div className="flex items-center space-x-2">
              <Link href="/dashboard">
                <Button variant="ghost" size="sm">
                  <User className="w-4 h-4 mr-2" />
                  Dashboard
                </Button>
              </Link>
              <Link href="/admin">
                <Button variant="ghost" size="sm">
                  <Menu className="w-4 h-4 mr-2" />
                  Admin
                </Button>
              </Link>
              <Button
                variant="outline"
                size="sm"
                onClick={() => signOut()}
              >
                <LogOut className="w-4 h-4 mr-2" />
                Sair
              </Button>
            </div>
          ) : (
            <div className="flex items-center space-x-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => signIn()}
              >
                Entrar
              </Button>
              <Button
                size="sm"
                onClick={() => signIn()}
              >
                Cadastrar
              </Button>
            </div>
          )}
        </div>
      </div>
    </header>
  )
}