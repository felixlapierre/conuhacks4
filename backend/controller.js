var exports = module.exports = {};

var rooms = {};
var mapPlayerIdToRoomId = {};

const Player = require('./player.js');
const Room = require('./room.js');

var roomIdCounter = 0;
const fps = 30;

setInterval(Update, 1000/fps);

function AddNewPlayer(id, io)
{
  var room = FindRoomWithEmptySpot();
  if(room != undefined)
  {
    mapPlayerIdToRoomId[id] = room.id;
    return room.AddNewPlayer( new Player(id) );
  }
  else
  {
    return CreateRoomAndAddPlayerToIt(id, io);
  }
}

function FindRoomWithEmptySpot()
{
  for(var roomId in rooms)
  {
    if(rooms.hasOwnProperty(roomId))
    {
      var room = rooms[roomId];

      if(room.HasSpotAvailable)
      {
        return room;
      }
    }
  }
}

function CreateRoomAndAddPlayerToIt(id, io)
{
  room = new Room(roomIdCounter, io, fps);
  rooms[roomIdCounter] = room;
  mapPlayerIdToRoomId[id] = roomIdCounter;

  roomIdCounter++;

  return room.AddNewPlayer(new Player(id));
}

function RemovePlayer(id)
{
  var roomId = mapPlayerIdToRoomId[id];
  var room = rooms[roomId];

  if(room == undefined)
  {
    return;
  }
  delete mapPlayerIdToRoomId[id];

  room.RemovePlayer(id)
  room.StopGame();
}

function OnPlayerSendIntent(id, intent)
{
  var roomId = mapPlayerIdToRoomId[id];
  var room = rooms[roomId];
  if(room == undefined)
  {
    return;
  }
  room.UpdatePlayerIntent(id, intent);
}

function Update()
{
  for(var roomId in rooms)
  {
    if(rooms.hasOwnProperty(roomId))
    {
      var room = rooms[roomId];
      room.Update();
    }
  }
}

exports.AddNewPlayer = AddNewPlayer;
exports.RemovePlayer = RemovePlayer;
exports.OnPlayerSendIntent = OnPlayerSendIntent;