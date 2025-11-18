const express = require('express');
const { chromium } = require('playwright');

console.log('Iniciando aplicação...');

try {
  console.log('Testando chromium...');
  // Testar se chromium está disponível
  console.log('Chromium testado');
} catch (e) {
  console.error('Erro no chromium:', e);
}

const nextSlot = (time) => {
  const [h, m] = time.split(':').map(Number);
  const totalMin = h * 60 + m + 30;
  const nh = Math.floor(totalMin / 60);
  const nm = totalMin % 60;
  return `${nh.toString().padStart(2, '0')}:${nm.toString().padStart(2, '0')}`;
};

const app = express();
const PORT = 3001;

app.get('/reservas', async (req, res) => {
  console.log('Endpoint /reservas chamado');
  const { year, month, day, area } = req.query;
  if (!year || !month || !day || !area) {
    return res.status(400).json({ error: 'Parâmetros obrigatórios: year, month, day, area' });
  }

  const url = `https://reservascetens.ufrb.edu.br/day.php?year=${year}&month=${month}&day=${day}&area=${area}`;

  try {
    const browser = await chromium.launch({ headless: true });
    const page = await browser.newPage();
    await page.goto(url, { waitUntil: 'networkidle' });
    await page.waitForTimeout(2000); // Aguardar carregamento completo

    // Extrair headers das salas
    const table = page.locator('table').filter({ hasText: 'Time:' });
    const headers = await table.locator('th').allTextContents();
    const salaNames = headers.filter(h => h.trim() !== '' && h.trim() !== 'Time:').map(h => h.trim());
    console.log(`Sala names para área ${area}:`, salaNames);

    if (salaNames.length === 0) {
      console.log(`Nenhuma sala encontrada para área ${area}, tentando locator alternativo`);
      // Tentar locator alternativo
      const altHeaders = await page.locator('table').first().locator('th').allTextContents();
      console.log(`Headers alternativos:`, altHeaders);
      const altSalaNames = altHeaders.filter(h => h.includes('Sala')).map(h => h.trim());
      if (altSalaNames.length > 0) {
        salaNames.push(...altSalaNames);
      }
    }

    // Extrair linhas da tabela
    const rows = await table.locator('tbody tr').all();
    console.log(`Número de rows para área ${area}:`, rows.length);
    const salas = salaNames.map(name => ({ nome: name, reservas: [], disponivel_manutencao: true }));

    const slots = ['07:00', '07:30', '08:00', '08:30', '09:00', '09:30', '10:00', '10:30', '11:00', '11:30', '12:00', '12:30', '13:00', '13:30', '14:00', '14:30', '15:00', '15:30', '16:00', '16:30', '17:00', '17:30', '18:00', '18:30', '19:00', '19:30', '20:00', '20:30', '21:00', '21:30', '22:00', '22:30', '23:00', '23:30'];

    for (const row of rows) {
      const cells = await row.locator('td').allTextContents();
      if (cells.length > salaNames.length) {
        const horario = cells[0].trim();
        if (slots.includes(horario)) {
          for (let i = 0; i < salaNames.length; i++) {
            const descricao = cells[cells.length - salaNames.length + i].trim();
            if (descricao) {
              salas[i].disponivel_manutencao = false;
              // Parsing
              const match = descricao.match(/^(.+?) - (.+?) - (.+)$/);
              let codigo = '', materia = '', professor = '';
              if (match) {
                codigo = match[1].trim();
                materia = match[2].trim();
                professor = match[3].trim();
              } else {
                materia = descricao;
              }
              // Categorizar
              let categoria = 'Outros';
              if (materia.toLowerCase().includes('administração') || materia.toLowerCase().includes('gestão')) categoria = 'Gestão';
              else if (materia.toLowerCase().includes('química') || materia.toLowerCase().includes('física') || materia.toLowerCase().includes('engenharia')) categoria = 'Engenharia';
              else if (materia.toLowerCase().includes('deficiência') || materia.toLowerCase().includes('inclusão')) categoria = 'Inclusão';
              else if (materia.toLowerCase().includes('informática') || materia.toLowerCase().includes('computação')) categoria = 'Informática';
              else if (materia.toLowerCase().includes('matemática') || materia.toLowerCase().includes('etnografia')) categoria = 'Pesquisa';
              else if (materia.toLowerCase().includes('enem') || materia.toLowerCase().includes('revisões')) categoria = 'Ensino';
              else if (materia.toLowerCase().includes('prova') || materia.toLowerCase().includes('seleção')) categoria = 'Avaliação';

              salas[i].reservas.push({
                inicio: horario,
                fim: nextSlot(horario),
                codigo,
                materia,
                professor,
                categoria,
                descricao_completa: descricao
              });
            }
          }
        }
      }
    }

    // Agrupar em blocos
    for (const sala of salas) {
      const blocos = [];
      let blocoAtual = null;
      for (const res of sala.reservas) {
        if (blocoAtual && blocoAtual.descricao_completa === res.descricao_completa && blocoAtual.fim === res.inicio) {
          blocoAtual.fim = res.fim;
        } else {
          if (blocoAtual) blocos.push(blocoAtual);
          blocoAtual = { ...res };
        }
      }
      if (blocoAtual) blocos.push(blocoAtual);
      sala.reservas = blocos;
    }

    await browser.close();

    res.json({
      date: `${day}/${month}/${year}`,
      area,
      salas
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao scrapear o site' });
  }
});

app.get('/areas', async (req, res) => {
  console.log('Endpoint /areas chamado');
  try {
    const browser = await chromium.launch({ headless: true });
    const page = await browser.newPage();
    await page.goto('https://reservascetens.ufrb.edu.br/report.php', { waitUntil: 'networkidle' });
    await page.waitForTimeout(2000);
    const options = await page.locator('select[name="area"] option').all();
    const areas = [];
    for (const option of options) {
      const value = await option.getAttribute('value');
      const text = await option.textContent();
      if (value && value !== '') {
        areas.push({ id: value, name: text.trim() });
      }
    }
    await browser.close();
    res.json(areas);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao listar áreas' });
  }
});

app.get('/aulas-periodo', async (req, res) => {
  console.log('Endpoint /aulas-periodo chamado');
  const { year, month, dayStart, dayEnd } = req.query;
  
  if (!year || !month || !dayStart || !dayEnd) {
    return res.status(400).json({ 
      error: 'Parâmetros obrigatórios: year, month, dayStart, dayEnd',
      exemplo: '/aulas-periodo?year=2024&month=11&dayStart=5&dayEnd=6'
    });
  }

  try {
    const browser = await chromium.launch({ headless: true });
    const page = await browser.newPage();
    
    // Buscar áreas diretamente da página day.php
    await page.goto('https://reservascetens.ufrb.edu.br/day.php', { waitUntil: 'networkidle' });
    await page.waitForTimeout(2000);
    
    const options = await page.locator('select[name="area"] option').all();
    const areas = [];
    for (const option of options) {
      const value = await option.getAttribute('value');
      const text = await option.textContent();
      if (value && value !== '' && !isNaN(value)) {
        areas.push({ id: value, name: text.trim() });
      }
    }
    
    console.log(`Encontradas ${areas.length} áreas`);
    
    const resultado = {
      periodo: `${dayStart} a ${dayEnd}/${month}/${year}`,
      total_areas: areas.length,
      areas_data: []
    };

    // Para cada dia no período
    for (let day = parseInt(dayStart); day <= parseInt(dayEnd); day++) {
      console.log(`Processando dia ${day}/${month}/${year}...`);
      
      // Para cada área
      for (const area of areas) {
        const url = `https://reservascetens.ufrb.edu.br/day.php?year=${year}&month=${month}&day=${day}&area=${area.id}`;
        
        try {
          await page.goto(url, { waitUntil: 'networkidle', timeout: 30000 });
          
          // Extrair headers das salas
          const headers = await page.locator('table th').allTextContents();
          const salaNames = headers.filter(h => h.includes('Sala')).map(h => h.trim());
          
          if (salaNames.length === 0) continue;

          // Extrair linhas da tabela
          const rows = await page.locator('table tbody tr').all();
          const salas = salaNames.map(name => ({ nome: name, reservas: [] }));

          const slots = ['07:00', '07:30', '08:00', '08:30', '09:00', '09:30', '10:00', '10:30', '11:00', '11:30', '12:00', '12:30', '13:00', '13:30', '14:00', '14:30', '15:00', '15:30', '16:00', '16:30', '17:00', '17:30', '18:00', '18:30', '19:00', '19:30', '20:00', '20:30', '21:00', '21:30', '22:00', '22:30', '23:00', '23:30'];

          for (const row of rows) {
            const cells = await row.locator('td').allTextContents();
            if (cells.length > salaNames.length) {
              const horario = cells[0].trim();
              if (slots.includes(horario)) {
                for (let i = 0; i < salaNames.length; i++) {
                  const descricao = cells[cells.length - salaNames.length + i].trim();
                  if (descricao) {
                    // Parsing
                    const match = descricao.match(/^(.+?) - (.+?) - (.+)$/);
                    let codigo = '', materia = '', professor = '';
                    if (match) {
                      codigo = match[1].trim();
                      materia = match[2].trim();
                      professor = match[3].trim();
                    } else {
                      materia = descricao;
                    }
                    
                    // Categorizar
                    let categoria = 'Outros';
                    if (materia.toLowerCase().includes('administração') || materia.toLowerCase().includes('gestão')) categoria = 'Gestão';
                    else if (materia.toLowerCase().includes('química') || materia.toLowerCase().includes('física') || materia.toLowerCase().includes('engenharia')) categoria = 'Engenharia';
                    else if (materia.toLowerCase().includes('deficiência') || materia.toLowerCase().includes('inclusão')) categoria = 'Inclusão';
                    else if (materia.toLowerCase().includes('informática') || materia.toLowerCase().includes('computação')) categoria = 'Informática';
                    else if (materia.toLowerCase().includes('matemática') || materia.toLowerCase().includes('etnografia')) categoria = 'Pesquisa';
                    else if (materia.toLowerCase().includes('enem') || materia.toLowerCase().includes('revisões')) categoria = 'Ensino';
                    else if (materia.toLowerCase().includes('prova') || materia.toLowerCase().includes('seleção')) categoria = 'Avaliação';

                    salas[i].reservas.push({
                      inicio: horario,
                      fim: nextSlot(horario),
                      codigo,
                      materia,
                      professor,
                      categoria,
                      descricao_completa: descricao
                    });
                  }
                }
              }
            }
          }

          // Agrupar em blocos
          for (const sala of salas) {
            const blocos = [];
            let blocoAtual = null;
            for (const res of sala.reservas) {
              if (blocoAtual && blocoAtual.descricao_completa === res.descricao_completa && blocoAtual.fim === res.inicio) {
                blocoAtual.fim = res.fim;
              } else {
                if (blocoAtual) blocos.push(blocoAtual);
                blocoAtual = { ...res };
              }
            }
            if (blocoAtual) blocos.push(blocoAtual);
            sala.reservas = blocos;
          }

          // Adicionar ao resultado se tiver reservas
          const salasComReservas = salas.filter(s => s.reservas.length > 0);
          if (salasComReservas.length > 0) {
            resultado.areas_data.push({
              data: `${day}/${month}/${year}`,
              area_id: area.id,
              area_nome: area.name,
              salas: salasComReservas
            });
          }
        } catch (error) {
          console.error(`Erro ao processar área ${area.name} no dia ${day}:`, error.message);
        }
      }
    }

    await browser.close();

    resultado.total_registros = resultado.areas_data.length;
    res.json(resultado);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao buscar aulas do período', detalhes: error.message });
  }
});

try {
  app.listen(PORT, '0.0.0.0', () => {
    console.log(`API rodando em http://0.0.0.0:${PORT}`);
    console.log('Servidor iniciado com sucesso');
  });
} catch (error) {
  console.error('Erro ao iniciar servidor:', error);
}