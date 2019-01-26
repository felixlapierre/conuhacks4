var exports = module.exports = {};
var rooms = {};
var sockets = {};

function moveSocketTo(socket, newRoomID, callToDeliverMap) {

  var previousAreaID = sockets[socket.id];
  if(previousAreaID != undefined) {
    //If leaving the previous room will empty it, unload the previous area
    if(Object.keys(areas[previousAreaID].players).length == 1) {
      delete areas[previousAreaID];
    }

    //Remove socket from the room it was in previously
    socket.leave(previousAreaID);
  }

  //Add socket to its new room
  socket.join(newRoomID);
  socket_rooms[socket.id] = newRoomID;

  //If new room was empty, load the room
  if(!areas.hasOwnProperty(newRoomID)) {
    //Create the new area
    areas[newRoomID] = {
      players : {
      },
      loaded: false,
      textureMap: undefined,
      wallMap: undefined
    }
    areas[newRoomID].players[socket.id] = {
      //TODO: Remove placeholder values
      x:300,
      y:300,
      angle:0
    }

} else {
    areas[areaID].players[socket.id] = {
      x:300,
      y:300,
      angle:0
    }
  }
  if(areas[areaID].loaded) {
    callToDeliverMap(socket.id);
  }
}

function getAreaOfSocketID(socketID) {
  return areas[sockets[socketID]];
}

function getAreaByID(areaID) {
  return areas[areaID];
}

function removePlayer(socketID) {
  delete areas[sockets[socketID]].players[socketID];
  delete sockets[socketID];
}

function forEachAreaID(callback) {
  for(var areaID in areas) {
    callback(areaID);
  }
}

exports.moveSocketTo = moveSocketTo;
exports.getAreaOfSocketID = getAreaOfSocketID;
exports.getAreaByID = getAreaByID;
exports.removePlayer = removePlayer;
exports.forEachAreaID = forEachAreaID;