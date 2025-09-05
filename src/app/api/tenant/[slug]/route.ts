import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

// Use Node.js runtime for Prisma compatibility
export const runtime = 'nodejs'

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params

    if (!slug) {
      return NextResponse.json(
        { error: 'Tenant slug is required' },
        { status: 400 }
      )
    }

    // Buscar dados da empresa/tenant
    const tenant = await prisma.tenant.findUnique({
      where: { slug },
      select: {
        id: true,
        name: true,
        slug: true,
        settings: true,
        createdAt: true,
        updatedAt: true
      }
    })

    if (!tenant) {
      return NextResponse.json(
        { error: 'Tenant not found' },
        { status: 404 }
      )
    }

    // Buscar vagas ativas do tenant
    const jobs = await prisma.job.findMany({
      where: {
        tenantId: tenant.id,
        status: 'ACTIVE'
      },
      select: {
        id: true,
        title: true,
        department: true,
        location: true,
        type: true,
        salary: true,
        description: true,
        requirements: true,
        benefits: true,
        createdAt: true
      },
      orderBy: {
        createdAt: 'desc'
      }
    })

    // Configurações padrão da empresa
    const defaultSettings = {
      name: tenant.name,
      description: 'Empresa inovadora focada em soluções tecnológicas avançadas',
      website: `https://${tenant.slug}.com.br`,
      email: `contato@${tenant.slug}.com.br`,
      phone: '+55 11 99999-9999',
      address: 'São Paulo, SP - Brasil',
      logo: '',
      primaryColor: '#3B82F6',
      secondaryColor: '#1E40AF',
      accentColor: '#10B981'
    }

    // Mesclar com configurações salvas
    const companySettings = {
      ...defaultSettings,
      ...(tenant.settings as any || {})
    }

    return NextResponse.json({
      company: companySettings,
      jobs: jobs.map(job => ({
        id: job.id,
        title: job.title,
        department: job.department || 'Geral',
        location: job.location || 'São Paulo, SP',
        type: job.type || 'CLT',
        salary: job.salary || 'A combinar',
        description: job.description || '',
        requirements: Array.isArray(job.requirements) ? job.requirements : [],
        benefits: Array.isArray(job.benefits) ? job.benefits : [],
        postedAt: job.createdAt.toISOString().split('T')[0]
      }))
    })
  } catch (error) {
    console.error('Error fetching tenant data:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}