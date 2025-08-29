'use client'

import { useState } from 'react'
import { useAI } from '@/lib/hooks/use-ai'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export default function TestAIPage() {
  const [projectName, setProjectName] = useState('')
  const [suggestions, setSuggestions] = useState<any[]>([])
  const { generateSuggestions, loading, error } = useAI()

  const handleGenerate = async () => {
    if (!projectName.trim()) return
    
    try {
      const result = await generateSuggestions(projectName)
      setSuggestions(result)
    } catch (err) {
      console.error('Error:', err)
    }
  }

  return (
    <div className="container mx-auto p-6 max-w-4xl">
      <Card>
        <CardHeader>
          <CardTitle>🤖 Teste de IA - Sugestões de Projeto</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex gap-2">
            <Input
              placeholder="Nome do projeto..."
              value={projectName}
              onChange={(e) => setProjectName(e.target.value)}
              className="flex-1"
            />
            <Button 
              onClick={handleGenerate} 
              disabled={loading || !projectName.trim()}
            >
              {loading ? 'Gerando...' : 'Gerar Sugestões'}
            </Button>
          </div>
          
          {error && (
            <div className="text-red-500 p-3 bg-red-50 rounded">
              Erro: {error}
            </div>
          )}
          
          {suggestions.length > 0 && (
            <div className="space-y-3">
              <h3 className="font-semibold text-lg">💡 Sugestões Geradas:</h3>
              {suggestions.map((suggestion, index) => (
                <Card key={index} className="border-l-4 border-l-blue-500">
                  <CardContent className="pt-4">
                    <h4 className="font-medium">{suggestion.title}</h4>
                    <p className="text-gray-600 text-sm mt-1">
                      {suggestion.description}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}