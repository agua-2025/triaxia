import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

export async function GET() {
  try {
    // Check database connection
    await prisma.$queryRaw`SELECT 1`;
    
    // Get basic stats
    const stats = {
      timestamp: new Date().toISOString(),
      status: 'healthy',
      version: process.env.npm_package_version || '1.0.0',
      environment: process.env.NODE_ENV || 'development',
      uptime: process.uptime(),
      memory: {
        used: Math.round(process.memoryUsage().heapUsed / 1024 / 1024),
        total: Math.round(process.memoryUsage().heapTotal / 1024 / 1024),
      },
      database: {
        status: 'connected',
        url: process.env.DATABASE_URL ? 'configured' : 'not configured',
      },
      services: {
        openai: process.env.OPENAI_API_KEY ? 'configured' : 'not configured',
        auth: process.env.NEXTAUTH_SECRET ? 'configured' : 'not configured',
        email: process.env.EMAIL_SERVER_HOST ? 'configured' : 'not configured',
      },
    };

    return NextResponse.json(stats, { status: 200 });
  } catch (error) {
    console.error('Health check failed:', error);
    
    return NextResponse.json(
      {
        timestamp: new Date().toISOString(),
        status: 'unhealthy',
        error: error instanceof Error ? error.message : 'Unknown error',
        version: process.env.npm_package_version || '1.0.0',
        environment: process.env.NODE_ENV || 'development',
      },
      { status: 503 }
    );
  }
}