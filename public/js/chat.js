const socket = io();

socket.on('welcomeMsg', (msg) => {
    console.log(msg);
})

document.getElementById('btn').addEventListener('click', () => {
    const msg = document.getElementById('inp').value;
    socket.emit('sendMsg', msg);
})