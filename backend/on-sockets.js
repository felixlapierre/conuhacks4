const socketIO = require('socket.io')
var Controller = require("./controller.js");
var server;
var io;
module.exports = function(a_server)
{
    server = a_server;

    io = socketIO(server);

    io.on('connection', function (socket) {
        socket.on('new connection', function () {

        });

        socket.on('new player', function() {
            var roomID = Controller.AddNewPlayer(socket.id, emit);
            socket.join(roomID);
            console.log("New player " + socket.id + " in room " + roomID);
        });

        socket.on('disconnect', function() {
            Controller.RemovePlayer(socket.id);
        });

        socket.on('intent', function(data) {
            Controller.OnPlayerSendIntent(socket.id, data);
        });
    })
}
function emit(roomID, messageType, messageContents)
{
    io.to(roomID).emit(messageType, messageContents);
}