const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function createTradicaoJobs() {
  try {
    console.log('Buscando tenant "tradicao"...');
    
    const tenant = await prisma.tenant.findUnique({
      where: { slug: 'tradicao' },
      include: { users: true }
    });
    
    if (!tenant) {
      console.log('❌ Tenant "tradicao" não encontrado');
      return;
    }
    
    const adminUser = tenant.users.find(u => u.role === 'ADMIN');
    if (!adminUser) {
      console.log('❌ Usuário admin não encontrado para o tenant');
      return;
    }
    
    console.log('Criando vagas para o tenant "tradicao"...');
    
    const jobs = [
      {
        title: 'Desenvolvedor Full Stack Sênior',
        description: 'Buscamos um desenvolvedor full stack experiente para liderar projetos inovadores na Tradição.',
        department: 'Tecnologia',
        location: 'São Paulo, SP',
        type: 'CLT',
        salary: 'R$ 12.000 - R$ 18.000',
        requirements: [
          'Experiência com React, Node.js e TypeScript',
          'Conhecimento em bancos de dados SQL e NoSQL',
          'Experiência com metodologias ágeis',
          'Liderança técnica de equipes'
        ],
        benefits: [
          'Vale refeição R$ 1.200',
          'Plano de saúde premium',
          'Home office flexível',
          'Participação nos lucros',
          'Auxílio educação'
        ],
        status: 'ACTIVE',
        tenantId: tenant.id,
        userId: adminUser.id
      },
      {
        title: 'Designer UX/UI',
        description: 'Procuramos um designer criativo para criar experiências digitais excepcionais.',
        department: 'Design',
        location: 'São Paulo, SP',
        type: 'CLT',
        salary: 'R$ 8.000 - R$ 12.000',
        requirements: [
          'Experiência com Figma e Adobe Creative Suite',
          'Portfolio com projetos de UX/UI',
          'Conhecimento em Design System',
          'Experiência com prototipagem'
        ],
        benefits: [
          'Vale refeição R$ 1.200',
          'Plano de saúde',
          'Home office flexível',
          'Auxílio equipamentos',
          'Cursos e certificações'
        ],
        status: 'ACTIVE',
        tenantId: tenant.id,
        userId: adminUser.id
      },
      {
        title: 'Analista de Marketing Digital',
        description: 'Oportunidade para profissional de marketing digital com foco em crescimento.',
        department: 'Marketing',
        location: 'São Paulo, SP',
        type: 'CLT',
        salary: 'R$ 6.000 - R$ 9.000',
        requirements: [
          'Experiência com Google Ads e Facebook Ads',
          'Conhecimento em SEO e Analytics',
          'Experiência com automação de marketing',
          'Análise de dados e métricas'
        ],
        benefits: [
          'Vale refeição R$ 1.000',
          'Plano de saúde',
          'Trabalho híbrido',
          'Participação nos resultados',
          'Treinamentos especializados'
        ],
        status: 'ACTIVE',
        tenantId: tenant.id,
        userId: adminUser.id
      }
    ];
    
    for (const jobData of jobs) {
      const job = await prisma.job.create({
        data: jobData
      });
      console.log(`✅ Vaga criada: ${job.title}`);
    }
    
    console.log('\n🎉 Todas as vagas foram criadas com sucesso!');
    
  } catch (error) {
    console.error('Erro ao criar vagas:', error);
  } finally {
    await prisma.$disconnect();
  }
}

createTradicaoJobs();