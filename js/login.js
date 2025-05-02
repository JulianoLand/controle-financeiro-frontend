// /js/login.js

document.getElementById('loginForm').addEventListener('submit', async (e) => {
e.preventDefault();

const email = document.getElementById('email').value;
const password = document.getElementById('password').value;

    try {
        const response = await fetch('http://192.168.18.102:5000/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
        });

        const data = await response.json();

        if (response.ok) {
        localStorage.setItem('token', data.token); // salva token
        window.location.href = '/index.html'; // redireciona
        } else {
        alert(data.message || 'Erro ao logar');
        }
    } catch (err) {
        console.error('Erro:', err);
        alert('Falha na conexão');
    }
});
