const TILESIZE = 32;
var canvas;
canvas = document.getElementById("canvas");


canvas.width = 800;
canvas.height = 600;

var context = canvas.getContext('2d');

var images = {};
images.player = new Image().src = "static/player.png";
images.wall = new Image().src = "static/wall.png";
images.floor = new Image().src = "static/floor.png";

function draw(map)
{
    if(map == undefined)
    {
        console.log("Map recieved from server was undefined!");
        return;
    }

    context.clearRect(0, 0, 800, 600);

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
        DrawFloor(x, y);
    else if(object.type == "player")
    {
        DrawFloor(x, y);
        DrawPlayer(object, x, y);
    }
    else if(object.type == "wall")
        DrawWall(x, y);
}

function DrawWall(x, y)
{
    DrawImage(images.wall, x, y, 0);
}

function DrawFloor(x, y)
{
    DrawImage(images.floor, x, y, 0);
}

function DrawPlayer(player, x, y)
{
    //TODO: Implement rotation
    DrawImage(images.player, x, y, 0);
}

function DrawImage(image, x, y, rotation)
{
    context.save();
    context.translate(TILESIZE * x, TILESIZE * y);
    context.rotate(rotation);
    context.drawImage(image, 0, 0, image.width, image.height,
        -TILESIZE/2, -TILESIZE/2, TILESIZE, TILESIZE);
}