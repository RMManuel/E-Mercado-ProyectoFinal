
document.addEventListener("DOMContentLoaded", () => {
    cargarDatosUser();

    //Permite que solo se puedan escribir números en el teléfono
    contacto.addEventListener("input", () => {
        contacto.value = contacto.value.replace(/[^0-9]/g, '');
    });

    btnsave.addEventListener("click", () => {
        validar();
    });

    
});

let btnsave = document.getElementById("save");
let email = document.getElementById("email");
//Trae el email automaticamente
email.value = localStorage.getItem('usermail'); 

let nombre = document.getElementById("name");
let lastname = document.getElementById("lastname");
let secondName = document.getElementById("secondName");
let lastName2 = document.getElementById("lastname2");
let contacto = document.getElementById("contacto");
let imgPerfil = document.getElementById('imgPerfil');
let nuevaFoto = document.getElementById('inputGroupFile04');

//Trae los datos del perfil automaticamente
function cargarDatosUser() {
    for (const prop in localStorage) {
        if (prop == email.value) {
            let user = JSON.parse(localStorage.getItem(prop));

            nombre.value = user.name;
            lastname.value = user.lastname;
            secondName.value = user.secondName;
            lastName2.value = user.lastName2;
            contacto.value = user.contacto;

            if (user.nuevaFoto != '') {
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

        //Traemos el perfil desde el localStorage y lo modificamos 
        let datosUsuario = JSON.parse(localStorage.getItem(email.value));
        datosUsuario.name = nombre.value;
        datosUsuario.lastname = lastname.value;
        datosUsuario.secondName = secondName.value;
        datosUsuario.lastName2 = lastName2.value;
        datosUsuario.contacto = contacto.value;

        //Lee si se agregó una foto nueva y la guarda en localStorage
        if (nuevaFoto.files.length > 0) {
            const fr = new FileReader();

            fr.readAsDataURL(nuevaFoto.files[0]);

            fr.addEventListener('load', () => {

                const url = fr.result;
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
