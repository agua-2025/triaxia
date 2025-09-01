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
} from 'lucide-react';

export default function Home() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 font-sans antialiased overflow-x-hidden">
      {/* Animated Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl animate-pulse"></div>
        <div
          className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-indigo-500/5 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: '2s' }}
        ></div>
        <div
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-blue-600/5 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: '4s' }}
        ></div>
      </div>

      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-200/50">
        <nav className="flex items-center justify-between max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg">
              <Brain className="w-6 h-6 text-white" />
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-700 bg-clip-text text-transparent">
              Triaxia
            </span>
          </div>
          <div className="hidden md:flex items-center space-x-8">
            <a
              href="#recursos"
              className="text-slate-600 hover:text-blue-600 transition-colors font-medium"
            >
              Recursos
            </a>
            <a
              href="#precos"
              className="text-slate-600 hover:text-blue-600 transition-colors font-medium"
            >
              Preços
            </a>
            <a
              href="#sobre"
              className="text-slate-600 hover:text-blue-600 transition-colors font-medium"
            >
              Sobre
            </a>
            <button className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white px-6 py-2.5 rounded-full hover:shadow-lg transition-all duration-300 transform hover:scale-105 font-medium">
              Começar Grátis
            </button>
          </div>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="relative px-6 py-20 min-h-[90vh] flex items-center">
        <div className="max-w-6xl mx-auto text-center relative z-10">
          {/* Badge */}
          <div className="inline-flex items-center px-4 py-2 bg-white/80 backdrop-blur-sm rounded-full border border-blue-200/50 mb-8 shadow-sm">
            <div className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse"></div>
            <span className="text-sm font-medium text-slate-700">
              Powered by Advanced AI
            </span>
          </div>

          {/* Headline */}
          <h1 className="text-6xl md:text-8xl font-bold mb-8 leading-tight">
            <span className="text-slate-900">O Futuro do</span>
            <span className="block bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-700 bg-clip-text text-transparent">
              Recrutamento
            </span>
            <span className="block text-2xl md:text-3xl font-normal text-slate-600 mt-4">
              IA que transforma currículos em contratações perfeitas
            </span>
          </h1>

          {/* Social Proof */}
          <div className="inline-flex items-center bg-gradient-to-r from-green-500 to-emerald-600 text-white px-6 py-3 rounded-full mb-8 shadow-lg">
            <Zap className="w-5 h-5 mr-2" />
            +2.847 empresas já revolucionaram seu RH
          </div>

          {/* Description */}
          <p className="text-xl text-slate-600 mb-10 max-w-3xl mx-auto leading-relaxed">
            <strong className="text-slate-800">
              Automatize seu processo de recrutamento.
            </strong>
            Processe milhares de currículos, execute análises comportamentais e
            encontre matches perfeitos em segundos.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <button className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white px-8 py-4 rounded-full text-lg font-semibold shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105">
              Começar Teste Grátis
            </button>
            <button className="border-2 border-slate-300 px-8 py-4 rounded-full text-lg font-medium text-slate-700 hover:border-blue-600 hover:text-blue-600 transition-all duration-300">
              Ver Demonstração
            </button>
          </div>

          {/* Features Badge */}
          <div className="flex flex-wrap items-center justify-center gap-6 mt-12 text-sm text-slate-500">
            <div className="flex items-center">
              <CheckCircle className="w-4 h-4 mr-2 text-green-500" />
              14 dias grátis
            </div>
            <div className="flex items-center">
              <CheckCircle className="w-4 h-4 mr-2 text-green-500" />
              Sem cartão
            </div>
            <div className="flex items-center">
              <CheckCircle className="w-4 h-4 mr-2 text-green-500" />
              Suporte 24/7
            </div>
          </div>
        </div>
      </section>

      {/* Trust Section */}
      <section className="py-16 bg-white border-y border-slate-100">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <p className="text-slate-500 text-sm font-medium mb-8 uppercase tracking-wider">
            Empresas que confiam no Triaxia
          </p>
          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-12">
            {[
              'SuperFresh',
              'Atacadão Regional',
              'Grupo Alimentar',
              'TechCorp Brasil',
              'Rede Moderna',
            ].map(company => (
              <div
                key={company}
                className="text-2xl font-bold text-slate-400 hover:text-blue-600 transition-colors duration-300"
              >
                {company}
              </div>
            ))}
          </div>
          <div className="mt-8 flex justify-center items-center space-x-8 text-slate-400 text-sm">
            <div className="flex items-center">
              <div className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse"></div>
              +847 empresas ativas
            </div>
            <div className="flex items-center">
              <div className="w-2 h-2 bg-blue-500 rounded-full mr-2 animate-pulse"></div>
              +10.000 contratações
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="recursos" className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-5xl md:text-6xl font-bold mb-6 text-slate-900">
              Recursos
              <span className="block bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-700 bg-clip-text text-transparent">
                Revolucionários
              </span>
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Tecnologia de ponta para transformar seu processo de recrutamento
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Feature Cards */}
            {[
              {
                icon: Brain,
                title: 'Análise de IA Avançada',
                description:
                  'Machine learning analisa perfis comportamentais, competências técnicas e fit cultural automaticamente.',
                metrics: ['94% redução no tempo', 'R$ 15k economia mensal'],
                gradient: 'from-blue-500 to-indigo-600',
              },
              {
                icon: Target,
                title: 'Match Inteligente',
                description:
                  'Conecta automaticamente candidatos às vagas mais adequadas com 97% de precisão.',
                metrics: ['97% precisão no matching', '85% menos tempo'],
                gradient: 'from-indigo-500 to-purple-600',
              },
              {
                icon: Zap,
                title: 'Processamento Instantâneo',
                description:
                  'Processe milhares de currículos em segundos. Análise em tempo real.',
                metrics: ['10k currículos em 30s', '300% mais produtividade'],
                gradient: 'from-purple-500 to-pink-600',
              },
              {
                icon: BarChart3,
                title: 'Analytics Preditivos',
                description:
                  'Insights sobre tendências de mercado e otimização de processos.',
                metrics: [],
                gradient: 'from-green-500 to-emerald-600',
              },
              {
                icon: Users,
                title: 'Banco de Talentos',
                description:
                  'Sistema que aprende e identifica candidatos para futuras oportunidades.',
                metrics: [],
                gradient: 'from-emerald-500 to-teal-600',
              },
              {
                icon: Shield,
                title: 'Segurança Enterprise',
                description: 'Proteção avançada com compliance total LGPD.',
                metrics: [],
                gradient: 'from-red-500 to-orange-600',
              },
            ].map((feature, index) => (
              <div
                key={index}
                className="group bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-500 hover:-translate-y-2 border border-slate-200"
              >
                <div
                  className={`w-16 h-16 bg-gradient-to-r ${feature.gradient} rounded-2xl flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300`}
                >
                  <feature.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold mb-4 text-slate-800">
                  {feature.title}
                </h3>
                <p className="text-slate-600 leading-relaxed mb-4">
                  {feature.description}
                </p>
                {feature.metrics.length > 0 && (
                  <div className="space-y-2">
                    {feature.metrics.map((metric, idx) => (
                      <div
                        key={idx}
                        className="text-sm font-semibold text-blue-600"
                      >
                        {metric}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Case Study Section */}
      <section className="py-20 bg-gradient-to-br from-slate-900 to-slate-800 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage:
                'radial-gradient(circle at 25px 25px, #ffffff 2px, transparent 0), radial-gradient(circle at 75px 75px, #ffffff 2px, transparent 0)',
              backgroundSize: '100px 100px',
              backgroundPosition: '0 0, 50px 50px',
            }}
          ></div>
        </div>

        <div className="max-w-6xl mx-auto px-6 relative z-10">
          <div className="text-center mb-16">
            <div className="inline-flex items-center bg-green-500/20 text-green-300 px-6 py-3 rounded-full text-sm font-semibold mb-8">
              Case de Sucesso Real
            </div>
            <h2 className="text-5xl md:text-7xl font-bold mb-6 text-white">
              15 contratações
              <span className="block bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent">
                em 1 semana
              </span>
            </h2>
            <p className="text-xl text-slate-300 max-w-3xl mx-auto">
              Como a SuperFresh revolucionou seu processo de recrutamento
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
            {/* Antes */}
            <div className="bg-red-500/10 border border-red-500/20 rounded-3xl p-8 backdrop-blur-sm">
              <div className="flex items-center mb-6">
                <div className="bg-red-500 text-white rounded-full p-3 mr-4">
                  <span className="text-2xl">✗</span>
                </div>
                <h3 className="text-2xl font-bold text-white">
                  Processo Manual
                </h3>
              </div>
              <div className="space-y-4 text-red-200">
                <div>245 currículos para analisar</div>
                <div>12 dias de trabalho intensivo</div>
                <div>3 funcionários dedicados</div>
                <div className="font-bold">R$ 8.400 em custos</div>
              </div>
            </div>

            {/* Depois */}
            <div className="bg-green-500/10 border border-green-500/20 rounded-3xl p-8 backdrop-blur-sm">
              <div className="flex items-center mb-6">
                <div className="bg-green-500 text-white rounded-full p-3 mr-4">
                  <CheckCircle className="w-6 h-6" />
                </div>
                <h3 className="text-2xl font-bold text-white">Com Triaxia</h3>
              </div>
              <div className="space-y-4 text-green-200">
                <div>245 currículos em 3 minutos</div>
                <div>Top 15 identificados automaticamente</div>
                <div>RH focou em entrevistas finais</div>
                <div className="font-bold">R$ 497 custo total</div>
              </div>
            </div>
          </div>

          {/* Resultados */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 text-center border border-white/20">
              <div className="text-5xl font-bold text-green-400 mb-2">94%</div>
              <div className="text-white text-lg">Redução de Tempo</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 text-center border border-white/20">
              <div className="text-5xl font-bold text-blue-400 mb-2">
                R$ 7.9k
              </div>
              <div className="text-white text-lg">Economia Mensal</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 text-center border border-white/20">
              <div className="text-5xl font-bold text-purple-400 mb-2">15</div>
              <div className="text-white text-lg">Contratações em 1 Semana</div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="precos" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-5xl md:text-6xl font-bold mb-6 text-slate-900">
              Planos que
              <span className="block bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-700 bg-clip-text text-transparent">
                Aceleram Resultados
              </span>
            </h2>

            {/* Oferta Especial */}
            <div className="bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-2xl p-6 mb-12 shadow-xl max-w-4xl mx-auto">
              <h3 className="text-2xl md:text-3xl font-bold mb-2">
                Oferta Especial: Primeiros 100 clientes ganham 3 meses grátis
              </h3>
              <div className="flex items-center justify-center space-x-4 text-lg font-semibold">
                <span>Restam apenas</span>
                <div className="bg-white/20 px-4 py-2 rounded-lg">
                  <span className="text-2xl font-bold">23 vagas</span>
                </div>
                <span>disponíveis</span>
              </div>
            </div>

            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Escolha o plano ideal para revolucionar seu recrutamento
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {/* Plans */}
            {[
              {
                name: 'Starter',
                price: 'R$ 299',
                features: [
                  'Até 50 candidatos',
                  '5 vagas ativas',
                  'Análise básica de IA',
                  'Suporte por email',
                ],
                popular: false,
                gradient: 'from-blue-500 to-indigo-600',
              },
              {
                name: 'Professional',
                price: 'R$ 699',
                features: [
                  'Até 500 candidatos',
                  '20 vagas ativas',
                  'IA avançada com matching',
                  'Analytics completos',
                  'Suporte prioritário 24/7',
                ],
                popular: true,
                gradient: 'from-blue-600 to-indigo-700',
              },
              {
                name: 'Enterprise',
                price: 'Customizado',
                features: [
                  'Candidatos ilimitados',
                  'IA personalizada',
                  'Suporte dedicado',
                  'White-label disponível',
                ],
                popular: false,
                gradient: 'from-slate-600 to-slate-800',
              },
            ].map((plan, index) => (
              <div
                key={index}
                className={`bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-500 hover:-translate-y-2 border ${plan.popular ? 'border-2 border-blue-500 relative' : 'border-slate-200'}`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <span className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white px-6 py-2 rounded-full text-sm font-bold shadow-lg">
                      Mais Popular
                    </span>
                  </div>
                )}

                <div className="text-center mb-8">
                  <div
                    className={`w-16 h-16 bg-gradient-to-r ${plan.gradient} rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg`}
                  >
                    <Brain className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-slate-800 mb-2">
                    {plan.name}
                  </h3>
                  <div className="text-4xl font-bold text-slate-900 mb-2">
                    {plan.price}
                  </div>
                  {plan.price !== 'Customizado' && (
                    <div className="text-slate-500">/mês</div>
                  )}
                </div>

                <ul className="space-y-4 mb-8">
                  {plan.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center text-slate-600">
                      <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                      {feature}
                    </li>
                  ))}
                </ul>

                <button
                  className={`w-full ${plan.popular ? 'bg-gradient-to-r from-blue-600 to-indigo-700' : 'bg-slate-800'} text-white py-3 rounded-full font-semibold hover:shadow-lg transition-all duration-300 hover:scale-105`}
                >
                  {plan.name === 'Enterprise'
                    ? 'Falar com Vendas'
                    : 'Começar Teste Grátis'}
                </button>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <p className="text-slate-500 mb-4">
              Teste grátis de 14 dias em todos os planos
            </p>
            <div className="flex flex-wrap justify-center gap-8 text-sm text-slate-400">
              <span>Migração gratuita</span>
              <span>Suporte especializado</span>
              <span>Dados seguros</span>
              <span>Cancelamento flexível</span>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="sobre" className="py-20 bg-slate-50">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-5xl md:text-6xl font-bold mb-8 text-slate-900">
            Sobre o
            <span className="block bg-gradient-to-r from-blue-600 to-indigo-700 bg-clip-text text-transparent">
              Triaxia
            </span>
          </h2>
          <p className="text-xl text-slate-600 leading-relaxed mb-12 max-w-3xl mx-auto">
            Somos pioneiros em inteligência artificial aplicada ao recrutamento.
            Nossa missão é revolucionar como empresas encontram e conectam
            talentos, eliminando barreiras através da tecnologia.
          </p>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-500 hover:-translate-y-2">
              <div className="text-4xl font-bold text-blue-600 mb-2">97%</div>
              <div className="text-slate-600 font-medium">
                Precisão no matching
              </div>
            </div>
            <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-500 hover:-translate-y-2">
              <div className="text-4xl font-bold text-blue-600 mb-2">10x</div>
              <div className="text-slate-600 font-medium">
                Mais rápido que métodos tradicionais
              </div>
            </div>
            <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-500 hover:-translate-y-2">
              <div className="text-4xl font-bold text-blue-600 mb-2">2.8k+</div>
              <div className="text-slate-600 font-medium">
                Empresas confiam em nós
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 bg-white border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-3 mb-4 md:mb-0">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg">
                <Brain className="w-6 h-6 text-white" />
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-700 bg-clip-text text-transparent">
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
