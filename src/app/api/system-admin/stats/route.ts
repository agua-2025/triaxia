import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { requireSuperAdmin } from '@/lib/auth/super-admin'

export async function GET(request: NextRequest) {
  // Verificar se o usuário é SUPER_ADMIN
  const authError = await requireSuperAdmin(request)
  if (authError) {
    return authError
  }

  try {
    // Buscar estatísticas do sistema
    const [tenantStats, userCount, jobCount] = await Promise.all([
      // Estatísticas de tenants
      prisma.tenant.groupBy({
        by: ['status'],
        _count: {
          id: true,
        },
      }),
      
      // Total de usuários
      prisma.user.count(),
      
      // Total de vagas
      prisma.job.count(),
    ])

    // Calcular totais
    const totalTenants = tenantStats.reduce((sum, stat) => sum + stat._count.id, 0)
    const activeTenants = tenantStats.find(stat => stat.status === 'active')?._count.id || 0
    
    // Calcular receita estimada (baseado nos planos)
    const tenantPlans = await prisma.tenant.groupBy({
      by: ['plan', 'status'],
      _count: {
        id: true,
      },
      where: {
        status: {
          in: ['active', 'trial']
        }
      }
    })

    // Preços dos planos (em centavos)
    const planPrices = {
      starter: 29900, // R$ 299,00
      professional: 49900, // R$ 499,00
      enterprise: 127500, // R$ 1.275,00
    }

    const revenue = tenantPlans.reduce((sum, planStat) => {
      if (planStat.status === 'active') {
        const price = planPrices[planStat.plan as keyof typeof planPrices] || 0
        return sum + (price * planStat._count.id)
      }
      return sum
    }, 0)

    const stats = {
      totalTenants,
      activeTenants,
      totalUsers: userCount,
      totalJobs: jobCount,
      revenue: Math.round(revenue / 100), // Converter para reais
      tenantsByStatus: tenantStats.reduce((acc, stat) => {
        acc[stat.status] = stat._count.id
        return acc
      }, {} as Record<string, number>),
      tenantsByPlan: tenantPlans.reduce((acc, stat) => {
        if (!acc[stat.plan]) acc[stat.plan] = 0
        acc[stat.plan] += stat._count.id
        return acc
      }, {} as Record<string, number>)
    }

    return NextResponse.json(stats)
  } catch (error) {
    console.error('Erro ao buscar estatísticas do sistema:', error)
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 }
    )
  }
}