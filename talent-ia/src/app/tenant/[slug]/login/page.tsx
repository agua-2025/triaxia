import { notFound } from 'next/navigation'
import { TenantProvider } from '@/contexts/TenantContext'
import { TenantLoginPage } from '@/components/tenant/TenantLoginPage'
import { db } from '@/lib/db'

interface TenantLoginPageProps {
  params: {
    slug: string
  }
}

// Função para verificar se o tenant existe
async function getTenant(slug: string) {
  try {
    const tenant = await db.tenant.findUnique({
      where: {
        slug: slug
      },
      select: {
        id: true,
        slug: true,
        name: true,
        status: true
      }
    })

    return tenant
  } catch (error) {
    console.error('Erro ao buscar tenant:', error)
    return null
  }
}

export default async function LoginPage({ params }: TenantLoginPageProps) {
  const { slug } = params

  // Verificar se o tenant existe
  const tenant = await getTenant(slug)

  if (!tenant || tenant.status !== 'ACTIVE') {
    notFound()
  }

  return (
    <TenantProvider slug={slug}>
      <TenantLoginPage />
    </TenantProvider>
  )
}

// Gerar metadata dinâmica
export async function generateMetadata({ params }: TenantLoginPageProps) {
  const { slug } = params
  const tenant = await getTenant(slug)

  if (!tenant) {
    return {
      title: 'Login não encontrado',
      description: 'A página de login solicitada não foi encontrada.'
    }
  }

  return {
    title: `Login - ${tenant.name}`,
    description: `Acesse sua conta no portal de carreiras da ${tenant.name}.`,
  }
}