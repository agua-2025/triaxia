import { DefaultSession } from 'next-auth'
import { JWT, DefaultJWT } from 'next-auth/jwt'
import { AuthUser } from './index'

declare module 'next-auth' {
  interface Session {
    user: {
      id: string
      role: string
      companyId: string
      company: {
        id: string
        name: string
        subdomain: string
        primaryColor: string
      }
    } & DefaultSession['user']
  }

  interface User extends AuthUser {
    id: string
    email: string
    name?: string
  }
}

declare module 'next-auth/jwt' {
  interface JWT extends DefaultJWT {
    role?: string
    companyId?: string
    company?: {
      id: string
      name: string
      subdomain: string
      primaryColor: string
    }
  }
}

// Estender NextRequest para incluir nextauth
declare module 'next/server' {
  interface NextRequest {
    nextauth: {
      token: JWT | null
    }
  }
}