@echo off
echo ========================================
echo  CETENS Dashboard - Build para Docker
echo ========================================
echo.

echo [1/5] Criando backup...
if exist "backup" rmdir /s /q backup
mkdir backup
xcopy /E /I /Q index.js backup\ >nul
xcopy /E /I /Q dashboard backup\dashboard\ >nul
echo ✓ Backup criado em .\backup\
echo.

echo [2/5] Verificando arquivos necessarios...
if not exist "index.js" (
    echo ❌ Erro: index.js nao encontrado!
    pause
    exit /b 1
)
if not exist "dashboard\index.html" (
    echo ❌ Erro: dashboard\index.html nao encontrado!
    pause
    exit /b 1
)
echo ✓ Todos os arquivos presentes
echo.

echo [3/5] Criando arquivo ZIP para deploy remoto...
if exist "cetens-dashboard-deploy.zip" del "cetens-dashboard-deploy.zip"
powershell -Command "Compress-Archive -Path 'index.js','package.json','dashboard','Dockerfile','docker-compose.yml','nginx.conf','.dockerignore','DEPLOY-KIOSQUE.md' -DestinationPath 'cetens-dashboard-deploy.zip'"
echo ✓ Criado cetens-dashboard-deploy.zip
echo.

echo [4/5] Testando configuracao Docker...
if exist "docker-compose.yml" (
    echo ✓ docker-compose.yml encontrado
) else (
    echo ❌ Erro: docker-compose.yml nao encontrado!
    pause
    exit /b 1
)
echo.

echo [5/5] Gerando checklist de deploy...
echo ========================================= > CHECKLIST-DEPLOY.txt
echo   CHECKLIST DE DEPLOY - Dashboard CETENS >> CHECKLIST-DEPLOY.txt
echo ========================================= >> CHECKLIST-DEPLOY.txt
echo. >> CHECKLIST-DEPLOY.txt
echo Data: %date% %time% >> CHECKLIST-DEPLOY.txt
echo. >> CHECKLIST-DEPLOY.txt
echo [ ] 1. Transferir cetens-dashboard-deploy.zip para servidor >> CHECKLIST-DEPLOY.txt
echo [ ] 2. Extrair arquivos no servidor >> CHECKLIST-DEPLOY.txt
echo [ ] 3. Executar: docker-compose up -d --build >> CHECKLIST-DEPLOY.txt
echo [ ] 4. Aguardar 2-3 minutos >> CHECKLIST-DEPLOY.txt
echo [ ] 5. Acessar http://localhost:8080 >> CHECKLIST-DEPLOY.txt
echo [ ] 6. Verificar se dados estao carregando >> CHECKLIST-DEPLOY.txt
echo [ ] 7. Configurar modo fullscreen (F11) >> CHECKLIST-DEPLOY.txt
echo [ ] 8. Configurar auto-start (se necessario) >> CHECKLIST-DEPLOY.txt
echo. >> CHECKLIST-DEPLOY.txt
echo ========================================= >> CHECKLIST-DEPLOY.txt
echo   ARQUIVOS INCLUIDOS NO ZIP >> CHECKLIST-DEPLOY.txt
echo ========================================= >> CHECKLIST-DEPLOY.txt
echo. >> CHECKLIST-DEPLOY.txt
echo - index.js (API) >> CHECKLIST-DEPLOY.txt
echo - package.json >> CHECKLIST-DEPLOY.txt
echo - dashboard/ (HTML, CSS, JS) >> CHECKLIST-DEPLOY.txt
echo - Dockerfile >> CHECKLIST-DEPLOY.txt
echo - docker-compose.yml >> CHECKLIST-DEPLOY.txt
echo - nginx.conf >> CHECKLIST-DEPLOY.txt
echo - .dockerignore >> CHECKLIST-DEPLOY.txt
echo - DEPLOY-KIOSQUE.md (guia completo) >> CHECKLIST-DEPLOY.txt
echo. >> CHECKLIST-DEPLOY.txt
echo ========================================= >> CHECKLIST-DEPLOY.txt
echo Para duvidas, consulte: DEPLOY-KIOSQUE.md >> CHECKLIST-DEPLOY.txt
echo ========================================= >> CHECKLIST-DEPLOY.txt

echo ✓ Checklist criado em CHECKLIST-DEPLOY.txt
echo.

echo ========================================
echo  ✓ BUILD CONCLUIDO COM SUCESSO!
echo ========================================
echo.
echo Arquivos criados:
echo   - cetens-dashboard-deploy.zip (para deploy)
echo   - CHECKLIST-DEPLOY.txt (checklist)
echo   - backup\ (backup dos arquivos)
echo.
echo Proximos passos:
echo   1. Transferir cetens-dashboard-deploy.zip para o servidor
echo   2. Seguir instrucoes em DEPLOY-KIOSQUE.md
echo.
echo OU para testar localmente SEM Docker:
echo   - Abrir: dashboard\index.html no navegador
echo   - Iniciar API: node index.js
echo.
pause
