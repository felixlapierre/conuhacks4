function Level(x, y)
{
    this.tiles = new Array(x);

    for(i = 0; i < this.tiles.length; ++i)
    {
        tiles[i] = new Array(y);
    }
}

Level.prototype.put = function put(object, x, y)
{
    tiles[x][y] = object;
}

Level.prototype.get = function get(x, y)
{
    return tiles[x][y];
}

Level.prototype.getArray = function getArray()
{
    return tiles;
}

Level.prototype.generatePlaceholderLevel = function generatePlaceholderLevel()
{
    this.tiles[3][3] = { type:'wall'};
    this.tiles[5][5] = {type:'wall'};
}

module.exports = Level;