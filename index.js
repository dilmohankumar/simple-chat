const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const path = require('path');
const { Server } = require("socket.io");
const io = new Server(server);

app.use(express.static(path.resolve('./public')));

// Socket.io 
io.on('connection', (socket) => {
    console.log('A user connected');

    // Listen for chat messages
    socket.on('chat-message', (message) => {
        // Broadcast the message to everyone except the sender
        socket.broadcast.emit('chat-message', message);
    });

    socket.on('disconnect', () => {
        console.log('A user disconnected');
    });
});

app.get('/', (req, res) => {
    return res.sendFile(path.join(__dirname, './public/index.html')); // Ensure the path is correct
});

server.listen(3000, () => {
    console.log(`Server is running on PORT: 3000`);
});
