/**
 * Auto-generated code below aims at helping you parse
 * the standard input according to the problem statement.
 **/

var peoples = {};

var n = parseInt(readline());
for (var i = 0; i < n; i++) {
	var inputs = readline().split(' ');
	var x = parseInt(inputs[0]); // a relationship of influence between two people (x influences y)
	var y = parseInt(inputs[1]);
	if(peoples[x] === undefined)
	{
		peoples[x] = {
			id:x,
			rela:[]
		};
	}
	peoples[x].rela.push(y);
}

var source = [];

for(x in peoples) {
	printErr(' people ' + peoples[x].id);
	printErr('   rela ' + peoples[x].rela.join(', '));
	var found = false;
	for(y in peoples) {
		if (peoples[y].rela.indexOf(x) != -1){
			found = true;
			break;
		}
	}
	if(!found){
		source.push(peoples[x]);
	}
}

var maxLength = 0;

function parcours(people) {
	if(!people) return 1;
	var child = 0;
	people.rela.forEach(y => {
		printErr('   ' + y);
		tmp = parcours(peoples[y]);
		if(tmp > child){
			child = tmp;
		}
	});
	return  child + 1;
}

source.forEach(people => {
	printErr(' source ' +people.id);
	var tmp = parcours(people);
	if(tmp > maxLength){
		maxLength = tmp;
	}
});

print(maxLength);