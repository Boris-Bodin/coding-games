/**
 * Auto-generated code below aims at helping you parse
 * the standard input according to the problem statement.
 **/

var rotations = readline();
var face1 = readline();
var face2 = readline();

function Rotate(face, rotation){
	if(rotation.startsWith('x')){
		if(face == 'F') return rotation.endsWith('\'') ? 'D' :'U'
		if(face == 'B') return rotation.endsWith('\'') ? 'U' :'D'
		if(face == 'U') return rotation.endsWith('\'') ? 'F' :'B'
		if(face == 'D') return rotation.endsWith('\'') ? 'B' :'F'
		if(face == 'L') return 'L'
		if(face == 'R') return 'R'
	}
	if(rotation.startsWith('y')){
		if(face == 'F') return rotation.endsWith('\'') ? 'R' :'L'
		if(face == 'B') return rotation.endsWith('\'') ? 'L' :'R'
		if(face == 'U') return 'U'
		if(face == 'D') return 'D'
		if(face == 'L') return rotation.endsWith('\'') ? 'F' :'B'
		if(face == 'R') return rotation.endsWith('\'') ? 'B' :'F'
	}
	if(rotation.startsWith('z')){
		if(face == 'F') return 'F'
		if(face == 'B') return 'B'
		if(face == 'U') return rotation.endsWith('\'') ? 'L' :'R'
		if(face == 'D') return rotation.endsWith('\'') ? 'R' :'L'
		if(face == 'L') return rotation.endsWith('\'') ? 'D' :'U'
		if(face == 'R') return rotation.endsWith('\'') ? 'U' :'D'
	}
}

printErr(rotations);
printErr(face1);
printErr(face2);
printErr();

rotations.split(' ').forEach((rot) => {
	face1 = Rotate(face1,rot)
	face2 = Rotate(face2,rot)
})

print(face1)
print(face2)