import OpenAI from 'openai'

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
})

// Tipos para análise de IA
export interface CandidateAnalysis {
  overallScore: number // 0-100
  strengths: string[]
  weaknesses: string[]
  skillsExtracted: string[]
  experienceLevel: 'junior' | 'pleno' | 'senior' | 'especialista'
  culturalFit: number // 0-100
  recommendations: string[]
  summary: string
}

export interface MatchAnalysis {
  matchScore: number // 0-100
  matchReasons: string[]
  gaps: string[]
  recommendations: string[]
  fitAnalysis: {
    technical: number
    experience: number
    cultural: number
    salary: number
  }
}

// Análise inicial de candidato
export async function analyzeCandidateWithAI(
  candidateData: {
    name: string
    summary?: string
    experience: number
    education?: string
    skills: string[]
    location?: string
    age?: number
  }
): Promise<CandidateAnalysis> {
  try {
    const prompt = `
Analise este candidato e forneça uma avaliação completa em JSON:

Nome: ${candidateData.name}
Resumo: ${candidateData.summary || 'Não informado'}
Experiência: ${candidateData.experience} anos
Educação: ${candidateData.education || 'Não informado'}
Habilidades: ${candidateData.skills.join(', ')}
Localização: ${candidateData.location || 'Não informado'}
Idade: ${candidateData.age || 'Não informado'}

Forneça a análise no seguinte formato JSON:
{
  "overallScore": number (0-100),
  "strengths": ["força1", "força2"],
  "weaknesses": ["fraqueza1", "fraqueza2"],
  "skillsExtracted": ["skill1", "skill2"],
  "experienceLevel": "junior|pleno|senior|especialista",
  "culturalFit": number (0-100),
  "recommendations": ["recomendação1", "recomendação2"],
  "summary": "resumo da análise"
}

Seja objetivo e profissional na análise.
    `

    const response = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [
        {
          role: 'system',
          content: 'Você é um especialista em RH e análise de talentos. Analise candidatos de forma objetiva e profissional, fornecendo insights valiosos para recrutadores.'
        },
        {
          role: 'user',
          content: prompt
        }
      ],
      temperature: 0.3,
      max_tokens: 1000
    })

    const content = response.choices[0]?.message?.content
    if (!content) {
      throw new Error('Resposta vazia da IA')
    }

    // Parse do JSON
    const analysis = JSON.parse(content) as CandidateAnalysis
    
    // Validação básica
    if (typeof analysis.overallScore !== 'number' || 
        analysis.overallScore < 0 || 
        analysis.overallScore > 100) {
      throw new Error('Score inválido na análise')
    }

    return analysis
  } catch (error) {
    console.error('Erro na análise de candidato:', error)
    
    // Fallback em caso de erro
    return {
      overallScore: 50,
      strengths: ['Experiência relevante'],
      weaknesses: ['Análise não disponível'],
      skillsExtracted: candidateData.skills,
      experienceLevel: candidateData.experience >= 5 ? 'senior' : candidateData.experience >= 2 ? 'pleno' : 'junior',
      culturalFit: 50,
      recommendations: ['Realizar entrevista para avaliação mais detalhada'],
      summary: 'Análise automática não disponível. Recomenda-se avaliação manual.'
    }
  }
}

// Matching inteligente entre candidato e vaga
export async function matchCandidateToPosition(
  candidate: {
    name: string
    summary?: string
    experience: number
    education?: string
    skills: string[]
    salary?: string
    availability: string
    aiAnalysis?: CandidateAnalysis
  },
  position: {
    title: string
    description?: string
    department?: string
    requiredSkills: string[]
    minExperience: number
    requiredEducation: string
    salaryRange?: string
    workType: string
  }
): Promise<MatchAnalysis> {
  try {
    const prompt = `
Analise a compatibilidade entre este candidato e esta vaga:

=== CANDIDATO ===
Nome: ${candidate.name}
Resumo: ${candidate.summary || 'Não informado'}
Experiência: ${candidate.experience} anos
Educação: ${candidate.education || 'Não informado'}
Habilidades: ${candidate.skills.join(', ')}
Pretensão Salarial: ${candidate.salary || 'Não informado'}
Disponibilidade: ${candidate.availability}

=== VAGA ===
Título: ${position.title}
Descrição: ${position.description || 'Não informado'}
Departamento: ${position.department || 'Não informado'}
Habilidades Requeridas: ${position.requiredSkills.join(', ')}
Experiência Mínima: ${position.minExperience} anos
Educação Requerida: ${position.requiredEducation}
Faixa Salarial: ${position.salaryRange || 'Não informado'}
Tipo de Trabalho: ${position.workType}

Forneça a análise de compatibilidade no seguinte formato JSON:
{
  "matchScore": number (0-100),
  "matchReasons": ["razão1", "razão2"],
  "gaps": ["lacuna1", "lacuna2"],
  "recommendations": ["recomendação1", "recomendação2"],
  "fitAnalysis": {
    "technical": number (0-100),
    "experience": number (0-100),
    "cultural": number (0-100),
    "salary": number (0-100)
  }
}

Seja preciso na análise de compatibilidade.
    `

    const response = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [
        {
          role: 'system',
          content: 'Você é um especialista em matching de talentos. Analise a compatibilidade entre candidatos e vagas de forma precisa e objetiva.'
        },
        {
          role: 'user',
          content: prompt
        }
      ],
      temperature: 0.2,
      max_tokens: 800
    })

    const content = response.choices[0]?.message?.content
    if (!content) {
      throw new Error('Resposta vazia da IA')
    }

    const analysis = JSON.parse(content) as MatchAnalysis
    
    // Validação
    if (typeof analysis.matchScore !== 'number' || 
        analysis.matchScore < 0 || 
        analysis.matchScore > 100) {
      throw new Error('Score de match inválido')
    }

    return analysis
  } catch (error) {
    console.error('Erro no matching:', error)
    
    // Fallback simples
    const experienceMatch = candidate.experience >= position.minExperience ? 80 : 40
    const skillsMatch = candidate.skills.some(skill => 
      position.requiredSkills.some(reqSkill => 
        skill.toLowerCase().includes(reqSkill.toLowerCase())
      )
    ) ? 70 : 30
    
    const basicScore = Math.round((experienceMatch + skillsMatch) / 2)
    
    return {
      matchScore: basicScore,
      matchReasons: ['Análise básica de compatibilidade'],
      gaps: ['Análise detalhada não disponível'],
      recommendations: ['Realizar entrevista para avaliação completa'],
      fitAnalysis: {
        technical: skillsMatch,
        experience: experienceMatch,
        cultural: 50,
        salary: 50
      }
    }
  }
}

// Extração de habilidades de texto livre
export async function extractSkillsFromText(text: string): Promise<string[]> {
  try {
    const prompt = `
Extraia as habilidades técnicas e profissionais do seguinte texto:

"${text}"

Retorne apenas um array JSON de strings com as habilidades encontradas:
["habilidade1", "habilidade2", "habilidade3"]

Foque em:
- Linguagens de programação
- Frameworks e bibliotecas
- Ferramentas e tecnologias
- Habilidades profissionais relevantes
- Certificações

Evite habilidades muito genéricas como "comunicação" ou "trabalho em equipe".
    `

    const response = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [
        {
          role: 'system',
          content: 'Você é um especialista em identificação de habilidades técnicas e profissionais. Extraia apenas habilidades relevantes e específicas.'
        },
        {
          role: 'user',
          content: prompt
        }
      ],
      temperature: 0.1,
      max_tokens: 300
    })

    const content = response.choices[0]?.message?.content
    if (!content) {
      return []
    }

    const skills = JSON.parse(content) as string[]
    return Array.isArray(skills) ? skills : []
  } catch (error) {
    console.error('Erro na extração de habilidades:', error)
    return []
  }
}

// Geração de perguntas de entrevista personalizadas
export async function generateInterviewQuestions(
  candidate: {
    name: string
    experience: number
    skills: string[]
    aiAnalysis?: CandidateAnalysis
  },
  position: {
    title: string
    requiredSkills: string[]
    department?: string
  }
): Promise<string[]> {
  try {
    const prompt = `
Gere 8-10 perguntas de entrevista personalizadas para:

CANDIDATO: ${candidate.name}
Experiência: ${candidate.experience} anos
Habilidades: ${candidate.skills.join(', ')}

VAGA: ${position.title}
Departamento: ${position.department || 'Não especificado'}
Habilidades Requeridas: ${position.requiredSkills.join(', ')}

Retorne um array JSON de strings com as perguntas:
["pergunta1", "pergunta2", "pergunta3"]

Incluir:
- Perguntas técnicas específicas
- Perguntas comportamentais
- Perguntas sobre experiências passadas
- Perguntas sobre motivação

Seja específico e relevante para o perfil e vaga.
    `

    const response = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [
        {
          role: 'system',
          content: 'Você é um especialista em recrutamento. Gere perguntas de entrevista relevantes e específicas para cada candidato e vaga.'
        },
        {
          role: 'user',
          content: prompt
        }
      ],
      temperature: 0.4,
      max_tokens: 600
    })

    const content = response.choices[0]?.message?.content
    if (!content) {
      return []
    }

    const questions = JSON.parse(content) as string[]
    return Array.isArray(questions) ? questions : []
  } catch (error) {
    console.error('Erro na geração de perguntas:', error)
    return [
      'Conte-me sobre sua experiência profissional.',
      'Quais são seus principais pontos fortes?',
      'Como você lida com desafios técnicos?',
      'Por que tem interesse nesta vaga?'
    ]
  }
}