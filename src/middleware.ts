import { createServerClient } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'

// Configure Edge Runtime - Disabled for Stripe compatibility
// export const runtime = 'experimental-edge'

export async function getCurrentTenant(request: NextRequest) {
  // Extract tenant from subdomain or path
  const host = request.headers.get('host') ?? ''
  const url = new URL(request.url)
  
  // Check for subdomain (tenant.domain.com)
  const subdomain = host.split('.')[0]
  if (subdomain && subdomain !== 'www' && subdomain !== 'localhost') {
    return {
      tenantId: subdomain,
      tenantSlug: subdomain
    }
  }
  
  // Check for path-based tenant (/tenant/dashboard)
  const pathSegments = url.pathname.split('/')
  if (pathSegments[1] && pathSegments[1] !== 'api') {
    return {
      tenantId: pathSegments[1],
      tenantSlug: pathSegments[1]
    }
  }
  
  return null
}

export async function middleware(request: NextRequest) {
  // Skip middleware for Stripe webhook and checkout routes
  if (request.nextUrl.pathname.startsWith('/api/stripe/')) {
    return NextResponse.next()
  }

  const supabaseResponse = NextResponse.next({
    request,
  })

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll()
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) => {
            request.cookies.set(name, value)
            supabaseResponse.cookies.set(name, value, options)
          })
        },
      },
    }
  )

  // Get user session
  await supabase.auth.getUser()

  // Get tenant info
  const tenant = await getCurrentTenant(request)
  
  // Add tenant headers for API routes and pages
  if (tenant) {
    supabaseResponse.headers.set('x-tenant-id', tenant.tenantId)
    supabaseResponse.headers.set('x-tenant-slug', tenant.tenantSlug)
  }

  // Protect dashboard routes - TEMPORARILY DISABLED FOR DEVELOPMENT
  // if (request.nextUrl.pathname.startsWith('/dashboard')) {
  //   if (!user) {
  //     const redirectUrl = new URL('/login', request.url)
  //     return NextResponse.redirect(redirectUrl)
  //   }
  //   
  //   if (!tenant) {
  //     const redirectUrl = new URL('/select-tenant', request.url)
  //     return NextResponse.redirect(redirectUrl)
  //   }
  // }

  return supabaseResponse
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
}