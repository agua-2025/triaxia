import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { getCurrentTenant } from '@/lib/prisma'
import { createServerClient } from '@supabase/ssr'

// Use Node.js runtime for Prisma compatibility
export const runtime = 'nodejs'

export async function PUT(request: NextRequest) {
  try {
    const tenant = await getCurrentTenant(request)
    
    if (!tenant) {
      return NextResponse.json(
        { error: 'Tenant not found' },
        { status: 400 }
      )
    }

    // Verify user authentication
    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        cookies: {
          getAll() {
            return request.cookies.getAll()
          },
          setAll() {
            // No-op for API routes
          },
        },
      }
    )

    const { data: { user } } = await supabase.auth.getUser()
    
    if (!user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const body = await request.json()
    const { 
      name, 
      description, 
      website, 
      email, 
      phone, 
      address, 
      logo, 
      favicon, 
      primaryColor, 
      secondaryColor, 
      accentColor 
    } = body

    // Validate required fields
    if (!name || !email) {
      return NextResponse.json(
        { error: 'Name and email are required' },
        { status: 400 }
      )
    }

    // Update tenant settings
    const updatedTenant = await prisma.tenant.update({
      where: { slug: tenant },
      data: {
        name,
        settings: {
          name,
          description,
          website,
          email,
          phone,
          address,
          logo,
          favicon,
          primaryColor,
          secondaryColor,
          accentColor
        }
      }
    })

    return NextResponse.json({ 
      success: true, 
      tenant: updatedTenant 
    })
  } catch (error) {
    console.error('Error updating tenant settings:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

export async function GET(request: NextRequest) {
  try {
    const tenant = await getCurrentTenant(request)
    
    if (!tenant) {
      return NextResponse.json(
        { error: 'Tenant not found' },
        { status: 400 }
      )
    }

    // Get tenant settings
    const tenantData = await prisma.tenant.findUnique({
      where: { slug: tenant },
      select: {
        id: true,
        name: true,
        slug: true,
        settings: true
      }
    })

    if (!tenantData) {
      return NextResponse.json(
        { error: 'Tenant not found' },
        { status: 404 }
      )
    }

    // Default settings
    const defaultSettings = {
      name: tenantData.name,
      description: 'Empresa inovadora focada em soluções tecnológicas avançadas',
      website: `https://${tenantData.slug}.com.br`,
      email: `contato@${tenantData.slug}.com.br`,
      phone: '+55 11 99999-9999',
      address: 'São Paulo, SP - Brasil',
      logo: '',
      favicon: '',
      primaryColor: '#3B82F6',
      secondaryColor: '#1E40AF',
      accentColor: '#10B981'
    }

    // Merge with saved settings
    const settings = {
      ...defaultSettings,
      ...(tenantData.settings as any || {})
    }

    return NextResponse.json({ settings })
  } catch (error) {
    console.error('Error fetching tenant settings:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}