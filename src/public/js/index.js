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
    title.value = '';
    description.value = '';
    code.value = '';
    thumbnail.value = '';
    price.value = '';
    stock.value = '';
    console.log('Form data to be emitted:', obj);
};

socketClient.on("addedProd", (newProduct) => {
    console.log('Received new product data from server:', newProduct);
    const addRow = `
        <tr>
            <td>${newProduct.id}</td>
            <td>${newProduct.title}</td>
            <td>${newProduct.description}</td>
            <td>${newProduct.code}</td>
            <td>${newProduct.thumbnail || 'No Thumbnail'}</td>
            <td>${newProduct.price}</td>
            <td>${newProduct.stock}</td>
        </tr>`;
    prodsTable.innerHTML += addRow;

});

deleteForm.onsubmit = (e) => {
    e.preventDefault();
    socketClient.emit('deleteProd', Number(id.value));
    id.value = '';
};

socketClient.on('deletedProd', (prodsArray) => {
    const addRow = prodsArray.map((objProd) => {
        return `
            <tr>
            <td>${objProd.id}</td>
            <td>${objProd.title}</td>
            <td>${objProd.description}</td>
            <td>${objProd.code}</td>
            <td>${objProd.price}</td>
            <td>${objProd.stock}</td>
            </tr>
        `;
    }).join(' ');
    prodsTable.innerHTML = addRow;
});

