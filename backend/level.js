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

Level.prototype.getTileAtLocation(x, y)
{
    return tiles[x][y];
}

Level.prototype.getArray()
{
    return tiles;
}