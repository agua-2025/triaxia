import { redirect } from 'next/navigation'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { AdminDashboard } from '@/components/admin/AdminDashboard'

export default async function AdminPage() {
  const session = await getServerSession(authOptions)

  // Verificar se o usuário está logado
  if (!session) {
    redirect('/auth/signin')
  }

  // Verificar se o usuário é admin (em produção, verificar role no banco)
  // Por enquanto, permitir acesso para demonstração
  
  return (
    <div className="min-h-screen bg-gray-50">
      <AdminDashboard />
    </div>
  )
}

export const metadata = {
  title: 'Painel Administrativo - TalentIA',
  description: 'Gerencie tenants e configurações da plataforma TalentIA',
}