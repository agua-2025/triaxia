import Link from 'next/link'
import { ArrowRight, Users, Brain, Target, Zap } from 'lucide-react'

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold text-gray-900">Triaxia</h1>
            </div>
            <nav className="hidden md:flex space-x-8">
              <Link href="#features" className="text-gray-500 hover:text-gray-900">
                Recursos
              </Link>
              <Link href="#about" className="text-gray-500 hover:text-gray-900">
                Sobre
              </Link>
              <Link href="/dashboard" className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700">
                Acessar Sistema
              </Link>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              Sistema de Banco de Talentos
              <span className="block text-blue-600">com Inteligência Artificial</span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              Revolucione seu processo de recrutamento com análise inteligente de perfis, 
              match automático e pipeline completo de contratação.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                href="/dashboard" 
                className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 flex items-center justify-center"
              >
                Começar Agora
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
              <Link 
                href="#features" 
                className="border border-gray-300 text-gray-700 px-8 py-3 rounded-lg font-semibold hover:bg-gray-50"
              >
                Conhecer Recursos
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Recursos Principais
            </h2>
            <p className="text-lg text-gray-600">
              Tecnologia avançada para otimizar seu processo de recrutamento
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Banco de Talentos
              </h3>
              <p className="text-gray-600">
                Cadastro inteligente de candidatos sem vaga específica para futuras oportunidades
              </p>
            </div>
            
            <div className="text-center">
              <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Brain className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Análise com IA
              </h3>
              <p className="text-gray-600">
                Análise inteligente de perfis e competências usando inteligência artificial
              </p>
            </div>
            
            <div className="text-center">
              <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Target className="h-8 w-8 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Match Automático
              </h3>
              <p className="text-gray-600">
                Algoritmo que identifica automaticamente os melhores candidatos para cada vaga
              </p>
            </div>
            
            <div className="text-center">
              <div className="bg-orange-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Zap className="h-8 w-8 text-orange-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Pipeline Completo
              </h3>
              <p className="text-gray-600">
                Sistema completo de recrutamento com notificações e ranking de candidatos
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                Transforme seu Recrutamento
              </h2>
              <p className="text-lg text-gray-600 mb-6">
                O Triaxia é uma plataforma completa que utiliza inteligência artificial 
                para revolucionar o processo de recrutamento e seleção.
              </p>
              <ul className="space-y-4">
                <li className="flex items-start">
                  <div className="bg-blue-600 w-2 h-2 rounded-full mt-2 mr-3"></div>
                  <span className="text-gray-700">
                    Cadastro inteligente no banco de talentos sem vaga específica
                  </span>
                </li>
                <li className="flex items-start">
                  <div className="bg-blue-600 w-2 h-2 rounded-full mt-2 mr-3"></div>
                  <span className="text-gray-700">
                    Análise automática de perfil para futuras oportunidades
                  </span>
                </li>
                <li className="flex items-start">
                  <div className="bg-blue-600 w-2 h-2 rounded-full mt-2 mr-3"></div>
                  <span className="text-gray-700">
                    Match automático quando novas vagas são criadas
                  </span>
                </li>
                <li className="flex items-start">
                  <div className="bg-blue-600 w-2 h-2 rounded-full mt-2 mr-3"></div>
                  <span className="text-gray-700">
                    Sistema de notificações inteligentes
                  </span>
                </li>
              </ul>
            </div>
            <div className="bg-white p-8 rounded-lg shadow-lg">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                Pronto para começar?
              </h3>
              <p className="text-gray-600 mb-6">
                Acesse o sistema e comece a otimizar seu processo de recrutamento hoje mesmo.
              </p>
              <Link 
                href="/dashboard" 
                className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 inline-flex items-center"
              >
                Acessar Dashboard
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h3 className="text-2xl font-bold mb-4">Triaxia</h3>
            <p className="text-gray-400 mb-4">
              Sistema de Banco de Talentos com Inteligência Artificial
            </p>
            <p className="text-gray-500 text-sm">
              © 2025 Triaxia. Todos os direitos reservados.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}
