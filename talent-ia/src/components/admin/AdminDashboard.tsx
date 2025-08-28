'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Badge } from '@/components/ui/badge'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Building2, Plus, Search, Edit, Eye, Settings, Users, BarChart3, User } from 'lucide-react'
import Link from 'next/link'
import { UserManagement } from './UserManagement'

// Mock data para demonstração
const mockTenants = [
  {
    id: '1',
    name: 'Microsoft Brasil',
    slug: 'microsoft',
    subdomain: 'microsoft.talentia.com',
    status: 'ACTIVE',
    plan: 'ENTERPRISE',
    createdAt: '2024-01-15',
    usersCount: 45,
    jobsCount: 12
  },
  {
    id: '2',
    name: 'Google Brasil',
    slug: 'google',
    subdomain: 'google.talentia.com',
    status: 'ACTIVE',
    plan: 'PROFESSIONAL',
    createdAt: '2024-01-10',
    usersCount: 32,
    jobsCount: 8
  },
  {
    id: '3',
    name: 'Startup XYZ',
    slug: 'startup-xyz',
    subdomain: 'startup-xyz.talentia.com',
    status: 'TRIAL',
    plan: 'BASIC',
    createdAt: '2024-01-08',
    usersCount: 5,
    jobsCount: 3
  }
]

const statusColors = {
  ACTIVE: 'bg-green-100 text-green-800',
  INACTIVE: 'bg-red-100 text-red-800',
  TRIAL: 'bg-yellow-100 text-yellow-800',
  SUSPENDED: 'bg-gray-100 text-gray-800'
}

const planColors = {
  BASIC: 'bg-blue-100 text-blue-800',
  PROFESSIONAL: 'bg-purple-100 text-purple-800',
  ENTERPRISE: 'bg-orange-100 text-orange-800'
}

export function AdminDashboard() {
  const [tenants, setTenants] = useState(mockTenants)
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false)
  const [activeTab, setActiveTab] = useState('tenants')
  const [newTenant, setNewTenant] = useState({
    name: '',
    slug: '',
    plan: 'BASIC'
  })

  // Filtrar tenants
  const filteredTenants = tenants.filter(tenant => {
    const matchesSearch = tenant.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         tenant.slug.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === 'all' || tenant.status === statusFilter
    return matchesSearch && matchesStatus
  })

  // Estatísticas
  const stats = {
    totalTenants: tenants.length,
    activeTenants: tenants.filter(t => t.status === 'ACTIVE').length,
    totalUsers: tenants.reduce((sum, t) => sum + t.usersCount, 0),
    totalJobs: tenants.reduce((sum, t) => sum + t.jobsCount, 0)
  }

  const handleCreateTenant = () => {
    // Em produção, fazer chamada para API
    const tenant = {
      id: Date.now().toString(),
      name: newTenant.name,
      slug: newTenant.slug,
      subdomain: `${newTenant.slug}.talentia.com`,
      status: 'TRIAL' as const,
      plan: newTenant.plan as 'BASIC' | 'PROFESSIONAL' | 'ENTERPRISE',
      createdAt: new Date().toISOString().split('T')[0],
      usersCount: 0,
      jobsCount: 0
    }
    
    setTenants([...tenants, tenant])
    setNewTenant({ name: '', slug: '', plan: 'BASIC' })
    setIsCreateDialogOpen(false)
  }

  return (
    <div className="p-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Painel Administrativo
        </h1>
        <p className="text-gray-600">
          Gerencie tenants, usuários e configurações da plataforma TalentIA
        </p>
      </div>

      {/* Estatísticas */}
      <div className="grid md:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total de Tenants</CardTitle>
            <Building2 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalTenants}</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Tenants Ativos</CardTitle>
            <BarChart3 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.activeTenants}</div>
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
            <Building2 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalJobs}</div>
          </CardContent>
        </Card>
      </div>

      {/* Navegação por Abas */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="tenants" className="flex items-center space-x-2">
            <Building2 className="h-4 w-4" />
            <span>Tenants</span>
          </TabsTrigger>
          <TabsTrigger value="users" className="flex items-center space-x-2">
            <User className="h-4 w-4" />
            <span>Usuários</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="tenants" className="space-y-6">
          {/* Filtros e Ações */}
          <Card className="mb-6">
            <CardHeader>
              <div className="flex justify-between items-center">
                <div>
                  <CardTitle>Gerenciar Tenants</CardTitle>
                  <CardDescription>
                    Visualize e gerencie todos os tenants da plataforma
                  </CardDescription>
                </div>
            <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
              <DialogTrigger asChild>
                <Button>
                  <Plus className="h-4 w-4 mr-2" />
                  Novo Tenant
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Criar Novo Tenant</DialogTitle>
                  <DialogDescription>
                    Adicione uma nova empresa à plataforma TalentIA
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="name">Nome da Empresa</Label>
                    <Input
                      id="name"
                      value={newTenant.name}
                      onChange={(e) => setNewTenant({...newTenant, name: e.target.value})}
                      placeholder="Ex: Microsoft Brasil"
                    />
                  </div>
                  <div>
                    <Label htmlFor="slug">Slug (Subdomínio)</Label>
                    <Input
                      id="slug"
                      value={newTenant.slug}
                      onChange={(e) => setNewTenant({...newTenant, slug: e.target.value})}
                      placeholder="Ex: microsoft"
                    />
                    <p className="text-sm text-gray-500 mt-1">
                      Será usado como: {newTenant.slug || 'slug'}.talentia.com
                    </p>
                  </div>
                  <div>
                    <Label htmlFor="plan">Plano</Label>
                    <Select value={newTenant.plan} onValueChange={(value) => setNewTenant({...newTenant, plan: value})}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="BASIC">Básico</SelectItem>
                        <SelectItem value="PROFESSIONAL">Profissional</SelectItem>
                        <SelectItem value="ENTERPRISE">Enterprise</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="flex justify-end space-x-2">
                    <Button variant="outline" onClick={() => setIsCreateDialogOpen(false)}>
                      Cancelar
                    </Button>
                    <Button onClick={handleCreateTenant}>
                      Criar Tenant
                    </Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex space-x-4 mb-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Buscar por nome ou slug..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Filtrar por status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos os status</SelectItem>
                <SelectItem value="ACTIVE">Ativo</SelectItem>
                <SelectItem value="INACTIVE">Inativo</SelectItem>
                <SelectItem value="TRIAL">Trial</SelectItem>
                <SelectItem value="SUSPENDED">Suspenso</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

          {/* Tabela de Tenants */}
          <Card>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Empresa</TableHead>
                    <TableHead>Subdomínio</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Plano</TableHead>
                    <TableHead>Usuários</TableHead>
                    <TableHead>Vagas</TableHead>
                    <TableHead>Criado em</TableHead>
                    <TableHead>Ações</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredTenants.map((tenant) => (
                    <TableRow key={tenant.id}>
                      <TableCell>
                        <div className="flex items-center space-x-3">
                          <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                            <Building2 className="h-4 w-4 text-blue-600" />
                          </div>
                          <div>
                            <div className="font-medium">{tenant.name}</div>
                            <div className="text-sm text-gray-500">{tenant.slug}</div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Link 
                          href={`http://${tenant.subdomain}`}
                          target="_blank"
                          className="text-blue-600 hover:underline"
                        >
                          {tenant.subdomain}
                        </Link>
                      </TableCell>
                      <TableCell>
                        <Badge className={statusColors[tenant.status as keyof typeof statusColors]}>
                          {tenant.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge className={planColors[tenant.plan as keyof typeof planColors]}>
                          {tenant.plan}
                        </Badge>
                      </TableCell>
                      <TableCell>{tenant.usersCount}</TableCell>
                      <TableCell>{tenant.jobsCount}</TableCell>
                      <TableCell>{new Date(tenant.createdAt).toLocaleDateString('pt-BR')}</TableCell>
                      <TableCell>
                        <div className="flex space-x-2">
                          <Button size="sm" variant="outline">
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button size="sm" variant="outline">
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button size="sm" variant="outline">
                            <Settings className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="users">
          <UserManagement />
        </TabsContent>
      </Tabs>
    </div>
  )
}