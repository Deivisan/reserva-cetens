# API de Reservas CETENS UFRB

Esta API permite acessar informações de reservas de salas do sistema CETENS da UFRB via scraping.

## Instalação

```bash
npm install
npx playwright install chromium
```

## Uso

```bash
npm start
```

A API estará disponível em `http://localhost:3000`.

## Endpoint

### GET /reservas

Parâmetros de query:

- `year`: Ano (ex: 2025)
- `month`: Mês (ex: 11)
- `day`: Dia (ex: 02)
- `area`: Área (ex: 17 para Pavilhão 2)

Retorna JSON:

```json
{
  "date": "02/11/2025",
  "area": "17",
  "salas": [
    {
      "nome": "Sala 207 - C/ AR (60)",
      "reservas": []
    },
    {
      "nome": "Sala 208 - C/ AR (20)",
      "reservas": []
    }
  ]
}
```

## Exemplos de Uso

### Dia 6/11/2025, Área 17 (Pavilhão 2, Salas 207-212):
- **Sala 207**: ADMINISTRAÇÃO (08:00), FUNDAMENTOS DE QUÍMICA II (14:00)
- **Sala 208**: FENÔMENOS ELETROMAGNÉTICOS (08:00, 14:00)
- **Sala 209**: Vazia
- **Sala 210**: Prova PPGECID (08:00)
- **Sala 211**: ETNOGRAFIA E ETNOMATEMÁTICA (14:00)
- **Sala 212**: Vazia

### Dia 2/11/2025 (Hoje), Área 17:
- Todas as salas 207-212 vazias.

### Dia 6/11/2025, Área 7 (Salas de Reunião):
- **Sala de Reuniões**: GERÊNCIA DE SERVIÇOS (14:00)

## Para Agentes IA

Use esta API para captar dados de reservas por área. Agentes podem consultar datas futuras e identificar salas livres/ocupadas.

Exemplo: "Quais salas estão livres no Pavilhão 2 amanhã?" - API retorna lista com reservas.