/**
 * Auto-generated code below aims at helping you parse
 * the standard input according to the problem statement.
 **/

var N = parseInt(readline());


for(var i = 0; i < N; i++){
	var out = '';
	for(var j = 0; j < (2*N-1)-i; j++){
		out += ' ';
	}
	for(var j = 0; j < (i*2+1); j++){
		out += '*';
	}

	if(i == 0) {
		out = '.' + out.slice(1)
	}
	print(out)
}



for(var i = 0; i < N; i++){
	var out = '';
	for(var j = 0; j < (N-1)-i; j++){
		out += ' ';
	}
	for(var j = 0; j < (i*2+1); j++){
		out += '*';
	}
	for(var j = 0; j < (2*N-1)-(i*2); j++){
		out += ' ';
	}
	for(var j = 0; j < (i*2+1); j++){
		out += '*';
	}
	print(out)
}
