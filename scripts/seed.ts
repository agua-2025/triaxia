import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  // Criar tenant de exemplo
  const tenant = await prisma.tenant.upsert({
    where: { slug: 'futura' },
    update: {},
    create: {
      name: 'Futura',
      slug: 'futura',
      description: 'Empresa inovadora focada em soluções tecnológicas avançadas',
      website: 'https://futura.com.br',
      email: 'contato@futura.com.br',
      phone: '+55 11 99999-9999',
      address: 'São Paulo, SP - Brasil',
      primaryColor: '#3B82F6',
      secondaryColor: '#1E40AF',
      accentColor: '#10B981',
      plan: 'professional',
      status: 'active'
    }
  })

  // Criar usuário admin
  const user = await prisma.user.upsert({
    where: {
      email_tenantId: {
        email: 'admin@futura.com.br',
        tenantId: tenant.id
      }
    },
    update: {},
    create: {
      email: 'admin@futura.com.br',
      name: 'Admin Futura',
      tenantId: tenant.id,
      role: 'ADMIN'
    }
  })

  // Criar vagas de exemplo
  const jobs = [
    {
      title: 'Desenvolvedor Full Stack Senior',
      description: 'Buscamos um desenvolvedor experiente para liderar projetos inovadores usando React, Node.js e tecnologias modernas.',
      department: 'Tecnologia',
      location: 'São Paulo, SP (Híbrido)',
      type: 'CLT',
      salary: 'R$ 12.000 - R$ 18.000',
      requirements: JSON.stringify([
        '5+ anos de experiência com React e Node.js',
        'Conhecimento em TypeScript',
        'Experiência com bancos de dados SQL e NoSQL',
        'Conhecimento em AWS ou Azure',
        'Inglês intermediário'
      ]),
      benefits: JSON.stringify([
        'Plano de saúde e odontológico',
        'Vale refeição R$ 1.200',
        'Home office flexível',
        'Auxílio educação',
        'Stock options'
      ])
    },
    {
      title: 'Designer UX/UI',
      description: 'Procuramos um designer criativo para criar experiências digitais excepcionais e interfaces intuitivas.',
      department: 'Design',
      location: 'São Paulo, SP (Remoto)',
      type: 'CLT',
      salary: 'R$ 8.000 - R$ 12.000',
      requirements: JSON.stringify([
        '3+ anos de experiência em UX/UI',
        'Proficiência em Figma e Adobe Creative Suite',
        'Conhecimento em Design System',
        'Experiência com prototipagem',
        'Portfolio sólido'
      ]),
      benefits: JSON.stringify([
        'Plano de saúde',
        'Vale refeição R$ 1.000',
        '100% remoto',
        'Auxílio home office',
        'Licença Adobe Creative Cloud'
      ])
    },
    {
      title: 'Product Manager',
      description: 'Oportunidade para liderar o desenvolvimento de produtos digitais inovadores em um ambiente ágil.',
      department: 'Produto',
      location: 'São Paulo, SP (Híbrido)',
      type: 'CLT',
      salary: 'R$ 15.000 - R$ 22.000',
      requirements: JSON.stringify([
        '4+ anos de experiência como Product Manager',
        'Conhecimento em metodologias ágeis',
        'Experiência com analytics e métricas',
        'Habilidades de liderança',
        'MBA ou formação similar (diferencial)'
      ]),
      benefits: JSON.stringify([
        'Plano de saúde premium',
        'Vale refeição R$ 1.500',
        'Modelo híbrido',
        'Participação nos lucros',
        'Auxílio educação'
      ])
    }
  ]

  for (const jobData of jobs) {
    await prisma.job.upsert({
      where: { 
        id: `${tenant.id}-${jobData.title.toLowerCase().replace(/\s+/g, '-')}` 
      },
      update: {},
      create: {
        ...jobData,
        tenantId: tenant.id,
        userId: user.id,
        status: 'ACTIVE'
      }
    })
  }

  console.log('✅ Dados de exemplo criados com sucesso!')
  console.log(`🏢 Tenant: ${tenant.name} (${tenant.slug})`)
  console.log(`👤 Usuário: ${user.email}`)
  console.log(`💼 ${jobs.length} vagas criadas`)
  console.log(`🌐 Acesse: futura.triaxia.com.br (ou localhost:3000/futura)`)
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })