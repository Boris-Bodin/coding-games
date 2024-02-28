/**
 * Auto-generated code below aims at helping you parse
 * the standard input according to the problem statement.
 **/

var W = parseInt(readline());
var H = parseInt(readline());

var map= [];

for (var i = 0; i < H; i++) {
	var line = readline();
	map[i] = line.split('');
}

var hasCHange = true;
while(hasCHange){
	map.forEach(x => printErr(x.join('')));
	printErr('--------------');

	hasCHange = false;
	var resMap = [];
	for (var i = 0; i < H; i++) {
		resMap[i] = [];
		for (var j = 0; j < W; j++) {
			resMap[i][j] = map[i][j];
		}
	}

	for (i = 0; i < H; i++) {
		for (j= 0; j < W; j++) {
			var c = map[i][j];
			if(c !== '.'  && c !== '#'&& c !== '+') {
				if(i < H-1) {
					if(resMap[i+1][j] !== c){
						if(map[i+1][j] !== resMap[i+1][j]) {
							resMap[i+1][j] = '+';
							hasCHange = true;
						}
						else if(map[i+1][j] === '.') {
							resMap[i+1][j] = c;
							hasCHange = true;
						}
					}
				}
				if(i > 0) {
					if(resMap[i-1][j] !== c){
						if(map[i-1][j] !== resMap[i-1][j]) {
							resMap[i-1][j] = '+';
							hasCHange = true;
						}
						else if(map[i-1][j] === '.') {
							resMap[i-1][j] = c;
							hasCHange = true;
						}
					}
				}

				if(j < H-1) {
					if(resMap[i][j+1] !== c){
						if(map[i][j+1] !== resMap[i][j+1]) {
							resMap[i][j+1] = '+';
							hasCHange = true;
						}
						else if(map[i][j+1] === '.') {
							resMap[i][j+1] = c;
							hasCHange = true;
						}
					}
				}
				if(j > 0) {
					if(resMap[i][j-1] !== c){
						if(map[i][j-1] !== resMap[i][j-1]) {
							resMap[i][j-1] = '+';
							hasCHange = true;
						}
						else if(map[i][j-1] === '.') {
							resMap[i][j-1] = c;
							hasCHange = true;
						}
					}
				}
			}
		}
	}
	map = resMap;
}

map.forEach(x => print(x.join('')));