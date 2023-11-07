let btnsave = document.getElementById("save");
let email = document.getElementById("email");
let username = localStorage.getItem('username');

email.value = JSON.parse(localStorage.getItem(username)).mail;


document.addEventListener("DOMContentLoaded", () => {

    btnsave.addEventListener("click", () => {
        // cargarDatosUser()
        validar();
    });

   

});


// function cargarDatosUser() {
   
// //hay que agregar un condicional pa que si el email esta registrado, me llene los imputs con lo que sea, y sino que no llene nada
// }


function validar() {
    let name = document.getElementById("name").value;
    let lastname = document.getElementById("lastname").value;
    let email = document.getElementById("email").value;
    let secondName = document.getElementById("secondName").value;
    let lastName2 = document.getElementById("lastname2").value;

    

    if ((name == "") || (lastname == "") || (email == "")) {
        Swal.fire({
            position: "top",
            icon: "error",
            title: "Oops...",
            text: "Debe completar los campos obligatorios"
        });
    }
    else {
        Swal.fire({
            position: "top",
            icon: "success",
            title: "",
            text: "Se guardaron los cambios"
        });

        let datosUsuario = {
            name: name,
            lastname: lastname,
            email: email,
            secondName: secondName,
            lastName2: lastName2

        }
        // NO SE QUE CLAVE PONER ACA PARA VALIDAR
        localStorage.setItem("no se que poner acaa", JSON.stringify(datosUsuario))
       
    }


}