'use client'

import { useState, useEffect, useCallback } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { Plus, Search, MapPin, Briefcase, Clock, Users, Brain, MoreHorizontal, Eye, Edit, Trash2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { DashboardLayout } from '@/components/layout/dashboard-layout'
import { Loading } from '@/components/ui/loading'
import { EmptyState } from '@/components/ui/empty-state'

interface Position {
  id: string
  title: string
  description: string
  requiredSkills: string[]
  department: string | null
  workType: string
  minExperience: number
  salaryRange: string | null
  requiredEducation: string
  isActive: boolean
  urgency: string
  createdAt: string
  _count: {
    applications: number
  }
}

interface PositionsResponse {
  success: boolean
  data: {
    positions: Position[]
    total: number
    page: number
    totalPages: number
  }
}

export default function PositionsPage() {
  const { status } = useSession()
  const router = useRouter()
  const [positions, setPositions] = useState<Position[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState<string>('all')
  const [workTypeFilter, setWorkTypeFilter] = useState<string>('all')
  const [urgencyFilter, setUrgencyFilter] = useState<string>('all')
  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [total, setTotal] = useState(0)

  // Buscar vagas
  const fetchPositions = useCallback(async () => {
    try {
      setLoading(true)
      const params = new URLSearchParams({
        page: page.toString(),
        limit: '10',
        ...(searchTerm && { search: searchTerm }),
        ...(statusFilter !== 'all' && { status: statusFilter }),
        ...(workTypeFilter !== 'all' && { workType: workTypeFilter }),
        ...(urgencyFilter !== 'all' && { urgency: urgencyFilter })
      })

      const response = await fetch(`/api/positions?${params}`)
      const data: PositionsResponse = await response.json()

      if (data.success) {
        setPositions(data.data.positions)
        setTotal(data.data.total)
        setTotalPages(data.data.totalPages)
      }
    } catch (error) {
      console.error('Error fetching positions:', error)
    } finally {
      setLoading(false)
    }
  }, [page, searchTerm, statusFilter, workTypeFilter, urgencyFilter])

  useEffect(() => {
    if (status === 'authenticated') {
      fetchPositions()
    }
  }, [status, page, searchTerm, statusFilter, workTypeFilter, urgencyFilter, fetchPositions])

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/signin')
    }
  }, [status, router])



  // Função para obter cor da urgência
  const getUrgencyColor = (urgency: string) => {
    switch (urgency) {
      case 'HIGH': return 'bg-red-100 text-red-800'
      case 'MEDIUM': return 'bg-yellow-100 text-yellow-800'
      case 'LOW': return 'bg-green-100 text-green-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  // Função para formatar tipo de trabalho
  const formatWorkType = (workType: string) => {
    switch (workType) {
      case 'REMOTE': return 'Remoto'
      case 'HYBRID': return 'Híbrido'
      case 'ONSITE': return 'Presencial'
      default: return workType
    }
  }



  // Função para formatar urgência
  const formatUrgency = (urgency: string) => {
    switch (urgency) {
      case 'HIGH': return 'Alta'
      case 'MEDIUM': return 'Média'
      case 'LOW': return 'Baixa'
      default: return urgency
    }
  }



  if (status === 'loading' || loading) {
    return (
      <DashboardLayout>
        <Loading text="Carregando vagas..." />
      </DashboardLayout>
    )
  }

  if (status === 'unauthenticated') {
    return null
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Vagas</h1>
            <p className="text-muted-foreground">
              Gerencie suas vagas abertas e encontre os melhores candidatos
            </p>
          </div>
          <Button onClick={() => router.push('/positions/new')}>
            <Plus className="h-4 w-4 mr-2" />
            Nova Vaga
          </Button>
        </div>

        {/* Estatísticas */}
        <div className="grid gap-4 md:grid-cols-4">
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-2">
                <Briefcase className="h-4 w-4 text-blue-600" />
                <div>
                  <p className="text-2xl font-bold">{total}</p>
                  <p className="text-sm text-muted-foreground">Total de Vagas</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-green-600" />
                <div>
                  <p className="text-2xl font-bold">
                    {positions.filter(p => p.isActive).length}
                  </p>
                  <p className="text-sm text-muted-foreground">Vagas Ativas</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-2">
                <Users className="h-4 w-4 text-purple-600" />
                <div>
                  <p className="text-2xl font-bold">
                    {positions.reduce((acc, p) => acc + p._count.applications, 0)}
                  </p>
                  <p className="text-sm text-muted-foreground">Candidaturas</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-2">
                <Brain className="h-4 w-4 text-orange-600" />
                <div>
                  <p className="text-2xl font-bold">
                    {positions.filter(p => p.urgency === 'HIGH').length}
                  </p>
                  <p className="text-sm text-muted-foreground">Urgentes</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filtros */}
        <Card>
          <CardHeader>
            <CardTitle>Filtros</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-4">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Buscar vagas..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todos os Status</SelectItem>
                  <SelectItem value="ACTIVE">Ativa</SelectItem>
                  <SelectItem value="PAUSED">Pausada</SelectItem>
                  <SelectItem value="CLOSED">Fechada</SelectItem>
                </SelectContent>
              </Select>
              
              <Select value={workTypeFilter} onValueChange={setWorkTypeFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="Tipo de Trabalho" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todos os Tipos</SelectItem>
                  <SelectItem value="REMOTE">Remoto</SelectItem>
                  <SelectItem value="HYBRID">Híbrido</SelectItem>
                  <SelectItem value="ONSITE">Presencial</SelectItem>
                </SelectContent>
              </Select>
              
              <Select value={urgencyFilter} onValueChange={setUrgencyFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="Urgência" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todas as Urgências</SelectItem>
                  <SelectItem value="HIGH">Alta</SelectItem>
                  <SelectItem value="MEDIUM">Média</SelectItem>
                  <SelectItem value="LOW">Baixa</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Lista de Vagas */}
        {positions.length > 0 ? (
          <div className="space-y-4">
            {positions.map((position) => (
              <Card key={position.id} className="hover:shadow-md transition-shadow">
                <CardContent className="pt-6">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-start gap-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <h3 className="text-lg font-semibold">{position.title}</h3>
                            <Badge className={position.isActive ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}>
                              {position.isActive ? 'Ativa' : 'Inativa'}
                            </Badge>
                            <Badge className={getUrgencyColor(position.urgency)}>
                              {formatUrgency(position.urgency)}
                            </Badge>
                          </div>
                          
                          <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
                            {position.department && (
                              <span className="flex items-center gap-1">
                                <MapPin className="h-3 w-3" />
                                {position.department}
                              </span>
                            )}
                            <span className="flex items-center gap-1">
                              <Briefcase className="h-3 w-3" />
                              {formatWorkType(position.workType)}
                            </span>
                            <span className="flex items-center gap-1">
                              <Clock className="h-3 w-3" />
                              {position.minExperience} anos de experiência
                            </span>
                            <span className="flex items-center gap-1">
                              <Users className="h-3 w-3" />
                              {position._count.applications} candidaturas
                            </span>
                          </div>
                          
                          <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                            {position.description}
                          </p>
                          
                          <div className="flex items-center gap-4">
                            <div>
                              <span className="text-sm font-medium">
                                {position.salaryRange || 'Salário a combinar'}
                              </span>
                            </div>
                            
                            {position.requiredSkills.length > 0 && (
                              <div className="flex flex-wrap gap-1">
                                {position.requiredSkills.slice(0, 3).map((skill, index) => (
                                  <Badge key={index} variant="outline" className="text-xs">
                                    {skill}
                                  </Badge>
                                ))}
                                {position.requiredSkills.length > 3 && (
                                  <Badge variant="outline" className="text-xs">
                                    +{position.requiredSkills.length - 3}
                                  </Badge>
                                )}
                              </div>
                            )}
                          </div>
                        </div>
                        
                        <div className="flex items-center gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => router.push(`/positions/${position.id}/match`)}
                          >
                            <Brain className="h-4 w-4 mr-2" />
                            Matching IA
                          </Button>
                          
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="sm">
                                <MoreHorizontal className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem
                                onClick={() => router.push(`/positions/${position.id}`)}
                              >
                                <Eye className="h-4 w-4 mr-2" />
                                Ver Detalhes
                              </DropdownMenuItem>
                              <DropdownMenuItem
                                onClick={() => router.push(`/positions/${position.id}/edit`)}
                              >
                                <Edit className="h-4 w-4 mr-2" />
                                Editar
                              </DropdownMenuItem>
                              <DropdownMenuItem className="text-red-600">
                                <Trash2 className="h-4 w-4 mr-2" />
                                Excluir
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
            
            {/* Paginação */}
            {totalPages > 1 && (
              <div className="flex items-center justify-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setPage(page - 1)}
                  disabled={page === 1}
                >
                  Anterior
                </Button>
                <span className="text-sm text-muted-foreground">
                  Página {page} de {totalPages}
                </span>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setPage(page + 1)}
                  disabled={page === totalPages}
                >
                  Próxima
                </Button>
              </div>
            )}
          </div>
        ) : (
          <EmptyState
            icon={Briefcase}
            title="Nenhuma vaga encontrada"
            description="Comece criando sua primeira vaga para encontrar os melhores candidatos."
            action={{
              label: 'Criar Primeira Vaga',
              onClick: () => router.push('/positions/new')
            }}
          />
        )}
      </div>
    </DashboardLayout>
  )
}