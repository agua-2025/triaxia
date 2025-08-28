'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Building2, Search } from 'lucide-react'
import { LoadingSpinner } from '@/components/ui/loading'

interface Company {
  id: string
  name: string
  subdomain: string
  primaryColor?: string
}

export default function SelectCompanyPage() {
  const [subdomain, setSubdomain] = useState('')
  const [companies, setCompanies] = useState<Company[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const router = useRouter()

  // Buscar empresas disponíveis
  useEffect(() => {
    fetchCompanies()
  }, [])

  const fetchCompanies = async () => {
    try {
      setLoading(true)
      const response = await fetch('/api/companies')
      if (response.ok) {
        const data = await response.json()
        setCompanies(data)
      }
    } catch (error) {
      console.error('Erro ao buscar empresas:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleSubdomainSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!subdomain.trim()) {
      setError('Por favor, digite o subdomínio da empresa')
      return
    }

    // Redirecionar para o subdomínio
    const currentHost = window.location.host
    const baseDomain = currentHost.includes('localhost') 
      ? 'localhost:3000' 
      : currentHost.split('.').slice(-2).join('.')
    
    const newUrl = `http://${subdomain}.${baseDomain}`
    window.location.href = newUrl
  }

  const handleCompanySelect = (company: Company) => {
    const currentHost = window.location.host
    const baseDomain = currentHost.includes('localhost') 
      ? 'localhost:3000' 
      : currentHost.split('.').slice(-2).join('.')
    
    const newUrl = `http://${company.subdomain}.${baseDomain}`
    window.location.href = newUrl
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md space-y-6">
        <div className="text-center">
          <Building2 className="mx-auto h-12 w-12 text-blue-600" />
          <h1 className="mt-4 text-3xl font-bold tracking-tight text-gray-900">
            Talentia
          </h1>
          <p className="mt-2 text-sm text-gray-600">
            Sistema de Gestão de Talentos
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Selecione sua Empresa</CardTitle>
            <CardDescription>
              Digite o subdomínio da sua empresa ou selecione uma das opções abaixo
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {error && (
              <Alert variant="destructive">
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            <form onSubmit={handleSubdomainSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="subdomain">Subdomínio da Empresa</Label>
                <div className="flex space-x-2">
                  <Input
                    id="subdomain"
                    type="text"
                    placeholder="minhaempresa"
                    value={subdomain}
                    onChange={(e) => {
                      setSubdomain(e.target.value)
                      setError('')
                    }}
                    className="flex-1"
                  />
                  <Button type="submit" disabled={loading}>
                    {loading ? (
                      <LoadingSpinner size="sm" />
                    ) : (
                      <Search className="h-4 w-4" />
                    )}
                  </Button>
                </div>
                <p className="text-xs text-gray-500">
                  Ex: se sua empresa é &quot;minhaempresa.talentia.com&quot;, digite &quot;minhaempresa&quot;
                </p>
              </div>
            </form>

            {companies.length > 0 && (
              <div className="space-y-3">
                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <span className="w-full border-t" />
                  </div>
                  <div className="relative flex justify-center text-xs uppercase">
                    <span className="bg-white px-2 text-gray-500">Ou selecione</span>
                  </div>
                </div>

                <div className="space-y-2">
                  {companies.map((company) => (
                    <Button
                      key={company.id}
                      variant="outline"
                      className="w-full justify-start"
                      onClick={() => handleCompanySelect(company)}
                    >
                      <Building2 className="mr-2 h-4 w-4" />
                      <div className="text-left">
                        <div className="font-medium">{company.name}</div>
                        <div className="text-xs text-gray-500">{company.subdomain}.talentia.com</div>
                      </div>
                    </Button>
                  ))}
                </div>
              </div>
            )}

            <div className="text-center pt-4">
              <p className="text-sm text-gray-600">
                Não encontrou sua empresa?{' '}
                <Link href="/auth/signup" className="font-medium text-blue-600 hover:text-blue-500">
                  Cadastre-se
                </Link>
              </p>
            </div>
          </CardContent>
        </Card>

        <div className="text-center">
          <p className="text-xs text-gray-500">
            Para demonstração, use o subdomínio: <strong>demo</strong>
          </p>
        </div>
      </div>
    </div>
  )
}