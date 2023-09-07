document.addEventListener('DOMContentLoaded', async () => {

    const prod = document.getElementById('info-producto');

    const selectedId = localStorage.getItem("productoSeleccionado");
    console.log(selectedId);

    const responseId = await getJSONData(PRODUCT_INFO_URL + selectedId + EXT_TYPE);
    let producto = responseId.data;
    console.log(producto);

    prod.innerHTML = `
    <div class="container">
        <div class="column" id="principal">
            <div class="col-md-6">
                <h1>${producto.name}</h1>
                <hr>
                <p><strong>Precio</strong><br> ${producto.currency} ${producto.cost}</p>
                <p><strong>Descripción</strong><br> ${producto.description}</p>
                <p><strong>Categoría</strong><br> ${producto.category}</p>
                <p><strong>Cantidad de vendidos</strong><br> ${producto.soldCount}</p>
            </div>

            <div id="imagen">
            </div>

            <div class="mt-5">
                <h3 >Comentarios</h3>
                    <ul id="comentariosParrafo" class="list-group"></ul>
            </div>
        </div>
    </div>
    `;

    const infoProducto = document.getElementById("principal");
    const imagen = document.getElementById("imagen");
    prod.appendChild(infoProducto);

    producto.images.forEach(image => {
        let img = document.createElement('img');
        img.src = image;
        img.classList.add('img-fluid', 'col-2', 'm-2');
        imagen.appendChild(img);
    });
    

    //Esto es lo que agregu'e para traer los comentarios
    const obtenerComentarios = await getJSONData(PRODUCT_INFO_COMMENTS_URL + selectedId + EXT_TYPE);
    let comentarios = obtenerComentarios.data;
    console.log(comentarios);

    let listaComentarios = document.createElement('ul');

    listaComentarios.classList.add('list-group');

    comentarios.forEach(comentario => {
        let listItem = document.createElement('li');
        listItem.classList.add('list-group-item');
        let name = comentario.user;
        let date = comentario.dateTime;
        let score = comentario.score;
        let description = comentario.description;

        listItem.innerHTML = `
            <strong>${name} </strong> 
            ${date}
            ${score}
            <p>${description}</p>
        `;

        listaComentarios.appendChild(listItem);
    });

    let comentariosParrafo = document.getElementById('comentariosParrafo');
    comentariosParrafo.appendChild(listaComentarios);

});
