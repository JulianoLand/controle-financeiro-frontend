// /js/index.js
// Função para popular os selects
function populateMonthAndYear() {
    const monthSelect = document.getElementById('monthSelect');
    const yearSelect = document.getElementById('yearSelect');

    const months = [
        { value: 0, label: 'JAN' },
        { value: 1, label: 'FEV' },
        { value: 2, label: 'MAR' },
        { value: 3, label: 'ABR' },
        { value: 4, label: 'MAI' },
        { value: 5, label: 'JUN' },
        { value: 6, label: 'JUL' },
        { value: 7, label: 'AGO' },
        { value: 8, label: 'SET' },
        { value: 9, label: 'OUT' },
        { value: 10, label: 'NOV' },
        { value: 11, label: 'DEZ' }
    ];

    months.forEach(month => {
        const option = document.createElement('option');
        option.value = month.value;
        option.textContent = month.label;
        monthSelect.appendChild(option);
    });

    const currentYear = new Date().getFullYear();
    for (let i = currentYear - 5; i <= currentYear + 5; i++) {
        const option = document.createElement('option');
        option.value = i;
        option.textContent = i;
        yearSelect.appendChild(option);
    }

    // Deixa o mês e ano atuais selecionados
    monthSelect.value = new Date().getMonth();
    yearSelect.value = currentYear;
}

  // Função para capturar a mudança nos selects
function setupFilterListeners() {
    const monthSelect = document.getElementById('monthSelect');
    const yearSelect = document.getElementById('yearSelect');

    monthSelect.addEventListener('change', () => {
        const selectedMonth = monthSelect.value;
        const selectedYear = yearSelect.value;
        console.log(`Filtrar: ${selectedMonth}/${selectedYear}`);
        // Aqui no futuro chamaremos a API de transações
    });

    yearSelect.addEventListener('change', () => {
        const selectedMonth = monthSelect.value;
        const selectedYear = yearSelect.value;
        console.log(`Filtrar: ${selectedMonth}/${selectedYear}`);
        // Aqui também chamaremos a API
    });
}

document.addEventListener('DOMContentLoaded', async () => {
    const token = localStorage.getItem('token');
    const greeting = document.getElementById('greeting');
    const userName = document.getElementById('userName');
    const currentYear = document.getElementById('currentYear');

    currentYear.textContent = new Date().getFullYear();

    if (!token) {
        window.location.href = '/login.html'; // redireciona se não tiver token
        return;
    }

    try {
        const response = await fetch('http://localhost:3000/api/auth/me', {
        headers: {
            Authorization: `Bearer ${token}`,
        },
        });

        const data = await response.json();

        if (response.ok) {
            userName.textContent = `Olá, ${data.name || 'usuário'}!`;
            greeting.textContent = `Bem-vindo, ${data.name || 'usuário'}!`;
        } else {
            greeting.textContent = 'Sessão expirada.';
            localStorage.removeItem('token');
            setTimeout(() => {
                window.location.href = '/login.html';
            }, 2000);
        }
    } catch (err) {
        greeting.textContent = 'Erro de conexão.';
        console.error(err);
    }

    // Dentro do DOMContentLoaded, depois de buscar o usuário:
    populateMonthAndYear();
    setupFilterListeners();
});

document.getElementById('logout').addEventListener('click', () => {
    localStorage.removeItem('token');
    window.location.href = '/login.html';
});
