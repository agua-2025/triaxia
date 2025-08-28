'use client'

import { useState } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { ArrowLeft } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { DashboardLayout } from '@/components/layout/dashboard-layout'
import { PositionForm } from '@/components/forms/position-form'
import { Loading } from '@/components/ui/loading'
import { useToast } from '@/components/ui/use-toast'

import { PositionFormData } from '@/types'

export default function NewPositionPage() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(false)

  // Criar nova vaga
  const handleSubmit = async (data: PositionFormData) => {
    try {
      setIsLoading(true)
      
      const response = await fetch('/api/positions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      })

      const result = await response.json()

      if (result.success) {
        toast({
          title: 'Vaga criada com sucesso!',
          description: 'A vaga foi criada e já está disponível para receber candidaturas.'
        })
        router.push('/positions')
      } else {
        toast({
          title: 'Erro ao criar vaga',
          description: result.error || 'Ocorreu um erro inesperado.',
          variant: 'destructive'
        })
      }
    } catch (error) {
      console.error('Error creating position:', error)
      toast({
        title: 'Erro ao criar vaga',
        description: 'Ocorreu um erro inesperado. Tente novamente.',
        variant: 'destructive'
      })
    } finally {
      setIsLoading(false)
    }
  }

  if (status === 'loading') {
    return (
      <DashboardLayout>
        <Loading text="Carregando..." />
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
            <h1 className="text-3xl font-bold tracking-tight">Nova Vaga</h1>
            <p className="text-muted-foreground">
              Crie uma nova vaga e encontre os melhores candidatos
            </p>
          </div>
        </div>

        {/* Informações sobre IA */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <h3 className="font-medium text-blue-900 mb-2">🤖 Matching Inteligente</h3>
          <p className="text-sm text-blue-700">
            Após criar a vaga, nossa IA analisará automaticamente todos os candidatos 
            disponíveis e fornecerá uma lista de matches baseada em compatibilidade, 
            habilidades, experiência e outros fatores relevantes.
          </p>
        </div>

        {/* Formulário */}
        <PositionForm
          onSubmit={handleSubmit}
          isLoading={isLoading}
        />
      </div>
    </DashboardLayout>
  )
}