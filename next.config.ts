import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  // Keep Prisma in Node.js runtime
  serverExternalPackages: ['@prisma/client'],
}

export default nextConfig
