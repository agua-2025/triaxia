import { NextRequest, NextResponse } from 'next/server'
import { validateActivationToken } from '@/lib/auth/activation-tokens'
import { prisma } from '@/lib/prisma'

/**
 * Valida um token de ativação sem consumi-lo
 * POST /api/auth/validate-activation-token
 */
export async function POST(request: NextRequest) {
  try {
    const { token } = await request.json()
    
    if (!token || typeof token !== 'string') {
      return NextResponse.json(
        { error: 'Token é obrigatório' },
        { status: 400 }
      )
    }
    
    // Validar formato JWT do token
    const decoded = validateActivationToken(token)
    if (!decoded) {
      return NextResponse.json(
        { error: 'Token inválido ou expirado' },
        { status: 400 }
      )
    }
    
    // Buscar informações do token no banco
    const tokenHash = require('crypto').createHash('sha256').update(token).digest('hex')
    const tokenInfo = await prisma.activationToken.findUnique({
      where: { tokenHash }
    })
    
    if (!tokenInfo) {
      return NextResponse.json(
        { error: 'Token não encontrado' },
        { status: 404 }
      )
    }
    
    // Verificar se já foi usado
    if (tokenInfo.isUsed) {
      return NextResponse.json(
        { error: 'Token já foi utilizado' },
        { status: 400 }
      )
    }
    
    // Verificar expiração
    if (tokenInfo.expiresAt < new Date()) {
      return NextResponse.json(
        { error: 'Token expirado' },
        { status: 400 }
      )
    }
    
    // Buscar dados do usuário e tenant
    const user = await prisma.user.findUnique({
      where: { id: tokenInfo.userId },
      include: {
        tenant: {
          select: {
            id: true,
            name: true,
            slug: true,
            domain: true,
            settings: true
          }
        }
      }
    })
    
    if (!user) {
      return NextResponse.json(
        { error: 'Usuário não encontrado' },
        { status: 404 }
      )
    }
    
    // Retornar dados para o frontend
    return NextResponse.json({
      valid: true,
      data: {
        email: user.email,
        name: user.name,
        userId: user.id,
        tenantId: user.tenantId,
        tenantName: user.tenant.name,
        tenantSlug: user.tenant.slug,
        role: user.role
      }
    })
    
  } catch (error) {
    console.error('Erro ao validar token de ativação:', error)
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 }
    )
  }
}

// Método não permitido
export async function GET() {
  return NextResponse.json(
    { error: 'Método não permitido' },
    { status: 405 }
  )
}