import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  // Keep Prisma in Node.js runtime
  serverExternalPackages: ['@prisma/client'],
  // Allow all hosts for Replit environment - use hostname and port flags in dev script instead
}

export default nextConfig
