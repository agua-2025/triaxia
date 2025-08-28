'use client'

import { useSession } from 'next-auth/react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
import {
  Home,
  User,
  Briefcase,
  FileText,
  Settings,
  Building2,
  Users,
  BarChart3
} from 'lucide-react'

const candidateNavItems = [
  {
    title: 'Dashboard',
    href: '/dashboard',
    icon: Home
  },
  {
    title: 'Meu Perfil',
    href: '/dashboard/profile',
    icon: User
  },
  {
    title: 'Vagas',
    href: '/dashboard/jobs',
    icon: Briefcase
  },
  {
    title: 'Candidaturas',
    href: '/dashboard/applications',
    icon: FileText
  },
  {
    title: 'Configurações',
    href: '/dashboard/settings',
    icon: Settings
  }
]

const companyNavItems = [
  {
    title: 'Dashboard',
    href: '/dashboard',
    icon: Home
  },
  {
    title: 'Perfil da Empresa',
    href: '/dashboard/company-profile',
    icon: Building2
  },
  {
    title: 'Vagas',
    href: '/dashboard/jobs',
    icon: Briefcase
  },
  {
    title: 'Candidatos',
    href: '/dashboard/candidates',
    icon: Users
  },
  {
    title: 'Analytics',
    href: '/dashboard/analytics',
    icon: BarChart3
  },
  {
    title: 'Configurações',
    href: '/dashboard/settings',
    icon: Settings
  }
]

export function Sidebar() {
  const { data: session } = useSession()
  const pathname = usePathname()

  const navItems = session?.user?.role === 'COMPANY' ? companyNavItems : candidateNavItems

  return (
    <div className="w-64 bg-white border-r min-h-screen">
      <div className="p-6">
        <h2 className="text-lg font-semibold text-gray-900">
          {session?.user?.role === 'COMPANY' ? 'Painel da Empresa' : 'Painel do Candidato'}
        </h2>
      </div>

      <nav className="px-4 space-y-2">
        {navItems.map((item) => {
          const Icon = item.icon
          const isActive = pathname === item.href

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                'flex items-center px-3 py-2 rounded-lg text-sm font-medium transition-colors',
                isActive
                  ? 'bg-blue-50 text-blue-700'
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
              )}
            >
              <Icon className="w-5 h-5 mr-3" />
              {item.title}
            </Link>
          )
        })}
      </nav>
    </div>
  )
}