const API_URL = "https://japceibal.github.io/emercado-api/cats_products/101.json";

document.addEventListener("DOMContentLoaded", () => {
    loadProducts(API_URL);
});

async function loadProducts(url) {
    try {
        const response = await getJSONData(url);
        if (response.status === 'ok') {
            const objeto = response.data;
            mostrarProductos(objeto);
        } else {
            console.error("Error obteniendo la información de los productos.");
        }
    } catch (error) {
        console.error("Error obteniendo datos:", error);
    }
}

// Función para mostrar los productos en el HTML
function mostrarProductos(data) {
    const product=data.products;
    const tituloContainer=document.getElementById("Titulo");
    const productosContainer = document.getElementById("contenedor-productos");
    tituloContainer.innerHTML=`
        <h1>Productos</h1>
        <p>Verás aqui todos los productos de la categoría <b>`+ data.catName +`</b></p>`

    product.forEach(product => {
      const productHTML = `
      
      <div class="list-group-item list-group-item-action">
      <div class="row">
          <div class="col-3">
              <img src="${product.image}" alt="product image" class="img-thumbnail"> 
          </div>
          <div class="col">
              <div class="d-flex w-100 justify-content-between">
                  <div class="mb-1">
                  <h4>${product.name} - ${product.currency} ${product.cost}</h4>
                  <p> ${product.description}</p> 
                  </div>
                  <small class="text-muted"> ${product.soldCount} vendidos</small> 
              </div>

          </div>
      </div>
      </div>
      `;
      productosContainer.innerHTML += productHTML;
  });
}
        
        



