import { NextRequest, NextResponse } from 'next/server'
import { generateProjectSuggestions } from '@/lib/huggingface'
import { getCurrentTenant } from '@/lib/prisma'
import { requireAuth } from '@/lib/auth/api-auth'

export const runtime = 'nodejs'

export async function POST(request: NextRequest) {
  try {
    // Verify user authentication
    const { user, error: authError } = await requireAuth(request)
    
    if (authError) {
      return authError
    }
    
    const tenant = await getCurrentTenant(request)
    
    if (!tenant) {
      return NextResponse.json(
        { error: 'Tenant not found' },
        { status: 400 }
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