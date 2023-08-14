document.addEventListener("DOMContentLoaded", function() {
    const registroForm = document.getElementById('registroForm');

    registroForm.addEventListener('submit', function(e) {
        e.preventDefault();
        console.log('asdwasdw');
        let nombre = document.getElementById('nombre').value;
        let contrasena = document.getElementById('contrasena').value;

        //Chequea que el usuario no este registrado aun
        if (localStorage.getItem(nombre) !== null) {
            alert('¡El usuario ' + nombre + ' ya está registrado!');
            window.location.href = "login.html"
            return; // Detener el proceso de registro
        }
        // Guardar los datos en el almacenamiento local
        let usuario = {
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




