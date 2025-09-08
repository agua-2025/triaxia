import { prisma } from '@/lib/prisma';
import crypto from 'crypto';

// Tipos de eventos de auditoria
export enum AuditEventType {
  // Eventos de ativação
  ACTIVATION_TOKEN_GENERATED = 'activation.token_generated',
  ACTIVATION_TOKEN_VALIDATED = 'activation.token_validated',
  ACTIVATION_TOKEN_USED = 'activation.token_used',
  ACTIVATION_TOKEN_EXPIRED = 'activation.token_expired',
  ACTIVATION_TOKEN_INVALIDATED = 'activation.token_invalidated',

  // Eventos de conta
  ACCOUNT_ACTIVATION_STARTED = 'account.activation_started',
  ACCOUNT_ACTIVATION_COMPLETED = 'account.activation_completed',
  ACCOUNT_ACTIVATION_FAILED = 'account.activation_failed',

  // Eventos de senha
  PASSWORD_VALIDATION_FAILED = 'password.validation_failed',
  PASSWORD_CREATED = 'password.created',
  PASSWORD_STRENGTH_WARNING = 'password.strength_warning',

  // Eventos de email
  ACTIVATION_EMAIL_SENT = 'email.activation_sent',
  ACTIVATION_EMAIL_FAILED = 'email.activation_failed',

  // Eventos de segurança
  SUSPICIOUS_ACTIVITY = 'security.suspicious_activity',
  RATE_LIMIT_EXCEEDED = 'security.rate_limit_exceeded',
  INVALID_TOKEN_ATTEMPT = 'security.invalid_token_attempt',

  // Eventos de sistema
  WEBHOOK_PROCESSED = 'system.webhook_processed',
  USER_CREATED = 'system.user_created',
  TENANT_CREATED = 'system.tenant_created',
}

export enum AuditSeverity {
  LOW = 'low',
  MEDIUM = 'medium',
  HIGH = 'high',
  CRITICAL = 'critical',
}

export interface AuditLogData {
  eventType: AuditEventType;
  severity: AuditSeverity;
  userId?: string;
  tenantId?: string;
  email?: string;
  ipAddress?: string;
  userAgent?: string;
  sessionId?: string;
  metadata?: Record<string, any>;
  success: boolean;
  errorMessage?: string;
  duration?: number;
  resourceId?: string;
  resourceType?: string;
}

export interface RequestContext {
  ipAddress?: string;
  userAgent?: string;
  sessionId?: string;
  requestId?: string;
  timestamp?: Date;
}

export class AuditLogger {
  private static instance: AuditLogger;
  private requestContext: RequestContext = {};

  private constructor() {}

  public static getInstance(): AuditLogger {
    if (!AuditLogger.instance) {
      AuditLogger.instance = new AuditLogger();
    }
    return AuditLogger.instance;
  }

  public setRequestContext(context: RequestContext): void {
    this.requestContext = {
      ...context,
      timestamp: context.timestamp || new Date(),
    };
  }

  public clearRequestContext(): void {
    this.requestContext = {};
  }

  /**
   * IMPORTANTE:
   * Seu schema de `webhook_events` tem apenas: id, type, createdAt.
   * Logo, aqui gravamos SOMENTE esses campos (compatível com seu banco),
   * e deixamos o restante do conteúdo no console (útil em dev).
   * Se quiser persistir JSON completo, crie depois um model `AuditLog`
   * próprio com coluna `data Json`.
   */
  public async log(data: AuditLogData): Promise<void> {
    const now = new Date();
    const id = crypto.randomUUID();

    // Estrutura completa (apenas para console/telemetria; não vai para o DB atual)
    const auditEntry = {
      id,
      eventType: data.eventType,
      severity: data.severity,
      userId: data.userId ?? null,
      tenantId: data.tenantId ?? null,
      email: data.email ?? null,
      ipAddress: data.ipAddress ?? this.requestContext.ipAddress ?? null,
      userAgent: data.userAgent ?? this.requestContext.userAgent ?? null,
      sessionId: data.sessionId ?? this.requestContext.sessionId ?? null,
      success: data.success,
      errorMessage: data.errorMessage ?? null,
      duration: data.duration ?? null,
      resourceId: data.resourceId ?? null,
      resourceType: data.resourceType ?? null,
      metadata: {
        ...(data.metadata || {}),
        requestId: this.requestContext.requestId,
        timestamp: (this.requestContext.timestamp || now).toISOString(),
      },
      createdAt: now,
    };

    try {
      // Persistência mínima compatível com seu schema:
      await prisma.webhookEvent.create({
        data: {
          id, // ✅ agora passamos `id` (obrigatório)
          type: data.eventType,
          createdAt: now,
        },
      });
    } catch (err) {
      // Nunca quebre a operação principal por causa do log
      console.warn('[audit] falha ao persistir (ignorada):', err);
    }

    // Log no console para inspeção (útil em DEV)
    if (process.env.NODE_ENV !== 'production') {
      console.log('🔍 Audit Log (console only payload):', auditEntry);
    }

    // Alertas críticos (não dependem do DB)
    if (data.severity === AuditSeverity.CRITICAL) {
      await this.handleCriticalEvent(auditEntry);
    }
  }

  public async logTokenGenerated(data: {
    userId: string;
    tenantId: string;
    email: string;
    tokenHash: string;
    expiresAt: Date;
    ipAddress?: string;
  }): Promise<void> {
    await this.log({
      eventType: AuditEventType.ACTIVATION_TOKEN_GENERATED,
      severity: AuditSeverity.MEDIUM,
      userId: data.userId,
      tenantId: data.tenantId,
      email: data.email,
      ipAddress: data.ipAddress,
      success: true,
      resourceId: data.tokenHash,
      resourceType: 'activation_token',
      metadata: {
        expiresAt: data.expiresAt.toISOString(),
        tokenHash: data.tokenHash.slice(0, 8) + '...',
      },
    });
  }

  public async logTokenValidation(data: {
    tokenHash: string;
    success: boolean;
    userId?: string;
    tenantId?: string;
    email?: string;
    errorMessage?: string;
    ipAddress?: string;
  }): Promise<void> {
    await this.log({
      eventType: AuditEventType.ACTIVATION_TOKEN_VALIDATED,
      severity: data.success ? AuditSeverity.LOW : AuditSeverity.HIGH,
      userId: data.userId,
      tenantId: data.tenantId,
      email: data.email,
      ipAddress: data.ipAddress,
      success: data.success,
      errorMessage: data.errorMessage,
      resourceId: data.tokenHash,
      resourceType: 'activation_token',
      metadata: { tokenHash: data.tokenHash.slice(0, 8) + '...' },
    });
  }

  public async logAccountActivation(data: {
    userId: string;
    tenantId: string;
    email: string;
    success: boolean;
    passwordScore?: number;
    errorMessage?: string;
    ipAddress?: string;
    duration?: number;
  }): Promise<void> {
    await this.log({
      eventType: data.success
        ? AuditEventType.ACCOUNT_ACTIVATION_COMPLETED
        : AuditEventType.ACCOUNT_ACTIVATION_FAILED,
      severity: data.success ? AuditSeverity.MEDIUM : AuditSeverity.HIGH,
      userId: data.userId,
      tenantId: data.tenantId,
      email: data.email,
      ipAddress: data.ipAddress,
      success: data.success,
      errorMessage: data.errorMessage,
      duration: data.duration,
      resourceId: data.userId,
      resourceType: 'user_account',
      metadata: {
        passwordScore: data.passwordScore,
        activationTimestamp: new Date().toISOString(),
      },
    });
  }

  public async logEmailSent(data: {
    userId: string;
    tenantId: string;
    email: string;
    success: boolean;
    errorMessage?: string;
    emailProvider?: string;
  }): Promise<void> {
    await this.log({
      eventType: data.success
        ? AuditEventType.ACTIVATION_EMAIL_SENT
        : AuditEventType.ACTIVATION_EMAIL_FAILED,
      severity: data.success ? AuditSeverity.LOW : AuditSeverity.MEDIUM,
      userId: data.userId,
      tenantId: data.tenantId,
      email: data.email,
      success: data.success,
      errorMessage: data.errorMessage,
      resourceId: data.email,
      resourceType: 'email',
      metadata: {
        emailProvider: data.emailProvider || 'smtp',
        sentAt: new Date().toISOString(),
      },
    });
  }

  public async logPasswordValidation(data: {
    userId?: string;
    email?: string;
    success: boolean;
    score?: number;
    errors?: string[];
    warnings?: string[];
    ipAddress?: string;
  }): Promise<void> {
    const severity = data.success
      ? data.score && data.score < 60
        ? AuditSeverity.MEDIUM
        : AuditSeverity.LOW
      : AuditSeverity.HIGH;

    await this.log({
      eventType: data.success
        ? AuditEventType.PASSWORD_CREATED
        : AuditEventType.PASSWORD_VALIDATION_FAILED,
      severity,
      userId: data.userId,
      email: data.email,
      ipAddress: data.ipAddress,
      success: data.success,
      metadata: {
        passwordScore: data.score,
        errors: data.errors,
        warnings: data.warnings,
        validatedAt: new Date().toISOString(),
      },
    });
  }

  public async logSuspiciousActivity(data: {
    userId?: string;
    email?: string;
    ipAddress?: string;
    activityType: string;
    description: string;
    metadata?: Record<string, any>;
  }): Promise<void> {
    await this.log({
      eventType: AuditEventType.SUSPICIOUS_ACTIVITY,
      severity: AuditSeverity.CRITICAL,
      userId: data.userId,
      email: data.email,
      ipAddress: data.ipAddress,
      success: false,
      errorMessage: data.description,
      metadata: {
        activityType: data.activityType,
        description: data.description,
        detectedAt: new Date().toISOString(),
        ...(data.metadata || {}),
      },
    });
  }

  private async handleCriticalEvent(auditEntry: any): Promise<void> {
    try {
      console.error('🚨 EVENTO CRÍTICO:', {
        type: auditEntry.eventType,
        userId: auditEntry.userId,
        email: auditEntry.email,
        ip: auditEntry.ipAddress,
        at: auditEntry.createdAt,
      });
      // aqui poderia enviar slack/email/siem etc.
    } catch (err) {
      console.error('Erro ao tratar evento crítico:', err);
    }
  }

  /**
   * Busca eventos básicos do `webhook_events`.
   * OBS: como a tabela só tem `id`, `type`, `createdAt`,
   * só dá para filtrar por `type` e intervalo de datas.
   */
  public async searchLogs(filters: {
    eventType?: AuditEventType;
    startDate?: Date;
    endDate?: Date;
    limit?: number;
    offset?: number;
  }) {
    try {
      const where: any = {};
      if (filters.eventType) where.type = filters.eventType;
      if (filters.startDate || filters.endDate) {
        where.createdAt = {};
        if (filters.startDate) where.createdAt.gte = filters.startDate;
        if (filters.endDate) where.createdAt.lte = filters.endDate;
      }

      const rows = await prisma.webhookEvent.findMany({
        where,
        orderBy: { createdAt: 'desc' },
        take: filters.limit ?? 100,
        skip: filters.offset ?? 0,
      });

      // devolvemos os campos que realmente existem
      return rows.map(r => ({
        id: r.id,
        type: r.type,
        createdAt: r.createdAt,
      }));
    } catch (err) {
      console.error('Erro ao buscar logs:', err);
      return [];
    }
  }
}

// Singleton
export const auditLogger = AuditLogger.getInstance();

// Helpers
export const logTokenGenerated = (
  data: Parameters<typeof auditLogger.logTokenGenerated>[0]
) => auditLogger.logTokenGenerated(data);

export const logTokenValidation = (
  data: Parameters<typeof auditLogger.logTokenValidation>[0]
) => auditLogger.logTokenValidation(data);

export const logAccountActivation = (
  data: Parameters<typeof auditLogger.logAccountActivation>[0]
) => auditLogger.logAccountActivation(data);

export const logEmailSent = (
  data: Parameters<typeof auditLogger.logEmailSent>[0]
) => auditLogger.logEmailSent(data);

export const logPasswordValidation = (
  data: Parameters<typeof auditLogger.logPasswordValidation>[0]
) => auditLogger.logPasswordValidation(data);

export const logSuspiciousActivity = (
  data: Parameters<typeof auditLogger.logSuspiciousActivity>[0]
) => auditLogger.logSuspiciousActivity(data);

export function withAuditContext<T extends any[], R>(
  fn: (...args: T) => Promise<R>,
  context: RequestContext
) {
  return async (...args: T): Promise<R> => {
    auditLogger.setRequestContext(context);
    try {
      return await fn(...args);
    } finally {
      auditLogger.clearRequestContext();
    }
  };
}
