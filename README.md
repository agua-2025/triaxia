## Triaxia - Sistema de Banco de Talentos com IA

Sistema completo de recrutamento inteligente com análise de perfil, match automático e pipeline de contratação.

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## 🚀 Deploy Automático

Este projeto está configurado com **deploy automático no Vercel** usando GitHub Actions.

### Configuração Rápida

```bash
# Execute o script de configuração
.\setup-vercel-auto-deploy.ps1
```

### Deploy Manual

```bash
# Deploy para produção
vercel --prod

# Deploy de preview
vercel
```

📖 **Documentação completa**: [DEPLOY.md](./DEPLOY.md)

## 🛠️ Tecnologias

- **Framework**: Next.js 15 com App Router
- **Database**: PostgreSQL com Prisma ORM
- **Auth**: Supabase Authentication
- **Payments**: Stripe
- **AI**: HuggingFace Transformers
- **Styling**: Tailwind CSS
- **Deploy**: Vercel com GitHub Actions

## 📁 Estrutura do Projeto

```
src/
├── app/                 # App Router (Next.js 13+)
│   ├── [tenant]/       # Rotas multi-tenant
│   ├── api/            # API Routes
│   ├── dashboard/      # Dashboard da empresa
│   └── candidatos/     # Portal do candidato
├── components/         # Componentes reutilizáveis
├── lib/               # Utilitários e configurações
└── middleware.ts      # Middleware para multi-tenancy
```

## 🔧 Variáveis de Ambiente

Copie `.env.example` para `.env.local` e configure:

```bash
# Database
DATABASE_URL="postgresql://..."

# Supabase
NEXT_PUBLIC_SUPABASE_URL="https://..."
NEXT_PUBLIC_SUPABASE_ANON_KEY="..."
SUPABASE_SERVICE_ROLE_KEY="..."

# Stripe
STRIPE_SECRET_KEY="sk_..."
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY="pk_..."
STRIPE_WEBHOOK_SECRET="whsec_..."

# HuggingFace
HUGGINGFACE_API_KEY="hf_..."
```
