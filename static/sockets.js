var socket = io();
socket.emit('new connection');
socket.emit('new player');
setInterval(function()
{
    socket.emit('intent', intent);
}, 1000/30);

socket.on('')