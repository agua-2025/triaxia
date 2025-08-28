import { notFound } from 'next/navigation'
import { TenantProvider } from '@/contexts/TenantContext'
import { TenantJobsPage } from '@/components/tenant/TenantJobsPage'
import { db } from '@/lib/db'

interface TenantJobsPageProps {
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

export default async function JobsPage({ params }: TenantJobsPageProps) {
  const { slug } = params

  // Verificar se o tenant existe
  const tenant = await getTenant(slug)

  if (!tenant || tenant.status !== 'ACTIVE') {
    notFound()
  }

  return (
    <TenantProvider slug={slug}>
      <TenantJobsPage />
    </TenantProvider>
  )
}

// Gerar metadata dinâmica
export async function generateMetadata({ params }: TenantJobsPageProps) {
  const { slug } = params
  const tenant = await getTenant(slug)

  if (!tenant) {
    return {
      title: 'Vagas não encontradas',
      description: 'As vagas solicitadas não foram encontradas.'
    }
  }

  return {
    title: `Vagas - ${tenant.name}`,
    description: `Explore todas as oportunidades de carreira disponíveis na ${tenant.name}. Encontre a vaga perfeita para você.`,
  }
}