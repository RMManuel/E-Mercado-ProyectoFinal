document.addEventListener('DOMContentLoaded', async () => {
    // Obtener el valor del localStorage
    const selectedCategoryId = localStorage.getItem("catID");

    // Comprobar si hay una categoría seleccionada en el localStorage
    if (selectedCategoryId) {
        const response = await getJSONData(PRODUCTS_URL + selectedCategoryId + EXT_TYPE);
        const carList = response.data;

        const prodTitle = document.getElementById("titulo");
        prodTitle.innerHTML = `
            <h1> Productos </h1>
            <p>Aqui veras los productos de la categoria ${carList.catName}</p>`;

        let productList = [...carList.products];
        let productListFiltrar = [...carList.products];
        ListarDatos(productList);

        const btnPrecioAsc=document.getElementById("precioAsc");
        const btnPrecioDesc=document.getElementById("precioDesc");
        const btnRelevancia=document.getElementById("relevancia");
        const btnNoFiltro=document.getElementById("noFiltro");
        const buscador=document.getElementById("buscador");

        buscador.addEventListener("input", function(){
            let input = buscador.value.toLowerCase();
            productList = productListFiltrar.filter(item => item.name.toLowerCase().includes(input) || item.description.toLowerCase().includes(input) || item.currency.toLowerCase().includes(input) || item.cost.toString().includes(input));
            container.innerHTML = "";
            ListarDatos(productList);
        });

        btnPrecioAsc.addEventListener("click", function(){
            let datosSorteados=productList.sort(function(a,b){
                if(a.cost>b.cost){
                    return 1;
                }    
                if(a.cost<b.cost){
                    return -1;
                }
                return 0;
                    
            })
            container.innerHTML = "";
            ListarDatos(datosSorteados);
            
        });
        btnPrecioDesc.addEventListener("click",function(){
            let datosSorteados=productList.sort(function(a,b){
                if(a.cost<b.cost){
                    return 1;
                }
                if(a.cost>b.cost){
                    return -1;
                }
                return 0;
            })
            container.innerHTML = "";
            ListarDatos(datosSorteados);
        });
        btnRelevancia.addEventListener("click",function(){
            let datosSorteados=productList.sort(function(a,b){
                if(a.soldCount<b.soldCount){
                    return 1;
                }
                if(a.soldCount>b.soldCount){
                    return -1;
                }
                return 0;
            })
            container.innerHTML = "";
            ListarDatos(datosSorteados);
        });
        btnNoFiltro.addEventListener("click", function(){
            container.innerHTML = "";
            ListarDatos(carList.products);
        });
        
    }
});

function ListarDatos(productList){
    const container = document.getElementById('container');

        productList.forEach(prodList => {
            let name = prodList.name;
            let description = prodList.description;
            let price = prodList.cost;
            let currency = prodList.currency;
            let soldCount = prodList.soldCount;
            let image = prodList.image;

            const productsList = document.createElement('div');
            productsList.innerHTML = `
        <div onclick="setCatID(${prodList.id})" class="list-group-item list-group-item-action cursor-active">
            <div class="row">
                <div class="col-3">
                        <img src="${image}" alt="${prodList.image}" class="img-thumbnail">
                    </div>
                        <div class="col">
                            <div class="d-flex w-100 justify-content-between">
                                <p class="mb-1">${name} - ${currency} ${price}</p>
                                <small class="text-muted">${soldCount} vendidos</small>
                        </div>
                        <small class="text-muted">${description}</small>
                    </div>
                </div>
            </div>
            </div>`;
            container.appendChild(productsList);
        });
}
