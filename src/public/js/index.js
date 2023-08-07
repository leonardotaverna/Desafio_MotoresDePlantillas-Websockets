const socketClient = io();

const form = document.getElementById('form');
const message = document.getElementById ('message');

form.onsubmit = (e) => {
    e.preventDefault();
    socketClient.emit ('message', message.value);
};

socketClient.on('chatBox', (chatBox) => {
    console.log(chatBox);
})

// socketClient.on('bienvenida', (data)=> {
//     console.log(data);
// });
// socketClient.emit ('message',`Cliente comunicándose desde websocket`); 