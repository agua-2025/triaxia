export const runtime = 'nodejs';

import nodemailer from 'nodemailer';

function transporter() {
  return nodemailer.createTransport({
    host: process.env.SMTP_HOST || 'smtp.zoho.com',
    port: Number(process.env.SMTP_PORT || 587),
    secure: false, // 587 = STARTTLS
    auth: {
      user: process.env.SMTP_USER!, // ex: contato@triaxia.com.br
      pass: process.env.SMTP_PASS!, // senha de aplicativo do Zoho
    },
  });
}

export async function GET(req: Request) {
  const url = new URL(req.url);
  const to = url.searchParams.get('to');
  if (!to) return new Response('Use ?to=seuemail@gmail.com', { status: 400 });

  const info = await transporter().sendMail({
    from: process.env.SMTP_FROM || process.env.SMTP_USER!,
    to,
    subject: 'Teste SMTP – Triaxia',
    text: 'Funcionou! Este é um teste simples do SMTP Zoho.',
    html: '<p>Funcionou! ✅ Este é um teste simples do SMTP Zoho.</p>',
  });

  return Response.json({ ok: true, messageId: info.messageId });
}
