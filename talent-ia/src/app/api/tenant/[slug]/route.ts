import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'

export async function GET(
  request: NextRequest,
  { params }: { params: { slug: string } }
) {
  try {
    const { slug } = params

    if (!slug) {
      return NextResponse.json(
        { error: 'Slug do tenant é obrigatório' },
        { status: 400 }
      )
    }

    // Buscar tenant pelo slug
    const tenant = await db.tenant.findUnique({
      where: {
        slug: slug
      },
      select: {
        id: true,
        slug: true,
        name: true,
        subdomain: true,
        customDomain: true,
        primaryColor: true,
        secondaryColor: true,
        logo: true,
        favicon: true,
        status: true
      }
    })

    if (!tenant) {
      return NextResponse.json(
        { error: 'Tenant não encontrado' },
        { status: 404 }
      )
    }

    // Verificar se o tenant está ativo
    if (tenant.status !== 'ACTIVE') {
      return NextResponse.json(
        { error: 'Tenant não está ativo' },
        { status: 403 }
      )
    }

    return NextResponse.json(tenant)
  } catch (error) {
    console.error('Erro ao buscar tenant:', error)
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 }
    )
  }
}