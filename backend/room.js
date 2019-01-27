function Room(id, broadcast, fps)
{
    this.id = id;
    this.fps = fps;
    this.broadcast = broadcast;

    this.capacity = 2;
    this.players = {};
    this.players.count = 0;

    this.started = false;
    this.level = undefined;
};

Room.prototype.AddNewPlayer = function AddNewPlayer(player)
{
    this.players[player.id] = player;
    this.players.count += 1;

    if(this.players.count === this.capacity)
        this.StartGame();
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

    broadcast(this.id, "state", this.level.getArray());
    
    for(var playerId in this.players)
    {
      if(this.players.hasOwnProperty(playerId))
      {
        var player = this.players[playerId];
        var intent = player.getIntent();
        var facing = player.facing;
    //TODO: Update logic
        
      }
    }

};

Room.prototype.RemovePlayer = function RemovePlayer(id)
{
    this.players[id] = undefined;
    this.players.count -= 1;
    this.StopGame();
};

Room.prototype.StopGame = function StopGame()
{
    this.started = false;
};

Room.prototype.HasSpotAvailable = function HasSpotAvailable()
{
    return this.players.count < this.capacity;
}