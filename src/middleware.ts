// src/middleware.ts
import { createServerClient, type CookieOptions } from '@supabase/ssr';
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
  const response = NextResponse.next();
  
  // Headers básicos para CORS e segurança
  response.headers.set('X-Frame-Options', 'DENY');
  response.headers.set('X-Content-Type-Options', 'nosniff');
  
  return response;
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
};
