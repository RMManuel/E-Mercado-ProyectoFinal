document.addEventListener('DOMContentLoaded', async () => {

    const prod = document.getElementById('info-producto');

    const selectedId = localStorage.getItem("productoSeleccionado");
    console.log(selectedId);

    const responseId = await getJSONData(PRODUCT_INFO_URL + selectedId + EXT_TYPE);
    let producto = responseId.data;
    console.log(producto);

    prod.innerHTML = `
    <div class="container">
        <div id="principal">
            
            <div class="info">
            <div id="Nombre">
                <hr class="raya">
                <h1>${producto.name}</h1>
                <hr class="raya">
            </div>
                <p class="Titulos"><span style="font-weight: bold;">Precio</span>:<br>${producto.currency}:${producto.cost}</p>
                <p class="Titulos"><span style="font-weight: bold;">Descripción:</span><br>${producto.description}</p>
                <p class="Titulos"><span style="font-weight: bold;">Categoría</span>:<br>${producto.category}</p>
                <p class="Titulos"><span style="font-weight: bold;">Cantidad de vendidos</span>:<br>${producto.soldCount}</p>
            </div>
            <div id="imagen-grande">
            </div>
            <div id="imagen"></div>
            </div>
        <div id="comentariosParrafo">
        </div>
    </div>
        `;
    //figueredo linea 12 al 27 por puteadas 
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
    
     //para funcion click foto figueredo
    img.addEventListener('click', () => {
        indiceImagenActual = index;
        mostrarImagenGrande();
    });
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
        let stars = "";
        
        for(var i = 1; i <= score; i++) {
            stars += `
            <i class="fa fa-star checked"></i>`
        }
        for(var j = 1; j <= (5-score); j++) {
            stars += `
            <i class="fa fa-star"></i>`
        }

        listItem.innerHTML = `
            <strong>${name} </strong> 
            <small class="text-muted">${date} </small>
            ${score}
            ${stars}
            <p>${description}</p>
            
        `;

        listaComentarios.appendChild(listItem);
    });

    let comentariosParrafo = document.getElementById('comentariosParrafo');
    listaComentarios.innerHTML+=`
    <div id="cajacomentarios">
    <h3>Comentar</h3>
    <label for="opinion">Tu opinión:</label><textarea name="opinion" id="txtareaOpinion" cols="30" rows="3"></textarea>
    <label for="selPuntaje">Tu puntuación</label><select name="selPuntaje" id="selectionPuntaje">
        <option value="1">1</option>
        <option value="2">2</option>
        <option value="3">3</option>
        <option value="4">4</option>
        <option value="5">5</option>
    </select>
    </div>`
    comentariosParrafo.appendChild(listaComentarios);

});
