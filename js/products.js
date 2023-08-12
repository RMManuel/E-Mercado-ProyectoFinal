const API_URL = 'https://japceibal.github.io/emercado-api/cats_products/101.json';

async function getCars(){
    const response = await fetch(API_URL);
    const json = await response.json();
    console.log(json); 
    const cars = json.products
    return cars;

}; 


document.addEventListener('DOMContentLoaded', async () =>{
    const carList = await getCars(); 
    const container = document.getElementById('container');


    carList.forEach(carList => {

        let name = carList.name;
        let description = carList.description;
        let price = carList.cost;
        let currency = carList.currency;
        let soldCount = carList.soldCount;
        let image = carList.image;

        const productsList = document.createElement('div');
        productsList.innerHTML = `
        <div onclick="setCatID(${carList.id})" class="list-group-item list-group-item-action cursor-active">
            <div class="row">
                <div class="col-3">
                        <img src="${image}" alt="${carList.image}" class="img-thumbnail">
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