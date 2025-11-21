# Multi-stage build para otimização
FROM node:20-alpine AS base

# Stage 1: Dependências
FROM base AS deps
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production && npm cache clean --force

# Stage 2: Aplicação
FROM base AS runner
WORKDIR /app

# Copiar dependências
COPY --from=deps /app/node_modules ./node_modules
COPY package*.json ./

# Copiar código da aplicação
COPY index.js ./
COPY dashboard ./dashboard

# Instalar Playwright Chromium
RUN npx playwright install --with-deps chromium

# Usuário não-root para segurança
RUN addgroup --system --gid 1001 nodejs && \
    adduser --system --uid 1001 nodejs && \
    chown -R nodejs:nodejs /app

USER nodejs

# Expor portas
EXPOSE 3001
EXPOSE 8080

# Health check
HEALTHCHECK --interval=30s --timeout=10s --start-period=40s --retries=3 \
    CMD node -e "require('http').get('http://localhost:3001/', (r) => {process.exit(r.statusCode === 200 ? 0 : 1)})"

# Comando de inicialização
CMD ["node", "index.js"]
