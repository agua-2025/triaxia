# Configuração do Banco de Dados PostgreSQL

Como o Docker não está disponível no sistema, você precisa configurar um banco PostgreSQL online gratuito. Aqui estão as opções recomendadas:

## Opção 1: Neon (Recomendado)

1. Acesse [neon.tech](https://neon.tech)
2. Crie uma conta gratuita
3. Crie um novo projeto
4. Copie a string de conexão fornecida
5. Cole no arquivo `.env` substituindo a `DATABASE_URL`

Exemplo:
```
DATABASE_URL="postgresql://username:password@ep-xxx.us-east-1.aws.neon.tech/neondb?sslmode=require"
```

## Opção 2: Supabase

1. Acesse [supabase.com](https://supabase.com)
2. Crie uma conta gratuita
3. Crie um novo projeto
4. Vá em Settings > Database
5. Copie a Connection String (URI)
6. Cole no arquivo `.env` substituindo a `DATABASE_URL`

Exemplo:
```
DATABASE_URL="postgresql://postgres:password@db.xxx.supabase.co:5432/postgres"
```

## Opção 3: Railway

1. Acesse [railway.app](https://railway.app)
2. Crie uma conta gratuita
3. Crie um novo projeto
4. Adicione um serviço PostgreSQL
5. Copie a string de conexão
6. Cole no arquivo `.env`

## Após configurar o banco:

1. Execute os comandos do Prisma:
```bash
npx prisma generate
npx prisma db push
```

2. (Opcional) Execute o seed para dados iniciais:
```bash
npx prisma db seed
```

3. Reinicie o servidor de desenvolvimento:
```bash
npm run dev
```

## Troubleshooting

- Certifique-se de que a URL inclui `?sslmode=require` para conexões seguras
- Verifique se o usuário e senha estão corretos
- Confirme que o banco de dados está ativo no provedor escolhido