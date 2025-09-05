import { ReactNode } from 'react'
import { Metadata } from 'next'

interface TenantLayoutProps {
  children: React.ReactNode
  params: Promise<{ tenant: string }>
}

export async function generateMetadata(
  { params }: { params: Promise<{ tenant: string }> }
): Promise<Metadata> {
  // Em produção, você buscaria os dados da empresa do banco de dados
  const { tenant } = await params
  const companyName = tenant.charAt(0).toUpperCase() + tenant.slice(1)
  
  return {
    title: `Carreiras - ${companyName}`,
    description: `Explore oportunidades de carreira na ${companyName}. Encontre vagas que combinam com seu perfil e faça parte do nosso time.`,
    openGraph: {
      title: `Carreiras - ${companyName}`,
      description: `Explore oportunidades de carreira na ${companyName}`,
      type: 'website',
    },
  }
}

export default async function TenantLayout({ children, params }: TenantLayoutProps) {
  const { tenant } = await params
  return (
    <div className="min-h-screen bg-gray-50">
      {children}
    </div>
  )
}