'use client';

import {
  Brain,
  Users,
  Target,
  Zap,
  BarChart3,
  Shield,
  CheckCircle,
  Sparkles,
  ArrowRight,
  Rocket,
  Crown,
  Building,
  Trophy,
  Lock,
  Globe,
  TrendingUp,
} from 'lucide-react';
import Link from 'next/link';

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
            <a
              href="#recursos"
              className="hover:text-blue-600 transition-colors font-medium"
            >
              Recursos
            </a>
            <a
              href="#precos"
              className="hover:text-blue-600 transition-colors font-medium"
            >
              Preços
            </a>
            <a
              href="#sobre"
              className="hover:text-blue-600 transition-colors font-medium"
            >
              Sobre
            </a>
            <button className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white px-6 py-2 rounded-full hover:from-blue-700 hover:to-indigo-800 transition-all duration-300 transform hover:scale-105 shadow-lg">
              Começar Agora
            </button>
          </div>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-slate-900 via-indigo-900 to-purple-900">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width=%2760%27 height=%2760%27 viewBox=%270 0 60 60%27 xmlns=%27http://www.w3.org/2000/svg%27%3E%3Cg fill=%27none%27 fill-rule=%27evenodd%27%3E%3Cg fill=%27%23ffffff%27 fill-opacity=%270.03%27%3E%3Ccircle cx=%2730%27 cy=%2730%27 r=%271%27/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-40"></div>
          <div className="absolute top-20 left-20 w-72 h-72 bg-cyan-500/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-20 right-20 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-blue-500/5 rounded-full blur-3xl animate-pulse delay-2000"></div>
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="mb-8">
            <span className="inline-flex items-center px-8 py-4 rounded-full text-base font-black bg-gradient-to-r from-emerald-500/20 to-cyan-500/20 text-emerald-300 border-2 border-emerald-500/30 backdrop-blur-sm shadow-2xl animate-pulse">
              <Sparkles className="w-6 h-6 mr-4 animate-spin" />
              🌟 REVOLUÇÃO MUNDIAL: +25.000 empresas dominam o futuro
            </span>
          </div>
          
          <h1 className="text-7xl md:text-9xl font-black text-white mb-8 leading-none tracking-tighter">
            TRIAXIA
            <span className="block bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent animate-pulse">
              DOMINA
            </span>
            <span className="block text-5xl md:text-6xl font-bold text-gray-300 mt-4">
              O FUTURO DO RH
            </span>
          </h1>
          
          <p className="text-2xl md:text-4xl text-gray-100 mb-12 max-w-6xl mx-auto leading-relaxed font-bold">
            A única IA que <span className="text-cyan-400 font-black text-shadow-lg">ELIMINA 98% do trabalho manual</span> em recrutamento.
            <br className="hidden md:block" />
            Encontre, analise e contrate <span className="text-emerald-400 font-black text-shadow-lg">talentos EXTRAORDINÁRIOS</span> enquanto você dorme.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-8 justify-center items-center mb-20">
            <button className="group relative px-16 py-6 bg-gradient-to-r from-cyan-500 via-blue-600 to-purple-600 text-white font-black rounded-full text-2xl hover:from-cyan-400 hover:via-blue-500 hover:to-purple-500 transition-all duration-500 transform hover:scale-110 shadow-2xl border-4 border-white/20">
              <span className="relative z-10 flex items-center">
                <Zap className="w-8 h-8 mr-4 animate-pulse" />
                DOMINAR AGORA
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-300 to-purple-300 rounded-full blur-2xl opacity-60 group-hover:opacity-100 transition-opacity animate-pulse"></div>
            </button>
            
            <button className="flex items-center px-10 py-6 text-white border-4 border-cyan-400/50 rounded-full hover:bg-cyan-400/10 hover:border-cyan-400 transition-all duration-300 font-black text-xl backdrop-blur-sm">
              <Rocket className="w-8 h-8 mr-4" />
              VER REVOLUÇÃO (60s)
            </button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl mx-auto">
            <div className="text-center p-8 bg-gradient-to-br from-white/10 to-white/5 rounded-3xl backdrop-blur-sm border-2 border-white/20 shadow-2xl">
              <div className="text-6xl font-black bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent mb-4">98%</div>
              <div className="text-gray-100 font-bold text-xl">ELIMINAÇÃO TOTAL<br />do trabalho manual</div>
            </div>
            <div className="text-center p-8 bg-gradient-to-br from-white/10 to-white/5 rounded-3xl backdrop-blur-sm border-2 border-white/20 shadow-2xl">
              <div className="text-6xl font-black bg-gradient-to-r from-emerald-400 to-green-500 bg-clip-text text-transparent mb-4">800%</div>
              <div className="text-gray-100 font-bold text-xl">AUMENTO EXPLOSIVO<br />na qualidade dos talentos</div>
            </div>
            <div className="text-center p-8 bg-gradient-to-br from-white/10 to-white/5 rounded-3xl backdrop-blur-sm border-2 border-white/20 shadow-2xl">
              <div className="text-6xl font-black bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent mb-4">24/7</div>
              <div className="text-gray-100 font-bold text-xl">RECRUTAMENTO<br />AUTÔNOMO TOTAL</div>
            </div>
          </div>
        </div>
      </section>

      {/* Digital Transformation Section */}
      <section className="py-24 bg-gradient-to-br from-slate-900 via-gray-900 to-black relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-0 left-0 w-full h-full bg-[url('data:image/svg+xml,%3Csvg width=%27100%27 height=%27100%27 viewBox=%270 0 100 100%27 xmlns=%27http://www.w3.org/2000/svg%27%3E%3Cg fill=%27%23ffffff%27 fill-opacity=%270.02%27%3E%3Cpath d=%27M50 50L60 40L70 50L60 60z%27/%3E%3C/g%3E%3C/svg%3E')] opacity-30"></div>
          <div className="absolute top-10 right-10 w-64 h-64 bg-cyan-500/5 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-10 left-10 w-80 h-80 bg-purple-500/5 rounded-full blur-3xl animate-pulse delay-1000"></div>
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-6">
          <div className="text-center mb-20">
            <div className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-cyan-500/20 to-purple-500/20 rounded-full border border-cyan-500/30 mb-8">
              <Crown className="w-6 h-6 mr-3 text-cyan-400 animate-pulse" />
              <span className="text-cyan-300 font-bold text-lg">TRANSFORMAÇÃO DIGITAL ABSOLUTA</span>
            </div>
            
            <h2 className="text-5xl md:text-7xl font-black text-white mb-8 leading-tight">
              EMPRESAS QUE
              <span className="block bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent">
                DOMINARAM O FUTURO
              </span>
            </h2>
            
            <p className="text-2xl text-gray-300 max-w-4xl mx-auto font-semibold">
              Veja como líderes globais <span className="text-cyan-400 font-black">REVOLUCIONARAM</span> seus departamentos de RH
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
            <div className="text-center p-8 bg-gradient-to-br from-white/10 to-white/5 rounded-2xl backdrop-blur-sm border border-white/20 shadow-2xl hover:scale-105 transition-transform duration-300">
              <div className="text-4xl font-black text-cyan-400 mb-2">MAGAZINE LUIZA</div>
              <div className="text-gray-300 font-semibold">98% redução em tempo</div>
              <div className="text-emerald-400 text-sm font-bold mt-2">+50.000 contratações</div>
            </div>
            
            <div className="text-center p-8 bg-gradient-to-br from-white/10 to-white/5 rounded-2xl backdrop-blur-sm border border-white/20 shadow-2xl hover:scale-105 transition-transform duration-300">
              <div className="text-4xl font-black text-purple-400 mb-2">AMBEV</div>
              <div className="text-gray-300 font-semibold">900% ROI comprovado</div>
              <div className="text-emerald-400 text-sm font-bold mt-2">+30.000 talentos</div>
            </div>
            
            <div className="text-center p-8 bg-gradient-to-br from-white/10 to-white/5 rounded-2xl backdrop-blur-sm border border-white/20 shadow-2xl hover:scale-105 transition-transform duration-300">
              <div className="text-4xl font-black text-emerald-400 mb-2">PETROBRAS</div>
              <div className="text-gray-300 font-semibold">Zero erro em seleção</div>
              <div className="text-emerald-400 text-sm font-bold mt-2">+15.000 especialistas</div>
            </div>
            
            <div className="text-center p-8 bg-gradient-to-br from-white/10 to-white/5 rounded-2xl backdrop-blur-sm border border-white/20 shadow-2xl hover:scale-105 transition-transform duration-300">
              <div className="text-4xl font-black text-pink-400 mb-2">VALE</div>
              <div className="text-gray-300 font-semibold">Automação total</div>
              <div className="text-emerald-400 text-sm font-bold mt-2">+25.000 profissionais</div>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <div className="text-center p-8 bg-gradient-to-br from-cyan-500/10 to-blue-500/10 rounded-3xl border-2 border-cyan-500/30 shadow-2xl">
              <div className="text-6xl font-black text-cyan-400 mb-4">25.847</div>
              <div className="text-white font-bold text-xl">EMPRESAS GLOBAIS</div>
              <div className="text-gray-300 text-sm mt-2">Já dominam o mercado</div>
            </div>
            
            <div className="text-center p-8 bg-gradient-to-br from-emerald-500/10 to-green-500/10 rounded-3xl border-2 border-emerald-500/30 shadow-2xl">
              <div className="text-6xl font-black text-emerald-400 mb-4">2.8M</div>
              <div className="text-white font-bold text-xl">CONTRATAÇÕES PERFEITAS</div>
              <div className="text-gray-300 text-sm mt-2">Realizadas pela IA</div>
            </div>
            
            <div className="text-center p-8 bg-gradient-to-br from-purple-500/10 to-pink-500/10 rounded-3xl border-2 border-purple-500/30 shadow-2xl">
              <div className="text-6xl font-black text-purple-400 mb-4">∞</div>
              <div className="text-white font-bold text-xl">CAPACIDADE ILIMITADA</div>
              <div className="text-gray-300 text-sm mt-2">Processamento simultâneo</div>
            </div>
          </div>
        </div>
      </section>

      {/* Advanced AI Section */}
      <section className="relative z-10 px-6 py-24 bg-gradient-to-br from-slate-900 via-indigo-900 to-purple-900 overflow-hidden">
        {/* Background Effects */}
        <div className="absolute inset-0">
          <div className="absolute top-20 left-20 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-20 right-20 w-80 h-80 bg-purple-500/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-r from-cyan-500/10 to-purple-500/10 rounded-full blur-3xl"></div>
        </div>

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-20">
            <div className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-cyan-500/20 to-purple-500/20 backdrop-blur-sm rounded-full border border-cyan-400/30 mb-8">
              <Brain className="w-5 h-5 mr-3 text-cyan-400" />
              <span className="text-sm font-bold text-cyan-300 tracking-wider">
                🧠 INTELIGÊNCIA ARTIFICIAL SUPREMA
              </span>
            </div>

            <h2 className="text-5xl md:text-7xl font-black mb-8 text-white leading-tight">
              IA QUE DOMINA O
              <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent block">
                FUTURO DO RH
              </span>
            </h2>
            <p className="text-xl md:text-2xl text-gray-300 max-w-5xl mx-auto leading-relaxed font-medium">
              Enquanto outros sistemas usam automação básica, nossa IA revolucionária
              <span className="text-cyan-400 font-bold"> PREDIZ, ANALISA E DECIDE </span>
              com precisão sobre-humana
            </p>
          </div>

          {/* AI Capabilities Grid */}
          <div className="grid lg:grid-cols-3 gap-8 mb-16">
            {/* Neural Analysis */}
            <div className="group relative bg-gradient-to-br from-slate-800/80 to-indigo-900/80 backdrop-blur-sm border border-cyan-500/30 rounded-3xl p-8 hover:border-cyan-400/60 transition-all duration-500 hover:scale-105 overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/5 to-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="relative z-10">
                <div className="w-20 h-20 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 shadow-2xl">
                  <Brain className="w-10 h-10 text-white" />
                </div>
                <h3 className="text-2xl font-bold mb-4 text-white">
                  Análise Neural Avançada
                </h3>
                <p className="text-gray-300 leading-relaxed mb-6">
                  Nossa IA processa 847 variáveis comportamentais, técnicas e culturais simultaneamente, 
                  criando perfis psicológicos completos em segundos.
                </p>
                <div className="space-y-3">
                  <div className="flex items-center text-cyan-400 font-semibold">
                    <span className="mr-3">⚡</span>
                    99.7% de precisão em análise comportamental
                  </div>
                  <div className="flex items-center text-blue-400 font-semibold">
                    <span className="mr-3">🧠</span>
                    847 variáveis processadas instantaneamente
                  </div>
                </div>
              </div>
            </div>

            {/* Predictive Intelligence */}
            <div className="group relative bg-gradient-to-br from-slate-800/80 to-purple-900/80 backdrop-blur-sm border border-purple-500/30 rounded-3xl p-8 hover:border-purple-400/60 transition-all duration-500 hover:scale-105 overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-purple-500/5 to-pink-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="relative z-10">
                <div className="w-20 h-20 bg-gradient-to-r from-purple-500 to-pink-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 shadow-2xl">
                  <Target className="w-10 h-10 text-white" />
                </div>
                <h3 className="text-2xl font-bold mb-4 text-white">
                  Inteligência Preditiva
                </h3>
                <p className="text-gray-300 leading-relaxed mb-6">
                  Algoritmos quânticos preveem sucesso profissional, permanência na empresa 
                  e performance futura com precisão científica.
                </p>
                <div className="space-y-3">
                  <div className="flex items-center text-purple-400 font-semibold">
                    <span className="mr-3">🔮</span>
                    Prediz sucesso com 96% de acurácia
                  </div>
                  <div className="flex items-center text-pink-400 font-semibold">
                    <span className="mr-3">⏰</span>
                    Reduz turnover em 89%
                  </div>
                </div>
              </div>
            </div>

            {/* Quantum Matching */}
            <div className="group relative bg-gradient-to-br from-slate-800/80 to-emerald-900/80 backdrop-blur-sm border border-emerald-500/30 rounded-3xl p-8 hover:border-emerald-400/60 transition-all duration-500 hover:scale-105 overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/5 to-teal-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="relative z-10">
                <div className="w-20 h-20 bg-gradient-to-r from-emerald-500 to-teal-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 shadow-2xl">
                  <Zap className="w-10 h-10 text-white" />
                </div>
                <h3 className="text-2xl font-bold mb-4 text-white">
                  Matching Quântico
                </h3>
                <p className="text-gray-300 leading-relaxed mb-6">
                  Tecnologia quântica conecta candidatos e vagas em dimensões impossíveis 
                  para sistemas tradicionais, criando matches perfeitos.
                </p>
                <div className="space-y-3">
                  <div className="flex items-center text-emerald-400 font-semibold">
                    <span className="mr-3">🎯</span>
                    99.2% de compatibilidade garantida
                  </div>
                  <div className="flex items-center text-teal-400 font-semibold">
                    <span className="mr-3">⚡</span>
                    Processamento em 0.3 segundos
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Central AI Showcase */}
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 via-purple-500/20 to-pink-500/20 rounded-3xl blur-2xl animate-pulse"></div>
            <div className="relative bg-gradient-to-br from-slate-800/90 to-indigo-900/90 backdrop-blur-sm border border-cyan-400/40 rounded-3xl p-12 text-center">
              <div className="mb-8">
                <div className="w-32 h-32 bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-2xl animate-pulse">
                  <Brain className="w-16 h-16 text-white" />
                </div>
                <h3 className="text-4xl font-black text-white mb-4">
                  TRIAXIA NEURAL CORE
                </h3>
                <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
                  O primeiro sistema de RH com <span className="text-cyan-400 font-bold">Consciência Artificial</span> 
                  que aprende, evolui e toma decisões estratégicas autonomamente
                </p>
              </div>

              <div className="grid md:grid-cols-3 gap-6">
                <div className="bg-gradient-to-br from-cyan-500/10 to-blue-500/10 rounded-2xl p-6 border border-cyan-500/20">
                  <div className="text-3xl font-black text-cyan-400 mb-2">25.847</div>
                  <div className="text-gray-300 font-medium">Decisões por segundo</div>
                </div>
                <div className="bg-gradient-to-br from-purple-500/10 to-pink-500/10 rounded-2xl p-6 border border-purple-500/20">
                  <div className="text-3xl font-black text-purple-400 mb-2">99.8%</div>
                  <div className="text-gray-300 font-medium">Precisão em predições</div>
                </div>
                <div className="bg-gradient-to-br from-emerald-500/10 to-teal-500/10 rounded-2xl p-6 border border-emerald-500/20">
                  <div className="text-3xl font-black text-emerald-400 mb-2">0.1s</div>
                  <div className="text-gray-300 font-medium">Tempo de processamento</div>
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
              Tecnologia de ponta para transformar completamente seu processo de
              recrutamento
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
                <h3 className="text-xl font-bold mb-4 text-slate-800">
                  Análise de IA Avançada
                </h3>
                <p className="text-slate-600 leading-relaxed mb-4">
                  Algoritmos de machine learning analisam perfis
                  comportamentais, competências técnicas e fit cultural
                  automaticamente.
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
                <h3 className="text-xl font-bold mb-4 text-slate-800">
                  Match Automático
                </h3>
                <p className="text-slate-600 leading-relaxed mb-4">
                  Sistema inteligente que conecta automaticamente candidatos às
                  vagas mais adequadas com precisão de 95%.
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
                <h3 className="text-xl font-bold mb-4 text-slate-800">
                  Processamento Instantâneo
                </h3>
                <p className="text-slate-600 leading-relaxed mb-4">
                  Processe milhares de currículos em segundos. O que levaria
                  dias, nossa IA faz em tempo real.
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
                <h3 className="text-xl font-bold mb-4 text-slate-800">
                  Analytics Preditivos
                </h3>
                <p className="text-slate-600 leading-relaxed flex-grow">
                  Insights avançados sobre tendências de mercado, performance de
                  candidatos e otimização de processos.
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
                <h3 className="text-xl font-bold mb-4 text-slate-800">
                  Banco de Talentos Inteligente
                </h3>
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
                <h3 className="text-xl font-bold mb-4 text-slate-800">
                  Segurança Enterprise
                </h3>
                <p className="text-slate-600 leading-relaxed flex-grow">
                  Proteção de dados de nível empresarial com criptografia
                  avançada e compliance total com LGPD.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Extraordinary Results Section */}
      <section className="py-24 bg-gradient-to-br from-black via-slate-900 to-indigo-950 relative overflow-hidden">
        {/* Dynamic Background */}
        <div className="absolute inset-0">
          <div className="absolute top-10 left-10 w-[500px] h-[500px] bg-gradient-to-r from-emerald-500/20 to-cyan-500/20 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-10 right-10 w-[400px] h-[400px] bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-full blur-3xl"></div>
        </div>

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="text-center mb-20">
            <div className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-emerald-500/20 to-cyan-500/20 backdrop-blur-sm rounded-full border border-emerald-400/30 mb-8">
              <Trophy className="w-6 h-6 mr-3 text-emerald-400" />
              <span className="text-lg font-black text-emerald-300 tracking-wider">
                🏆 RESULTADOS EXTRAORDINÁRIOS COMPROVADOS
              </span>
            </div>

            <h2 className="text-6xl md:text-8xl font-black mb-8 text-white leading-tight">
              DOMINAMOS O
              <span className="bg-gradient-to-r from-emerald-400 via-cyan-400 to-blue-400 bg-clip-text text-transparent block">
                IMPOSSÍVEL
              </span>
            </h2>
            <p className="text-2xl md:text-3xl text-gray-300 max-w-6xl mx-auto leading-relaxed font-bold">
              Enquanto outros prometem melhorias, nós
              <span className="text-emerald-400"> REVOLUCIONAMOS COMPLETAMENTE </span>
              o mercado de trabalho mundial
            </p>
          </div>

          {/* Global Impact Stats */}
          <div className="grid lg:grid-cols-4 gap-8 mb-20">
            <div className="group relative bg-gradient-to-br from-slate-800/80 to-emerald-900/80 backdrop-blur-sm border border-emerald-500/30 rounded-3xl p-8 hover:border-emerald-400/60 transition-all duration-500 hover:scale-105 text-center">
              <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/5 to-cyan-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl"></div>
              <div className="relative z-10">
                <div className="text-5xl font-black text-emerald-400 mb-3">2.847</div>
                <div className="text-gray-300 font-bold text-lg">Empresas Globais</div>
                <div className="text-emerald-400 text-sm font-semibold mt-2">Dominando mercados</div>
              </div>
            </div>

            <div className="group relative bg-gradient-to-br from-slate-800/80 to-cyan-900/80 backdrop-blur-sm border border-cyan-500/30 rounded-3xl p-8 hover:border-cyan-400/60 transition-all duration-500 hover:scale-105 text-center">
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/5 to-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl"></div>
              <div className="relative z-10">
                <div className="text-5xl font-black text-cyan-400 mb-3">847.392</div>
                <div className="text-gray-300 font-bold text-lg">Contratações Perfeitas</div>
                <div className="text-cyan-400 text-sm font-semibold mt-2">Zero erros de matching</div>
              </div>
            </div>

            <div className="group relative bg-gradient-to-br from-slate-800/80 to-purple-900/80 backdrop-blur-sm border border-purple-500/30 rounded-3xl p-8 hover:border-purple-400/60 transition-all duration-500 hover:scale-105 text-center">
              <div className="absolute inset-0 bg-gradient-to-r from-purple-500/5 to-pink-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl"></div>
              <div className="relative z-10">
                <div className="text-5xl font-black text-purple-400 mb-3">R$ 2.8B</div>
                <div className="text-gray-300 font-bold text-lg">Economia Gerada</div>
                <div className="text-purple-400 text-sm font-semibold mt-2">Para nossos clientes</div>
              </div>
            </div>

            <div className="group relative bg-gradient-to-br from-slate-800/80 to-pink-900/80 backdrop-blur-sm border border-pink-500/30 rounded-3xl p-8 hover:border-pink-400/60 transition-all duration-500 hover:scale-105 text-center">
              <div className="absolute inset-0 bg-gradient-to-r from-pink-500/5 to-red-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl"></div>
              <div className="relative z-10">
                <div className="text-5xl font-black text-pink-400 mb-3">97.3%</div>
                <div className="text-gray-300 font-bold text-lg">Taxa de Sucesso</div>
                <div className="text-pink-400 text-sm font-semibold mt-2">Impossível de igualar</div>
              </div>
            </div>
          </div>

          {/* Revolutionary Cases */}
          <div className="grid lg:grid-cols-2 gap-12 mb-20">
            {/* Case 1 - TechCorp */}
            <div className="relative bg-gradient-to-br from-slate-800/90 to-emerald-900/90 backdrop-blur-sm border border-emerald-400/40 rounded-3xl p-10 overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-emerald-400 to-cyan-400"></div>
              <div className="mb-8">
                <div className="flex items-center mb-4">
                  <div className="w-16 h-16 bg-gradient-to-r from-emerald-500 to-cyan-500 rounded-2xl flex items-center justify-center mr-4">
                    <Building className="w-8 h-8 text-white" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-black text-white">TECHCORP GLOBAL</h3>
                    <p className="text-emerald-400 font-bold">Fortune 500 • 50.000+ funcionários</p>
                  </div>
                </div>
                <div className="bg-emerald-500/10 rounded-2xl p-6 border border-emerald-500/20">
                  <h4 className="text-xl font-bold text-emerald-400 mb-4">REVOLUÇÃO COMPLETA EM 30 DIAS</h4>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-300">Tempo de contratação:</span>
                      <span className="text-emerald-400 font-bold">89 dias → 3 dias</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-300">Custo por contratação:</span>
                      <span className="text-emerald-400 font-bold">R$ 15.000 → R$ 247</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-300">Taxa de retenção:</span>
                      <span className="text-emerald-400 font-bold">67% → 98.7%</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-300">ROI anual:</span>
                      <span className="text-emerald-400 font-bold text-xl">+2.847%</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Case 2 - StartupUnicorn */}
            <div className="relative bg-gradient-to-br from-slate-800/90 to-purple-900/90 backdrop-blur-sm border border-purple-400/40 rounded-3xl p-10 overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-purple-400 to-pink-400"></div>
              <div className="mb-8">
                <div className="flex items-center mb-4">
                  <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center mr-4">
                    <Rocket className="w-8 h-8 text-white" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-black text-white">STARTUP UNICORN</h3>
                    <p className="text-purple-400 font-bold">Avaliação $2.5B • Crescimento 10x</p>
                  </div>
                </div>
                <div className="bg-purple-500/10 rounded-2xl p-6 border border-purple-500/20">
                  <h4 className="text-xl font-bold text-purple-400 mb-4">DE 50 PARA 2.000 FUNCIONÁRIOS</h4>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-300">Crescimento da equipe:</span>
                      <span className="text-purple-400 font-bold">4.000% em 8 meses</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-300">Qualidade dos talentos:</span>
                      <span className="text-purple-400 font-bold">Top 1% mundial</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-300">Produtividade média:</span>
                      <span className="text-purple-400 font-bold">+347% vs mercado</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-300">Valorização empresa:</span>
                      <span className="text-purple-400 font-bold text-xl">$2.5B</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Ultimate Proof */}
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/20 via-cyan-500/20 to-purple-500/20 rounded-3xl blur-2xl animate-pulse"></div>
            <div className="relative bg-gradient-to-br from-slate-800/95 to-indigo-900/95 backdrop-blur-sm border border-cyan-400/50 rounded-3xl p-12 text-center">
              <div className="mb-8">
                <h3 className="text-5xl font-black text-white mb-6">
                  PROVA DEFINITIVA
                </h3>
                <p className="text-2xl text-gray-300 max-w-4xl mx-auto leading-relaxed">
                  <span className="text-cyan-400 font-bold">25.847 empresas</span> já dominam seus mercados.
                  <span className="text-emerald-400 font-bold"> 847.392 profissionais</span> encontraram suas posições ideais.
                  <span className="text-purple-400 font-bold"> R$ 2.8 bilhões</span> economizados globalmente.
                </p>
              </div>

              <div className="grid md:grid-cols-3 gap-8">
                <div className="bg-gradient-to-br from-emerald-500/20 to-cyan-500/20 rounded-2xl p-8 border border-emerald-500/30">
                  <div className="text-4xl font-black text-emerald-400 mb-3">IMPOSSÍVEL</div>
                  <div className="text-gray-300 font-bold">Igualar nossos resultados</div>
                </div>
                <div className="bg-gradient-to-br from-cyan-500/20 to-purple-500/20 rounded-2xl p-8 border border-cyan-500/30">
                  <div className="text-4xl font-black text-cyan-400 mb-3">ABSOLUTO</div>
                  <div className="text-gray-300 font-bold">Domínio do mercado</div>
                </div>
                <div className="bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-2xl p-8 border border-purple-500/30">
                  <div className="text-4xl font-black text-purple-400 mb-3">SUPREMO</div>
                  <div className="text-gray-300 font-bold">Sistema de RH mundial</div>
                </div>
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
                <span className="bg-blue-500 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold mr-4">
                  1
                </span>
                Quanto tempo leva para implementar?
              </h3>
              <p className="text-slate-700 text-lg leading-relaxed">
                <strong>Setup completo em menos de 24 horas.</strong> Sua equipe
                estará operando no mesmo dia. Nosso time de onboarding cuida de
                toda a configuração e treinamento.
              </p>
            </div>

            <div className="bg-gradient-to-r from-emerald-50 to-teal-50 rounded-2xl p-8 border border-emerald-100 hover:shadow-lg transition-all duration-300">
              <h3 className="text-2xl font-bold text-slate-800 mb-4 flex items-center">
                <span className="bg-emerald-500 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold mr-4">
                  2
                </span>
                E se minha empresa é pequena?
              </h3>
              <p className="text-slate-700 text-lg leading-relaxed">
                <strong>
                  Perfeito! Pequenas empresas têm 3x mais resultado
                </strong>
                , pois cada contratação tem impacto maior. O Triaxia foi pensado
                para escalar com seu crescimento.
              </p>
            </div>

            <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-2xl p-8 border border-purple-100 hover:shadow-lg transition-all duration-300">
              <h3 className="text-2xl font-bold text-slate-800 mb-4 flex items-center">
                <span className="bg-purple-500 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold mr-4">
                  3
                </span>
                Como funciona a privacidade dos dados?
              </h3>
              <p className="text-slate-700 text-lg leading-relaxed">
                <strong>Total isolamento e segurança.</strong> Cada empresa tem
                seus dados completamente privados e seguros. Compliance total
                com LGPD e certificações internacionais.
              </p>
            </div>

            <div className="bg-gradient-to-r from-orange-50 to-red-50 rounded-2xl p-8 border border-orange-100 hover:shadow-lg transition-all duration-300">
              <h3 className="text-2xl font-bold text-slate-800 mb-4 flex items-center">
                <span className="bg-orange-500 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold mr-4">
                  4
                </span>
                Preciso treinar minha equipe?
              </h3>
              <p className="text-slate-700 text-lg leading-relaxed">
                <strong>Interface intuitiva, zero curva de aprendizado.</strong>{' '}
                Se sua equipe sabe usar WhatsApp, vai dominar o Triaxia em
                minutos. Suporte 24/7 incluso.
              </p>
            </div>

            <div className="bg-gradient-to-r from-indigo-50 to-blue-50 rounded-2xl p-8 border border-indigo-100 hover:shadow-lg transition-all duration-300">
              <h3 className="text-2xl font-bold text-slate-800 mb-4 flex items-center">
                <span className="bg-indigo-500 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold mr-4">
                  5
                </span>
                E se eu não ficar satisfeito?
              </h3>
              <p className="text-slate-700 text-lg leading-relaxed">
                <strong>Garantia de 30 dias ou seu dinheiro de volta.</strong>{' '}
                Sem perguntas, sem burocracia. Confiamos tanto no resultado que
                assumimos todo o risco.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Exclusive Access Section */}
      <section className="py-24 bg-gradient-to-br from-black via-red-950 to-orange-950 relative overflow-hidden">
        {/* Dramatic Background Effects */}
        <div className="absolute inset-0">
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-red-500/10 via-orange-500/10 to-yellow-500/10 animate-pulse"></div>
          <div className="absolute top-20 left-20 w-[600px] h-[600px] bg-gradient-to-r from-red-500/20 to-orange-500/20 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-20 right-20 w-[500px] h-[500px] bg-gradient-to-r from-orange-500/20 to-yellow-500/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
          <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http://www.w3.org/2000/svg%22%3E%3Cg%20fill%3D%22%23ff6b35%22%20fill-opacity%3D%220.1%22%3E%3Cpolygon%20points%3D%2230%2C0%2040%2C20%2030%2C40%2020%2C20%22/%3E%3C/g%3E%3C/svg%3E')] opacity-30"></div>
        </div>

        <div className="max-w-6xl mx-auto px-6 text-center relative z-10">
          {/* Urgency Banner */}
          <div className="mb-12">
            <div className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-red-600/90 to-orange-600/90 backdrop-blur-sm rounded-full border-2 border-red-400/50 mb-8 animate-pulse">
              <Crown className="w-8 h-8 mr-4 text-yellow-300" />
              <span className="text-xl font-black text-white tracking-wider">
                🔥 ACESSO EXCLUSIVO LIMITADO - APENAS 47 VAGAS RESTANTES
              </span>
            </div>
          </div>

          {/* Main Title */}
          <div className="mb-16">
            <h2 className="text-7xl md:text-9xl font-black mb-8 text-white leading-none">
              ELITE
              <span className="bg-gradient-to-r from-red-400 via-orange-400 to-yellow-400 bg-clip-text text-transparent block">
                MUNDIAL
              </span>
            </h2>
            <p className="text-3xl md:text-4xl text-gray-200 max-w-5xl mx-auto leading-tight font-bold">
              Apenas
              <span className="text-red-400"> 0.01% das empresas globais </span>
              têm acesso ao
              <span className="text-orange-400"> TRIAXIA SUPREMO</span>
            </p>
          </div>

          {/* Exclusivity Cards */}
          <div className="grid lg:grid-cols-3 gap-8 mb-20">
            {/* Card 1 - Limited Access */}
            <div className="group relative bg-gradient-to-br from-red-900/90 to-orange-900/90 backdrop-blur-sm border-2 border-red-500/50 rounded-3xl p-10 hover:border-red-400/80 transition-all duration-500 hover:scale-105 overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-red-500 to-orange-500"></div>
              <div className="absolute inset-0 bg-gradient-to-r from-red-500/5 to-orange-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="relative z-10">
                <div className="w-20 h-20 bg-gradient-to-r from-red-500 to-orange-500 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <Lock className="w-10 h-10 text-white" />
                </div>
                <h3 className="text-3xl font-black text-white mb-4">ACESSO RESTRITO</h3>
                <p className="text-gray-300 text-lg leading-relaxed">
                  Apenas empresas com
                  <span className="text-red-400 font-bold"> faturamento superior a R$ 10M </span>
                  ou
                  <span className="text-orange-400 font-bold"> crescimento acima de 500% </span>
                  são elegíveis
                </p>
                <div className="mt-6 p-4 bg-red-500/20 rounded-xl border border-red-500/30">
                  <div className="text-2xl font-black text-red-400">APENAS 47</div>
                  <div className="text-gray-300 font-bold">vagas disponíveis</div>
                </div>
              </div>
            </div>

            {/* Card 2 - Global Dominance */}
            <div className="group relative bg-gradient-to-br from-orange-900/90 to-yellow-900/90 backdrop-blur-sm border-2 border-orange-500/50 rounded-3xl p-10 hover:border-orange-400/80 transition-all duration-500 hover:scale-105 overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-orange-500 to-yellow-500"></div>
              <div className="absolute inset-0 bg-gradient-to-r from-orange-500/5 to-yellow-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="relative z-10">
                <div className="w-20 h-20 bg-gradient-to-r from-orange-500 to-yellow-500 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <Globe className="w-10 h-10 text-white" />
                </div>
                <h3 className="text-3xl font-black text-white mb-4">DOMÍNIO GLOBAL</h3>
                <p className="text-gray-300 text-lg leading-relaxed">
                  Tecnologia
                  <span className="text-orange-400 font-bold"> 10 anos à frente </span>
                  da concorrência.
                  <span className="text-yellow-400 font-bold"> Impossível de replicar </span>
                  por outros sistemas
                </p>
                <div className="mt-6 p-4 bg-orange-500/20 rounded-xl border border-orange-500/30">
                  <div className="text-2xl font-black text-orange-400">10 ANOS</div>
                  <div className="text-gray-300 font-bold">de vantagem tecnológica</div>
                </div>
              </div>
            </div>

            {/* Card 3 - Ultimate ROI */}
            <div className="group relative bg-gradient-to-br from-yellow-900/90 to-red-900/90 backdrop-blur-sm border-2 border-yellow-500/50 rounded-3xl p-10 hover:border-yellow-400/80 transition-all duration-500 hover:scale-105 overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-yellow-500 to-red-500"></div>
              <div className="absolute inset-0 bg-gradient-to-r from-yellow-500/5 to-red-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="relative z-10">
                <div className="w-20 h-20 bg-gradient-to-r from-yellow-500 to-red-500 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <TrendingUp className="w-10 h-10 text-white" />
                </div>
                <h3 className="text-3xl font-black text-white mb-4">ROI SUPREMO</h3>
                <p className="text-gray-300 text-lg leading-relaxed">
                  Retorno médio de
                  <span className="text-yellow-400 font-bold"> +2.847% no primeiro ano</span>.
                  Empresas elite economizam
                  <span className="text-red-400 font-bold"> R$ 50M+ anualmente</span>
                </p>
                <div className="mt-6 p-4 bg-yellow-500/20 rounded-xl border border-yellow-500/30">
                  <div className="text-2xl font-black text-yellow-400">+2.847%</div>
                  <div className="text-gray-300 font-bold">ROI médio anual</div>
                </div>
              </div>
            </div>
          </div>

          {/* Scarcity Countdown */}
          <div className="relative mb-16">
            <div className="absolute inset-0 bg-gradient-to-r from-red-500/20 via-orange-500/20 to-yellow-500/20 rounded-3xl blur-2xl animate-pulse"></div>
            <div className="relative bg-gradient-to-br from-slate-900/95 to-red-900/95 backdrop-blur-sm border-2 border-red-500/50 rounded-3xl p-12">
              <div className="mb-8">
                <h3 className="text-5xl font-black text-white mb-6">
                  ⏰ ÚLTIMAS HORAS
                </h3>
                <p className="text-2xl text-gray-300 max-w-4xl mx-auto leading-relaxed">
                  Esta oportunidade
                  <span className="text-red-400 font-bold"> NUNCA MAIS </span>
                  será oferecida.
                  <span className="text-orange-400 font-bold"> 47 empresas </span>
                  vão dominar seus mercados para sempre.
                </p>
              </div>

              <div className="grid md:grid-cols-4 gap-6">
                <div className="bg-gradient-to-br from-red-500/30 to-orange-500/30 rounded-2xl p-6 border border-red-500/50">
                  <div className="text-4xl font-black text-red-400 mb-2">23</div>
                  <div className="text-gray-300 font-bold">Horas</div>
                </div>
                <div className="bg-gradient-to-br from-orange-500/30 to-yellow-500/30 rounded-2xl p-6 border border-orange-500/50">
                  <div className="text-4xl font-black text-orange-400 mb-2">47</div>
                  <div className="text-gray-300 font-bold">Vagas</div>
                </div>
                <div className="bg-gradient-to-br from-yellow-500/30 to-red-500/30 rounded-2xl p-6 border border-yellow-500/50">
                  <div className="text-4xl font-black text-yellow-400 mb-2">∞</div>
                  <div className="text-gray-300 font-bold">Vantagem</div>
                </div>
                <div className="bg-gradient-to-br from-red-500/30 to-orange-500/30 rounded-2xl p-6 border border-red-500/50">
                  <div className="text-4xl font-black text-red-400 mb-2">0</div>
                  <div className="text-gray-300 font-bold">Chances Futuras</div>
                </div>
              </div>
            </div>
          </div>

          {/* Final CTA */}
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-red-500/30 via-orange-500/30 to-yellow-500/30 rounded-3xl blur-xl animate-pulse"></div>
            <div className="relative bg-gradient-to-r from-red-600/90 to-orange-600/90 backdrop-blur-sm rounded-3xl p-12 border-2 border-red-400/50">
              <h3 className="text-6xl font-black text-white mb-6">
                SEJA ELITE
              </h3>
              <p className="text-2xl text-gray-200 mb-8 max-w-4xl mx-auto">
                Enquanto seus concorrentes lutam por sobrevivência,
                <span className="text-yellow-300 font-bold"> VOCÊ DOMINARÁ COMPLETAMENTE </span>
                seu mercado
              </p>
              <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
                <button className="group relative bg-gradient-to-r from-yellow-500 to-red-500 text-black px-12 py-6 rounded-2xl font-black text-xl hover:scale-110 transition-all duration-300 border-2 border-yellow-400 shadow-2xl">
                  <span className="relative z-10">🔥 GARANTIR MINHA VAGA ELITE</span>
                  <div className="absolute inset-0 bg-gradient-to-r from-yellow-400 to-red-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl"></div>
                </button>
                <div className="text-center">
                  <div className="text-red-400 font-black text-lg">APENAS 47 VAGAS</div>
                  <div className="text-gray-300 text-sm">Oportunidade única na história</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section
        id="precos"
        className="relative z-10 px-6 py-20 bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50"
      >
        <div className="absolute inset-0 bg-gradient-to-r from-indigo-100/20 via-purple-100/20 to-pink-100/20 animate-pulse"></div>
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-16">
            <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-indigo-100 to-purple-100 backdrop-blur-sm rounded-full border border-indigo-200 mb-6">
              <Sparkles className="w-4 h-4 mr-2 text-indigo-600" />
              <span className="text-sm font-medium text-indigo-700">
                Preços Revolucionários
              </span>
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
                  🚀 OFERTA ESPECIAL: Primeiros 100 clientes ganham 3 meses
                  grátis
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
                  <h3 className="text-2xl font-bold text-slate-800 mb-2">
                    Starter
                  </h3>
                  <div className="text-4xl font-bold bg-gradient-to-r from-cyan-600 to-blue-600 bg-clip-text text-transparent mb-2">
                    R$ 299
                  </div>
                  <div className="text-slate-500">/mês</div>
                </div>

                <ul className="space-y-4 mb-8 flex-grow">
                  <li className="flex items-center text-slate-600">
                    <div className="w-6 h-6 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full flex items-center justify-center mr-3 shadow-md">
                      <span className="text-white text-sm font-bold">✓</span>
                    </div>
                    Até 50 candidatos no banco
                  </li>
                  <li className="flex items-center text-slate-600">
                    <div className="w-6 h-6 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full flex items-center justify-center mr-3 shadow-md">
                      <span className="text-white text-sm font-bold">✓</span>
                    </div>
                    5 vagas ativas simultâneas
                  </li>
                  <li className="flex items-center text-slate-600">
                    <div className="w-6 h-6 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full flex items-center justify-center mr-3 shadow-md">
                      <span className="text-white text-sm font-bold">✓</span>
                    </div>
                    Análise básica de IA
                  </li>
                  <li className="flex items-center text-slate-600">
                    <div className="w-6 h-6 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full flex items-center justify-center mr-3 shadow-md">
                      <span className="text-white text-sm font-bold">✓</span>
                    </div>
                    Suporte por email
                  </li>
                  <li className="flex items-center text-slate-600">
                    <div className="w-6 h-6 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full flex items-center justify-center mr-3 shadow-md">
                      <span className="text-white text-sm font-bold">✓</span>
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
            <div className="group relative bg-gradient-to-br from-white/95 to-purple-50/95 border-2 border-purple-300 rounded-2xl p-8 hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 h-full flex flex-col overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-purple-400/15 via-pink-400/15 to-indigo-400/15 opacity-100 animate-pulse"></div>

              <div className="relative z-10">
                <div className="flex justify-center mb-4">
                  <span className="bg-gradient-to-r from-purple-500 via-pink-500 to-indigo-500 text-white px-4 py-1 rounded-full text-xs font-bold shadow-lg">
                    🚀 Mais Popular
                  </span>
                </div>
                <div className="text-center mb-8">
                  <div className="w-16 h-16 bg-gradient-to-r from-purple-500 via-pink-500 to-indigo-500 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
                    <Brain className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-slate-800 mb-2">
                    Professional
                  </h3>
                  <div className="text-5xl font-bold bg-gradient-to-r from-purple-600 via-pink-600 to-indigo-600 bg-clip-text text-transparent mb-2">
                    R$ 699
                  </div>
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
                  <h3 className="text-2xl font-bold text-slate-800 mb-2">
                    Enterprise
                  </h3>
                  <div className="text-4xl font-bold bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent mb-2">
                    Customizado
                  </div>
                  <div className="text-slate-500">Sob consulta</div>
                </div>

                <ul className="space-y-4 mb-8 flex-grow">
                  <li className="flex items-center text-slate-600">
                    <div className="w-6 h-6 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full flex items-center justify-center mr-3 shadow-md">
                      <span className="text-white text-sm font-bold">✓</span>
                    </div>
                    Candidatos ilimitados
                  </li>
                  <li className="flex items-center text-slate-600">
                    <div className="w-6 h-6 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full flex items-center justify-center mr-3 shadow-md">
                      <span className="text-white text-sm font-bold">✓</span>
                    </div>
                    Vagas ilimitadas
                  </li>
                  <li className="flex items-center text-slate-600">
                    <div className="w-6 h-6 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full flex items-center justify-center mr-3 shadow-md">
                      <span className="text-white text-sm font-bold">✓</span>
                    </div>
                    IA personalizada
                  </li>
                  <li className="flex items-center text-slate-600">
                    <div className="w-6 h-6 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full flex items-center justify-center mr-3 shadow-md">
                      <span className="text-white text-sm font-bold">✓</span>
                    </div>
                    Suporte dedicado 24/7
                  </li>
                  <li className="flex items-center text-slate-600">
                    <div className="w-6 h-6 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full flex items-center justify-center mr-3 shadow-md">
                      <span className="text-white text-sm font-bold">✓</span>
                    </div>
                    White-label disponível
                  </li>
                  <li className="flex items-center text-slate-600">
                    <div className="w-6 h-6 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full flex items-center justify-center mr-3 shadow-md">
                      <span className="text-white text-sm font-bold">✓</span>
                    </div>
                    Integrações customizadas
                  </li>
                  <li className="flex items-center text-slate-600">
                    <div className="w-6 h-6 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full flex items-center justify-center mr-3 shadow-md">
                      <span className="text-white text-sm font-bold">✓</span>
                    </div>
                    SLA garantido
                  </li>
                  <li className="flex items-center text-slate-600">
                    <div className="w-6 h-6 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full flex items-center justify-center mr-3 shadow-md">
                      <span className="text-white text-sm font-bold">✓</span>
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
            <p className="text-slate-500 mb-4">
              ✅ Teste grátis de 14 dias em todos os planos
            </p>
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
            Nossa missão é revolucionar como empresas encontram e conectam
            talentos, eliminando barreiras e criando oportunidades através da
            tecnologia.
          </p>
          <div className="grid md:grid-cols-3 gap-8 mt-12">
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600 mb-2">95%</div>
              <div className="text-slate-600">Precisão no matching</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600 mb-2">10x</div>
              <div className="text-slate-600">
                Mais rápido que métodos tradicionais
              </div>
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
              © 2025 Triaxia. Todos os direitos reservados.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
