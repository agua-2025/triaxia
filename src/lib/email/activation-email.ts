import * as nodemailer from 'nodemailer';
import { z } from 'zod';

const mailer = nodemailer.createTransport({
  host: process.env.EMAIL_SERVER_HOST || process.env.SMTP_HOST || 'smtp.zoho.com',
  port: Number(process.env.EMAIL_SERVER_PORT || process.env.SMTP_PORT || 587),
  secure: Number(process.env.EMAIL_SERVER_PORT || process.env.SMTP_PORT || 587) === 465, // 465=SSL, 587=STARTTLS
  auth: {
    user: process.env.EMAIL_SERVER_USER || process.env.SMTP_USER!, // contato@triaxia.com.br
    pass: (process.env.EMAIL_SERVER_PASSWORD || process.env.SMTP_PASS || '').trim(), // senha de app Zoho
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
      from: process.env.EMAIL_FROM || process.env.SMTP_FROM || process.env.EMAIL_SERVER_USER || process.env.SMTP_USER!,
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
      <p style="margin:8px 0 0 0; opacity:.9">Sua conta foi criada com sucesso</p>
    </div>
    <div style="padding:28px 24px">
      <p>Olá <strong>${esc(data.name)}</strong>,</p>
      <p>Parabéns! Sua conta na <strong>${esc(data.tenantName)}</strong> foi criada com sucesso. Para começar a usar a plataforma, você precisa ativar sua conta seguindo os passos abaixo:</p>
      
      <div style="background:#f0f9ff; border:1px solid #0ea5e9; border-radius:8px; padding:20px; margin:20px 0;">
        <h3 style="margin:0 0 12px 0; color:#0369a1; font-size:16px;">📋 Próximos Passos:</h3>
        <ol style="margin:0; padding-left:20px; color:#0369a1;">
          <li style="margin-bottom:8px;"><strong>Clique no botão abaixo</strong> para ativar sua conta</li>
          <li style="margin-bottom:8px;"><strong>Crie sua senha</strong> na página de ativação</li>
          <li style="margin-bottom:8px;"><strong>Faça login</strong> com seu email e nova senha</li>
          <li><strong>Configure sua empresa</strong> no processo de onboarding</li>
        </ol>
      </div>
      
      <div style="text-align:center; margin:24px 0">
        <a href="${data.activationUrl}" style="display:inline-block; background:#1d4ed8; color:#fff; padding:16px 32px; border-radius:8px; text-decoration:none; font-weight:600; font-size:16px;">🚀 Ativar Minha Conta</a>
      </div>
      
      <div style="background:#fef3c7; border:1px solid #f59e0b; color:#92400e; border-radius:8px; padding:16px; margin:20px 0;">
        <div style="display:flex; align-items:center; margin-bottom:8px;">
          <span style="font-size:18px; margin-right:8px;">⚠️</span>
          <strong>Importante - Link Temporário</strong>
        </div>
        <p style="margin:0; font-size:14px;">Este link de ativação expira em <strong>${data.expiresIn} horas</strong>. Após esse período, você precisará solicitar um novo link de ativação.</p>
      </div>
      
      <div style="background:#f0fdf4; border:1px solid #22c55e; color:#166534; border-radius:8px; padding:16px; margin:20px 0;">
        <div style="display:flex; align-items:center; margin-bottom:8px;">
          <span style="font-size:18px; margin-right:8px;">💡</span>
          <strong>Dica</strong>
        </div>
        <p style="margin:0; font-size:14px;">Após ativar sua conta, você será direcionado para um processo de configuração inicial onde poderá personalizar sua experiência na plataforma.</p>
      </div>
      
      <div style="border-top:1px solid #e5e7eb; padding-top:20px; margin-top:24px;">
        <p style="font-size:13px; color:#6b7280; margin:0 0 8px 0;"><strong>Problemas com o botão?</strong></p>
        <p style="font-size:13px; color:#6b7280; margin:0;">Copie e cole este link no seu navegador:</p>
        <p style="font-size:12px; color:#6b7280; word-break:break-all; background:#f9fafb; padding:8px; border-radius:4px; margin:8px 0 0 0;">${data.activationUrl}</p>
      </div>
    </div>
    <div style="background:#f9fafb; padding:20px; text-align:center; font-size:12px; color:#6b7280; border-top:1px solid #e5e7eb;">
      <p style="margin:0 0 8px 0;">Este e-mail foi enviado para <strong>${esc(data.email)}</strong></p>
      <p style="margin:0;">Se você não solicitou esta conta, pode ignorar este e-mail com segurança.</p>
    </div>
  </div>
  `.trim();
}
