# 🔧 CORREÇÃO RÁPIDA - Bug do Endpoint /areas

## Problema
O endpoint `/areas` retorna array vazio porque usa `report.php` que está quebrado.

## Solução (2 minutos)

### Passo 1: Abrir Arquivo
```
Arquivo: C:\Projetos\reserva-cetens\index.js
Linha: 142
```

### Passo 2: Localizar Código
Procure por:
```javascript
await page.goto('https://reservascetens.ufrb.edu.br/report.php', { waitUntil: 'networkidle' });
```

### Passo 3: Substituir Por
```javascript
await page.goto('https://reservascetens.ufrb.edu.br/day.php', { waitUntil: 'networkidle', timeout: 30000 });
```

### Passo 4: Salvar e Testar
```powershell
# Reiniciar servidor
node index.js

# Testar (em outro terminal)
curl http://localhost:3001/areas
```

## Resultado Esperado
```json
[
  {"id": "7", "name": "Auditório e Sala de Reuniões"},
  {"id": "17", "name": "Pavilhão 2 - Salas 207-212"},
  ...
]
```

## ✅ Pronto!
API 100% funcional.
