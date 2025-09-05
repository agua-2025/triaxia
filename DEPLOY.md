# 🚀 Deploy Automático no Vercel

Este projeto está configurado para deploy automático no Vercel usando GitHub Actions.

## 📋 Pré-requisitos

1. **Conta no Vercel**: [vercel.com](https://vercel.com)
2. **Vercel CLI instalado**: `npm install -g vercel`
3. **Repositório no GitHub**

## ⚙️ Configuração Inicial

### 1. Configurar Projeto no Vercel

```bash
# Execute o script de configuração
.\setup-vercel-auto-deploy.ps1
```

Ou manualmente:

```bash
# Login no Vercel
vercel login

# Linkar projeto
vercel link
```

### 2. Configurar GitHub Secrets

Vá para `Settings > Secrets and variables > Actions` no seu repositório GitHub e adicione:

| Secret | Descrição | Como obter |
|--------|-----------|------------|
| `VERCEL_TOKEN` | Token de acesso do Vercel | [vercel.com/account/tokens](https://vercel.com/account/tokens) |
| `VERCEL_ORG_ID` | ID da organização | Arquivo `.vercel/project.json` após `vercel link` |
| `VERCEL_PROJECT_ID` | ID do projeto | Arquivo `.vercel/project.json` após `vercel link` |

### 3. Variáveis de Ambiente no Vercel

Configure as seguintes variáveis no painel do Vercel:

```bash
# Database
DATABASE_URL=sua_url_do_banco

# Supabase
NEXT_PUBLIC_SUPABASE_URL=sua_url_supabase
NEXT_PUBLIC_SUPABASE_ANON_KEY=sua_chave_anonima
SUPABASE_SERVICE_ROLE_KEY=sua_chave_service_role

# Stripe
STRIPE_SECRET_KEY=sua_chave_secreta_stripe
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=sua_chave_publica_stripe
STRIPE_WEBHOOK_SECRET=seu_webhook_secret

# HuggingFace
HUGGINGFACE_API_KEY=sua_chave_huggingface

# App
NEXT_PUBLIC_APP_URL=https://seu-dominio.vercel.app
```

## 🔄 Como Funciona

O deploy automático é acionado quando:

- ✅ Push para branch `main` ou `master`
- ✅ Pull Request para `main` ou `master`

### Processo de Deploy

1. **Checkout** do código
2. **Setup** do Node.js 18
3. **Instalação** das dependências
4. **Geração** do cliente Prisma
5. **Build** do projeto
6. **Deploy** para Vercel

## 🛠️ Comandos Úteis

```bash
# Deploy manual
vercel --prod

# Preview deploy
vercel

# Ver logs
vercel logs

# Ver domínios
vercel domains

# Ver projetos
vercel projects
```

## 🔍 Troubleshooting

### Build Falha
- Verifique se todas as variáveis de ambiente estão configuradas
- Confirme que o `DATABASE_URL` está acessível
- Verifique logs no painel do Vercel

### Deploy não Executa
- Confirme que os GitHub Secrets estão configurados
- Verifique se o workflow está habilitado
- Veja a aba "Actions" no GitHub

### Erro de Prisma
- Certifique-se que `prisma generate` roda antes do build
- Verifique se o schema está correto

## 📚 Recursos

- [Documentação Vercel](https://vercel.com/docs)
- [GitHub Actions](https://docs.github.com/en/actions)
- [Vercel CLI](https://vercel.com/docs/cli)