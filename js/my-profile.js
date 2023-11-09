
document.addEventListener("DOMContentLoaded", () => {
    cargarDatosUser();

    btnsave.addEventListener("click", () => {
        validar();
    });
    
});



let btnsave = document.getElementById("save");
let email = document.getElementById("email");
let username = localStorage.getItem('username');

email.value = JSON.parse(localStorage.getItem(username)).mail;



let nombre = document.getElementById("name")
let lastname = document.getElementById("lastname")
let secondName = document.getElementById("secondName")
let lastName2 = document.getElementById("lastname2")
let contacto = document.getElementById("contacto")
let imgPerfil = document.getElementById('imgPerfil')
let nuevaFoto = document.getElementById('inputGroupFile04')


function cargarDatosUser() {
    for (const prop in localStorage) {
        if (prop == email.value) {
            let user = JSON.parse(localStorage.getItem(prop));

            nombre.value = user.name;
            lastname.value = user.lastname;
            secondName.value = user.secondName;
            lastName2.value = user.lastName2;
            contacto.value = user.contacto;

            if (user.nuevaFoto) {
               
                imgPerfil.src = user.nuevaFoto;
            } else {
               
                imgPerfil.src = 'img/img_perfil.png';
            }
        }
    }
}


function validar() {
    if ((nombre.value === "") || (lastname.value === "") || (email.value === "")) {
        Swal.fire({
            position: "top",
            icon: "error",
            title: "Oops...",
            text: "Debe completar los campos obligatorios"
        });
    } else {
        Swal.fire({
            position: "top",
            icon: "success",
            title: "",
            text: "Se guardaron los cambios"
        })

        let datosUsuario = {
            name: nombre.value,
            lastname: lastname.value,
            email: email.value,
            secondName: secondName.value,
            lastName2: lastName2.value,
            contacto: contacto.value
        };

        
        const usuarioExistente = localStorage.getItem(email.value);
        if (usuarioExistente) {
            const usuarioParseado = JSON.parse(usuarioExistente);
            if (usuarioParseado.nuevaFoto) {
                datosUsuario.nuevaFoto = usuarioParseado.nuevaFoto;
            }
        }

        if (nuevaFoto.files.length > 0) {
            const fr = new FileReader();

            fr.readAsDataURL(nuevaFoto.files[0]);

            fr.addEventListener('load', () => {
                const url = fr.result;
                console.log(url);

                datosUsuario.nuevaFoto = url;

               
                localStorage.setItem(email.value, JSON.stringify(datosUsuario));

                cargarDatosUser();
            });
        } else {
            
            localStorage.setItem(email.value, JSON.stringify(datosUsuario));
            cargarDatosUser();
            
        }
        
    }
    
}
