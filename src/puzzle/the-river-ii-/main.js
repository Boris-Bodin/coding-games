/**
 * Auto-generated code below aims at helping you parse
 * the standard input according to the problem statement.
 **/

var r1 = parseInt(readline());

function river(a){
	var out = a;
	var str = '' + a;

	for(var i = 0; i < str.length;i++)
		out += (+str[i]);

	return out;
}

var number = 0;

var numberKnow = {}


for(var i = 0; i <= r1;i++) {
	r2 = river(i)
	printErr(r2)
	if(numberKnow[r2] == undefined)
		numberKnow[r2] = [];
	numberKnow[r2].push(i);
}

for(var i = 0; i < r1;i++)
	printErr(numberKnow[i])

out = 'NO';
while(r1 > 0){
	if(numberKnow[r1]) {
		if(numberKnow[r1].length == 0){
			out = 'NO';
			break;
		}
		if(numberKnow[r1].length >= 1){
			out = 'YES';
			break;
		}
	} else {
		out = 'NO';
		break;
	}
}




print(out);