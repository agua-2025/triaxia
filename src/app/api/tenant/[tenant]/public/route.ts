import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

interface Params {
  params: Promise<{ tenant: string }>
}

export async function GET(_req: NextRequest, { params }: Params) {
  try {
    const { tenant } = await params
    
    if (!tenant) {
      return NextResponse.json(
        { error: 'Tenant é obrigatório' },
        { status: 400 }
      )
    }

    // Buscar configurações diretamente do banco em vez de fetch interno
    const tenantData = await prisma.tenant.findUnique({
      where: { slug: tenant },
      select: {
        id: true,
        name: true,
        slug: true,
        description: true,
        website: true,
        email: true,
        phone: true,
        address: true,
        logo: true,
        favicon: true,
        primaryColor: true,
        secondaryColor: true,
        accentColor: true,
        settings: true
      }
    })

    // Buscar vagas ativas do tenant
    let jobs: any[] = []
    if (tenantData) {
      const rawJobs = await prisma.job.findMany({
        where: { 
          tenantId: tenantData.id,
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

      // Converter dados para o formato esperado pela interface
      jobs = rawJobs.map(job => ({
        ...job,
        requirements: Array.isArray(job.requirements) ? job.requirements : [],
        benefits: Array.isArray(job.benefits) ? job.benefits : [],
        postedAt: job.createdAt.toISOString()
      }))
    }

    // Combinar dados do banco com configurações
    const finalTenantData = {
      // Dados básicos do tenant
      ...(tenantData || {}),
      // Configurações personalizadas do campo settings
      ...(tenantData?.settings as Record<string, any> || {}),
      // Garantir que sempre tenha o slug
      slug: tenant,
      // Adicionar vagas formatadas
      jobs
    }

    return NextResponse.json({
      success: true,
      tenant: finalTenantData
    })

  } catch (error) {
    console.error('Erro ao buscar dados públicos do tenant:', error)
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 }
    )
  }
}