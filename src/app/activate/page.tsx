'use client';

import { useState, useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { CheckCircle, AlertTriangle, Loader2, Eye, EyeOff, Lock, Mail, Shield } from 'lucide-react';
import Link from 'next/link';
// Removido import da função do servidor - agora usamos API route

type ActivationStatus = 'idle' | 'validating' | 'valid' | 'expired' | 'invalid' | 'activating' | 'success' | 'error';

export default function ActivatePage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [status, setStatus] = useState<ActivationStatus>('idle');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState('');
  const [tokenData, setTokenData] = useState<any>(null);

  const token = searchParams?.get('token');

  useEffect(() => {
    if (!token) {
      setStatus('invalid');
      setError('Token de ativação não fornecido');
      return;
    }

    setStatus('validating');
    
    // Validar token via API route
    fetch(`/api/auth/activate?token=${encodeURIComponent(token)}`)
      .then(response => response.json())
      .then((result) => {
        if (!result.isValid) {
          setStatus('invalid');
          setError(result.error || 'Token de ativação inválido ou expirado');
          return;
        }

        setTokenData(result.data);
        setStatus('valid');
      })
      .catch((err) => {
        setStatus('expired');
        setError('Erro ao validar token de ativação');
      });
  }, [token]);

  const handleActivation = async () => {
    if (!password || !confirmPassword) {
      setError('Por favor, preencha todos os campos');
      return;
    }

    if (password !== confirmPassword) {
      setError('As senhas não coincidem');
      return;
    }

    if (password.length < 8) {
      setError('A senha deve ter pelo menos 8 caracteres');
      return;
    }

    setStatus('activating');
    setError('');

    try {
      const response = await fetch('/api/auth/activate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          token,
          password,
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || 'Erro ao ativar conta');
      }

      setStatus('success');
      
      // Redirecionar após 3 segundos com informações do tenant
      setTimeout(() => {
        const tenantSlug = result.user?.tenant?.slug || tokenData?.tenantSlug;
        const loginUrl = tenantSlug 
          ? `/login?message=account-activated&tenant=${tenantSlug}`
          : '/login?message=account-activated';
        router.push(loginUrl);
      }, 3000);
    } catch (err) {
      setStatus('error');
      setError(err instanceof Error ? err.message : 'Erro interno do servidor');
    }
  };

  const renderContent = () => {
    switch (status) {
      case 'idle':
      case 'validating':
        return (
          <div className="flex flex-col items-center justify-center space-y-4">
            <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
            <p className="text-gray-600">Validando token de ativação...</p>
          </div>
        );

      case 'invalid':
      case 'expired':
        return (
          <div className="space-y-4">
            <Alert className="border-red-200 bg-red-50">
              <AlertTriangle className="h-4 w-4 text-red-600" />
              <AlertDescription className="text-red-800">
                {error}
              </AlertDescription>
            </Alert>
            <div className="flex justify-center">
              <Link href="/login">
                <Button variant="outline">
                  Voltar ao Login
                </Button>
              </Link>
            </div>
          </div>
        );

      case 'valid':
        return (
          <div className="space-y-6">
            <div className="text-center space-y-2">
              <Shield className="h-12 w-12 text-green-600 mx-auto" />
              <h2 className="text-xl font-semibold text-gray-900">
                Ativar Conta
              </h2>
              <p className="text-gray-600">
                Olá, {tokenData?.email}! Defina sua senha para ativar sua conta.
              </p>
            </div>

            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="password">Nova Senha</Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Digite sua nova senha"
                    className="pr-10"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="confirmPassword">Confirmar Senha</Label>
                <div className="relative">
                  <Input
                    id="confirmPassword"
                    type={showConfirmPassword ? 'text' : 'password'}
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="Confirme sua nova senha"
                    className="pr-10"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>

              {error && (
                <Alert className="border-red-200 bg-red-50">
                  <AlertTriangle className="h-4 w-4 text-red-600" />
                  <AlertDescription className="text-red-800">
                    {error}
                  </AlertDescription>
                </Alert>
              )}

              <Button 
                onClick={handleActivation}
                className="w-full"
                disabled={!password || !confirmPassword}
              >
                <Lock className="h-4 w-4 mr-2" />
                Ativar Conta
              </Button>
            </div>
          </div>
        );

      case 'activating':
        return (
          <div className="flex flex-col items-center justify-center space-y-4">
            <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
            <p className="text-gray-600">Ativando sua conta...</p>
          </div>
        );

      case 'success':
        return (
          <div className="text-center space-y-4">
            <CheckCircle className="h-16 w-16 text-green-600 mx-auto" />
            <div className="space-y-2">
              <h2 className="text-xl font-semibold text-gray-900">
                Conta Ativada com Sucesso!
              </h2>
              <p className="text-gray-600">
                Sua conta foi ativada. Você será redirecionado para o login em alguns segundos.
              </p>
            </div>
            <Link href="/login">
              <Button>
                <Mail className="h-4 w-4 mr-2" />
                Ir para Login
              </Button>
            </Link>
          </div>
        );

      case 'error':
        return (
          <div className="space-y-4">
            <Alert className="border-red-200 bg-red-50">
              <AlertTriangle className="h-4 w-4 text-red-600" />
              <AlertDescription className="text-red-800">
                {error}
              </AlertDescription>
            </Alert>
            <div className="flex justify-center space-x-2">
              <Button 
                onClick={() => {
                  setStatus('valid');
                  setError('');
                }}
                variant="outline"
              >
                Tentar Novamente
              </Button>
              <Link href="/login">
                <Button variant="outline">
                  Voltar ao Login
                </Button>
              </Link>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold text-gray-900">
            Ativação de Conta
          </CardTitle>
          <CardDescription>
            Complete o processo de ativação da sua conta
          </CardDescription>
        </CardHeader>
        <CardContent>
          {renderContent()}
        </CardContent>
      </Card>
    </div>
  );
}
