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

        fila.innerHTML = `
            <td><img src="${img}" alt="${nombre}" width="100"></td>
            <td>${nombre}</td>
            <td>${moneda} ${costo}</td>
            <td><input type="number" value="${cantidad}"></td>
            <td>${moneda} ${costo * cantidad} </td>
        `;

        cuerpoTabla.appendChild(fila);
    });

    tabla.appendChild(encabezado);
    tabla.appendChild(cuerpoTabla);

    contenidoCarrito.appendChild(tabla);
}
