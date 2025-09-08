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

  // Evita rodar efeito duas vezes no modo DEV (StrictMode)
  const ranOnce = useRef(false);

  const sessionId = searchParams?.get('session_id') ?? '';
  const emailParam = searchParams?.get('email') ?? '';
  const tenantParam = searchParams?.get('tenant') ?? '';

  useEffect(() => {
    setEmail(emailParam);
    setTenantName(tenantParam);
  }, [emailParam, tenantParam]);

  useEffect(() => {
    if (!sessionId) return;
    if (ranOnce.current) return;
    ranOnce.current = true;

    const finalize = async () => {
      setState({ status: 'loading' });
      try {
        const res = await fetch('/api/stripe/finalize', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ session_id: sessionId }),
        });
        if (!res.ok) {
          const txt = await res.text().catch(() => '');
          setState({
            status: 'error',
            message: txt || 'Falha ao finalizar a compra.',
          });
          return;
        }
        const data = await res.json().catch(() => ({}));
        setState({
          status: 'success',
          message: data?.message || 'Compra finalizada!',
        });
      } catch (e: any) {
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
                Verifique seu email para ativar sua conta
              </h2>
            </div>

            <div className="text-left space-y-4">
              <Step
                n={1}
                title="Email de ativação enviado"
                desc={
                  <>
                    Enviamos um email para{' '}
                    <span className="font-medium text-blue-600">
                      {email || 'seu email'}
                    </span>
                    .
                  </>
                }
              />
              <Step
                n={2}
                title="Clique no link de ativação"
                desc="Abra o email e clique em “Ativar conta” para criar sua senha."
              />
              <Step
                n={3}
                title="Acesse sua conta"
                desc="Após ativar, faça login e comece a usar o sistema."
              />
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
              className="inline-flex items-center justify-center px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors"
            >
              Ir para o login
              <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
            <Link
              href="/"
              className="inline-flex items-center justify-center px-6 py-3 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition-colors"
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
