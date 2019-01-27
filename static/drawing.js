const TILESIZE = 32;
var canvas;
var context;
console.log("Loaded drawing.js");
var images = {};
images.player = new Image();
images.player.src = "static/egg.png";
images.wall = new Image();
images.wall.src = "static/wall.png";
images.floor = new Image();
images.floor.src = "static/floor.png";
images.paper = new Image();
images.paper.src = "static/paper2.png";
images.plastic = new Image();
images.plastic.src = "static/bottle.png";
images.trash = new Image();
images.trash.src = "static/trash.png";

images.plasticTile = new Image();
images.plasticTile.src = "static/bottleTilepng.png";
images.trashTile = new Image();
images.trashTile.src = "static/trashTile.png";
images.paperTile = new Image();
images.paperTile.src = "static/paperTile.png";

function SetupCanvas()
{
    canvas = document.getElementById("canvas");
    if(canvas == undefined)
        return false;
    canvas.width  = 1024;
    canvas.height = 512;
    context = canvas.getContext('2d');
    return true;
}

function draw(map)
{
    if(!SetupCanvas())
        return;
    if(map == null)
    {
        console.log("Map not yet recieved from server");
    }
    if(map == undefined)
    {
        console.log("Map recieved from server was undefined!");
        return;
    }

    context.clearRect(0, 0, 800, 600);
    console.log("Drawing map");
    DrawTiles(map);
}

function DrawTiles(map)
{
    for(var i = 0; i < map.length; i++)
    {
        for(var j = 0; j < map.length; j++)
        {
            DrawSingleTile(map[i][j], i, j);
        }
    }
}

function DrawSingleTile(object, x, y)
{
    if(object == undefined)
    {
      DrawFloor(x, y);
    }
    else if(object.type == "player")
    {
        DrawFloor(x, y);
        DrawPlayer(object, x, y);
    }
    else if(object.type == "wall")
    {
      DrawWall(object, x, y);
    }
    else if(object.type == "item" && object.material == "paper")
    {
      DrawFloor(x, y);
      DrawImage(images.paper, x, y, 0);
    }
    else if(object.type == "item" && object.material == "plastic")
    {
      DrawFloor(x, y);
      DrawImage(images.plastic, x, y, 0);
    }
    else if(object.type == "item" && object.material == "trash")
    {
      DrawFloor(x, y);
      DrawImage(images.trash, x, y, 0);
    }
}

function DrawWall(object, x, y)
{
    switch(object.material)
    {
        case 'plastic' :
        DrawImage(images.plasticTile, x, y, 0);
        break;
        case 'trash' :
        DrawImage(images.trashTile, x, y, 0);
        break;
        case 'paper' :
        DrawImage(images.paperTile, x, y, 0);
        break;
    }
   
}

function DrawFloor(x, y)
{
    DrawImage(images.floor, x, y, 0);
}

function DrawPaper(x, y)
{
  DrawImage(images.paper, x, y, 0);
}

function DrawPlayer(player, x, y)
{
    //TODO: Implement rotation
    DrawImage(images.player, x, y, 0);
}

function DrawImage(image, x, y, rotation)
{
    context.save();
    context.translate(TILESIZE * (x + 0.5), TILESIZE * (y + 0.5));
    context.rotate(rotation);
    context.drawImage(image, 0, 0, image.width, image.height,
        -TILESIZE/2, -TILESIZE/2, TILESIZE, TILESIZE);
    context.restore();
}

