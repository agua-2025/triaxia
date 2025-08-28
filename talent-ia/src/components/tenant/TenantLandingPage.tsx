'use client'

import { useEffect } from 'react'
import { useTenant, useBranding } from '@/contexts/TenantContext'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Building2, MapPin, Users, Briefcase, ArrowRight, Loader2 } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'

export function TenantLandingPage() {
  const { tenant, isLoading } = useTenant()
  const branding = useBranding()

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4 text-blue-600" />
          <p className="text-gray-600">Carregando portal...</p>
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
              {tenant.logo && (
                <Image
                  src={tenant.logo}
                  alt={`${tenant.name} logo`}
                  width={40}
                  height={40}
                  className="rounded"
                />
              )}
              <div>
                <h1 className="text-xl font-bold" style={{ color: branding.primaryColor }}>
                  {tenant.name}
                </h1>
                <p className="text-sm text-gray-600">Portal de Carreiras</p>
              </div>
            </div>
            <nav className="flex items-center space-x-4">
              <Link href={`/tenant/${tenant.slug}/jobs`}>
                <Button variant="ghost">Vagas</Button>
              </Link>
              <Link href={`/tenant/${tenant.slug}/login`}>
                <Button variant="outline">Entrar</Button>
              </Link>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            Construa sua carreira na{' '}
            <span style={{ color: branding.primaryColor }}>
              {tenant.name}
            </span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Descubra oportunidades únicas e faça parte de uma equipe que está 
            transformando o futuro. Sua próxima grande oportunidade está aqui.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href={`/tenant/${tenant.slug}/jobs`}>
              <Button 
                size="lg" 
                className="text-white"
                style={{ backgroundColor: branding.primaryColor }}
              >
                Ver Vagas Disponíveis
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Link href={`/tenant/${tenant.slug}/about`}>
              <Button size="lg" variant="outline">
                Sobre a Empresa
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Por que trabalhar na {tenant.name}?
            </h2>
            <p className="text-lg text-gray-600">
              Descubra os benefícios de fazer parte da nossa equipe
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <Card className="text-center">
              <CardHeader>
                <Building2 
                  className="h-12 w-12 mx-auto mb-4" 
                  style={{ color: branding.primaryColor }}
                />
                <CardTitle>Ambiente Inovador</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Trabalhe com as tecnologias mais modernas em um ambiente 
                  que estimula a criatividade e inovação.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardHeader>
                <Users 
                  className="h-12 w-12 mx-auto mb-4" 
                  style={{ color: branding.primaryColor }}
                />
                <CardTitle>Equipe Talentosa</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Colabore com profissionais excepcionais e aprenda 
                  continuamente em um ambiente de alta performance.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardHeader>
                <Briefcase 
                  className="h-12 w-12 mx-auto mb-4" 
                  style={{ color: branding.primaryColor }}
                />
                <CardTitle>Crescimento Profissional</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Desenvolva sua carreira com oportunidades de crescimento, 
                  treinamentos e mentoria especializada.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardHeader>
                <MapPin 
                  className="h-12 w-12 mx-auto mb-4" 
                  style={{ color: branding.primaryColor }}
                />
                <CardTitle>Flexibilidade</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Trabalhe de forma híbrida ou remota, com flexibilidade 
                  para equilibrar vida pessoal e profissional.
                </CardDescription>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16" style={{ backgroundColor: branding.primaryColor }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Pronto para dar o próximo passo?
          </h2>
          <p className="text-xl text-white/90 mb-8">
            Explore nossas vagas abertas e candidate-se hoje mesmo!
          </p>
          <Link href={`/tenant/${tenant.slug}/jobs`}>
            <Button size="lg" variant="secondary">
              Ver Todas as Vagas
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-lg font-semibold mb-4">{tenant.name}</h3>
              <p className="text-gray-400">
                Portal de carreiras oficial. Encontre sua próxima oportunidade 
                profissional conosco.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Links Úteis</h3>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <Link href={`/tenant/${tenant.slug}/jobs`} className="hover:text-white">
                    Vagas Disponíveis
                  </Link>
                </li>
                <li>
                  <Link href={`/tenant/${tenant.slug}/about`} className="hover:text-white">
                    Sobre Nós
                  </Link>
                </li>
                <li>
                  <Link href={`/tenant/${tenant.slug}/contact`} className="hover:text-white">
                    Contato
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Suporte</h3>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <Link href={`/tenant/${tenant.slug}/help`} className="hover:text-white">
                    Central de Ajuda
                  </Link>
                </li>
                <li>
                  <Link href={`/tenant/${tenant.slug}/privacy`} className="hover:text-white">
                    Política de Privacidade
                  </Link>
                </li>
                <li>
                  <Link href={`/tenant/${tenant.slug}/terms`} className="hover:text-white">
                    Termos de Uso
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 {tenant.name}. Todos os direitos reservados.</p>
            <p className="mt-2 text-sm">
              Powered by <span style={{ color: branding.primaryColor }}>TalentIA</span>
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}