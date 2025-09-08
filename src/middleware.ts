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
  // Não interceptar rotas do Stripe (checkout/webhook/etc.)
  if (request.nextUrl.pathname.startsWith('/api/stripe/')) {
    return NextResponse.next();
  }

  const host = request.headers.get('host') ?? '';
  const pathname = request.nextUrl.pathname;

  // Verifica se é um subdomínio de tenant
  const tenantFromSubdomain = extractTenantFromSubdomain(host);
  
  // Se é um subdomínio de tenant e está acessando a raiz, redireciona para a página do tenant
  if (tenantFromSubdomain && pathname === '/') {
    const url = request.nextUrl.clone();
    url.pathname = `/${tenantFromSubdomain.tenantSlug}`;
    return NextResponse.rewrite(url);
  }

  const supabaseResponse = NextResponse.next({ request });

  // Supabase SSR (cookies)
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!.replace(/"/g, ''),
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!.replace(/"/g, ''),
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet: Array<{ name: string; value: string; options?: CookieOptions }>) {
          cookiesToSet.forEach(({ name, value, options }) => {
            request.cookies.set(name, value);
            supabaseResponse.cookies.set(name, value, options);
          });
        },
      },
    }
  );

  // Preferência: subdomínio de triaxia.com.br; fallback: path /t/{slug}
  let tenant = tenantFromSubdomain ?? extractTenantFromPath(pathname) ?? null;

  // Para desenvolvimento e produção: se acessando dashboard ou API sem tenant, usar 'genial' como padrão
  if (!tenant && (pathname.startsWith('/dashboard') || pathname.startsWith('/api/tenant/settings'))) {
    tenant = { tenantId: 'genial', tenantSlug: 'genial' };
  }

  // Define protected routes that require authentication
  const protectedRoutes = [
    '/dashboard',
    '/system-admin',
    '/onboarding'
  ];
  
  // Define public routes that should bypass auth checks
  const publicRoutes = [
    '/activate',
    '/login',
    '/pricing',
    '/pricing/success',
    '/pricing/cancel',
    '/purchase-success',
    '/',
    '/api/'
  ];
  
  // Check if current path is public (should bypass auth)
  const isPublicRoute = publicRoutes.some(route => pathname.startsWith(route));
  
  // Check if current path is protected
  const isProtectedRoute = protectedRoutes.some(route => 
    pathname.startsWith(route) || 
    (tenant && pathname.startsWith(`/${tenant.tenantSlug}/dashboard`)) ||
    (tenant && pathname.startsWith(`/${tenant.tenantSlug}/onboarding`))
  );
  
  // Skip auth check for API routes (they handle their own auth) and public routes
  const isApiRoute = pathname.startsWith('/api/');
  
  if (isProtectedRoute && !isApiRoute && !isPublicRoute) {
    // Check if user is authenticated and session is valid
    const { data: { session }, error } = await supabase.auth.getSession();
    
    if (error || !session || !session.user) {
      console.log('Usuário não autenticado ou sessão inválida, redirecionando para login');
      const loginUrl = new URL('/login', request.url);
      loginUrl.searchParams.set('redirect', pathname);
      if (tenant) {
        loginUrl.searchParams.set('tenant', tenant.tenantSlug);
      }
      return NextResponse.redirect(loginUrl);
    }
    
    // Check if session is expired
    if (session.expires_at && session.expires_at * 1000 < Date.now()) {
      console.log('Sessão expirada, fazendo logout automático');
      
      // Clear auth cookies
      const response = NextResponse.redirect(new URL('/login', request.url));
      response.cookies.delete('sb-access-token');
      response.cookies.delete('sb-refresh-token');
      
      // Try to sign out from Supabase
      try {
        await supabase.auth.signOut();
      } catch (signOutError) {
        console.error('Erro ao fazer logout:', signOutError);
      }
      
      return response;
    }
    
    console.log('Usuário autenticado:', session.user.email);
  } else {
    // Opcional: aquece a sessão para rotas não protegidas
    await supabase.auth.getUser();
  }

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
