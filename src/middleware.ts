// src/middleware.ts
import { createServerClient } from '@supabase/ssr';
import { NextResponse, type NextRequest } from 'next/server';

// Domínio base para subdomínios de tenant (ex.: cliente.triaxia.com.br)
const TENANT_BASE_DOMAIN = 'triaxia.com.br';

// Prefixo opcional para tenants por caminho: /t/{slug}/...
const TENANT_PATH_PREFIX = '/t/';

function extractTenantFromSubdomain(host: string) {
  if (!host) return null;
  // Aceita somente hosts que terminam no domínio base
  if (!host.endsWith(TENANT_BASE_DOMAIN)) return null;

  const parts = host.split('.');
  const baseParts = TENANT_BASE_DOMAIN.split('.');
  if (parts.length <= baseParts.length) return null;

  // Subdomínio = tudo antes do domínio base
  const sub = parts.slice(0, parts.length - baseParts.length).join('.');

  // Ignora subdomínios comuns
  if (!sub || sub === 'www' || sub === 'app') return null;

  return { tenantId: sub, tenantSlug: sub };
}

function extractTenantFromPath(pathname: string) {
  // Só considera tenant quando o caminho começa com /t/{slug}/...
  if (!pathname.startsWith(TENANT_PATH_PREFIX)) return null;
  const rest = pathname.slice(TENANT_PATH_PREFIX.length); // remove "/t/"
  const slug = rest.split('/')[0];
  if (!slug) return null;
  return { tenantId: slug, tenantSlug: slug };
}

export async function middleware(request: NextRequest) {
  // Não interceptar rotas do Stripe (checkout/webhook/etc.)
  if (request.nextUrl.pathname.startsWith('/api/stripe/')) {
    return NextResponse.next();
  }

  const supabaseResponse = NextResponse.next({ request });

  // Supabase SSR (cookies)
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) => {
            request.cookies.set(name, value);
            supabaseResponse.cookies.set(name, value, options);
          });
        },
      },
    }
  );

  // Opcional: aquece a sessão (resultado não é usado aqui)
  await supabase.auth.getUser();

  const host = request.headers.get('host') ?? '';
  const pathname = request.nextUrl.pathname;

  // Preferência: subdomínio de triaxia.com.br; fallback: path /t/{slug}
  const tenant =
    extractTenantFromSubdomain(host) ?? extractTenantFromPath(pathname) ?? null;

  if (tenant) {
    supabaseResponse.headers.set('x-tenant-id', tenant.tenantId);
    supabaseResponse.headers.set('x-tenant-slug', tenant.tenantSlug);
  } else {
    // Garante que páginas globais não recebam cabeçalhos de tenant
    supabaseResponse.headers.delete('x-tenant-id');
    supabaseResponse.headers.delete('x-tenant-slug');
  }

  return supabaseResponse;
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
};
