function Level(x, y)
{
    this.tiles = new Array(x);
    this.x = x;
    this.y = y;
    for(i = 0; i < this.tiles.length; ++i)
    {
        this.tiles[i] = new Array(y);
    }
}

Level.prototype.put = function put(object, x, y)
{
    this.tiles[x][y] = object;
}

Level.prototype.get = function get(x, y)
{
    return this.tiles[x][y];
}

Level.prototype.getArray = function getArray()
{
    return this.tiles;
}

Level.prototype.generatePlaceholderLevel = function generatePlaceholderLevel()
{
    this.tiles[3][3] = { type:'wall'};
    this.tiles[5][5] = { type:'wall'};
}

Level.prototype.X = function X()
{
    return this.x;
}

Level.prototype.Y = function Y()
{
    return this.y;
}

module.exports = Level;