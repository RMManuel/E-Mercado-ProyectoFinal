document.addEventListener('DOMContentLoaded', () => {
    cargarProductosCart();
});

async function cargarProductosCart() {
    let articulos = await obtenerProductosCart();

    // Llamar a una función para mostrar los productos
    mostrarProductosCart(articulos);
}

async function obtenerProductosCart() {
    let respCarrito = await getJSONData(CART_INFO_URL + "25801" + EXT_TYPE);
    let infoCart = respCarrito.data;
    let articulos = infoCart.articles;
    return articulos;
}

function mostrarProductosCart(articulos) {
    // tablacontainer
    let contenidoCarrito = document.getElementById('contenidoCarrito')

    const tabla = document.createElement("table");
    tabla.classList.add("table", "table-striped", "table-bordered");

    // Crear el encabezado de la tabla con clases de Bootstrap
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
            <td>${moneda} <span id="costo"> ${costo} </span </td>
            <td><input type="number" min=1 onchange="actualizarSub()" id="cantidad" value="${cantidad}"></td>
            <td> ${moneda} <span id='subtotal'> ${subtotal} </span> </td>
        `;

        cuerpoTabla.appendChild(fila);
    });

    tabla.appendChild(encabezado);
    tabla.appendChild(cuerpoTabla);

    contenidoCarrito.appendChild(tabla);
}

function actualizarSub() {
    let inputCantidad = document.getElementById("cantidad");
    let getCosto = document.getElementById('costo')
    let currentcosto = parseInt(getCosto.textContent);

    let cantidadActual = parseInt(inputCantidad.value);
    let nuevoSubtotal = cantidadActual * currentcosto;
    
    
    let mostrarnuevosubtotal = document.getElementById('subtotal')
    mostrarnuevosubtotal.innerHTML = `${nuevoSubtotal}`
    
}
