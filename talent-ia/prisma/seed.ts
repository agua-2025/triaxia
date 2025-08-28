import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Iniciando seed do banco de dados...')

  // Criar tenants de exemplo
  const tenants = [
    {
      name: 'Microsoft Brasil',
      slug: 'microsoft',
      subdomain: 'microsoft',
      status: 'ACTIVE' as const,
      plan: 'ENTERPRISE' as const,
      settings: {
        primaryColor: '#0078d4',
        secondaryColor: '#106ebe',
        logo: '/logos/microsoft.png',
        allowRegistration: true,
        requireApproval: false
      },
      companyProfile: {
        create: {
          description: 'A Microsoft é uma empresa multinacional americana de tecnologia com sede em Redmond, Washington.',
          website: 'https://www.microsoft.com/pt-br',
          industry: 'Tecnologia',
          size: 'LARGE',
          founded: new Date('1975-04-04'),
          headquarters: 'Redmond, WA, EUA',
          benefits: [
            'Plano de saúde completo',
            'Vale refeição',
            'Home office flexível',
            'Licença parental estendida',
            'Programa de desenvolvimento profissional'
          ],
          culture: 'Cultura de inovação e inclusão, focada em empoderar cada pessoa e organização do planeta a conquistar mais.',
          socialLinks: {
            linkedin: 'https://linkedin.com/company/microsoft',
            twitter: 'https://twitter.com/microsoft',
            instagram: 'https://instagram.com/microsoft'
          }
        }
      }
    },
    {
      name: 'Google Brasil',
      slug: 'google',
      subdomain: 'google',
      status: 'ACTIVE' as const,
      plan: 'PROFESSIONAL' as const,
      settings: {
        primaryColor: '#4285f4',
        secondaryColor: '#34a853',
        logo: '/logos/google.png',
        allowRegistration: true,
        requireApproval: true
      },
      companyProfile: {
        create: {
          description: 'O Google é uma empresa multinacional de serviços online e software dos Estados Unidos.',
          website: 'https://www.google.com.br',
          industry: 'Tecnologia',
          size: 'LARGE',
          founded: new Date('1998-09-04'),
          headquarters: 'Mountain View, CA, EUA',
          benefits: [
            'Plano de saúde premium',
            'Refeições gratuitas',
            'Transporte corporativo',
            'Licença sabática',
            'Programa de bem-estar'
          ],
          culture: 'Organizar as informações do mundo e torná-las universalmente acessíveis e úteis.',
          socialLinks: {
            linkedin: 'https://linkedin.com/company/google',
            twitter: 'https://twitter.com/google',
            youtube: 'https://youtube.com/google'
          }
        }
      }
    },
    {
      name: 'Startup Inovadora',
      slug: 'startup-inovadora',
      subdomain: 'startup-inovadora',
      status: 'TRIAL' as const,
      plan: 'BASIC' as const,
      settings: {
        primaryColor: '#8b5cf6',
        secondaryColor: '#7c3aed',
        logo: '/logos/startup.png',
        allowRegistration: true,
        requireApproval: false
      },
      companyProfile: {
        create: {
          description: 'Uma startup focada em soluções inovadoras para o mercado brasileiro.',
          website: 'https://www.startupinovadora.com.br',
          industry: 'Tecnologia',
          size: 'SMALL',
          founded: new Date('2023-01-15'),
          headquarters: 'São Paulo, SP, Brasil',
          benefits: [
            'Plano de saúde',
            'Vale refeição',
            'Trabalho remoto',
            'Horário flexível',
            'Stock options'
          ],
          culture: 'Ambiente jovem e dinâmico, focado em inovação e crescimento rápido.',
          socialLinks: {
            linkedin: 'https://linkedin.com/company/startup-inovadora',
            instagram: 'https://instagram.com/startupinovadora'
          }
        }
      }
    }
  ]

  for (const tenantData of tenants) {
    const tenant = await prisma.tenant.upsert({
      where: { slug: tenantData.slug },
      update: {},
      create: tenantData
    })
    console.log(`✅ Tenant criado: ${tenant.name} (${tenant.slug})`)
  }

  // Criar usuário admin de exemplo
  const hashedPassword = await bcrypt.hash('admin123', 12)
  
  const adminUser = await prisma.user.upsert({
    where: { email: 'admin@talentia.com' },
    update: {},
    create: {
      email: 'admin@talentia.com',
      name: 'Administrador',
      password: hashedPassword,
      role: 'ADMIN',
      emailVerified: new Date()
    }
  })
  console.log(`✅ Usuário admin criado: ${adminUser.email}`)

  // Criar usuários de exemplo para cada tenant
  const microsoftTenant = await prisma.tenant.findUnique({ where: { slug: 'microsoft' } })
  const googleTenant = await prisma.tenant.findUnique({ where: { slug: 'google' } })
  
  if (microsoftTenant) {
    const microsoftUser = await prisma.user.upsert({
      where: { email: 'hr@microsoft.com' },
      update: {},
      create: {
        email: 'hr@microsoft.com',
        name: 'RH Microsoft',
        password: await bcrypt.hash('microsoft123', 12),
        role: 'COMPANY_ADMIN',
        tenantId: microsoftTenant.id,
        emailVerified: new Date()
      }
    })
    console.log(`✅ Usuário Microsoft criado: ${microsoftUser.email}`)
  }

  if (googleTenant) {
    const googleUser = await prisma.user.upsert({
      where: { email: 'hr@google.com' },
      update: {},
      create: {
        email: 'hr@google.com',
        name: 'RH Google',
        password: await bcrypt.hash('google123', 12),
        role: 'COMPANY_ADMIN',
        tenantId: googleTenant.id,
        emailVerified: new Date()
      }
    })
    console.log(`✅ Usuário Google criado: ${googleUser.email}`)
  }

  console.log('🎉 Seed concluído com sucesso!')
}

main()
  .catch((e) => {
    console.error('❌ Erro durante o seed:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })