import { NextResponse, type NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  
  // Protege rotas críticas sem autenticação pesada
  const protectedRoutes = ['/dashboard', '/system-admin'];
  
  if (protectedRoutes.some(route => pathname.startsWith(route))) {
    // Verifica cookie básico de sessão (sem chamada async para Supabase)
    const hasSession = request.cookies.has('sb-access-token') || 
                      request.cookies.has('supabase-auth-token');
    
    if (!hasSession) {
      const loginUrl = new URL('/login', request.url);
      loginUrl.searchParams.set('redirect', pathname);
      return NextResponse.redirect(loginUrl);
    }
  }
  
  const response = NextResponse.next();
  
  // Headers básicos de segurança
  response.headers.set('X-Frame-Options', 'DENY');
  response.headers.set('X-Content-Type-Options', 'nosniff');
  response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');
  
  return response;
}

export const config = {
  matcher: [
    // Não processa arquivos estáticos
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
};