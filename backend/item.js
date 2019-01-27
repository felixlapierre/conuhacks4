function Item(x,y,material){
    this.x=0;
    this.y=0;
    this.type = 'item';
    this.material = undefined; //trash, glass, plastic, paper, compost
}

module.exports = Item;