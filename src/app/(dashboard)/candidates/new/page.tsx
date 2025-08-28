'use client'

import { useState } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { ArrowLeft, Loader2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { useToast } from '@/components/ui/use-toast'
import { DashboardLayout } from '@/components/layout/dashboard-layout'
import { CandidateForm } from '@/components/forms/candidate-form'
import { CandidateFormData } from '@/types'

export default function NewCandidatePage() {
  const { status } = useSession()
  const router = useRouter()
  const { toast } = useToast()
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (data: CandidateFormData) => {
    try {
      setIsSubmitting(true)

      const response = await fetch('/api/candidates', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })

      const result = await response.json()

      if (result.success) {
        toast({
          title: 'Sucesso!',
          description: 'Candidato criado com sucesso. A análise de IA será processada em breve.',
        })
        router.push('/candidates')
      } else {
        toast({
          title: 'Erro',
          description: result.error || 'Erro ao criar candidato',
          variant: 'destructive',
        })
      }
    } catch (error) {
      console.error('Error creating candidate:', error)
      toast({
        title: 'Erro',
        description: 'Erro interno do servidor',
        variant: 'destructive',
      })
    } finally {
      setIsSubmitting(false)
    }
  }



  if (status === 'loading') {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center min-h-[400px]">
          <Loader2 className="h-8 w-8 animate-spin" />
        </div>
      </DashboardLayout>
    )
  }

  if (status === 'unauthenticated') {
    router.push('/signin')
    return null
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center gap-4">
          <Button
            variant="outline"
            size="sm"
            onClick={() => router.back()}
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Voltar
          </Button>
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Novo Candidato</h1>
            <p className="text-muted-foreground">
              Adicione um novo candidato ao sistema e obtenha análise de IA automaticamente
            </p>
          </div>
        </div>

        {/* Formulário */}
        <div className="max-w-4xl">
          <Card>
            <CardHeader>
              <CardTitle>Informações do Candidato</CardTitle>
              <CardDescription>
                Preencha os dados do candidato. Os campos marcados com * são obrigatórios.
                Após o cadastro, nossa IA analisará automaticamente o perfil do candidato.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <CandidateForm
                onSubmit={handleSubmit}
                isLoading={isSubmitting}
              />
            </CardContent>
          </Card>
        </div>

        {/* Informações sobre IA */}
        <Card className="max-w-4xl">
          <CardHeader>
            <CardTitle className="text-lg">Análise de IA</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3 text-sm text-muted-foreground">
              <p>
                <strong>Análise Automática:</strong> Após criar o candidato, nossa IA analisará automaticamente:
              </p>
              <ul className="list-disc list-inside space-y-1 ml-4">
                <li>Score geral do candidato (0-100)</li>
                <li>Pontos fortes e áreas de melhoria</li>
                <li>Nível de experiência estimado</li>
                <li>Adequação cultural</li>
                <li>Recomendações personalizadas</li>
              </ul>
              <p className="mt-3">
                <strong>Tempo de Processamento:</strong> A análise geralmente leva alguns segundos e será exibida na página de detalhes do candidato.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  )
}