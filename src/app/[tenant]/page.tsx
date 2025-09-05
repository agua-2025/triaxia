'use client'

import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import Image from 'next/image'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { MapPin, DollarSign, Building2, Users, Calendar } from 'lucide-react'

interface Job {
  id: string
  title: string
  department: string
  location: string
  type: string
  salary: string
  description: string
  requirements: string[]
  benefits: string[]
  postedAt: string
}

interface CompanyData {
  name: string
  description: string
  website: string
  email: string
  phone: string
  address: string
  logo: string
  primaryColor: string
  secondaryColor: string
  accentColor: string
}

export default function TenantPublicPage() {
  const params = useParams()
  const tenantSlug = params?.tenant as string
  const [company, setCompany] = useState<CompanyData | null>(null)
  const [jobs, setJobs] = useState<Job[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedJob, setSelectedJob] = useState<Job | null>(null)

  useEffect(() => {
    async function fetchTenantData() {
      try {
        const response = await fetch(`/api/tenant/${tenantSlug}`)
        
        if (!response.ok) {
          throw new Error('Tenant not found')
        }
        
        const data = await response.json()
        setCompany(data.company)
        setJobs(data.jobs)
      } catch (error) {
        console.error('Error fetching tenant data:', error)
        // Fallback para dados de exemplo se a API falhar
        setCompany({
          name: 'Futura',
          description: 'Empresa inovadora focada em soluções tecnológicas avançadas',
          website: 'https://futura.com.br',
          email: 'contato@futura.com.br',
          phone: '+55 11 99999-9999',
          address: 'São Paulo, SP - Brasil',
          logo: '',
          primaryColor: '#3B82F6',
          secondaryColor: '#1E40AF',
          accentColor: '#10B981'
        })
        
        setJobs([
          {
            id: '1',
            title: 'Desenvolvedor Full Stack',
            department: 'Tecnologia',
            location: 'São Paulo, SP',
            type: 'CLT',
            salary: 'R$ 8.000 - R$ 12.000',
            description: 'Buscamos um desenvolvedor full stack experiente para integrar nossa equipe de tecnologia.',
            requirements: [
              'Experiência com React e Node.js',
              'Conhecimento em bancos de dados SQL',
              'Experiência com Git e metodologias ágeis'
            ],
            benefits: [
              'Vale refeição',
              'Plano de saúde',
              'Home office flexível'
            ],
            postedAt: '2024-01-15'
          }
        ])
      } finally {
        setLoading(false)
      }
    }

    if (tenantSlug) {
      fetchTenantData()
    }
  }, [tenantSlug])

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Carregando...</p>
        </div>
      </div>
    )
  }

  if (!company) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Empresa não encontrada</h1>
          <p className="text-gray-600">A empresa que você está procurando não existe ou não está disponível.</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header da Empresa */}
      <header 
        className="bg-white border-b border-gray-200 shadow-sm"
        style={{ borderBottomColor: company.primaryColor + '20' }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex items-center space-x-6">
            {company.logo ? (
              <Image src={company.logo} alt={company.name} width={64} height={64} className="h-16 w-16 rounded-lg" />
            ) : (
              <div 
                className="h-16 w-16 rounded-lg flex items-center justify-center text-white text-2xl font-bold"
                style={{ backgroundColor: company.primaryColor }}
              >
                {company.name.charAt(0)}
              </div>
            )}
            <div>
              <h1 className="text-3xl font-bold text-gray-900">{company.name}</h1>
              <p className="text-lg text-gray-600 mt-1">{company.description}</p>
              <div className="flex items-center space-x-4 mt-2 text-sm text-gray-500">
                <div className="flex items-center">
                  <MapPin className="h-4 w-4 mr-1" />
                  {company.address}
                </div>
                <div className="flex items-center">
                  <Building2 className="h-4 w-4 mr-1" />
                  {company.website}
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Lista de Vagas */}
          <div className="lg:col-span-2">
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Vagas Abertas</h2>
              <p className="text-gray-600">
                {jobs.length} {jobs.length === 1 ? 'vaga disponível' : 'vagas disponíveis'}
              </p>
            </div>

            <div className="space-y-4">
              {jobs.map((job) => (
                <Card 
                  key={job.id} 
                  className={`cursor-pointer transition-all duration-200 hover:shadow-md ${
                    selectedJob?.id === job.id ? 'ring-2' : ''
                  }`}
                  style={{ 
                    ringColor: selectedJob?.id === job.id ? company.primaryColor : 'transparent'
                  }}
                  onClick={() => setSelectedJob(job)}
                >
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="text-xl">{job.title}</CardTitle>
                        <CardDescription className="text-base mt-1">
                          {job.department} • {job.location}
                        </CardDescription>
                      </div>
                      <Badge 
                        variant="secondary"
                        style={{ backgroundColor: company.primaryColor + '10', color: company.primaryColor }}
                      >
                        {job.type}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center space-x-4 text-sm text-gray-600">
                      <div className="flex items-center">
                        <DollarSign className="h-4 w-4 mr-1" />
                        {job.salary}
                      </div>
                      <div className="flex items-center">
                        <Calendar className="h-4 w-4 mr-1" />
                        Publicada em {new Date(job.postedAt).toLocaleDateString('pt-BR')}
                      </div>
                    </div>
                    <p className="text-gray-700 mt-3 line-clamp-2">{job.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Detalhes da Vaga Selecionada */}
          <div className="lg:col-span-1">
            {selectedJob ? (
              <Card className="sticky top-8">
                <CardHeader>
                  <CardTitle>{selectedJob.title}</CardTitle>
                  <CardDescription>{selectedJob.department}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Descrição</h4>
                    <p className="text-gray-700 text-sm leading-relaxed">{selectedJob.description}</p>
                  </div>

                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Requisitos</h4>
                    <ul className="space-y-1">
                      {selectedJob.requirements.map((req, index) => (
                        <li key={index} className="text-sm text-gray-700 flex items-start">
                          <span className="text-green-500 mr-2">•</span>
                          {req}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Benefícios</h4>
                    <ul className="space-y-1">
                      {selectedJob.benefits.map((benefit, index) => (
                        <li key={index} className="text-sm text-gray-700 flex items-start">
                          <span className="text-blue-500 mr-2">•</span>
                          {benefit}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="pt-4 border-t">
                    <Button 
                      className="w-full"
                      style={{ backgroundColor: company.primaryColor }}
                    >
                      Candidatar-se
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ) : (
              <Card>
                <CardContent className="text-center py-12">
                  <Users className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Selecione uma vaga</h3>
                  <p className="text-gray-600">Clique em uma vaga para ver mais detalhes</p>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center text-gray-600">
            <p>© 2024 {company.name}. Todos os direitos reservados.</p>
            <p className="mt-2 text-sm">
              Contato: {company.email} • {company.phone}
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}