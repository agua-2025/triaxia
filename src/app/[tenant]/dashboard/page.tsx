'use client'

import { useState } from 'react'
import { useParams } from 'next/navigation'
import Link from 'next/link'
import { SessionStatus } from '@/components/auth/SessionStatus'
import { 
  LayoutDashboard, 
  Settings, 
  Users, 
  Briefcase, 
  FileText, 
  Bell,
  Menu,
  X,
  ChevronRight,
  TrendingUp,
  Heart,
  UserCheck,
  Building2,
  Target,
  Zap,
  Eye
} from 'lucide-react'

interface MenuItem {
  icon: React.ReactNode
  label: string
  href: string
  active?: boolean
}

export default function TenantDashboard() {
  const params = useParams()
  const tenantSlug = Array.isArray(params?.tenant) ? params.tenant[0] : (params?.tenant as string) || ''
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const menuItems: MenuItem[] = [
    {
      icon: <LayoutDashboard className="w-5 h-5" />,
      label: 'Dashboard',
      href: `/${tenantSlug}/dashboard`,
      active: true
    },
    {
      icon: <Briefcase className="w-5 h-5" />,
      label: 'Vagas',
      href: `/${tenantSlug}/dashboard/vagas`
    },
    {
      icon: <Users className="w-5 h-5" />,
      label: 'Candidatos',
      href: `/${tenantSlug}/dashboard/candidatos`
    },
    {
      icon: <FileText className="w-5 h-5" />,
      label: 'CVs',
      href: `/${tenantSlug}/dashboard/cvs`
    },
    {
      icon: <Heart className="w-5 h-5" />,
      label: 'Matching',
      href: `/${tenantSlug}/dashboard/matching`
    },
    {
      icon: <TrendingUp className="w-5 h-5" />,
      label: 'Analytics',
      href: `/${tenantSlug}/dashboard/analytics`
    },
    {
      icon: <Building2 className="w-5 h-5" />,
      label: 'Equipe',
      href: `/${tenantSlug}/dashboard/equipe`
    },
    {
      icon: <Zap className="w-5 h-5" />,
      label: 'Integrações',
      href: `/${tenantSlug}/dashboard/integracoes`
    },
    {
      icon: <Settings className="w-5 h-5" />,
      label: 'Configurações',
      href: `/${tenantSlug}/dashboard/configuracoes`
    }
  ]

  const stats = [
    { 
      label: 'Vagas Ativas', 
      value: '24', 
      change: '+3 esta semana', 
      positive: true,
      icon: <Briefcase className="w-6 h-6 text-blue-500" />
    },
    { 
      label: 'Candidatos Ativos', 
      value: '1,247', 
      change: '+89 este mês', 
      positive: true,
      icon: <Users className="w-6 h-6 text-green-500" />
    },
    { 
      label: 'Matches Gerados', 
      value: '156', 
      change: '+23 hoje', 
      positive: true,
      icon: <Heart className="w-6 h-6 text-red-500" />
    },
    { 
      label: 'Taxa de Conversão', 
      value: '78%', 
      change: '+5% vs mês anterior', 
      positive: true,
      icon: <Target className="w-6 h-6 text-purple-500" />
    }
  ]

  const recentMatches = [
    {
      id: '1',
      candidate: 'João Silva',
      job: 'Desenvolvedor Full Stack Senior',
      score: 95,
      time: '5 min atrás'
    },
    {
      id: '2',
      candidate: 'Maria Santos',
      job: 'Designer UX/UI',
      score: 88,
      time: '12 min atrás'
    },
    {
      id: '3',
      candidate: 'Carlos Oliveira',
      job: 'Analista de Dados',
      score: 92,
      time: '25 min atrás'
    }
  ]

  const topJobs = [
    {
      title: 'Desenvolvedor Full Stack Senior',
      candidates: 89,
      matches: 67,
      status: 'Ativa'
    },
    {
      title: 'Designer UX/UI',
      candidates: 156,
      matches: 98,
      status: 'Ativa'
    },
    {
      title: 'Gerente de Marketing',
      candidates: 234,
      matches: 145,
      status: 'Ativa'
    }
  ]

  // Verificação de segurança para tenant
  if (!tenantSlug) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Erro</h1>
          <p className="text-gray-600">Tenant não encontrado.</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 z-40 bg-black bg-opacity-50 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div className={`
        fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
        lg:translate-x-0 lg:static lg:flex-shrink-0
      `}>
        <div className="flex flex-col h-full w-64">
          <div className="flex items-center justify-between h-16 px-6 border-b border-gray-200">
            <h1 className="text-xl font-bold text-gray-800 capitalize">{tenantSlug}</h1>
            <button
              onClick={() => setSidebarOpen(false)}
              className="lg:hidden p-2 rounded-md text-gray-400 hover:text-gray-600"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <nav className="flex-1 mt-6 px-3 overflow-y-auto">
            {menuItems.map((item, index) => (
              <Link
                key={index}
                href={item.href}
                className={`
                  flex items-center px-3 py-3 mb-1 text-sm font-medium rounded-lg transition-colors
                  ${item.active 
                    ? 'bg-blue-50 text-blue-700 border-r-2 border-blue-700' 
                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                  }
                `}
              >
                {item.icon}
                <span className="ml-3">{item.label}</span>
                {item.active && <ChevronRight className="w-4 h-4 ml-auto" />}
              </Link>
            ))}
          </nav>

          <div className="p-4 border-t border-gray-200">
            <div className="flex items-center">
              <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                <span className="text-white text-sm font-medium">{tenantSlug.charAt(0).toUpperCase()}</span>
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium text-gray-700">Admin RH</p>
                <p className="text-xs text-gray-500">rh@{tenantSlug}.com</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top bar */}
        <div className="bg-white shadow-sm border-b border-gray-200">
          <div className="flex items-center justify-between h-16 px-6">
            <div className="flex items-center">
              <button
                onClick={() => setSidebarOpen(true)}
                className="lg:hidden p-2 rounded-md text-gray-400 hover:text-gray-600"
              >
                <Menu className="w-5 h-5" />
              </button>
              <h2 className="ml-2 text-lg font-semibold text-gray-800">Dashboard de Recrutamento</h2>
            </div>
            
            <div className="flex items-center space-x-4">
              <SessionStatus />
              <button className="p-2 text-gray-400 hover:text-gray-600 relative">
                <Bell className="w-5 h-5" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
              </button>
            </div>
          </div>
        </div>

        {/* Dashboard content */}
        <div className="flex-1 p-6 overflow-y-auto">
          {/* Welcome section */}
          <div className="mb-8">
            <h1 className="text-2xl font-bold text-gray-900 mb-2">
              Bem-vindo ao Sistema de Recrutamento
            </h1>
            <p className="text-gray-600">
              Gerencie vagas, candidatos e utilize IA para encontrar os melhores matches para sua empresa.
            </p>
          </div>

          {/* Stats grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {stats.map((stat, index) => (
              <div key={index} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="p-2 bg-gray-50 rounded-lg">
                    {stat.icon}
                  </div>
                  <div className={`text-sm font-medium ${
                    stat.positive ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {stat.change}
                  </div>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-600 mb-1">{stat.label}</p>
                  <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Main content grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Quick actions */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Ações Rápidas</h3>
              <div className="space-y-3">
                <Link 
                  href={`/${tenantSlug}/dashboard/vagas`}
                  className="flex items-center p-3 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors"
                >
                  <Briefcase className="w-5 h-5 text-blue-500 mr-3" />
                  <span className="font-medium">Gerenciar Vagas</span>
                </Link>
                <Link 
                  href={`/${tenantSlug}/dashboard/candidatos`}
                  className="flex items-center p-3 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors"
                >
                  <Users className="w-5 h-5 text-green-500 mr-3" />
                  <span className="font-medium">Ver Candidatos</span>
                </Link>
                <Link 
                  href={`/${tenantSlug}/dashboard/matching`}
                  className="flex items-center p-3 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors"
                >
                  <Heart className="w-5 h-5 text-red-500 mr-3" />
                  <span className="font-medium">Matches IA</span>
                </Link>
                <Link 
                  href={`/${tenantSlug}/dashboard/cvs`}
                  className="flex items-center p-3 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors"
                >
                  <FileText className="w-5 h-5 text-purple-500 mr-3" />
                  <span className="font-medium">Analisar CVs</span>
                </Link>
              </div>
            </div>

            {/* Recent matches */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">Matches Recentes</h3>
                <Link href={`/${tenantSlug}/dashboard/matching`} className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                  Ver todos
                </Link>
              </div>
              <div className="space-y-4">
                {recentMatches.map((match) => (
                  <div key={match.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-900">{match.candidate}</p>
                      <p className="text-xs text-gray-500">{match.job}</p>
                      <p className="text-xs text-gray-400">{match.time}</p>
                    </div>
                    <div className="flex items-center">
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                        match.score >= 90 ? 'bg-green-100 text-green-800' :
                        match.score >= 80 ? 'bg-yellow-100 text-yellow-800' :
                        'bg-gray-100 text-gray-800'
                      }`}>
                        {match.score}%
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Top performing jobs */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">Vagas em Destaque</h3>
                <Link href={`/${tenantSlug}/dashboard/vagas`} className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                  Ver todas
                </Link>
              </div>
              <div className="space-y-4">
                {topJobs.map((job, index) => (
                  <div key={index} className="p-3 border border-gray-200 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="text-sm font-medium text-gray-900 truncate">{job.title}</h4>
                      <span className="px-2 py-1 text-xs font-medium bg-green-100 text-green-800 rounded-full">
                        {job.status}
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-xs text-gray-500">
                      <span>{job.candidates} candidatos</span>
                      <span>{job.matches} matches</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* AI Insights */}
          <div className="mt-6 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-6 border border-blue-200">
            <div className="flex items-center mb-4">
              <div className="p-2 bg-blue-100 rounded-lg mr-3">
                <Zap className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900">Insights da IA</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-white p-4 rounded-lg">
                <p className="text-sm text-gray-600 mb-2">Melhor horário para publicar vagas:</p>
                <p className="text-lg font-semibold text-blue-600">Terça-feira, 10h</p>
              </div>
              <div className="bg-white p-4 rounded-lg">
                <p className="text-sm text-gray-600 mb-2">Skill mais procurada:</p>
                <p className="text-lg font-semibold text-green-600">React.js</p>
              </div>
              <div className="bg-white p-4 rounded-lg">
                <p className="text-sm text-gray-600 mb-2">Tempo médio de contratação:</p>
                <p className="text-lg font-semibold text-purple-600">12 dias</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}