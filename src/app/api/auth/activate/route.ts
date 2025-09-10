import { NextRequest, NextResponse } from 'next/server';
import { validateAndUseActivationToken, validateActivationTokenOnly } from '@/lib/auth/activation-service';
import { prisma } from '@/lib/prisma';
import bcrypt from 'bcryptjs';

export async function POST(request: NextRequest) {
  try {
    const { token, password } = await request.json();

    if (!token || !password) {
      return NextResponse.json(
        { error: 'Token e senha são obrigatórios' },
        { status: 400 }
      );
    }

    // Validar o token de ativação sem consumi-lo
    const validationResult = await validateActivationTokenOnly({ token });
    
    if (!validationResult.isValid || !validationResult.data) {
      return NextResponse.json(
        { error: validationResult.error || 'Token inválido ou expirado' },
        { status: 400 }
      );
    }

    const { userId, email, tenantId } = validationResult.data;

    return NextResponse.json({
      success: true,
      message: 'Token válido',
      data: { userId, email, tenantId },
    });
  } catch (error) {
    console.error('Erro na ativação:', error);
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 }
    );
  }
}

// Endpoint para validar apenas o token (sem ativar)
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const token = searchParams.get('token');

    if (!token) {
      return NextResponse.json(
        { error: 'Token é obrigatório' },
        { status: 400 }
      );
    }

    // Apenas validar o token sem usá-lo
    const validationResult = await validateActivationTokenOnly({ token });
    
    return NextResponse.json({
      isValid: validationResult.isValid,
      error: validationResult.error,
      data: validationResult.isValid ? validationResult.data : null,
    });
  } catch (error) {
    console.error('Erro na validação do token:', error);
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 }
    );
  }
}