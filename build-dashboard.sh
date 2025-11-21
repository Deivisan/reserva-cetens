#!/bin/bash

echo "========================================"
echo " CETENS Dashboard - Build para Docker"
echo "========================================"
echo ""

echo "[1/5] Criando backup..."
rm -rf backup
mkdir -p backup
cp index.js backup/
cp -r dashboard backup/
echo "✓ Backup criado em ./backup/"
echo ""

echo "[2/5] Verificando arquivos necessários..."
if [ ! -f "index.js" ]; then
    echo "❌ Erro: index.js não encontrado!"
    exit 1
fi
if [ ! -f "dashboard/index.html" ]; then
    echo "❌ Erro: dashboard/index.html não encontrado!"
    exit 1
fi
echo "✓ Todos os arquivos presentes"
echo ""

echo "[3/5] Criando arquivo TAR.GZ para deploy remoto..."
tar -czf cetens-dashboard-deploy.tar.gz \
    index.js \
    package.json \
    dashboard/ \
    Dockerfile \
    docker-compose.yml \
    nginx.conf \
    .dockerignore \
    DEPLOY-KIOSQUE.md

echo "✓ Criado cetens-dashboard-deploy.tar.gz"
echo ""

echo "[4/5] Testando configuração Docker..."
if [ -f "docker-compose.yml" ]; then
    echo "✓ docker-compose.yml encontrado"
else
    echo "❌ Erro: docker-compose.yml não encontrado!"
    exit 1
fi
echo ""

echo "[5/5] Gerando checklist de deploy..."
cat > CHECKLIST-DEPLOY.txt << 'EOF'
=========================================
  CHECKLIST DE DEPLOY - Dashboard CETENS
=========================================

[ ] 1. Transferir cetens-dashboard-deploy.tar.gz para servidor
[ ] 2. Extrair: tar -xzf cetens-dashboard-deploy.tar.gz
[ ] 3. Entrar no diretório
[ ] 4. Executar: docker-compose up -d --build
[ ] 5. Aguardar 2-3 minutos
[ ] 6. Acessar http://localhost:8080
[ ] 7. Verificar se dados estão carregando
[ ] 8. Configurar modo fullscreen (F11)
[ ] 9. Configurar auto-start (se necessário)

=========================================
  ARQUIVOS INCLUÍDOS NO PACOTE
=========================================

- index.js (API)
- package.json
- dashboard/ (HTML, CSS, JS)
- Dockerfile
- docker-compose.yml
- nginx.conf
- .dockerignore
- DEPLOY-KIOSQUE.md (guia completo)

=========================================
Para dúvidas, consulte: DEPLOY-KIOSQUE.md
=========================================
EOF

echo "✓ Checklist criado em CHECKLIST-DEPLOY.txt"
echo ""

echo "========================================"
echo " ✓ BUILD CONCLUÍDO COM SUCESSO!"
echo "========================================"
echo ""
echo "Arquivos criados:"
echo "  - cetens-dashboard-deploy.tar.gz (para deploy)"
echo "  - CHECKLIST-DEPLOY.txt (checklist)"
echo "  - backup/ (backup dos arquivos)"
echo ""
echo "Próximos passos:"
echo "  1. Transferir cetens-dashboard-deploy.tar.gz para o servidor"
echo "  2. Seguir instruções em DEPLOY-KIOSQUE.md"
echo ""
echo "OU para testar localmente SEM Docker:"
echo "  - Abrir: dashboard/index.html no navegador"
echo "  - Iniciar API: node index.js"
echo ""
