'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { X, Plus } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Badge } from '@/components/ui/badge'
import { PositionFormData } from '@/types'

const positionSchema = z.object({
  title: z.string().min(1, 'Título é obrigatório'),
  description: z.string().optional(),
  department: z.string().optional(),
  requiredSkills: z.array(z.string()).default([]),
  minExperience: z.number().min(0, 'Experiência deve ser um número positivo'),
  requiredEducation: z.string().default('ensino_medio'),
  salaryRange: z.string().optional(),
  workType: z.string().default('integral'),
  urgency: z.string().default('media')
})

interface PositionFormProps {
  onSubmit: (data: PositionFormData) => Promise<void>
  initialData?: Partial<PositionFormData>
  isLoading?: boolean
}

export function PositionForm({ onSubmit, initialData, isLoading }: PositionFormProps) {
  const [skills, setSkills] = useState<string[]>(initialData?.requiredSkills || [])
  const [newSkill, setNewSkill] = useState('')

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors }
  } = useForm({
    resolver: zodResolver(positionSchema),
    defaultValues: {
      title: initialData?.title || '',
      description: initialData?.description || '',
      department: initialData?.department || '',
      requiredSkills: initialData?.requiredSkills || [],
      minExperience: initialData?.minExperience || 0,
      requiredEducation: initialData?.requiredEducation || 'ensino_medio',
      salaryRange: initialData?.salaryRange || '',
      workType: initialData?.workType || 'integral',
      urgency: initialData?.urgency || 'media'
    }
  })

  const workType = watch('workType')
  const urgency = watch('urgency')

  // Adicionar skill
  const addSkill = () => {
    if (newSkill.trim() && !skills.includes(newSkill.trim())) {
      const updatedSkills = [...skills, newSkill.trim()]
      setSkills(updatedSkills)
      setValue('requiredSkills', updatedSkills)
      setNewSkill('')
    }
  }

  // Remover skill
  const removeSkill = (skill: string) => {
    const updatedSkills = skills.filter(s => s !== skill)
    setSkills(updatedSkills)
    setValue('requiredSkills', updatedSkills)
  }

  // Submeter formulário
  const onFormSubmit = async (data: PositionFormData) => {
    const formData: PositionFormData = {
      ...data,
      requiredSkills: skills
    }
    await onSubmit(formData)
  }

  return (
    <form onSubmit={handleSubmit(onFormSubmit)} className="space-y-6">
      {/* Informações Básicas */}
      <Card>
        <CardHeader>
          <CardTitle>Informações Básicas</CardTitle>
          <CardDescription>
            Defina as informações principais da vaga
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <Label htmlFor="title">Título da Vaga *</Label>
              <Input
                id="title"
                {...register('title')}
                placeholder="Ex: Desenvolvedor Full Stack"
              />
              {errors.title && (
                <p className="text-sm text-red-600 mt-1">{errors.title.message}</p>
              )}
            </div>
            
            <div>
              <Label htmlFor="department">Departamento</Label>
              <Input
                id="department"
                {...register('department')}
                placeholder="Ex: Tecnologia"
              />
            </div>
          </div>
          
          <div>
            <Label htmlFor="description">Descrição da Vaga *</Label>
            <Textarea
              id="description"
              {...register('description')}
              placeholder="Descreva as responsabilidades, objetivos e contexto da vaga..."
              rows={4}
            />
            {errors.description && (
              <p className="text-sm text-red-600 mt-1">{errors.description.message}</p>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Configurações da Vaga */}
      <Card>
        <CardHeader>
          <CardTitle>Configurações</CardTitle>
          <CardDescription>
            Configure o tipo de trabalho, experiência e urgência
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4 md:grid-cols-3">
            <div>
              <Label htmlFor="workType">Tipo de Trabalho *</Label>
              <Select
                value={workType}
                onValueChange={(value) => setValue('workType', value)}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="remoto">Remoto</SelectItem>
                  <SelectItem value="hibrido">Híbrido</SelectItem>
                  <SelectItem value="presencial">Presencial</SelectItem>
                  <SelectItem value="integral">Integral</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <Label htmlFor="urgency">Urgência *</Label>
              <Select
                value={urgency}
                onValueChange={(value) => setValue('urgency', value)}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="baixa">Baixa</SelectItem>
                  <SelectItem value="media">Média</SelectItem>
                  <SelectItem value="alta">Alta</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <div>
            <Label htmlFor="minExperience">Anos de Experiência Necessários *</Label>
            <Input
              id="minExperience"
              type="number"
              min="0"
              {...register('minExperience', { valueAsNumber: true })}
              placeholder="0"
            />
            {errors.minExperience && (
              <p className="text-sm text-red-600 mt-1">{errors.minExperience.message}</p>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Faixa Salarial */}
      <Card>
        <CardHeader>
          <CardTitle>Faixa Salarial</CardTitle>
          <CardDescription>
            Defina a faixa salarial para a vaga (opcional)
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div>
            <Label htmlFor="salaryRange">Faixa Salarial</Label>
            <Input
              id="salaryRange"
              {...register('salaryRange')}
              placeholder="Ex: R$ 5.000 - R$ 10.000"
            />
          </div>
        </CardContent>
      </Card>

      {/* Skills Requeridas */}
      <Card>
        <CardHeader>
          <CardTitle>Skills Requeridas</CardTitle>
          <CardDescription>
            Adicione as habilidades técnicas necessárias para a vaga
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex gap-2">
            <Input
              value={newSkill}
              onChange={(e) => setNewSkill(e.target.value)}
              placeholder="Digite uma skill..."
              onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addSkill())}
            />
            <Button type="button" onClick={addSkill} size="sm">
              <Plus className="h-4 w-4" />
            </Button>
          </div>
          
          {skills.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {skills.map((skill, index) => (
                <Badge key={index} variant="secondary" className="flex items-center gap-1">
                  {skill}
                  <X 
                    className="h-3 w-3 cursor-pointer hover:text-red-500" 
                    onClick={() => removeSkill(skill)}
                  />
                </Badge>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Botões de Ação */}
      <div className="flex gap-4">
        <Button type="submit" disabled={isLoading}>
          {isLoading ? 'Salvando...' : (initialData ? 'Atualizar Vaga' : 'Criar Vaga')}
        </Button>
        <Button type="button" variant="outline">
          Cancelar
        </Button>
      </div>
    </form>
  )
}