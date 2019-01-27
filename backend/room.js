const Movement = require('./movement.js');
const Level = require('./level.js');

function Room(id, io, fps)
{
    this.id = id;
    this.fps = fps;
    this.io = io;

    this.capacity = 2;
    this.players = {};
    this.playerCount = 0;

    this.started = false;
    this.level = new Level(20, 20);
};

Room.prototype.AddNewPlayer = function AddNewPlayer(player)
{
    this.players[player.id] = player;
    this.playersCount += 1;

    if(this.playerCount === this.capacity)
        this.StartGame();
    
    this.level.put(player, player.x, player.y);

    return this.id;
};

Room.prototype.StartGame = function StartGame()
{
    this.started = true;
    setInterval(() => {
        this.Update();
    }, 1000/fps);
};

Room.prototype.UpdatePlayerIntent = function UpdatePlayerIntent(id, intent)
{
    this.players[id].SetIntent(intent);
};

Room.prototype.Update = function Update()
{
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

Room.prototype.HasSpotAvailable = function HasSpotAvailable()
{
    return this.playersCount < this.capacity;
}

module.exports = Room;