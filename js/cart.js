document.addEventListener('DOMContentLoaded', () => {
    cargarProductosCart();
});


async function cargarProductosCart() {
    let art = await obtenerProductosCart();
    mostrarProductosCart(art);
}

async function obtenerProductosCart() {
    let respCarrito = await getJSONData(CART_INFO_URL + "25801" + EXT_TYPE);
    let infoCart = respCarrito.data;
    let articulos = infoCart.articles;

    const articulosLocalCart = JSON.parse(localStorage.getItem('productosEnCarrito'));

    if (articulosLocalCart) {
        articulos.push(...articulosLocalCart)
    }
    console.log(articulos)

    return articulos;
}

function mostrarProductosCart(articulos) {

    let contenidoCarrito = document.getElementById('contenidoCarrito')
    const tabla = document.createElement("table");
    tabla.classList.add("table", "table-striped", "table-bordered");

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


        let subtotal = costo * cantidad;

        fila.innerHTML = `
            <td><img src="${img}" alt="${nombre}" width="100"></td>
            <td>${nombre}</td>
            <td>${moneda} <span class="costo"> ${costo} </span </td>
            <td><input type="number" min=1 onchange="actualizarSub()" class="cantidad" value="${cantidad}"></td>
            <td> ${moneda} <span class='subtotal'> ${subtotal} </span> </td>
        `;

        cuerpoTabla.appendChild(fila);
    });

    tabla.appendChild(encabezado);
    tabla.appendChild(cuerpoTabla);

    contenidoCarrito.appendChild(tabla);
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

}
