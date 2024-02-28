/**
 * Auto-generated code below aims at helping you parse
 * the standard input according to the problem statement.
 **/


class Position{
	constructor(x,y){
		this.x = x;
		this.y = y;
	}

	DistanceTo(pos){
		return Math.sqrt((this.x - pos.x)*(this.x - pos.x) + (this.y - pos.y)*(this.y - pos.y));
	}
	DebugDistanceTo(pos){
		printErr('--------------')
		printErr(this.x +' ' +this.y)
		printErr(pos.x +' ' + pos.y)
		printErr((this.x - pos.x)*(this.x - pos.x))
		printErr((this.y - pos.y)*(this.y - pos.y))
		printErr(Math.sqrt((this.x - pos.x)*(this.x - pos.x) + (this.y - pos.y)*(this.y - pos.y)))
		printErr('--------------')
	}
}

map = []

var N = parseInt(readline());
for (var i = 0; i < N; i++) {
	var inputs = readline().split(' ');
	var X = parseInt(inputs[0]);
	var Y = parseInt(inputs[1]);
	map.push(new Position(X,Y));
}

var AllDistance = 0;
var first = map.splice(0,1)[0];
var currentPos = first;


while(map.length > 0){
	var nextPosId = 0;
	var nextPosDistance = currentPos.DistanceTo(map[nextPosId]);
	printErr(nextPosDistance)
	for (var i = 1; i < map.length; i++) {
		var tmp = currentPos.DistanceTo(map[i])
		printErr(tmp)
		if(nextPosDistance > tmp) {
			var nextPosId = i;
			var nextPosDistance = tmp;
		}
	}
	//   currentPos.DebugDistanceTo(map[nextPosId])
	AllDistance = AllDistance + nextPosDistance;
	currentPos = map.splice(nextPosId,1)[0];
}


AllDistance = AllDistance + currentPos.DistanceTo(first);

print(Math.round(AllDistance));