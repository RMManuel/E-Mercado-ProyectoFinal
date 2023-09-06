async function productoId() {
    const selectedId = localStorage.getItem("productoSeleccionado");
    console.log(selectedId);

    try {
        const responseId = await getJSONData(PRODUCT_INFO_URL + selectedId + EXT_TYPE);
        console.log(responseId);
        console.log(typeof responseId)

    } catch (error) {
        console.error("Error al obtener la información del producto:", error);
    }

}

// Habria que crear un for in o algo para recorrer el objeto y despues hacer el append

productoId();

