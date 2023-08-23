document.addEventListener("DOMContentLoaded", function() {
  const isLoggedIn = localStorage.getItem('isLoggedIn');
  const username = localStorage.getItem('username');
  const usernameElement = document.getElementById('username');
  const logoutButton = document.getElementById('logoutButton');

  if (isLoggedIn === 'true' && username) {
    // El usuario está logeado, mostramos su nombre de usuario en la barra de navegación
    usernameElement.textContent = username;
    logoutButton.style.display = 'block'; // Mostrar el botón de cerrar sesión
  } else {
    // El usuario no está logeado, redireccionar a la página de login y ocultar el botón de cerrar sesión.
    alert('¡Debes iniciar sesión para acceder a esta página!');
    window.location.href = "login.html";
    logoutButton.style.display = 'none'; // Ocultar el botón de cerrar sesión
  }

  // Agregar un evento al botón de cerrar sesión para eliminar la información de inicio de sesión y redireccionar a la página de login.
  logoutButton.addEventListener('click', function() {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('username');
    window.location.href = "login.html";
  });
}); 
document.addEventListener("DOMContentLoaded", function(){
    document.getElementById("autos").addEventListener("click", function() {
        localStorage.setItem("catID", 101);
        window.location = "products.html"
    });
    document.getElementById("juguetes").addEventListener("click", function() {
        localStorage.setItem("catID", 102);
        window.location = "products.html"
    });
    document.getElementById("muebles").addEventListener("click", function() {
        localStorage.setItem("catID", 103);
        window.location = "products.html"
    });
});


  
  
  
    

  
  
  
  
  
  