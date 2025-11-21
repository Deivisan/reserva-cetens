# 🏛️ API de Reservas CETENS UFRB

API completa para scraping e consulta de reservas de salas do sistema CETENS da UFRB. Desenvolvida para facilitar consultas rápidas e integração com dashboards.

## ✨ Funcionalidades

- 📍 **Listagem de Áreas**: Todas as áreas/locais disponíveis
- 📅 **Reservas por Dia**: Consulta detalhada de reservas diárias
- 🔓 **Salas Livres**: Encontre salas disponíveis em horários específicos
- 📆 **Visualização Semanal**: Grade completa de uma semana
- 👨‍🏫 **Busca por Professor**: Todas as aulas de um professor
- 📊 **Estatísticas**: Análise de ocupação das salas
- 📚 **Aulas por Período**: Consulta de múltiplos dias

## 🚀 Instalação

```bash
# Instalar dependências
npm install

# Instalar navegador Chromium (Playwright)
npx playwright install chromium
```

## 🎯 Uso

### Iniciar Servidor

```bash
npm start
```

A API estará disponível em `http://localhost:3001`

### Documentação Interativa (Swagger)

Acesse `http://localhost:3001/docs` para documentação interativa completa.

## 📡 Endpoints

### 1. Informações da API
```
GET /
```

Retorna informações sobre a API e links para todos os endpoints.

**Resposta:**
```json
{
  "nome": "API de Reservas CETENS UFRB",
  "versao": "2.0.0",
  "documentacao": "http://localhost:3001/docs",
  "endpoints": { ... }
}
```

---

### 2. Listar Áreas
```
GET /areas
```

Retorna todas as áreas/locais disponíveis no CETENS.

**Resposta:**
```json
[
  {
    "id": "7",
    "nome": "Auditório e Sala de Reuniões"
  },
  {
    "id": "17",
    "nome": "Pavilhão 2 - Salas 207-212"
  }
]
```

**Cache:** 1 hora

---

### 3. Reservas por Dia
```
GET /reservas?year=2025&month=11&day=21&area=7
```

Retorna todas as reservas de um dia específico para uma área.

**Parâmetros:**
- `year` (obrigatório): Ano (ex: 2025)
- `month` (obrigatório): Mês (ex: 11)
- `day` (obrigatório): Dia (ex: 21)
- `area` (obrigatório): ID da área (ex: 7)

**Resposta:**
```json
{
  "data": "21/11/2025",
  "area": "7",
  "total_salas": 2,
  "salas": [
    {
      "nome": "Auditório Paulo Freire(80)",
      "reservas": [
        {
          "inicio": "10:00",
          "fim": "10:30",
          "codigo": "",
          "materia": "Arretados: Raízes do Amanhã",
          "professor": "",
          "categoria": "Outros",
          "descricao_completa": "Arretados: Raízes do Amanhã"
        },
        {
          "inicio": "14:00",
          "fim": "17:00",
          "codigo": "GCETENS317",
          "materia": "PROGRAMAÇÃO E CONTROLE DA PRODUÇÃO",
          "professor": "JOSE FLAVIO",
          "categoria": "Engenharia",
          "descricao_completa": "GCETENS317 - PROGRAMAÇÃO E CONTROLE DA PRODUÇÃO - JOSE FLAVIO"
        }
      ],
      "disponivel_manutencao": false
    }
  ]
}
```

**Categorias Automáticas:**
- Gestão, Engenharia, Inclusão, Informática, Pesquisa, Ensino, Avaliação, Reunião, Outros

---

### 4. Salas Livres
```
GET /salas-livres?year=2025&month=11&day=21&hora_inicio=08:00&hora_fim=10:00&area=7
```

Retorna todas as salas disponíveis em um período de tempo específico.

**Parâmetros:**
- `year`, `month`, `day` (obrigatórios): Data
- `hora_inicio` (obrigatório): Hora de início (ex: 08:00)
- `hora_fim` (obrigatório): Hora de término (ex: 10:00)
- `area` (opcional): Filtrar por área específica

**Resposta:**
```json
{
  "data": "21/11/2025",
  "periodo": "08:00 - 10:00",
  "total_salas_livres": 8,
  "salas_livres": [
    {
      "area_id": "17",
      "area_nome": "Pavilhão 2 - Salas 207-212",
      "sala": "Sala 209 - C/ AR (60)"
    }
  ]
}
```

---

### 5. Visualização Semanal
```
GET /visualizacao-semanal?year=2025&month=11&day=17&area=7
```

Retorna grade completa de uma semana (7 dias) para uma área.

**Parâmetros:**
- `year`, `month` (obrigatórios): Ano e mês
- `day` (obrigatório): Primeiro dia da semana
- `area` (obrigatório): ID da área

**Resposta:**
```json
{
  "periodo": "17 a 23 de Novembro 2025",
  "area": "7",
  "total_dias": 7,
  "grade": [
    {
      "dia": "Segunda 17/11",
      "data_completa": "17/11/2025",
      "salas": [
        {
          "nome": "Auditório Paulo Freire(80)",
          "total_reservas": 3,
          "disponivel": false,
          "ocupacao": [...]
        }
      ]
    }
  ]
}
```

---

### 6. Reservas por Professor
```
GET /reservas-professor?professor=JOSE&year=2025&month=11
```

Busca todas as reservas de um professor em um período.

**Parâmetros:**
- `professor` (obrigatório): Nome do professor (busca parcial, case-insensitive)
- `year`, `month` (obrigatórios): Período
- `dia_inicio`, `dia_fim` (opcionais): Refinar período (padrão: mês completo)

**Resposta:**
```json
{
  "professor": "JOSE",
  "periodo": "1 a 30/11/2025",
  "total_aulas": 15,
  "reservas": [
    {
      "data": "21/11/2025",
      "area": "Auditório e Sala de Reuniões",
      "sala": "Auditório Paulo Freire(80)",
      "horario": "14:00 - 17:00",
      "materia": "PROGRAMAÇÃO E CONTROLE DA PRODUÇÃO",
      "codigo": "GCETENS317",
      "professor": "JOSE FLAVIO",
      "categoria": "Engenharia"
    }
  ]
}
```

---

### 7. Estatísticas de Ocupação
```
GET /estatisticas?year=2025&month=11&area=7
```

Retorna estatísticas de ocupação das salas em um mês.

**Parâmetros:**
- `year`, `month` (obrigatórios): Período
- `area` (opcional): Filtrar por área (padrão: todas)

**Resposta:**
```json
{
  "periodo": "Novembro 2025",
  "areas": [
    {
      "area_id": "7",
      "area_nome": "Auditório e Sala de Reuniões",
      "total_salas": 2,
      "salas": [
        {
          "nome": "Auditório Paulo Freire(80)",
          "total_horas_ocupadas": 120.5,
          "taxa_ocupacao": 28.7,
          "categorias": {
            "Engenharia": 60,
            "Gestão": 30,
            "Outros": 30.5
          }
        }
      ]
    }
  ]
}
```

---

### 8. Aulas por Período
```
GET /aulas-periodo?year=2025&month=11&dayStart=18&dayEnd=22
```

Retorna todas as aulas de todas as áreas em um período de dias.

**Parâmetros:**
- `year`, `month` (obrigatórios): Ano e mês
- `dayStart`, `dayEnd` (obrigatórios): Intervalo de dias

**Resposta:**
```json
{
  "periodo": "18 a 22/11/2025",
  "total_areas": 8,
  "total_registros": 45,
  "areas_data": [
    {
      "data": "18/11/2025",
      "area_id": "7",
      "area_nome": "Auditório e Sala de Reuniões",
      "salas": [...]
    }
  ]
}
```

---

## 🛠️ Recursos Técnicos

### Scraping com Playwright
- **Navegador**: Chromium headless
- **Timeout**: 30 segundos por requisição
- **Retry**: Automatico em caso de falha

### Cache Inteligente
- **Sistema**: node-cache
- **TTL**: 1 hora para lista de áreas
- **Limpeza**: Automática a cada 10 minutos

### Parsing Robusto
Suporta múltiplos formatos de descrição de reservas:
- `CÓDIGO - MATÉRIA - PROFESSOR`
- `MATÉRIA - PROFESSOR`
- `MATÉRIA` (somente)
- Eventos especiais

### Categorização Automática
Reservas são categorizadas automaticamente baseado no conteúdo:
- **Gestão**: Administração, Gerência
- **Engenharia**: Química, Física, Energia, Produção
- **Informática**: Programação, Computação, Software
- **Pesquisa**: Matemática, Etnografia
- **Ensino**: TCC, ENEM, Revisões
- **Avaliação**: Provas, Seleções
- **Reunião**: Reuniões, Encontros
- **Inclusão**: LIBRAS, Acessibilidade
- **Outros**: Demais eventos

### Tratamento de Erros
- Logs estruturados com emojis
- Retorno de erros detalhados
- Recuperação automática de falhas temporárias

---

## 📖 Exemplos Práticos

### Encontrar sala livre agora
```bash
curl "http://localhost:3001/salas-livres?year=2025&month=11&day=21&hora_inicio=14:00&hora_fim=16:00"
```

### Ver agenda da semana
```bash
curl "http://localhost:3001/visualizacao-semanal?year=2025&month=11&day=17&area=17"
```

### Buscar aulas de um professor
```bash
curl "http://localhost:3001/reservas-professor?professor=JOSE&year=2025&month=11"
```

### Estatísticas do mês
```bash
curl "http://localhost:3001/estatisticas?year=2025&month=11"
```

---

## 🎨 Integração com Dashboard

Esta API foi projetada para integração com dashboards web. Todos os endpoints retornam JSON estruturado pronto para visualização.

### Exemplo de uso em Dashboard React:

```javascript
// Buscar áreas
const areas = await fetch('http://localhost:3001/areas').then(r => r.json());

// Buscar reservas do dia
const reservas = await fetch(
  `http://localhost:3001/reservas?year=2025&month=11&day=21&area=${areaId}`
).then(r => r.json());

// Encontrar salas livres
const salasLivres = await fetch(
  `http://localhost:3001/salas-livres?year=2025&month=11&day=21&hora_inicio=08:00&hora_fim=10:00`
).then(r => r.json());
```

---

## 🔧 Configuração Avançada

### Mudar Porta
Edite `index.js` linha 23:
```javascript
const PORT = 3001; // Altere aqui
```

### Ajustar Cache
Edite `index.js` linha 12:
```javascript
const cache = new NodeCache({ 
  stdTTL: 3600,      // TTL em segundos (1 hora)
  checkperiod: 600   // Verificação em segundos (10 min)
});
```

### Timeout de Requisições
Altere timeout do Playwright (padrão: 30s):
```javascript
await page.goto(url, { 
  waitUntil: 'networkidle', 
  timeout: 30000  // Altere aqui (em ms)
});
```

---

## 📝 Estrutura de Dados

### Formato de Reserva
```typescript
interface Reserva {
  inicio: string;           // HH:MM
  fim: string;              // HH:MM
  codigo: string;           // Código da disciplina
  materia: string;          // Nome da matéria
  professor: string;        // Nome do professor
  categoria: string;        // Categoria automática
  descricao_completa: string; // Descrição original
}
```

### Formato de Sala
```typescript
interface Sala {
  nome: string;
  reservas: Reserva[];
  disponivel_manutencao: boolean;
}
```

---

## 🚨 Troubleshooting

### Erro "Chromium not found"
```bash
npx playwright install chromium
```

### Timeout em requisições
- Verifique conexão com internet
- Site pode estar lento/indisponível
- Aumente timeout nas configurações

### Cache não atualiza
```bash
# Reinicie servidor para limpar cache
```

### Dados inconsistentes
- Compare com site oficial: https://reservascetens.ufrb.edu.br/
- Verifique logs do servidor

---

## 📊 Performance

- **Tempo médio por requisição**: < 3 segundos
- **Endpoints com cache**: < 100ms (/areas)
- **Consulta semanal**: ~20 segundos (7 dias × múltiplas áreas)
- **Estatísticas mensal**: ~2-5 minutos (30 dias × todas áreas)

**Recomendação**: Use cache no frontend para consultas frequentes.

---

## 🛡️ Limitações

- **Dependência do site oficial**: API depende da disponibilidade do site MRBS
- **Sem autenticação**: Apenas leitura de dados públicos
- **Scraping**: Pode quebrar se estrutura HTML do site mudar
- **Performance**: Consultas muito grandes podem ser lentas

---

## 🔄 Atualizações

### v2.0.0 (Atual)
- ✅ Correção endpoint /areas
- ✅ Parsing robusto de reservas (3 formatos)
- ✅ Novos endpoints: salas-livres, visualizacao-semanal, reservas-professor, estatisticas
- ✅ Cache inteligente
- ✅ Documentação Swagger
- ✅ Categorização automática
- ✅ Logs estruturados
- ✅ Tratamento de erros melhorado

### v1.0.0
- 🔹 Endpoints básicos: /areas, /reservas, /aulas-periodo

---

## 👨‍💻 Desenvolvedor

**Deivison - Auxiliar de TI CETENS UFRB**  
T08828702540

---

## 📄 Licença

Esta API foi desenvolvida para uso interno da UFRB CETENS. Uso externo sujeito a aprovação.

---

## 🔗 Links Úteis

- **Site Oficial**: https://reservascetens.ufrb.edu.br/
- **Documentação MRBS**: http://mrbs.sourceforge.net/
- **Swagger UI**: http://localhost:3001/docs

---

## 🎯 Roadmap

- [ ] Autenticação para criar/editar reservas
- [ ] WebSocket para atualizações em tempo real
- [ ] Exportação para PDF/Excel
- [ ] Notificações de mudanças
- [ ] Interface web administrativa
- [ ] Sistema de alertas (sala livre/ocupada)

---

**Developed with ❤️ by Deivison @ UFRB CETENS**