// Configuração da API
const API_BASE_URL = window.location.hostname === 'localhost'
    ? 'http://localhost:3001'
    : 'http://api:3001'; // Nome do serviço Docker

// Constantes
const UPDATE_INTERVAL = 5 * 60 * 1000; // 5 minutos
const AREAS_TO_SHOW = ['7', '17']; // Auditório e Pavilhão 2

// Estado global
let updateTimer = null;

// Utilitários de data
function getToday() {
    const now = new Date();
    return {
        year: now.getFullYear(),
        month: now.getMonth() + 1,
        day: now.getDate(),
        date: now
    };
}

function getTomorrow() {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    return {
        year: tomorrow.getFullYear(),
        month: tomorrow.getMonth() + 1,
        day: tomorrow.getDate(),
        date: tomorrow
    };
}

function formatDate(date) {
    const days = ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado'];
    const months = ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'];

    const dayName = days[date.getDay()];
    const day = date.getDate();
    const month = months[date.getMonth()];

    return `${dayName}, ${day} de ${month}`;
}

function updateClock() {
    const now = new Date();
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');

    document.getElementById('currentTime').textContent = `${hours}:${minutes}:${seconds}`;
}

// Buscar dados da API
async function fetchReservas(year, month, day, area) {
    try {
        const url = `${API_BASE_URL}/reservas?year=${year}&month=${month}&day=${day}&area=${area}`;
        const response = await fetch(url);

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        return await response.json();
    } catch (error) {
        console.error('Erro ao buscar reservas:', error);
        return null;
    }
}

// Renderizar sala
function renderRoom(sala) {
    const hasReservas = sala.reservas && sala.reservas.length > 0;
    const statusClass = hasReservas ? 'occupied' : 'available';
    const statusText = hasReservas ? 'Ocupada' : 'Disponível';

    let scheduleHTML = '';

    if (hasReservas) {
        scheduleHTML = sala.reservas.map(reserva => `
            <div class="schedule-item">
                <div class="schedule-time">${reserva.inicio} - ${reserva.fim}</div>
                <div class="schedule-subject">${reserva.materia || 'Sem informação'}</div>
                ${reserva.professor ? `<div class="schedule-professor">👨‍🏫 ${reserva.professor}</div>` : ''}
                ${reserva.categoria ? `<span class="schedule-category category-${reserva.categoria}">${reserva.categoria}</span>` : ''}
            </div>
        `).join('');
    } else {
        scheduleHTML = `
            <div class="no-schedule">
                <div class="no-schedule-icon">✅</div>
                <div>Sala totalmente disponível</div>
            </div>
        `;
    }

    return `
        <div class="room-card ${statusClass}">
            <div class="room-header">
                <div class="room-name">${sala.nome}</div>
                <div class="room-status ${statusClass}">
                    <span class="status-dot ${statusClass}"></span>
                    ${statusText}
                </div>
            </div>
            <div class="room-schedule">
                ${scheduleHTML}
            </div>
        </div>
    `;
}

// Renderizar dia
async function renderDay(containerId, dateInfo) {
    const container = document.getElementById(containerId);
    container.innerHTML = '<div class="loading"><div class="spinner"></div><p>Carregando...</p></div>';

    try {
        const allRooms = [];

        // Buscar todas as áreas
        for (const area of AREAS_TO_SHOW) {
            const data = await fetchReservas(
                dateInfo.year,
                dateInfo.month,
                dateInfo.day,
                area
            );

            if (data && data.salas) {
                allRooms.push(...data.salas);
            }
        }

        if (allRooms.length === 0) {
            container.innerHTML = `
                <div class="error-message">
                    <h3>⚠️ Nenhuma sala encontrada</h3>
                    <p>Não foi possível carregar as informações das salas.</p>
                </div>
            `;
            return;
        }

        // Ordenar: salas disponíveis primeiro
        allRooms.sort((a, b) => {
            const aHasReservas = a.reservas && a.reservas.length > 0;
            const bHasReservas = b.reservas && b.reservas.length > 0;

            if (aHasReservas === bHasReservas) return 0;
            return aHasReservas ? 1 : -1;
        });

        container.innerHTML = allRooms.map(sala => renderRoom(sala)).join('');

    } catch (error) {
        console.error('Erro ao renderizar dia:', error);
        container.innerHTML = `
            <div class="error-message">
                <h3>❌ Erro ao carregar</h3>
                <p>${error.message}</p>
            </div>
        `;
    }
}

// Atualizar tudo
async function updateDashboard() {
    console.log('🔄 Atualizando dashboard...', new Date().toLocaleTimeString());

    const today = getToday();
    const tomorrow = getTomorrow();

    // Atualizar datas nos headers
    document.getElementById('todayDate').textContent = formatDate(today.date);
    document.getElementById('tomorrowDate').textContent = formatDate(tomorrow.date);

    // Renderizar ambos os dias
    await Promise.all([
        renderDay('todayRooms', today),
        renderDay('tomorrowRooms', tomorrow)
    ]);

    console.log('✅ Dashboard atualizado');
}

// Inicialização
async function init() {
    console.log('🚀 Iniciando dashboard CETENS...');

    // Atualizar relógio a cada segundo
    updateClock();
    setInterval(updateClock, 1000);

    // Primeira atualização
    await updateDashboard();

    // Atualizar periodicamente
    updateTimer = setInterval(updateDashboard, UPDATE_INTERVAL);

    console.log(`✅ Dashboard iniciado. Próxima atualização em ${UPDATE_INTERVAL / 1000 / 60} minutos.`);
}

// Cleanup ao fechar
window.addEventListener('beforeunload', () => {
    if (updateTimer) {
        clearInterval(updateTimer);
    }
});

// Iniciar quando DOM estiver pronto
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}
