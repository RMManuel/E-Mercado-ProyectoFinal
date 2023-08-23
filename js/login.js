document.addEventListener("DOMContentLoaded", function() {
  const loginForm = document.getElementById('loginForm');

  loginForm.addEventListener('submit', function(e) {
      e.preventDefault();

      const username = document.getElementById('username').value;
      const password = document.getElementById('password').value;

      const userData = localStorage.getItem(username);

      if (userData) {
          const usuario = JSON.parse(userData);
          if (password === usuario.contrasena) {
              localStorage.setItem('isLoggedIn', 'true');
              localStorage.setItem('username', username);

              // Redireccionar a la página de inicio
              window.location.href = "index.html";
          } else {
              alert("Contraseña incorrecta. Intente de nuevo.");
          }
      } else {
          alert("Usuario no encontrado. Por favor, regístrate primero.");
      }
  });
});
  
  
  
   


