// Tipos do banco de dados
export interface Company {
  id: string
  name: string
  email: string
  subdomain: string
  logoUrl?: string
  primaryColor: string
  isActive: boolean
  plan: string
  createdAt: Date
  updatedAt: Date
}

export interface User {
  id: string
  name: string
  email: string
  role: string
  companyId: string
  company?: Company
  createdAt: Date
  updatedAt: Date
}

export interface Candidate {
  id: string
  name: string
  email: string
  phone?: string
  location?: string
  age?: number
  summary?: string
  experience: number
  education?: string
  salary?: string
  availability: string
  skills: string[]
  aiAnalysis?: Record<string, unknown>
  overallScore?: number
  status: string
  isActive: boolean
  companyId: string
  company?: Company
  applications?: Application[]
  createdAt: Date
  updatedAt: Date
}

export interface Position {
  id: string
  title: string
  description?: string
  department?: string
  requiredSkills: string[]
  minExperience: number
  requiredEducation: string
  salaryRange?: string
  workType: string
  isActive: boolean
  urgency: string
  companyId: string
  company?: Company
  applications?: Application[]
  createdAt: Date
  updatedAt: Date
}

export interface Application {
  id: string
  matchScore: number
  aiAnalysis?: Record<string, unknown>
  status: string
  candidateId: string
  candidate?: Candidate
  positionId: string
  position?: Position
  createdAt: Date
  updatedAt: Date
}

// Tipos para formulários
export interface CandidateFormData {
  name: string
  email: string
  phone?: string
  location?: string
  age?: number
  summary?: string
  experience: number
  education?: string
  salary?: string
  availability: string
  skills: string[]
}

export interface PositionFormData {
  title: string
  description?: string
  department?: string
  requiredSkills: string[]
  minExperience: number
  requiredEducation: string
  salaryRange?: string
  workType: string
  urgency: string
}

export interface CompanyFormData {
  name: string
  email: string
  subdomain: string
  logoUrl?: string
  primaryColor: string
  plan: string
}

// Tipos para filtros e busca
export interface CandidateFilters {
  search?: string
  skills?: string[]
  minExperience?: number
  maxExperience?: number
  education?: string
  location?: string
  availability?: string
  status?: string
  minScore?: number
  maxScore?: number
}

export interface PositionFilters {
  search?: string
  department?: string
  workType?: string
  urgency?: string
  isActive?: boolean
  minExperience?: number
  maxExperience?: number
}

// Tipos para dashboard e estatísticas
export interface DashboardStats {
  totalCandidates: number
  activeCandidates: number
  totalPositions: number
  activePositions: number
  totalApplications: number
  pendingApplications: number
  averageMatchScore: number
  topSkills: Array<{ skill: string; count: number }>
}

export interface CandidateStats {
  byExperience: Array<{ level: string; count: number }>
  byEducation: Array<{ education: string; count: number }>
  byLocation: Array<{ location: string; count: number }>
  byStatus: Array<{ status: string; count: number }>
  skillsDistribution: Array<{ skill: string; count: number }>
  scoreDistribution: Array<{ range: string; count: number }>
}

// Tipos para IA
export interface AIAnalysisResult {
  overallScore: number
  strengths: string[]
  weaknesses: string[]
  skillsExtracted: string[]
  experienceLevel: 'junior' | 'pleno' | 'senior' | 'especialista'
  culturalFit: number
  recommendations: string[]
  summary: string
}

export interface MatchResult {
  matchScore: number
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

// Tipos para API responses
export interface ApiResponse<T> {
  success: boolean
  data?: T
  error?: string
  message?: string
}

export interface PaginatedResponse<T> {
  data: T[]
  total: number
  page: number
  limit: number
  totalPages: number
}

// Tipos para autenticação
export interface AuthUser {
  id: string
  name: string
  email: string
  role: string
  companyId: string
  company: {
    id: string
    name: string
    subdomain: string
    primaryColor: string
  }
}

export interface LoginCredentials {
  email: string
  password: string
}

export interface RegisterData {
  name: string
  email: string
  password: string
  companyName: string
  subdomain: string
}

// Tipos para configurações
export interface CompanySettings {
  name: string
  logoUrl?: string
  primaryColor: string
  plan: string
  emailNotifications: boolean
  autoAnalysis: boolean
  matchThreshold: number
}

// Enums
export enum CandidateStatus {
  DISPONIVEL = 'disponivel',
  EM_PROCESSO = 'em_processo',
  CONTRATADO = 'contratado',
  INATIVO = 'inativo'
}

export enum ApplicationStatus {
  NOVO = 'novo',
  EM_ANALISE = 'em_analise',
  ENTREVISTA = 'entrevista',
  APROVADO = 'aprovado',
  REJEITADO = 'rejeitado'
}

export enum WorkType {
  INTEGRAL = 'integral',
  MEIO_PERIODO = 'meio_periodo',
  FREELANCER = 'freelancer',
  REMOTO = 'remoto',
  HIBRIDO = 'hibrido'
}

export enum Education {
  ENSINO_FUNDAMENTAL = 'ensino_fundamental',
  ENSINO_MEDIO = 'ensino_medio',
  TECNICO = 'tecnico',
  SUPERIOR_INCOMPLETO = 'superior_incompleto',
  SUPERIOR_COMPLETO = 'superior_completo',
  POS_GRADUACAO = 'pos_graduacao',
  MESTRADO = 'mestrado',
  DOUTORADO = 'doutorado'
}

export enum Urgency {
  BAIXA = 'baixa',
  MEDIA = 'media',
  ALTA = 'alta',
  URGENTE = 'urgente'
}

export enum UserRole {
  ADMIN = 'admin',
  RECRUITER = 'recruiter',
  VIEWER = 'viewer'
}

export interface AIAnalysis {
  summary?: string
  strengths?: string[]
  weaknesses?: string[]
  recommendations?: string[]
  experienceLevel?: string
  skillsMatch?: number
  overallScore?: number
}