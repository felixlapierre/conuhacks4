var exports = module.exports = {};

function MovePlayer(player, level)
{
    if(player.intent.up == true)
    {
        if(TryGo(player, level, 0, 1, 'up'))
            return;
    }
    if (player.intent.down == true)
    {
        if(TryGo(player, level, 0, -1, 'down'))
            return;
    }
    if (player.intent.left == true)
    {
        if(TryGo(player, level, -1, 0, 'left'))
            return;
    }
    if (player.intent.right == true)
    {
        if(TryGo(player, level, 1, 0, 'right'))
            return;
    }
}

function TryGo(player, level, deltaX, deltaY, direction)
{
    if(SpotIsVacant(level, player.x + deltaX, player.y + deltaY)) {
        MovePlayer(level, player, player.x + deltaX, player.y + deltaY);
        player.facing = direction;
        return true;
    }
    return false;
}

function SpotIsVacant(level, x, y)
{
    var objectType = level.get(x,y).type;
    
    switch(objectType)
    {
        case 'player':
        case 'wall':
            return false;
        default:
            return true;
    }
}

function MovePlayer(level, player, x, y)
{
    level.put(undefined, player.x, player.y);
    level.put(player, x, y)
}

exports.MovePlayer = MovePlayer;