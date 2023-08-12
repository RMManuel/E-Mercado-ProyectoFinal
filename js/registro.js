document.addEventListener("DOMContentLoaded", function() {
    const registroForm = document.getElementById('registroForm');

    registroForm.addEventListener('submit', function(e) {
        e.preventDefault();
        console.log('asdwasdw');
        var nombre = document.getElementById('nombre').value;
        var contrasena = document.getElementById('contrasena').value;

        // Guardar los datos en el almacenamiento local
        var usuario = {
            nombre: nombre,
            contrasena: contrasena
        };
        localStorage.setItem(nombre, JSON.stringify(usuario));

        alert('¡Registro exitoso para ' + nombre + '!');
        document.getElementById('registroForm').reset();

        console.log('Redireccionando a login.html');
        window.location.href = "login.html";
    });
});




