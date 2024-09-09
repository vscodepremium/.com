// Função para mostrar notificações
function showNotification(message, type) {
    const notificationContainer = document.getElementById('notification-container');
    const notification = document.createElement('div');
    notification.classList.add('notification', type);
    notification.textContent = message;
    notificationContainer.appendChild(notification);
    setTimeout(() => {
        notification.remove();
    }, 4500);
}

// Função para salvar dados de registro no localStorage
function saveUserData(event) {
    event.preventDefault();

    const username = document.getElementById('register-username').value;
    const email = document.getElementById('register-email').value;
    const password = document.getElementById('register-password').value;
    const confirmPassword = document.getElementById('register-confirm-password').value;

    const usernameError = document.getElementById('register-username-error');
    const emailError = document.getElementById('register-email-error');
    const passwordError = document.getElementById('register-password-error');
    const confirmPasswordError = document.getElementById('register-confirm-password-error');

    let isValid = true;

    // Validação dos campos
    if (username.length < 3 || username.length > 20) {
        usernameError.textContent = 'O nome de usuário deve ter entre 3 e 20 caracteres.';
        usernameError.style.display = 'block';
        isValid = false;
    } else {
        usernameError.style.display = 'none';
    }

    if (!validateEmail(email)) {
        emailError.textContent = 'Email inválido.';
        emailError.style.display = 'block';
        isValid = false;
    } else {
        emailError.style.display = 'none';
    }

    if (password.length < 6 || password.length > 16) {
        passwordError.textContent = 'A senha deve ter entre 6 e 16 caracteres.';
        passwordError.style.display = 'block';
        isValid = false;
    } else {
        passwordError.style.display = 'none';
    }

    if (password !== confirmPassword) {
        confirmPasswordError.textContent = 'As senhas não coincidem.';
        confirmPasswordError.style.display = 'block';
        isValid = false;
    } else {
        confirmPasswordError.style.display = 'none';
    }

    // Se todas as validações passarem
    if (isValid) {
        const userData = {
            username: username,
            email: email,
            password: password
        };

        localStorage.setItem('userData', JSON.stringify(userData));
        showNotification('Usuário registrado com sucesso!', 'success');
        window.location.href = 'index.html'; // Redireciona para o login
    } else {
        showNotification('Erro ao registrar. Verifique os campos.', 'error');
    }
}

// Função para validar email
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
}

// Função para verificar login
function checkLogin(event) {
    event.preventDefault();

    const username = document.getElementById('login-username').value;
    const password = document.getElementById('login-password').value;

    const usernameError = document.getElementById('login-username-error');
    const passwordError = document.getElementById('login-password-error');

    let isValid = true;

    if (username.length < 3 || username.length > 20) {
        usernameError.textContent = 'O nome de usuário deve ter entre 3 e 20 caracteres.';
        usernameError.style.display = 'block';
        isValid = false;
    } else {
        usernameError.style.display = 'none';
    }

    if (password.length < 6 || password.length > 16) {
        passwordError.textContent = 'A senha deve ter entre 6 e 16 caracteres.';
        passwordError.style.display = 'block';
        isValid = false;
    } else {
        passwordError.style.display = 'none';
    }

    if (isValid) {
        const savedData = localStorage.getItem('userData');
        if (savedData) {
            const userData = JSON.parse(savedData);

            if (username === userData.username && password === userData.password) {
                showNotification('Login realizado com sucesso!', 'success');
                window.location.href = 'main.html'; // Redireciona para a página inicial
            } else {
                showNotification('Usuário ou senha incorretos.', 'error');
            }
        } else {
            showNotification('Nenhum usuário registrado encontrado.', 'error');
        }
    } else {
        showNotification('Erro ao fazer login. Verifique os campos.', 'error');
    }
}

// Adiciona os event listeners quando o DOM estiver carregado
document.addEventListener('DOMContentLoaded', () => {
    const registerForm = document.getElementById('registerForm');
    if (registerForm) {
        registerForm.addEventListener('submit', saveUserData);
    }

    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', checkLogin);
    }
});
