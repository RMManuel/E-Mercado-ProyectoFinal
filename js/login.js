document.addEventListener("DOMContentLoaded", function() {
  const loginForm = document.getElementById('loginForm');

  loginForm.addEventListener('submit', function(e) {
      e.preventDefault();

      // Obtener los valores del formulario de inicio de sesión
      const username = document.getElementById('username').value;
      const password = document.getElementById('password').value;

      // Obtener los datos del usuario del almacenamiento local (registro)
      const userData = localStorage.getItem(username);

      if (userData) {
          const usuario = JSON.parse(userData);
          if (password === usuario.contrasena) {
              // Guardar el estado de inicio de sesión y el nombre de usuario en localStorage
              localStorage.setItem('isLoggedIn', 'true');
              localStorage.setItem('username', username);

              // Redireccionar a la página de inicio
              window.location.href = "index.html";
          } else {
              // Mostrar mensaje de error si la contraseña es incorrecta
              alert("Contraseña incorrecta. Intente de nuevo.");
          }
      } else {
          // Mostrar mensaje de error si el usuario no está registrado
          alert("Usuario no encontrado. Por favor, regístrate primero.");
      }
  });
});
  
  
  
   


