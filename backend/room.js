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

Room.prototype.AddNewPlayer = AddNewPlayer(player)
{
    this.players[player.id] = player;
    this.players.count += 1;

    if(this.players.count === this.capacity)
        this.StartGame();
};

Room.prototype.StartGame = StartGame()
{
    this.started = true;
    setInterval(() => {
        this.Update();
    }, 1000/fps);
};

Room.prototype.UpdatePlayerIntent = UpdatePlayerIntent(id, intent)
{
    this.players[id].SetIntent(intent);
};

Room.prototype.Update = Update()
{
    //TODO: Update logic
    broadcast(this.id, "state", this.level.getArray());
};

Room.prototype.RemovePlayer = RemovePlayer(id)
{
    this.players[id] = undefined;
    this.players.count -= 1;
    this.StopGame();
};

Room.prototype.StopGame = StopGame()
{
    this.started = false;
};

Room.prototype.HasSpotAvailable()
{
    return this.players.count < this.capacity;
}