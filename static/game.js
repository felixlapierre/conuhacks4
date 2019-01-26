var socket = io();

socket.emit('new connection');
var movement = {
	up: false,
	down: false,
	left: false,
	right: false
}

//Keyboard event listeners
document.addEventListener('keydown', function(event) {
	switch(event.keyCode) {
		case 65: //A
		movement.left = true;
		break;
		case 87: //W
		movement.up = true;
		break;
		case 68: //D
		movement.right = true;
		break;
		case 83: //S
		movement.down = true;
		break;
	}
});

document.addEventListener('keyup', function(event) {
	switch(event.keyCode) {
		case 65: //A
		movement.left = false;
		break;
		case 87: //W
		movement.up = false;
		break;
		case 68: //D
		movement.right = false;
		break;
		case 83: //S
		movement.down = false;
		break;
	}
});

var map=undefined.
socket.emit('new connection');