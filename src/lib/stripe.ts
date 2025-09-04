// src/lib/stripe.ts
import Stripe from 'stripe';

const isServer = typeof window === 'undefined';

if (isServer && !process.env.STRIPE_SECRET_KEY) {
  throw new Error('STRIPE_SECRET_KEY is not set');
}
if (!process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY) {
  throw new Error('NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY is not set');
}

// Não fixe apiVersion manualmente; deixe a versão definida pela SDK.
export const stripe = isServer
  ? new Stripe(process.env.STRIPE_SECRET_KEY!)
  : null;

// Client-side: import dinâmico evita empacotar '@stripe/stripe-js' no servidor
let stripePromise:
  | Promise<import('@stripe/stripe-js').Stripe | null>
  | undefined;
export const getStripe = () => {
  if (!stripePromise) {
    stripePromise = import('@stripe/stripe-js').then(({ loadStripe }) =>
      loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!)
    );
  }
  return stripePromise;
};

// Planos (Price dinâmico criado/achado na rota)
export const STRIPE_PLANS = {
  starter: {
    name: 'Starter',
    description: 'Ideal para pequenas equipes',
    price: 29900, // em centavos (BRL)
    currency: 'brl',
    interval: 'month' as const,
    features: [
      'Até 100 vagas ativas',
      'IA para matching básico',
      'Relatórios básicos',
      'Suporte por email',
      'Integrações básicas',
    ],
  },
  professional: {
    name: 'Professional',
    description: 'Para equipes em crescimento',
    price: 49900,
    currency: 'brl',
    interval: 'month' as const,
    features: [
      'Vagas ilimitadas',
      'IA avançada para matching',
      'Analytics completo',
      'Suporte prioritário',
      'Todas as integrações',
      'Automação de workflows',
    ],
  },
  enterprise: {
    name: 'Enterprise',
    description: 'Para grandes organizações',
    price: 127500,
    currency: 'brl',
    interval: 'month' as const,
    features: [
      'Tudo do Professional',
      'Implementação dedicada',
      'Suporte 24/7',
      'API personalizada',
      'Treinamento da equipe',
      'SLA garantido',
    ],
  },
} as const;

export type StripePlan = keyof typeof STRIPE_PLANS;

export const formatPrice = (price: number, currency = 'BRL') =>
  new Intl.NumberFormat('pt-BR', { style: 'currency', currency }).format(
    price / 100
  );
