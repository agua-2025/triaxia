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
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold bg-gradient-to-r from-gray-900 via-blue-800 to-purple-800 bg-clip-text text-transparent mb-6">
            Escolha o plano ideal para sua empresa
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
          </div>
        </div>
      </div>
    </div>
  );
}
