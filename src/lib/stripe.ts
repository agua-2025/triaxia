import Stripe from 'stripe'
import { loadStripe } from '@stripe/stripe-js'

// Check if we're on the server side
const isServer = typeof window === 'undefined'

if (isServer && !process.env.STRIPE_SECRET_KEY) {
  throw new Error('STRIPE_SECRET_KEY is not set')
}

if (!process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY) {
  throw new Error('NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY is not set')
}

// Server-side Stripe instance (only initialize on server)
export const stripe = isServer ? new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2025-08-27.basil',
  typescript: true,
}) : null

// Client-side Stripe instance
let stripePromise: ReturnType<typeof loadStripe>
export const getStripe = () => {
  if (!stripePromise) {
    stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!)
  }
  return stripePromise
}

// Stripe product and price configurations
export const STRIPE_PLANS = {
  starter: {
    name: 'Starter',
    description: 'Pequenas equipes',
    price: 29900, // R$ 299.00 em centavos
    currency: 'brl',
    interval: 'month' as const,
    jobLimit: 10,
    features: [
      'Até 10 vagas abertas simultâneas',
      'Todos os recursos inclusos',
      'IA para análise de candidatos',
      'Relatórios e analytics',
      'Suporte por email',
      'Integrações completas',
      'Teste gratuito de 14 dias'
    ]
  },
  professional: {
    name: 'Professional',
    description: 'Médias empresas',
    price: 49900, // R$ 499.00 em centavos
    currency: 'brl',
    interval: 'month' as const,
    jobLimit: 50,
    features: [
      'Até 50 vagas abertas simultâneas',
      'Todos os recursos inclusos',
      'IA para análise de candidatos',
      'Relatórios e analytics',
      'Suporte prioritário',
      'Integrações completas',
      'Automação de workflows',
      'Teste gratuito de 14 dias'
    ]
  },
  enterprise: {
    name: 'Enterprise',
    description: 'Grandes organizações',
    price: 127500, // R$ 1275.00 em centavos
    currency: 'brl',
    interval: 'month' as const,
    jobLimit: 200,
    features: [
      'Até 200 vagas abertas simultâneas',
      'Todos os recursos inclusos',
      'IA para análise de candidatos',
      'Relatórios e analytics avançados',
      'Suporte 24/7 dedicado',
      'Integrações completas',
      'Automação avançada',
      'API personalizada',
      'Implementação dedicada',
      'Teste gratuito de 14 dias'
    ]
  }
} as const

export type StripePlan = keyof typeof STRIPE_PLANS

// Helper function to format price
export const formatPrice = (price: number, currency: string = 'BRL') => {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: currency,
  }).format(price / 100)
}