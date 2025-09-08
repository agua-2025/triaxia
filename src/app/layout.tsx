import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import './globals.css'
import { TenantProvider } from '@/lib/tenant-context'
import { AuthProvider } from '@/lib/providers/AuthProvider'
import { headers } from 'next/headers'

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
})

export const metadata: Metadata = {
  title: 'Triaxia - Multi-tenant Platform',
  description: 'Advanced multi-tenant platform with AI integration',
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  // Get tenant info from headers (set by middleware)
  const headersList = await headers()
  const tenantId = headersList.get('x-tenant-id')
  const tenantSlug = headersList.get('x-tenant-slug')

  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <TenantProvider tenantId={tenantId} tenantSlug={tenantSlug}>
          <AuthProvider>
            {children}
          </AuthProvider>
        </TenantProvider>
      </body>
    </html>
  )
}
