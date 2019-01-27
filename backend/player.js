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
};

Player.prototype.setIntent = function(intent){
    this.intent=intent;
};

Player.prototype.getIntent = function(){
    return this.intent;
};

module.exports = Player;