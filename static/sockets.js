var socket = io();
socket.emit('new connection');
socket.emit('new player');
var map = null;

setInterval(function()
{
    socket.emit('intent', intent);
}, 1000/30);

socket.on('state', function(data)
{
    draw(data);
});