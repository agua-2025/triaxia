'use client'

import { Brain, Users, Target, Zap, BarChart3, Shield, CheckCircle, Sparkles, ArrowRight } from 'lucide-react'
import Link from 'next/link'

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 text-slate-800 overflow-x-hidden relative">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-indigo-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob animation-delay-2000"></div>
        <div className="absolute top-40 left-40 w-80 h-80 bg-cyan-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob animation-delay-4000"></div>
      </div>

      {/* Header */}
      <header className="relative z-10 px-6 py-4">
        <nav className="flex items-center justify-between max-w-7xl mx-auto">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center">
              <Brain className="w-5 h-5 text-white" />
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-700 bg-clip-text text-transparent">
              Triaxia
            </span>
          </div>
          <div className="hidden md:flex items-center space-x-8">
            <a href="#recursos" className="hover:text-blue-600 transition-colors font-medium">
              Recursos
            </a>
            <a href="#precos" className="hover:text-blue-600 transition-colors font-medium">
              Preços
            </a>
            <a href="#sobre" className="hover:text-blue-600 transition-colors font-medium">
              Sobre
            </a>
            <button className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white px-6 py-2 rounded-full hover:from-blue-700 hover:to-indigo-800 transition-all duration-300 transform hover:scale-105 shadow-lg">
              Começar Agora
            </button>
          </div>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="relative z-10 px-6 py-20 text-center">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <div className="inline-flex items-center px-4 py-2 bg-blue-100/80 backdrop-blur-sm rounded-full border border-blue-200 mb-6">
              <Sparkles className="w-4 h-4 mr-2 text-blue-600" />
              <span className="text-sm font-medium text-blue-700">Powered by Advanced AI</span>
            </div>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight text-slate-800">
            O Papel Ficou
            <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-700 bg-clip-text text-transparent block">
              Para Trás
            </span>
            <span className="text-3xl md:text-4xl font-normal text-slate-600 block mt-4">
              IA faz em segundos o que sua equipe faria em dias
            </span>
          </h1>
          
          <p className="text-xl text-slate-600 mb-8 max-w-2xl mx-auto leading-relaxed">
            <strong>Ocupe sua equipe de RH com o que é realmente necessário.</strong><br/>
            Deixe a inteligência artificial processar milhares de currículos, 
            fazer análises comportamentais e encontrar matches perfeitos automaticamente.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <button className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white px-8 py-4 rounded-full text-lg font-semibold hover:from-blue-700 hover:to-indigo-800 transition-all duration-300 transform hover:scale-105 shadow-2xl">
              Começar Teste Grátis
            </button>
            <button className="border border-slate-300 px-8 py-4 rounded-full text-lg font-semibold text-slate-700 hover:bg-slate-100 transition-all duration-300 backdrop-blur-sm">
              Ver Demonstração
            </button>
          </div>
          
          <div className="mt-12 flex flex-wrap items-center justify-center gap-8 text-sm text-slate-500">
            <div className="flex items-center">
              <CheckCircle className="w-5 h-5 mr-2 text-green-500" />
              Teste grátis 14 dias
            </div>
            <div className="flex items-center">
              <CheckCircle className="w-5 h-5 mr-2 text-green-500" />
              Sem cartão de crédito
            </div>
            <div className="flex items-center">
              <CheckCircle className="w-5 h-5 mr-2 text-green-500" />
              Suporte 24/7
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="recursos" className="relative z-10 px-6 py-20">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-slate-800">
              Recursos
              <span className="bg-gradient-to-r from-blue-600 to-indigo-700 bg-clip-text text-transparent block">
                Revolucionários
              </span>
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Tecnologia de ponta para transformar completamente seu processo de recrutamento
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="group bg-white/80 backdrop-blur-sm border border-slate-200 rounded-2xl p-8 hover:bg-white/90 transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl h-full flex flex-col">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center mb-6">
                <Brain className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-4 text-slate-800">Análise de IA Avançada</h3>
              <p className="text-slate-600 leading-relaxed flex-grow">
                Algoritmos de machine learning analisam perfis comportamentais, 
                competências técnicas e fit cultural automaticamente.
              </p>
            </div>
            
            {/* Feature 2 */}
            <div className="group bg-white/80 backdrop-blur-sm border border-slate-200 rounded-2xl p-8 hover:bg-white/90 transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl h-full flex flex-col">
              <div className="w-12 h-12 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center mb-6">
                <Target className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-4 text-slate-800">Match Automático</h3>
              <p className="text-slate-600 leading-relaxed flex-grow">
                Sistema inteligente que conecta automaticamente candidatos 
                às vagas mais adequadas com precisão de 95%.
              </p>
            </div>
            
            {/* Feature 3 */}
            <div className="group bg-white/80 backdrop-blur-sm border border-slate-200 rounded-2xl p-8 hover:bg-white/90 transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl h-full flex flex-col">
              <div className="w-12 h-12 bg-gradient-to-r from-emerald-500 to-teal-600 rounded-xl flex items-center justify-center mb-6">
                <Zap className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-4 text-slate-800">Processamento Instantâneo</h3>
              <p className="text-slate-600 leading-relaxed flex-grow">
                Processe milhares de currículos em segundos. 
                O que levaria dias, nossa IA faz em tempo real.
              </p>
            </div>
            
            {/* Feature 4 */}
            <div className="group bg-white/80 backdrop-blur-sm border border-slate-200 rounded-2xl p-8 hover:bg-white/90 transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl h-full flex flex-col">
              <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-amber-600 rounded-xl flex items-center justify-center mb-6">
                <BarChart3 className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-4 text-slate-800">Analytics Preditivos</h3>
              <p className="text-slate-600 leading-relaxed flex-grow">
                Insights avançados sobre tendências de mercado, 
                performance de candidatos e otimização de processos.
              </p>
            </div>
            
            {/* Feature 5 */}
            <div className="group bg-white/80 backdrop-blur-sm border border-slate-200 rounded-2xl p-8 hover:bg-white/90 transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl h-full flex flex-col">
              <div className="w-12 h-12 bg-gradient-to-r from-violet-500 to-purple-600 rounded-xl flex items-center justify-center mb-6">
                <Users className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-4 text-slate-800">Banco de Talentos Inteligente</h3>
              <p className="text-slate-600 leading-relaxed flex-grow">
                Construa um banco de talentos que aprende e evolui, 
                identificando candidatos ideais para futuras oportunidades.
              </p>
            </div>
            
            {/* Feature 6 */}
            <div className="group bg-white/80 backdrop-blur-sm border border-slate-200 rounded-2xl p-8 hover:bg-white/90 transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl h-full flex flex-col">
              <div className="w-12 h-12 bg-gradient-to-r from-rose-500 to-pink-600 rounded-xl flex items-center justify-center mb-6">
                <Shield className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-4 text-slate-800">Segurança Enterprise</h3>
              <p className="text-slate-600 leading-relaxed flex-grow">
                Proteção de dados de nível empresarial com criptografia 
                avançada e compliance total com LGPD.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="precos" className="relative z-10 px-6 py-20">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <div className="inline-flex items-center px-4 py-2 bg-green-100/80 backdrop-blur-sm rounded-full border border-green-200 mb-6">
              <Sparkles className="w-4 h-4 mr-2 text-green-600" />
              <span className="text-sm font-medium text-green-700">Planos Flexíveis</span>
            </div>
            
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-slate-800">
              Escolha seu
              <span className="bg-gradient-to-r from-blue-600 to-indigo-700 bg-clip-text text-transparent block">
                Plano Ideal
              </span>
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Soluções escaláveis para empresas de todos os portes
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {/* Starter Plan */}
            <div className="bg-white/80 backdrop-blur-sm border border-slate-200 rounded-2xl p-8 hover:bg-white/90 transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl h-full flex flex-col">
              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold text-slate-800 mb-2">Starter</h3>
                <div className="text-4xl font-bold text-blue-600 mb-2">R$ 299</div>
                <div className="text-slate-500">/mês</div>
              </div>
              
              <ul className="space-y-4 mb-8 flex-grow">
                <li className="flex items-center text-slate-600">
                  <CheckCircle className="w-5 h-5 mr-3 text-green-500" />
                  Até 50 candidatos no banco
                </li>
                <li className="flex items-center text-slate-600">
                  <CheckCircle className="w-5 h-5 mr-3 text-green-500" />
                  5 vagas ativas simultâneas
                </li>
                <li className="flex items-center text-slate-600">
                  <CheckCircle className="w-5 h-5 mr-3 text-green-500" />
                  Análise básica de IA
                </li>
                <li className="flex items-center text-slate-600">
                  <CheckCircle className="w-5 h-5 mr-3 text-green-500" />
                  Suporte por email
                </li>
                <li className="flex items-center text-slate-600">
                  <CheckCircle className="w-5 h-5 mr-3 text-green-500" />
                  Dashboard básico
                </li>
              </ul>
              
              <button className="w-full bg-gradient-to-r from-blue-600 to-indigo-700 text-white py-3 rounded-full font-semibold hover:from-blue-700 hover:to-indigo-800 transition-all duration-300">
                Começar Teste Grátis
              </button>
            </div>
            
            {/* Professional Plan - Popular */}
            <div className="bg-white/90 backdrop-blur-sm border-2 border-blue-300 rounded-2xl p-8 hover:bg-white transition-all duration-300 hover:scale-105 shadow-xl hover:shadow-2xl h-full flex flex-col relative">
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                <span className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white px-4 py-1 rounded-full text-sm font-semibold">
                  Mais Popular
                </span>
              </div>
              
              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold text-slate-800 mb-2">Professional</h3>
                <div className="text-4xl font-bold text-blue-600 mb-2">R$ 699</div>
                <div className="text-slate-500">/mês</div>
              </div>
              
              <ul className="space-y-4 mb-8 flex-grow">
                <li className="flex items-center text-slate-600">
                  <CheckCircle className="w-5 h-5 mr-3 text-green-500" />
                  Até 500 candidatos no banco
                </li>
                <li className="flex items-center text-slate-600">
                  <CheckCircle className="w-5 h-5 mr-3 text-green-500" />
                  20 vagas ativas simultâneas
                </li>
                <li className="flex items-center text-slate-600">
                  <CheckCircle className="w-5 h-5 mr-3 text-green-500" />
                  IA avançada com matching
                </li>
                <li className="flex items-center text-slate-600">
                  <CheckCircle className="w-5 h-5 mr-3 text-green-500" />
                  Suporte prioritário
                </li>
                <li className="flex items-center text-slate-600">
                  <CheckCircle className="w-5 h-5 mr-3 text-green-500" />
                  Analytics completos
                </li>
                <li className="flex items-center text-slate-600">
                  <CheckCircle className="w-5 h-5 mr-3 text-green-500" />
                  Integração com ATS
                </li>
                <li className="flex items-center text-slate-600">
                  <CheckCircle className="w-5 h-5 mr-3 text-green-500" />
                  Pipeline automático
                </li>
              </ul>
              
              <button className="w-full bg-gradient-to-r from-blue-600 to-indigo-700 text-white py-3 rounded-full font-semibold hover:from-blue-700 hover:to-indigo-800 transition-all duration-300">
                Começar Teste Grátis
              </button>
            </div>
            
            {/* Enterprise Plan */}
            <div className="bg-white/80 backdrop-blur-sm border border-slate-200 rounded-2xl p-8 hover:bg-white/90 transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl h-full flex flex-col">
              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold text-slate-800 mb-2">Enterprise</h3>
                <div className="text-4xl font-bold text-slate-600 mb-2">Customizado</div>
                <div className="text-slate-500">Sob consulta</div>
              </div>
              
              <ul className="space-y-4 mb-8 flex-grow">
                <li className="flex items-center text-slate-600">
                  <CheckCircle className="w-5 h-5 mr-3 text-green-500" />
                  Candidatos ilimitados
                </li>
                <li className="flex items-center text-slate-600">
                  <CheckCircle className="w-5 h-5 mr-3 text-green-500" />
                  Vagas ilimitadas
                </li>
                <li className="flex items-center text-slate-600">
                  <CheckCircle className="w-5 h-5 mr-3 text-green-500" />
                  IA personalizada
                </li>
                <li className="flex items-center text-slate-600">
                  <CheckCircle className="w-5 h-5 mr-3 text-green-500" />
                  Suporte dedicado 24/7
                </li>
                <li className="flex items-center text-slate-600">
                  <CheckCircle className="w-5 h-5 mr-3 text-green-500" />
                  White-label disponível
                </li>
                <li className="flex items-center text-slate-600">
                  <CheckCircle className="w-5 h-5 mr-3 text-green-500" />
                  Integrações customizadas
                </li>
                <li className="flex items-center text-slate-600">
                  <CheckCircle className="w-5 h-5 mr-3 text-green-500" />
                  SLA garantido
                </li>
                <li className="flex items-center text-slate-600">
                  <CheckCircle className="w-5 h-5 mr-3 text-green-500" />
                  Treinamento incluso
                </li>
              </ul>
              
              <button className="w-full border border-slate-300 text-slate-700 py-3 rounded-full font-semibold hover:bg-slate-100 transition-all duration-300">
                Falar com Vendas
              </button>
            </div>
          </div>
          
          <div className="text-center mt-12">
            <p className="text-slate-500 mb-4">✅ Teste grátis de 14 dias em todos os planos</p>
            <div className="flex flex-wrap justify-center gap-8 text-sm text-slate-500">
              <span>🔄 Migração gratuita</span>
              <span>🛡️ Suporte especializado</span>
              <span>🔒 Dados seguros</span>
              <span>📞 Cancelamento flexível</span>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="sobre" className="relative z-10 px-6 py-20">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-8 text-slate-800">
            Sobre o
            <span className="bg-gradient-to-r from-blue-600 to-indigo-700 bg-clip-text text-transparent block">
              Triaxia
            </span>
          </h2>
          <p className="text-xl text-slate-600 leading-relaxed mb-8">
            Somos pioneiros em inteligência artificial aplicada ao recrutamento. 
            Nossa missão é revolucionar como empresas encontram e conectam talentos, 
            eliminando barreiras e criando oportunidades através da tecnologia.
          </p>
          <div className="grid md:grid-cols-3 gap-8 mt-12">
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600 mb-2">95%</div>
              <div className="text-slate-600">Precisão no matching</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600 mb-2">10x</div>
              <div className="text-slate-600">Mais rápido que métodos tradicionais</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600 mb-2">500+</div>
              <div className="text-slate-600">Empresas confiam em nós</div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 px-6 py-12 border-t border-slate-200">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-2 mb-4 md:mb-0">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center">
                <Brain className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-indigo-700 bg-clip-text text-transparent">
                Triaxia
              </span>
            </div>
            <div className="text-slate-500 text-sm">
              © 2024 Triaxia. Todos os direitos reservados.
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
