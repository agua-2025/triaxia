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
import { Check, Zap, Building2, Crown, Brain } from 'lucide-react';
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
            <Link href="/" className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center">
                <Brain className="w-6 h-6 text-white" />
              </div>
              <span className="text-2xl font-bold text-gray-900">Triaxia</span>
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

      <div className="container mx-auto px-4 py-12">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <span className="inline-block px-4 py-2 bg-blue-100 text-blue-800 rounded-full text-sm font-semibold mb-4">
            ✨ Teste grátis por 14 dias
          </span>
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-gray-900 via-blue-800 to-purple-800 bg-clip-text text-transparent mb-4 leading-tight">
            Escolha seu plano
          </h1>
          <p className="text-lg text-gray-600 mb-6 max-w-2xl mx-auto">
            Comece com 14 dias grátis. Cancele a qualquer momento.
          </p>

          {canceled && (
            <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 mb-6 max-w-md mx-auto">
              <p className="text-amber-700">
                Checkout cancelado. Você pode tentar novamente quando quiser.
              </p>
            </div>
          )}
        </div>

        {/* Formulário de dados */}
        <div className="max-w-lg mx-auto mb-10">
          <Card className="bg-white/90 backdrop-blur-sm border-gray-200/50 shadow-lg">
            <CardHeader className="pb-4">
              <CardTitle className="text-lg text-gray-800 text-center">
                Dados para começar
              </CardTitle>
              <CardDescription className="text-gray-600 text-center text-sm">
                Precisamos de algumas informações para criar sua conta
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label
                  className="block text-sm font-medium text-gray-700 mb-1"
                  htmlFor="email"
                >
                  Seu e-mail
                </label>
                <input
                  id="email"
                  type="email"
                  value={userEmail}
                  onChange={e => setUserEmail(e.target.value)}
                  className="w-full px-3 py-2 bg-white border border-gray-300 rounded-lg text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  placeholder="seu@email.com"
                  required
                />
              </div>
              <div>
                <label
                  className="block text-sm font-medium text-gray-700 mb-1"
                  htmlFor="company"
                >
                  Nome da empresa
                </label>
                <input
                  id="company"
                  type="text"
                  value={tenantInput}
                  onChange={e => setTenantInput(e.target.value)}
                  className="w-full px-3 py-2 bg-white border border-gray-300 rounded-lg text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  placeholder="minha-empresa"
                  required
                />
                {tenantInput && (
                  <p className="text-xs text-gray-600 mt-1">
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
        <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {Object.entries(PLANS).map(([planKey, plan]) => {
            const key = planKey as PlanKey;
            const Icon = planIcons[key];
            const isPopular = key === 'professional';

            return (
              <Card
                key={key}
                className={`relative bg-white/90 backdrop-blur-sm border-gray-200/50 shadow-lg hover:shadow-xl transition-all duration-300 ${
                  isPopular
                    ? 'ring-2 ring-blue-500 transform scale-105'
                    : 'hover:scale-102'
                }`}
              >
                {isPopular && (
                  <Badge className="absolute -top-2 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-blue-500 to-purple-500 text-white text-xs px-3 py-1">
                    Mais Popular
                  </Badge>
                )}

                <CardHeader className="text-center pb-4">
                  <div
                    className={`w-10 h-10 ${planColors[key]} rounded-lg flex items-center justify-center mx-auto mb-3 shadow-md`}
                  >
                    <Icon className="w-5 h-5 text-white" />
                  </div>
                  <CardTitle className="text-xl text-gray-800 mb-1">
                    {plan.name}
                  </CardTitle>
                  <CardDescription className="text-gray-600 text-sm mb-3">
                    {plan.description}
                  </CardDescription>
                  <div className="">
                    <span className="text-3xl font-bold bg-gradient-to-r from-gray-800 to-blue-600 bg-clip-text text-transparent">
                      {formatPrice(plan.price)}
                    </span>
                    <span className="text-gray-500 text-sm">/mês</span>
                  </div>
                </CardHeader>

                <CardContent className="py-4">
                  <ul className="space-y-2">
                    {plan.features.map((feature, index) => (
                      <li
                        key={index}
                        className="flex items-start text-gray-700 text-sm"
                      >
                        <Check className="w-4 h-4 text-emerald-500 mr-2 flex-shrink-0 mt-0.5" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>

                <CardFooter className="pt-4">
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
                    } text-white font-semibold py-2.5 rounded-lg transition-all duration-300 text-sm`}
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

        {/* Additional Info */}
        <div className="mt-12 mb-8">
          <div className="text-center">
            <p className="text-gray-500 mb-4">
              Todos os planos incluem teste gratuito de 14 dias • Sem taxa de setup • Cancele a qualquer momento
            </p>
            <div className="flex flex-wrap justify-center gap-6 text-sm text-gray-500">
              <div className="flex items-center">
                <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
                SSL e criptografia
              </div>
              <div className="flex items-center">
                <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
                LGPD compliant
              </div>
              <div className="flex items-center">
                <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
                Suporte 24/7
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
