function Player(socket){
    this.x=0;
    this.y=0;
    this.intent = {
        up: false,
        down: false,
        left: false,
        right: false
    };
    this.id=socket;
    this.facing = 'down';
    this.type = 'player';

    this.tail = null;
};

Player.prototype.SetIntent = function SetIntent(intent){
    this.intent=intent;
};

Player.prototype.GetIntent = function GetIntent(){
    return this.intent;
};

Player.prototype.Move = function Move(level, x, y)
{
    var tempX = this.x;
    var tempY = this.y;

    this.x = x;
    this.y = y;

    var object = level.get(x, y);
    level.put(this, x, y);
    level.put(undefined, tempX, tempY);

    if(object != undefined && object.type == "item")
    {
        object.owner = this.id;
        if(this.tail == null)
        {
            this.tail = object;
            object.x = tempX;
            object.y = tempY;
            level.put(object, tempX, tempY);
        }
        else if(this.tail != null)
        {
            this.tail.Move(level, tempX, tempY, object);
        }
    }
    else if(this.tail != null)
    {
        this.tail.Move(level, tempX, tempY, object)
    }
}

module.exports = Player;
