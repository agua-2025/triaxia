import { NextRequest, NextResponse } from 'next/server'
import { generateProjectSuggestions } from '@/lib/huggingface'
import { getCurrentTenant } from '@/middleware'
import { createServerClient } from '@supabase/ssr'

export const runtime = 'nodejs'

export async function POST(request: NextRequest) {
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
          setAll() {},
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
    const { projectName, description } = body

    if (!projectName) {
      return NextResponse.json(
        { error: 'Project name is required' },
        { status: 400 }
      )
    }

    const suggestions = await generateProjectSuggestions(projectName, description)

    return NextResponse.json({ suggestions })
  } catch (error) {
    // Log error in development only
    if (process.env.NODE_ENV === 'development') {
      console.error('AI Suggestions Error:', error)
    }
    return NextResponse.json(
      { error: 'Failed to generate suggestions' },
      { status: 500 }
    )
  }
}