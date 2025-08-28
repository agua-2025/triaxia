'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Badge } from '@/components/ui/badge'
import { X, Plus } from 'lucide-react'
import { CandidateFormData, Education } from '@/types'

const candidateSchema = z.object({
  name: z.string().min(2, 'Nome deve ter pelo menos 2 caracteres'),
  email: z.string().email('Email inválido'),
  phone: z.string().optional(),
  location: z.string().optional(),
  age: z.number().min(16, 'Idade mínima é 16 anos').max(100, 'Idade máxima é 100 anos').optional(),
  summary: z.string().optional(),
  experience: z.number().min(0, 'Experiência não pode ser negativa'),
  education: z.string().optional(),
  salary: z.string().optional(),
  availability: z.string().min(1, 'Disponibilidade é obrigatória'),
  skills: z.array(z.string()).min(1, 'Pelo menos uma habilidade é obrigatória'),
})

interface CandidateFormProps {
  initialData?: Partial<CandidateFormData>
  onSubmit: (data: CandidateFormData) => void
  isLoading?: boolean
}

export function CandidateForm({ initialData, onSubmit, isLoading }: CandidateFormProps) {
  const [newSkill, setNewSkill] = useState('')
  const [skills, setSkills] = useState<string[]>(initialData?.skills || [])

  const form = useForm<CandidateFormData>({
    resolver: zodResolver(candidateSchema),
    defaultValues: {
      name: initialData?.name || '',
      email: initialData?.email || '',
      phone: initialData?.phone || '',
      location: initialData?.location || '',
      age: initialData?.age || undefined,
      summary: initialData?.summary || '',
      experience: initialData?.experience || 0,
      education: initialData?.education || '',
      salary: initialData?.salary || '',
      availability: initialData?.availability || '',
      skills: initialData?.skills || [],
    },
  })

  const addSkill = () => {
    if (newSkill.trim() && !skills.includes(newSkill.trim())) {
      const updatedSkills = [...skills, newSkill.trim()]
      setSkills(updatedSkills)
      form.setValue('skills', updatedSkills)
      setNewSkill('')
    }
  }

  const removeSkill = (skillToRemove: string) => {
    const updatedSkills = skills.filter(skill => skill !== skillToRemove)
    setSkills(updatedSkills)
    form.setValue('skills', updatedSkills)
  }

  const handleSubmit = (data: CandidateFormData) => {
    onSubmit({ ...data, skills })
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nome Completo</FormLabel>
                <FormControl>
                  <Input placeholder="João Silva" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input type="email" placeholder="joao@email.com" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Telefone</FormLabel>
                <FormControl>
                  <Input placeholder="(11) 99999-9999" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="location"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Localização</FormLabel>
                <FormControl>
                  <Input placeholder="São Paulo, SP" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="age"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Idade</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    placeholder="30"
                    {...field}
                    onChange={(e) => field.onChange(e.target.value ? parseInt(e.target.value) : undefined)}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="experience"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Anos de Experiência</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    placeholder="5"
                    {...field}
                    onChange={(e) => field.onChange(parseInt(e.target.value) || 0)}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="education"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Escolaridade</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione a escolaridade" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value={Education.ENSINO_FUNDAMENTAL}>Ensino Fundamental</SelectItem>
                    <SelectItem value={Education.ENSINO_MEDIO}>Ensino Médio</SelectItem>
                    <SelectItem value={Education.TECNICO}>Técnico</SelectItem>
                    <SelectItem value={Education.SUPERIOR_INCOMPLETO}>Superior Incompleto</SelectItem>
                    <SelectItem value={Education.SUPERIOR_COMPLETO}>Superior Completo</SelectItem>
                    <SelectItem value={Education.POS_GRADUACAO}>Pós-graduação</SelectItem>
                    <SelectItem value={Education.MESTRADO}>Mestrado</SelectItem>
                    <SelectItem value={Education.DOUTORADO}>Doutorado</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="salary"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Pretensão Salarial</FormLabel>
                <FormControl>
                  <Input placeholder="R$ 5.000 - R$ 8.000" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="availability"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Disponibilidade</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione a disponibilidade" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="imediata">Imediata</SelectItem>
                    <SelectItem value="15_dias">15 dias</SelectItem>
                    <SelectItem value="30_dias">30 dias</SelectItem>
                    <SelectItem value="60_dias">60 dias</SelectItem>
                    <SelectItem value="a_combinar">A combinar</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="summary"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Resumo Profissional</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Descreva brevemente sua experiência e objetivos profissionais..."
                  className="min-h-[100px]"
                  {...field}
                />
              </FormControl>
              <FormDescription>
                Este resumo será usado pela IA para análise do perfil
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="space-y-4">
          <FormLabel>Habilidades</FormLabel>
          <div className="flex gap-2">
            <Input
              placeholder="Digite uma habilidade"
              value={newSkill}
              onChange={(e) => setNewSkill(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addSkill())}
            />
            <Button type="button" onClick={addSkill} size="sm">
              <Plus className="h-4 w-4" />
            </Button>
          </div>
          <div className="flex flex-wrap gap-2">
            {skills.map((skill) => (
              <Badge key={skill} variant="secondary" className="flex items-center gap-1">
                {skill}
                <button
                  type="button"
                  onClick={() => removeSkill(skill)}
                  className="ml-1 hover:text-destructive"
                >
                  <X className="h-3 w-3" />
                </button>
              </Badge>
            ))}
          </div>
          {skills.length === 0 && (
            <p className="text-sm text-muted-foreground">Adicione pelo menos uma habilidade</p>
          )}
        </div>

        <div className="flex justify-end space-x-4">
          <Button type="button" variant="outline">
            Cancelar
          </Button>
          <Button type="submit" disabled={isLoading}>
            {isLoading ? 'Salvando...' : 'Salvar Candidato'}
          </Button>
        </div>
      </form>
    </Form>
  )
}