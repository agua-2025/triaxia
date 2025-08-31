'use client'

import { Brain, Users, Target, Zap, BarChart3, Shield, CheckCircle, Sparkles, ArrowRight, Rocket, Crown, Building } from 'lucide-react'
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
          
          <div className="flex items-center justify-center mb-6">
            <div className="bg-gradient-to-r from-emerald-500 to-teal-600 text-white px-6 py-3 rounded-full text-lg font-semibold shadow-lg animate-pulse">
              ⚡ +2.847 empresas já revolucionaram seu RH
            </div>
          </div>
          
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

      {/* Social Proof Section */}
      <section className="py-16 bg-white border-b border-slate-200 relative z-10">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <p className="text-slate-600 text-lg mb-8 font-medium">Já confiaram no Triaxia:</p>
          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-12">
            <div className="text-2xl md:text-3xl font-bold text-slate-700 hover:text-blue-600 transition-colors duration-300">
              SuperFresh
            </div>
            <div className="w-2 h-2 bg-slate-300 rounded-full hidden md:block"></div>
            <div className="text-2xl md:text-3xl font-bold text-slate-700 hover:text-blue-600 transition-colors duration-300">
              Atacadão Regional
            </div>
            <div className="w-2 h-2 bg-slate-300 rounded-full hidden md:block"></div>
            <div className="text-2xl md:text-3xl font-bold text-slate-700 hover:text-blue-600 transition-colors duration-300">
              Grupo Alimentar
            </div>
            <div className="w-2 h-2 bg-slate-300 rounded-full hidden md:block"></div>
            <div className="text-2xl md:text-3xl font-bold text-slate-700 hover:text-blue-600 transition-colors duration-300">
              TechCorp Brasil
            </div>
            <div className="w-2 h-2 bg-slate-300 rounded-full hidden md:block"></div>
            <div className="text-2xl md:text-3xl font-bold text-slate-700 hover:text-blue-600 transition-colors duration-300">
              Rede Moderna
            </div>
          </div>
          <div className="mt-8 flex justify-center items-center space-x-6 text-slate-500">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-sm font-medium">+847 empresas ativas hoje</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-blue-500 rounded-full animate-pulse"></div>
              <span className="text-sm font-medium">+10.000 contratações realizadas</span>
            </div>
          </div>
        </div>
      </section>

      {/* Differentials Section */}
      <section className="relative z-10 px-6 py-20 bg-gradient-to-r from-purple-50 via-pink-50 to-orange-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-purple-100 to-pink-100 backdrop-blur-sm rounded-full border border-purple-200 mb-6">
              <Sparkles className="w-4 h-4 mr-2 text-purple-600" />
              <span className="text-sm font-medium text-purple-700">Exclusivo no Mercado</span>
            </div>
            
            <h2 className="text-4xl md:text-6xl font-bold mb-6 text-slate-800">
              Por que o Triaxia é
              <span className="bg-gradient-to-r from-purple-600 via-pink-600 to-orange-600 bg-clip-text text-transparent block">
                Completamente Diferente?
              </span>
            </h2>
            <p className="text-xl text-slate-600 max-w-4xl mx-auto leading-relaxed">
              Enquanto outros sistemas apenas automatizam processos antigos, 
              <strong className="text-purple-600">nós revolucionamos completamente a experiência</strong> de recrutamento
            </p>
          </div>
          
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left side - Traditional vs Triaxia */}
            <div className="space-y-8">
              <div className="bg-white/80 backdrop-blur-sm border border-red-200 rounded-2xl p-6 relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-red-400 to-red-600"></div>
                <h3 className="text-lg font-bold text-red-700 mb-4 flex items-center">
                  <span className="w-3 h-3 bg-red-500 rounded-full mr-3"></span>
                  Sistemas Tradicionais
                </h3>
                <ul className="space-y-3 text-slate-600">
                  <li className="flex items-start">
                    <span className="text-red-500 mr-3 mt-1">✗</span>
                    Candidatos competem entre milhares de empresas
                  </li>
                  <li className="flex items-start">
                    <span className="text-red-500 mr-3 mt-1">✗</span>
                    Interface genérica para todos os clientes
                  </li>
                  <li className="flex items-start">
                    <span className="text-red-500 mr-3 mt-1">✗</span>
                    Controle limitado sobre o processo
                  </li>
                  <li className="flex items-start">
                    <span className="text-red-500 mr-3 mt-1">✗</span>
                    Suporte padronizado e demorado
                  </li>
                </ul>
              </div>
              
              <div className="bg-gradient-to-br from-green-50 to-emerald-50 border-2 border-green-200 rounded-2xl p-6 relative overflow-hidden shadow-lg">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-green-400 via-emerald-500 to-teal-600"></div>
                <h3 className="text-lg font-bold text-green-700 mb-4 flex items-center">
                  <span className="w-3 h-3 bg-gradient-to-r from-green-500 to-emerald-600 rounded-full mr-3"></span>
                  Triaxia Revolution
                </h3>
                <ul className="space-y-3 text-slate-700">
                  <li className="flex items-start">
                    <span className="text-green-500 mr-3 mt-1">✓</span>
                    <strong>Candidatura exclusiva:</strong> Zero concorrência entre empresas
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-500 mr-3 mt-1">✓</span>
                    <strong>Página dedicada:</strong> 100% customizável com sua marca
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-500 mr-3 mt-1">✓</span>
                    <strong>Controle total:</strong> Você define todas as regras
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-500 mr-3 mt-1">✓</span>
                    <strong>Suporte dedicado:</strong> Time exclusivo 24/7
                  </li>
                </ul>
              </div>
            </div>
            
            {/* Right side - Visual representation */}
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-purple-300/30 via-pink-300/30 to-orange-300/30 rounded-3xl blur-2xl animate-pulse"></div>
              <div className="relative bg-gradient-to-br from-white/90 to-purple-50/90 backdrop-blur-sm border border-purple-200 rounded-3xl p-8 shadow-2xl">
                <div className="text-center mb-8">
                  <div className="w-20 h-20 bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
                    <Brain className="w-10 h-10 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-4">
                    Experiência Única
                  </h3>
                  <p className="text-slate-600 leading-relaxed">
                    Cada empresa tem seu próprio ecossistema de recrutamento, 
                    com candidatos dedicados exclusivamente aos seus processos.
                  </p>
                </div>
                
                <div className="space-y-4">
                  <div className="flex items-center p-3 bg-gradient-to-r from-purple-100 to-pink-100 rounded-xl">
                    <div className="w-3 h-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full mr-3"></div>
                    <span className="text-sm font-medium text-slate-700">Interface com sua identidade visual</span>
                  </div>
                  <div className="flex items-center p-3 bg-gradient-to-r from-pink-100 to-orange-100 rounded-xl">
                    <div className="w-3 h-3 bg-gradient-to-r from-pink-500 to-orange-500 rounded-full mr-3"></div>
                    <span className="text-sm font-medium text-slate-700">Candidatos focados apenas em você</span>
                  </div>
                  <div className="flex items-center p-3 bg-gradient-to-r from-orange-100 to-yellow-100 rounded-xl">
                    <div className="w-3 h-3 bg-gradient-to-r from-orange-500 to-yellow-500 rounded-full mr-3"></div>
                    <span className="text-sm font-medium text-slate-700">Configuração total do sistema</span>
                  </div>
                </div>
              </div>
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
              <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent block">
                Revolucionários
              </span>
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Tecnologia de ponta para transformar completamente seu processo de recrutamento
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="group relative bg-gradient-to-br from-white/90 to-blue-50/90 backdrop-blur-sm border border-blue-200 rounded-2xl p-8 hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 h-full flex flex-col overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-400/10 via-purple-400/10 to-pink-400/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="relative z-10">
                <div className="w-16 h-16 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                  <Brain className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold mb-4 text-slate-800">Análise de IA Avançada</h3>
                <p className="text-slate-600 leading-relaxed mb-4">
                  Algoritmos de machine learning analisam perfis comportamentais, 
                  competências técnicas e fit cultural automaticamente.
                </p>
                <div className="space-y-2">
                  <div className="flex items-center text-sm font-semibold text-emerald-600">
                    <span className="mr-2">⏱️</span>
                    Reduz tempo de análise em 94%
                  </div>
                  <div className="flex items-center text-sm font-semibold text-blue-600">
                    <span className="mr-2">💰</span>
                    Economia de R$ 15.000/mês em processos manuais
                  </div>
                </div>
              </div>
            </div>
            
            {/* Feature 2 */}
            <div className="group relative bg-gradient-to-br from-white/90 to-purple-50/90 backdrop-blur-sm border border-purple-200 rounded-2xl p-8 hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 h-full flex flex-col overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-purple-400/10 via-indigo-400/10 to-blue-400/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="relative z-10">
                <div className="w-16 h-16 bg-gradient-to-r from-purple-500 via-indigo-500 to-blue-500 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                  <Target className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold mb-4 text-slate-800">Match Automático</h3>
                <p className="text-slate-600 leading-relaxed mb-4">
                  Sistema inteligente que conecta automaticamente candidatos 
                  às vagas mais adequadas com precisão de 95%.
                </p>
                <div className="space-y-2">
                  <div className="flex items-center text-sm font-semibold text-purple-600">
                    <span className="mr-2">🎯</span>
                    97% de precisão no matching
                  </div>
                  <div className="flex items-center text-sm font-semibold text-indigo-600">
                    <span className="mr-2">⚡</span>
                    Reduz tempo de recrutamento em 85%
                  </div>
                </div>
              </div>
            </div>
            
            {/* Feature 3 */}
            <div className="group relative bg-gradient-to-br from-white/90 to-emerald-50/90 backdrop-blur-sm border border-emerald-200 rounded-2xl p-8 hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 h-full flex flex-col overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-emerald-400/10 via-teal-400/10 to-cyan-400/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="relative z-10">
                <div className="w-16 h-16 bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                  <Zap className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold mb-4 text-slate-800">Processamento Instantâneo</h3>
                <p className="text-slate-600 leading-relaxed mb-4">
                  Processe milhares de currículos em segundos. 
                  O que levaria dias, nossa IA faz em tempo real.
                </p>
                <div className="space-y-2">
                  <div className="flex items-center text-sm font-semibold text-orange-600">
                    <span className="mr-2">📊</span>
                    Processa 10.000 currículos em 30 segundos
                  </div>
                  <div className="flex items-center text-sm font-semibold text-red-600">
                    <span className="mr-2">🚀</span>
                    Aumenta produtividade do RH em 300%
                  </div>
                </div>
              </div>
            </div>
            
            {/* Feature 4 */}
            <div className="group relative bg-gradient-to-br from-white/90 to-orange-50/90 backdrop-blur-sm border border-orange-200 rounded-2xl p-8 hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 h-full flex flex-col overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-orange-400/10 via-amber-400/10 to-yellow-400/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="relative z-10">
                <div className="w-16 h-16 bg-gradient-to-r from-orange-500 via-amber-500 to-yellow-500 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                  <BarChart3 className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold mb-4 text-slate-800">Analytics Preditivos</h3>
                <p className="text-slate-600 leading-relaxed flex-grow">
                  Insights avançados sobre tendências de mercado, 
                  performance de candidatos e otimização de processos.
                </p>
              </div>
            </div>
            
            {/* Feature 5 */}
            <div className="group relative bg-gradient-to-br from-white/90 to-violet-50/90 backdrop-blur-sm border border-violet-200 rounded-2xl p-8 hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 h-full flex flex-col overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-violet-400/10 via-purple-400/10 to-fuchsia-400/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="relative z-10">
                <div className="w-16 h-16 bg-gradient-to-r from-violet-500 via-purple-500 to-fuchsia-500 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                  <Users className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold mb-4 text-slate-800">Banco de Talentos Inteligente</h3>
                <p className="text-slate-600 leading-relaxed flex-grow">
                  Construa um banco de talentos que aprende e evolui, 
                  identificando candidatos ideais para futuras oportunidades.
                </p>
              </div>
            </div>
            
            {/* Feature 6 */}
            <div className="group relative bg-gradient-to-br from-white/90 to-rose-50/90 backdrop-blur-sm border border-rose-200 rounded-2xl p-8 hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 h-full flex flex-col overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-rose-400/10 via-pink-400/10 to-red-400/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="relative z-10">
                <div className="w-16 h-16 bg-gradient-to-r from-rose-500 via-pink-500 to-red-500 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                  <Shield className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold mb-4 text-slate-800">Segurança Enterprise</h3>
                <p className="text-slate-600 leading-relaxed flex-grow">
                  Proteção de dados de nível empresarial com criptografia 
                  avançada e compliance total com LGPD.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Case Study Section */}
      <section className="py-20 bg-gradient-to-br from-slate-900 to-blue-900 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http://www.w3.org/2000/svg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%23ffffff%22%20fill-opacity%3D%220.05%22%3E%3Ccircle%20cx%3D%2230%22%20cy%3D%2230%22%20r%3D%222%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-20"></div>
        
        <div className="max-w-6xl mx-auto px-6 relative z-10">
          <div className="text-center mb-16">
            <div className="inline-flex items-center bg-emerald-500/20 text-emerald-300 px-6 py-3 rounded-full text-sm font-semibold mb-6">
              <span className="mr-2">📈</span>
              CASE DE SUCESSO REAL
            </div>
            <h2 className="text-4xl md:text-6xl font-bold mb-6 text-white">
              SuperFresh contratou 
              <span className="bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent">
                15 pessoas em 1 semana
              </span>
            </h2>
            <p className="text-xl text-slate-300 max-w-3xl mx-auto">
              Veja como uma empresa de varejo revolucionou seu processo de recrutamento
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* ANTES */}
            <div className="bg-red-500/10 border border-red-500/20 rounded-3xl p-8 backdrop-blur-sm">
              <div className="flex items-center mb-6">
                <div className="bg-red-500 text-white rounded-full p-3 mr-4">
                  <span className="text-2xl">❌</span>
                </div>
                <h3 className="text-2xl font-bold text-white">ANTES (Processo Manual)</h3>
              </div>
              <div className="space-y-4">
                <div className="flex items-center text-red-200">
                  <span className="w-2 h-2 bg-red-400 rounded-full mr-3"></span>
                  <span className="text-lg">245 currículos para analisar manualmente</span>
                </div>
                <div className="flex items-center text-red-200">
                  <span className="w-2 h-2 bg-red-400 rounded-full mr-3"></span>
                  <span className="text-lg">12 dias de trabalho manual intensivo</span>
                </div>
                <div className="flex items-center text-red-200">
                  <span className="w-2 h-2 bg-red-400 rounded-full mr-3"></span>
                  <span className="text-lg">3 funcionários do RH dedicados full-time</span>
                </div>
                <div className="flex items-center text-red-200">
                  <span className="w-2 h-2 bg-red-400 rounded-full mr-3"></span>
                  <span className="text-lg font-bold">R$ 8.400 em custos operacionais</span>
                </div>
              </div>
            </div>

            {/* DEPOIS */}
            <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-3xl p-8 backdrop-blur-sm">
              <div className="flex items-center mb-6">
                <div className="bg-emerald-500 text-white rounded-full p-3 mr-4">
                  <span className="text-2xl">✅</span>
                </div>
                <h3 className="text-2xl font-bold text-white">DEPOIS (Com Triaxia)</h3>
              </div>
              <div className="space-y-4">
                <div className="flex items-center text-emerald-200">
                  <span className="w-2 h-2 bg-emerald-400 rounded-full mr-3"></span>
                  <span className="text-lg">245 currículos analisados em 3 minutos</span>
                </div>
                <div className="flex items-center text-emerald-200">
                  <span className="w-2 h-2 bg-emerald-400 rounded-full mr-3"></span>
                  <span className="text-lg">Top 15 candidatos identificados automaticamente</span>
                </div>
                <div className="flex items-center text-emerald-200">
                  <span className="w-2 h-2 bg-emerald-400 rounded-full mr-3"></span>
                  <span className="text-lg">RH focou apenas em entrevistas finais</span>
                </div>
                <div className="flex items-center text-emerald-200">
                  <span className="w-2 h-2 bg-emerald-400 rounded-full mr-3"></span>
                  <span className="text-lg font-bold">R$ 497 de custo total</span>
                </div>
              </div>
            </div>
          </div>

          {/* Resultados */}
          <div className="mt-16 text-center">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                <div className="text-4xl font-bold text-emerald-400 mb-2">94%</div>
                <div className="text-white text-lg">Redução de Tempo</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                <div className="text-4xl font-bold text-blue-400 mb-2">R$ 7.9k</div>
                <div className="text-white text-lg">Economia Mensal</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                <div className="text-4xl font-bold text-purple-400 mb-2">15</div>
                <div className="text-white text-lg">Contratações em 1 Semana</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-white relative">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                Perguntas Frequentes
              </span>
            </h2>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto">
              Respostas para as dúvidas mais comuns sobre o Triaxia
            </p>
          </div>

          <div className="space-y-8">
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-8 border border-blue-100 hover:shadow-lg transition-all duration-300">
              <h3 className="text-2xl font-bold text-slate-800 mb-4 flex items-center">
                <span className="bg-blue-500 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold mr-4">1</span>
                Quanto tempo leva para implementar?
              </h3>
              <p className="text-slate-700 text-lg leading-relaxed">
                <strong>Setup completo em menos de 24 horas.</strong> Sua equipe estará operando no mesmo dia. 
                Nosso time de onboarding cuida de toda a configuração e treinamento.
              </p>
            </div>

            <div className="bg-gradient-to-r from-emerald-50 to-teal-50 rounded-2xl p-8 border border-emerald-100 hover:shadow-lg transition-all duration-300">
              <h3 className="text-2xl font-bold text-slate-800 mb-4 flex items-center">
                <span className="bg-emerald-500 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold mr-4">2</span>
                E se minha empresa é pequena?
              </h3>
              <p className="text-slate-700 text-lg leading-relaxed">
                <strong>Perfeito! Pequenas empresas têm 3x mais resultado</strong>, pois cada contratação tem impacto maior. 
                O Triaxia foi pensado para escalar com seu crescimento.
              </p>
            </div>

            <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-2xl p-8 border border-purple-100 hover:shadow-lg transition-all duration-300">
              <h3 className="text-2xl font-bold text-slate-800 mb-4 flex items-center">
                <span className="bg-purple-500 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold mr-4">3</span>
                Como funciona a privacidade dos dados?
              </h3>
              <p className="text-slate-700 text-lg leading-relaxed">
                <strong>Total isolamento e segurança.</strong> Cada empresa tem seus dados completamente privados e seguros. 
                Compliance total com LGPD e certificações internacionais.
              </p>
            </div>

            <div className="bg-gradient-to-r from-orange-50 to-red-50 rounded-2xl p-8 border border-orange-100 hover:shadow-lg transition-all duration-300">
              <h3 className="text-2xl font-bold text-slate-800 mb-4 flex items-center">
                <span className="bg-orange-500 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold mr-4">4</span>
                Preciso treinar minha equipe?
              </h3>
              <p className="text-slate-700 text-lg leading-relaxed">
                <strong>Interface intuitiva, zero curva de aprendizado.</strong> Se sua equipe sabe usar WhatsApp, 
                vai dominar o Triaxia em minutos. Suporte 24/7 incluso.
              </p>
            </div>

            <div className="bg-gradient-to-r from-indigo-50 to-blue-50 rounded-2xl p-8 border border-indigo-100 hover:shadow-lg transition-all duration-300">
              <h3 className="text-2xl font-bold text-slate-800 mb-4 flex items-center">
                <span className="bg-indigo-500 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold mr-4">5</span>
                E se eu não ficar satisfeito?
              </h3>
              <p className="text-slate-700 text-lg leading-relaxed">
                <strong>Garantia de 30 dias ou seu dinheiro de volta.</strong> Sem perguntas, sem burocracia. 
                Confiamos tanto no resultado que assumimos todo o risco.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Guarantee Section */}
      <section className="py-20 bg-gradient-to-r from-emerald-600 to-teal-600 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2240%22%20height%3D%2240%22%20viewBox%3D%220%200%2040%2040%22%20xmlns%3D%22http://www.w3.org/2000/svg%22%3E%3Cg%20fill%3D%22%23ffffff%22%20fill-opacity%3D%220.1%22%3E%3Cpath%20d%3D%22M20%2020c0-5.5-4.5-10-10-10s-10%204.5-10%2010%204.5%2010%2010%2010%2010-4.5%2010-10zm10%200c0-5.5-4.5-10-10-10s-10%204.5-10%2010%204.5%2010%2010%2010%2010-4.5%2010-10z%22/%3E%3C/g%3E%3C/svg%3E')] opacity-20"></div>
        
        <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
          <div className="bg-white/10 backdrop-blur-sm rounded-3xl p-12 border border-white/20">
            <div className="flex justify-center mb-8">
              <div className="bg-white/20 rounded-full p-6">
                <span className="text-6xl">🛡️</span>
              </div>
            </div>
            
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Garantia Triaxia de Resultados
            </h2>
            
            <p className="text-2xl text-emerald-100 mb-8 leading-relaxed">
              Se você não economizar pelo menos <strong className="text-white">20 horas de trabalho</strong> no primeiro mês, 
              <strong className="text-white">devolvemos 100% do seu investimento.</strong>
            </p>
            
            <div className="grid md:grid-cols-3 gap-8 mt-12">
              <div className="text-center">
                <div className="bg-white/20 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">⚡</span>
                </div>
                <h3 className="text-xl font-bold text-white mb-2">Sem Perguntas</h3>
                <p className="text-emerald-100">Processo simples e direto</p>
              </div>
              
              <div className="text-center">
                <div className="bg-white/20 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">📋</span>
                </div>
                <h3 className="text-xl font-bold text-white mb-2">Sem Burocracia</h3>
                <p className="text-emerald-100">Reembolso em até 48h</p>
              </div>
              
              <div className="text-center">
                <div className="bg-white/20 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">💯</span>
                </div>
                <h3 className="text-xl font-bold text-white mb-2">100% Garantido</h3>
                <p className="text-emerald-100">Assumimos todo o risco</p>
              </div>
            </div>
            
            <div className="mt-12 p-6 bg-white/10 rounded-2xl border border-white/20">
              <p className="text-lg text-white font-semibold">
                💡 <strong>Por que oferecemos essa garantia?</strong><br/>
                <span className="text-emerald-100 font-normal">
                  Porque sabemos que o Triaxia vai transformar seu RH. Mais de 2.847 empresas já comprovaram.
                </span>
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="precos" className="relative z-10 px-6 py-20 bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50">
        <div className="absolute inset-0 bg-gradient-to-r from-indigo-100/20 via-purple-100/20 to-pink-100/20 animate-pulse"></div>
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-16">
            <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-indigo-100 to-purple-100 backdrop-blur-sm rounded-full border border-indigo-200 mb-6">
              <Sparkles className="w-4 h-4 mr-2 text-indigo-600" />
              <span className="text-sm font-medium text-indigo-700">Preços Revolucionários</span>
            </div>
            
            <h2 className="text-4xl md:text-6xl font-bold mb-6 text-slate-800">
              Planos que
              <span className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent block">
                Aceleram Resultados
              </span>
            </h2>
            
            {/* Oferta Especial */}
            <div className="bg-gradient-to-r from-red-500 via-orange-500 to-yellow-500 text-white rounded-2xl p-6 mb-12 border-2 border-yellow-400 shadow-2xl animate-pulse">
              <div className="text-center">
                <h3 className="text-2xl md:text-3xl font-bold mb-2">
                  🚀 OFERTA ESPECIAL: Primeiros 100 clientes ganham 6 meses grátis
                </h3>
                <div className="flex items-center justify-center space-x-4 text-lg font-semibold">
                  <span>⏰ Restam apenas</span>
                  <div className="bg-white/20 px-4 py-2 rounded-lg">
                    <span className="text-2xl font-bold">23 vagas</span>
                  </div>
                  <span>disponíveis</span>
                </div>
                <p className="mt-3 text-yellow-100 font-medium">
                  Válido apenas para novos clientes que se cadastrarem hoje!
                </p>
              </div>
            </div>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Escolha o plano ideal para revolucionar seu recrutamento com IA
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {/* Starter Plan */}
            <div className="group relative bg-gradient-to-br from-white/90 to-cyan-50/90 backdrop-blur-sm border border-cyan-200 rounded-2xl p-8 hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 h-full flex flex-col overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-400/10 via-blue-400/10 to-indigo-400/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="relative z-10">
                <div className="text-center mb-8">
                  <div className="w-16 h-16 bg-gradient-to-r from-cyan-500 via-blue-500 to-indigo-500 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
                    <Zap className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-slate-800 mb-2">Starter</h3>
                  <div className="text-4xl font-bold bg-gradient-to-r from-cyan-600 to-blue-600 bg-clip-text text-transparent mb-2">R$ 299</div>
                  <div className="text-slate-500">/mês</div>
                </div>
                
                <ul className="space-y-4 mb-8 flex-grow">
                  <li className="flex items-center text-slate-600">
                    <div className="w-5 h-5 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full flex items-center justify-center mr-3">
                      <span className="text-white text-xs">✓</span>
                    </div>
                    Até 50 candidatos no banco
                  </li>
                  <li className="flex items-center text-slate-600">
                    <div className="w-5 h-5 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full flex items-center justify-center mr-3">
                      <span className="text-white text-xs">✓</span>
                    </div>
                    5 vagas ativas simultâneas
                  </li>
                  <li className="flex items-center text-slate-600">
                    <div className="w-5 h-5 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full flex items-center justify-center mr-3">
                      <span className="text-white text-xs">✓</span>
                    </div>
                    Análise básica de IA
                  </li>
                  <li className="flex items-center text-slate-600">
                    <div className="w-5 h-5 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full flex items-center justify-center mr-3">
                      <span className="text-white text-xs">✓</span>
                    </div>
                    Suporte por email
                  </li>
                  <li className="flex items-center text-slate-600">
                    <div className="w-5 h-5 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full flex items-center justify-center mr-3">
                      <span className="text-white text-xs">✓</span>
                    </div>
                    Dashboard básico
                  </li>
                </ul>
                
                <button className="w-full bg-gradient-to-r from-cyan-500 via-blue-500 to-indigo-500 text-white py-3 rounded-full font-semibold hover:from-cyan-600 hover:via-blue-600 hover:to-indigo-600 transition-all duration-300 group-hover:scale-105 shadow-lg">
                  Começar Teste Grátis
                </button>
              </div>
            </div>
            
            {/* Professional Plan - Popular */}
            <div className="group relative bg-gradient-to-br from-white/95 to-purple-50/95 border-2 border-purple-300 rounded-2xl p-8 hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 h-full flex flex-col overflow-hidden transform scale-105">
              <div className="absolute inset-0 bg-gradient-to-r from-purple-400/15 via-pink-400/15 to-indigo-400/15 opacity-100 animate-pulse"></div>
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 z-20">
                <span className="bg-gradient-to-r from-purple-500 via-pink-500 to-indigo-500 text-white px-6 py-2 rounded-full text-sm font-bold shadow-lg animate-bounce">
                  🚀 Mais Popular
                </span>
              </div>
              
              <div className="relative z-10">
                <div className="text-center mb-8">
                  <div className="w-20 h-20 bg-gradient-to-r from-purple-500 via-pink-500 to-indigo-500 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-xl">
                    <Brain className="w-10 h-10 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-slate-800 mb-2">Professional</h3>
                  <div className="text-5xl font-bold bg-gradient-to-r from-purple-600 via-pink-600 to-indigo-600 bg-clip-text text-transparent mb-2">R$ 699</div>
                  <div className="text-slate-500">/mês</div>
                </div>
                
                <ul className="space-y-4 mb-8 flex-grow">
                  <li className="flex items-center text-slate-600">
                    <div className="w-6 h-6 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full flex items-center justify-center mr-3 shadow-md">
                      <span className="text-white text-sm font-bold">✓</span>
                    </div>
                    Até 500 candidatos no banco
                  </li>
                  <li className="flex items-center text-slate-600">
                    <div className="w-6 h-6 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full flex items-center justify-center mr-3 shadow-md">
                      <span className="text-white text-sm font-bold">✓</span>
                    </div>
                    20 vagas ativas simultâneas
                  </li>
                  <li className="flex items-center text-slate-600">
                    <div className="w-6 h-6 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full flex items-center justify-center mr-3 shadow-md">
                      <span className="text-white text-sm font-bold">✓</span>
                    </div>
                    IA avançada com matching
                  </li>
                  <li className="flex items-center text-slate-600">
                    <div className="w-6 h-6 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full flex items-center justify-center mr-3 shadow-md">
                      <span className="text-white text-sm font-bold">✓</span>
                    </div>
                    Suporte prioritário
                  </li>
                  <li className="flex items-center text-slate-600">
                    <div className="w-6 h-6 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full flex items-center justify-center mr-3 shadow-md">
                      <span className="text-white text-sm font-bold">✓</span>
                    </div>
                    Analytics completos
                  </li>
                  <li className="flex items-center text-slate-600">
                    <div className="w-6 h-6 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full flex items-center justify-center mr-3 shadow-md">
                      <span className="text-white text-sm font-bold">✓</span>
                    </div>
                    Integração com ATS
                  </li>
                  <li className="flex items-center text-slate-600">
                    <div className="w-6 h-6 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full flex items-center justify-center mr-3 shadow-md">
                      <span className="text-white text-sm font-bold">✓</span>
                    </div>
                    Pipeline automático
                  </li>
                </ul>
                
                <button className="w-full bg-gradient-to-r from-purple-600 via-pink-600 to-indigo-600 text-white py-3 rounded-full font-bold hover:from-purple-700 hover:via-pink-700 hover:to-indigo-700 transition-all duration-300 group-hover:scale-105 shadow-xl transform hover:shadow-2xl">
                  🎯 Escolher Professional
                </button>
              </div>
            </div>
            
            {/* Enterprise Plan */}
            <div className="group relative bg-gradient-to-br from-white/90 to-amber-50/90 backdrop-blur-sm border border-amber-200 rounded-2xl p-8 hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 h-full flex flex-col overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-amber-400/10 via-orange-400/10 to-red-400/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="relative z-10">
                <div className="text-center mb-8">
                  <div className="w-16 h-16 bg-gradient-to-r from-amber-500 via-orange-500 to-red-500 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
                    <Shield className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-slate-800 mb-2">Enterprise</h3>
                  <div className="text-4xl font-bold bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent mb-2">Customizado</div>
                  <div className="text-slate-500">Sob consulta</div>
                </div>
                
                <ul className="space-y-4 mb-8 flex-grow">
                  <li className="flex items-center text-slate-600">
                    <div className="w-5 h-5 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full flex items-center justify-center mr-3">
                      <span className="text-white text-xs">✓</span>
                    </div>
                    Candidatos ilimitados
                  </li>
                  <li className="flex items-center text-slate-600">
                    <div className="w-5 h-5 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full flex items-center justify-center mr-3">
                      <span className="text-white text-xs">✓</span>
                    </div>
                    Vagas ilimitadas
                  </li>
                  <li className="flex items-center text-slate-600">
                    <div className="w-5 h-5 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full flex items-center justify-center mr-3">
                      <span className="text-white text-xs">✓</span>
                    </div>
                    IA personalizada
                  </li>
                  <li className="flex items-center text-slate-600">
                    <div className="w-5 h-5 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full flex items-center justify-center mr-3">
                      <span className="text-white text-xs">✓</span>
                    </div>
                    Suporte dedicado 24/7
                  </li>
                  <li className="flex items-center text-slate-600">
                    <div className="w-5 h-5 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full flex items-center justify-center mr-3">
                      <span className="text-white text-xs">✓</span>
                    </div>
                    White-label disponível
                  </li>
                  <li className="flex items-center text-slate-600">
                    <div className="w-5 h-5 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full flex items-center justify-center mr-3">
                      <span className="text-white text-xs">✓</span>
                    </div>
                    Integrações customizadas
                  </li>
                  <li className="flex items-center text-slate-600">
                    <div className="w-5 h-5 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full flex items-center justify-center mr-3">
                      <span className="text-white text-xs">✓</span>
                    </div>
                    SLA garantido
                  </li>
                  <li className="flex items-center text-slate-600">
                    <div className="w-5 h-5 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full flex items-center justify-center mr-3">
                      <span className="text-white text-xs">✓</span>
                    </div>
                    Treinamento incluso
                  </li>
                </ul>
                
                <button className="w-full bg-gradient-to-r from-amber-500 via-orange-500 to-red-500 text-white py-3 rounded-full font-semibold hover:from-amber-600 hover:via-orange-600 hover:to-red-600 transition-all duration-300 group-hover:scale-105 shadow-lg">
                  Falar com Vendas
                </button>
              </div>
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
