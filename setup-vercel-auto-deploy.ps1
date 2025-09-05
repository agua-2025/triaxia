# Script para configurar deploy automático no Vercel
# Execute este script após configurar o projeto no Vercel

Write-Host "🚀 Configurando deploy automático no Vercel..." -ForegroundColor Green

# Verificar se o Vercel CLI está instalado
if (!(Get-Command "vercel" -ErrorAction SilentlyContinue)) {
    Write-Host "❌ Vercel CLI não encontrado. Instalando..." -ForegroundColor Yellow
    npm install -g vercel
}

# Login no Vercel (se necessário)
Write-Host "🔐 Fazendo login no Vercel..." -ForegroundColor Blue
vercel login

# Linkar o projeto
Write-Host "🔗 Linkando projeto ao Vercel..." -ForegroundColor Blue
vercel link

# Obter informações do projeto
Write-Host "📋 Obtendo informações do projeto..." -ForegroundColor Blue
$projectInfo = vercel project ls --format json | ConvertFrom-Json

Write-Host ""
Write-Host "📝 Para configurar o deploy automático, adicione estas variáveis nos GitHub Secrets:" -ForegroundColor Cyan
Write-Host ""
Write-Host "VERCEL_TOKEN: " -NoNewline -ForegroundColor Yellow
Write-Host "(Obtenha em: https://vercel.com/account/tokens)" -ForegroundColor Gray
Write-Host ""
Write-Host "VERCEL_ORG_ID: " -NoNewline -ForegroundColor Yellow
Write-Host "(Encontre no arquivo .vercel/project.json após o link)" -ForegroundColor Gray
Write-Host ""
Write-Host "VERCEL_PROJECT_ID: " -NoNewline -ForegroundColor Yellow
Write-Host "(Encontre no arquivo .vercel/project.json após o link)" -ForegroundColor Gray
Write-Host ""

# Verificar se existe .vercel/project.json
if (Test-Path ".vercel/project.json") {
    $vercelConfig = Get-Content ".vercel/project.json" | ConvertFrom-Json
    Write-Host "✅ Informações encontradas:" -ForegroundColor Green
    Write-Host "VERCEL_ORG_ID: $($vercelConfig.orgId)" -ForegroundColor Green
    Write-Host "VERCEL_PROJECT_ID: $($vercelConfig.projectId)" -ForegroundColor Green
}

Write-Host ""
Write-Host "🎯 Próximos passos:" -ForegroundColor Cyan
Write-Host "1. Vá para https://github.com/seu-usuario/seu-repo/settings/secrets/actions" -ForegroundColor White
Write-Host "2. Adicione as três variáveis mencionadas acima" -ForegroundColor White
Write-Host "3. Faça um push para a branch main para testar o deploy" -ForegroundColor White
Write-Host ""
Write-Host "✨ Deploy automático configurado com sucesso!" -ForegroundColor Green