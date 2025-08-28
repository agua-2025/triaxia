'use client'

import { useState, useEffect } from 'react'
import { useTenant, useBranding } from '@/contexts/TenantContext'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Search, MapPin, Clock, Briefcase, ArrowLeft, Building2 } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'

// Mock data para demonstração (em produção, viria da API)
const mockJobs = [
  {
    id: '1',
    title: 'Desenvolvedor Full Stack Senior',
    department: 'Tecnologia',
    location: 'São Paulo, SP',
    type: 'CLT',
    level: 'Senior',
    description: 'Buscamos um desenvolvedor experiente para liderar projetos de alta complexidade...',
    requirements: ['React', 'Node.js', 'TypeScript', 'PostgreSQL'],
    createdAt: '2024-01-15'
  },
  {
    id: '2',
    title: 'Product Manager',
    department: 'Produto',
    location: 'Remote',
    type: 'CLT',
    level: 'Pleno',
    description: 'Procuramos um Product Manager para definir estratégias de produto...',
    requirements: ['Product Management', 'Analytics', 'Agile', 'Figma'],
    createdAt: '2024-01-10'
  },
  {
    id: '3',
    title: 'UX/UI Designer',
    department: 'Design',
    location: 'Rio de Janeiro, RJ',
    type: 'PJ',
    level: 'Pleno',
    description: 'Buscamos um designer criativo para criar experiências incríveis...',
    requirements: ['Figma', 'Adobe Creative', 'User Research', 'Prototyping'],
    createdAt: '2024-01-08'
  }
]

export function TenantJobsPage() {
  const { tenant, isLoading } = useTenant()
  const branding = useBranding()
  const [searchTerm, setSearchTerm] = useState('')
  const [departmentFilter, setDepartmentFilter] = useState('all')
  const [locationFilter, setLocationFilter] = useState('all')
  const [filteredJobs, setFilteredJobs] = useState(mockJobs)

  // Filtrar vagas baseado nos critérios
  useEffect(() => {
    let filtered = mockJobs

    if (searchTerm) {
      filtered = filtered.filter(job => 
        job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        job.description.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }

    if (departmentFilter !== 'all') {
      filtered = filtered.filter(job => job.department === departmentFilter)
    }

    if (locationFilter !== 'all') {
      filtered = filtered.filter(job => job.location === locationFilter)
    }

    setFilteredJobs(filtered)
  }, [searchTerm, departmentFilter, locationFilter])

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Carregando vagas...</p>
        </div>
      </div>
    )
  }

  if (!tenant) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            Portal não encontrado
          </h1>
          <p className="text-gray-600">
            O portal solicitado não existe ou não está disponível.
          </p>
        </div>
      </div>
    )
  }

  const departments = [...new Set(mockJobs.map(job => job.department))]
  const locations = [...new Set(mockJobs.map(job => job.location))]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <Link href={`/tenant/${tenant.slug}`}>
                <Button variant="ghost" size="sm">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Voltar
                </Button>
              </Link>
              {tenant.logo && (
                <Image
                  src={tenant.logo}
                  alt={`${tenant.name} logo`}
                  width={32}
                  height={32}
                  className="rounded"
                />
              )}
              <div>
                <h1 className="text-lg font-bold" style={{ color: branding.primaryColor }}>
                  {tenant.name}
                </h1>
                <p className="text-sm text-gray-600">Vagas Disponíveis</p>
              </div>
            </div>
            <nav className="flex items-center space-x-4">
              <Link href={`/tenant/${tenant.slug}/login`}>
                <Button variant="outline">Entrar</Button>
              </Link>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Oportunidades na {tenant.name}
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Descubra vagas que combinam com seu perfil e dê o próximo passo na sua carreira.
            </p>
          </div>

          {/* Filtros */}
          <div className="bg-gray-50 rounded-lg p-6 mb-8">
            <div className="grid md:grid-cols-4 gap-4">
              <div className="md:col-span-2">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input
                    placeholder="Buscar por cargo ou palavra-chave..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              <Select value={departmentFilter} onValueChange={setDepartmentFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="Departamento" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todos os departamentos</SelectItem>
                  {departments.map(dept => (
                    <SelectItem key={dept} value={dept}>{dept}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select value={locationFilter} onValueChange={setLocationFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="Localização" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todas as localizações</SelectItem>
                  {locations.map(location => (
                    <SelectItem key={location} value={location}>{location}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
      </section>

      {/* Lista de Vagas */}
      <section className="pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-6 flex justify-between items-center">
            <h2 className="text-xl font-semibold text-gray-900">
              {filteredJobs.length} vaga{filteredJobs.length !== 1 ? 's' : ''} encontrada{filteredJobs.length !== 1 ? 's' : ''}
            </h2>
          </div>

          {filteredJobs.length === 0 ? (
            <div className="text-center py-12">
              <Briefcase className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                Nenhuma vaga encontrada
              </h3>
              <p className="text-gray-600">
                Tente ajustar os filtros ou buscar por outros termos.
              </p>
            </div>
          ) : (
            <div className="grid gap-6">
              {filteredJobs.map((job) => (
                <Card key={job.id} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <CardTitle className="text-xl mb-2">{job.title}</CardTitle>
                        <div className="flex flex-wrap gap-2 mb-3">
                          <Badge variant="secondary">
                            <Building2 className="h-3 w-3 mr-1" />
                            {job.department}
                          </Badge>
                          <Badge variant="outline">
                            <MapPin className="h-3 w-3 mr-1" />
                            {job.location}
                          </Badge>
                          <Badge variant="outline">
                            <Briefcase className="h-3 w-3 mr-1" />
                            {job.type}
                          </Badge>
                          <Badge variant="outline">
                            <Clock className="h-3 w-3 mr-1" />
                            {job.level}
                          </Badge>
                        </div>
                      </div>
                      <Button 
                        style={{ backgroundColor: branding.primaryColor }}
                        className="text-white"
                      >
                        Candidatar-se
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-base mb-4">
                      {job.description}
                    </CardDescription>
                    <div className="mb-4">
                      <h4 className="font-medium text-gray-900 mb-2">Requisitos:</h4>
                      <div className="flex flex-wrap gap-2">
                        {job.requirements.map((req, index) => (
                          <Badge key={index} variant="secondary" className="text-xs">
                            {req}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    <div className="text-sm text-gray-500">
                      Publicada em {new Date(job.createdAt).toLocaleDateString('pt-BR')}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p>&copy; 2024 {tenant.name}. Todos os direitos reservados.</p>
          <p className="mt-2 text-sm text-gray-400">
            Powered by <span style={{ color: branding.primaryColor }}>TalentIA</span>
          </p>
        </div>
      </footer>
    </div>
  )
}