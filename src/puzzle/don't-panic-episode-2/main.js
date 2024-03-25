/**
 * Auto-generated code below aims at helping you parse
 * the standard input according to the problem statement.
 **/

class Floor{
	constructor(id){
		this.id = id;
		this.elevators = [];
	}

	Debug(){
		printErr('' + this.id);
	}
}

class Elevator{
	constructor(elevatorFloor,elevatorPos){
		this.floor = elevatorFloor;
		this.pos  = elevatorPos;
	}

	Debug(){
		printErr('Elevator Floor : ' + this.floor + ', Position : ' + this.pos);
	}
}

var elevators = [];

var inputs = readline().split(' ');
printErr(inputs);
var nbFloors = parseInt(inputs[0]); // number of floors
var width = parseInt(inputs[1]); // width of the area
var nbRounds = parseInt(inputs[2]); // maximum number of rounds
var exitFloor = parseInt(inputs[3]); // floor on which the exit is found
var exitPos = parseInt(inputs[4]); // position of the exit on its floor
var nbTotalClones = parseInt(inputs[5]); // number of generated clones
var nbAdditionalElevators = parseInt(inputs[6]); // ignore (always zero)
var nbElevators = parseInt(inputs[7]); // ignore (always zero)

for (var i = 0; i < nbElevators; i++) {
	var inputs = readline().split(' ');
	elevators.push(new Elevator(parseInt(inputs[0]),parseInt(inputs[1])));
}

nbAdditionalElevatorsFree = nbAdditionalElevators;

for (var i = 0; i < nbFloors; i++) {
	var elevatorsFilted = elevators.filter(x => x.floor == i);
	if(elevatorsFilted.length == 0)
		nbAdditionalElevatorsFree--;
}

// game loop
while (true) {
	// elevators.forEach(x => x.Debug());
	var inputs = readline().split(' ');
	var cloneFloor = parseInt(inputs[0]); // floor of the leading clone
	var clonePos = parseInt(inputs[1]); // position of the leading clone on its floor
	var direction = inputs[2];
	if(direction == 'NONE')
		print('WAIT')
	else {
		/*   if(nbAdditionalElevatorsFree > 0){
			   print('ELEVATOR')
			   elevators.push(new Elevator(cloneFloor,clonePos));
			   nbAdditionalElevatorsFree--;
			   nbAdditionalElevators--;
			   continue;
		   }*/
		if(cloneFloor != exitFloor){
			var elevatorsFilted = elevators.filter(x => x.floor == cloneFloor);
			if(elevatorsFilted.length > 0) {
				var dist = 100;
				for (var i = 0; i < elevatorsFilted.length; i++) {
					var tmp = elevatorsFilted[i].pos - clonePos;
					if(tmp < dist) dist = tmp;
				}
				if(dist > 0 && direction == 'LEFT' || dist < 0 && direction == 'RIGHT')
					print('BLOCK')
				else
					print('WAIT')
			} else {
				print('ELEVATOR')
				nbAdditionalElevators--;
				elevators.push(new Elevator(cloneFloor,clonePos));
			}
		} else {

			var dist = exitPos - clonePos
			if(dist > 0 && direction == 'LEFT' || dist < 0 && direction == 'RIGHT')
				print('BLOCK')
			else
				print('WAIT')
		}
	}
}