'use client';

import { useEffect, useRef, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import {
  CheckCircle,
  Mail,
  Clock,
  Shield,
  ArrowRight,
  RefreshCw,
  XCircle,
  AlertCircle,
} from 'lucide-react';
import Link from 'next/link';

type FinalizeState =
  | { status: 'idle' }
  | { status: 'loading' }
  | { status: 'success'; message?: string }
  | { status: 'error'; message: string };

export default function PurchaseSuccessPage() {
  const searchParams = useSearchParams();
  const [email, setEmail] = useState('');
  const [tenantName, setTenantName] = useState('');
  const [state, setState] = useState<FinalizeState>({ status: 'idle' });
  const [showPage, setShowPage] = useState(false);
  const [minimumTimeElapsed, setMinimumTimeElapsed] = useState(false);

  // Evita rodar efeito duas vezes no modo DEV (StrictMode)
  const ranOnce = useRef(false);
  
  // Evita que a página feche muito rapidamente
  useEffect(() => {
    // Mostra a página imediatamente
    setShowPage(true);
    
    // Garante um tempo mínimo de visualização de 3 segundos
    const timer = setTimeout(() => {
      setMinimumTimeElapsed(true);
    }, 3000);
    
    return () => clearTimeout(timer);
  }, []);
  
  // Evita fechamento acidental da página
  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      if (!minimumTimeElapsed) {
        e.preventDefault();
        e.returnValue = 'Sua compra está sendo processada. Tem certeza que deseja sair?';
        return e.returnValue;
      }
    };
    
    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => window.removeEventListener('beforeunload', handleBeforeUnload);
  }, [minimumTimeElapsed]);

  const sessionId = searchParams?.get('session_id') ?? '';
  const emailParam = searchParams?.get('email') ?? '';
  const tenantParam = searchParams?.get('tenant') ?? '';

  useEffect(() => {
    setEmail(emailParam);
    setTenantName(tenantParam);
  }, [emailParam, tenantParam]);

  useEffect(() => {
    if (!sessionId) {
      console.log('[PurchaseSuccess] Sem sessionId, não finalizando');
      return;
    }
    if (ranOnce.current) {
      console.log('[PurchaseSuccess] Já executou uma vez, pulando');
      return;
    }
    ranOnce.current = true;

    console.log('[PurchaseSuccess] Executando finalização');
    const finalize = async () => {
      setState({ status: 'loading' });
      try {
        console.log('[PurchaseSuccess] Iniciando finalização para session:', sessionId);
        const res = await fetch('/api/stripe/finalize', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ session_id: sessionId }),
        });
        
        console.log('[PurchaseSuccess] Resposta da API:', res.status, res.statusText);
        
        if (!res.ok) {
          const txt = await res.text().catch(() => '');
          console.error('[PurchaseSuccess] Erro na API:', txt);
          setState({
            status: 'error',
            message: txt || 'Falha ao finalizar a compra.',
          });
          return;
        }
        const data = await res.json().catch(() => ({}));
        console.log('[PurchaseSuccess] Dados recebidos:', data);
        setState({
          status: 'success',
          message: data?.message || 'Compra finalizada!',
        });
      } catch (e: any) {
        console.error('[PurchaseSuccess] Erro de rede:', e);
        setState({
          status: 'error',
          message: e?.message || 'Erro de rede ao finalizar.',
        });
      }
    };

    finalize();
  }, [sessionId]);

  const retry = () => {
    ranOnce.current = false;
    setState({ status: 'idle' });
  };

  if (!showPage) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-xl p-8 text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Carregando sua confirmação de compra...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-6">
          {/* Header com ícone de sucesso */}
          <div className="text-center mb-6">
            <div className="inline-flex items-center justify-center w-12 h-12 bg-green-50 border border-green-200 rounded-full mb-3">
              {state.status === 'error' ? (
                <XCircle className="w-6 h-6 text-red-600" />
              ) : (
                <CheckCircle className="w-6 h-6 text-green-600" />
              )}
            </div>
            
            <h1 className="text-xl font-semibold text-gray-900 mb-1">
              {state.status === 'error'
                ? 'Falha no processamento'
                : 'Pagamento confirmado'}
            </h1>
            
            <p className="text-sm text-gray-600">
              {state.status === 'error'
                ? 'Ocorreu um problema ao processar sua compra.'
                : tenantName
                ? `Obrigado por escolher a Triaxia para ${tenantName}.`
                : 'Obrigado por escolher a Triaxia.'}
            </p>
          </div>

          {/* Status de processamento */}
          {!minimumTimeElapsed && state.status !== 'error' && (
            <div className="bg-blue-50 border border-blue-200 rounded-md p-2 mb-4">
              <div className="flex items-center text-xs text-blue-800">
                <RefreshCw className="w-3 h-3 mr-2 animate-spin" />
                Processando sua compra. Aguarde um momento.
              </div>
            </div>
          )}

          {/* Status de finalização */}
          {state.status === 'loading' && (
            <div className="bg-blue-50 border border-blue-200 rounded-md p-2 mb-4">
              <div className="flex items-center text-xs text-blue-800">
                <RefreshCw className="w-3 h-3 mr-2 animate-spin" />
                Finalizando sua compra e preparando seu acesso.
              </div>
            </div>
          )}

          {state.status === 'success' && (
            <div className="bg-green-50 border border-green-200 rounded-md p-2 mb-4">
              <div className="flex items-center text-xs text-green-800">
                <CheckCircle className="w-3 h-3 mr-2" />
                Finalizado e email de ativação enviado.
              </div>
            </div>
          )}

          {/* Próximos passos */}
          {state.status !== 'error' && (
            <div className="space-y-4">
              <div>
                <h2 className="text-base font-medium text-gray-900 mb-3">
                  Próximos passos para acessar sua conta
                </h2>
                
                <div className="space-y-3">
                  <div className="flex items-start space-x-2">
                    <div className="flex-shrink-0 w-5 h-5 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-xs font-medium">
                      1
                    </div>
                    <div>
                      <h3 className="text-sm font-medium text-gray-900">Verifique seu email</h3>
                      <p className="text-xs text-gray-600">
                        Enviamos um email de ativação para{' '}
                        <span className="font-medium">{email || 'seu email'}</span>.
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-2">
                    <div className="flex-shrink-0 w-5 h-5 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-xs font-medium">
                      2
                    </div>
                    <div>
                      <h3 className="text-sm font-medium text-gray-900">Crie sua senha</h3>
                      <p className="text-xs text-gray-600">
                        Clique no link 'Ativar Conta' no email e defina uma senha segura.
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-2">
                    <div className="flex-shrink-0 w-5 h-5 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-xs font-medium">
                      3
                    </div>
                    <div>
                      <h3 className="text-sm font-medium text-gray-900">Faça login e comece</h3>
                      <p className="text-xs text-gray-600">
                        Após criar sua senha, acesse a página de login.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Botão de login */}
              <div className="pt-3 border-t border-gray-200">
                <a 
                  href="/login"
                  className="w-full inline-flex items-center justify-center px-3 py-2 border border-gray-300 rounded-md shadow-sm bg-white text-xs font-medium text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  Ir para página de login
                  <ArrowRight className="w-3 h-3 ml-1" />
                </a>
                <p className="text-xs text-gray-500 text-center mt-1">
                  Disponível após ativar sua conta
                </p>
              </div>
            </div>
          )}

          {/* Informações de segurança */}
          {state.status !== 'error' && (
            <div className="mt-4 pt-3 border-t border-gray-200">
              <div className="grid grid-cols-2 gap-3 text-center">
                <div className="flex flex-col items-center">
                  <Clock className="w-4 h-4 text-gray-400 mb-1" />
                  <p className="text-xs text-gray-600">
                    <span className="font-medium">48h</span> para ativar
                  </p>
                </div>
                <div className="flex flex-col items-center">
                  <Shield className="w-4 h-4 text-gray-400 mb-1" />
                  <p className="text-xs text-gray-600">
                    <span className="font-medium">Seguro</span> e protegido
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Ajuda / erro */}
          {state.status === 'error' && (
            <div className="bg-red-50 border border-red-200 text-left text-red-800 rounded-lg p-4 mb-6">
              <p className="font-semibold mb-1">
                Não conseguimos finalizar automaticamente.
              </p>
              <p className="text-sm opacity-90">Detalhes: {state.message}</p>
              <button
                onClick={retry}
                className="mt-3 inline-flex items-center px-4 py-2 rounded-md bg-red-600 text-white hover:bg-red-700"
              >
                Tentar novamente
                <RefreshCw className="w-4 h-4 ml-2" />
              </button>
            </div>
          )}

          {/* Ações */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/login"
              className={`inline-flex items-center justify-center px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors ${!minimumTimeElapsed ? 'opacity-60 pointer-events-none' : ''}`}
              onClick={(e) => {
                if (!minimumTimeElapsed) {
                  e.preventDefault();
                  alert('Por favor, aguarde o processamento finalizar antes de prosseguir.');
                }
              }}
            >
              Ir para o login
              <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
            <Link
              href="/"
              className={`inline-flex items-center justify-center px-6 py-3 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition-colors ${!minimumTimeElapsed ? 'opacity-60 pointer-events-none' : ''}`}
              onClick={(e) => {
                if (!minimumTimeElapsed) {
                  e.preventDefault();
                  alert('Por favor, aguarde o processamento finalizar antes de prosseguir.');
                }
              }}
            >
              Voltar ao início
            </Link>
          </div>

          <div className="mt-8 pt-6 border-t border-gray-200 text-sm text-gray-500">
            Não recebeu? Verifique o spam, aguarde alguns minutos ou fale com
            <a
              className="text-blue-600 hover:underline ml-1"
              href="mailto:suporte@triaxia.com.br"
            >
              suporte@triaxia.com.br
            </a>
            .
          </div>
        </div>

        <div className="mt-6 text-center text-sm text-gray-500">
          Triaxia © {new Date().getFullYear()}
        </div>
      </div>
    </div>
  );
}

function Step({
  n,
  title,
  desc,
}: {
  n: number;
  title: string;
  desc: React.ReactNode;
}) {
  return (
    <div className="flex items-start">
      <div className="bg-blue-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold mr-3 mt-0.5">
        {n}
      </div>
      <div>
        <p className="font-medium text-gray-900">{title}</p>
        <p className="text-gray-600 text-sm">{desc}</p>
      </div>
    </div>
  );
}

function Info({
  color,
  icon,
  title,
  children,
}: {
  color: 'yellow' | 'green';
  icon: React.ReactNode;
  title: string;
  children: React.ReactNode;
}) {
  const map = {
    yellow: 'bg-yellow-50 border-yellow-200 text-yellow-800',
    green: 'bg-green-50 border-green-200 text-green-800',
  } as const;
  return (
    <div className={`${map[color]} border rounded-lg p-4`}>
      <div className="flex items-center mb-2">
        {icon}
        <h3
          className={`font-semibold ${color === 'yellow' ? 'text-yellow-900' : 'text-green-900'}`}
        >
          {title}
        </h3>
      </div>
      <p className="text-sm">{children}</p>
    </div>
  );
}
