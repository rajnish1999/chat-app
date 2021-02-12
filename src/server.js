const path = require('path');
const http = require('http');
const express = require('express');
const socketio = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketio(server); 

const publicDirectoryPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3400;

app.use(express.static(publicDirectoryPath));

io.on('connection',  (socket) => {
    console.log("connection established");
    
    socket.emit('welcomeMsg', "Welcome bro");
    socket.broadcast.emit('welcomeMsg', "new user joined")
    socket.on("sendMsg", (msg) => {
        io.emit('welcomeMsg',msg)
    })

    socket.on('disconnect', () => {
        io.emit('welcomeMsg', "a  user left");
    })
})

server.listen(port, () => {
    console.log(`Server is running on ${port}`);
})