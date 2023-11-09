document.addEventListener("DOMContentLoaded", function() {
    const loginForm = document.getElementById('loginForm');

    loginForm.addEventListener('submit', function(e) {
        e.preventDefault();

        const usermail = document.getElementById('usermail').value;
        const password = document.getElementById('password').value;

        const userData = localStorage.getItem(usermail);

        if (userData) {
            const usuario = JSON.parse(userData);
            if (password === usuario.contrasena) {
                localStorage.setItem('isLoggedIn', 'true');
                localStorage.setItem('usermail', usermail);

                // Redireccionar a la página de inicio
                window.location.href = "index.html";
            } else {
                alert("Contraseña incorrecta. Intente de nuevo.");
            }
        } else {
            alert("Usuario no encontrado. Por favor, regístrese primero.");
        }
    });
});