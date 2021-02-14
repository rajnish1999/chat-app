const path = require('path');
const http = require('http');
const express = require('express');
const socketio = require('socket.io');
const Filter = require('bad-words');
const { generateMessage, generateLocationMessage } = require('./utils/messages')

const app = express();
const server = http.createServer(app);
const io = socketio(server); 

const publicDirectoryPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3400;

app.use(express.static(publicDirectoryPath));

io.on('connection',  (socket) => {
    console.log("New WebSocket connection");
    
    socket.emit('message', generateMessage('Welcome'));
    
    socket.broadcast.emit('message', generateMessage("A new user has joined"));
    
    socket.on("sendMsg", (msg, callback) => {
        const filter = new Filter();
    
        if(filter.isProfane(msg)) {
            return callback('Profanity is not allowed')
        }
        // callback();
        io.emit('message',generateMessage(msg));
        callback();
    })

    socket.on('sendLocation', (coordinates, callback) => {
    
        io.emit('locationMessage', generateLocationMessage(`https://google.com/maps?q=${coordinates.latitude},${coordinates.longitude}`));
        
        callback();
    })

    socket.on('disconnect', () => {
        io.emit('message', generateMessage("A user has left"));
    })
})

server.listen(port, () => {
    console.log(`Server is running on ${port}`);
})