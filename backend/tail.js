const item = require('./item.js');
function tailNode(material){
    this.item = item(material);
    this.next = null;
}
function Tail(){
    this.length = 0;
    this.head = tail-Node();

};

Tail.prototype.addNode = function addNode(material){

    i = this.head;
    if (i== undefined)
    {
        this.head= tailNode(material);
        return;
    }

    while(i.next!=undefined){
        i=i.next;
    }
    
    i.next= tailNode(material);
}

Tail.prototype.deleteSection(){

}