// /js/register.js

document.getElementById('registerForm').addEventListener('submit', async (e) => {
        e.preventDefault();
    
        const name = document.getElementById('nome').value;
        const email = document.getElementById('email').value;
        const password = document.getElementById('senha').value;
    
        try {
        const response = await fetch('http://localhost:5000/api/auth/register', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name, email, password }),
        });
    
        const data = await response.json();
    
        if (response.ok) {
            alert('Cadastro realizado com sucesso!');
            window.location.href = '/login.html';
        } else {
            alert(data.message || 'Erro ao cadastrar');
        }
        } catch (err) {
        console.error('Erro:', err);
        alert('Erro de conexão');
        }
});
