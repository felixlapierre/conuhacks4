var location = window.location;
location.port = "3000";
var socket = io(location);

socket.emit('client connected');