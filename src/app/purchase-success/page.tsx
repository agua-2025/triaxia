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
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="max-w-2xl w-full">
        <div className="bg-white rounded-2xl shadow-xl p-8 text-center">
          <div className="flex justify-center mb-6">
            <div
              className={`rounded-full p-4 ${state.status === 'error' ? 'bg-red-100' : 'bg-green-100'}`}
            >
              {state.status === 'error' ? (
                <XCircle className="w-16 h-16 text-red-600" />
              ) : (
                <CheckCircle className="w-16 h-16 text-green-600" />
              )}
            </div>
          </div>

          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            {state.status === 'error'
              ? 'Ops! Algo deu errado'
              : '🎉 Pagamento realizado com sucesso!'}
          </h1>
          
          {!minimumTimeElapsed && (
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 mb-4">
              <p className="text-sm text-blue-700">
                ⏱️ Processando sua compra... Por favor, não feche esta página.
              </p>
            </div>
          )}

          <p className="text-lg text-gray-600 mb-6">
            {tenantName ? (
              <>
                Obrigado por escolher a Triaxia para{' '}
                <strong>{tenantName}</strong>!
              </>
            ) : (
              'Obrigado por escolher a Triaxia!'
            )}
          </p>

          {/* Status de Finalização */}
          {state.status !== 'error' && (
            <div className="mb-6">
              {state.status === 'loading' && (
                <div className="inline-flex items-center text-blue-700 bg-blue-50 border border-blue-200 rounded-lg px-4 py-2">
                  <RefreshCw className="w-5 h-5 mr-2 animate-spin" />
                  Finalizando sua compra e preparando seu acesso…
                </div>
              )}
              {state.status === 'success' && (
                <div className="inline-flex items-center text-green-700 bg-green-50 border border-green-200 rounded-lg px-4 py-2">
                  <CheckCircle className="w-5 h-5 mr-2" />
                  {state.message || 'Tudo pronto!'}
                </div>
              )}
            </div>
          )}

          {/* Card de próximos passos */}
          <div className="bg-blue-50 border border-blue-200 rounded-xl p-6 mb-8">
            <div className="flex items-center justify-center mb-4">
              <Mail className="w-8 h-8 text-blue-600 mr-3" />
              <h2 className="text-xl font-semibold text-blue-900">
                Próximos Passos para Acessar sua Conta
              </h2>
            </div>

            <div className="text-left space-y-4">
              <Step
                n={1}
                title="📧 Verifique seu email"
                desc={
                  <>
                    Enviamos um email de ativação para{' '}
                    <span className="font-medium text-blue-600">
                      {email || 'seu email'}
                    </span>
                    . Verifique sua caixa de entrada e spam.
                  </>
                }
              />
              <Step
                n={2}
                title="🔐 Crie sua senha"
                desc="Clique no link 'Ativar Conta' no email e defina uma senha segura para sua conta."
              />
              <Step
                n={3}
                title="🚀 Faça login e comece"
                desc={
                  <>
                    Após criar sua senha, acesse{' '}
                    <span className="font-medium text-blue-600">
                      {typeof window !== 'undefined' ? window.location.origin : ''}/login
                    </span>
                    {' '}com seu email e senha.
                  </>
                }
              />
            </div>

            {/* Botão de acesso direto ao login */}
            <div className="mt-6 pt-4 border-t border-blue-200">
              <div className="text-center">
                <p className="text-sm text-blue-700 mb-3">
                  💡 <strong>Dica:</strong> Após ativar sua conta, use este link para fazer login:
                </p>
                <a 
                  href="/login"
                  className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  <span>Página de Login</span>
                  <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-1M14 1h6m0 0v6m0-6L10 11" />
                  </svg>
                </a>
                <p className="text-xs text-blue-600 mt-2">
                  ⚠️ Só funciona após ativar sua conta pelo email
                </p>
              </div>
            </div>
          </div>

          {/* Informações importantes */}
          <div className="grid md:grid-cols-2 gap-4 mb-8">
            <Info
              color="yellow"
              icon={<Clock className="w-5 h-5 text-yellow-600 mr-2" />}
              title="Tempo limite"
            >
              O link de ativação expira em <strong>48 horas</strong>.
            </Info>
            <Info
              color="green"
              icon={<Shield className="w-5 h-5 text-green-600 mr-2" />}
              title="Segurança"
            >
              Sua conta está protegida com criptografia avançada.
            </Info>
          </div>

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
