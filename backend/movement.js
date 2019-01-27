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
    
    if(SpotWithinBounds(player, level, deltaX, deltaY)
        && SpotIsVacant(level, player.x + deltaX, player.y + deltaY)) {
        DoMove(level, player, player.x + deltaX, player.y + deltaY);
        player.facing = direction;
        return true;
    }
    return false;
}

function SpotWithinBounds(player, level, deltaX, deltaY)
{
    return (player.x + deltaX >= 0 && player.x + deltaX < level.length
        && player.y + deltaY >= 0 && player.y + deltaY < level[0].length);
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

function DoMove(player, level, x, y)
{
    level.put(undefined, player.x, player.y);
    level.put(player, x, y)
}

exports.MovePlayer = MovePlayer;