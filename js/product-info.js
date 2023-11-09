
document.addEventListener('DOMContentLoaded', async () => {

    let producto = await obtenerProductoSeleccionado();
    let coment = await obtenerComentariosSeleccionado();
    let relatedProducts = producto.relatedProducts;

    mostrarProductoSeleccionado(producto)
    mostrarImgProducto(producto)
    listarRelatedProducts(relatedProducts);
    listarComentarios(coment);
})

const selectedId = localStorage.getItem("productoSeleccionado");

async function obtenerProductoSeleccionado() {
    const responseId = await getJSONData(PRODUCT_INFO_URL + selectedId + EXT_TYPE);
    let producto = responseId.data;

    return producto
}

function mostrarProductoSeleccionado(producto) {

    const idProductosPrincipal = document.getElementById('principal');

    idProductosPrincipal.innerHTML += `
    
    <div class="info">
        <div id="Nombre">
            <hr>
            <h1>${producto.name}</h1>
            <hr>
        </div>
        <p><span class="bold">Precio</span>:<br>${producto.currency}:${producto.cost}</p>
        <p><span class="bold">Descripción:</span><br>${producto.description}</p>
        <p><span class="bold">Categoría</span>:<br>${producto.category}</p>
        <p><span class="bold">Cantidad de vendidos</span>:<br>${producto.soldCount}</p>
        <button id="agregarAlCarrito" onclick='agregarAlCarrito(${JSON.stringify(producto)})'>Agregar al carrito</button>
        </div>
    
        <div id="imagen-grande"></div>
    `;


}

function mostrarImgProducto(producto) {
    const imagenGrande = document.getElementById("imagen-grande");
    const imagenes = producto.images;

    imagenGrande.innerHTML = `
    <div id="carouselExampleControls" class="carousel slide" data-bs-ride="carousel">
        <div class="carousel-inner">
            <div class="carousel-item active">
                <img src="${imagenes[0]}">
            </div>
            <div class="carousel-item">
                <img src="${imagenes[1]}">
            </div>
            <div class="carousel-item">
                <img src="${imagenes[2]}">
            </div>
            <div class="carousel-item">
                <img src="${imagenes[3]}">
            </div>
        </div>
        <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="prev">
            <span class="carousel-control-prev-icon" aria-hidden="true"></span>
            <span class="visually-hidden">Previous</span>
        </button>
        <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="next">
            <span class="carousel-control-next-icon" aria-hidden="true"></span>
            <span class="visually-hidden">Next</span>
        </button>
    </div>`;

}

//Y Obtener los comentarios 
async function obtenerComentariosSeleccionado() {

    let obtenerComentarios = await getJSONData(PRODUCT_INFO_COMMENTS_URL + selectedId + EXT_TYPE);
    let comentarios = obtenerComentarios.data;

    const comentariosGuardados = JSON.parse(localStorage.getItem(`comentarios_${selectedId}`));

    if (comentariosGuardados) {
        comentarios = comentariosGuardados;
    }

    let btn = document.getElementById("btnEnviar");
    btn.addEventListener("click", () => {

        let opinion = document.getElementById("txtareaOpinion").value;
        let puntuación = document.getElementById("selectionPuntaje").value;
        let fecha = new Date().toLocaleDateString('en-US');
        let usermail = localStorage.getItem('usermail');
        let user = '';

        if (JSON.parse(localStorage.getItem(usermail)).name != '') {
            user = JSON.parse(localStorage.getItem(usermail)).name;
        } else {
            user = usermail;
        }

        let comentarioNuevo = {
            product: localStorage.getItem('productoSeleccionado'),
            score: puntuación,
            description: opinion,
            user: user,
            dateTime: fecha
        };

        comentarios.push(comentarioNuevo);

        localStorage.setItem(`comentarios_${selectedId}`, JSON.stringify(comentarios));

        document.getElementById("txtareaOpinion").value = "";
        document.getElementById("selectionPuntaje").value = "1";
        listarComentarios(comentarios);

    })

    return comentarios;
}


function agregarAlCarrito(producto) {
    let productosEnCarrito = JSON.parse(localStorage.getItem('productosEnCarrito')) || [];

    let itemCarrito = {
        'id': producto.id,
        'name': producto.name,
        'count': 1,
        'unitCost': producto.cost,
        'currency': 'USD',
        'image': producto.images[0]
    }

    let existe = productosEnCarrito.find(item => item.id === producto.id)

    if(existe){
        console.log("estas en if")
        existe.count += itemCarrito.count;
    }

    else  {
        productosEnCarrito.push(itemCarrito);
    }

    localStorage.setItem('productosEnCarrito', JSON.stringify(productosEnCarrito));
    window.location='cart.html';

    
}




function listarComentarios(comentarios) {
    let comentariosParrafo = document.getElementById('comentariosParrafo')
    let listaComentarios = document.createElement('ul');

    listaComentarios.classList.add('list-group');

    comentarios.forEach(comentario => {
        comentariosParrafo.innerHTML = `
            <hr>
            <h3>Comentarios</h3>
            <br>`;

        let listItem = document.createElement('li');
        listItem.classList.add('list-group-item');

        let name = comentario.user;
        let date = new Date(comentario.dateTime).toLocaleDateString();
        let score = comentario.score;
        let description = comentario.description;
        let stars = "";

        for (var i = 1; i <= score; i++) {
            stars += `<i class="fa fa-star checked"></i>`;
        }
        for (var j = 1; j <= (5 - score); j++) {
            stars += `<i class="fa fa-star"></i>`;
        }

        listItem.innerHTML = `
            <strong>${name} </strong> 
            <small class="text-muted">${date} </small>
            ${score} ${stars}
            <p>${description}</p>`;

        listaComentarios.appendChild(listItem);
        comentariosParrafo.appendChild(listaComentarios);
    })
}

function listarRelatedProducts(array) {
    let principal = document.getElementById('info-producto');
    let titulo = document.createElement('div');
    let contenedorRP = document.createElement('div');
    titulo.innerHTML = `
        <hr>
        <h3>Productos Relacionados</h3>
        <br>`
    contenedorRP.classList.add('cont-prodRelacionados');
    array.forEach(i => {
        let contProducto = document.createElement('div');
        contProducto.classList.add('card', 'bd-placeholder-img', 'cursor-active', 'card-img-top');
        let id = i.id;
        let name = i.name;
        let img = i.image;
        contProducto.innerHTML += `
        
            <h5 class="p-1">${name}</h5>
            <img onclick="guardarProductos(${id})" src="${img}"></img>
        `
        contenedorRP.appendChild(contProducto);
    });
    principal.appendChild(titulo);
    principal.appendChild(contenedorRP);
}



