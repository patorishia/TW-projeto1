// register.js
document.getElementById('register-form').addEventListener('submit', function(event) {
    event.preventDefault();
    
    const username = document.getElementById('username').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    // Simulação de registo
    fetch('data/data.json')
        .then(response => response.json())
        .then(data => {
            const newUser = {
                id: data.users.length + 1,
                username: username,
                email: email,
                password: password // Deve ser salvo de forma segura!
            };
            data.users.push(newUser);
            alert('Registration successful!');
            window.location.href = 'login.html'; // Redireciona para login
        });
});
