'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { 
  Users, 
  Building, 
  Settings, 
  Shield, 
  Activity, 
  Database, 
  AlertTriangle,
  CheckCircle,
  Clock,
  DollarSign,
  TrendingUp,
  UserPlus,
  Eye,
  Edit,
  Trash2,
  RefreshCw
} from 'lucide-react'

interface Tenant {
  id: string
  name: string
  slug: string
  domain?: string
  plan: string
  status: string
  createdAt: string
  _count: {
    users: number
    jobs: number
  }
}

interface SystemStats {
  totalTenants: number
  activeTenants: number
  totalUsers: number
  totalJobs: number
  revenue: number
}

export default function SystemAdminPage() {
  const [tenants, setTenants] = useState<Tenant[]>([])
  const [stats, setStats] = useState<SystemStats | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    loadData()
  }, [])

  const loadData = async () => {
    try {
      setLoading(true)
      setError(null)
      
      // Carregar estatísticas do sistema
      const statsResponse = await fetch('/api/system-admin/stats')
      if (!statsResponse.ok) {
        throw new Error('Erro ao carregar estatísticas')
      }
      const statsData = await statsResponse.json()
      setStats(statsData)

      // Carregar lista de tenants
      const tenantsResponse = await fetch('/api/system-admin/tenants')
      if (!tenantsResponse.ok) {
        throw new Error('Erro ao carregar tenants')
      }
      const tenantsData = await tenantsResponse.json()
      setTenants(tenantsData.tenants || [])
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro desconhecido')
    } finally {
      setLoading(false)
    }
  }

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      active: { color: 'bg-green-100 text-green-800', icon: CheckCircle },
      trial: { color: 'bg-blue-100 text-blue-800', icon: Clock },
      suspended: { color: 'bg-red-100 text-red-800', icon: AlertTriangle },
      cancelled: { color: 'bg-gray-100 text-gray-800', icon: AlertTriangle },
    }
    
    const config = statusConfig[status as keyof typeof statusConfig] || statusConfig.cancelled
    const Icon = config.icon
    
    return (
      <Badge className={`${config.color} flex items-center gap-1`}>
        <Icon className="w-3 h-3" />
        {status}
      </Badge>
    )
  }

  const getPlanBadge = (plan: string) => {
    const planColors = {
      starter: 'bg-gray-100 text-gray-800',
      professional: 'bg-blue-100 text-blue-800',
      enterprise: 'bg-purple-100 text-purple-800',
    }
    
    return (
      <Badge className={planColors[plan as keyof typeof planColors] || planColors.starter}>
        {plan}
      </Badge>
    )
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <RefreshCw className="w-8 h-8 animate-spin mx-auto mb-4 text-blue-600" />
          <p className="text-gray-600">Carregando dados do sistema...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <AlertTriangle className="w-8 h-8 mx-auto mb-4 text-red-600" />
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Erro de Acesso</h1>
          <p className="text-gray-600 mb-4">{error}</p>
          <Button onClick={loadData} className="bg-blue-600 hover:bg-blue-700">
            <RefreshCw className="w-4 h-4 mr-2" />
            Tentar Novamente
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center">
              <Shield className="w-8 h-8 text-blue-600 mr-3" />
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Administração do Sistema</h1>
                <p className="text-gray-600">Painel de controle global - Triaxia</p>
              </div>
            </div>
            <Button onClick={loadData} variant="outline">
              <RefreshCw className="w-4 h-4 mr-2" />
              Atualizar
            </Button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Estatísticas */}
        {stats && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-8">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total de Tenants</CardTitle>
                <Building className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats.totalTenants}</div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Tenants Ativos</CardTitle>
                <CheckCircle className="h-4 w-4 text-green-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-green-600">{stats.activeTenants}</div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total de Usuários</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats.totalUsers}</div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total de Vagas</CardTitle>
                <Activity className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats.totalJobs}</div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Receita (MRR)</CardTitle>
                <DollarSign className="h-4 w-4 text-green-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-green-600">
                  R$ {stats.revenue.toLocaleString('pt-BR')}
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Lista de Tenants */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Building className="w-5 h-5" />
              Gerenciamento de Tenants
            </CardTitle>
            <CardDescription>
              Visualize e gerencie todos os tenants do sistema
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-3 px-4 font-medium text-gray-900">Empresa</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-900">Slug</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-900">Domínio</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-900">Plano</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-900">Status</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-900">Usuários</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-900">Vagas</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-900">Criado em</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-900">Ações</th>
                  </tr>
                </thead>
                <tbody>
                  {loading ? (
                    <tr>
                      <td colSpan={9} className="py-8 text-center text-gray-500">
                        <RefreshCw className="w-6 h-6 animate-spin mx-auto mb-2" />
                        Carregando tenants...
                      </td>
                    </tr>
                  ) : tenants && tenants.length > 0 ? (
                    tenants.map((tenant) => (
                    <tr key={tenant.id} className="border-b hover:bg-gray-50">
                      <td className="py-3 px-4">
                        <div className="font-medium text-gray-900">{tenant.name}</div>
                      </td>
                      <td className="py-3 px-4">
                        <code className="bg-gray-100 px-2 py-1 rounded text-sm">{tenant.slug}</code>
                      </td>
                      <td className="py-3 px-4">
                        {tenant.domain ? (
                          <span className="text-blue-600">{tenant.domain}</span>
                        ) : (
                          <span className="text-gray-400">-</span>
                        )}
                      </td>
                      <td className="py-3 px-4">{getPlanBadge(tenant.plan)}</td>
                      <td className="py-3 px-4">{getStatusBadge(tenant.status)}</td>
                      <td className="py-3 px-4">
                        <span className="flex items-center gap-1">
                          <Users className="w-4 h-4 text-gray-400" />
                          {tenant._count.users}
                        </span>
                      </td>
                      <td className="py-3 px-4">
                        <span className="flex items-center gap-1">
                          <Activity className="w-4 h-4 text-gray-400" />
                          {tenant._count.jobs}
                        </span>
                      </td>
                      <td className="py-3 px-4">
                        <span className="text-sm text-gray-600">
                          {new Date(tenant.createdAt).toLocaleDateString('pt-BR')}
                        </span>
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-2">
                          <Button size="sm" variant="outline">
                            <Eye className="w-4 h-4" />
                          </Button>
                          <Button size="sm" variant="outline">
                            <Edit className="w-4 h-4" />
                          </Button>
                          <Button size="sm" variant="outline" className="text-red-600 hover:text-red-700">
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </td>
                    </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={9} className="py-8 text-center text-gray-500">
                        Nenhum tenant encontrado
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}