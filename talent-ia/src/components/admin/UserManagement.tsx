'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Search, Plus, Edit, Trash2, Shield, User, Building } from 'lucide-react'

interface User {
  id: string
  name: string
  email: string
  role: 'ADMIN' | 'COMPANY_ADMIN' | 'RECRUITER' | 'CANDIDATE'
  tenant?: {
    name: string
    slug: string
  }
  status: 'ACTIVE' | 'INACTIVE' | 'PENDING'
  createdAt: string
  lastLogin?: string
}

// Mock data para demonstração
const mockUsers: User[] = [
  {
    id: '1',
    name: 'Administrador Sistema',
    email: 'admin@talentia.com',
    role: 'ADMIN',
    status: 'ACTIVE',
    createdAt: '2024-01-15',
    lastLogin: '2024-01-20'
  },
  {
    id: '2',
    name: 'RH Microsoft',
    email: 'hr@microsoft.com',
    role: 'COMPANY_ADMIN',
    tenant: { name: 'Microsoft Brasil', slug: 'microsoft' },
    status: 'ACTIVE',
    createdAt: '2024-01-16',
    lastLogin: '2024-01-19'
  },
  {
    id: '3',
    name: 'RH Google',
    email: 'hr@google.com',
    role: 'COMPANY_ADMIN',
    tenant: { name: 'Google Brasil', slug: 'google' },
    status: 'ACTIVE',
    createdAt: '2024-01-17',
    lastLogin: '2024-01-18'
  },
  {
    id: '4',
    name: 'João Silva',
    email: 'joao@exemplo.com',
    role: 'CANDIDATE',
    status: 'ACTIVE',
    createdAt: '2024-01-18'
  },
  {
    id: '5',
    name: 'Maria Santos',
    email: 'maria@startup.com',
    role: 'RECRUITER',
    tenant: { name: 'Startup Inovadora', slug: 'startup-inovadora' },
    status: 'PENDING',
    createdAt: '2024-01-19'
  }
]

const roleLabels = {
  ADMIN: 'Administrador',
  COMPANY_ADMIN: 'Admin Empresa',
  RECRUITER: 'Recrutador',
  CANDIDATE: 'Candidato'
}

const roleIcons = {
  ADMIN: Shield,
  COMPANY_ADMIN: Building,
  RECRUITER: User,
  CANDIDATE: User
}

const statusColors = {
  ACTIVE: 'bg-green-100 text-green-800',
  INACTIVE: 'bg-gray-100 text-gray-800',
  PENDING: 'bg-yellow-100 text-yellow-800'
}

const roleColors = {
  ADMIN: 'bg-purple-100 text-purple-800',
  COMPANY_ADMIN: 'bg-blue-100 text-blue-800',
  RECRUITER: 'bg-orange-100 text-orange-800',
  CANDIDATE: 'bg-gray-100 text-gray-800'
}

export function UserManagement() {
  const [users, setUsers] = useState<User[]>(mockUsers)
  const [searchTerm, setSearchTerm] = useState('')
  const [roleFilter, setRoleFilter] = useState<string>('all')
  const [statusFilter, setStatusFilter] = useState<string>('all')

  const filteredUsers = users.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.tenant?.name.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesRole = roleFilter === 'all' || user.role === roleFilter
    const matchesStatus = statusFilter === 'all' || user.status === statusFilter
    
    return matchesSearch && matchesRole && matchesStatus
  })

  const stats = {
    total: users.length,
    active: users.filter(u => u.status === 'ACTIVE').length,
    pending: users.filter(u => u.status === 'PENDING').length,
    admins: users.filter(u => u.role === 'ADMIN' || u.role === 'COMPANY_ADMIN').length
  }

  return (
    <div className="space-y-6">
      {/* Estatísticas */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total de Usuários</CardTitle>
            <User className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.total}</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Usuários Ativos</CardTitle>
            <div className="h-2 w-2 bg-green-500 rounded-full" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.active}</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pendentes</CardTitle>
            <div className="h-2 w-2 bg-yellow-500 rounded-full" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.pending}</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Administradores</CardTitle>
            <Shield className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.admins}</div>
          </CardContent>
        </Card>
      </div>

      {/* Filtros e Busca */}
      <Card>
        <CardHeader>
          <CardTitle>Gerenciar Usuários</CardTitle>
          <CardDescription>
            Visualize e gerencie todos os usuários da plataforma
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Buscar por nome, email ou empresa..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            
            <select
              value={roleFilter}
              onChange={(e) => setRoleFilter(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">Todos os Papéis</option>
              <option value="ADMIN">Administrador</option>
              <option value="COMPANY_ADMIN">Admin Empresa</option>
              <option value="RECRUITER">Recrutador</option>
              <option value="CANDIDATE">Candidato</option>
            </select>
            
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">Todos os Status</option>
              <option value="ACTIVE">Ativo</option>
              <option value="INACTIVE">Inativo</option>
              <option value="PENDING">Pendente</option>
            </select>
            
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              Novo Usuário
            </Button>
          </div>

          {/* Tabela de Usuários */}
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-4 font-medium">Usuário</th>
                  <th className="text-left p-4 font-medium">Papel</th>
                  <th className="text-left p-4 font-medium">Empresa</th>
                  <th className="text-left p-4 font-medium">Status</th>
                  <th className="text-left p-4 font-medium">Último Login</th>
                  <th className="text-left p-4 font-medium">Ações</th>
                </tr>
              </thead>
              <tbody>
                {filteredUsers.map((user) => {
                  const RoleIcon = roleIcons[user.role]
                  return (
                    <tr key={user.id} className="border-b hover:bg-gray-50">
                      <td className="p-4">
                        <div>
                          <div className="font-medium">{user.name}</div>
                          <div className="text-sm text-gray-500">{user.email}</div>
                        </div>
                      </td>
                      <td className="p-4">
                        <Badge className={`${roleColors[user.role]} flex items-center gap-1 w-fit`}>
                          <RoleIcon className="w-3 h-3" />
                          {roleLabels[user.role]}
                        </Badge>
                      </td>
                      <td className="p-4">
                        {user.tenant ? (
                          <div>
                            <div className="font-medium">{user.tenant.name}</div>
                            <div className="text-sm text-gray-500">{user.tenant.slug}</div>
                          </div>
                        ) : (
                          <span className="text-gray-400">-</span>
                        )}
                      </td>
                      <td className="p-4">
                        <Badge className={statusColors[user.status]}>
                          {user.status === 'ACTIVE' ? 'Ativo' : 
                           user.status === 'INACTIVE' ? 'Inativo' : 'Pendente'}
                        </Badge>
                      </td>
                      <td className="p-4">
                        {user.lastLogin ? (
                          <span className="text-sm">
                            {new Date(user.lastLogin).toLocaleDateString('pt-BR')}
                          </span>
                        ) : (
                          <span className="text-gray-400 text-sm">Nunca</span>
                        )}
                      </td>
                      <td className="p-4">
                        <div className="flex items-center gap-2">
                          <Button variant="ghost" size="sm">
                            <Edit className="w-4 h-4" />
                          </Button>
                          <Button variant="ghost" size="sm" className="text-red-600 hover:text-red-700">
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>

          {filteredUsers.length === 0 && (
            <div className="text-center py-8 text-gray-500">
              Nenhum usuário encontrado com os filtros aplicados.
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}