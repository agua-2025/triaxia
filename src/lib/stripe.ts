// src/lib/stripe.ts
import Stripe from 'stripe';

const isServer = typeof window === 'undefined';

// Checks de ambiente (sem expor segredos no bundle)
if (isServer && !process.env.STRIPE_SECRET_KEY) {
  throw new Error('STRIPE_SECRET_KEY is not set');
}
if (!isServer && !process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY) {
  throw new Error('NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY is not set');
}

// Instância do Stripe no server com apiVersion fixa (estabilidade)
export const stripe = isServer
  ? new Stripe(process.env.STRIPE_SECRET_KEY!, {
      apiVersion: '2025-08-27.basil',
    })
  : null;

// Client-side: loader da Stripe.js (evita empacotar no server)
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

// IDs reais de Price vindos do Dashboard (definidos nas ENVs da Vercel)
export const PRICES = {
  starter: process.env.STRIPE_PRICE_STARTER,
  professional: process.env.STRIPE_PRICE_PROF,
  enterprise: process.env.STRIPE_PRICE_ENT,
} as const;

export type PlanKey = keyof typeof PRICES;

// Metadados de planos para UI (com preços em centavos)
export const PLANS: Record<
  PlanKey,
  {
    name: string;
    description: string;
    price: number;
    currency: string;
    interval: string;
    features: string[];
  }
> = {
  starter: {
    name: 'Starter',
    description: 'Ideal para pequenas equipes',
    price: 29900, // R$ 299,00 em centavos
    currency: 'brl',
    interval: 'month',
    features: [
      'Até 10 vagas abertas simultâneas',
      'Todos os recursos inclusos',
      'IA para análise de candidatos',
      'Relatórios e analytics',
      'Suporte por email',
      'Integrações básicas',
    ],
  },
  professional: {
    name: 'Professional',
    description: 'Para equipes em crescimento',
    price: 49900, // R$ 499,00 em centavos
    currency: 'brl',
    interval: 'month',
    features: [
      'Até 50 vagas abertas simultâneas',
      'Todos os recursos inclusos',
      'IA para análise de candidatos',
      'Relatórios e analytics',
      'Suporte prioritário',
      'Todas as integrações',
      'Automação de workflows',
    ],
  },
  enterprise: {
    name: 'Enterprise',
    description: 'Para grandes organizações',
    price: 127500, // R$ 1.275,00 em centavos
    currency: 'brl',
    interval: 'month',
    features: [
      'Até 200 vagas abertas simultâneas',
      'Todos os recursos inclusos',
      'IA para análise de candidatos',
      'Relatórios e analytics avançados',
      'Suporte 24/7 dedicado',
      'Integrações completas',
      'Automação avançada',
      'API personalizada',
      'Treinamento da equipe',
      'SLA garantido',
    ],
  },
};

// Utilitário opcional de formatação (caso exiba valores vindos do Stripe)
export const formatPrice = (price: number, currency = 'BRL') =>
  new Intl.NumberFormat('pt-BR', { style: 'currency', currency }).format(
    price / 100
  );

// Ajuda a garantir que o priceId existe antes de chamar a API
export const requirePriceId = (plan: PlanKey): string => {
  const id = PRICES[plan];
  if (!id) throw new Error(`Stripe priceId not set for plan: ${plan}`);
  return id;
};
