import crypto from 'crypto'

// Interface para resultado de validação
export interface PasswordValidationResult {
  isValid: boolean
  score: number // 0-100
  errors: string[]
  warnings: string[]
  suggestions: string[]
}

// Interface para requisitos de senha
export interface PasswordRequirement {
  id: string
  label: string
  description: string
  test: (password: string) => boolean
  weight: number // Peso na pontuação (1-10)
}

// Senhas comuns mais abrangente
const COMMON_PASSWORDS = new Set([
  'password', '123456', '123456789', 'qwerty', 'abc123', 'password123',
  'admin', 'letmein', 'welcome', 'monkey', '1234567890', 'qwerty123',
  'password1', 'admin123', 'root', 'toor', 'pass', '12345678',
  'senha', 'senha123', 'administrador', 'usuario', 'user', 'guest',
  'triaxia', 'triaxia123', 'empresa', 'sistema', 'login', 'access'
])

// Padrões sequenciais perigosos
const SEQUENTIAL_PATTERNS = [
  '123456', '654321', 'abcdef', 'fedcba', 'qwerty', 'asdfgh',
  '098765', '567890', 'mnbvcx', 'zxcvbn'
]

// Requisitos de senha configuráveis
export const PASSWORD_REQUIREMENTS: PasswordRequirement[] = [
  {
    id: 'length',
    label: 'Pelo menos 8 caracteres',
    description: 'Senhas longas são mais difíceis de quebrar',
    test: (p) => p.length >= 8,
    weight: 8
  },
  {
    id: 'uppercase',
    label: 'Pelo menos uma letra maiúscula (A-Z)',
    description: 'Aumenta a complexidade da senha',
    test: (p) => /[A-Z]/.test(p),
    weight: 6
  },
  {
    id: 'lowercase',
    label: 'Pelo menos uma letra minúscula (a-z)',
    description: 'Melhora a diversidade de caracteres',
    test: (p) => /[a-z]/.test(p),
    weight: 6
  },
  {
    id: 'number',
    label: 'Pelo menos um número (0-9)',
    description: 'Adiciona complexidade numérica',
    test: (p) => /\d/.test(p),
    weight: 6
  },
  {
    id: 'special',
    label: 'Pelo menos um caractere especial (!@#$%^&*)',
    description: 'Caracteres especiais aumentam significativamente a segurança',
    test: (p) => /[!@#$%^&*(),.?":{}|<>\-_=+\[\]\\;'`~]/.test(p),
    weight: 8
  },
  {
    id: 'no_common',
    label: 'Não usar senhas comuns',
    description: 'Evita senhas facilmente descobertas por ataques de dicionário',
    test: (p) => !COMMON_PASSWORDS.has(p.toLowerCase()),
    weight: 10
  },
  {
    id: 'no_sequential',
    label: 'Evitar sequências óbvias',
    description: 'Sequências como "123456" ou "qwerty" são facilmente quebradas',
    test: (p) => !SEQUENTIAL_PATTERNS.some(pattern => p.toLowerCase().includes(pattern)),
    weight: 7
  },
  {
    id: 'no_repetition',
    label: 'Evitar repetições excessivas',
    description: 'Muitos caracteres repetidos reduzem a segurança',
    test: (p) => !hasExcessiveRepetition(p),
    weight: 5
  }
]

/**
 * Valida uma senha com base em critérios de segurança avançados
 * @param password Senha a ser validada
 * @param userInfo Informações do usuário para verificar similaridade (opcional)
 * @returns Resultado detalhado da validação
 */
export function validatePasswordSecurity(
  password: string,
  userInfo?: { email?: string; name?: string; company?: string }
): PasswordValidationResult {
  const errors: string[] = []
  const warnings: string[] = []
  const suggestions: string[] = []
  let score = 0
  let maxScore = 0

  // Verificar cada requisito
  for (const requirement of PASSWORD_REQUIREMENTS) {
    maxScore += requirement.weight
    
    if (requirement.test(password)) {
      score += requirement.weight
    } else {
      errors.push(requirement.label)
    }
  }

  // Verificações adicionais de segurança
  
  // 1. Verificar similaridade com informações do usuário
  if (userInfo) {
    const userInfoCheck = checkUserInfoSimilarity(password, userInfo)
    if (!userInfoCheck.isValid) {
      errors.push('Senha muito similar às suas informações pessoais')
      warnings.push(userInfoCheck.reason || 'Evite usar seu nome, email ou empresa na senha')
    }
  }

  // 2. Verificar entropia da senha
  const entropy = calculatePasswordEntropy(password)
  if (entropy < 40) {
    warnings.push('Senha com baixa entropia - considere usar mais variações')
  } else if (entropy > 60) {
    score += 5 // Bônus por alta entropia
  }

  // 3. Verificar padrões de teclado
  if (hasKeyboardPatterns(password)) {
    warnings.push('Evite padrões de teclado como "qwerty" ou "asdf"')
    score -= 5
  }

  // 4. Verificar datas comuns
  if (hasCommonDates(password)) {
    warnings.push('Evite usar datas óbvias como anos ou datas de nascimento')
    score -= 3
  }

  // 5. Bônus por comprimento extra
  if (password.length >= 12) {
    score += 5
  }
  if (password.length >= 16) {
    score += 5
  }

  // Normalizar score (0-100)
  const normalizedScore = Math.max(0, Math.min(100, (score / maxScore) * 100))

  // Gerar sugestões baseadas nos erros
  if (errors.length > 0) {
    suggestions.push('Corrija os requisitos obrigatórios listados acima')
  }
  
  if (password.length < 12) {
    suggestions.push('Considere usar pelo menos 12 caracteres para maior segurança')
  }
  
  if (!/[!@#$%^&*(),.?":{}|<>\-_=+\[\]\\;'`~]/.test(password)) {
    suggestions.push('Adicione caracteres especiais como !@#$%^&* para maior segurança')
  }
  
  if (entropy < 50) {
    suggestions.push('Use uma combinação mais variada de caracteres')
  }

  return {
    isValid: errors.length === 0,
    score: Math.round(normalizedScore),
    errors,
    warnings,
    suggestions
  }
}

/**
 * Verifica se a senha tem repetições excessivas
 */
function hasExcessiveRepetition(password: string): boolean {
  // Verificar se mais de 50% dos caracteres são iguais
  const charCount = new Map<string, number>()
  
  for (const char of password) {
    charCount.set(char, (charCount.get(char) || 0) + 1)
  }
  
  const maxCount = Math.max(...charCount.values())
  return maxCount > password.length * 0.5
}

/**
 * Verifica similaridade com informações do usuário
 */
function checkUserInfoSimilarity(
  password: string,
  userInfo: { email?: string; name?: string; company?: string }
): { isValid: boolean; reason?: string } {
  const passwordLower = password.toLowerCase()
  
  // Verificar email
  if (userInfo.email) {
    const emailParts = userInfo.email.toLowerCase().split('@')
    const username = emailParts[0]
    const domain = emailParts[1]?.split('.')[0]
    
    if (passwordLower.includes(username) && username.length > 3) {
      return { isValid: false, reason: 'Senha contém parte do seu email' }
    }
    
    if (domain && passwordLower.includes(domain) && domain.length > 3) {
      return { isValid: false, reason: 'Senha contém o domínio do seu email' }
    }
  }
  
  // Verificar nome
  if (userInfo.name) {
    const nameParts = userInfo.name.toLowerCase().split(' ')
    for (const part of nameParts) {
      if (part.length > 3 && passwordLower.includes(part)) {
        return { isValid: false, reason: 'Senha contém parte do seu nome' }
      }
    }
  }
  
  // Verificar empresa
  if (userInfo.company) {
    const companyLower = userInfo.company.toLowerCase()
    if (companyLower.length > 3 && passwordLower.includes(companyLower)) {
      return { isValid: false, reason: 'Senha contém o nome da empresa' }
    }
  }
  
  return { isValid: true }
}

/**
 * Calcula a entropia da senha
 */
function calculatePasswordEntropy(password: string): number {
  const charSets = [
    { chars: 'abcdefghijklmnopqrstuvwxyz', count: 0 },
    { chars: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ', count: 0 },
    { chars: '0123456789', count: 0 },
    { chars: '!@#$%^&*(),.?":{}|<>-_=+[]\\;\'`~', count: 0 }
  ]
  
  let poolSize = 0
  
  for (const charSet of charSets) {
    for (const char of password) {
      if (charSet.chars.includes(char)) {
        if (charSet.count === 0) {
          poolSize += charSet.chars.length
          charSet.count = 1
        }
        break
      }
    }
  }
  
  return password.length * Math.log2(poolSize)
}

/**
 * Verifica padrões de teclado
 */
function hasKeyboardPatterns(password: string): boolean {
  const keyboardPatterns = [
    'qwerty', 'asdfgh', 'zxcvbn', 'qwertyuiop', 'asdfghjkl',
    '1234567890', '0987654321', 'qazwsx', 'wsxedc'
  ]
  
  const passwordLower = password.toLowerCase()
  return keyboardPatterns.some(pattern => 
    passwordLower.includes(pattern) || passwordLower.includes(pattern.split('').reverse().join(''))
  )
}

/**
 * Verifica datas comuns
 */
function hasCommonDates(password: string): boolean {
  const currentYear = new Date().getFullYear()
  const years = []
  
  // Anos de 1900 até atual + 10
  for (let year = 1900; year <= currentYear + 10; year++) {
    years.push(year.toString())
  }
  
  // Verificar se contém anos
  for (const year of years) {
    if (password.includes(year)) {
      return true
    }
  }
  
  // Verificar padrões de data comuns
  const datePatterns = [
    /\d{2}\/\d{2}\/\d{4}/, // DD/MM/YYYY
    /\d{4}-\d{2}-\d{2}/, // YYYY-MM-DD
    /\d{2}-\d{2}-\d{4}/, // DD-MM-YYYY
    /\d{8}/ // DDMMYYYY ou YYYYMMDD
  ]
  
  return datePatterns.some(pattern => pattern.test(password))
}

/**
 * Gera uma senha segura automaticamente
 * @param length Comprimento da senha (padrão: 16)
 * @returns Senha segura gerada
 */
export function generateSecurePassword(length: number = 16): string {
  const lowercase = 'abcdefghijklmnopqrstuvwxyz'
  const uppercase = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
  const numbers = '0123456789'
  const symbols = '!@#$%^&*(),.?":{}|<>-_=+[]\\;`~'
  
  const allChars = lowercase + uppercase + numbers + symbols
  
  let password = ''
  
  // Garantir pelo menos um caractere de cada tipo
  password += lowercase[Math.floor(Math.random() * lowercase.length)]
  password += uppercase[Math.floor(Math.random() * uppercase.length)]
  password += numbers[Math.floor(Math.random() * numbers.length)]
  password += symbols[Math.floor(Math.random() * symbols.length)]
  
  // Preencher o resto aleatoriamente
  for (let i = 4; i < length; i++) {
    password += allChars[Math.floor(Math.random() * allChars.length)]
  }
  
  // Embaralhar a senha
  return password.split('').sort(() => Math.random() - 0.5).join('')
}

/**
 * Verifica se uma senha foi comprometida em vazamentos conhecidos
 * (Implementação simulada - em produção, usar APIs como HaveIBeenPwned)
 * @param password Senha a verificar
 * @returns Promise<boolean> True se comprometida
 */
export async function checkPasswordBreach(password: string): Promise<boolean> {
  try {
    // Hash SHA-1 da senha
    const hash = crypto.createHash('sha1').update(password).digest('hex').toUpperCase()
    const prefix = hash.substring(0, 5)
    const suffix = hash.substring(5)
    
    // Em produção, fazer requisição para https://api.pwnedpasswords.com/range/{prefix}
    // Por enquanto, simular verificação local
    const compromisedHashes = new Set([
      // Alguns hashes de senhas comuns (apenas para demonstração)
      '5E884898DA28047151D0E56F8DC6292773603D0D6AABBDD62A11EF721D1542D8', // 'password'
      'E38AD214943DAAD1D64C102FAEC29DE4AFE9DA3D', // '123456'
      '7C4A8D09CA3762AF61E59520943DC26494F8941B' // 'qwerty'
    ])
    
    return compromisedHashes.has(hash)
  } catch (error) {
    console.error('Erro ao verificar vazamento de senha:', error)
    return false
  }
}