// src/app/api/webhooks/stripe/route.ts
// Redirecionamento para o endpoint correto do webhook
import { NextRequest, NextResponse } from 'next/server';

// Importa diretamente a função do endpoint correto
import { POST as StripeWebhookPOST } from '../../stripe/webhook/route';

// Redireciona todas as requisições para o endpoint correto
export async function POST(request: NextRequest) {
  // Chama diretamente a função do endpoint correto
  // Isso preserva o corpo da requisição e os headers originais
  return StripeWebhookPOST(request);
}

export async function GET() {
  return new Response('Webhook endpoint - use POST', { status: 405 });
}