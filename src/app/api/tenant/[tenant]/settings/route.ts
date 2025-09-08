import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { requireTenantPermission } from '@/lib/auth/tenant-permissions';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';
export const revalidate = 0;

type Params = { params: Promise<{ tenant: string }> };

const DEFAULTS = (slug: string, name: string) => ({
  name,
  description: 'Empresa inovadora focada em soluções tecnológicas avançadas',
  website: `https://${slug}.triaxia.com.br`,
  email: `contato@${slug}.triaxia.com.br`,
  phone: '+55 11 99999-9999',
  address: 'São Paulo, SP - Brasil',
  logo: '',
  favicon: '',
  primaryColor: '#3B82F6',
  secondaryColor: '#1E40AF',
  accentColor: '#10B981',
});

export async function GET(_req: NextRequest, { params }: Params) {
  try {
    const { tenant } = await params;
    if (!tenant)
      return NextResponse.json(
        { error: 'tenant is required' },
        { status: 400 }
      );

    const t = await prisma.tenant.findUnique({
      where: { slug: tenant },
      select: { slug: true, name: true, settings: true },
    });

    if (!t)
      return NextResponse.json(
        { settings: DEFAULTS(tenant, tenant) },
        { status: 200 }
      );

    const settings = {
      ...DEFAULTS(t.slug, t.name),
      ...((t.settings as Record<string, any> | null) ?? {}),
    };
    return NextResponse.json({ settings });
  } catch (e) {
    console.error('GET /settings error', e);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function PUT(req: NextRequest, { params }: Params) {
  try {
    const { tenant } = await params;
    if (!tenant)
      return NextResponse.json(
        { error: 'tenant is required' },
        { status: 400 }
      );

    const {
      user,
      tenantData,
      permissions,
      error: authError,
    } = await requireTenantPermission(req, tenant, 'canManageSettings');
    if (authError) return authError;

    const existing = await prisma.tenant.findUnique({
      where: { slug: tenant },
    });
    if (!existing) {
      return NextResponse.json(
        {
          error:
            'Tenant não encontrado. A criação é feita pelo provisionamento (webhook Stripe).',
        },
        { status: 404 }
      );
    }

    const body = await req.json();
    if (!body?.name || !body?.email) {
      return NextResponse.json(
        { error: 'Name and email are required' },
        { status: 400 }
      );
    }

    const updated = await prisma.tenant.update({
      where: { id: existing.id },
      data: {
        name: body.name ?? existing.name,
        settings: { ...((existing.settings as any) ?? {}), ...body },
      },
      select: { slug: true },
    });

    return NextResponse.json({ ok: true, tenant: updated.slug });
  } catch (e) {
    console.error('PUT /settings error', e);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
