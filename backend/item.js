function Item(x, y, material)
{
    this.x = x;
    this.y = y;
    this.type = 'item';
    this.material = material;
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
            this.tail.ClearOwner();
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

Item.prototype.ClearOwner = function ClearOwner()
{
    this.owner = null;
    if(this.tail != null)
        this.tail.ClearOwner();
}

module.exports = Item;
