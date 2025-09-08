'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Image from 'next/image';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  MapPin,
  DollarSign,
  Building2,
  Users,
  Calendar,
  Globe,
  Mail,
  Phone,
  ChevronRight,
  Briefcase,
  Clock,
  ArrowLeft,
  Star,
  Award,
  Target,
  Heart,
  Zap,
  TrendingUp,
  Shield,
  Coffee,
} from 'lucide-react';

interface Job {
  id: string;
  title: string;
  department: string;
  location: string;
  type: string;
  salary: string;
  description: string;
  requirements: string[]; // Garantir que seja array
  benefits: string[]; // Garantir que seja array
  postedAt: string; // Usar postedAt em vez de createdAt
  createdAt?: string; // Opcional para compatibilidade
}

interface CompanyData {
  name: string;
  description: string;
  website: string;
  email: string;
  phone: string;
  address: string;
  logo: string;
  primaryColor: string;
  secondaryColor: string;
  accentColor: string;
}

// Componente de partículas animadas
const AnimatedParticles = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {[...Array(20)].map((_, i) => (
        <div
          key={i}
          className="absolute w-2 h-2 bg-white/20 rounded-full animate-pulse"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 3}s`,
            animationDuration: `${2 + Math.random() * 3}s`,
          }}
        />
      ))}
    </div>
  );
};

// Componente de estatísticas
const StatsSection = ({ company }: { company: CompanyData }) => {
  const stats = [
    { icon: Users, label: 'Colaboradores', value: '500+' },
    { icon: Award, label: 'Anos de Mercado', value: '15+' },
    { icon: Target, label: 'Projetos Entregues', value: '1000+' },
    { icon: TrendingUp, label: 'Crescimento Anual', value: '25%' },
  ];

  return (
    <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 mt-12">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div key={index} className="text-center group">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-white/20 rounded-full mb-3 group-hover:scale-110 transition-transform duration-300">
                <Icon className="w-6 h-6 text-white" />
              </div>
              <div className="text-2xl font-bold text-white mb-1">
                {stat.value}
              </div>
              <div className="text-white/80 text-sm">{stat.label}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

// Componente de valores da empresa
const ValuesSection = () => {
  const values = [
    {
      icon: Heart,
      title: 'Paixão pelo que fazemos',
      description:
        'Acreditamos que o trabalho deve ser uma fonte de realização pessoal e profissional.',
    },
    {
      icon: Zap,
      title: 'Inovação constante',
      description:
        'Estamos sempre buscando novas formas de melhorar e evoluir nossos processos.',
    },
    {
      icon: Shield,
      title: 'Ambiente seguro',
      description:
        'Proporcionamos um ambiente de trabalho seguro, inclusivo e respeitoso para todos.',
    },
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-slate-800 mb-4">
            Nossos Valores
          </h2>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">
            O que nos move e define nossa cultura organizacional
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {values.map((value, index) => {
            const Icon = value.icon;
            return (
              <div
                key={index}
                className="group bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2"
              >
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl mb-6 group-hover:scale-110 transition-transform duration-300">
                  <Icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-slate-800 mb-4">
                  {value.title}
                </h3>
                <p className="text-slate-600 leading-relaxed">
                  {value.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

// Componente de depoimentos
const TestimonialsSection = () => {
  const testimonials = [
    {
      name: 'Maria Silva',
      role: 'Desenvolvedora Senior',
      content:
        'Trabalhar aqui transformou minha carreira. O ambiente é incrível e as oportunidades de crescimento são reais.',
      avatar: '👩‍💻',
    },
    {
      name: 'João Santos',
      role: 'Product Manager',
      content:
        'Uma empresa que realmente se preocupa com o bem-estar dos funcionários e investe no desenvolvimento profissional.',
      avatar: '👨‍💼',
    },
    {
      name: 'Ana Costa',
      role: 'Designer UX',
      content:
        'Aqui posco ser criativa e inovadora. A equipe é colaborativa e os projetos são desafiadores e gratificantes.',
      avatar: '👩‍🎨',
    },
  ];

  return (
    <section className="py-20 bg-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-white mb-4">
            O que nosso time diz
          </h2>
          <p className="text-xl text-slate-300 max-w-2xl mx-auto">
            Depoimentos reais de quem faz parte da nossa família
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="bg-slate-700 rounded-2xl p-8 hover:bg-slate-600 transition-all duration-300 hover:scale-105"
            >
              <div className="flex items-center mb-6">
                <div className="text-4xl mr-4">{testimonial.avatar}</div>
                <div>
                  <h4 className="text-white font-semibold">
                    {testimonial.name}
                  </h4>
                  <p className="text-slate-300 text-sm">{testimonial.role}</p>
                </div>
              </div>
              <p className="text-slate-200 leading-relaxed italic">
                "{testimonial.content}"
              </p>
              <div className="flex mt-4">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className="w-4 h-4 text-yellow-400 fill-current"
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default function TenantPublicPage() {
  const params = useParams();
  const tenantSlug = params?.tenant as string;
  const [company, setCompany] = useState<CompanyData | null>(null);
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Dados de exemplo para demonstração
  const exampleJobs: Job[] = [
    {
      id: '1',
      title: 'Desenvolvedor Full Stack',
      department: 'Tecnologia',
      location: 'São Paulo, SP',
      type: 'CLT',
      salary: '8.000 - 12.000',
      description:
        'Buscamos um desenvolvedor experiente para trabalhar com React, Node.js e bancos de dados. Oportunidade de crescimento em empresa inovadora.',
      requirements: ['React', 'Node.js', 'TypeScript', 'PostgreSQL'],
      benefits: ['Vale refeição', 'Plano de saúde', 'Home office'],
      postedAt: '2024-01-15',
    },
    {
      id: '2',
      title: 'Designer UX/UI',
      department: 'Design',
      location: 'Remote',
      type: 'PJ',
      salary: '6.000 - 9.000',
      description:
        'Procuramos designer criativo para criar experiências incríveis. Trabalhe com as melhores ferramentas e metodologias ágeis.',
      requirements: [
        'Figma',
        'Adobe Creative',
        'Design System',
        'Prototipagem',
      ],
      benefits: ['Flexibilidade', 'Equipamentos', 'Cursos'],
      postedAt: '2024-01-10',
    },
    {
      id: '3',
      title: 'Analista de Marketing',
      department: 'Marketing',
      location: 'Rio de Janeiro, RJ',
      type: 'CLT',
      salary: '5.000 - 7.000',
      description:
        'Oportunidade para profissional de marketing digital com experiência em campanhas e análise de dados.',
      requirements: ['Google Ads', 'Analytics', 'SEO', 'Social Media'],
      benefits: ['Vale transporte', 'Gympass', 'Desenvolvimento'],
      postedAt: '2024-01-08',
    },
  ];

  useEffect(() => {
    async function fetchTenantData() {
      try {
        setLoading(true);
        const response = await fetch(`/api/tenant/${tenantSlug}/public`);

        if (!response.ok) {
          throw new Error('Tenant não encontrado');
        }

        const data = await response.json();
        setCompany(data.tenant);

        // Se não há vagas reais, usar dados de exemplo
        const realJobs = data.tenant.jobs || [];
        setJobs(realJobs.length > 0 ? realJobs : exampleJobs);
      } catch (error) {
        console.error('Erro ao buscar dados do tenant:', error);
        setError('Erro ao carregar dados do tenant');
        // Em caso de erro, ainda mostrar dados de exemplo
        setJobs(exampleJobs);
      } finally {
        setLoading(false);
      }
    }

    if (tenantSlug) {
      fetchTenantData();
    }
  }, [tenantSlug]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-600 via-purple-600 to-blue-800 flex items-center justify-center">
        <div className="text-center">
          <div className="relative">
            <div className="animate-spin rounded-full h-16 w-16 border-4 border-white/30 border-t-white mx-auto mb-6"></div>
            <div className="absolute inset-0 rounded-full h-16 w-16 border-4 border-transparent border-t-blue-300 animate-ping mx-auto"></div>
          </div>
          <p className="text-white text-lg font-medium">
            Carregando experiência incrível...
          </p>
        </div>
      </div>
    );
  }

  if (error || !company) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center">
        <div className="text-center max-w-md mx-auto p-6">
          <div className="text-8xl mb-6 animate-bounce">🏢</div>
          <h1 className="text-3xl font-bold text-slate-800 mb-4">
            Ops! Página não encontrada
          </h1>
          <p className="text-slate-600 mb-6 leading-relaxed">
            {error || 'Esta página não está disponível no momento.'}
          </p>
          <Button
            onClick={() => window.location.reload()}
            className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-3 rounded-full font-medium transition-all duration-300 hover:scale-105"
          >
            Tentar novamente
          </Button>
        </div>
      </div>
    );
  }

  const primaryColor = company.primaryColor || '#3B82F6';
  const secondaryColor = company.secondaryColor || '#1E40AF';
  const accentColor = company.accentColor || '#10B981';

  return (
    <div className="min-h-screen overflow-x-hidden">
      {/* Hero Section Melhorado */}
      <header className="relative h-screen overflow-hidden">
        {/* Background com gradiente animado */}
        <div
          className="absolute inset-0 bg-gradient-to-br animate-gradient-x"
          style={{
            background: `linear-gradient(-45deg, ${primaryColor}, ${secondaryColor}, ${accentColor}, ${primaryColor})`,
          }}
        />

        {/* Overlay com padrão */}
        <div className="absolute inset-0 bg-black/20" />
        <div
          className="absolute inset-0 opacity-50"
          style={{
            backgroundImage: `url("data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PGNpcmNsZSBjeD0iMzAiIGN5PSIzMCIgcj0iMiIvPjwvZz48L2c+PC9zdmc+")`,
          }}
        />
        {/* Texto Principal - Posicionado no centro superior */}
        <div className="absolute inset-0 flex items-start justify-center pt-32 sm:pt-40 md:pt-48 z-30">
          <div className="max-w-4xl mx-auto text-center px-3 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-4xl md:text-5xl font-bold text-white mb-4 sm:mb-6">
            Pronto para fazer a diferença?
          </h2>
          <p className="text-base sm:text-xl text-white/90 mb-6 sm:mb-8 leading-relaxed px-2">
            Sua próxima grande oportunidade está aqui. Junte-se a nós e
            transforme sua carreira!
          </p>
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center px-2">
            <Button
              size="lg"
              className="bg-white text-slate-800 hover:bg-white/90 px-6 sm:px-8 py-3 sm:py-4 rounded-full font-semibold text-base sm:text-lg transition-all duration-300 hover:scale-105 hover:shadow-2xl"
              onClick={() =>
                window.open(
                  `mailto:${company.email}?subject=Interesse em oportunidades`,
                  '_blank'
                )
              }
            >
              <Mail className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
              Envie seu Currículo
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-white text-white hover:bg-white hover:text-slate-800 px-6 sm:px-8 py-3 sm:py-4 rounded-full font-semibold text-base sm:text-lg transition-all duration-300 hover:scale-105 backdrop-blur-sm bg-white/10"
              onClick={() => {
                const jobsSection = document.getElementById('jobs-section');
                jobsSection?.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              <Briefcase className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
              Ver Todas as Vagas
            </Button>
          </div>
        </div>
        </div>

        {/* Cards de Vagas Transparentes - Posicionados abaixo do texto */}
        <div className="absolute bottom-0 left-0 right-0 z-20 pb-8">
          <div className="max-w-5xl mx-auto px-3 sm:px-6 lg:px-8">
            {jobs.length > 0 && (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 max-w-4xl mx-auto">
                {jobs.slice(0, 3).map(job => (
                  <div
                    key={job.id}
                    className="bg-white/10 backdrop-blur-md rounded-xl sm:rounded-2xl shadow-2xl hover:shadow-3xl transition-all duration-500 p-4 sm:p-6 border border-white/20 hover:border-white/40 hover:bg-white/20 group"
                  >
                    {/* Header do Card */}
                    <div className="flex items-start justify-between mb-3 sm:mb-4">
                      <div className="flex-1 min-w-0">
                        <h3 className="font-bold text-base sm:text-lg text-white mb-1 sm:mb-2 line-clamp-2 group-hover:text-white/90">
                          {job.title}
                        </h3>
                        <p className="text-white/70 text-xs sm:text-sm mb-2 sm:mb-3">
                          {company?.name}
                        </p>
                      </div>
                      <div className="ml-2 sm:ml-3 flex-shrink-0">
                        <span className="inline-flex items-center px-2 sm:px-3 py-1 rounded-full text-xs font-medium bg-white/20 text-white backdrop-blur-sm">
                          {job.type}
                        </span>
                      </div>
                    </div>

                    {/* Informações da Vaga */}
                    <div className="space-y-2 sm:space-y-3 mb-3 sm:mb-4">
                      <div className="flex items-center text-xs sm:text-sm text-white/80">
                        <MapPin className="w-3 h-3 sm:w-4 sm:h-4 mr-2 text-white/60 flex-shrink-0" />
                        <span className="truncate">{job.location}</span>
                      </div>

                      <div className="flex items-center text-xs sm:text-sm text-white/80">
                        <DollarSign className="w-3 h-3 sm:w-4 sm:h-4 mr-2 text-white/60 flex-shrink-0" />
                        <span className="truncate">{job.salary ? `R$ ${job.salary}` : 'Salário a combinar'}</span>
                      </div>
                    </div>

                    {/* Descrição */}
                    <p className="text-white/70 text-xs sm:text-sm mb-4 sm:mb-6 line-clamp-2 leading-relaxed">
                      {job.description}
                    </p>

                    {/* Botão de Ação */}
                    <button className="w-full bg-white/20 hover:bg-white/30 text-white py-2.5 sm:py-3 px-3 sm:px-4 rounded-lg sm:rounded-xl transition-all duration-300 font-medium text-xs sm:text-sm backdrop-blur-sm border border-white/20 hover:border-white/40 hover:scale-105">
                      Ver Detalhes
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

      </header>

      {/* Seção Ver Todas as Vagas */}
      {jobs.length > 3 && (
        <section className="py-16 px-4 mt-16 bg-gradient-to-b from-gray-50 to-white">
          <div className="max-w-6xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Mais Oportunidades
            </h2>
            <p className="text-gray-600 mb-8">
              Explore todas as {jobs.length} vagas disponíveis
            </p>
            <button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-4 rounded-xl transition-all duration-300 font-medium hover:scale-105 shadow-lg">
              Ver Todas as {jobs.length} Vagas
            </button>
          </div>
        </section>
      )}

      {/* Seção de Valores */}
      <div className="mt-20">
        <ValuesSection />
      </div>



      {/* Footer Melhorado */}
      <footer className="bg-slate-900 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="lg:col-span-2">
              <h3 className="text-3xl font-bold mb-4 bg-gradient-to-r from-white to-slate-300 bg-clip-text text-transparent">
                {company.name}
              </h3>
              <p className="text-slate-300 mb-6 max-w-md leading-relaxed">
                {company.description}
              </p>
              <div className="flex gap-4">
                {company.website && (
                  <a
                    href={company.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 bg-slate-700 rounded-full flex items-center justify-center text-slate-300 hover:text-white hover:bg-slate-600 transition-all duration-300 hover:scale-110"
                  >
                    <Globe className="w-5 h-5" />
                  </a>
                )}
                {company.email && (
                  <a
                    href={`mailto:${company.email}`}
                    className="w-10 h-10 bg-slate-700 rounded-full flex items-center justify-center text-slate-300 hover:text-white hover:bg-slate-600 transition-all duration-300 hover:scale-110"
                  >
                    <Mail className="w-5 h-5" />
                  </a>
                )}
              </div>
            </div>

            <div>
              <h4 className="font-bold mb-6 text-lg">Contato</h4>
              <div className="space-y-4 text-slate-300">
                {company.email && (
                  <div className="flex items-center gap-3 hover:text-white transition-colors">
                    <Mail className="w-4 h-4" />
                    <a href={`mailto:${company.email}`}>{company.email}</a>
                  </div>
                )}
                {company.phone && (
                  <div className="flex items-center gap-3">
                    <Phone className="w-4 h-4" />
                    <span>{company.phone}</span>
                  </div>
                )}
                {company.address && (
                  <div className="flex items-center gap-3">
                    <MapPin className="w-4 h-4" />
                    <span>{company.address}</span>
                  </div>
                )}
              </div>
            </div>

            <div>
              <h4 className="font-bold mb-6 text-lg">Carreiras</h4>
              <div className="space-y-3 text-slate-300">
                <div className="flex items-center gap-2">
                  <Briefcase className="w-4 h-4" />
                  <span>
                    {jobs.length} vaga{jobs.length !== 1 ? 's' : ''} disponível
                    {jobs.length !== 1 ? 'eis' : ''}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Heart className="w-4 h-4" />
                  <span>Sempre em busca de talentos</span>
                </div>
                <div className="flex items-center gap-2">
                  <Star className="w-4 h-4" />
                  <span>Ambiente inovador</span>
                </div>
              </div>
            </div>
          </div>

          <div className="border-t border-slate-700 mt-12 pt-8">
            <div className="text-center text-slate-400">
              <p>
                &copy; {new Date().getFullYear()} {company.name}. Todos os
                direitos reservados.
              </p>
              <p className="mt-2 text-sm">
                Feito com ❤️ para conectar talentos extraordinários
              </p>
            </div>
          </div>
        </div>
      </footer>

      {/* Estilos CSS customizados */}
      <style jsx global>{`
        @keyframes gradient-x {
          0%,
          100% {
            background-size: 400% 400%;
            background-position: 0% 50%;
          }
          50% {
            background-size: 400% 400%;
            background-position: 100% 50%;
          }
        }

        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes shimmer {
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(100%);
          }
        }

        .animate-gradient-x {
          animation: gradient-x 15s ease infinite;
        }

        .animate-fade-in-up {
          animation: fade-in-up 0.8s ease-out forwards;
        }

        .animation-delay-200 {
          animation-delay: 0.2s;
        }

        .animation-delay-400 {
          animation-delay: 0.4s;
        }

        .animation-delay-600 {
          animation-delay: 0.6s;
        }

        .animation-delay-800 {
          animation-delay: 0.8s;
        }

        .animate-shimmer {
          animation: shimmer 2s infinite;
        }

        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        .line-clamp-3 {
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </div>
  );
}
