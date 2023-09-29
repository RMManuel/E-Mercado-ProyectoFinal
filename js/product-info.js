document.addEventListener('DOMContentLoaded', async () => {

    const prod = document.getElementById('principal');
    const selectedId = localStorage.getItem("productoSeleccionado");
    const responseId = await getJSONData(PRODUCT_INFO_URL + selectedId + EXT_TYPE);
    let producto = responseId.data;
    let relatedProducts= producto.relatedProducts;

    prod.innerHTML += `
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
        </div>
        <div id="imagen-grande">
        </div>`;

    //IMAGENES
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

    //Y Obtener los comentarios 
    const obtenerComentarios = await getJSONData(PRODUCT_INFO_COMMENTS_URL + selectedId + EXT_TYPE);
    let comentarios = obtenerComentarios.data;

    // Con esta linea lo que hago es verificar si hay comentarios en el localStorage, con selectedId lo que hago es que no se guarde el comentario en todos los productos, sino asignarle una clave del id del producto
    const comentariosGuardados = JSON.parse(localStorage.getItem(`comentarios_${selectedId}`));

    //Si hay comentarios, la variable comentarios pasa a ser como comentariosGuardados asi muestra los del localstorage tambien
    if (comentariosGuardados) {
        comentarios = comentariosGuardados;
    }

    listarComentarios(comentarios);
    listarRelatedProducts(relatedProducts);

    let btn = document.getElementById("btnEnviar");

    btn.addEventListener("click", () => {
        let opinion = document.getElementById("txtareaOpinion").value;
        let puntuación = document.getElementById("selectionPuntaje").value;
        let fecha = new Date().toLocaleDateString('en-US');
        let comentarioNuevo = {
            product: localStorage.getItem('productoSeleccionado'),
            score: puntuación,
            description: opinion,
            user: localStorage.getItem('username'),
            dateTime: fecha
        };

        comentarios.push(comentarioNuevo);

        // Agrego esta linea para guardar los comentarios en el local! con la variable selectedId le damos la clave que sea solo del producto seleccionado y no aparezca el mismo comentario en todos los productos
        localStorage.setItem(`comentarios_${selectedId}`, JSON.stringify(comentarios));

        document.getElementById("txtareaOpinion").value = "";
        document.getElementById("selectionPuntaje").value = "1";
        listarComentarios(comentarios);

    })

})

function listarComentarios(comentarios) {
    let comentariosParrafo=document.getElementById('comentariosParrafo')
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

function listarRelatedProducts(array){
    let principal=document.getElementById('info-producto');
    let titulo=document.createElement('div');
    let contenedorRP=document.createElement('div');
    titulo.innerHTML=`
        <hr>
        <h3>Productos Relacionados</h3>
        <br>`
    contenedorRP.classList.add('cont-prodRelacionados');
    array.forEach(i => {
        let contProducto=document.createElement('div');
        contProducto.classList.add('card','bd-placeholder-img', 'cursor-active','card-img-top');
        let id=i.id;
        let name=i.name;
        let img=i.image;
        contProducto.innerHTML+=`
        
            <h5 class="p-1">${name}</h5>
            <img onclick="guardarProductos(${id})" src="${img}"></img>
        `
        contenedorRP.appendChild(contProducto);
    });
    principal.appendChild(titulo);
    principal.appendChild(contenedorRP);
}

