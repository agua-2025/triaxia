import Link from 'next/link'
import { ArrowRight, Brain, Users, Zap, Target, Sparkles, Network, Eye } from 'lucide-react'

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-20 left-20 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl animate-pulse"></div>
        <div className="absolute top-40 right-20 w-72 h-72 bg-cyan-500 rounded-full mix-blend-multiply filter blur-xl animate-pulse animation-delay-2000"></div>
        <div className="absolute bottom-20 left-40 w-72 h-72 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl animate-pulse animation-delay-4000"></div>
      </div>

      {/* Header */}
      <header className="relative z-10 backdrop-blur-sm bg-white/5 border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center space-x-3">
              <div className="relative">
                <div className="w-10 h-10 bg-gradient-to-r from-purple-400 to-cyan-400 rounded-lg flex items-center justify-center">
                  <Network className="w-6 h-6 text-white" />
                </div>
                <div className="absolute -top-1 -right-1 w-4 h-4 bg-gradient-to-r from-pink-400 to-purple-400 rounded-full animate-ping"></div>
              </div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-white to-purple-200 bg-clip-text text-transparent">
                Triaxia
              </h1>
            </div>
            <nav className="hidden md:flex items-center space-x-8">
               <Link href="#features" className="text-gray-300 hover:text-white transition-colors duration-300">
                 Recursos
               </Link>
               <Link href="#pricing" className="text-gray-300 hover:text-white transition-colors duration-300">
                 Preços
               </Link>
               <Link href="#about" className="text-gray-300 hover:text-white transition-colors duration-300">
                 Sobre
               </Link>
               <Link 
                 href="/dashboard" 
                 className="bg-gradient-to-r from-purple-500 to-cyan-500 text-white px-6 py-2.5 rounded-full hover:from-purple-600 hover:to-cyan-600 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-purple-500/25"
               >
                 Acessar Sistema
               </Link>
             </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative z-10 py-32">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center">
            {/* Floating Elements */}
            <div className="absolute top-20 left-1/4 w-2 h-2 bg-purple-400 rounded-full animate-bounce animation-delay-1000"></div>
            <div className="absolute top-32 right-1/3 w-3 h-3 bg-cyan-400 rounded-full animate-bounce animation-delay-2000"></div>
            <div className="absolute top-40 left-1/3 w-1.5 h-1.5 bg-pink-400 rounded-full animate-bounce animation-delay-3000"></div>
            
            <div className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 mb-8 border border-white/20">
              <Sparkles className="w-4 h-4 text-purple-300" />
              <span className="text-sm text-purple-200">Powered by Artificial Intelligence</span>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold mb-8 leading-tight">
              <span className="bg-gradient-to-r from-white via-purple-200 to-cyan-200 bg-clip-text text-transparent">
                Banco de Talentos
              </span>
              <br />
              <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent">
                Inteligente
              </span>
            </h1>
            
            <p className="text-xl md:text-2xl text-gray-300 mb-12 max-w-4xl mx-auto leading-relaxed">
              Revolucione seu processo de recrutamento com análise preditiva, 
              <span className="text-purple-300"> matching automático</span> e 
              <span className="text-cyan-300"> insights baseados em IA</span>
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              <Link 
                href="/dashboard" 
                className="group bg-gradient-to-r from-purple-500 to-cyan-500 text-white px-8 py-4 rounded-full font-semibold hover:from-purple-600 hover:to-cyan-600 transition-all duration-300 transform hover:scale-105 shadow-2xl hover:shadow-purple-500/30 flex items-center space-x-3"
              >
                <span>Começar Agora</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link 
                href="#features" 
                className="border border-white/30 text-white px-8 py-4 rounded-full font-semibold hover:bg-white/10 transition-all duration-300 backdrop-blur-sm"
              >
                Descobrir Recursos
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="relative z-10 py-32">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              <span className="bg-gradient-to-r from-white to-purple-200 bg-clip-text text-transparent">
                Recursos Avançados
              </span>
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Tecnologia de ponta para transformar como você encontra e conecta talentos
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Feature 1 */}
            <div className="group relative">
              <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-cyan-500/20 rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-300"></div>
              <div className="relative bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-8 hover:bg-white/15 transition-all duration-300 transform hover:-translate-y-2">
                <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-purple-600 rounded-2xl flex items-center justify-center mb-6 mx-auto">
                  <Users className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-white mb-4 text-center">
                  Banco Inteligente
                </h3>
                <p className="text-gray-300 text-center leading-relaxed">
                  Cadastro automático de talentos com análise preditiva para futuras oportunidades
                </p>
              </div>
            </div>
            
            {/* Feature 2 */}
            <div className="group relative">
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-300"></div>
              <div className="relative bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-8 hover:bg-white/15 transition-all duration-300 transform hover:-translate-y-2">
                <div className="w-16 h-16 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-2xl flex items-center justify-center mb-6 mx-auto">
                  <Brain className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-white mb-4 text-center">
                  IA Avançada
                </h3>
                <p className="text-gray-300 text-center leading-relaxed">
                  Análise profunda de competências e personalidade usando machine learning
                </p>
              </div>
            </div>
            
            {/* Feature 3 */}
            <div className="group relative">
              <div className="absolute inset-0 bg-gradient-to-r from-pink-500/20 to-purple-500/20 rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-300"></div>
              <div className="relative bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-8 hover:bg-white/15 transition-all duration-300 transform hover:-translate-y-2">
                <div className="w-16 h-16 bg-gradient-to-r from-pink-500 to-purple-600 rounded-2xl flex items-center justify-center mb-6 mx-auto">
                  <Target className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-white mb-4 text-center">
                  Match Perfeito
                </h3>
                <p className="text-gray-300 text-center leading-relaxed">
                  Algoritmo que identifica candidatos ideais com 95% de precisão
                </p>
              </div>
            </div>
            
            {/* Feature 4 */}
            <div className="group relative">
              <div className="absolute inset-0 bg-gradient-to-r from-orange-500/20 to-red-500/20 rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-300"></div>
              <div className="relative bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-8 hover:bg-white/15 transition-all duration-300 transform hover:-translate-y-2">
                <div className="w-16 h-16 bg-gradient-to-r from-orange-500 to-red-600 rounded-2xl flex items-center justify-center mb-6 mx-auto">
                  <Zap className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-white mb-4 text-center">
                  Pipeline Automático
                </h3>
                <p className="text-gray-300 text-center leading-relaxed">
                  Processo completo de recrutamento com automação inteligente
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="relative z-10 py-32">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-20">
            <div className="inline-flex items-center space-x-2 bg-green-500/20 backdrop-blur-sm rounded-full px-4 py-2 mb-8 border border-green-500/30">
              <Sparkles className="w-4 h-4 text-green-300" />
              <span className="text-sm text-green-200">Planos Flexíveis</span>
            </div>
            
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              <span className="bg-gradient-to-r from-white to-purple-200 bg-clip-text text-transparent">
                Escolha seu
              </span>
              <br />
              <span className="bg-gradient-to-r from-green-400 to-cyan-400 bg-clip-text text-transparent">
                Plano Ideal
              </span>
            </h2>
            
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Soluções escaláveis para empresas de todos os tamanhos
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {/* Starter Plan */}
            <div className="group relative">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-cyan-500/20 rounded-3xl blur-xl group-hover:blur-2xl transition-all duration-300"></div>
              <div className="relative bg-white/10 backdrop-blur-sm border border-white/20 rounded-3xl p-8 hover:bg-white/15 transition-all duration-300 transform hover:-translate-y-2">
                <div className="text-center mb-8">
                  <h3 className="text-2xl font-bold text-white mb-2">Starter</h3>
                  <p className="text-gray-300 mb-6">Para pequenas empresas</p>
                  <div className="mb-6">
                    <span className="text-4xl font-bold text-white">R$ 299</span>
                    <span className="text-gray-300">/mês</span>
                  </div>
                </div>
                
                <div className="space-y-4 mb-8">
                  {[
                    'Até 50 candidatos no banco',
                    '5 vagas ativas simultâneas',
                    'Análise básica de IA',
                    'Suporte por email',
                    'Dashboard básico'
                  ].map((feature, index) => (
                    <div key={index} className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-gradient-to-r from-blue-400 to-cyan-400 rounded-full mt-2 flex-shrink-0"></div>
                      <span className="text-gray-300">{feature}</span>
                    </div>
                  ))}
                </div>
                
                <Link 
                  href="/dashboard" 
                  className="w-full bg-gradient-to-r from-blue-500 to-cyan-500 text-white px-6 py-3 rounded-2xl font-semibold hover:from-blue-600 hover:to-cyan-600 transition-all duration-300 text-center block"
                >
                  Começar Teste Grátis
                </Link>
              </div>
            </div>
            
            {/* Professional Plan */}
            <div className="group relative">
              <div className="absolute inset-0 bg-gradient-to-r from-purple-500/30 to-pink-500/30 rounded-3xl blur-xl group-hover:blur-2xl transition-all duration-300"></div>
              <div className="relative bg-white/15 backdrop-blur-sm border-2 border-purple-500/50 rounded-3xl p-8 hover:bg-white/20 transition-all duration-300 transform hover:-translate-y-2">
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <div className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-4 py-2 rounded-full text-sm font-semibold">
                    Mais Popular
                  </div>
                </div>
                
                <div className="text-center mb-8 mt-4">
                  <h3 className="text-2xl font-bold text-white mb-2">Professional</h3>
                  <p className="text-gray-300 mb-6">Para empresas em crescimento</p>
                  <div className="mb-6">
                    <span className="text-4xl font-bold text-white">R$ 699</span>
                    <span className="text-gray-300">/mês</span>
                  </div>
                </div>
                
                <div className="space-y-4 mb-8">
                  {[
                    'Até 500 candidatos no banco',
                    '20 vagas ativas simultâneas',
                    'IA avançada com matching',
                    'Suporte prioritário',
                    'Analytics completos',
                    'Integração com ATS',
                    'Pipeline automático'
                  ].map((feature, index) => (
                    <div key={index} className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full mt-2 flex-shrink-0"></div>
                      <span className="text-gray-300">{feature}</span>
                    </div>
                  ))}
                </div>
                
                <Link 
                  href="/dashboard" 
                  className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 py-3 rounded-2xl font-semibold hover:from-purple-600 hover:to-pink-600 transition-all duration-300 text-center block shadow-lg hover:shadow-purple-500/30"
                >
                  Começar Teste Grátis
                </Link>
              </div>
            </div>
            
            {/* Enterprise Plan */}
            <div className="group relative">
              <div className="absolute inset-0 bg-gradient-to-r from-orange-500/20 to-red-500/20 rounded-3xl blur-xl group-hover:blur-2xl transition-all duration-300"></div>
              <div className="relative bg-white/10 backdrop-blur-sm border border-white/20 rounded-3xl p-8 hover:bg-white/15 transition-all duration-300 transform hover:-translate-y-2">
                <div className="text-center mb-8">
                  <h3 className="text-2xl font-bold text-white mb-2">Enterprise</h3>
                  <p className="text-gray-300 mb-6">Para grandes corporações</p>
                  <div className="mb-6">
                    <span className="text-4xl font-bold text-white">Custom</span>
                    <span className="text-gray-300 block text-sm">Sob consulta</span>
                  </div>
                </div>
                
                <div className="space-y-4 mb-8">
                  {[
                    'Candidatos ilimitados',
                    'Vagas ilimitadas',
                    'IA personalizada',
                    'Suporte dedicado 24/7',
                    'White-label disponível',
                    'Integrações customizadas',
                    'SLA garantido',
                    'Treinamento incluso'
                  ].map((feature, index) => (
                    <div key={index} className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-gradient-to-r from-orange-400 to-red-400 rounded-full mt-2 flex-shrink-0"></div>
                      <span className="text-gray-300">{feature}</span>
                    </div>
                  ))}
                </div>
                
                <Link 
                  href="/dashboard" 
                  className="w-full bg-gradient-to-r from-orange-500 to-red-500 text-white px-6 py-3 rounded-2xl font-semibold hover:from-orange-600 hover:to-red-600 transition-all duration-300 text-center block"
                >
                  Falar com Vendas
                </Link>
              </div>
            </div>
          </div>
          
          <div className="text-center mt-16">
            <p className="text-gray-400 mb-4">
              Todos os planos incluem 14 dias de teste grátis • Sem compromisso • Cancele a qualquer momento
            </p>
            <div className="flex justify-center items-center space-x-8 text-sm text-gray-500">
              <span>✓ Migração gratuita</span>
              <span>✓ Suporte especializado</span>
              <span>✓ Dados seguros</span>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="relative z-10 py-32">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <div className="inline-flex items-center space-x-2 bg-purple-500/20 backdrop-blur-sm rounded-full px-4 py-2 mb-8 border border-purple-500/30">
                <Eye className="w-4 h-4 text-purple-300" />
                <span className="text-sm text-purple-200">Visão do Futuro</span>
              </div>
              
              <h2 className="text-4xl md:text-5xl font-bold mb-8">
                <span className="bg-gradient-to-r from-white to-purple-200 bg-clip-text text-transparent">
                  O Futuro do
                </span>
                <br />
                <span className="bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
                  Recrutamento
                </span>
              </h2>
              
              <p className="text-xl text-gray-300 mb-8 leading-relaxed">
                Triaxia combina inteligência artificial de última geração com design intuitivo 
                para criar a plataforma de recrutamento mais avançada do mercado.
              </p>
              
              <div className="space-y-6">
                {[
                  'Análise preditiva de compatibilidade cultural',
                  'Matching baseado em soft skills e hard skills',
                  'Insights em tempo real sobre mercado de talentos',
                  'Automação completa do pipeline de contratação'
                ].map((item, index) => (
                  <div key={index} className="flex items-start space-x-4">
                    <div className="w-2 h-2 bg-gradient-to-r from-purple-400 to-cyan-400 rounded-full mt-3 flex-shrink-0"></div>
                    <span className="text-gray-300 text-lg">{item}</span>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-purple-500/30 to-cyan-500/30 rounded-3xl blur-2xl"></div>
              <div className="relative bg-white/10 backdrop-blur-sm border border-white/20 rounded-3xl p-10">
                <div className="text-center mb-8">
                  <div className="w-20 h-20 bg-gradient-to-r from-purple-500 to-cyan-500 rounded-2xl flex items-center justify-center mx-auto mb-6">
                    <Sparkles className="w-10 h-10 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-4">
                    Pronto para Revolucionar?
                  </h3>
                  <p className="text-gray-300 mb-8 leading-relaxed">
                    Junte-se às empresas que já transformaram seu processo de recrutamento com Triaxia.
                  </p>
                </div>
                
                <Link 
                  href="/dashboard" 
                  className="group w-full bg-gradient-to-r from-purple-500 to-cyan-500 text-white px-8 py-4 rounded-2xl font-semibold hover:from-purple-600 hover:to-cyan-600 transition-all duration-300 transform hover:scale-105 shadow-2xl hover:shadow-purple-500/30 flex items-center justify-center space-x-3"
                >
                  <span>Começar Agora</span>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 border-t border-white/10 py-16">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center">
            <div className="flex items-center justify-center space-x-3 mb-6">
              <div className="w-10 h-10 bg-gradient-to-r from-purple-400 to-cyan-400 rounded-lg flex items-center justify-center">
                <Network className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-2xl font-bold bg-gradient-to-r from-white to-purple-200 bg-clip-text text-transparent">
                Triaxia
              </h3>
            </div>
            <p className="text-gray-400 mb-6 text-lg">
              Banco de Talentos com Inteligência Artificial
            </p>
            <div className="w-24 h-px bg-gradient-to-r from-transparent via-purple-500 to-transparent mx-auto mb-6"></div>
            <p className="text-gray-500">
              © 2025 Triaxia. Transformando o futuro do recrutamento.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}
