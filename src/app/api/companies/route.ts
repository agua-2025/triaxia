import { NextResponse } from 'next/server'
import { prisma } from '@/lib/db'

// GET /api/companies - Listar empresas ativas
export async function GET() {
  try {
    const companies = await prisma.company.findMany({
      where: {
        isActive: true,
      },
      select: {
        id: true,
        name: true,
        subdomain: true,
        primaryColor: true,
      },
      orderBy: {
        name: 'asc',
      },
    })

    return NextResponse.json(companies)
  } catch (error) {
    console.error('Erro ao buscar empresas:', error)
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 }
    )
  }
}