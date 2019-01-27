var exports = module.exports = {};

var rooms = {};
var mapPlayerIdToRoomId = {};

const Player = require('./player.js');
const Room = require('./room.js');

var roomIdCounter = 0;
const fps = 30;

function AddNewPlayer(id, io)
{
  var room = FindRoomWithEmptySpot();
  if(room != undefined)
  {
    room.AddNewPlayer( new Player(id) );
  }
  else
  {
    CreateRoomAndAddPlayerToIt(id, io);
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

  room.AddNewPlayer(new Player(id));

  roomIdCounter++;
}

function RemovePlayer(id)
{
  var roomId = mapPlayerIdToRoomId[id];
  var room = rooms[roomId];

  if(room == undefined)
  {
    return;
  }

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