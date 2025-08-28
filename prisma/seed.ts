import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Starting database seed...')

  // Criar empresa de exemplo
  const company = await prisma.company.upsert({
    where: { subdomain: 'demo' },
    update: {},
    create: {
      name: 'Demo Company',
      email: 'admin@demo.com',
      subdomain: 'demo'
    }
  })

  console.log('✅ Company created:', company.name)

  // Criar usuário administrador
  const hashedPassword = await bcrypt.hash('admin123', 12)
  const user = await prisma.user.upsert({
    where: { email: 'admin@demo.com' },
    update: {},
    create: {
      email: 'admin@demo.com',
      name: 'Admin Demo',
      password: hashedPassword,
      role: 'ADMIN',
      companyId: company.id
    }
  })

  console.log('✅ Admin user created:', user.email)

  // Criar candidatos de exemplo
  const candidates = [
    {
      name: 'Ana Silva',
      email: 'ana.silva@email.com',
      phone: '(11) 99999-1111',
      location: 'São Paulo, SP',
      experience: 5,
      skills: ['React', 'TypeScript', 'Node.js', 'PostgreSQL', 'AWS'],
      summary: 'Desenvolvedora Full Stack com 5 anos de experiência em React e Node.js. Especialista em arquiteturas escaláveis e metodologias ágeis.',
      status: 'ACTIVE',
      overallScore: 85
    },
    {
      name: 'Carlos Santos',
      email: 'carlos.santos@email.com',
      phone: '(11) 99999-2222',
      location: 'Rio de Janeiro, RJ',
      experience: 8,
      skills: ['Python', 'Django', 'Machine Learning', 'Docker', 'Kubernetes'],
      summary: 'Engenheiro de Software sênior com foco em Python e Machine Learning. Experiência em liderança técnica e arquitetura de sistemas.',
      status: 'ACTIVE',
      overallScore: 92
    },
    {
      name: 'Mariana Costa',
      email: 'mariana.costa@email.com',
      phone: '(11) 99999-3333',
      location: 'Belo Horizonte, MG',
      experience: 3,
      skills: ['Vue.js', 'JavaScript', 'CSS', 'Figma', 'UX/UI'],
      summary: 'Desenvolvedora Frontend com forte senso de design. Especialista em Vue.js e experiência do usuário.',
      status: 'ACTIVE',
      overallScore: 78
    },
    {
      name: 'Roberto Lima',
      email: 'roberto.lima@email.com',
      phone: '(11) 99999-4444',
      location: 'Porto Alegre, RS',
      experience: 10,
      skills: ['Java', 'Spring Boot', 'Microservices', 'Apache Kafka', 'Redis'],
      summary: 'Arquiteto de Software com vasta experiência em Java e microserviços. Especialista em sistemas distribuídos de alta performance.',
      status: 'ACTIVE',
      overallScore: 95
    },
    {
      name: 'Fernanda Oliveira',
      email: 'fernanda.oliveira@email.com',
      phone: '(11) 99999-5555',
      location: 'Curitiba, PR',
      experience: 2,
      skills: ['React Native', 'Flutter', 'iOS', 'Android', 'Firebase'],
      summary: 'Desenvolvedora Mobile júnior com conhecimento em React Native e Flutter. Apaixonada por criar experiências mobile incríveis.',
      status: 'ACTIVE',
      overallScore: 72
    }
  ]

  for (const candidateData of candidates) {
    const candidate = await prisma.candidate.upsert({
      where: { 
        email_companyId: {
          email: candidateData.email,
          companyId: company.id
        }
      },
      update: {},
      create: {
        ...candidateData,
        companyId: company.id,
        aiAnalysis: {
          strengths: [
            'Experiência sólida nas tecnologias principais',
            'Boa comunicação e trabalho em equipe',
            'Conhecimento atualizado do mercado'
          ],
          weaknesses: [
            'Poderia expandir conhecimento em cloud computing',
            'Experiência limitada em liderança de equipes'
          ],
          recommendations: [
            'Considerar certificações em AWS ou Azure',
            'Participar de projetos de mentoria',
            'Desenvolver habilidades de soft skills'
          ],
          keySkills: candidateData.skills,
          experienceLevel: candidateData.experience >= 7 ? 'SENIOR' : candidateData.experience >= 3 ? 'MID' : 'JUNIOR',
          culturalFit: Math.floor(Math.random() * 30) + 70, // 70-100
          technicalScore: candidateData.overallScore || 80,
          communicationScore: Math.floor(Math.random() * 20) + 80, // 80-100
          motivationScore: Math.floor(Math.random() * 25) + 75 // 75-100
        }
      }
    })
    console.log('✅ Candidate created:', candidate.name)
  }

  // Criar vagas de exemplo
  const positions = [
    {
      title: 'Desenvolvedor Full Stack Sênior',
      description: 'Buscamos um desenvolvedor full stack sênior para liderar o desenvolvimento de nossa plataforma principal. Você será responsável por arquitetar soluções escaláveis e mentorear desenvolvedores júniores.',
      requirements: ['React', 'Node.js', 'TypeScript', 'PostgreSQL', 'AWS', 'Docker'],
      location: 'São Paulo, SP',
      workType: 'HYBRID',
      experienceRequired: 5,
      salaryMin: 12000,
      salaryMax: 18000,
      status: 'ACTIVE',
      urgency: 'HIGH'
    },
    {
      title: 'Engenheiro de Machine Learning',
      description: 'Oportunidade para trabalhar com IA e Machine Learning em projetos inovadores. Você desenvolverá modelos preditivos e sistemas de recomendação.',
      requirements: ['Python', 'TensorFlow', 'PyTorch', 'SQL', 'Docker', 'Kubernetes'],
      location: 'Remote',
      workType: 'REMOTE',
      experienceRequired: 4,
      salaryMin: 15000,
      salaryMax: 25000,
      status: 'ACTIVE',
      urgency: 'MEDIUM'
    },
    {
      title: 'Designer UX/UI',
      description: 'Procuramos um designer criativo para melhorar a experiência dos nossos usuários. Você trabalhará em estreita colaboração com as equipes de produto e desenvolvimento.',
      requirements: ['Figma', 'Adobe Creative Suite', 'Prototipagem', 'Design System', 'User Research'],
      location: 'Rio de Janeiro, RJ',
      workType: 'ONSITE',
      experienceRequired: 3,
      salaryMin: 8000,
      salaryMax: 12000,
      status: 'ACTIVE',
      urgency: 'LOW'
    },
    {
      title: 'Desenvolvedor Mobile',
      description: 'Desenvolva aplicativos móveis incríveis usando React Native e Flutter. Você será responsável por criar experiências mobile de alta qualidade.',
      requirements: ['React Native', 'Flutter', 'JavaScript', 'TypeScript', 'Firebase', 'App Store'],
      location: 'Belo Horizonte, MG',
      workType: 'HYBRID',
      experienceRequired: 2,
      salaryMin: 6000,
      salaryMax: 10000,
      status: 'ACTIVE',
      urgency: 'MEDIUM'
    }
  ]

  for (const positionData of positions) {
    const position = await prisma.position.upsert({
      where: { 
        id: `${positionData.title.toLowerCase().replace(/\s+/g, '-')}-${company.id}`
      },
      update: {},
      create: {
        ...positionData,
        companyId: company.id
      }
    })
    console.log('✅ Position created:', position.title)
  }

  console.log('🎉 Database seed completed successfully!')
}

main()
  .catch((e) => {
    console.error('❌ Error during seed:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })