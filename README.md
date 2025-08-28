# 🎯 Talentia - Sistema Inteligente de Gestão de Talentos

Um sistema moderno e inteligente para gestão de candidatos e vagas, com análise de IA para matching automático entre talentos e oportunidades.

## 🚀 Funcionalidades

### 📊 Dashboard Inteligente
- Visão geral de candidatos e vagas
- Estatísticas em tempo real
- Gráficos e métricas de performance

### 👥 Gestão de Candidatos
- Cadastro completo de candidatos
- Upload e análise automática de currículos
- Análise de IA para pontuação de perfis
- Busca e filtros avançados

### 💼 Gestão de Vagas
- Criação e edição de posições
- Definição de requisitos e critérios
- Controle de status e urgência

### 🤖 Matching Inteligente
- Algoritmo de IA para compatibilidade
- Análise de skills, experiência e localização
- Ranking automático de candidatos
- Identificação de gaps de competências

### 🔐 Sistema Multi-tenant
- Autenticação segura com NextAuth.js
- Isolamento de dados por empresa
- Controle de acesso baseado em roles

## 🛠️ Tecnologias

- **Frontend**: Next.js 15, React 18, TypeScript
- **UI**: Tailwind CSS, shadcn/ui, Radix UI
- **Backend**: Next.js API Routes, Prisma ORM
- **Banco de Dados**: PostgreSQL
- **Autenticação**: NextAuth.js
- **IA**: OpenAI GPT-4
- **Cache**: Redis (opcional)
- **Deploy**: Docker, Docker Compose

## 📋 Pré-requisitos

- Node.js 18+ 
- PostgreSQL 15+
- Docker e Docker Compose (opcional)
- Conta OpenAI com API Key

## 🚀 Instalação

### Método 1: Desenvolvimento Local

1. **Clone o repositório**
```bash
git clone <repository-url>
cd talentia
```

2. **Instale as dependências**
```bash
npm install
```

3. **Configure as variáveis de ambiente**
```bash
cp .env.example .env.local
```

Edite o arquivo `.env.local` com suas configurações:

```env
# Database
DATABASE_URL="postgresql://username:password@localhost:5432/talentia"

# NextAuth.js
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-secret-key"

# OpenAI
OPENAI_API_KEY="your-openai-api-key"

# Application
APP_NAME="Talentia"
APP_URL="http://localhost:3000"
```

4. **Configure o banco de dados**
```bash
# Gerar cliente Prisma
npm run db:generate

# Executar migrações
npm run db:migrate

# Popular com dados de exemplo
npm run db:seed
```

5. **Inicie o servidor de desenvolvimento**
```bash
npm run dev
```

### Método 2: Docker (Recomendado)

1. **Clone o repositório**
```bash
git clone <repository-url>
cd talentia
```

2. **Configure as variáveis de ambiente**
```bash
cp .env.example .env.local
```

3. **Execute o script de deploy**
```bash
# Para desenvolvimento
chmod +x deploy.sh
./deploy.sh development

# Para produção
./deploy.sh production
```

Ou manualmente:

```bash
# Desenvolvimento
docker-compose -f docker-compose.yml -f docker-compose.dev.yml up -d

# Produção
docker-compose up -d
```

## 📁 Estrutura do Projeto

```
src/
├── app/                    # App Router (Next.js 15)
│   ├── (auth)/            # Rotas de autenticação
│   ├── (dashboard)/       # Dashboard principal
│   ├── api/               # API Routes
│   └── globals.css        # Estilos globais
├── components/            # Componentes React
│   ├── ui/               # Componentes base (shadcn/ui)
│   ├── forms/            # Formulários
│   └── layout/           # Layout components
├── lib/                   # Utilitários e configurações
│   ├── ai.ts             # Sistema de IA
│   ├── auth.ts           # Configuração NextAuth
│   ├── prisma.ts         # Cliente Prisma
│   └── utils.ts          # Funções utilitárias
└── types/                 # Definições TypeScript

prisma/
├── schema.prisma          # Schema do banco
├── migrations/            # Migrações
└── seed.ts               # Dados de exemplo
```

## 🗄️ Estrutura do Banco de Dados

### Principais Modelos

- **Company**: Empresas (multi-tenant)
- **User**: Usuários do sistema
- **Candidate**: Candidatos
- **Position**: Vagas/Posições
- **Application**: Candidaturas
- **AIAnalysis**: Análises de IA

## 🤖 Sistema de IA

O sistema utiliza OpenAI GPT-4 para:

- **Análise de Currículos**: Extração automática de informações
- **Pontuação de Candidatos**: Score baseado em experiência e skills
- **Matching Inteligente**: Compatibilidade entre candidatos e vagas
- **Identificação de Gaps**: Lacunas de competências

### Algoritmo de Matching

1. **Análise de Skills** (40%): Compatibilidade de competências
2. **Experiência** (35%): Nível e relevância da experiência
3. **Localização** (15%): Proximidade geográfica
4. **Outros Fatores** (10%): Educação, idiomas, etc.

## 📱 Interface

### Dashboard
- Métricas de candidatos e vagas
- Gráficos de performance
- Ações rápidas

### Candidatos
- Lista com filtros avançados
- Perfil detalhado com análise de IA
- Formulário de cadastro/edição

### Vagas
- Gestão completa de posições
- Matching automático com candidatos
- Análise de compatibilidade

## 🔌 API Endpoints

### Candidatos
- `GET /api/candidates` - Listar candidatos
- `POST /api/candidates` - Criar candidato
- `GET /api/candidates/[id]` - Obter candidato
- `PUT /api/candidates/[id]` - Atualizar candidato
- `DELETE /api/candidates/[id]` - Excluir candidato
- `GET /api/candidates/stats` - Estatísticas

### Vagas
- `GET /api/positions` - Listar vagas
- `POST /api/positions` - Criar vaga
- `GET /api/positions/[id]/match` - Matching de candidatos

### Sistema
- `GET /api/health` - Health check

## 🚀 Deploy

### Vercel (Recomendado)

1. Conecte seu repositório ao Vercel
2. Configure as variáveis de ambiente
3. Deploy automático

### Docker

```bash
# Build da imagem
docker build -t talentia .

# Executar container
docker run -p 3000:3000 talentia
```

### Variáveis de Ambiente Obrigatórias

```env
DATABASE_URL=postgresql://...
NEXTAUTH_URL=https://your-domain.com
NEXTAUTH_SECRET=your-secret
OPENAI_API_KEY=sk-...
```

## 🧪 Testes

```bash
# Executar testes
npm run test

# Testes com coverage
npm run test:coverage

# Testes E2E
npm run test:e2e
```

## 📊 Monitoramento

- **Health Check**: `/api/health`
- **Logs**: Docker logs ou Vercel Analytics
- **Performance**: Next.js Analytics

## 🤝 Contribuição

1. Fork o projeto
2. Crie uma branch para sua feature
3. Commit suas mudanças
4. Push para a branch
5. Abra um Pull Request

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

## 📞 Suporte

Para suporte e dúvidas:
- Abra uma [issue](https://github.com/your-repo/issues)
- Email: suporte@talentia.com

## 🗺️ Roadmap

- [ ] Integração com LinkedIn
- [ ] Análise de vídeo entrevistas
- [ ] Dashboard de analytics avançado
- [ ] API pública
- [ ] Mobile app
- [ ] Integração com ATS externos

---

**Desenvolvido com ❤️ usando Next.js 15 e IA**
