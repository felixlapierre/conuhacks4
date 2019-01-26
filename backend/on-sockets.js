const socketIO = require('socket.io')

function Sockets(server, callback) {
    this.io = socketIO(server);
    this.callback = callback;
    
}

Sockets.prototype.open = function open() {

    this.io.on('connection', function (socket) {
        socket.on('new connection', function () {
            console.log("Detected a new connection!");
        });

        socket.on('new player', function() {
            this.callback.AddNewPlayer(socket.id, this.emit);
        });

        socket.on('disconnect', function() {
            this.callback.RemovePlayer(socket.id);
        });

        socket.on('intent', function() {
            this.callback.OnPlayerSendIntent(socket.id);
        });
    })

};

Sockets.prototype.emit = function(roomID, messageType, messageContents)
{
    io.to(roomID).emit(messageType, messageContents);
}

module.exports = Sockets;