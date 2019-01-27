var socket = io();
socket.emit('new connection');

setInterval(function()
{
    socket.emit('intent', intent);
}, 1000/30);