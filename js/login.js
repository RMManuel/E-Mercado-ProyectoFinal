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
const username = localStorage.getItem('username');

function NbreBton(nombre) {
  const dropdownButton = document.getElementById('dropdownMenuLink');
  dropdownButton.textContent = nombre;
}
if (username) {
    NbreBton(username);
  }
// controlen que no explote nada 
  document.addEventListener("DOMContentLoaded", function () {
    const toggleButton = document.getElementById("toggle-mode");
    const body = document.body;
    const elementsToChangeBackground = document.querySelectorAll(".my-bg-light"); 

    toggleButton.addEventListener("click", function () {
        if (body.classList.contains("day-mode")) {
            body.classList.remove("day-mode");
            body.classList.add("night-mode");
            elementsToChangeBackground.forEach(element => {
                element.classList.remove("bg-light");
            });
        } else {
            body.classList.remove("night-mode");
            body.classList.add("day-mode");
            elementsToChangeBackground.forEach(element => {
                element.classList.add("bg-light");
            });
        }
    });
});




  
  
  
   


