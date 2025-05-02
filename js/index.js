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

// Função para exibir as transações
function renderTransactions(transactions) {
    const transactionsList = document.getElementById('transactionsList');
    transactionsList.innerHTML = ''; // Limpa antes de renderizar

    if (transactions.length === 0) {
        transactionsList.innerHTML = '<p class="text-center text-gray-500">Nenhuma transação encontrada.</p>';
        return;
    }

    transactions.forEach(transaction => {
        const div = document.createElement('div');
        div.className = 'flex justify-between items-center border-b py-2';

        div.innerHTML = `
        <div class="flex items-center gap-2">
            <input type="checkbox" ${transaction.pago ? 'checked' : ''} disabled>
            <span>${transaction.nome}</span>
        </div>
        <div class="flex items-center gap-2">
            <button class="text-blue-500 text-sm" data-id=${transaction.id} data-action="edit">Editar</button>
            <button class="text-red-500 text-sm" data-id=${transaction.id} data-action="delete">Excluir</button>
        </div>
        `;

        transactionsList.appendChild(div);
    });
}

// Teste de exibição ao carregar a página
const exemploTransacoes = [
    { id: 1, nome: 'Conta de Luz', pago: false },
    { id: 2, nome: 'Aluguel', pago: true },
    { id: 3, nome: 'Internet', pago: false },
    { id: 4, nome: 'Agua', pago: false },
    { id: 5, nome: 'Prestação', pago: false },
    { id: 6, nome: 'Financiamento', pago: false },
];

  // Renderizar ao iniciar
renderTransactions(exemploTransacoes);

function setupTransactionButton() {
    const transactionsList = document.getElementById('transactionsList');

    transactionsList.addEventListener('click', (event) => {
        const button = event.target.closest('button[data-action]');

        if (button) {
            const action = button.getAttribute('data-action');
            const id = button.getAttribute('data-id');
            console.log("cheguei aqui");

            if (action === 'edit') {
                alert(`Editar transação ID: ${id}`);
            } else if (action === 'delete') {
                alert(`Excluir transação ID: ${id}`);
            }
        }
    });
}

// logica para os butoes
setupTransactionButton();

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
        const response = await fetch('http://192.168.18.102:5000/api/auth/me', {
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
