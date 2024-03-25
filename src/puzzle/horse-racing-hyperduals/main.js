/**
 * Auto-generated code below aims at helping you parse
 * the standard input according to the problem statement.
 **/

class Horse{
	constructor(V,E){
		this.V = V
		this.E = E
	}

	distanceTo(horse){
		return Math.abs(horse.V-this.V)+Math.abs(horse.E-this.E)
	}
}

var horses = []
var N = parseInt(readline());
for (var i = 0; i < N; i++) {
	var inputs = readline().split(' ');
	var V = parseInt(inputs[0]);
	var E = parseInt(inputs[1]);
	horses.push(new Horse(V,E));
}

min = 20000000

for (var i = 0; i < N; i++) {
	for (var j = 0; j < N; j++) {
		if(i != j) {
			var dist = horses[i].distanceTo(horses[j]);
			if(min > dist) min = dist
		}
	}
}



print(min);