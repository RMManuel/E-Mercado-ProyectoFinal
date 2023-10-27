document.addEventListener('DOMContentLoaded', function () {
    actualizarCampos();
});

const radioTarjeta = document.getElementById('radioTarjeta');
const radioTransferencia = document.getElementById('radioTransferencia');
const resultadoPago = document.getElementById('resultadoPago');
resultadoPago.textContent = 'Seleccione una forma de pago:';

function actualizarCampos() {
    const camposTarjeta = document.querySelectorAll('#dato1, #dato2, #fecha, #dato4');
    const camposTransferencia = document.querySelectorAll('#nombres, #bnkacc');
    let isTarjetaChecked = radioTarjeta.checked;

    camposTarjeta.forEach(campo => campo.disabled = !isTarjetaChecked);
    camposTransferencia.forEach(campo => campo.disabled = isTarjetaChecked);

    if (isTarjetaChecked) {
        resultadoPago.textContent = 'Has seleccionado Tarjeta de débito/crédito';
    } else if (radioTransferencia.checked) {
        resultadoPago.textContent = 'Has seleccionado Transferencia bancaria';
    }
}

actualizarCampos();

if (radioTarjeta && radioTransferencia) {
    radioTarjeta.addEventListener('change', actualizarCampos);
    radioTransferencia.addEventListener('change', actualizarCampos);
} else {
    console.error('Elementos no encontrados con los IDs proporcionados.');
}

const formularioPago = document.getElementById('formularioPago');

if (formularioPago) {
    formularioPago.addEventListener('submit', function (event) {
        const isTarjetaChecked = radioTarjeta.checked;
        const isTransferenciaChecked = radioTransferencia.checked;

        if (!isTarjetaChecked && !isTransferenciaChecked) {
            event.preventDefault();
            Swal.fire({
                icon: 'error',
                title: 'Opción no seleccionada',
                text: 'Por favor, selecciona una opción de pago.',
            });
            return;
        }

        const campoCodigo = document.getElementById('dato4');

        if (isTarjetaChecked) {
            const camposTarjeta = document.querySelectorAll('#dato1, #dato2, #fecha, #dato4');
            const camposVacios = Array.from(camposTarjeta).some(campo => campo.value.trim() === '');

            if (camposVacios) {
                event.preventDefault();
                Swal.fire({
                    icon: 'error',
                    title: 'Campos incompletos',
                    text: 'Por favor, completa todos los campos de tarjeta.',
                });
                return;
            }
        }

        event.preventDefault();
        const exitoPago = Math.random() < 1;

        if (exitoPago) {


            const modal = document.getElementById('exampleModal');
            const exampleModal = document.getElementById('exampleModal')


         

            modal.classList.remove('show');
            modal.setAttribute('aria-hidden', 'true');


            if (isTarjetaChecked) {
                resultadoPago.textContent = 'Has pagado con Tarjeta de débito/crédito';
            }
            else {
                resultadoPago.textContent = 'Has pagado con Transferencia bancaria';
            }

        }
    });
} else {
    console.error('Elemento de formulario no encontrado con el ID proporcionado.');
}
