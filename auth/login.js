// login.js
document.getElementById('login-form').addEventListener('submit', function(event) {
    event.preventDefault();
    
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    // Simulação de login
    fetch('data/data.json')
        .then(response => response.json())
        .then(data => {
            const user = data.users.find(u => u.username === username && u.password === password);
            if (user) {
                alert('Login successful!');
                window.location.href = 'profile.html'; // Redireciona para o perfil
            } else {
                alert('Invalid credentials!');
            }
        });
});
