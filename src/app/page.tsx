'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  ChevronRight,
  Zap,
  Brain,
  Target,
  Shield,
  Users,
  TrendingUp,
  Star,
  ArrowRight,
  Menu,
  X,
} from 'lucide-react';

export default function Home() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className="min-h-screen bg-black text-white overflow-hidden">
      {/* Animated Background */}
      <div className="fixed inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 via-purple-900/20 to-cyan-900/20"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(59,130,246,0.1),transparent_50%)] animate-pulse"></div>
        <div
          className="absolute w-96 h-96 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-full blur-3xl transition-all duration-1000 ease-out"
          style={{
            left: mousePosition.x - 192,
            top: mousePosition.y - 192,
          }}
        ></div>
      </div>

      {/* Grid Pattern */}
      <div className="fixed inset-0 z-0 opacity-20">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `
            linear-gradient(rgba(59, 130, 246, 0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(59, 130, 246, 0.1) 1px, transparent 1px)
          `,
            backgroundSize: '50px 50px',
          }}
        ></div>
      </div>

      {/* Header */}
      <header className="relative z-50 px-6 py-4">
        <nav className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center">
              <Brain className="w-6 h-6 text-white" />
            </div>
            <span className="text-2xl font-bold text-white">Triaxia</span>
          </div>

          <div className="hidden md:flex items-center space-x-8">
            <a
              href="#features"
              className="text-gray-300 hover:text-white transition-colors"
            >
              Recursos
            </a>
            <a
              href="#stats"
              className="text-gray-300 hover:text-white transition-colors"
            >
              Resultados
            </a>
            <a
              href="#testimonials"
              className="text-gray-300 hover:text-white transition-colors"
            >
              Cases
            </a>
            <Link href="/pricing" className="bg-gradient-to-r from-blue-600 to-purple-600 px-6 py-2 rounded-full hover:from-blue-700 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 inline-block">
              Começar Agora
            </Link>
          </div>

          <button
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="relative z-10 px-6 py-20">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div className="space-y-8">
              <div className="space-y-6">
                <div className="inline-flex items-center space-x-2 bg-blue-500/10 border border-blue-500/20 rounded-full px-4 py-2 text-sm">
                  <Zap className="w-4 h-4 text-blue-400" />
                  <span className="text-blue-300">
                    Revolução em Recrutamento
                  </span>
                </div>

                <h1 className="text-5xl lg:text-7xl font-bold leading-tight text-white">
                  O Futuro do
                  <br />
                  Recrutamento
                  <br />é Agora
                </h1>

                <p className="text-xl text-gray-300 leading-relaxed max-w-lg">
                  Transforme seu processo de recrutamento com{' '}
                  <span className="text-blue-400 font-semibold">
                    IA avançada
                  </span>
                  . Automatize triagens, identifique talentos excepcionais e
                  acelere contratações com precisão cirúrgica.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/pricing" className="group bg-gradient-to-r from-blue-600 to-purple-600 px-8 py-4 rounded-full text-lg font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 hover:shadow-2xl hover:shadow-blue-500/25 inline-block">
                  <span className="flex items-center space-x-2">
                    <span>Iniciar Revolução</span>
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </span>
                </Link>

                <button className="group border border-gray-600 px-8 py-4 rounded-full text-lg font-semibold hover:border-blue-500 hover:bg-blue-500/10 transition-all duration-300">
                  <span className="flex items-center space-x-2">
                    <span>Ver Demo</span>
                    <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </span>
                </button>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-6 pt-8">
                <div className="text-center">
                  <div className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                    98%
                  </div>
                  <div className="text-sm text-gray-400">Redução de Tempo</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                    10x
                  </div>
                  <div className="text-sm text-gray-400">Mais Eficiência</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent">
                    24/7
                  </div>
                  <div className="text-sm text-gray-400">Operação Contínua</div>
                </div>
              </div>
            </div>

            {/* Right Visual */}
            <div className="relative">
              <div className="relative z-10">
                {/* Main Visual Container */}
                <div className="relative w-full h-96 lg:h-[500px] bg-gradient-to-br from-blue-900/30 to-purple-900/30 rounded-3xl border border-blue-500/20 backdrop-blur-sm overflow-hidden">
                  {/* Animated Elements */}
                  {isClient && (
                    <div className="absolute inset-0">
                      {/* Floating Particles */}
                      {[...Array(20)].map((_, i) => (
                        <div
                          key={i}
                          className="absolute w-2 h-2 bg-blue-400 rounded-full opacity-60 animate-pulse"
                          style={{
                            left: `${Math.random() * 100}%`,
                            top: `${Math.random() * 100}%`,
                            animationDelay: `${Math.random() * 2}s`,
                            animationDuration: `${2 + Math.random() * 2}s`,
                          }}
                        ></div>
                      ))}
                    </div>
                  )}

                  {/* Central Brain Icon */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="relative">
                      <div className="w-32 h-32 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center animate-pulse">
                        <Brain className="w-16 h-16 text-white" />
                      </div>
                      {/* Orbiting Elements */}
                      <div
                        className="absolute inset-0 animate-spin"
                        style={{ animationDuration: '10s' }}
                      >
                        <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 w-8 h-8 bg-cyan-500 rounded-full flex items-center justify-center">
                          <Target className="w-4 h-4 text-white" />
                        </div>
                      </div>
                      <div
                        className="absolute inset-0 animate-spin"
                        style={{
                          animationDuration: '15s',
                          animationDirection: 'reverse',
                        }}
                      >
                        <div className="absolute top-1/2 -right-4 transform -translate-y-1/2 w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center">
                          <Zap className="w-4 h-4 text-white" />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Data Streams */}
                  {isClient && (
                    <div className="absolute top-4 left-4 space-y-2">
                      {[...Array(5)].map((_, i) => (
                        <div
                          key={i}
                          className="flex items-center space-x-2 opacity-70"
                        >
                          <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                          <div
                            className="h-1 bg-gradient-to-r from-green-400 to-transparent rounded"
                            style={{ width: `${50 + Math.random() * 50}px` }}
                          ></div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* Background Glow */}
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-purple-600/20 rounded-3xl blur-3xl transform scale-110"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="relative z-10 px-6 py-20">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold mb-6">
              <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                Tecnologia de Ponta
              </span>
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Revolucione seu recrutamento com IA que entende, analisa e decide
              com precisão sobre-humana
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: Brain,
                title: 'IA Neural Avançada',
                description:
                  'Algoritmos de deep learning que compreendem nuances comportamentais e técnicas dos candidatos',
                gradient: 'from-blue-500 to-cyan-500',
              },
              {
                icon: Target,
                title: 'Precisão Cirúrgica',
                description:
                  'Matching perfeito entre candidatos e vagas com 99.7% de precisão em fit cultural',
                gradient: 'from-purple-500 to-pink-500',
              },
              {
                icon: Zap,
                title: 'Velocidade Quântica',
                description:
                  'Processamento instantâneo de milhares de CVs com análise completa em segundos',
                gradient: 'from-green-500 to-emerald-500',
              },
              {
                icon: Shield,
                title: 'Segurança Militar',
                description:
                  'Proteção de dados com criptografia de nível militar e compliance total com LGPD',
                gradient: 'from-red-500 to-orange-500',
              },
              {
                icon: Users,
                title: 'Experiência Humana',
                description:
                  'Interface intuitiva que potencializa RH sem substituir o toque humano essencial',
                gradient: 'from-indigo-500 to-blue-500',
              },
              {
                icon: TrendingUp,
                title: 'Evolução Contínua',
                description:
                  'IA que aprende e evolui constantemente, melhorando resultados a cada contratação',
                gradient: 'from-yellow-500 to-orange-500',
              },
            ].map((feature, index) => (
              <div key={index} className="group relative">
                <div className="relative bg-gray-900/50 backdrop-blur-sm border border-gray-700 rounded-2xl p-8 hover:border-blue-500/50 transition-all duration-500 hover:transform hover:scale-105">
                  <div
                    className={`w-16 h-16 bg-gradient-to-r ${feature.gradient} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}
                  >
                    <feature.icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold mb-4 text-white">
                    {feature.title}
                  </h3>
                  <p className="text-gray-300 leading-relaxed">
                    {feature.description}
                  </p>

                  {/* Hover Glow Effect */}
                  <div
                    className={`absolute inset-0 bg-gradient-to-r ${feature.gradient} opacity-0 group-hover:opacity-10 rounded-2xl transition-opacity duration-500`}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Platform Section */}
      <section className="relative z-10 px-6 py-20">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left - Illustration */}
            <div className="relative order-2 lg:order-1">
              <div className="relative">
                {/* Laptop Mockup */}
                <div className="relative bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl p-4 shadow-2xl transform rotate-3 hover:rotate-0 transition-transform duration-500">
                  {/* Screen */}
                  <div className="bg-white rounded-lg overflow-hidden">
                    {/* Browser Bar */}
                    <div className="bg-gray-100 px-4 py-2 flex items-center space-x-2">
                      <div className="flex space-x-1">
                        <div className="w-3 h-3 bg-red-400 rounded-full"></div>
                        <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
                        <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                      </div>
                      <div className="flex-1 bg-white rounded px-3 py-1 text-xs text-gray-500">
                        triaxia.ai/dashboard
                      </div>
                    </div>

                    {/* Dashboard Content */}
                    <div className="p-6 bg-gradient-to-br from-blue-50 to-purple-50">
                      {/* Header */}
                      <div className="flex items-center justify-between mb-6">
                        <h3 className="text-lg font-bold text-gray-800">
                          Dashboard IA
                        </h3>
                        <div className="flex space-x-2">
                          <div className="w-8 h-8 bg-blue-500 rounded-full"></div>
                          <div className="w-8 h-8 bg-purple-500 rounded-full"></div>
                        </div>
                      </div>

                      {/* Candidate Cards */}
                      <div className="grid grid-cols-2 gap-3 mb-4">
                        {[1, 2, 3, 4].map(i => (
                          <div
                            key={i}
                            className="bg-white rounded-lg p-3 shadow-sm border"
                          >
                            <div className="flex items-center space-x-2 mb-2">
                              <div className="w-6 h-6 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full"></div>
                              <div className="flex-1">
                                <div className="h-2 bg-gray-200 rounded mb-1"></div>
                                <div className="h-1 bg-gray-100 rounded w-2/3"></div>
                              </div>
                            </div>
                            <div className="flex justify-between items-center">
                              <div className="text-xs text-green-600 font-semibold">
                                98% Match
                              </div>
                              <div className="w-4 h-4 bg-green-400 rounded"></div>
                            </div>
                          </div>
                        ))}
                      </div>

                      {/* Progress Bars */}
                      <div className="space-y-2">
                        <div className="flex items-center space-x-2">
                          <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                          <div className="flex-1 bg-gray-200 rounded-full h-2">
                            <div className="bg-blue-500 h-2 rounded-full w-4/5"></div>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                          <div className="flex-1 bg-gray-200 rounded-full h-2">
                            <div className="bg-purple-500 h-2 rounded-full w-3/5"></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Floating Elements */}
                <div className="absolute -top-4 -right-4 w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center animate-bounce">
                  <Brain className="w-8 h-8 text-white" />
                </div>

                <div className="absolute -bottom-4 -left-4 w-12 h-12 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full flex items-center justify-center animate-pulse">
                  <Target className="w-6 h-6 text-white" />
                </div>

                {/* Background Shapes */}
                <div className="absolute -z-10 top-8 -left-8 w-32 h-32 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-full blur-2xl"></div>
                <div className="absolute -z-10 -bottom-8 -right-8 w-24 h-24 bg-gradient-to-r from-pink-500/20 to-red-500/20 rounded-full blur-2xl"></div>
              </div>
            </div>

            {/* Right - Content */}
            <div className="space-y-8 order-1 lg:order-2">
              <div className="space-y-6">
                <div className="inline-flex items-center space-x-2 bg-blue-500/10 border border-blue-500/20 rounded-full px-4 py-2 text-sm">
                  <Zap className="w-4 h-4 text-blue-400" />
                  <span className="text-blue-300">INICIE COM TRIAXIA</span>
                </div>

                <h2 className="text-4xl lg:text-5xl font-bold leading-tight text-white">
                  Comece a usar a
                  <br />
                  <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                    plataforma ATS
                  </span>
                  <br />
                  do futuro.
                </h2>

                <p className="text-xl text-gray-300 leading-relaxed max-w-lg">
                  A Triaxia é mais que um software: é a{' '}
                  <span className="text-blue-400 font-semibold">
                    solução estratégica
                  </span>{' '}
                  que transforma seu RH e revoluciona como você encontra, avalia
                  e contrata os melhores talentos.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <button className="group bg-gradient-to-r from-blue-600 to-purple-600 px-8 py-4 rounded-full text-lg font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 hover:shadow-2xl hover:shadow-blue-500/25">
                  <span className="flex items-center space-x-2">
                    <span>Demonstração</span>
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </span>
                </button>

                <button className="group border border-gray-600 px-8 py-4 rounded-full text-lg font-semibold hover:border-blue-500 hover:bg-blue-500/10 transition-all duration-300">
                  <span className="flex items-center space-x-2">
                    <span>Falar com Especialista</span>
                    <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </span>
                </button>
              </div>

              {/* Trust Indicators */}
              <div className="grid grid-cols-3 gap-6 pt-8">
                <div className="text-center">
                  <div className="text-2xl font-bold text-white">500+</div>
                  <div className="text-sm text-gray-400">Empresas Ativas</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-white">99.9%</div>
                  <div className="text-sm text-gray-400">Uptime</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-white">24h</div>
                  <div className="text-sm text-gray-400">Suporte</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section id="stats" className="relative z-10 px-6 py-20">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold mb-6">
              <span className="bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text text-transparent">
                Resultados Extraordinários
              </span>
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                number: '2.5M+',
                label: 'CVs Analisados',
                gradient: 'from-blue-400 to-cyan-400',
              },
              {
                number: '99.7%',
                label: 'Precisão de Match',
                gradient: 'from-purple-400 to-pink-400',
              },
              {
                number: '15min',
                label: 'Tempo Médio',
                gradient: 'from-green-400 to-emerald-400',
              },
              {
                number: '847%',
                label: 'ROI Médio',
                gradient: 'from-yellow-400 to-orange-400',
              },
            ].map((stat, index) => (
              <div key={index} className="text-center group">
                <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-700 rounded-2xl p-8 hover:border-blue-500/50 transition-all duration-500 hover:transform hover:scale-105">
                  <div
                    className={`text-5xl font-bold mb-2 bg-gradient-to-r ${stat.gradient} bg-clip-text text-transparent`}
                  >
                    {stat.number}
                  </div>
                  <div className="text-gray-300 text-lg">{stat.label}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section id="testimonials" className="relative z-10 px-6 py-20">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold mb-6">
              <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                Líderes Confiam
              </span>
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                name: 'Ana Silva',
                role: 'Head of Talent - TechCorp',
                content:
                  'Triaxia revolucionou nosso recrutamento. Reduzimos 90% do tempo de triagem e aumentamos a qualidade dos candidatos exponencialmente.',
                avatar: 'AS',
              },
              {
                name: 'Carlos Mendes',
                role: 'CEO - StartupX',
                content:
                  'Impressionante como a IA consegue identificar soft skills que passariam despercebidas. Nossa taxa de retenção aumentou 300%.',
                avatar: 'CM',
              },
              {
                name: 'Marina Costa',
                role: 'CHRO - GlobalTech',
                content:
                  'A precisão é sobre-humana. Em 6 meses, contratamos os melhores talentos da nossa história. ROI de 1200% no primeiro ano.',
                avatar: 'MC',
              },
            ].map((testimonial, index) => (
              <div key={index} className="group">
                <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-700 rounded-2xl p-8 hover:border-purple-500/50 transition-all duration-500 hover:transform hover:scale-105">
                  <div className="flex items-center mb-6">
                    <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white font-bold mr-4">
                      {testimonial.avatar}
                    </div>
                    <div>
                      <div className="font-bold text-white">
                        {testimonial.name}
                      </div>
                      <div className="text-gray-400 text-sm">
                        {testimonial.role}
                      </div>
                    </div>
                  </div>
                  <p className="text-gray-300 leading-relaxed italic">
                    "{testimonial.content}"
                  </p>
                  <div className="flex mt-4">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className="w-5 h-5 text-yellow-400 fill-current"
                      />
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>



      {/* Advanced Features Section */}
      <section className="relative z-10 px-6 py-20">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold mb-6">
              <span className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
                Recursos Avançados
              </span>
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Descubra as funcionalidades que fazem da Triaxia a escolha ideal
              para modernizar seu RH
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* AI-Powered Matching */}
            <div className="group relative">
              <div className="relative bg-gray-900/50 backdrop-blur-sm border border-gray-700 rounded-2xl p-8 hover:border-cyan-500/50 transition-all duration-500 hover:transform hover:scale-105">
                <div className="w-16 h-16 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <Brain className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold mb-4 text-white">
                  IA para Matching
                </h3>
                <p className="text-gray-300 leading-relaxed mb-4">
                  Algoritmos inteligentes que conectam automaticamente os
                  melhores candidatos às vagas certas.
                </p>
                <ul className="text-sm text-gray-400 space-y-2">
                  <li className="flex items-center">
                    <span className="w-1.5 h-1.5 bg-cyan-500 rounded-full mr-2"></span>
                    Análise de compatibilidade
                  </li>
                  <li className="flex items-center">
                    <span className="w-1.5 h-1.5 bg-cyan-500 rounded-full mr-2"></span>
                    Ranking automático
                  </li>
                  <li className="flex items-center">
                    <span className="w-1.5 h-1.5 bg-cyan-500 rounded-full mr-2"></span>
                    Sugestões personalizadas
                  </li>
                </ul>
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 to-blue-500/10 opacity-0 group-hover:opacity-100 rounded-2xl transition-opacity duration-500"></div>
              </div>
            </div>

            {/* Advanced Analytics */}
            <div className="group relative">
              <div className="relative bg-gray-900/50 backdrop-blur-sm border border-gray-700 rounded-2xl p-8 hover:border-purple-500/50 transition-all duration-500 hover:transform hover:scale-105">
                <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <TrendingUp className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold mb-4 text-white">
                  Analytics Avançado
                </h3>
                <p className="text-gray-300 leading-relaxed mb-4">
                  Dashboards completos com métricas detalhadas para otimizar
                  seus processos de recrutamento.
                </p>
                <ul className="text-sm text-gray-400 space-y-2">
                  <li className="flex items-center">
                    <span className="w-1.5 h-1.5 bg-purple-500 rounded-full mr-2"></span>
                    Relatórios em tempo real
                  </li>
                  <li className="flex items-center">
                    <span className="w-1.5 h-1.5 bg-purple-500 rounded-full mr-2"></span>
                    KPIs personalizados
                  </li>
                  <li className="flex items-center">
                    <span className="w-1.5 h-1.5 bg-purple-500 rounded-full mr-2"></span>
                    Insights preditivos
                  </li>
                </ul>
                <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-pink-500/10 opacity-0 group-hover:opacity-100 rounded-2xl transition-opacity duration-500"></div>
              </div>
            </div>

            {/* Automation Workflows */}
            <div className="group relative">
              <div className="relative bg-gray-900/50 backdrop-blur-sm border border-gray-700 rounded-2xl p-8 hover:border-green-500/50 transition-all duration-500 hover:transform hover:scale-105">
                <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-500 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <Zap className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold mb-4 text-white">
                  Automação Inteligente
                </h3>
                <p className="text-gray-300 leading-relaxed mb-4">
                  Workflows automatizados que eliminam tarefas repetitivas e
                  aceleram o processo seletivo.
                </p>
                <ul className="text-sm text-gray-400 space-y-2">
                  <li className="flex items-center">
                    <span className="w-1.5 h-1.5 bg-green-500 rounded-full mr-2"></span>
                    E-mails automáticos
                  </li>
                  <li className="flex items-center">
                    <span className="w-1.5 h-1.5 bg-green-500 rounded-full mr-2"></span>
                    Agendamento inteligente
                  </li>
                  <li className="flex items-center">
                    <span className="w-1.5 h-1.5 bg-green-500 rounded-full mr-2"></span>
                    Notificações personalizadas
                  </li>
                </ul>
                <div className="absolute inset-0 bg-gradient-to-r from-green-500/10 to-emerald-500/10 opacity-0 group-hover:opacity-100 rounded-2xl transition-opacity duration-500"></div>
              </div>
            </div>

            {/* Collaborative Tools */}
            <div className="group relative">
              <div className="relative bg-gray-900/50 backdrop-blur-sm border border-gray-700 rounded-2xl p-8 hover:border-orange-500/50 transition-all duration-500 hover:transform hover:scale-105">
                <div className="w-16 h-16 bg-gradient-to-r from-orange-500 to-red-500 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <Users className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold mb-4 text-white">
                  Colaboração em Equipe
                </h3>
                <p className="text-gray-300 leading-relaxed mb-4">
                  Ferramentas que facilitam a colaboração entre recrutadores,
                  gestores e stakeholders.
                </p>
                <ul className="text-sm text-gray-400 space-y-2">
                  <li className="flex items-center">
                    <span className="w-1.5 h-1.5 bg-orange-500 rounded-full mr-2"></span>
                    Avaliações colaborativas
                  </li>
                  <li className="flex items-center">
                    <span className="w-1.5 h-1.5 bg-orange-500 rounded-full mr-2"></span>
                    Comentários em tempo real
                  </li>
                  <li className="flex items-center">
                    <span className="w-1.5 h-1.5 bg-orange-500 rounded-full mr-2"></span>
                    Aprovações digitais
                  </li>
                </ul>
                <div className="absolute inset-0 bg-gradient-to-r from-orange-500/10 to-red-500/10 opacity-0 group-hover:opacity-100 rounded-2xl transition-opacity duration-500"></div>
              </div>
            </div>

            {/* Mobile Experience */}
            <div className="group relative">
              <div className="relative bg-gray-900/50 backdrop-blur-sm border border-gray-700 rounded-2xl p-8 hover:border-indigo-500/50 transition-all duration-500 hover:transform hover:scale-105">
                <div className="w-16 h-16 bg-gradient-to-r from-indigo-500 to-blue-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <Target className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold mb-4 text-white">
                  Experiência Mobile
                </h3>
                <p className="text-gray-300 leading-relaxed mb-4">
                  Interface otimizada para dispositivos móveis, permitindo
                  recrutamento em qualquer lugar.
                </p>
                <ul className="text-sm text-gray-400 space-y-2">
                  <li className="flex items-center">
                    <span className="w-1.5 h-1.5 bg-indigo-500 rounded-full mr-2"></span>
                    App nativo iOS/Android
                  </li>
                  <li className="flex items-center">
                    <span className="w-1.5 h-1.5 bg-indigo-500 rounded-full mr-2"></span>
                    Sincronização offline
                  </li>
                  <li className="flex items-center">
                    <span className="w-1.5 h-1.5 bg-indigo-500 rounded-full mr-2"></span>
                    Push notifications
                  </li>
                </ul>
                <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/10 to-blue-600/10 opacity-0 group-hover:opacity-100 rounded-2xl transition-opacity duration-500"></div>
              </div>
            </div>

            {/* Security & Compliance */}
            <div className="group relative">
              <div className="relative bg-gray-900/50 backdrop-blur-sm border border-gray-700 rounded-2xl p-8 hover:border-red-500/50 transition-all duration-500 hover:transform hover:scale-105">
                <div className="w-16 h-16 bg-gradient-to-r from-red-500 to-pink-500 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <Shield className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold mb-4 text-white">
                  Segurança & Compliance
                </h3>
                <p className="text-gray-300 leading-relaxed mb-4">
                  Máxima segurança dos dados com conformidade total às
                  regulamentações vigentes.
                </p>
                <ul className="text-sm text-gray-400 space-y-2">
                  <li className="flex items-center">
                    <span className="w-1.5 h-1.5 bg-red-500 rounded-full mr-2"></span>
                    Certificação ISO 27001
                  </li>
                  <li className="flex items-center">
                    <span className="w-1.5 h-1.5 bg-red-500 rounded-full mr-2"></span>
                    Conformidade LGPD
                  </li>
                  <li className="flex items-center">
                    <span className="w-1.5 h-1.5 bg-red-500 rounded-full mr-2"></span>
                    Criptografia end-to-end
                  </li>
                </ul>
                <div className="absolute inset-0 bg-gradient-to-r from-red-500/10 to-pink-500/10 opacity-0 group-hover:opacity-100 rounded-2xl transition-opacity duration-500"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Integrations Section */}
      <section className="relative z-10 px-6 py-20">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold mb-6">
              <span className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
                Integrações Poderosas
              </span>
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Conecte a Triaxia com suas ferramentas favoritas e crie um
              ecossistema de RH integrado
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
            {/* Integration Benefits */}
            <div className="space-y-8">
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-xl flex items-center justify-center flex-shrink-0">
                  <svg
                    className="w-6 h-6 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"
                    />
                  </svg>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white mb-2">
                    Sincronização Automática
                  </h3>
                  <p className="text-gray-300">
                    Dados sincronizados em tempo real entre todas as plataformas
                    conectadas.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center flex-shrink-0">
                  <svg
                    className="w-6 h-6 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white mb-2">
                    Setup Simplificado
                  </h3>
                  <p className="text-gray-300">
                    Configuração em poucos cliques com assistente de integração
                    inteligente.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl flex items-center justify-center flex-shrink-0">
                  <svg
                    className="w-6 h-6 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                    />
                  </svg>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white mb-2">
                    API Robusta
                  </h3>
                  <p className="text-gray-300">
                    Desenvolva integrações customizadas com nossa API RESTful
                    completa.
                  </p>
                </div>
              </div>
            </div>

            {/* Integration Visual */}
            <div className="relative">
              <div className="bg-gradient-to-br from-gray-900/50 to-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-3xl p-8">
                <div className="text-center mb-6">
                  <div className="w-16 h-16 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <svg
                      className="w-8 h-8 text-white"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                      />
                    </svg>
                  </div>
                  <h4 className="text-lg font-bold text-white">Triaxia ATS</h4>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-gray-800/50 rounded-xl p-4 text-center border border-gray-600">
                    <div className="w-8 h-8 bg-blue-500 rounded-lg mx-auto mb-2"></div>
                    <span className="text-sm text-gray-300">LinkedIn</span>
                  </div>
                  <div className="bg-gray-800/50 rounded-xl p-4 text-center border border-gray-600">
                    <div className="w-8 h-8 bg-green-500 rounded-lg mx-auto mb-2"></div>
                    <span className="text-sm text-gray-300">WhatsApp</span>
                  </div>
                  <div className="bg-gray-800/50 rounded-xl p-4 text-center border border-gray-600">
                    <div className="w-8 h-8 bg-purple-500 rounded-lg mx-auto mb-2"></div>
                    <span className="text-sm text-gray-300">Slack</span>
                  </div>
                  <div className="bg-gray-800/50 rounded-xl p-4 text-center border border-gray-600">
                    <div className="w-8 h-8 bg-orange-500 rounded-lg mx-auto mb-2"></div>
                    <span className="text-sm text-gray-300">Teams</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="text-center mt-12">
            <button className="bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white font-semibold px-8 py-4 rounded-xl transition-all duration-300 hover:scale-105">
              Ver Todas as Integrações
            </button>
          </div>
        </div>
      </section>

      {/* White Label Section */}
      <section className="relative z-10 px-6 py-24">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Content */}
            <div>
              <div className="mb-8">
                <span className="bg-gradient-to-r from-purple-500 to-pink-600 text-white px-4 py-2 rounded-full text-sm font-semibold">
                  🎨 Diferencial Exclusivo
                </span>
              </div>
              
              <h2 className="text-4xl lg:text-5xl font-bold mb-6">
                <span className="bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 bg-clip-text text-transparent">
                  Sua Marca,
                </span>
                <br />
                <span className="text-white">Sua Identidade</span>
              </h2>
              
              <p className="text-xl text-gray-400 mb-8">
                A Triaxia oferece páginas totalmente personalizadas com a identidade visual da sua empresa. Seus candidatos verão apenas suas vagas, sem competição ou distração de outras empresas.
              </p>
              
              <div className="space-y-6 mb-8">
                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-purple-500 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-white text-sm font-bold">🎨</span>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-2">Design Personalizado</h3>
                    <p className="text-gray-400">Logo, cores, fontes e layout adaptados à identidade visual da sua empresa</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-pink-500 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-white text-sm font-bold">🔒</span>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-2">Ambiente Exclusivo</h3>
                    <p className="text-gray-400">Candidatos veem apenas suas vagas, sem competição de outras empresas</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-red-500 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-white text-sm font-bold">🌐</span>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-2">Domínio Próprio</h3>
                    <p className="text-gray-400">Página de carreiras no seu próprio domínio (ex: carreiras.suaempresa.com)</p>
                  </div>
                </div>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <button className="bg-gradient-to-r from-purple-500 to-pink-600 text-white px-8 py-4 rounded-xl font-semibold hover:from-purple-600 hover:to-pink-700 transition-all duration-300 flex items-center justify-center group">
                  <span>Ver Demonstração</span>
                  <svg className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
                
                <button className="border border-purple-500 text-purple-400 px-8 py-4 rounded-xl font-semibold hover:bg-purple-500/10 transition-all duration-300">
                  Falar com Especialista
                </button>
              </div>
            </div>
            
            {/* Visual */}
            <div className="relative">
              <div className="bg-gradient-to-br from-purple-900/30 to-pink-900/30 backdrop-blur-sm border border-purple-500/30 rounded-3xl p-8 relative overflow-hidden">
                {/* Background Pattern */}
                <div className="absolute inset-0 opacity-10">
                  <div className="absolute top-4 left-4 w-16 h-16 bg-purple-500 rounded-lg"></div>
                  <div className="absolute top-8 right-8 w-12 h-12 bg-pink-500 rounded-full"></div>
                  <div className="absolute bottom-8 left-8 w-8 h-8 bg-red-500 rounded-lg"></div>
                </div>
                
                {/* Mock Browser */}
                <div className="bg-gray-900 rounded-2xl overflow-hidden border border-gray-700 relative z-10">
                  {/* Browser Header */}
                  <div className="bg-gray-800 px-4 py-3 flex items-center space-x-2">
                    <div className="flex space-x-2">
                      <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                      <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                      <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    </div>
                    <div className="flex-1 bg-gray-700 rounded px-3 py-1 text-xs text-gray-400 ml-4">
                      carreiras.suaempresa.com
                    </div>
                  </div>
                  
                  {/* Page Content */}
                  <div className="p-6 space-y-4">
                    {/* Header with Company Branding */}
                    <div className="flex items-center space-x-3 mb-6">
                      <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-600 rounded-lg"></div>
                      <div>
                        <div className="h-3 bg-white rounded w-24 mb-1"></div>
                        <div className="h-2 bg-gray-400 rounded w-16"></div>
                      </div>
                    </div>
                    
                    {/* Job Cards */}
                    <div className="space-y-3">
                      <div className="bg-gray-800 rounded-lg p-4 border border-purple-500/30">
                        <div className="h-3 bg-white rounded w-32 mb-2"></div>
                        <div className="h-2 bg-gray-400 rounded w-24 mb-2"></div>
                        <div className="flex space-x-2">
                          <div className="h-2 bg-purple-500 rounded w-16"></div>
                          <div className="h-2 bg-pink-500 rounded w-12"></div>
                        </div>
                      </div>
                      
                      <div className="bg-gray-800 rounded-lg p-4 border border-purple-500/30">
                        <div className="h-3 bg-white rounded w-28 mb-2"></div>
                        <div className="h-2 bg-gray-400 rounded w-20 mb-2"></div>
                        <div className="flex space-x-2">
                          <div className="h-2 bg-purple-500 rounded w-14"></div>
                          <div className="h-2 bg-pink-500 rounded w-10"></div>
                        </div>
                      </div>
                    </div>
                    
                    {/* CTA Button */}
                    <div className="pt-4">
                      <div className="h-8 bg-gradient-to-r from-purple-500 to-pink-600 rounded w-32"></div>
                    </div>
                  </div>
                </div>
                
                {/* Floating Elements */}
                <div className="absolute -top-4 -right-4 w-8 h-8 bg-purple-500 rounded-lg animate-pulse"></div>
                <div className="absolute -bottom-4 -left-4 w-6 h-6 bg-pink-500 rounded-full animate-bounce"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="relative z-10 px-6 py-24">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              <span className="bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent">
                Planos que Crescem
              </span>
              <br />
              <span className="text-white">com Sua Empresa</span>
            </h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              Escolha o plano ideal para sua equipe. Todos incluem teste
              gratuito de 7 dias.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-16">
            {/* Starter Plan */}
            <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-700 rounded-2xl p-8 hover:border-cyan-500/50 transition-all duration-300 group">
              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold text-white mb-2">Starter</h3>
                <p className="text-gray-400 mb-6">
                  Ideal para pequenas equipes
                </p>
                <div className="mb-6">
                  <span className="text-4xl font-bold text-white">R$ 299</span>
                  <span className="text-gray-400">/mês</span>
                </div>
                <p className="text-sm text-gray-500">até 3 usuários</p>
              </div>

              <ul className="space-y-4 mb-8">
                <li className="flex items-center text-gray-300">
                  <div className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center mr-3">
                    <span className="text-white text-xs">✓</span>
                  </div>
                  Até 100 vagas ativas
                </li>
                <li className="flex items-center text-gray-300">
                  <div className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center mr-3">
                    <span className="text-white text-xs">✓</span>
                  </div>
                  IA para matching básico
                </li>
                <li className="flex items-center text-gray-300">
                  <div className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center mr-3">
                    <span className="text-white text-xs">✓</span>
                  </div>
                  Relatórios básicos
                </li>
                <li className="flex items-center text-gray-300">
                  <div className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center mr-3">
                    <span className="text-white text-xs">✓</span>
                  </div>
                  Suporte por email
                </li>
                <li className="flex items-center text-gray-300">
                  <div className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center mr-3">
                    <span className="text-white text-xs">✓</span>
                  </div>
                  Integrações básicas
                </li>
              </ul>

              <Link href="/pricing" className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 text-white py-3 px-6 rounded-xl font-semibold hover:from-cyan-600 hover:to-blue-700 transition-all duration-300 group-hover:scale-105 inline-block text-center">
                Começar Teste Grátis
              </Link>
            </div>

            {/* Professional Plan - Featured */}
            <div className="bg-gradient-to-b from-blue-900/30 to-purple-900/30 backdrop-blur-sm border-2 border-blue-500 rounded-2xl p-8 relative group transform scale-105">
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                <span className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-4 py-1 rounded-full text-sm font-semibold">
                  Mais Popular
                </span>
              </div>

              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold text-white mb-2">
                  Professional
                </h3>
                <p className="text-gray-400 mb-6">
                  Para equipes em crescimento
                </p>
                <div className="mb-6">
                  <span className="text-4xl font-bold text-white">R$ 499</span>
                  <span className="text-gray-400">/mês</span>
                </div>
                <p className="text-sm text-gray-500">até 10 usuários</p>
              </div>

              <ul className="space-y-4 mb-8">
                <li className="flex items-center text-gray-300">
                  <div className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center mr-3">
                    <span className="text-white text-xs">✓</span>
                  </div>
                  Vagas ilimitadas
                </li>
                <li className="flex items-center text-gray-300">
                  <div className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center mr-3">
                    <span className="text-white text-xs">✓</span>
                  </div>
                  IA avançada para matching
                </li>
                <li className="flex items-center text-gray-300">
                  <div className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center mr-3">
                    <span className="text-white text-xs">✓</span>
                  </div>
                  Analytics completo
                </li>
                <li className="flex items-center text-gray-300">
                  <div className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center mr-3">
                    <span className="text-white text-xs">✓</span>
                  </div>
                  Suporte prioritário
                </li>
                <li className="flex items-center text-gray-300">
                  <div className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center mr-3">
                    <span className="text-white text-xs">✓</span>
                  </div>
                  Todas as integrações
                </li>
                <li className="flex items-center text-gray-300">
                  <div className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center mr-3">
                    <span className="text-white text-xs">✓</span>
                  </div>
                  Automação de workflows
                </li>
              </ul>

              <Link href="/pricing" className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white py-3 px-6 rounded-xl font-semibold hover:from-blue-600 hover:to-purple-700 transition-all duration-300 group-hover:scale-105 inline-block text-center">
                Começar Teste Grátis
              </Link>
            </div>

            {/* Enterprise Plan */}
            <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-700 rounded-2xl p-8 hover:border-cyan-500/50 transition-all duration-300 group">
              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold text-white mb-2">
                  Enterprise
                </h3>
                <p className="text-gray-400 mb-6">Para grandes organizações</p>
                <div className="mb-6">
                  <span className="text-4xl font-bold text-white">
                    Personalizado
                  </span>
                </div>
                <p className="text-sm text-gray-500">usuários ilimitados</p>
              </div>

              <ul className="space-y-4 mb-8">
                <li className="flex items-center text-gray-300">
                  <div className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center mr-3">
                    <span className="text-white text-xs">✓</span>
                  </div>
                  Tudo do Professional
                </li>
                <li className="flex items-center text-gray-300">
                  <div className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center mr-3">
                    <span className="text-white text-xs">✓</span>
                  </div>
                  Implementação dedicada
                </li>
                <li className="flex items-center text-gray-300">
                  <div className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center mr-3">
                    <span className="text-white text-xs">✓</span>
                  </div>
                  Suporte 24/7
                </li>
                <li className="flex items-center text-gray-300">
                  <div className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center mr-3">
                    <span className="text-white text-xs">✓</span>
                  </div>
                  API personalizada
                </li>
                <li className="flex items-center text-gray-300">
                  <div className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center mr-3">
                    <span className="text-white text-xs">✓</span>
                  </div>
                  Treinamento da equipe
                </li>
                <li className="flex items-center text-gray-300">
                  <div className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center mr-3">
                    <span className="text-white text-xs">✓</span>
                  </div>
                  SLA garantido
                </li>
              </ul>

              <button className="w-full bg-gradient-to-r from-purple-500 to-pink-600 text-white py-3 px-6 rounded-xl font-semibold hover:from-purple-600 hover:to-pink-700 transition-all duration-300 group-hover:scale-105">
                Falar com Vendas
              </button>
            </div>
          </div>

          {/* Additional Info */}
          <div className="text-center">
            <p className="text-gray-400 mb-6">
              Todos os planos incluem teste gratuito de 7 dias • Sem taxa de
              setup • Cancele a qualquer momento
            </p>
            <div className="flex flex-wrap justify-center gap-8 text-sm text-gray-500">
              <div className="flex items-center">
                <div className="w-4 h-4 bg-green-500 rounded-full mr-2"></div>
                SSL e criptografia
              </div>
              <div className="flex items-center">
                <div className="w-4 h-4 bg-green-500 rounded-full mr-2"></div>
                LGPD compliant
              </div>
              <div className="flex items-center">
                <div className="w-4 h-4 bg-green-500 rounded-full mr-2"></div>
                Backup automático
              </div>
              <div className="flex items-center">
                <div className="w-4 h-4 bg-green-500 rounded-full mr-2"></div>
                99.9% uptime
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="relative z-10 px-6 py-24">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold mb-6">
              <span className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
                Perguntas Frequentes
              </span>
            </h2>
            <p className="text-xl text-gray-300">
              Tire suas dúvidas sobre a plataforma Triaxia
            </p>
          </div>

          <div className="space-y-6">
            {/* FAQ Item 1 */}
            <div className="bg-gray-900/30 backdrop-blur-sm border border-gray-700 rounded-2xl p-6 hover:border-cyan-500/50 transition-all duration-300">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-white mb-3">
                    Como funciona o período de teste gratuito?
                  </h3>
                  <p className="text-gray-300 leading-relaxed">
                    Oferecemos 7 dias de teste gratuito com acesso completo a
                    todas as funcionalidades da plataforma. Não é necessário
                    cartão de crédito para começar. Durante o período de teste,
                    você pode criar vagas, gerenciar candidatos e explorar todos
                    os recursos avançados.
                  </p>
                </div>
                <div className="ml-4">
                  <div className="w-8 h-8 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-lg flex items-center justify-center">
                    <svg
                      className="w-4 h-4 text-white"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </div>
                </div>
              </div>
            </div>

            {/* FAQ Item 2 */}
            <div className="bg-gray-900/30 backdrop-blur-sm border border-gray-700 rounded-2xl p-6 hover:border-cyan-500/50 transition-all duration-300">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-white mb-3">
                    A Triaxia se integra com outras ferramentas de RH?
                  </h3>
                  <p className="text-gray-300 leading-relaxed">
                    Sim! Temos integrações nativas com LinkedIn, WhatsApp,
                    Slack, Microsoft Teams, Gmail e Zapier. Também oferecemos
                    uma API robusta para integrações customizadas com sistemas
                    internos da sua empresa.
                  </p>
                </div>
                <div className="ml-4">
                  <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
                    <svg
                      className="w-4 h-4 text-white"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </div>
                </div>
              </div>
            </div>

            {/* FAQ Item 3 */}
            <div className="bg-gray-900/30 backdrop-blur-sm border border-gray-700 rounded-2xl p-6 hover:border-cyan-500/50 transition-all duration-300">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-white mb-3">
                    Como funciona a IA para matching de candidatos?
                  </h3>
                  <p className="text-gray-300 leading-relaxed">
                    Nossa IA analisa automaticamente perfis de candidatos e
                    requisitos de vagas, criando um score de compatibilidade
                    baseado em habilidades, experiência e fit cultural. O
                    sistema aprende continuamente e melhora as sugestões ao
                    longo do tempo.
                  </p>
                </div>
                <div className="ml-4">
                  <div className="w-8 h-8 bg-gradient-to-r from-green-500 to-emerald-500 rounded-lg flex items-center justify-center">
                    <svg
                      className="w-4 h-4 text-white"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </div>
                </div>
              </div>
            </div>

            {/* FAQ Item 4 */}
            <div className="bg-gray-900/30 backdrop-blur-sm border border-gray-700 rounded-2xl p-6 hover:border-cyan-500/50 transition-all duration-300">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-white mb-3">
                    Os dados dos candidatos estão seguros na plataforma?
                  </h3>
                  <p className="text-gray-300 leading-relaxed">
                    Absolutamente. Somos certificados ISO 27001 e totalmente
                    conformes com a LGPD. Utilizamos criptografia end-to-end,
                    backups automáticos e infraestrutura em nuvem de alta
                    segurança para proteger todos os dados.
                  </p>
                </div>
                <div className="ml-4">
                  <div className="w-8 h-8 bg-gradient-to-r from-red-500 to-pink-500 rounded-lg flex items-center justify-center">
                    <svg
                      className="w-4 h-4 text-white"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </div>
                </div>
              </div>
            </div>

            {/* FAQ Item 5 */}
            <div className="bg-gray-900/30 backdrop-blur-sm border border-gray-700 rounded-2xl p-6 hover:border-cyan-500/50 transition-all duration-300">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-white mb-3">
                    Qual o suporte oferecido durante a implementação?
                  </h3>
                  <p className="text-gray-300 leading-relaxed">
                    Oferecemos suporte completo durante todo o processo:
                    onboarding personalizado, treinamento da equipe, migração de
                    dados, configuração de integrações e suporte técnico 24/7
                    nos primeiros 30 dias.
                  </p>
                </div>
                <div className="ml-4">
                  <div className="w-8 h-8 bg-gradient-to-r from-orange-500 to-red-500 rounded-lg flex items-center justify-center">
                    <svg
                      className="w-4 h-4 text-white"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </div>
                </div>
              </div>
            </div>

            {/* FAQ Item 6 */}
            <div className="bg-gray-900/30 backdrop-blur-sm border border-gray-700 rounded-2xl p-6 hover:border-cyan-500/50 transition-all duration-300">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-white mb-3">
                    Posso cancelar minha assinatura a qualquer momento?
                  </h3>
                  <p className="text-gray-300 leading-relaxed">
                    Sim, não há fidelidade. Você pode cancelar sua assinatura a
                    qualquer momento através do painel administrativo ou
                    entrando em contato com nosso suporte. Seus dados ficam
                    disponíveis por 90 dias após o cancelamento.
                  </p>
                </div>
                <div className="ml-4">
                  <div className="w-8 h-8 bg-gradient-to-r from-indigo-500 to-blue-600 rounded-lg flex items-center justify-center">
                    <svg
                      className="w-4 h-4 text-white"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="text-center mt-12">
            <p className="text-gray-400 mb-6">Não encontrou sua resposta?</p>
            <button className="bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white font-semibold px-8 py-4 rounded-xl transition-all duration-300 hover:scale-105">
              Fale com Nosso Suporte
            </button>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative z-10 px-6 py-20">
        <div className="max-w-4xl mx-auto text-center">
          <div className="bg-gradient-to-r from-blue-900/30 to-purple-900/30 backdrop-blur-sm border border-blue-500/20 rounded-3xl p-12">
            <h2 className="text-4xl lg:text-5xl font-bold mb-6">
              <span className="bg-gradient-to-r from-white to-blue-100 bg-clip-text text-transparent">
                Pronto para a Revolução?
              </span>
            </h2>
            <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
              Junte-se às empresas que já transformaram seu recrutamento com IA
              de última geração
            </p>
            <Link href="/pricing" className="bg-gradient-to-r from-blue-600 to-purple-600 px-12 py-4 rounded-full text-xl font-bold hover:from-blue-700 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 hover:shadow-2xl hover:shadow-blue-500/25 inline-block">
              Começar Transformação
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 px-6 py-12 border-t border-gray-800">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center">
                  <Brain className="w-5 h-5 text-white" />
                </div>
                <span className="text-xl font-bold text-white">Triaxia</span>
              </div>
              <p className="text-gray-400">O futuro do recrutamento é agora.</p>
            </div>

            <div>
              <h4 className="font-bold mb-4 text-white">Produto</h4>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Recursos
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Preços
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    API
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold mb-4 text-white">Empresa</h4>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Sobre
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Blog
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Carreiras
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold mb-4 text-white">Suporte</h4>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Ajuda
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Contato
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Status
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
            <p>&copy; 2024 TriaxIA. Todos os direitos reservados.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
