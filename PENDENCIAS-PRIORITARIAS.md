# 🚨 PENDÊNCIAS PRIORITÁRIAS - TI CETENS

**Criado:** 07/11/2025  
**Autor:** DevSan (Deivison Santana)  
**Objetivo:** Checklist executável com timing específico  
**Status Atual:** 97% campus catalogado (32/33 setores)

---

## 📋 Sistema de Priorização

- 🔴 **CRÍTICO** - Resolver em 1-3 dias (impacta aulas/pesquisas)
- 🟡 **ALTO** - Resolver em 5-10 dias (melhoria significativa)
- 🟢 **MÉDIO** - Resolver em 14-30 dias (otimização)
- ⏸️ **PAUSADO** - Aguardando decisão externa
- ✅ **RESOLVIDO** - Concluído

---

## 🔴 CRÍTICO - Resolver HOJE até 3 dias

### 1️⃣ LAB 07 - Criar Imagem FOG (20 PCs Ryzen 7 5700G + RX 550)
- **Prioridade:** 🔴🔴🔴
- **Local:** Pavilhão Laboratórios 1
- **Problema:** 20 computadores potentes SEM padrão instalado
- **Impacto:** Lab informática principal inutilizado
- **Ação:**
  1. Configurar 1 PC modelo com stack completo:
     - GCC, Clang, Python, VS Code, IntelliJ, Android Studio
     - Arduino IDE, RStudio, AutoCAD, FreeCAD, FlexSim, PVSOL
     - Apache, OBS Studio
  2. Capturar imagem via FOG Server
  3. Replicar nos 19 PCs restantes
- **Estimativa:** 6h (negociar bloqueio 1 dia útil OU 2 tardes após 18h)
- **Timing:** Negociar com responsável LAB 07 (dia sem aulas)
- **Checklist:**
  - [ ] Negociar bloqueio LAB 07 (1 dia completo OU 2 tardes)
  - [ ] Preparar lista completa softwares
  - [ ] Configurar PC modelo completo
  - [ ] Subir imagem FOG
  - [ ] Replicar 19 PCs
  - [ ] Testar 3 PCs aleatórios

---

### 2️⃣ Lab Informática 1 - Imagem FOG + Ubuntu 24.04 (20 PCs)
- **Prioridade:** 🔴🔴🔴
- **Local:** Prédio Administrativo
- **Problema:** Ubuntu 20.04 depreciado, sem imagem FOG padrão
- **Impacto:** Segurança e performance degradadas
- **Ação:**
  1. Configurar 1 PC modelo dual-boot Windows 10 + Ubuntu 24.04
  2. Instalar padrão UFRB completo
  3. Capturar imagem FOG
  4. Replicar nos 19 PCs restantes
- **Estimativa:** 8h (negociar bloqueio 1 dia útil OU 2 tardes após 18h)
- **Timing:** Negociar com responsável Lab Inf 1 (dia sem aulas)
- **Checklist:**
  - [ ] Negociar bloqueio Lab Inf 1 (1 dia completo OU 2 tardes)
  - [ ] Download Ubuntu 24.04 LTS ISO
  - [ ] Configurar dual-boot perfeito
  - [ ] Instalar padrão UFRB ambos OS
  - [ ] Subir imagem FOG
  - [ ] Replicar 19 PCs
  - [ ] Testar boot ambos sistemas 3 PCs aleatórios

---

### 3️⃣ LAB 04 + LAB 06 - Atualizar Windows/Softwares
- **Prioridade:** 🔴
- **Local:** Pavilhão Laboratórios 1
- **Problema:** Windows 10 e softwares desatualizados
- **Ação:** 
  - Windows Update última versão (SOMENTE)
  - Atualizar: Tracker, Arduino IDE, Python, AutoCAD, RStudio
- **Estimativa:** 1h/PC × 13 = 13h (distribuir 1 semana)
- **Timing:** Após resolver tarefas críticas urgentes
- **Checklist:**
  - [ ] Consultar reservas LAB 04 e LAB 06
  - [ ] LAB 04: Atualizar 6 PCs (Windows + softwares)
  - [ ] LAB 06: Atualizar 7 PCs (Windows + softwares)
  - [ ] EVITAR atualizar MATLAB (licenças complexas)

---

### 4️⃣ LAB 105 (LIMM) - Atualizar Ubuntu 20.04 → 24.04 (6 PCs)
- **Prioridade:** 🔴🔴
- **Local:** Pavilhão Laboratórios 2
- **Problema:** Ubuntu 20.04 depreciado (fim suporte)
- **Impacto:** Vulnerabilidades segurança, incompatibilidades futuras
- **Ação:** Executar comando upgrade preservando dados:
  ```bash
  sudo apt update
  sudo apt upgrade -y
  sudo do-release-upgrade
  ```
- **Estimativa:** 2h/PC × 6 = 12h (distribuir 3-4 dias)
- **Timing:** 
  - Segunda 11/11: 2 PCs (verificar reserva - tarde 14h-18h)
  - Terça 12/11: 2 PCs (verificar reserva - tarde 14h-18h)
  - Quinta 14/11: 2 PCs (verificar reserva - tarde 14h-18h)
- **Checklist:**
  - [ ] Consultar reserva LAB 105 (segunda/terça/quinta)
  - [ ] Atualizar PC 1 (UFRB094118)
  - [ ] Atualizar PC 2 (UFRB094187)
  - [ ] Atualizar PC 3 (UFRB094182)
  - [ ] Atualizar PC 4 (UFRB094123)
  - [ ] Atualizar PC 5 (UFRB100465)
  - [ ] Atualizar PC 6 (UFRB100551)
  - [ ] Testar Arduino IDE + VS Code após cada upgrade

---

### 5️⃣ Sala 210 - Projetor Sumiu
- **Prioridade:** 🔴
- **Local:** Pavilhão Aulas 2
- **Problema:** Projetor desapareceu
- **Impacto:** Sala sem recurso audiovisual
- **Ação:** Abrir chamado urgente setor responsável
- **Estimativa:** 15min (abertura chamado)
- **Timing:** HOJE (07/11)
- **Checklist:**
  - [ ] Email/chamado formal setor patrimônio
  - [ ] Verificar se foi realocado
  - [ ] Solicitar reposição se confirmado perda

---

### 6️⃣ Auditório - Wi-Fi Crítico
- **Prioridade:** 🔴
- **Local:** Auditório
- **Problema:** Sinal Wi-Fi fraco/fraqíssimo
- **Impacto:** Eventos e apresentações prejudicadas
- **Ação:** Instalar Access Point adicional ou extensor
- **Estimativa:** 1-2h
- **Timing:** Segunda 11/11 manhã (9h-11h)
- **Checklist:**
  - [ ] Separar 1 Access Point TP-Link do estoque
  - [ ] Cabo Ethernet até ponto estratégico
  - [ ] Configurar AP (SSID UFRB padrão)
  - [ ] Testar cobertura evento piloto

---

## 🟡 ALTO - Resolver 5-10 dias

### 7️⃣ LAB 03 (NETA-A) - Impressora Samsung (cabo → rede)
- **Prioridade:** 🟡
- **Local:** Pavilhão Laboratórios 1
- **Problema:** Impressora conectada via cabo, 3 PCs compartilhados via Wi-Fi
- **Impacto:** Apenas 1 PC imprime
- **Ação:** Conectar impressora à rede via Ethernet
- **Estimativa:** 30min
- **Timing:** Segunda 11/11 manhã (8h30-9h)
- **Checklist:**
  - [ ] Trocar cabo PC → impressora por cabo impressora → switch
  - [ ] Configurar IP fixo impressora
  - [ ] Testar impressão dos 3 PCs via rede

---

### 8️⃣ LAB 04 + LAB 06 - Atualizar Windows/Softwares
- **Prioridade:** 🟡
- **Local:** Pavilhão Laboratórios 1
- **Problema:** Windows 10 e softwares desatualizados
- **Ação:** 
  - Windows Update última versão
  - Atualizar: Tracker, Arduino IDE, Python, AutoCAD, RStudio
- **Estimativa:** 1h/PC × 13 = 13h
- **Timing:** APÓS migração SSD (semana 18-22/11)
- **Checklist:**
  - [ ] LAB 04: Atualizar 6 PCs
  - [ ] LAB 06: Atualizar 7 PCs
  - [ ] EVITAR atualizar MATLAB (licenças complexas)

---

### 9️⃣ LAB 204 - PC na TI (Windows 7 → Windows 10)
- **Prioridade:** 🟡
- **Local:** PC aguardando na Sala TI
- **Problema:** Windows 7 inoperante na rede UFRB
- **Bloqueio:** Aguardando liberação professores (verificar arquivos Receita Federal)
- **Ação:**
  1. Email professores solicitando aval
  2. Verificar dados críticos
  3. Backup → Formatar → Windows 10
- **Estimativa:** 2h (pós-autorização)
- **Timing:** 2-3 dias (após resposta email)
- **Checklist:**
  - [ ] Email professores HOJE
  - [ ] Aguardar liberação (48h)
  - [ ] Backup dados importantes
  - [ ] Formatar Windows 10
  - [ ] Retornar ao LAB 204

---

### 🔟 Sala 208 - Cabo HDMI Frouxo
- **Prioridade:** 🟡
- **Local:** Pavilhão Aulas 2
- **Problema:** Cabo HDMI mal posicionado
- **Ação:** Instalar gancho/suporte
- **Estimativa:** 15min
- **Timing:** Terça 12/11 (12h-14h)
- **Checklist:**
  - [ ] Separar gancho adesivo
  - [ ] Organizar cabo na parede
  - [ ] Testar conexão notebook

---

### 1️⃣1️⃣ NUGTESP - Configurar Desktop
- **Prioridade:** 🟡
- **Local:** Pavilhão Laboratórios 1
- **Problema:** Desktop sem padrão UFRB, sem IP fixo
- **Ação:**
  1. Coletar tombamento
  2. Instalar padrão UFRB (LibreOffice, RustDesk, UltraVNC)
  3. Configurar IP fixo no rack
- **Estimativa:** 1h
- **Timing:** Segunda 11/11 manhã (9h-10h)
- **Checklist:**
  - [ ] Coletar tombamento
  - [ ] Instalar padrão UFRB completo
  - [ ] IP fixo + teste impressora rede

---

### 1️⃣2️⃣ Empresa Júnior - Múltiplas Pendências
- **Prioridade:** 🟡
- **Local:** Prédio Administrativo
- **Problema:** 2 baterias CMOS descarregadas, Wi-Fi fraco, impressora isolada
- **Ação:**
  1. Trocar 2 baterias CR2032
  2. Instalar repetidor Wi-Fi com porta Ethernet
  3. Conectar impressora à rede
  4. Avaliar upgrade SSD futuro
- **Estimativa:** 1-2h
- **Timing:** Segunda 11/11 manhã (10h-12h)
- **Checklist:**
  - [ ] Comprar 2 baterias CR2032
  - [ ] Trocar baterias ambos PCs
  - [ ] Instalar repetidor Wi-Fi Ethernet
  - [ ] Configurar impressora IP fixo
  - [ ] Testar impressão + Wi-Fi

---

### 1️⃣3️⃣ Sala Comunicação - Impressora Isolada
- **Prioridade:** 🟡
- **Local:** Próximo Prédio Multiuso
- **Problema:** Impressora sem rede (sem Wi-Fi, sem Ethernet)
- **Ação:** Instalar repetidor Wi-Fi com porta Ethernet
- **Estimativa:** 30min
- **Timing:** Segunda 11/11 tarde (14h-14h30)
- **Checklist:**
  - [ ] Instalar repetidor Wi-Fi Ethernet
  - [ ] Conectar impressora à porta Ethernet
  - [ ] Configurar IP fixo
  - [ ] Página teste

---

## 🟢 MÉDIO - Resolver 14-30 dias

### 1️⃣4️⃣ Gabinete 6 - Catalogar
- **Prioridade:** 🟢
- **Local:** Pavilhão Gabinetes
- **Bloqueio:** Chaves indisponíveis em 05/11
- **Ação:** Solicitar acesso e catalogar
- **Estimativa:** 1h
- **Timing:** Quando chaves disponíveis
- **Checklist:**
  - [ ] Solicitar chaves
  - [ ] Catalogar tombamentos
  - [ ] Coletar IP impressora (se houver)

---

### 1️⃣5️⃣ Gabinete 3 - Finalizar Pendências
- **Prioridade:** 🟢
- **Local:** Pavilhão Gabinetes
- **Problema:** Teste no-breaks overnight (06/11 noite)
- **Ação:**
  1. Verificar resultado teste no-breaks (manhã 07/11)
  2. Coletar IP impressora ativa
  3. Recolher impressora sobressalente
- **Estimativa:** 30min
- **Timing:** Hoje 07/11 manhã + visita futura recolhimento
- **Checklist:**
  - [ ] Verificar no-breaks funcionando
  - [ ] Realocar no-breaks OK ou descartar falhos
  - [ ] Coletar IP impressora
  - [ ] Agendar recolhimento impressora extra

---

### 1️⃣6️⃣ Gabinete Coletivo - Segunda Impressora
- **Prioridade:** 🟢
- **Local:** Prédio Administrativo
- **Problema:** Impressora atual sobrecarregada (~20 notebooks)
- **Ação:** Solicitar orçamento/aquisição
- **Estimativa:** Aguardar processo burocrático
- **Timing:** 30-60 dias
- **Checklist:**
  - [ ] Justificativa formal sobrecarga
  - [ ] Solicitar segunda Samsung ML3750
  - [ ] Aguardar aprovação

---

### 1️⃣7️⃣ 4 Salas Direção - Catalogar
- **Prioridade:** 🟢
- **Local:** Diretoria
- **Ação:** Catalogar computadores/notebooks + impressora compartilhada
- **Estimativa:** 2h total
- **Timing:** Sexta 15/11 manhã (10h-12h)
- **Checklist:**
  - [ ] Agendar com direção
  - [ ] Catalogar 4 salas
  - [ ] Coletar tombamentos
  - [ ] Verificar impressora Samsung IP

---

## ⏸️ PAUSADAS - Aguardando Recursos/Decisão

### 1️⃣8️⃣ LAB 04 + LAB 06 - Migração HDD → SSD (13 PCs)
- **Prioridade:** ⏸️ **PAUSADO**
- **Local:** Pavilhão Laboratórios 1
- **Bloqueio:** Aguardando recuperação de SSDs de PCs parados
- **Ação Futura:**
  - Recuperar SSDs de computadores descartados/parados
  - Clonar HDD → SSD (13 PCs total)
  - LAB 04: 6 PCs | LAB 06: 7 PCs
- **Timing:** Quando SSDs disponíveis (recuperação em andamento)
- **Observação:** Lentidão crônica (4GB RAM + HDD), mas funcional

---

### 1️⃣9️⃣ LAB 09 (LAPSE) - Reimaginação Rocky Linux
- **Prioridade:** ⏸️ **PAUSADO**
- **Local:** Pavilhão Laboratórios 1
- **Situação:** Projeto completo reimaginação (18 estações)
- **Bloqueio:** Planejado para final dezembro 2025 / início 2026
- **Ação Futura:**
  - Migrar Windows → Rocky Linux
  - Substituir monitores + gabinetes
  - Reconfigurar software (ANSYS, SolidWorks)
- **Timing:** Dezembro 2025 / Janeiro 2026

---

### 2️⃣0️⃣ LAB 104 (Espaço Colaborar) - Reimaginação 7 ChipNet
- **Prioridade:** ⏸️
- **Local:** Pavilhão Laboratórios 2
- **Situação:** 7 ChipNet Ryzen 3 + HDD lentos
- **Bloqueio:** Uso independente TI, não urgente
- **Ação Futura:** Thin clients, estações teste, servidores leves
- **Timing:** Baixa prioridade (quando houver folga)

---

## ✅ RESOLVIDAS (06-07/11/2025)

- ✅ **LAB 202** - 2 PCs formatados e funcionando (06/11)
- ✅ **LAB 201 (LEM)** - Responsável confirmou sem pendências (06/11)
- ✅ **Sala 205** - Chamado setor Cruz aberto (não TI) (06/11)
- ✅ **Portaria** - Tombamento catalogado UFRB094167 (06/11)

---

## 📊 Estatísticas Rápidas

- **Total Pendências:** 20
- **Críticas (1-3 dias):** 6
- **Altas (5-10 dias):** 6
- **Médias (14-30 dias):** 4
- **Pausadas:** 4 (incluindo SSDs e Rocky Linux)
- **Resolvidas Recentes:** 4

---

## 🎯 Próximos 3 Dias - Foco Máximo

**Quinta 07/11:**
- Sala 210: Chamado projetor (15min)
- Gabinete 3: Verificar no-breaks (30min)

**Sexta 08/11:**
- Preparar stack completo softwares LAB 07 e Lab Inf 1
- Download Ubuntu 24.04 LTS
- Negociar bloqueio LAB 07 e Lab Inf 1 com responsáveis

**Segunda 11/11:**
- Executar cronograma normal (LAB 103, NUGTESP, Empresa Júnior, etc)
- Confirmar datas bloqueio LAB 07 e Lab Inf 1

---

**💪 Use com `HORARIOS-LIVRES-CETENS.md` para planejar cada ação!**

---

## 💡 Destaques Importantes

### ⚠️ NUNCA esqueça:
- **LAB 201 (LEM)** → Experimentos contínuos, ZERO intervenção sem aval
- **LAB 04 e LAB 06** → Sempre consultar reserva (muito utilizados)
- **Tarefas longas** → Negociar bloqueio 1 dia útil completo com responsáveis

### 🔥 Urgências HOJE/amanhã:
1. Sala 210: Abrir chamado projetor sumido
2. Gabinete 3: Verificar teste no-breaks overnight
3. Preparar stack softwares LAB 07 e Lab Inf 1
4. **NEGOCIAR bloqueio LAB 07 e Lab Inf 1** com responsáveis

### 📅 Tarefas Longas - Estratégia:
- **LAB 07 (6h):** Negociar 1 dia sem aulas OU 2 tardes 18h-22h
- **Lab Inf 1 (8h):** Negociar 1 dia sem aulas OU 2 tardes 18h-22h
- **Alternativa:** Aproveitar feriados/recessos universitários
