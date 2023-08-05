import express from 'express';
import __dirname from './utils.js';
import handlebars from 'express-handlebars';
import productsRouter from './routes/products.router.js';
import cartsRouter from './routes/carts.router.js';
import viewsRouter from './routes/views.router.js';
import { Server } from 'socket.io'; 

const app = express();

app.use (express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static(__dirname+'/public'));

app.engine('handlebars', handlebars.engine());
app.set('views', __dirname+'/views');
app.set('view engine', 'handlebars');

app.use('/api/views',viewsRouter);

const PORT = 8080
const httpServer = app.listen(PORT,()=>{
    console.log(`Escuchando al puerto ${PORT}`);
});

const io = new Server (httpServer);