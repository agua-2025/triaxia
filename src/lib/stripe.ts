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
  apiVersion: '2024-12-18.acacia',
  typescript: true,
}) : null

// Client-side Stripe instance
let stripePromise: Promise<Stripe | null>
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
    description: 'Ideal para pequenas equipes',
    price: 29900, // R$ 299.00 em centavos
    currency: 'brl',
    interval: 'month' as const,
    features: [
      'Até 100 vagas ativas',
      'IA para matching básico',
      'Relatórios básicos',
      'Suporte por email',
      'Integrações básicas'
    ]
  },
  professional: {
    name: 'Professional',
    description: 'Para equipes em crescimento',
    price: 49900, // R$ 499.00 em centavos
    currency: 'brl',
    interval: 'month' as const,
    features: [
      'Vagas ilimitadas',
      'IA avançada para matching',
      'Analytics completo',
      'Suporte prioritário',
      'Todas as integrações',
      'Automação de workflows'
    ]
  },
  enterprise: {
    name: 'Enterprise',
    description: 'Para grandes organizações',
    price: 127500, // R$ 1275.00 em centavos
    currency: 'brl',
    interval: 'month' as const,
    features: [
      'Tudo do Professional',
      'Implementação dedicada',
      'Suporte 24/7',
      'API personalizada',
      'Treinamento da equipe',
      'SLA garantido'
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