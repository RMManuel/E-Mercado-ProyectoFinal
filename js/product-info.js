document.addEventListener('DOMContentLoaded', async () => {

    const prod = document.getElementById('info-producto');

    const selectedId = localStorage.getItem("productoSeleccionado");
    console.log(selectedId);


    const responseId = await getJSONData(PRODUCT_INFO_URL + selectedId + EXT_TYPE);
    let producto = responseId.data;
    console.log(producto);

    prod.innerHTML = `
    <div style="width:100%; display:flex; flex-direction:row" id="principal">  
        <div style="display:flex; flex-direction:column; width:40%">
            <h1>${producto.name}</h1> 
            <hr> 
            <p>Precio  <br> ${producto.currency}
            ${producto.cost} </p>
            <p>Descripción <br> ${producto.description} </p>
            <p>Categoría <br>  ${producto.category}</p>
            <p>Cantidad de vendidos <br> ${producto.soldCount}</p>
        </div>
        <div style="display:flex; flex-direction:row; overflow:auto; width:60%" id="imagen">
        </div>
    </div>
    `
    const infoProducto = document.getElementById("principal");
    const imagen = document.getElementById("imagen");
    prod.appendChild(infoProducto);

    producto.images.forEach(image => {
        let img = document.createElement('img');
        img.src = image;
        imagen.appendChild(img);   
    });


});

    // Habria que crear un for in o algo para recorrer el objeto y despues hacer el append





    // let name = producto.name;
    // let description = prodList.description;
    // let price = prodList.cost;
    // let currency = prodList.currency;
    // let soldCount = prodList.soldCount;
    // let image = prodList.image;

    // console.log(name)








