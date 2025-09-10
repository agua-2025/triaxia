import { NextRequest, NextResponse } from 'next/server';
import { validateAndUseActivationToken } from '@/lib/auth/activation-service';
import { validatePasswordSecurity } from '@/lib/auth/password-security';
import {
  logAccountActivation,
  logPasswordValidation,
  auditLogger,
} from '@/lib/audit/audit-logger';
import { prisma } from '@/lib/prisma';
import { createAdminClient } from '@/lib/supabase/admin';
import { getClientIP } from '@/lib/utils/ip';

/**
 * Ativa uma conta de usuário usando token de ativação
 * POST /api/auth/activate-account
 */
export async function POST(request: NextRequest) {
  const startTime = Date.now();
  const clientIp = getClientIP(request);
  const userAgent = request.headers.get('user-agent') || 'unknown';

  // Configurar contexto de auditoria
  auditLogger.setRequestContext({
    ipAddress: clientIp,
    userAgent,
    requestId: crypto.randomUUID(),
    timestamp: new Date(),
  });

  try {
    const { token, sessionId, password, confirmPassword } =
      await request.json();

    // Validações básicas de entrada
    if (!token && !sessionId) {
      return NextResponse.json(
        { error: 'Token de ativação ou session_id é obrigatório' },
        { status: 400 }
      );
    }

    const activationToken = token || sessionId;
    if (typeof activationToken !== 'string') {
      return NextResponse.json(
        { error: 'Token de ativação inválido' },
        { status: 400 }
      );
    }

    if (!password || typeof password !== 'string') {
      return NextResponse.json(
        { error: 'Senha é obrigatória' },
        { status: 400 }
      );
    }

    if (password !== confirmPassword) {
      return NextResponse.json(
        { error: 'Senhas não coincidem' },
        { status: 400 }
      );
    }

    // Validar e consumir token
    const tokenResult = await validateAndUseActivationToken({
      token: activationToken,
      usedFromIp: clientIp,
    });

    if (!tokenResult.isValid || !tokenResult.data) {
      return NextResponse.json(
        { error: tokenResult.error || 'Token inválido' },
        { status: 400 }
      );
    }

    const { email, userId, tenantId } = tokenResult.data;

    // Buscar dados do usuário e tenant para validação de senha
    const userData = await prisma.user.findUnique({
      where: { id: userId },
      include: {
        tenant: {
          select: { name: true },
        },
      },
    });

    if (!userData) {
      return NextResponse.json(
        { error: 'Usuário não encontrado' },
        { status: 404 }
      );
    }

    // Validação avançada de segurança da senha
    const passwordValidation = validatePasswordSecurity(password, {
      email: userData.email,
      name: userData.name || undefined,
      company: userData.tenant?.name || undefined,
    });

    if (!passwordValidation.isValid) {
      // Log de falha na validação de senha
      await logPasswordValidation({
        userId: userData.id,
        email: userData.email,
        success: false,
        score: passwordValidation.score,
        errors: passwordValidation.errors,
        warnings: passwordValidation.warnings,
        ipAddress: clientIp,
      });

      return NextResponse.json(
        {
          error: 'Senha não atende aos requisitos de segurança',
          details: {
            errors: passwordValidation.errors,
            warnings: passwordValidation.warnings,
            suggestions: passwordValidation.suggestions,
            score: passwordValidation.score,
          },
        },
        { status: 400 }
      );
    }

    // Log de validação de senha bem-sucedida
    await logPasswordValidation({
      userId: userData.id,
      email: userData.email,
      success: true,
      score: passwordValidation.score,
      warnings: passwordValidation.warnings,
      ipAddress: clientIp,
    });

    // Buscar usuário no banco
    const user = await prisma.user.findUnique({
      where: { id: userId },
      include: {
        tenant: {
          select: {
            id: true,
            name: true,
            slug: true,
            domain: true,
            settings: true,
            status: true,
          },
        },
      },
    });

    if (!user) {
      return NextResponse.json(
        { error: 'Usuário não encontrado' },
        { status: 404 }
      );
    }

    // Verificar se o tenant está ativo
    if (
      user.tenant.status === 'suspended' ||
      user.tenant.status === 'cancelled'
    ) {
      return NextResponse.json(
        { error: 'Conta suspensa. Entre em contato com o suporte.' },
        { status: 403 }
      );
    }

    // Criar ou atualizar usuário no Supabase Auth
    const supabaseAdmin = createAdminClient();
    let supabaseUserId: string;

    // Tenta criar o usuário
    const { data: supabaseCreationData, error: supabaseCreationError } =
      await supabaseAdmin.auth.admin.createUser({
        email: user.email,
        password: password,
        email_confirm: true, // Confirmar email automaticamente
      });

    if (supabaseCreationError) {
      // Se o usuário já existir, a ativação falha. O usuário deve usar "Esqueci a senha".
      if (supabaseCreationError.message.includes('User already registered')) {
        console.warn(
          `[Auth] Tentativa de ativar conta para usuário já existente no Supabase: ${user.email}`
        );
        return NextResponse.json(
          {
            error:
              'Esta conta já foi ativada. Se você esqueceu sua senha, por favor, use a opção "Esqueci minha senha" na tela de login.',
          },
          { status: 409 }
        ); // 409 Conflict
      }

      // Para outros erros de criação no Supabase
      console.error(
        'Erro ao criar usuário no Supabase Auth:',
        supabaseCreationError
      );
      await logAccountActivation({
        userId,
        tenantId,
        email,
        success: false,
        errorMessage: `Supabase create user failed: ${supabaseCreationError.message}`,
        ipAddress: clientIp,
      });
      return NextResponse.json(
        { error: 'Erro interno ao criar sua conta de acesso.' },
        { status: 500 }
      );
    } else {
      // Se a criação foi bem-sucedida
      supabaseUserId = supabaseCreationData.user.id;
      console.log(
        `[Auth] Usuário ${user.email} (ID: ${supabaseUserId}) criado com sucesso no Supabase.`
      );
    }

    // Atualizar usuário com dados de ativação
    const activatedUser = await prisma.user.update({
      where: { id: userId },
      data: {
        isActive: true,
        activatedAt: new Date(),
        supabaseUserId: supabaseUserId, // Armazenar ID do Supabase
        updatedAt: new Date(),
      },
      include: {
        tenant: {
          select: {
            id: true,
            name: true,
            slug: true,
            domain: true,
            settings: true,
          },
        },
      },
    });

    const duration = Date.now() - startTime;

    // Log de ativação bem-sucedida
    await logAccountActivation({
      userId,
      tenantId,
      email,
      success: true,
      passwordScore: passwordValidation.score,
      ipAddress: clientIp,
      duration,
    });

    // Log de auditoria detalhado
    console.log('Conta ativada com sucesso:', {
      userId: user.id,
      email: user.email,
      tenantId: user.tenantId,
      tenantSlug: user.tenant.slug,
      activatedAt: new Date().toISOString(),
      passwordScore: passwordValidation.score,
      duration,
      clientIp,
      userAgent,
    });

    // Retornar dados do usuário ativado
    return NextResponse.json({
      success: true,
      message: 'Conta ativada com sucesso',
      user: {
        id: activatedUser.id,
        email: activatedUser.email,
        name: activatedUser.name,
        role: activatedUser.role,
        tenantId: activatedUser.tenantId,
      },
      tenant: {
        id: activatedUser.tenant.id,
        name: activatedUser.tenant.name,
        slug: activatedUser.tenant.slug,
        domain: activatedUser.tenant.domain,
        settings: activatedUser.tenant.settings,
      },
    });
  } catch (error) {
    const duration = Date.now() - startTime;

    console.error('Erro na ativação da conta:', error);

    // Log de erro na ativação
    await logAccountActivation({
      userId: 'unknown',
      tenantId: 'unknown',
      email: 'unknown',
      success: false,
      errorMessage:
        error instanceof Error ? error.message : 'Erro desconhecido',
      ipAddress: clientIp,
      duration,
    });

    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 }
    );
  } finally {
    // Limpar contexto de auditoria
    auditLogger.clearRequestContext();
  }
}

// Método não permitido
export async function GET() {
  return NextResponse.json({ error: 'Método não permitido' }, { status: 405 });
}
