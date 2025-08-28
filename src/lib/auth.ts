import { NextAuthOptions } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import { PrismaAdapter } from '@next-auth/prisma-adapter'
import { prisma } from '@/lib/db'
import { AuthUser } from '@/types'
import type { User } from 'next-auth'

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  session: {
    strategy: 'jwt',
  },
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: '/auth/signin',
  },
  providers: [
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
        subdomain: { label: 'Subdomain', type: 'text' },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null
        }

        try {
          // Buscar usuário por email
          const user = await prisma.user.findUnique({
            where: {
              email: credentials.email,
            },
            include: {
              company: true,
            },
          })

          if (!user) {
            return null
          }

          // Verificar se a empresa está ativa
          if (!user.company.isActive) {
            return null
          }

          // Verificar subdomain se fornecido
          if (credentials.subdomain && user.company.subdomain !== credentials.subdomain) {
            return null
          }

          // Verificar senha (assumindo que você tem um campo password no modelo User)
          // const isPasswordValid = await bcrypt.compare(credentials.password, user.password)
          // if (!isPasswordValid) {
          //   return null
          // }

          // Por enquanto, vamos simular a verificação da senha
          // Em produção, você deve ter um campo password no modelo User
          if (credentials.password !== 'password123') {
            return null
          }

          return {
            id: user.id,
            email: user.email,
            name: user.name,
            role: user.role,
            companyId: user.companyId,
            company: {
              id: user.company.id,
              name: user.company.name,
              subdomain: user.company.subdomain,
              primaryColor: user.company.primaryColor,
            },
          } as User
        } catch (error) {
          console.error('Auth error:', error)
          return null
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        const authUser = user as AuthUser
        token.role = authUser.role
        token.companyId = authUser.companyId
        token.company = authUser.company
      }
      return token
    },
    async session({ session, token }) {
      if (token && session.user) {
        session.user.id = token.sub!
        session.user.role = token.role!
        session.user.companyId = token.companyId!
        session.user.company = token.company!
      }
      return session
    },
  },
}

// Função para verificar se o usuário tem permissão
export function hasPermission(userRole: string, requiredRole: string): boolean {
  const roleHierarchy = {
    viewer: 1,
    recruiter: 2,
    admin: 3,
  }

  const userLevel = roleHierarchy[userRole as keyof typeof roleHierarchy] || 0
  const requiredLevel = roleHierarchy[requiredRole as keyof typeof roleHierarchy] || 0

  return userLevel >= requiredLevel
}

// Função para extrair subdomain da URL
export function getSubdomain(host: string): string | null {
  const parts = host.split('.')
  if (parts.length >= 3) {
    return parts[0]
  }
  return null
}

// Função para validar subdomain
export async function validateSubdomain(subdomain: string): Promise<boolean> {
  try {
    const company = await prisma.company.findUnique({
      where: {
        subdomain,
        isActive: true,
      },
    })
    return !!company
  } catch (error) {
    console.error('Error validating subdomain:', error)
    return false
  }
}