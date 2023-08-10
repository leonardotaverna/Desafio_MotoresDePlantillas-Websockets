import express from 'express';
import __dirname from './utils.js';
import handlebars from 'express-handlebars';
import productsManager from './ProductsManager.js'
import viewsRouter from './routes/views.router.js';
import productsRouter from './routes/products.router.js'
import { Server } from 'socket.io'; 

const app = express();

//Express
app.use (express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static(__dirname + '/public'));

//Handlebars
app.engine('handlebars', handlebars.engine());
app.set('views', __dirname + '/views');
app.set('view engine', 'handlebars');

//Hooks
app.use('/api/views',viewsRouter);

const PORT = 8080
const httpServer = app.listen(PORT,()=>{
    console.log(`Escuchando al puerto ${PORT}`);
});

const socketServer = new Server (httpServer);

socketServer.on ('connection', socket =>{
    console.log("Nuevo cliente conectado:", socket.id);

    socket.on('disconnect', () => {
        console.log('Cliente', socket.id, 'desconectado');
    });

    socketServer.emit('bienvenida',`Bienvenido a My E-book Store usuario ${socket.id}`);

    socket.on('addProd', async (objProd) => {
        const opAdd = await productsManager.addProduct(objProd);
        if(opAdd.operation){
            socketServer.emit('addedProd', opAdd.newProduct);
        } else{
            socket.emit('addedProd', opAdd.message);
        }
    });

    socket.on('deleteProd', async (id) => {
        await productsManager.deleteProduct(Number (id));

        const newProductsArray = await productsManager.getProducts();

        socketServer.emit("deletedProd",newProductsArray);
        
        
        
        
        /*const opDel = await productsManager.deleteProduct(id);
        if(opDel.operation){
            socketServer.emit("deletedProd", opDel.modData);
        } else{
            socket.emit("deletedProd", opDel.message);
        }*/
    });
    
});