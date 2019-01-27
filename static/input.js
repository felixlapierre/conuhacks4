var intent = {
	up: false,
	down: false,
	left: false,
	right: false
}

//Keyboard event listeners
document.addEventListener('keydown', function(event) {
	switch(event.keyCode) {
		case 65: //A
		intent.left = true;
		break;
		case 87: //W
		intent.up = true;
		break;
		case 68: //D
		intent.right = true;
		break;
		case 83: //S
		intent.down = true;
		break;
	}
});

document.addEventListener('keyup', function(event) {
	switch(event.keyCode) {
		case 65: //A
		intent.left = false;
		break;
		case 87: //W
		intent.up = false;
		break;
		case 68: //D
		intent.right = false;
		break;
		case 83: //S
		intent.down = false;
		break;
	}
});