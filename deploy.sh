#!/bin/bash

# Deploy script for Talentia
# Usage: ./deploy.sh [environment]
# Environments: development, staging, production

set -e

ENVIRONMENT=${1:-production}
APP_NAME="talentia"
IMAGE_NAME="$APP_NAME:$ENVIRONMENT"

echo "🚀 Starting deployment for $ENVIRONMENT environment..."

# Check if Docker is running
if ! docker info > /dev/null 2>&1; then
    echo "❌ Docker is not running. Please start Docker and try again."
    exit 1
fi

# Build the Docker image
echo "📦 Building Docker image..."
if [ "$ENVIRONMENT" = "development" ]; then
    docker build -f Dockerfile.dev -t $IMAGE_NAME .
else
    docker build -t $IMAGE_NAME .
fi

# Stop existing containers
echo "🛑 Stopping existing containers..."
docker-compose down || true

# Start services based on environment
if [ "$ENVIRONMENT" = "development" ]; then
    echo "🔧 Starting development environment..."
    docker-compose -f docker-compose.yml -f docker-compose.dev.yml up -d
else
    echo "🚀 Starting production environment..."
    docker-compose up -d
fi

# Wait for services to be ready
echo "⏳ Waiting for services to be ready..."
sleep 10

# Run database migrations
echo "🗄️ Running database migrations..."
docker-compose exec app npx prisma migrate deploy || echo "⚠️ Migration failed or no migrations to run"

# Seed database (only in development)
if [ "$ENVIRONMENT" = "development" ]; then
    echo "🌱 Seeding database..."
    docker-compose exec app npm run db:seed || echo "⚠️ Seeding failed or already seeded"
fi

# Health check
echo "🏥 Performing health check..."
for i in {1..30}; do
    if curl -f http://localhost:3000/api/health > /dev/null 2>&1; then
        echo "✅ Application is healthy!"
        break
    fi
    if [ $i -eq 30 ]; then
        echo "❌ Health check failed after 30 attempts"
        docker-compose logs app
        exit 1
    fi
    echo "⏳ Waiting for application to be ready... ($i/30)"
    sleep 2
done

echo "🎉 Deployment completed successfully!"
echo "📱 Application is running at: http://localhost:3000"
echo "🗄️ Database is running at: localhost:5432"
echo "🔴 Redis is running at: localhost:6379"

# Show running containers
echo "📋 Running containers:"
docker-compose ps

echo ""
echo "📝 Useful commands:"
echo "  View logs: docker-compose logs -f app"
echo "  Stop services: docker-compose down"
echo "  Database shell: docker-compose exec postgres psql -U postgres -d talentia"
echo "  App shell: docker-compose exec app sh"