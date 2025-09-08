import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  // Keep Prisma in Node.js runtime
  serverExternalPackages: ['@prisma/client'],
  // Allow all hosts for Replit environment
  experimental: {
    allowedHosts: true,
  },
}

export default nextConfig
