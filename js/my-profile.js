let btnsave = document.getElementById("save");
let email = document.getElementById("email").value; 
let username = localStorage.getItem('username');
email = JSON.parse(localStorage.getItem(username)).mail;

document.addEventListener("DOMContentLoaded", () => {
    console.log(email);
    btnsave.addEventListener("click", () => {
        validar();
    });
});

function validar () {
let name = document.getElementById("name").value;
let lastname = document.getElementById("lastname").value;
let email = document.getElementById("email").value; 
    if ((name == "") || (lastname == "") || (email == "")) {
        Swal.fire({
            position: "top",
            icon: "error",
            title: "Oops...",
            text: "Debe completar los campos obligatorios"
        });
    }

}