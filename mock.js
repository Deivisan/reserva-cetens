const express = require('express');
const app = express();
const PORT = 3007;

app.get('/areas', (req, res) => {
  res.json([
    {"id": "1", "name": "Laboratório de Informática 1"},
    {"id": "2", "name": "Laboratório de Informática 2"},
    {"id": "3", "name": "Auditório Principal"},
    {"id": "4", "name": "Sala de Reuniões"},
    {"id": "5", "name": "Biblioteca"}
  ]);
});

app.get('/reservas', (req, res) => {
  const { year, month, day, area } = req.query;
  res.json({
    date: `${day}/${month}/${year}`,
    area,
    salas: [
      {
        nome: "Laboratório de Informática 1",
        reservas: [
          {
            inicio: "07:00",
            fim: "09:00",
            codigo: "INF001",
            materia: "Programação Web",
            professor: "Prof. Silva",
            categoria: "Informática",
            descricao_completa: "INF001 - Programação Web - Prof. Silva"
          }
        ],
        disponivel_manutencao: true
      }
    ]
  });
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`API mock reserva rodando na porta ${PORT}`);
});