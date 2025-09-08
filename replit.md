# Overview

Triaxia is a comprehensive multi-tenant AI-powered recruitment platform built with Next.js 15, featuring intelligent talent matching, automated candidate screening, and complete hiring pipeline management. The system allows companies to create their own dedicated recruitment portals with custom branding while leveraging advanced AI capabilities for talent acquisition.

# User Preferences

Preferred communication style: Simple, everyday language.

# System Architecture

## Frontend Architecture
- **Framework**: Next.js 15 with React 19 using App Router
- **Styling**: Tailwind CSS with shadcn/ui components for consistent design system
- **UI Components**: Radix UI primitives for accessible, unstyled components
- **Multi-tenancy**: Subdomain-based tenant isolation (e.g., company.triaxia.com.br) with middleware routing
- **Authentication**: Client-side auth state management with Supabase Auth

## Backend Architecture
- **Database ORM**: Prisma Client with PostgreSQL (inferred from usage patterns)
- **API Routes**: Next.js API routes with Node.js runtime for Prisma compatibility
- **Authentication**: Supabase Auth with JWT tokens and session management
- **Authorization**: Role-based access control with tenant-scoped permissions
- **Multi-tenancy**: Tenant isolation at database level with tenant-aware queries

## Data Storage Solutions
- **Primary Database**: PostgreSQL via Prisma ORM
- **Schema Design**: Multi-tenant architecture with tenant-scoped data isolation
- **Key Entities**: Tenants, Users, Jobs, Candidates, SystemAdmins, ActivationTokens
- **Authentication**: Supabase for user management and session handling

## Authentication and Authorization
- **Primary Auth**: Supabase Auth with email/password and session management
- **Multi-level Auth**: System administrators (SUPER_ADMIN) and tenant-specific users
- **Token Management**: JWT tokens with activation tokens for account setup
- **Permission System**: Role-based access control (ADMIN, USER, VIEWER) with tenant boundaries
- **Session Handling**: Server-side session validation with middleware protection

## Key Architectural Decisions

### Multi-tenancy Strategy
- **Subdomain Routing**: Companies get dedicated subdomains for branding
- **Data Isolation**: Tenant-scoped database queries prevent data leakage
- **Middleware-based**: Request routing and tenant context injection at middleware level
- **Fallback Support**: Path-based routing (/t/{slug}) as alternative to subdomains

### AI Integration
- **Provider**: Hugging Face Inference API for AI-powered features
- **Use Cases**: Candidate matching, resume analysis, and recruitment suggestions
- **Graceful Degradation**: System functions without AI when API is unavailable
- **Configuration**: Environment-based AI model selection and parameter tuning

### Payment Processing
- **Provider**: Stripe for subscription management and billing
- **Webhook Integration**: Automated tenant provisioning upon successful payment
- **Plan Management**: Multiple subscription tiers (starter, professional, enterprise)
- **Checkout Flow**: Embedded Stripe checkout with custom success handling

## External Dependencies

### Core Services
- **Supabase**: Authentication, user management, and session handling
- **Stripe**: Payment processing, subscription management, and billing webhooks
- **Hugging Face**: AI inference for intelligent recruitment features
- **Vercel**: Hosting platform with automatic deployments via GitHub Actions

### Email Infrastructure
- **SMTP Provider**: Zoho Mail for transactional emails
- **Email Types**: Account activation, password reset, and notification emails
- **Templates**: HTML email templates with responsive design

### Development and Deployment
- **Package Manager**: npm with specific version locking
- **Database Migrations**: Prisma migrate for schema management
- **CI/CD**: GitHub Actions with Vercel integration for automatic deployments
- **Code Quality**: ESLint and Prettier for code formatting and linting

### UI and Design System
- **Component Library**: shadcn/ui built on Radix UI primitives
- **Icons**: Lucide React for consistent iconography
- **Styling Framework**: Tailwind CSS with custom design tokens
- **Charts and Visualization**: Recharts for analytics dashboards