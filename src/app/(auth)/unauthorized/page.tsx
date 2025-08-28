'use client'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Shield } from 'lucide-react'
import Link from 'next/link'
import { signOut } from 'next-auth/react'

export default function UnauthorizedPage() {
  const handleSignOut = async () => {
    await signOut({ callbackUrl: '/auth/signin' })
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <Card>
          <CardHeader className="text-center">
            <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-yellow-100">
              <Shield className="h-6 w-6 text-yellow-600" />
            </div>
            <CardTitle className="mt-6 text-2xl font-bold text-gray-900">
              Acesso Não Autorizado
            </CardTitle>
            <CardDescription className="mt-2">
              Você não tem permissão para acessar esta empresa.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="text-center">
              <p className="text-sm text-gray-600 mb-4">
                Entre em contato com o administrador da empresa para solicitar acesso.
              </p>
              <div className="space-y-2">
                <Link href="/auth/select-company">
                  <Button variant="outline" className="w-full">
                    Selecionar Outra Empresa
                  </Button>
                </Link>
                <Button onClick={handleSignOut} className="w-full">
                  Fazer Logout
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}