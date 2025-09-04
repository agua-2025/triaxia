'use client';

import { useMemo, useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Check, Zap, Building2, Crown } from 'lucide-react';
import { PLANS, formatPrice, PlanKey } from '@/lib/stripe';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';

const planIcons: Record<PlanKey, any> = {
  starter: Zap,
  professional: Building2,
  enterprise: Crown,
};

const planColors: Record<PlanKey, string> = {
  starter: 'bg-gradient-to-r from-cyan-500 to-blue-500',
  professional: 'bg-gradient-to-r from-blue-500 to-purple-500',
  enterprise: 'bg-gradient-to-r from-purple-500 to-pink-500',
};

// sanitiza e normaliza o slug (minúsculo, alfanumérico e hífens)
function normalizeSlug(v: string) {
  return v
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9-]/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '');
}

function isValidEmail(email: string) {
  // validação simples e suficiente para UI
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export default function PricingPage() {
  const [loading, setLoading] = useState<PlanKey | null>(null);
  const [userEmail, setUserEmail] = useState('');
  const [tenantInput, setTenantInput] = useState('');
  const searchParams = useSearchParams();
  const canceled = searchParams?.get('canceled');

  const tenantSlug = useMemo(() => normalizeSlug(tenantInput), [tenantInput]);

  async function handleCheckout(plan: PlanKey) {
    if (!isValidEmail(userEmail)) {
      alert('Informe um e-mail válido.');
      return;
    }
    if (!tenantSlug) {
      alert('Por favor, preencha o nome da empresa.');
      return;
    }

    setLoading(plan);
    try {
      const res = await fetch('/api/stripe/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ plan, tenantSlug, userEmail }),
      });

      let data: any = null;
      try {
        data = await res.json();
      } catch {
        // se não vier JSON, cria um erro genérico
        data = { error: 'Resposta inválida do servidor' };
      }

      if (!res.ok || !data?.url) {
        throw new Error(data?.error || 'Falha ao criar sessão de checkout');
      }

      window.location.href = data.url;
    } catch (err) {
      console.error('Erro ao iniciar checkout:', err);
      alert('Erro ao processar pagamento. Tente novamente.');
    } finally {
      setLoading(null);
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      {/* Header */}
      <header className="border-b border-gray-200/50 backdrop-blur-sm bg-white/10">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <Link
              href="/"
              className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"
            >
              Triaxia
            </Link>
            <Link
              href="/"
              className="text-gray-600 hover:text-blue-600 transition-colors font-medium"
            >
              ← Voltar ao início
            </Link>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-16">
        {/* Hero Section */}
        <div className="text-center mb-20">
          <div className="mb-8">
            <span className="inline-block px-4 py-2 bg-blue-100 text-blue-800 rounded-full text-sm font-semibold mb-6">
              ✨ Teste grátis por 14 dias
            </span>
          </div>
          <h1 className="text-6xl font-bold bg-gradient-to-r from-gray-900 via-blue-800 to-purple-800 bg-clip-text text-transparent mb-8 leading-tight">
            Transforme seu RH com
            <br />
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Inteligência Artificial
            </span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Comece com 14 dias grátis. Cancele a qualquer momento. Sem
            compromisso.
          </p>

          {canceled && (
            <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 mb-8 max-w-md mx-auto">
              <p className="text-amber-700">
                Checkout cancelado. Você pode tentar novamente quando quiser.
              </p>
            </div>
          )}
        </div>

        {/* Formulário de dados */}
        <div className="max-w-md mx-auto mb-12">
          <Card className="bg-white/80 backdrop-blur-sm border-gray-200/50 shadow-xl">
            <CardHeader>
              <CardTitle className="text-gray-800 text-center">
                Dados para começar
              </CardTitle>
              <CardDescription className="text-gray-600 text-center">
                Precisamos de algumas informações para criar sua conta
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label
                  className="block text-sm font-medium text-gray-700 mb-2"
                  htmlFor="email"
                >
                  Seu e-mail
                </label>
                <input
                  id="email"
                  type="email"
                  value={userEmail}
                  onChange={e => setUserEmail(e.target.value)}
                  className="w-full px-4 py-3 bg-white border border-gray-300 rounded-xl text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  placeholder="seu@email.com"
                  required
                />
              </div>
              <div>
                <label
                  className="block text-sm font-medium text-gray-700 mb-2"
                  htmlFor="company"
                >
                  Nome da empresa
                </label>
                <input
                  id="company"
                  type="text"
                  value={tenantInput}
                  onChange={e => setTenantInput(e.target.value)}
                  className="w-full px-4 py-3 bg-white border border-gray-300 rounded-xl text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  placeholder="minha-empresa"
                  required
                />
                {tenantInput && (
                  <p className="text-sm text-gray-600 mt-1">
                    Sua URL será:{' '}
                    <span className="text-blue-600 font-medium">
                      {tenantSlug}.triaxia.com.br
                    </span>
                  </p>
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {Object.entries(PLANS).map(([planKey, plan]) => {
            const key = planKey as PlanKey;
            const Icon = planIcons[key];
            const isPopular = key === 'professional';

            return (
              <Card
                key={key}
                className={`relative bg-white/80 backdrop-blur-sm border-gray-200/50 shadow-xl hover:shadow-2xl transition-all duration-300 ${
                  isPopular
                    ? 'ring-2 ring-blue-500 scale-105'
                    : 'hover:scale-105'
                }`}
              >
                {isPopular && (
                  <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-blue-500 to-purple-500 text-white">
                    Mais Popular
                  </Badge>
                )}

                <CardHeader className="text-center">
                  <div
                    className={`w-12 h-12 ${planColors[key]} rounded-xl flex items-center justify-center mx-auto mb-4 shadow-lg`}
                  >
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <CardTitle className="text-2xl text-gray-800">
                    {plan.name}
                  </CardTitle>
                  <CardDescription className="text-gray-600">
                    {plan.description}
                  </CardDescription>
                  <div className="mt-4">
                    <span className="text-4xl font-bold bg-gradient-to-r from-gray-800 to-blue-600 bg-clip-text text-transparent">
                      {formatPrice(plan.price)}
                    </span>
                    <span className="text-gray-500">/mês</span>
                  </div>
                </CardHeader>

                <CardContent>
                  <ul className="space-y-3">
                    {plan.features.map((feature, index) => (
                      <li
                        key={index}
                        className="flex items-center text-gray-700"
                      >
                        <Check className="w-5 h-5 text-emerald-500 mr-3 flex-shrink-0" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </CardContent>

                <CardFooter>
                  <Button
                    onClick={() => handleCheckout(key)}
                    disabled={
                      loading !== null ||
                      !isValidEmail(userEmail) ||
                      !tenantSlug
                    }
                    aria-disabled={
                      loading !== null ||
                      !isValidEmail(userEmail) ||
                      !tenantSlug
                    }
                    aria-busy={loading === key}
                    className={`w-full ${
                      isPopular
                        ? 'bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700'
                        : 'bg-gradient-to-r from-gray-600 to-gray-700 hover:from-gray-700 hover:to-gray-800'
                    } text-white font-semibold py-3 rounded-xl transition-all duration-300`}
                  >
                    {loading === key
                      ? 'Processando...'
                      : 'Começar Teste Grátis'}
                  </Button>
                </CardFooter>
              </Card>
            );
          })}
        </div>

        {/* Value Proposition Section */}
        <div className="mt-20 mb-16">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-800 mb-6">Por que escolher a Triaxia?</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Mais de 10.000 empresas já transformaram seus processos de recrutamento
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto mb-16">
            <div className="text-center p-8 bg-white/60 backdrop-blur-sm rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300">
              <div className="bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-2xl p-4 w-16 h-16 mx-auto mb-6 flex items-center justify-center">
                <Zap className="w-8 h-8" />
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-4">IA Avançada</h3>
              <p className="text-gray-600 leading-relaxed">
                Nossa inteligência artificial analisa currículos, perfis comportamentais e compatibilidade cultural em segundos.
              </p>
            </div>
            
            <div className="text-center p-8 bg-white/60 backdrop-blur-sm rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300">
              <div className="bg-gradient-to-r from-emerald-500 to-teal-500 text-white rounded-2xl p-4 w-16 h-16 mx-auto mb-6 flex items-center justify-center">
                <Building2 className="w-8 h-8" />
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-4">Economia de Tempo</h3>
              <p className="text-gray-600 leading-relaxed">
                Reduza em 80% o tempo gasto na triagem de candidatos. Foque apenas nos melhores perfis.
              </p>
            </div>
            
            <div className="text-center p-8 bg-white/60 backdrop-blur-sm rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300">
              <div className="bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-2xl p-4 w-16 h-16 mx-auto mb-6 flex items-center justify-center">
                <Crown className="w-8 h-8" />
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-4">Resultados Garantidos</h3>
              <p className="text-gray-600 leading-relaxed">
                95% de taxa de aprovação nas contratações. Encontre o candidato ideal na primeira tentativa.
              </p>
            </div>
          </div>
        </div>

        {/* Social Proof Section */}
        <div className="mt-20 mb-16">
          <div className="bg-gradient-to-r from-gray-50 to-blue-50 rounded-3xl p-12 max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-gray-800 mb-6">Empresas que confiam na Triaxia</h2>
              <p className="text-xl text-gray-600">
                Junte-se a milhares de empresas que já revolucionaram seus processos de RH
              </p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8 mb-12">
              <div className="text-center">
                <div className="text-4xl font-bold text-blue-600 mb-2">95%</div>
                <p className="text-gray-700 font-semibold mb-2">Taxa de Sucesso</p>
                <p className="text-gray-600 text-sm">nas contratações realizadas</p>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-emerald-600 mb-2">80%</div>
                <p className="text-gray-700 font-semibold mb-2">Redução de Tempo</p>
                <p className="text-gray-600 text-sm">no processo de triagem</p>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-purple-600 mb-2">10k+</div>
                <p className="text-gray-700 font-semibold mb-2">Empresas Ativas</p>
                <p className="text-gray-600 text-sm">usando nossa plataforma</p>
              </div>
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mt-20 max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold bg-gradient-to-r from-gray-800 to-blue-600 bg-clip-text text-transparent text-center mb-12">
            Perguntas Frequentes
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300">
              <h3 className="text-lg font-semibold text-gray-800 mb-3">
                Como funciona o teste grátis?
              </h3>
              <p className="text-gray-600">
                Você tem 14 dias para testar todas as funcionalidades sem pagar
                nada. Após o período, será cobrado automaticamente conforme o
                plano escolhido.
              </p>
            </div>
            <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300">
              <h3 className="text-lg font-semibold text-gray-800 mb-3">
                Posso cancelar a qualquer momento?
              </h3>
              <p className="text-gray-600">
                Sim! Você pode cancelar sua assinatura a qualquer momento sem
                multas ou taxas adicionais.
              </p>
            </div>
            <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300">
              <h3 className="text-lg font-semibold text-gray-800 mb-3">
                Posso mudar de plano depois?
              </h3>
              <p className="text-gray-600">
                Claro! Você pode fazer upgrade ou downgrade do seu plano a
                qualquer momento.
              </p>
            </div>
            <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300">
              <h3 className="text-lg font-semibold text-gray-800 mb-3">
                Quais formas de pagamento aceitas?
              </h3>
              <p className="text-gray-600">
                Aceitamos cartões de crédito, débito e PIX através do Stripe,
                com total segurança.
              </p>
            </div>
            
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100">
              <h3 className="text-xl font-bold text-gray-800 mb-4">Posso cancelar quando quiser?</h3>
              <p className="text-gray-600 leading-relaxed">
                Claro! Sem fidelidade ou multas. Cancele a qualquer momento e mantenha 
                acesso até o final do período pago.
              </p>
            </div>
            
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100">
              <h3 className="text-xl font-bold text-gray-800 mb-4">Como funciona a integração?</h3>
              <p className="text-gray-600 leading-relaxed">
                Integração rápida em menos de 30 minutos. Conectamos com LinkedIn, Indeed, 
                seu ATS atual e principais plataformas de RH do mercado.
              </p>
            </div>
          </div>
        </div>

        {/* Final CTA Section */}
        <div className="mt-24 mb-16">
          <div className="bg-gradient-to-r from-blue-600 to-purple-700 rounded-3xl p-12 text-center text-white max-w-4xl mx-auto">
            <h2 className="text-4xl font-bold mb-6">
              Pronto para revolucionar seu RH?
            </h2>
            <p className="text-xl mb-8 text-blue-100">
              Junte-se a milhares de empresas que já transformaram seus processos de contratação
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <div className="bg-white/20 backdrop-blur-sm rounded-xl px-6 py-3 text-white">
                <span className="text-sm font-medium">✓ 14 dias grátis</span>
              </div>
              <div className="bg-white/20 backdrop-blur-sm rounded-xl px-6 py-3 text-white">
                <span className="text-sm font-medium">✓ Sem cartão de crédito</span>
              </div>
              <div className="bg-white/20 backdrop-blur-sm rounded-xl px-6 py-3 text-white">
                <span className="text-sm font-medium">✓ Suporte especializado</span>
              </div>
            </div>
            <div className="mt-8">
              <Button 
                 size="lg" 
                 className="bg-white text-blue-600 hover:bg-gray-100 font-semibold px-8 py-4 text-lg rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
                 onClick={() => {
                   const starterPlan = PLANS.find(plan => plan.name === 'Starter');
                   if (starterPlan) {
                     handleCheckout(starterPlan);
                   }
                 }}
                 disabled={loading !== null || !userEmail || !tenantSlug}
               >
                 {loading ? 'Processando...' : 'Começar teste grátis agora'}
               </Button>
            </div>
            <p className="text-sm text-blue-200 mt-4">
              Cancele a qualquer momento • Sem compromisso
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
