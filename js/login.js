
document.addEventListener("DOMContentLoaded", function() {
    const loginForm = document.getElementById('loginForm');

    loginForm.addEventListener('submit', async function(e) {
        e.preventDefault();

        const usermail = document.getElementById('usermail').value;
        const password = document.getElementById('password').value;

        try {
            const response = await fetch("http://localhost:3000/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ username: usermail, password: password })
            });

            if (response.status === 200) {
                const data = await response.json();
                const token = data.token;

                
                localStorage.setItem('token', token);
                localStorage.setItem('usermail', usermail);
                localStorage.setItem('isLoggedIn', 'true');

                
                window.location.href = "index.html";
            } else {
                alert("Usuario y/o contraseña incorrectos. Intente de nuevo.");
            }
        } catch (error) {
            console.error('Error en la solicitud fetch:', error);
            alert('Error en la solicitud. Por favor, inténtalo de nuevo.');
        }
    });
});
