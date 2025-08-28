import { withAuth } from 'next-auth/middleware'
import { NextResponse } from 'next/server'
import { getSubdomain, validateSubdomain } from '@/lib/auth'

export default withAuth(
  async function middleware(req) {
    const { pathname } = req.nextUrl
    const host = req.headers.get('host') || ''
    
    // Permitir acesso direto às rotas de auth
    if (pathname.startsWith('/auth')) {
      return NextResponse.next()
    }
    
    // Extrair subdomain
    const subdomain = getSubdomain(host)
    
    // Se não há subdomain e não é uma rota de auth, redirecionar para página de seleção de empresa
    if (!subdomain && !pathname.startsWith('/api')) {
      return NextResponse.redirect(new URL('/auth/select-company', req.url))
    }
    
    // Se há subdomain, validar se existe
    if (subdomain) {
      const isValidSubdomain = await validateSubdomain(subdomain)
      if (!isValidSubdomain) {
        return NextResponse.redirect(new URL('/auth/invalid-company', req.url))
      }
    }
    
    // Verificar se o usuário está tentando acessar uma rota protegida
    if (pathname.startsWith('/dashboard')) {
      // O token está disponível através do req.nextauth.token quando usando withAuth
      const token = req.nextauth?.token
      
      if (!token) {
        return NextResponse.redirect(new URL('/auth/signin', req.url))
      }
      
      // Verificar se o usuário pertence à empresa do subdomain
      if (subdomain && token.company?.subdomain !== subdomain) {
        return NextResponse.redirect(new URL('/auth/unauthorized', req.url))
      }
    }
    
    return NextResponse.next()
  },
  {
    callbacks: {
      authorized: ({ token, req }) => {
        const { pathname } = req.nextUrl
        
        // Permitir acesso às rotas públicas
        if (
          pathname.startsWith('/auth') ||
          pathname.startsWith('/api/auth') ||
          pathname === '/' ||
          pathname.startsWith('/_next') ||
          pathname.startsWith('/favicon')
        ) {
          return true
        }
        
        // Exigir autenticação para rotas do dashboard
        if (pathname.startsWith('/dashboard')) {
          return !!token
        }
        
        return true
      },
    },
  }
)

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
}