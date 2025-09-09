export const runtime = 'nodejs';

import Stripe from 'stripe';
import { prisma } from '@/lib/prisma';
import { sendActivationEmail } from '@/lib/email/activation-email';
import {
  createActivationToken,
} from '@/lib/auth/activation-service';
import { NextResponse } from 'next/server';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2025-08-27.basil',
});

function ok(json: any, status = 200) {
  return new NextResponse(JSON.stringify(json), {
    status,
    headers: { 'Content-Type': 'application/json' },
  });
}

export async function POST(req: Request) {
  try {
    // session_id via body OU via query
    let session_id = '';
    try {
      const body = await req.json().catch(() => ({}) as any);
      session_id = body?.session_id ?? '';
    } catch {}
    if (!session_id) {
      const url = new URL(req.url);
      session_id = url.searchParams.get('session_id') ?? '';
    }
    if (!session_id) return ok({ error: 'Missing session_id' }, 400);

    // idempotência dedicada para finalize (não colidir com webhooks)
    const idemId = `finalize:${session_id}`;
    const already = await prisma.webhookEvent.findUnique({
      where: { id: idemId },
    });
    if (already) return ok({ ok: true, message: 'Already finalized' });

    const session = await stripe.checkout.sessions.retrieve(session_id);

    const isPaid =
      session.payment_status === 'paid' ||
      (session.mode === 'subscription' && session.status === 'complete');

    if (!isPaid) {
      // registra idempotência mesmo assim p/ não ficar martelando
      await prisma.webhookEvent.create({
        data: { id: idemId, type: 'finalize.not_paid' },
      });
      return ok({ ok: false, message: 'Session not paid/complete yet.' }, 202);
    }

    const tenantSlug =
      (session.metadata?.tenantSlug as string | undefined) ?? '';
    const plan = (session.metadata?.plan as string | undefined) ?? 'starter';

    // tenta localizar tenant - PRIORIZA tenantSlug para evitar reutilização incorreta
    let tenant = null;
    
    // 1. Primeiro, busca por tenantSlug se fornecido
    if (tenantSlug) {
      tenant = await prisma.tenant.findUnique({ where: { slug: tenantSlug } });
      // Se tenantSlug foi fornecido mas não encontrado, NÃO busca por outros critérios
      // para evitar reutilizar tenants existentes
    } else {
      // 2. Se não há tenantSlug definido, busca por customerId
      if (session.customer) {
        tenant = await prisma.tenant.findUnique({
          where: { customerId: String(session.customer) },
        });
      }
      
      // 3. Se ainda não encontrou, busca por subscriptionId
      if (!tenant && session.subscription) {
        tenant = await prisma.tenant.findUnique({
          where: { subscriptionId: String(session.subscription) },
        });
      }
    }

    // cria/atualiza tenant
    if (!tenant) {
      // Verifica se já existe um tenant com este customerId ou subscriptionId
      const existingTenantWithCustomer = session.customer 
        ? await prisma.tenant.findUnique({ where: { customerId: String(session.customer) } })
        : null;
      
      const existingTenantWithSubscription = session.subscription
        ? await prisma.tenant.findUnique({ where: { subscriptionId: String(session.subscription) } })
        : null;
      
      tenant = await prisma.tenant.create({
        data: {
          name: tenantSlug
            ? tenantSlug.charAt(0).toUpperCase() + tenantSlug.slice(1)
            : 'Empresa',
          slug: tenantSlug || `t-${session_id.slice(-8)}`,
          domain: `${tenantSlug || `t-${session_id.slice(-8)}`}.triaxia.com.br`,
          plan,
          status: 'active',
          // Só define customerId se não houver conflito
          customerId: existingTenantWithCustomer ? null : String(session.customer),
          // Só define subscriptionId se não houver conflito
          subscriptionId: existingTenantWithSubscription ? null : (session.subscription as string) || null,
          settings: {
            onboardingCompleted: false,
            setupStep: 'company_info',
          } as any,
        },
      });
    } else {
      tenant = await prisma.tenant.update({
        where: { id: tenant.id },
        data: {
          plan,
          status: 'active',
          customerId: String(session.customer),
          subscriptionId: (session.subscription as string) || null,
        },
      });
    }

    // Resolve email
    let email: string | undefined = session.customer_details?.email ?? undefined;
    
    if (!email && typeof session.customer === 'string') {
      const customer = await stripe.customers.retrieve(session.customer);
      if ('email' in customer) {
        email = customer.email ?? undefined;
      }
    }
    
    if (!email) {
      email = (session.metadata?.userEmail as string | undefined) ?? process.env.DEBUG_EMAIL_TO;
    }

    if (!email) {
      // registra idempotência para não martelar
      await prisma.webhookEvent.create({
        data: { id: idemId, type: 'finalize.no_email' },
      });
      return ok(
        { ok: false, message: 'Email not found for this session.' },
        202
      );
    }

    email = email.toLowerCase().trim();

    // Upsert do usuário (NÃO seta isActive aqui pra evitar conflito com schema)
    const user = await prisma.user.upsert({
      where: { email_tenantId: { email, tenantId: tenant.id } },
      create: {
        email,
        name: email.split('@')[0],
        role: 'ADMIN',
        tenantId: tenant.id,
      },
      update: {},
    });

    // Invalida tokens antigos e cria um novo com jti (feito dentro de createActivationToken)
    // Concorrência: se outra chamada gerou o mesmo tokenHash (raríssimo), captura P2002 e reaproveita o mais recente.
    let token: string | null = null;
    try {
      token = await createActivationToken({
        email,
        userId: user.id,
        tenantId: tenant.id,
        expiresInHours: 48,
        createdFromIp: 'success-page',
      });
    } catch (e: any) {
      // Se deu P2002 (tokenHash duplicado), pega o token ativo mais recente
      if (e?.code === 'P2002') {
        const existing = await prisma.activationToken.findFirst({
          where: {
            email,
            tenantId: tenant.id,
            isUsed: false,
            expiresAt: { gt: new Date() },
          },
          orderBy: { createdAt: 'desc' },
        });
        if (existing) {
          // não temos o token original (só hash). Gera um novo token extra e sobrescreve o antigo marcando-o como usado.
          // Mas para simplificar o fluxo do usuário, apenas sinalizamos sucesso sem reenviar email, pois o outro request já enviou.
          token = null;
        }
      } else {
        throw e;
      }
    }

    // Envia email apenas se geramos token agora
    if (token) {
      const sent = await sendActivationEmail({
        email,
        name: user.name || email.split('@')[0],
        tenantName: tenant.name,
        tenantSlug: tenant.slug,
        activationToken: token,
        expiresInHours: 48,
      });
      if (!sent.success) {
        // não falhar a finalização – apenas informar
        console.warn('[finalize] falha ao enviar email:', sent.error);
      }
    }

    // marca idempotência
    await prisma.webhookEvent.create({
      data: { id: idemId, type: 'finalize.ok' },
    });

    return ok({
      ok: true,
      message: token
        ? 'Finalizado e email de ativação enviado.'
        : 'Finalizado (email já havia sido enviado).',
      tenant: { id: tenant.id, slug: tenant.slug },
      user: { id: user.id, email: user.email },
    });
  } catch (err: any) {
    console.error('[finalize] ERROR:', err);
    return ok(
      { ok: false, error: 'Finalize failed', details: err?.message },
      500
    );
  }
}
