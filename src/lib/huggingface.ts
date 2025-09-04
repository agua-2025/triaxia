import { HfInference } from '@huggingface/inference'

if (!process.env.HUGGINGFACE_API_KEY) {
  throw new Error('HUGGINGFACE_API_KEY is required')
}

export const hf = new HfInference(process.env.HUGGINGFACE_API_KEY)

// Default configuration
export const AI_CONFIG = {
  model: process.env.HUGGINGFACE_MODEL ?? 'microsoft/DialoGPT-medium',
  temperature: 0.7,
  max_tokens: 1000,
  apiUrl: 'https://api-inference.huggingface.co/models/',
} as const

// AI Helper functions
export async function generateText(prompt: string, options?: {
  temperature?: number
  max_tokens?: number
  model?: string
}) {
  try {
    const response = await hf.textGeneration({
      model: options?.model ?? AI_CONFIG.model,
      inputs: prompt,
      parameters: {
        temperature: options?.temperature ?? AI_CONFIG.temperature,
        max_new_tokens: options?.max_tokens ?? AI_CONFIG.max_tokens,
        return_full_text: false,
      },
    })

    return response.generated_text ?? ''

  } catch (error) {
    // Log error in development only
    if (process.env.NODE_ENV === 'development') {
      console.error('Hugging Face API Error:', error)
    }
    throw new Error('Failed to generate AI response')
  }
}

export async function generateProjectSuggestions(projectName: string, description?: string) {
  const prompt = `
    Based on the project name "${projectName}" ${description ? `and description "${description}"` : ''}, 
    suggest 5 specific features or improvements that would be valuable for this project.
    
    Format your response as a JSON array of objects with 'title' and 'description' fields.
    Keep descriptions concise but actionable.
  `

  const response = await generateText(prompt, { temperature: 0.8 })
  
  try {
    return JSON.parse(response)
  } catch {
    // Fallback if JSON parsing fails
    return [{
      title: 'AI-Powered Analysis',
      description: 'Implement intelligent data analysis features'
    }]
  }
}

export async function generateUserInsights(userData: {
  projectCount: number
  lastActivity: string
  role: string
}) {
  const prompt = `
    Analyze this user profile and provide 3 personalized insights:
    - Projects: ${userData.projectCount}
    - Last Activity: ${userData.lastActivity}
    - Role: ${userData.role}
    
    Provide actionable recommendations to improve their productivity.
    Format as JSON array with 'insight' and 'action' fields.
  `

  const response = await generateText(prompt, { temperature: 0.6 })
  
  try {
    return JSON.parse(response)
  } catch {
    return [{
      insight: 'Regular activity tracking can boost productivity',
      action: 'Set up daily check-ins for your projects'
    }]
  }
}