document.addEventListener('DOMContentLoaded', () => {
    cargarProductosCart();
    let radiobtns = document.querySelectorAll('input[name=tipoEnvio]');
    for (const btn of radiobtns) {
        btn.addEventListener("click", () => {
            costoEnvio();
        })
    }
});

let carrito = [];

async function cargarProductosCart() {
    carrito = await obtenerProductosCart();
    mostrarProductosCart(carrito);
}

async function obtenerProductosCart() {
    let respCarrito = await getJSONData(CART_INFO_URL + "25801" + EXT_TYPE);
    let infoCart = respCarrito.data;
    let productosAPI = infoCart.articles;

    const articulosLocalCart = JSON.parse(localStorage.getItem('productosEnCarrito'));

    if (articulosLocalCart) {

        productosAPI = productosAPI.filter(apiProduct => !articulosLocalCart.some(localProduct => localProduct.id === apiProduct.id));
    }

    carrito = [...productosAPI, ...articulosLocalCart];
    console.log(carrito);

    return carrito;
}

function mostrarProductosCart(articulos) {

    let contenidoCarrito = document.getElementById('contenidoCarrito')

    const tabla = document.createElement("table");
    tabla.classList.add("table", "table-striped", "table-bordered");
    contenidoCarrito.innerHTML = " ";

    const encabezado = document.createElement("thead");
    encabezado.innerHTML = `
        <tr>
            <th></th>
            <th>Nombre</th>
            <th>Costo</th>
            <th>Cantidad</th>
            <th>Subtotal</th>
        </tr>
    `;
    const cuerpoTabla = document.createElement("tbody");

    articulos.forEach(art => {
        let fila = document.createElement("tr")
        let nombre = art.name;
        let cantidad = art.count;
        let costo = art.unitCost;
        let moneda = art.currency;
        let img = art.image;
        let id = art.id


        let subtotal = costo * cantidad;

        fila.innerHTML = `
            <td><img src="${img}" alt="${nombre}" width="100"></td>
            <td>${nombre}</td>
            <td>${moneda} <span class="costo"> ${costo} </span </td>
            <td><input type="number" min=1 onchange="actualizarSub()" class="cantidad w-25 text-center" value="${cantidad}"></td>
            <td> ${moneda} <span class='subtotal'> ${subtotal} </span> </td>
            <td> <button id="item" onclick="eliminarDelCarrito(${id})"> <i class="bi bi-trash3"></i> </button></td>

        `;

        cuerpoTabla.appendChild(fila);
    });

    tabla.appendChild(encabezado);
    tabla.appendChild(cuerpoTabla);

    contenidoCarrito.appendChild(tabla);
    subtotalGeneral();
}

function actualizarSub() {
    let inputCantidad = document.getElementsByClassName("cantidad");
    let getCosto = document.getElementsByClassName('costo')
    let mostrarnuevosubtotal = document.getElementsByClassName("subtotal");

    for (let i = 0; i < getCosto.length; i++) {
        let currentcosto = parseFloat(getCosto[i].textContent);
        let cantidadActual = parseInt(inputCantidad[i].value);
        let nuevoSubtotal = cantidadActual * currentcosto;

        mostrarnuevosubtotal[i].textContent = `${nuevoSubtotal}`
    }
    subtotalGeneral();
    costoEnvio();
}

function subtotalGeneral() {
    let subtotales = document.getElementsByClassName('subtotal');
    let subtotalGeneralCont = document.getElementById('subtotalGeneral');
    let subtotalGeneral = 0;
    for (let value of subtotales) {
        subtotalGeneral += parseInt(value.innerHTML);
    }
    subtotalGeneralCont.innerHTML = `USD ${subtotalGeneral}`;
    costoTotal();
}

function costoEnvio() {
    let botonesRadio = document.querySelectorAll('input[name=tipoEnvio]'); 
    let subtotalGeneralCont = parseInt((document.getElementById('subtotalGeneral').innerHTML).replace("USD ",""));
    let subtotalEnvioCont = document.getElementById('subtotalEnvio');
    let costoEnvio = 0;
    if (botonesRadio[0].checked) {
        costoEnvio = (subtotalGeneralCont*15)/100;
    } else if (botonesRadio[1].checked) {
        costoEnvio = (subtotalGeneralCont*7)/100;
    } else if (botonesRadio[2].checked) {
        costoEnvio = (subtotalGeneralCont*5)/100;
    } 
    subtotalEnvioCont.innerHTML = `USD ${costoEnvio}`;
    costoTotal();
}

function costoTotal() {
    let subtotalGeneral = parseInt((document.getElementById('subtotalGeneral').innerHTML).replace("USD ",""));
    let subtotalEnvio = parseInt((document.getElementById('subtotalEnvio').innerHTML).replace("USD ",""));
    let costTotalCont = document.getElementById('costoTotal');
    let costoTotal = subtotalGeneral + subtotalEnvio;
    costTotalCont.innerHTML = `USD ${costoTotal}`;
}


function eliminarDelCarrito(id) {

    carrito = carrito.filter((element) => element.id !== id)

    localStorage.setItem('productosEnCarrito', JSON.stringify(carrito));
    mostrarProductosCart(carrito)
}