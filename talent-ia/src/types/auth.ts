import { UserRole } from '@prisma/client'

export interface User {
  id: string
  email: string
  name?: string | null
  image?: string | null
  role: UserRole
  createdAt: Date
  updatedAt: Date
}

export interface AuthUser {
  id: string
  email: string
  name?: string | null
  image?: string | null
  role: UserRole
}

declare module 'next-auth' {
  interface Session {
    user: AuthUser
  }

  interface User extends AuthUser {}
}

declare module 'next-auth/jwt' {
  interface JWT {
    uid: string
    role: UserRole
  }
}