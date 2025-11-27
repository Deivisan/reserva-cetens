# Usar Node.js 20 bullseye
FROM node:20-bullseye

# Instalar dependências para Playwright Chromium
RUN apt-get update && apt-get install -y \
    wget \
    ca-certificates \
    libnss3 \
    libatk-bridge2.0-0 \
    libdrm2 \
    libxkbcommon0 \
    libgtk-3-0 \
    libxss1 \
    libasound2 \
    fonts-liberation \
    libxcomposite1 \
    libxdamage1 \
    libxrandr2 \
    libgbm1 \
    libpango-1.0-0 \
    libcairo2 \
    libxshmfence1 \
    libatspi2.0-0 \
    && rm -rf /var/lib/apt/lists/*

# Criar diretório da aplicação
WORKDIR /app

# Copiar arquivos de dependências
COPY package*.json ./

# Instalar dependências Node.js
RUN npm ci --only=production

# Instalar Playwright Chromium
RUN npx playwright install chromium

# Definir variáveis de ambiente para Playwright encontrar os browsers
ENV PLAYWRIGHT_BROWSERS_PATH=/root/.cache/ms-playwright

# Copiar código da aplicação
COPY index.js ./

# Expor porta
EXPOSE 3005

# Health check simples
HEALTHCHECK --interval=30s --timeout=10s --start-period=40s --retries=3 \
    CMD wget --quiet --tries=1 --spider http://localhost:3005/health || exit 1

# Comando
CMD ["node", "index.js"]
