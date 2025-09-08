'use client';

import { useState, useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  CheckCircle,
  Loader2,
  Building2,
  Users,
  Settings,
  Rocket,
  Sparkles,
  Shield,
  Zap,
  ChevronRight,
} from 'lucide-react';
import { Logo } from '@/components/ui/logo';
import Link from 'next/link';

interface SessionData {
  customerEmail: string;
  tenantSlug: string;
  plan: string;
  error?: string;
}

const steps = [
  {
    id: 1,
    title: 'Pagamento Confirmado',
    description: 'Sua assinatura foi ativada com sucesso',
    icon: CheckCircle,
  },
  {
    id: 2,
    title: 'Configuração da Empresa',
    description: 'Vamos configurar os dados da sua empresa',
    icon: Building2,
  },
  {
    id: 3,
    title: 'Convite da Equipe',
    description: 'Convide membros para sua equipe',
    icon: Users,
  },
  {
    id: 4,
    title: 'Configurações Iniciais',
    description: 'Defina as configurações básicas do sistema',
    icon: Settings,
  },
];

export default function OnboardingPage() {
  const [loading, setLoading] = useState(true);
  const [sessionData, setSessionData] = useState<SessionData | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [currentStep, setCurrentStep] = useState(1);
  const searchParams = useSearchParams();
  const router = useRouter();
  const sessionId = searchParams?.get('session_id');
  const tenantSlug = searchParams?.get('tenant');

  useEffect(() => {
    if (sessionId && tenantSlug) {
      // ✅ CORREÇÃO: Verificação real da sessão
      fetch(`/api/stripe/verify-session?session_id=${sessionId}`)
        .then(async res => {
          if (!res.ok) {
            const errorData = await res.json().catch(() => null);
            throw new Error(
              errorData?.error || `Falha na verificação: ${res.statusText}`
            );
          }
          return res.json() as Promise<SessionData>;
        })
        .then(data => {
          if (data.error) {
            throw new Error(data.error);
          }
          setSessionData(data);
        })
        .catch((err: Error) => {
          console.error('Erro ao verificar sessão:', err);
          setError(err.message || 'Não foi possível verificar seu pagamento.');
        })
        .finally(() => {
          setLoading(false);
        });
    } else {
      setLoading(false);
      setError('Sessão de pagamento não encontrada ou inválida.');
    }
  }, [sessionId, tenantSlug]);

  const handleNextStep = () => {
    if (currentStep < steps.length) {
      setCurrentStep(prev => prev + 1);
    } else {
      // ✅ CORREÇÃO: Redirecionar para o tenant específico
      router.push(`/${tenantSlug}/dashboard/configuracoes`);
    }
  };

  if (loading) return <OnboardingLoadingScreen />;

  if (error || !sessionData) return <OnboardingErrorScreen error={error} />;

  const currentStepData = steps[currentStep - 1];
  const Icon = currentStepData.icon;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <Logo href="/" size="md" variant="default" />
            <Badge className="bg-green-100 text-green-800 px-3 py-1 rounded-md text-sm font-medium">
              <CheckCircle className="w-4 h-4 mr-1" />
              Conta Ativa
            </Badge>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-6 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Welcome Section */}
          <div className="text-center mb-8">
            <h1 className="text-2xl font-semibold text-gray-900 mb-2">
              Bem-vindo à Triaxia
            </h1>
            <p className="text-gray-600 max-w-xl mx-auto">
              Configure sua conta em alguns passos simples.
            </p>
          </div>

          {/* Progress Steps */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-6 max-w-2xl mx-auto">
              {steps.map((step, index) => (
                <div key={step.id} className="flex items-center">
                  <div className="flex flex-col items-center">
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                        step.id <= currentStep
                          ? 'bg-blue-600 text-white'
                          : 'bg-gray-200 text-gray-500'
                      }`}
                    >
                      {step.id < currentStep ? (
                        <CheckCircle className="w-4 h-4" />
                      ) : (
                        step.id
                      )}
                    </div>
                    <span
                      className={`text-xs mt-1 ${
                        step.id <= currentStep
                          ? 'text-gray-900'
                          : 'text-gray-500'
                      }`}
                    >
                      {step.title.split(' ')[0]}
                    </span>
                  </div>
                  {index < steps.length - 1 && (
                    <div
                      className={`flex-1 h-0.5 mx-3 ${
                        step.id < currentStep
                          ? 'bg-blue-600'
                          : 'bg-gray-200'
                      }`}
                    />
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Current Step Content */}
          <Card className="bg-white border border-gray-200 shadow-sm max-w-3xl mx-auto">
            <CardHeader className="text-center pb-6">
              <div className="w-12 h-12 rounded-lg bg-blue-100 flex items-center justify-center mx-auto mb-4">
                <Icon className="w-6 h-6 text-blue-600" />
              </div>
              <CardTitle className="text-xl font-semibold text-gray-900 mb-2">
                {currentStepData.title}
              </CardTitle>
              <CardDescription className="text-gray-600">
                {currentStepData.description}
              </CardDescription>
            </CardHeader>

            <CardContent className="space-y-6 px-6 pb-6">
              {currentStep === 1 && (
                <div className="space-y-4">
                  <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                    <div className="flex items-center mb-3">
                      <CheckCircle className="w-5 h-5 text-green-600 mr-2" />
                      <h3 className="text-lg font-medium text-green-800">
                        Pagamento Confirmado
                      </h3>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      <div className="bg-white rounded-md p-3 border border-green-100">
                        <p className="text-sm text-gray-600 mb-1">
                          Email da Conta
                        </p>
                        <p className="font-medium text-gray-900">
                          {sessionData.customerEmail}
                        </p>
                      </div>
                      <div className="bg-white rounded-md p-3 border border-green-100">
                        <p className="text-sm text-gray-600 mb-1">
                          Empresa
                        </p>
                        <p className="font-medium text-gray-900 capitalize">
                          {sessionData.tenantSlug}
                        </p>
                      </div>
                      <div className="bg-white rounded-md p-3 border border-green-100">
                        <p className="text-sm text-gray-600 mb-1">
                          Plano Selecionado
                        </p>
                        <p className="font-medium text-gray-900 capitalize">
                          {sessionData.plan}
                        </p>
                      </div>
                      <div className="bg-white rounded-md p-3 border border-green-100">
                        <p className="text-sm text-gray-600 mb-1">
                          Período de Teste
                        </p>
                        <p className="font-medium text-gray-900">14 dias grátis</p>
                      </div>
                    </div>
                  </div>
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <div className="flex items-center mb-2">
                      <Rocket className="w-5 h-5 text-blue-600 mr-2" />
                      <h3 className="text-lg font-medium text-blue-800">
                        Próximos Passos
                      </h3>
                    </div>
                    <p className="text-gray-700">
                      Sua assinatura está ativa! Configure sua conta nos próximos passos.
                    </p>
                  </div>
                </div>
              )}

              {currentStep === 2 && (
                <div className="space-y-4">
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <div className="flex items-center mb-3">
                      <Building2 className="w-5 h-5 text-blue-600 mr-2" />
                      <h3 className="text-lg font-medium text-blue-800">
                        Configuração da Empresa
                      </h3>
                    </div>
                    <p className="text-gray-700 mb-4">
                      Personalize sua empresa com logo, cores e informações específicas.
                    </p>
                    <div className="bg-white rounded-md p-3 border border-blue-100">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <Settings className="w-4 h-4 text-blue-600 mr-2" />
                          <span className="text-sm font-medium text-gray-900">
                            Configurações da Empresa
                          </span>
                        </div>
                        <Link href={`/${tenantSlug}/dashboard/configuracoes`}>
                          <Button size="sm" className="bg-blue-600 hover:bg-blue-700 text-white">
                            Configurar
                          </Button>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {currentStep === 3 && (
                <div className="space-y-4">
                  <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
                    <div className="flex items-center mb-3">
                      <Users className="w-5 h-5 text-purple-600 mr-2" />
                      <h3 className="text-lg font-medium text-purple-800">
                        Convite da Equipe
                      </h3>
                    </div>
                    <p className="text-gray-700 mb-4">
                      Convide membros da sua equipe para colaborar.
                    </p>
                    <div className="bg-white rounded-md p-3 border border-purple-100">
                      <div className="flex items-center">
                        <Users className="w-4 h-4 text-purple-600 mr-2" />
                        <span className="text-sm font-medium text-gray-900">
                          Gerenciamento de Equipe
                        </span>
                      </div>
                      <p className="text-sm text-gray-600 mt-1">
                        Gerencie convites e permissões através do
                        dashboard.
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {currentStep === 4 && (
                <div className="space-y-4">
                  <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
                    <div className="flex items-center mb-3">
                      <Settings className="w-5 h-5 text-orange-600 mr-2" />
                      <h3 className="text-lg font-medium text-orange-800">
                        Configurações Iniciais
                      </h3>
                    </div>
                    <p className="text-gray-700 mb-3">
                      Defina as configurações básicas do sistema.
                    </p>
                    <div className="bg-white rounded-md p-3 border border-orange-100">
                      <div className="flex items-center mb-1">
                        <Settings className="w-4 h-4 text-orange-600 mr-2" />
                        <span className="text-sm font-medium text-gray-900">
                          Configurações Flexíveis
                        </span>
                      </div>
                      <p className="text-sm text-gray-600">
                        Todas as configurações podem ser alteradas posteriormente.
                      </p>
                    </div>
                  </div>
                  <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                    <div className="flex items-center mb-2">
                      <Rocket className="w-5 h-5 text-green-600 mr-2" />
                      <h3 className="text-lg font-medium text-green-800">
                        Tudo Pronto!
                      </h3>
                    </div>
                    <p className="text-gray-700">
                      Sua conta está configurada e pronta para uso.
                    </p>
                  </div>
                </div>
              )}

              <div className="flex justify-center pt-6">
                <Button
                  onClick={handleNextStep}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-2"
                >
                  {currentStep === steps.length ? (
                    <div className="flex items-center space-x-2">
                      <Rocket className="w-4 h-4" />
                      <span>Ir para Dashboard</span>
                    </div>
                  ) : (
                    <div className="flex items-center space-x-2">
                      <span>Continuar</span>
                      <ChevronRight className="w-4 h-4" />
                    </div>
                  )}
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

const OnboardingLoadingScreen = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <Card className="bg-white border border-gray-200 shadow-sm max-w-md w-full mx-4">
        <CardContent className="pt-8 pb-8">
          <div className="text-center">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-4">
              <Loader2 className="w-6 h-6 text-blue-600 animate-spin" />
            </div>
            <h2 className="text-xl font-semibold text-gray-900 mb-2">
              Processando seu pagamento
            </h2>
            <p className="text-gray-600">
              Aguarde enquanto confirmamos sua assinatura.
            </p>
            <div className="flex items-center justify-center space-x-4 text-sm text-gray-500">
              <div className="flex items-center space-x-1">
                <Shield className="w-4 h-4 text-green-500" />
                <span>Seguro</span>
              </div>
              <div className="flex items-center space-x-1">
                <Zap className="w-4 h-4 text-blue-500" />
                <span>Rápido</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

const OnboardingErrorScreen = ({ error }: { error: string | null }) => {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <Card className="bg-white border border-gray-200 shadow-sm max-w-md w-full mx-4">
        <CardContent className="pt-8 pb-8">
          <div className="text-center">
            <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center mx-auto mb-4">
              <span className="text-red-600 text-xl">⚠️</span>
            </div>
            <h2 className="text-xl font-semibold text-gray-900 mb-2">
              Ocorreu um Problema
            </h2>
            <p className="text-gray-600 mb-6">
              {error ||
                'Não foi possível verificar seu pagamento. Tente novamente.'}
            </p>
            <div className="space-y-3">
              <Link href="/pricing">
                <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white">
                  Voltar aos Planos
                </Button>
              </Link>
              <p className="text-sm text-gray-500">
                Precisa de ajuda? Entre em contato conosco
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
