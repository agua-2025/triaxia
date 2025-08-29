import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  experimental: {
    // Keep Prisma in Node.js runtime
    serverComponentsExternalPackages: ['@prisma/client'],
  },
}

export default nextConfig
