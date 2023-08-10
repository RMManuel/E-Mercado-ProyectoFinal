const API_URL = "https://japceibal.github.io/emercado-api/cats_products/101.json";

// Obtener los productos usando fetch
fetch(API_URL)
  .then(response => {
    if (response.ok) {
      return response.json();
    } else {
      throw new Error(response.statusText);
    }
  })
  .then(data => {
    // Llamar a una función para mostrar los productos
    MostrarProductos(data); //la solucion a todos tus problemas
  })
  .catch(error => {
    console.error("Error obteniendo datos:", error);
  });

// Función para mostrar los productos en el HTML
function MostrarProductos(data) {
    const product=data.products;
    const tituloContainer=document.getElementById("Titulo");
    const productosContainer = document.getElementById("contenedor-productos");
    tituloContainer.innerHTML=`
        <h1>Productos</h1>
        <p>Verás aqui todos los productos de la categoria `+data.catName+`</p>`

    product.forEach(product => {
    const productHTML = `
    
    <div class="list-group-item list-group-item-action">
    <div class="row">
        <div class="col-3">
            <img src="` + product.image + `" alt="product image" class="img-thumbnail"> 
        </div>
        <div class="col">
            <div class="d-flex w-100 justify-content-between">
                <div class="mb-1">
                <h4>`+ product.name+' - ' +product.currency+' '+product.cost +`</h4>
                 
                <p> `+ product.description +`</p> 
                </div>
                <small class="text-muted"> `+ product.soldCount + ` vendidos</small> 
            </div>

        </div>
    </div>
    </div>
    `;
    productosContainer.innerHTML += productHTML;
  });
}
        
        



