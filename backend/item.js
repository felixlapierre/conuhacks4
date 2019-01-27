function Item(x, y)
{
    this.x = x;
    this.y = y;
    this.type = 'item';
    this.material = 'paper';
    this.tail = null;
    this.owner = null;
}

Item.prototype.Move = function Move(level, x, y, appended)
{
    var tempX = this.x;
    var tempY = this.y;
    this.x = x;
    this.y = y;

    level.put(this, x, y);
    level.put(undefined, tempX, tempY);

    if(this.tail != null) 
    {
        if(this.tail.owner == this.owner)
            this.tail.Move(level, tempX, tempY, appended);
        else
        {
            this.tail.Clear(this.owner);
            this.tail = null;
        }
    }
    else
    {
        if(appended != null && appended != undefined)
        {
            this.tail = appended;
            appended.x = tempX;
            appended.y = tempY;
            level.put(appended, tempX, tempY);
        }
    }
}

Item.prototype.Clear = function Clear(oldOwner)
{
    if(this.owner != oldOwner)
        return;
    this.owner = null;
    if(this.tail != null)
        this.tail.Clear();
    this.tail = null;
}

module.exports = Item;