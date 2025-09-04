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

// Instância do Stripe no server (usa a versão padrão da conta)
export const stripe = isServer
  ? new Stripe(process.env.STRIPE_SECRET_KEY!)
  : null;

// Client-side: loader da Stripe.js (evita empacotar no server)
let stripePromise: Promise<import('@stripe/stripe-js').Stripe | null> | undefined;
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
type Currency = 'brl';
type Interval = 'month';

// Metadados para UI (preços só para exibição)
export const PLANS = {
  starter: {
    name: 'Starter',
    description: 'Ideal para pequenas equipes',
    price: 29900,
    currency: 'brl' as Currency,
    interval: 'month' as Interval,
    features: [
      'Mesmos recursos em todos os planos',
      'Limite de vagas abertas conforme o plano',
      'Relatórios e IA inclusos',
      'Suporte por e-mail',
    ],
  },
  professional: {
    name: 'Professional',
    description: 'Para equipes em crescimento',
    price: 49900,
    currency: 'brl' as Currency,
    interval: 'month' as Interval,
    features: [
      'Mesmos recursos em todos os planos',
      'Limite de vagas abertas conforme o plano',
      'Relatórios e IA inclusos',
      'Suporte prioritário',
    ],
  },
  enterprise: {
    name: 'Enterprise',
    description: 'Para grandes organizações',
    price: 127500,
    currency: 'brl' as Currency,
    interval: 'month' as Interval,
    features: [
      'Mesmos recursos em todos os planos',
      'Limite de vagas abertas conforme o plano',
      'SLA/atendimento dedicado',
      'Integrações avançadas',
    ],
  },
} as const;

// Utilitários
export const formatPrice = (price: number, currency = 'BRL') =>
  new Intl.NumberFormat('pt-BR', { style: 'currency', currency }).format(price / 100);

export const requirePriceId = (plan: PlanKey): string => {
  const id = PRICES[plan];
  if (!id) throw new Error(`Stripe priceId not set for plan: ${plan}`);
  return id;
};
