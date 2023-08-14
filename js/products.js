const API_URL = 'https://japceibal.github.io/emercado-api/cats_products/101.json';

async function getCars(){
    const response = await fetch(API_URL);
    const json = await response.json();
    
    const cars = json
    return cars;

}; 


document.addEventListener('DOMContentLoaded', async () =>{
    const carList = await getCars(); 

    const prodTitle= document.getElementById("titulo");
    prodTitle.innerHTML=`
        <h1> Productos </h1>
        <p>Aqui veras los productos de la categoria `+carList.catName+`</p>`

    const productList=carList.products;
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
                        <small class="text-muted">${description} vendidos</small>
                    </div>
                </div>
            </div>
            </div>`
        ;
        container.appendChild(productsList);
    });
});