// Função para carregar os dados de login do arquivo JSON
async function fetchUsers() {
    try {
        const response = await fetch('users.json'); // Lê o arquivo JSON
        const users = await response.json();
        return users;
    } catch (error) {
        console.error('Erro ao carregar usuários:', error);
        return [];
    }
}

// Manipulador de eventos para o formulário
document.getElementById('loginForm').addEventListener('submit', async function (e) {
    e.preventDefault(); // Previne o envio do formulário

    // Obter valores dos campos de entrada
    const usernameInput = document.getElementById('username').value;
    const passwordInput = document.getElementById('password').value;
    const errorMessage = document.getElementById('errorMessage');

    // Carregar usuários do JSON
    const users = await fetchUsers();

    // Verificar se o nome de usuário e senha correspondem a algum usuário no JSON
    const user = users.find(user => user.username === usernameInput && user.password === passwordInput);
    if (user) {
        localStorage.setItem('userData', JSON.stringify(user));
        // Redireciona para outra aba se o login for bem-sucedido
        window.location.href = 'home.html';
    } else {
        // Exibe mensagem de erro e limpa os campos
        errorMessage.textContent = 'Nome de usuário ou senha incorretos!';
        document.getElementById('username').value = '';
        document.getElementById('password').value = '';
    }
});