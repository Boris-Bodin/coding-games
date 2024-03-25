/**
 * Auto-generated code below aims at helping you parse
 * the standard input according to the problem statement.
 **/

var N = parseInt(readline());
var C = parseInt(readline());
var monnnais = [];
var total = 0;
for (var i = 0; i < N; i++) {
	var B = parseInt(readline());
	monnnais.push({
		id:i,b:B});
	total += B;
}


if(total < C)
	print('IMPOSSIBLE');
else{
	monnnaisSorted = monnnais.sort((a,b)=> a.b-b.b)
	for (var i = 0; i < N; i++) {
		var mean = Math.floor(C/(N-i));
		monnnaisSorted[i].give = Math.min(monnnaisSorted[i].b,mean)
		C -= monnnaisSorted[i].give;
	}
	// monnnaisSorted = monnnaisSorted.sort((a,b)=> a.id-b.id)
	for (var i = 0; i < N; i++) {
		print(monnnaisSorted[i].give)
	}
}