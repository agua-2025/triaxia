const nodemailer = require('nodemailer');
require('dotenv').config({ path: '.env.local' });

async function testEmail() {
  console.log('Testando configuração de email...');
  console.log('HOST:', process.env.EMAIL_SERVER_HOST);
  console.log('PORT:', process.env.EMAIL_SERVER_PORT);
  console.log('USER:', process.env.EMAIL_SERVER_USER);
  console.log('PASSWORD:', process.env.EMAIL_SERVER_PASSWORD ? '***' : 'MISSING');
  
  const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_SERVER_HOST,
    port: Number(process.env.EMAIL_SERVER_PORT),
    secure: Number(process.env.EMAIL_SERVER_PORT) === 465,
    auth: {
      user: process.env.EMAIL_SERVER_USER,
      pass: process.env.EMAIL_SERVER_PASSWORD
    },
    tls: { minVersion: 'TLSv1.2' }
  });
  
  try {
    console.log('Verificando conexão SMTP...');
    await transporter.verify();
    console.log('✅ Conexão SMTP OK');
    
    console.log('Enviando email de teste...');
    const info = await transporter.sendMail({
      from: process.env.EMAIL_FROM,
      to: 'vivendamirassol@gmail.com',
      subject: 'Teste de Email - Triaxia',
      html: '<h1>Email de teste funcionando!</h1><p>Se você recebeu este email, a configuração está correta.</p>'
    });
    
    console.log('✅ Email enviado com sucesso!');
    console.log('Message ID:', info.messageId);
    
  } catch (error) {
    console.error('❌ Erro no teste de email:', error.message);
    if (error.code) console.error('Código do erro:', error.code);
    if (error.response) console.error('Resposta do servidor:', error.response);
  }
}

testEmail();