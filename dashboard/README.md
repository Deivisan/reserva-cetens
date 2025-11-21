# 📊 Dashboard CETENS - Kiosque Mode

Dashboard horizontal para visualização de reservas de salas do CETENS em modo kiosque.

## 🎯 Funcionalidades

- ✅ **Layout Horizontal**: Otimizado para displays wide/landscape
- ✅ **Visão de 2 Dias**: Hoje e Amanhã lado a lado
- ✅ **Auto-Atualização**: Atualiza a cada 5 minutos automaticamente
- ✅ **Status Visual**: Cores indicando salas disponíveis/ocupadas
- ✅ **Modo Kiosque**: Design limpo e legível à distância
- ✅ **Categorização**: Aulas coloridas por categoria
- ✅ **Responsivo**: Adapta-se ao tamanho da tela

## 🚀 Deploy com Docker

### 1. Build e Run (Tudo em um comando)

```bash
# No diretório do projeto
cd C:\Projetos\reserva-cetens

# Build e iniciar
docker-compose up -d --build
```

### 2. Acessar Dashboard

```
http://localhost:8080
```

### 3. Verificar Status

```bash
# Ver logs
docker-compose logs -f

# Ver status dos containers
docker-compose ps

# Parar
docker-compose down

# Restart
docker-compose restart
```

## 🔧 Configuração

### Áreas Exibidas

Editar `dashboard/app.js` linha 6:

```javascript
const AREAS_TO_SHOW = ['7', '17']; // Adicionar mais áreas se necessário
```

### Intervalo de Atualização

Editar `dashboard/app.js` linha 5:

```javascript
const UPDATE_INTERVAL = 5 * 60 * 1000; // Alterar tempo em ms
```

### URL da API

Se a API estiver em outro servidor:

Editar `dashboard/app.js` linhas 2-4:

```javascript
const API_BASE_URL = 'http://SEU-SERVIDOR:3001';
```

## 🎨 Personalização de Cores

Editar `dashboard/style.css` linhas 9-18:

```css
:root {
    --primary: #2563eb;      /* Cor primária */
    --success: #10b981;      /* Verde (disponível) */
    --danger: #ef4444;       /* Vermelho (ocupada) */
    --bg-dark: #0f172a;      /* Fundo escuro */
    /* ... mais cores ... */
}
```

## 📱 Integração com Kiosque Existente

### Como iFrame

```html
<iframe 
    src="http://localhost:8080" 
    style="width: 100%; height: 100vh; border: none;"
    allowfullscreen>
</iframe>
```

### Como Tab/Aba

Adicionar link no menu:

```html
<a href="http://localhost:8080" target="_blank">Reservas CETENS</a>
```

## 🐳 Deploy em Servidor Remoto

### 1. Copiar arquivos

```bash
scp -r C:\Projetos\reserva-cetens usuario@servidor:/caminho/
```

### 2. Conectar via SSH e executar

```bash
ssh usuario@servidor
cd /caminho/reserva-cetens
docker-compose up -d --build
```

### 3. Expor porta (se necessário)

```bash
# Firewall
sudo ufw allow 8080/tcp

# Ou usar reverse proxy (Nginx/Traefik)
```

## 🔄 Atualização

```bash
# Pull da versão mais recente (se em Git)
git pull

# Rebuild
docker-compose up -d --build

# Ou force rebuild
docker-compose build --no-cache
docker-compose up -d
```

## 🐛 Troubleshooting

### Dashboard não carrega dados

```bash
# Verificar se API está respondendo
curl http://localhost:3001/areas

# Ver logs da API
docker-compose logs api
```

### Containers não iniciam

```bash
# Verificar portas ocupadas
netstat -ano | findstr :3001
netstat -ano | findstr :8080

# Limpar containers antigos
docker-compose down -v
docker system prune -a
```

### Performance lenta

```bash
# Verificar recursos
docker stats

# Limitar recursos (docker-compose.yml)
services:
  api:
    deploy:
      resources:
        limits:
          cpus: '1'
          memory: 512M
```

## 📊 Monitoramento

### Logs em tempo real

```bash
# Todos os serviços
docker-compose logs -f

# Apenas dashboard
docker-compose logs -f dashboard

# Apenas API
docker-compose logs -f api
```

### Health checks

```bash
# Status dos containers
docker-compose ps

# Health do API
curl http://localhost:3001/

# Health do Dashboard
curl http://localhost:8080/
```

## 🎯 Modo Full Screen (Kiosque)

### No navegador

Pressionar **F11** ou usar JavaScript:

```javascript
document.documentElement.requestFullscreen();
```

### Iniciar automaticamente em fullscreen

Adicionar ao final de `dashboard/app.js`:

```javascript
// Auto fullscreen ao carregar
window.addEventListener('load', () => {
    if (document.documentElement.requestFullscreen) {
        document.documentElement.requestFullscreen();
    }
});
```

## 📦 Estrutura de Arquivos

```
reserva-cetens/
├── dashboard/
│   ├── index.html          # HTML principal
│   ├── style.css           # Estilos
│   ├── app.js              # Lógica JavaScript
│   └── README.md           # Esta documentação
├── index.js                # API Express
├── Dockerfile              # Build da aplicação
├── docker-compose.yml      # Orquestração
├── nginx.conf              # Config Nginx
└── .dockerignore          # Arquivos ignorados no build
```

## 🚀 Performance

- **Build otimizado**: Multi-stage build
- **Cache**: Nginx com cache de assets
- **Gzip**: Compressão habilitada
- **Health checks**: Monitoramento automático
- **Auto-restart**: Containers reiniciam em caso de falha

## 📝 Notas

- Dashboard atualiza automaticamente a cada 5 minutos
- Relógio atualiza a cada segundo
- Conexão com API via rede Docker interna
- Logs persistem até reinício dos containers

---

**Desenvolvido para UFRB CETENS**  
**Modo Kiosque - Display Horizontal**
