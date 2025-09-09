// test-email-direct.js
// Script para testar o envio de email diretamente

require('dotenv').config({ path: '.env.local' });
const nodemailer = require('nodemailer');

// Configuração do transporter
const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_SERVER_HOST || process.env.SMTP_HOST || 'smtp.zoho.com',
  port: Number(process.env.EMAIL_SERVER_PORT || process.env.SMTP_PORT || 587),
  secure: false, // 587 = STARTTLS
  auth: {
    user: process.env.EMAIL_SERVER_USER || process.env.SMTP_USER,
    pass: process.env.EMAIL_SERVER_PASSWORD || process.env.SMTP_PASS,
  },
});

async function testEmail() {
  console.log('🧪 Testando configuração de email...');
  
  // Verificar configurações
  console.log('📧 Configurações SMTP:');
  console.log(`Host: ${process.env.EMAIL_SERVER_HOST || process.env.SMTP_HOST}`);
  console.log(`Port: ${process.env.EMAIL_SERVER_PORT || process.env.SMTP_PORT}`);
  console.log(`User: ${process.env.EMAIL_SERVER_USER || process.env.SMTP_USER}`);
  console.log(`From: ${process.env.EMAIL_FROM || process.env.SMTP_FROM}`);
  
  try {
    // Verificar conexão
    console.log('\n🔍 Verificando conexão SMTP...');
    await transporter.verify();
    console.log('✅ Conexão SMTP OK');
    
    // Enviar email de teste
    console.log('\n📤 Enviando email de teste...');
    const info = await transporter.sendMail({
      from: process.env.EMAIL_FROM || process.env.SMTP_FROM || process.env.SMTP_USER,
      to: 'vivendamirassol@gmail.com',
      subject: 'Teste de Email - Triaxia',
      text: 'Este é um teste de email do sistema Triaxia.',
      html: '<p>✅ <strong>Este é um teste de email do sistema Triaxia.</strong></p><p>Se você recebeu este email, a configuração SMTP está funcionando corretamente!</p>',
    });
    
    console.log('✅ Email enviado com sucesso!');
    console.log(`📧 Message ID: ${info.messageId}`);
    
  } catch (error) {
    console.error('❌ Erro no teste de email:', error.message);
    console.error('📋 Detalhes do erro:', error);
  }
}

testEmail().finally(() => {
  console.log('\n🏁 Teste finalizado.');
  process.exit(0);
});