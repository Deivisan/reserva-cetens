const express = require('express');
const app = express();
const PORT = 3001;

app.get('/test', (req, res) => {
  console.log('Endpoint /test chamado');
  res.json({ message: 'Teste ok' });
});

app.listen(PORT, () => {
  console.log(`API simples rodando em http://localhost:${PORT}`);
});