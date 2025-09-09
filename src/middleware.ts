import { NextResponse, type NextRequest } from 'next/server'

// Rotas públicas que não precisam de autenticação
const PUBLIC_ROUTES = [
  '/',
  '/login',
  '/register', 
  '/forgot-password',
  '/reset-password',
  '/activate',
  '/api/auth',
  '/api/stripe/webhook',
  '/pricing',
  '/about',
  '/contact',
  '/terms',
  '/privacy'
]

// Rotas que requerem SUPER_ADMIN
const SUPER_ADMIN_ROUTES = ['/system-admin']

// Rotas protegidas que requerem autenticação
const PROTECTED_ROUTES = ['/dashboard', '/profile', '/settings']

export async function middleware(request: NextRequest) {
  const { pathname, hostname, origin } = request.nextUrl
  
  // Criar response inicial
  let response = NextResponse.next()
  
  // === RESOLUÇÃO DE TENANT ===
  const tenantContext = resolveTenantContext(request)
  
  // === VERIFICAÇÃO DE ROTA PÚBLICA ===
  if (isPublicRoute(pathname)) {
    return addSecurityHeaders(response, tenantContext)
  }
  
  // === VERIFICAÇÃO DE AUTENTICAÇÃO ===
  const authResult = await verifyAuthentication(request)
  
  if (!authResult.isAuthenticated) {
    return redirectToLogin(request, pathname, tenantContext)
  }
  
  // === VERIFICAÇÃO DE SUPER ADMIN ===
  if (SUPER_ADMIN_ROUTES.some(route => pathname.startsWith(route))) {
    if (!authResult.isSuperAdmin) {
      const accessDeniedUrl = new URL('/login', request.url)
      accessDeniedUrl.searchParams.set('error', 'access_denied')
      accessDeniedUrl.searchParams.set('redirect', pathname)
      return NextResponse.redirect(accessDeniedUrl)
    }
  }
  
  // === VERIFICAÇÃO DE TENANT (para rotas com tenant) ===
  if (tenantContext.slug && PROTECTED_ROUTES.some(route => pathname.startsWith(route))) {
    const tenantCheck = await verifyTenantAccess(authResult, tenantContext)
    if (!tenantCheck.hasAccess) {
      const unauthorizedUrl = new URL('/login', request.url)
      unauthorizedUrl.searchParams.set('error', 'unauthorized')
      unauthorizedUrl.searchParams.set('tenant', tenantContext.slug)
      return NextResponse.redirect(unauthorizedUrl)
    }
  }
  
  // === REDIRECIONAMENTO INTELIGENTE ===
  response = handleIntelligentRedirects(request, authResult, tenantContext)
  
  // === ADICIONAR HEADERS DE CONTEXTO ===
  response = addContextHeaders(response, authResult, tenantContext)
  
  // === HEADERS DE SEGURANÇA ===
  return addSecurityHeaders(response, tenantContext)
}

// === FUNÇÕES AUXILIARES ===

interface TenantContext {
  slug: string | null
  id: string | null
  isSubdomain: boolean
  domain: string | null
}

interface AuthResult {
  isAuthenticated: boolean
  isSuperAdmin: boolean
  userEmail: string | null
  userId: string | null
}

/**
 * Resolve o contexto do tenant baseado no hostname e headers
 */
function resolveTenantContext(request: NextRequest): TenantContext {
  const { hostname } = request.nextUrl
  const tenantHeader = request.headers.get('x-tenant-id')
  
  // Verificar header primeiro (prioridade)
  if (tenantHeader) {
    return {
      slug: tenantHeader,
      id: null, // Será resolvido no server-side
      isSubdomain: false,
      domain: hostname
    }
  }
  
  // Verificar subdomain
  const parts = hostname.split('.')
  if (parts.length >= 3) {
    const subdomain = parts[0]
    
    // Ignorar subdomains especiais
    if (!['www', 'api', 'admin', 'app', 'staging', 'dev', 'localhost'].includes(subdomain)) {
      return {
        slug: subdomain,
        id: null,
        isSubdomain: true,
        domain: parts.slice(1).join('.')
      }
    }
  }
  
  // Verificar path-based tenant (/t/{slug})
  const pathMatch = request.nextUrl.pathname.match(/^\/t\/([^/]+)/)
  if (pathMatch) {
    return {
      slug: pathMatch[1],
      id: null,
      isSubdomain: false,
      domain: hostname
    }
  }
  
  return {
    slug: null,
    id: null,
    isSubdomain: false,
    domain: hostname
  }
}

/**
 * Verifica se a rota é pública
 */
function isPublicRoute(pathname: string): boolean {
  return PUBLIC_ROUTES.some(route => {
    if (route === '/') return pathname === '/'
    return pathname.startsWith(route)
  })
}

/**
 * Verifica autenticação usando cookies do Supabase
 */
async function verifyAuthentication(request: NextRequest): Promise<AuthResult> {
  try {
    // Verificar cookies de sessão do Supabase
    const accessTokenCookie = request.cookies.get('sb-access-token')
    const refreshTokenCookie = request.cookies.get('sb-refresh-token')
    
    // Se não há tokens, não está autenticado
    if (!accessTokenCookie && !refreshTokenCookie) {
      return {
        isAuthenticated: false,
        isSuperAdmin: false,
        userEmail: null,
        userId: null
      }
    }
    
    // Verificar se tem token válido
    const hasValidSession = !!(accessTokenCookie?.value || refreshTokenCookie?.value)
    
    if (!hasValidSession) {
      return {
        isAuthenticated: false,
        isSuperAdmin: false,
        userEmail: null,
        userId: null
      }
    }
    
    // Extrair informações básicas do token (sem fazer chamada async pesada)
    let userEmail: string | null = null
    let isSuperAdmin = false
    
    if (accessTokenCookie?.value) {
      try {
        // Decode JWT payload (sem verificação de assinatura no middleware)
        const payload = JSON.parse(atob(accessTokenCookie.value.split('.')[1]))
        userEmail = payload.email || null
        
        // Verificar se é super admin baseado no email
        isSuperAdmin = userEmail === 'vivendamirassol@gmail.com'
      } catch {
        // Se não conseguir decodificar, assume autenticado mas sem detalhes
      }
    }
    
    return {
      isAuthenticated: true,
      isSuperAdmin,
      userEmail,
      userId: null // Será resolvido no server-side se necessário
    }
  } catch (error) {
    console.error('[middleware] Erro na verificação de autenticação:', error)
    return {
      isAuthenticated: false,
      isSuperAdmin: false,
      userEmail: null,
      userId: null
    }
  }
}

/**
 * Verifica acesso ao tenant (simplificado para middleware)
 */
async function verifyTenantAccess(authResult: AuthResult, tenantContext: TenantContext): Promise<{ hasAccess: boolean }> {
  // No middleware, fazemos apenas verificações básicas
  // Verificações detalhadas de tenant são feitas no server-side
  
  if (!authResult.isAuthenticated || !tenantContext.slug) {
    return { hasAccess: false }
  }
  
  // Super admins têm acesso a tudo
  if (authResult.isSuperAdmin) {
    return { hasAccess: true }
  }
  
  // Para usuários normais, assumimos acesso (será verificado no server-side)
  // O middleware só bloqueia casos óbvios
  return { hasAccess: true }
}

/**
 * Redireciona para login com contexto apropriado
 */
function redirectToLogin(request: NextRequest, pathname: string, tenantContext: TenantContext): NextResponse {
  const loginUrl = new URL('/login', request.url)
  
  // Preservar o caminho atual para redirecionamento pós-login
  loginUrl.searchParams.set('redirect', pathname)
  
  // Adicionar contexto de tenant se disponível
  if (tenantContext.slug) {
    loginUrl.searchParams.set('tenant', tenantContext.slug)
  }
  
  return NextResponse.redirect(loginUrl)
}

/**
 * Lida com redirecionamentos inteligentes
 */
function handleIntelligentRedirects(request: NextRequest, authResult: AuthResult, tenantContext: TenantContext): NextResponse {
  const { pathname } = request.nextUrl
  
  // Permitir acesso à home page mesmo para usuários autenticados
  // Remover redirecionamento automático da rota '/'
  
  return NextResponse.next()
}

/**
 * Adiciona headers de contexto para uso no server-side
 */
function addContextHeaders(response: NextResponse, authResult: AuthResult, tenantContext: TenantContext): NextResponse {
  // Headers para o server-side usar
  if (tenantContext.slug) {
    response.headers.set('x-tenant-slug', tenantContext.slug)
  }
  
  if (tenantContext.isSubdomain) {
    response.headers.set('x-tenant-subdomain', 'true')
  }
  
  if (authResult.userEmail) {
    response.headers.set('x-user-email', authResult.userEmail)
  }
  
  if (authResult.isSuperAdmin) {
    response.headers.set('x-is-super-admin', 'true')
  }
  
  return response
}

/**
 * Adiciona headers de segurança completos
 */
function addSecurityHeaders(response: NextResponse, tenantContext: TenantContext): NextResponse {
  // Headers de segurança básicos
  response.headers.set('X-Frame-Options', 'DENY')
  response.headers.set('X-Content-Type-Options', 'nosniff')
  response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin')
  response.headers.set('X-XSS-Protection', '1; mode=block')
  
  // CSP básico
  const cspDirectives = [
    "default-src 'self'",
    "script-src 'self' 'unsafe-inline' 'unsafe-eval' *.stripe.com *.supabase.co",
    "style-src 'self' 'unsafe-inline' fonts.googleapis.com",
    "font-src 'self' fonts.gstatic.com",
    "img-src 'self' data: blob: *.supabase.co *.stripe.com",
    "connect-src 'self' *.supabase.co *.stripe.com api.huggingface.co",
    "frame-src 'self' *.stripe.com",
    "object-src 'none'",
    "base-uri 'self'",
    "form-action 'self'"
  ]
  
  response.headers.set('Content-Security-Policy', cspDirectives.join('; '))
  
  // Headers específicos do tenant
  if (tenantContext.slug) {
    response.headers.set('X-Tenant-Context', 'enabled')
  }
  
  // CORS headers para APIs
  response.headers.set('Access-Control-Allow-Origin', '*')
  response.headers.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
  response.headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-Tenant-ID')
  
  return response
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public files (images, icons, etc.)
     */
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico|js|css|woff|woff2|ttf|otf)$).*)',
  ],
}