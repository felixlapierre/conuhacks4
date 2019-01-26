const socketIO = require('socket.io')

function Sockets(server) {
    this.io = socketIO(server);
    console.log(this.io);
}

Sockets.prototype.open = function open() {
    this.io.on('connection', function (socket) {
        socket.on('new connection', function () {
            console.log("Detected a new connection!");
        });
    })
};

module.exports = Sockets;