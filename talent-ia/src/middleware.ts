import { NextRequest, NextResponse } from 'next/server'

export function middleware(request: NextRequest) {
  const hostname = request.nextUrl.hostname
  const subdomain = extractSubdomain(hostname)
  
  // Site principal (talentia.com ou localhost)
  if (!subdomain || subdomain === 'www') {
    return NextResponse.next()
  }
  
  // Portal do cliente (empresa.talentia.com)
  if (subdomain !== 'talentia') {
    // Rewrite para rota do tenant
    const url = new URL(`/tenant/${subdomain}${request.nextUrl.pathname}`, request.url)
    return NextResponse.rewrite(url)
  }
  
  return NextResponse.next()
}

function extractSubdomain(hostname: string): string | null {
  // Para desenvolvimento local (localhost:3000)
  if (hostname === 'localhost' || hostname.startsWith('127.0.0.1')) {
    return null
  }
  
  const parts = hostname.split('.')
  if (parts.length < 3) return null
  return parts[0]
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
}