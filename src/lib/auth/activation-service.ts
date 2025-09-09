import { prisma } from '@/lib/prisma';
import {
  generateActivationToken,
  hashToken,
  validateActivationToken,
  sanitizeActivationData,
  type ActivationData,
} from './activation-tokens';
import { randomUUID } from 'crypto';

type CreateActivationTokenParams = {
  email: string;
  userId: string;
  tenantId: string;
  expiresInHours?: number;
  createdFromIp?: string;
};

type ValidateActivationTokenParams = {
  token: string;
  usedFromIp?: string;
};

export async function createActivationToken(
  params: CreateActivationTokenParams
): Promise<string | null> {
  try {
    const sanitized = sanitizeActivationData({
      email: params.email,
      userId: params.userId,
      tenantId: params.tenantId,
    });
    if (!sanitized) return null;

    // opcional: reaproveitar token ativo caso exista (idempotência)
    const existingActive = await prisma.activationToken.findFirst({
      where: {
        email: sanitized.email,
        tenantId: sanitized.tenantId,
        isUsed: false,
        expiresAt: { gt: new Date() },
      },
      orderBy: { createdAt: 'desc' },
    });
    if (existingActive) {
      // não sabemos o token original (só o hash), então emitimos um novo
      // e invalidamos os antigos para ficar com 1 ativo
      await prisma.activationToken.updateMany({
        where: {
          email: sanitized.email,
          tenantId: sanitized.tenantId,
          isUsed: false,
          expiresAt: { gt: new Date() },
          id: { not: existingActive.id },
        },
        data: { isUsed: true, usedAt: new Date() },
      });
    }

    // sempre gere um novo token (JWT tem iat), e guarde o hash
    const expiresInHours = params.expiresInHours ?? 48;
    const token = generateActivationToken(sanitized, `${expiresInHours}h`);
    const tokenHash = hashToken(token);

    const expiresAt = new Date();
    expiresAt.setHours(expiresAt.getHours() + expiresInHours);

    try {
      await prisma.activationToken.create({
        data: {
          tokenHash,
          email: sanitized.email,
          userId: sanitized.userId,
          tenantId: sanitized.tenantId,
          expiresAt,
          createdFromIp: params.createdFromIp,
        },
      });
    } catch (e: any) {
      // concorrência ou Strict Mode chamando 2x no mesmo segundo
      if (e?.code === 'P2002') {
        // outro request acabou de criar o mesmo tokenHash – só reutiliza o token
        // (o primeiro insert já persistiu)
      } else {
        throw e;
      }
    }

    // log mínimo (sem usar webhook_events com schema incompatível)
    console.log('[activation] token criado para', sanitized.email);

    return token;
  } catch (err) {
    console.error('createActivationToken error:', err);
    return null;
  }
}

// Função para apenas validar o token sem consumi-lo
export async function validateActivationTokenOnly(
  params: { token: string }
) {
  try {
    const decoded = validateActivationToken(params.token);
    if (!decoded)
      return { isValid: false, error: 'Token inválido ou expirado' };

    const tokenHash = hashToken(params.token);
    const dbToken = await prisma.activationToken.findUnique({
      where: { tokenHash },
    });
    if (!dbToken) return { isValid: false, error: 'Token não encontrado' };
    if (dbToken.isUsed) return { isValid: false, error: 'Token já utilizado' };
    if (dbToken.expiresAt < new Date()) {
      return { isValid: false, error: 'Token expirado' };
    }
    if (
      dbToken.email !== decoded.email ||
      dbToken.userId !== decoded.userId ||
      dbToken.tenantId !== decoded.tenantId
    ) {
      return { isValid: false, error: 'Dados do token inconsistentes' };
    }

    return {
      isValid: true,
      data: {
        email: decoded.email,
        userId: decoded.userId,
        tenantId: decoded.tenantId,
      },
    };
  } catch (err) {
    console.error('validateActivationTokenOnly error:', err);
    return { isValid: false, error: 'Erro interno' };
  }
}

export async function validateAndUseActivationToken(
  params: ValidateActivationTokenParams
) {
  try {
    const decoded = validateActivationToken(params.token);
    if (!decoded)
      return { isValid: false, error: 'Token inválido ou expirado' };

    const tokenHash = hashToken(params.token);
    const dbToken = await prisma.activationToken.findUnique({
      where: { tokenHash },
    });
    if (!dbToken) return { isValid: false, error: 'Token não encontrado' };
    if (dbToken.isUsed) return { isValid: false, error: 'Token já utilizado' };
    if (dbToken.expiresAt < new Date()) {
      return { isValid: false, error: 'Token expirado' };
    }
    if (
      dbToken.email !== decoded.email ||
      dbToken.userId !== decoded.userId ||
      dbToken.tenantId !== decoded.tenantId
    ) {
      return { isValid: false, error: 'Dados do token inconsistentes' };
    }

    await prisma.activationToken.update({
      where: { id: dbToken.id },
      data: { isUsed: true, usedAt: new Date(), usedFromIp: params.usedFromIp },
    });

    return {
      isValid: true,
      data: {
        email: decoded.email,
        userId: decoded.userId,
        tenantId: decoded.tenantId,
      },
    };
  } catch (err) {
    console.error('validateAndUseActivationToken error:', err);
    return { isValid: false, error: 'Erro interno' };
  }
}
