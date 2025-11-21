# 🚀 Deploy Dashboard CETENS - Guia Rápido Kiosque

## ✅ Pré-requisitos

**Importante**: NÃO precisa instalar Docker no seu PC!

O servidor/máquina que vai rodar o kiosque precisa ter:
- Docker instalado
- Docker Compose instalado  
- Portas 3001 e 8080 livres

## 📦 Passo 1: Preparar Arquivos

### Opção A: Já está tudo pronto!

Os arquivos já estão em `C:\Projetos\reserva-cetens\`

### Opção B: Transferir para servidor

```powershell
# Compactar projeto
Compress-Archive -Path "C:\Projetos\reserva-cetens" -DestinationPath "C:\Temp\cetens-dashboard.zip"

# Depois transferir via:
# - Pen drive
# - Rede local
# - FTP/SCP
# - Email (se pequeno)
```

## 🐳 Passo 2: Deploy no Servidor

### No servidor/máquina do kiosque:

```bash
# 1. Extrair arquivos (se vier zipado)
unzip cetens-dashboard.zip
cd reserva-cetens

# 2. Build e iniciar (UM COMANDO!)
docker-compose up -d --build

# 3. Aguardar (~2-3 minutos na primeira vez)
# Verificar progresso:
docker-compose logs -f
```

## 🌐 Passo 3: Acessar Dashboard

Abrir navegador e acessar:

```
http://localhost:8080
```

**Pronto! Dashboard funcionando!** 🎉

## 🖥️ Configurar Kiosque

### Modo Fullscreen

1. Abrir `http://localhost:8080` no navegador
2. Pressionar **F11** para fullscreen
3. (Opcional) Usar extensão de kiosk mode

### Chrome Kiosk Mode

```bash
# Iniciar Chrome em modo kiosk
"C:\Program Files\Google\Chrome\Application\chrome.exe" --kiosk --app=http://localhost:8080

# Ou criar atalho com esse comando
```

### Auto-start no Windows

1. Criar arquivo `start-kiosk.bat`:

```batch
@echo off
start "" "C:\Program Files\Google\Chrome\Application\chrome.exe" --kiosk --app=http://localhost:8080
```

2. Adicionar à pasta Inicializar:
   - Pressionar `Win + R`
   - Digitar: `shell:startup`
   - Copiar `start-kiosk.bat` para lá

### Auto-start no Linux

```bash
# Adicionar ao .bashrc ou criar systemd service
@reboot chromium-browser --kiosk --app=http://localhost:8080
```

## 🔧 Comandos Úteis

```bash
# Ver status
docker-compose ps

# Ver logs
docker-compose logs -f

# Reiniciar
docker-compose restart

# Parar
docker-compose down

# Atualizar (após mudanças)
docker-compose up -d --build

# Limpar tudo e recomeçar
docker-compose down -v
docker-compose up -d --build
```

## 🎯 Integrar com Kiosque Existente

### Se já tem um kiosque rodando:

#### Opção 1: iFrame

Adicionar no HTML do k iosque atual:

```html
<iframe 
    src="http://localhost:8080" 
    style="width: 100%; height: 100vh; border: none;">
</iframe>
```

#### Opção 2: Aba/Tab

Adicionar botão/link:

```html
<a href="http://localhost:8080" target="cetens-reservas">
    📅 Reservas de Salas
</a>
```

#### Opção 3: Subdomain/Path

Configure reverse proxy (Nginx/Apache) para:

```
http://seu-kiosque.com/reservas → http://localhost:8080
```

## 📱 Acesso Remoto

### Na mesma rede local:

```
http://IP-DO-SERVIDOR:8080

Exemplo:
http://192.168.1.100:8080
```

Para descobrir o IP:

```bash
# Windows
ipconfig

# Linux
ip addr show
```

### Internet (precisa configurar)

1. Porta forward no roteador (8080 → IP do servidor)
2. Ou usar ngrok:

```bash
ngrok http 8080
```

## 🔒 Segurança (Produção)

### Adicionar autenticação básica (Nginx)

Editar `nginx.conf`:

```nginx
server {
    auth_basic "CETENS Dashboard";
    auth_basic_user_file /etc/nginx/.htpasswd;
    ...
}
```

Gerar senha:

```bash
htpasswd -c /etc/nginx/.htpasswd admin
```

### HTTPS

Usar reverse proxy com Let's Encrypt:

```bash
# Com Certbot
certbot --nginx -d seu-dominio.com
```

## 🎨 Personalização Rápida

### Mudar cores principais

Editar `dashboard/style.css` linha 10:

```css
:root {
    --primary: #2563eb;    /* Azul padrão */
    /* Trocar por outra cor, ex: */
    --primary: #10b981;    /* Verde */
}
```

### Mudar áreas exibidas

Editar `dashboard/app.js` linha 6:

```javascript
// Mostrar apenas Auditório (área 7)
const AREAS_TO_SHOW = ['7'];

// Ou adicionar mais
const AREAS_TO_SHOW = ['7', '17', '10'];
```

## ❓ Problemas Comuns

### Dashboard branco/vazio

```bash
# Verificar se API está rodando
curl http://localhost:3001/areas

# Ver logs
docker-compose logs api
```

### "Connection refused"

```bash
# Verificar se containers estão rodando
docker-compose ps

# Reiniciar
docker-compose restart
```

### Dados não atualizam

1. Refresh do navegador (Ctrl+F5)
2. Limpar cache do navegador
3. Verificar console do navegador (F12)

### Porta 8080 já em uso

Editar `docker-compose.yml`:

```yaml
dashboard:
  ports:
    - "8081:80"  # Mudar 8080 para 8081
```

## 📊 Monitoramento

### Ver uso de recursos

```bash
docker stats
```

### Logs específicos

```bash
# Apenas erros
docker-compose logs --tail=50 api | grep -i error

# Últimas 100 linhas
docker-compose logs --tail=100
```

## 🔄 Backup e Restore

### Backup

```bash
# Backup do projeto
tar -czf cetens-backup-$(date +%Y%m%d).tar.gz reserva-cetens/

# Ou ZIP no Windows
Compress-Archive -Path reserva-cetens -DestinationPath cetens-backup.zip
```

### Restore

```bash
# Extrair
tar -xzf cetens-backup-YYYYMMDD.tar.gz

# Deploy
cd reserva-cetens
docker-compose up -d --build
```

## 📞 Suporte

### Verificação de saúde

```bash
# API Health
curl http://localhost:3001/

# Dashboard Health  
curl http://localhost:8080/
```

### Reset completo

```bash
# ATENÇÃO: Apaga tudo!
docker-compose down -v
docker system prune -af
docker-compose up -d --build
```

---

## ✅ Checklist de Deploy

- [ ] Docker instalado no servidor
- [ ] Arquivos extraídos/copiados
- [ ] `docker-compose up -d --build` executado
- [ ] http://localhost:8080 acessível
- [ ] Dados carregando corretamente
- [ ] Modo fullscreen configurado
- [ ] Auto-start configurado (se necessário)
- [ ] Integração com kiosque existente (se aplicável)

---

**🎉 Dashboard pronto para produção!**

Qualquer dúvida, consulte:
- `dashboard/README.md` - Documentação completa
- `docker-compose logs` - Logs do sistema
- Console do navegador (F12) - Erros JavaScript

**Desenvolvido para UFRB CETENS**
