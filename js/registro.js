document.addEventListener("DOMContentLoaded", function() {
    const registroForm = document.getElementById('registroForm');

    registroForm.addEventListener('submit', function(e) {
        e.preventDefault();
        let contrasena = document.getElementById('contrasena').value;
        let mail = document.getElementById('mail').value;

        //Chequea que el usuario no este registrado aun
        if (localStorage.getItem(mail) !== null) {
            alert('¡El usuario ya está registrado!');
            window.location.href = "login.html"
            return; // Detener el proceso de registro
        }
        // Guardar los datos en el almacenamiento local
        let usuario = {
            contrasena: contrasena,
            email: mail,
            name: '',
            lastname: '',
            secondName: '',
            lastName2: '',
            contacto: '',
            nuevaFoto: ''
        };
        localStorage.setItem(mail, JSON.stringify(usuario));

        alert('¡Registro exitoso!');
        document.getElementById('registroForm').reset();

        console.log('Redireccionando a login.html');
        window.location.href = "login.html";
    });
});




