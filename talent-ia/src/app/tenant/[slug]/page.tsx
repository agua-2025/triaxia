import { notFound } from 'next/navigation'
import { TenantProvider } from '@/contexts/TenantContext'
import { TenantLandingPage } from '@/components/tenant/TenantLandingPage'
import { db } from '@/lib/db'

interface TenantPageProps {
  params: {
    slug: string
  }
}

// Função para verificar se o tenant existe (Server Component)
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

export default async function TenantPage({ params }: TenantPageProps) {
  const { slug } = params

  // Verificar se o tenant existe
  const tenant = await getTenant(slug)

  if (!tenant) {
    notFound()
  }

  // Verificar se o tenant está ativo
  if (tenant.status !== 'ACTIVE') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            Portal Temporariamente Indisponível
          </h1>
          <p className="text-gray-600">
            Este portal está temporariamente fora do ar. Tente novamente mais tarde.
          </p>
        </div>
      </div>
    )
  }

  return (
    <TenantProvider slug={slug}>
      <TenantLandingPage />
    </TenantProvider>
  )
}

// Gerar metadata dinâmica baseada no tenant
export async function generateMetadata({ params }: TenantPageProps) {
  const { slug } = params
  const tenant = await getTenant(slug)

  if (!tenant) {
    return {
      title: 'Portal não encontrado',
      description: 'O portal solicitado não foi encontrado.'
    }
  }

  return {
    title: `${tenant.name} - Portal de Vagas`,
    description: `Explore oportunidades de carreira na ${tenant.name}. Encontre a vaga ideal para você.`,
  }
}