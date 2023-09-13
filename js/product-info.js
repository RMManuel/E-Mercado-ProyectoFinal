document.addEventListener('DOMContentLoaded', async () => {

    const prod = document.getElementById('principal');
    const selectedId = localStorage.getItem("productoSeleccionado");
    const responseId = await getJSONData(PRODUCT_INFO_URL + selectedId + EXT_TYPE);
    let producto = responseId.data;

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
        </div>
        <div id="imagen">
        </div>`;

    //IMAGENES
    const imagenGrande = document.getElementById("imagen-grande");
    const imagenContainer = document.getElementById("imagen");
    const imagenes = producto.images;
    let indiceImagenActual = 0;

    function mostrarImagenGrande() {
        imagenGrande.innerHTML = `<div id="fotogrande"><img src="${imagenes[indiceImagenActual]}" alt="Imagen grande"></div>`;
    }

    mostrarImagenGrande();

    imagenes.forEach((image, index) => {
        let img = document.createElement('img');
        img.src = image;
        img.id = `imagen-${index}`;
        imagenContainer.appendChild(img);

        //Función click foto
        img.addEventListener('click', () => {
            indiceImagenActual = index;
            mostrarImagenGrande();
        });
    });

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

