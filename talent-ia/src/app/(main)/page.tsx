import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import Link from 'next/link'
import { Brain, Users, Zap, Target, ArrowRight } from 'lucide-react'

export default function Home() {
  return (
    <div className="container mx-auto px-4">
      {/* Hero Section */}
      <section className="py-20 text-center">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            Conecte <span className="text-blue-600">Talentos</span> e{' '}
            <span className="text-blue-600">Empresas</span> com IA
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            A plataforma de recrutamento mais inteligente do Brasil. 
            Encontre o match perfeito com tecnologia de ponta.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/auth/register">
              <Button size="lg" className="w-full sm:w-auto">
                Começar Agora
                <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </Link>
            <Link href="/jobs">
              <Button variant="outline" size="lg" className="w-full sm:w-auto">
                Explorar Vagas
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gray-50 -mx-4 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Por que escolher a TalentIA?
            </h2>
            <p className="text-lg text-gray-600">
              Tecnologia avançada para revolucionar seu processo de recrutamento
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <Card>
              <CardHeader>
                <Brain className="w-12 h-12 text-blue-600 mb-4" />
                <CardTitle>IA Avançada</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Análise inteligente de currículos e matching automático entre candidatos e vagas.
                </CardDescription>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <Target className="w-12 h-12 text-green-600 mb-4" />
                <CardTitle>Match Preciso</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Algoritmos que identificam a compatibilidade perfeita baseada em skills e cultura.
                </CardDescription>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <Zap className="w-12 h-12 text-yellow-600 mb-4" />
                <CardTitle>Processo Rápido</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Reduza o tempo de contratação em até 70% com automação inteligente.
                </CardDescription>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <Users className="w-12 h-12 text-purple-600 mb-4" />
                <CardTitle>Comunidade Ativa</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Milhares de profissionais e empresas já confiam na nossa plataforma.
                </CardDescription>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 text-center">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">
            Pronto para encontrar seu próximo talento?
          </h2>
          <p className="text-lg text-gray-600 mb-8">
            Junte-se a centenas de empresas que já transformaram seu processo de recrutamento.
          </p>
          <Link href="/auth/register">
            <Button size="lg">
              Criar Conta Gratuita
            </Button>
          </Link>
        </div>
      </section>
    </div>
  )
}