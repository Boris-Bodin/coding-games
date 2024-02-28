/**
 * Auto-generated code below aims at helping you parse
 * the standard input according to the problem statement.
 **/

var speedMax = parseInt(readline()) ;
printErr('speedMax : ' + speedMax);
var lightCount = parseInt(readline());
printErr('lightCount : ' + lightCount);

function checkLight(light,speed){
	return (((light.distance * 3.6) / speed)/light.duration) %2 < 1;
}

var Lights = []
for (var i = 0; i < lightCount; i++) {
	var inputs = readline().split(' ');
	Lights.push({
		distance: parseInt(inputs[0]),
		duration: parseInt(inputs[1])
	});
}

var speed =0
for (speed = speedMax; speed > 0; speed--) {
	if(Lights.every(x => checkLight(x,speed))){
		break;
	}
}

print(speed);