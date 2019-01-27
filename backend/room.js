const Movement = require('./movement.js');
const Level = require('./level.js');
const Item = require('./Item');
var counter = 0;

function Room(id, io, fps)
{
    this.id = id;
    this.fps = fps;
    this.io = io;

    this.capacity = 2;
    this.players = {};
    this.playerCount = 0;

    this.started = false;
    this.level = new Level(32, 16);

    this.level.put({type: 'wall', material: 'paper'}, 10, 5);
    this.level.put({type: 'wall', material: 'trash'}, 10, 10);
    this.level.put({type: 'wall', material: 'plastic'}, 10, 15);

  }

Room.prototype.AddNewPlayer = function AddNewPlayer(player)
{
    this.players[player.id] = player;
    this.playersCount += 1;

    if(this.playerCount === this.capacity)
        this.StartGame();
    
    this.level.put(player, player.x, player.y);

    return this.id;
};

function randomItemCreate(level){
  var x = Math.floor(Math.random()*32);
  var y = Math.floor(Math.random()*16);

  var material = Math.random()*3;

  if(level.get(x, y) == undefined) {
    if(material < 1) {
      level.put(new Item(x, y, "paper"), x, y);
    }else if(material >= 1 && material <2){
      level.put(new Item(x, y, "plastic"), x, y);
    }else if(material >= 2 && material < 3){
      level.put(new Item(x, y, "trash"), x, y);
    }
  } else {
    randomItemCreate(level);
  }
}

Room.prototype.UpdatePlayerIntent = function UpdatePlayerIntent(id, intent)
{
    this.players[id].SetIntent(intent);
};

Room.prototype.Update = function Update()
{
  counter++;
  if (counter == 30) {
    randomItemCreate(this.level);
    counter = 0;
  }

  for(var playerId in this.players)
    {
      if(this.players.hasOwnProperty(playerId))
      {
        Movement.MovePlayer(this.players[playerId], this.level)
      }
    }
    var tiles = this.level.getArray();
    this.io(this.id, 'state', tiles);
};

Room.prototype.RemovePlayer = function RemovePlayer(id)
{
    var player = this.players[id];
    this.level.put(undefined, player.x, player.y);
    delete this.players[id];
    this.playersCount -= 1;
    this.StopGame();
};

Room.prototype.StopGame = function StopGame()
{
    this.started = false;
};

/**
 * @return {boolean}
 */
Room.prototype.HasSpotAvailable = function HasSpotAvailable()
{
    return this.playersCount < this.capacity;
};

module.exports = Room;
