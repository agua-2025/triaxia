import { ReactNode } from 'react'
import { Metadata } from 'next'

interface TenantLayoutProps {
  children: ReactNode
  params: { tenant: string }
}

export async function generateMetadata(
  { params }: { params: { tenant: string } }
): Promise<Metadata> {
  // Em produção, você buscaria os dados da empresa do banco de dados
  const companyName = params.tenant.charAt(0).toUpperCase() + params.tenant.slice(1)
  
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

export default function TenantLayout({ children }: TenantLayoutProps) {
  return (
    <div className="min-h-screen bg-gray-50">
      {children}
    </div>
  )
}