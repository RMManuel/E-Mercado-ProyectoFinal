document.addEventListener("DOMContentLoaded", function () {
    const registroForm = document.getElementById('registroForm');

    registroForm.addEventListener('submit', async function (e) {
        e.preventDefault();
        let contrasena = document.getElementById('contrasena').value;
        let mail = document.getElementById('mail').value;

        
        if (localStorage.getItem(mail) !== null) {
            alert('¡El usuario ya está registrado!');
            window.location.href = "login.html";
            return; 
        }

        try {
            const response = await fetch("http://localhost:3000/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ username: mail, password: contrasena })
            });

            if (response.status === 201) {
                
                document.getElementById('registroForm').reset();

                
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
                
                
                window.location.href = "login.html";

                
                alert('¡Registro exitoso!');
            } else {
                alert('Error en el registro. Por favor, inténtalo de nuevo.');
            }
        } catch (error) {
            console.error('Error en la solicitud fetch:', error);
            alert('Error en la solicitud. Por favor, inténtalo de nuevo.');
        }
    });
});
