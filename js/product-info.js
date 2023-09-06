document.addEventListener('DOMContentLoaded', async () => {


    const selectedId = localStorage.getItem("productoSeleccionado");
    console.log(selectedId);


    const responseId = await getJSONData(PRODUCT_INFO_URL + selectedId + EXT_TYPE);
    let producto = responseId.data;
    console.log(producto);

    producto.images.forEach(image => {
        let imgs = document.createElement('div');

        
    });

    const prod = document.getElementById('info-producto');
    prod.innerHTML = `
    <div>
        <h1>${producto.name}</h1> 
        <hr>   
        <p>Precio  <br> ${producto.currency}
        ${producto.cost} </p>
        
        <p>Descripción <br> ${producto.description} </p>
        <p>Categoría <br>  ${producto.category}</p>
        <p>Cantidad de vendidos <br> ${producto.soldCount}</p>
    <p>Imagenes Ilustrativas</p>
    </div>

    `


});

    // Habria que crear un for in o algo para recorrer el objeto y despues hacer el append





    // let name = producto.name;
    // let description = prodList.description;
    // let price = prodList.cost;
    // let currency = prodList.currency;
    // let soldCount = prodList.soldCount;
    // let image = prodList.image;

    // console.log(name)








