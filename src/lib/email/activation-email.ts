import * as nodemailer from 'nodemailer';
import { z } from 'zod';

const mailer = nodemailer.createTransport({
  host: process.env.SMTP_HOST || 'smtp.zoho.com',
  port: Number(process.env.SMTP_PORT || 587),
  secure: Number(process.env.SMTP_PORT || 587) === 465, // 465=SSL, 587=STARTTLS
  auth: {
    user: process.env.SMTP_USER!, // contato@triaxia.com.br
    pass: (process.env.SMTP_PASS || '').trim(), // senha de app Zoho
  },
  tls: { minVersion: 'TLSv1.2' },
});

// Verificação única por processo
let smtpVerified = false;
async function ensureSmtp() {
  if (!smtpVerified) {
    console.log('[SMTP] verificando…');
    await mailer.verify();
    smtpVerified = true;
    console.log('[SMTP] OK');
  }
}

const esc = (s: string) =>
  s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');

const activationEmailSchema = z.object({
  email: z.string().email('Email inválido'),
  name: z.string().min(1, 'Nome é obrigatório'),
  tenantName: z.string().min(1),
  tenantSlug: z.string().min(1),
  activationToken: z.string().min(1),
  expiresInHours: z.number().optional(),
});

export async function sendActivationEmail(
  data: z.infer<typeof activationEmailSchema>
): Promise<{ success: boolean; error?: string }> {
  const start = Date.now();
  try {
    await ensureSmtp();
    const v = activationEmailSchema.parse(data);

    const base = (
      process.env.NEXT_PUBLIC_APP_URL || 'https://triaxia.com.br'
    ).replace(/\/$/, '');
    const activationUrl = `${base}/activate?token=${v.activationToken}`;
    const expiresIn = v.expiresInHours ?? 48;

    const html = generateActivationEmailHtml({
      ...v,
      activationUrl,
      expiresIn,
    });

    const info = await mailer.sendMail({
      from: process.env.SMTP_FROM || process.env.SMTP_USER!,
      to: v.email,
      replyTo:
        process.env.SMTP_REPLY_TO ||
        process.env.SMTP_FROM ||
        process.env.SMTP_USER!,
      headers: {
        'List-Unsubscribe': `<mailto:${process.env.SMTP_USER}?subject=unsubscribe>`,
      },
      subject: `Ative sua conta - ${v.tenantName}`,
      html,
      text: `Ative sua conta: ${activationUrl}\nO link expira em ${expiresIn} horas.`,
    });

    console.log('[MAIL] Activation sent', {
      to: v.email,
      ms: Date.now() - start,
      id: info.messageId,
    });
    return { success: true };
  } catch (err: any) {
    console.error('[MAIL] Activation error:', err?.message || err);
    return { success: false, error: 'Falha ao enviar e-mail de ativação' };
  }
}

function generateActivationEmailHtml(
  data: z.infer<typeof activationEmailSchema> & { activationUrl: string; expiresIn: number }
): string {
  return `
  <div style="font-family: system-ui,-apple-system,'Segoe UI',Roboto,Arial,sans-serif; max-width:600px; margin:0 auto; border:1px solid #e5e7eb; border-radius:12px; overflow:hidden">
    <div style="background:#111827; color:#fff; padding:28px 24px; text-align:center">
      <h1 style="margin:0; font-size:24px; font-weight:700">Bem-vindo à ${esc(data.tenantName)}!</h1>
      <p style="margin:8px 0 0 0; opacity:.9">Ative sua conta e crie sua senha</p>
    </div>
    <div style="padding:28px 24px">
      <p>Olá <strong>${esc(data.name)}</strong>,</p>
      <p>Para começar a usar a plataforma, ative sua conta:</p>
      <div style="text-align:center; margin:24px 0">
        <a href="${data.activationUrl}" style="display:inline-block; background:#1d4ed8; color:#fff; padding:14px 24px; border-radius:8px; text-decoration:none; font-weight:600">🚀 Ativar minha conta</a>
      </div>
      <div style="background:#fef3c7; border:1px solid #f59e0b; color:#92400e; border-radius:8px; padding:12px;">
        <strong>Importante:</strong> este link expira em <strong>${data.expiresIn} horas</strong>.
      </div>
      <p style="font-size:13px; color:#6b7280; margin-top:16px">Se o botão não funcionar, copie o link:<br><a href="${data.activationUrl}">${data.activationUrl}</a></p>
    </div>
    <div style="background:#f9fafb; padding:20px; text-align:center; font-size:12px; color:#6b7280">
      Este e-mail foi enviado para <strong>${esc(data.email)}</strong>
    </div>
  </div>
  `.trim();
}
