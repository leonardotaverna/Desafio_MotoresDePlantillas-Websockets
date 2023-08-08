import express from 'express';
import __dirname from './utils.js';
import handlebars from 'express-handlebars';
import productsManager from './ProductsManager.js'
import viewsRouter from './routes/views.router.js';
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
    socket.on('message', (data) => {
        chatBox.push ({id:socket.id, data});
        //console.log(chatBox);
        socketServer.emit('chatBox', chatBox);
    });
    socket.on('disconnect', () => {
        console.log('Cliente', socket.id, 'desconectado');
    });
    socketServer.emit('bienvenida',`Bienvenido a My E-book Store usuario ${socket.id}`);
});