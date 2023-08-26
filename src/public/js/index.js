const socketClient = io();

const prodsForm = document.getElementById('prodsForm');
const title = document.getElementById("title");
const description = document.getElementById("description");
const price = document.getElementById("price");
const code = document.getElementById("code");
const thumbnail = document.getElementById("thumbnail");
const stock = document.getElementById("stock");
const prodsTable = document.getElementById("prodsTable");
const deleteForm = document.getElementById("deleteProduct");
const id = document.getElementById("id");

prodsForm.onsubmit = (e) => {
    e.preventDefault();
    const obj = {
        title: title.value,
        description: description.value,
        code: code.value,
        thumbnail: thumbnail.value,
        price: Number(price.value),
        stock: Number(stock.value),
    };

    socketClient.emit("addProd", obj);
    // title.value = '';
    // description.value = '';
    // code.value = '';
    // thumbnail.value = '';
    // price.value = '';
    // stock.value = '';
    console.log('Form data to be emitted:', obj);
};

socketClient.on("addedProd", async (newProductsArray) => {
    //await productsManager.getProducts();
    const addRow = await newProductsArray.map((objProd) => {
    return `
        <tr>
        <td>${objProd.id}</td>
        <td>${objProd.title}</td>
        <td>${objProd.description}</td>
        <td>${objProd.code}</td>
        <td>${objProd.thumbnail || 'No Thumbnail'}</td>
        <td>${objProd.price}</td>
        <td>${objProd.stock}</td>
        </tr>
     `
}).join(' ');
        // < tr >
        //     <td>${newProductAdded.id}</td>
        //     <td>${newProductAdded.title}</td>
        //     <td>${newProductAdded.description}</td>
        //     <td>${newProductAdded.code}</td>
        //     <td>${newProductAdded.thumbnail || 'No Thumbnail'}</td>
        //     <td>${newProductAdded.price}</td>
        //     <td>${newProductAdded.stock}</td>
        // </tr > `;
    prodsTable.innerHTML += addRow;
});

deleteForm.onsubmit = (e) => {
    e.preventDefault();
    socketClient.emit('deleteProd', Number(id.value));
    id.value = '';
};

socketClient.on('deletedProd', (prodsArray) => {
    console.log('deleted:', prodsArray);
    const addRow = prodsArray.map((objProd) => {
        return `
        < tr >
            <td>${objProd.id}</td>
            <td>${objProd.title}</td>
            <td>${objProd.description}</td>
            <td>${objProd.code}</td>
            <td>${objProd.price}</td>
            <td>${objProd.stock}</td>
            </tr >
        `;
    }).join(' ');
    prodsTable.innerHTML = addRow;
});

