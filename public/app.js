// Theme Toggle
const themeToggle = document.getElementById('theme-toggle');
const registerThemeToggle = document.getElementById('register-theme-toggle');
const themeContainer = document.getElementById('theme-container');
const registerThemeContainer = document.getElementById('register-theme-container');

let isDarkMode = true;

function toggleTheme() {
    isDarkMode = !isDarkMode;
    
    if (isDarkMode) {
        themeContainer.classList.remove('light');
        registerThemeContainer.classList.remove('light');
    } else {
        themeContainer.classList.add('light');
        registerThemeContainer.classList.add('light');
    }
}

themeToggle.addEventListener('click', toggleTheme);
registerThemeToggle.addEventListener('click', toggleTheme);

// Form Switching
const toRegisterBtn = document.getElementById('to-register');
const toLoginBtn = document.getElementById('to-login');

function showRegister() {
    themeContainer.classList.add('hidden');
    registerThemeContainer.classList.remove('hidden');
}

function showLogin() {
    registerThemeContainer.classList.add('hidden');
    themeContainer.classList.remove('hidden');
}

toRegisterBtn.addEventListener('click', (e) => {
    e.preventDefault();
    showRegister();
});

toLoginBtn.addEventListener('click', (e) => {
    e.preventDefault();
    showLogin();
});

// Password Toggle
function setupPasswordToggle(container) {
    const passwordInput = container.querySelector('input[type="password"]');
    const toggleBtn = container.querySelector('.password-toggle');
    
    if (passwordInput && toggleBtn) {
        toggleBtn.addEventListener('click', () => {
            if (passwordInput.type === 'password') {
                passwordInput.type = 'text';
                toggleBtn.textContent = '🙈';
            } else {
                passwordInput.type = 'password';
                toggleBtn.textContent = '👁️';
            }
        });
    }
}

setupPasswordToggle(document.getElementById('theme-container'));
setupPasswordToggle(document.getElementById('register-theme-container'));

// Form Handling
const loginForm = document.getElementById('login-form');
const loginMessage = document.getElementById('login-message');
const registerForm = document.getElementById('register-form');
const registerMessage = document.getElementById('register-message');

loginForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const username = document.getElementById('login-username').value;
    const password = document.getElementById('login-password').value;
    
    loginMessage.textContent = '';
    loginMessage.className = 'message';
    
    try {
        const response = await fetch('/api/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, password })
        });
        
        const data = await response.json();
        
        if (response.ok) {
            loginMessage.textContent = data.message;
            loginMessage.classList.add('success');
            console.log('Token:', data.token);
            // Redirect to dashboard
            setTimeout(() => {
                window.location.href = '/dashboard';
            }, 1000);
        } else {
            loginMessage.textContent = data.message;
            loginMessage.classList.add('error');
        }
    } catch (error) {
        loginMessage.textContent = 'An error occurred';
        loginMessage.classList.add('error');
    }
});

registerForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const username = document.getElementById('register-name').value;
    const email = document.getElementById('register-email').value;
    const password = document.getElementById('register-password').value;
    
    registerMessage.textContent = '';
    registerMessage.className = 'message';
    
    try {
        const response = await fetch('/api/register', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, email, password })
        });
        
        const data = await response.json();
        
        if (response.ok) {
            registerMessage.textContent = data.message;
            registerMessage.classList.add('success');
            registerForm.reset();
        } else {
            registerMessage.textContent = data.message;
            registerMessage.classList.add('error');
        }
    } catch (error) {
        registerMessage.textContent = 'An error occurred';
        registerMessage.classList.add('error');
    }
});
