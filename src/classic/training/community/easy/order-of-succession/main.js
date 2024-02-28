class People{
	constructor(name, parent, birth, death, religion, gender){
		this.name = name;
		this.parent = parent;
		this.birth = birth;
		this.death = death;
		this.religion = religion;
		this.gender = gender;
		this.children = [];
	}
}

Peoples  = [];
PeoplesDico  = {};

var n = parseInt(readline());
for (var i = 0; i < n; i++) {
	var inputs = readline().split(' ');
	var name = inputs[0];
	var parent = inputs[1];
	var birth = parseInt(inputs[2]);
	var death = inputs[3];
	var religion = inputs[4];
	var gender = inputs[5];
	PeoplesDico[name] = new People(name, parent, birth, death, religion, gender);
	Peoples.push(PeoplesDico[name]);
}

function levelOf(x){
	if(x.parent == '-') return 0;
	else return levelOf(PeoplesDico[x.parent]) + 1;
}

Peoples.forEach(x => {
	x.level = levelOf(x)
	if(x.parent != '-')
		PeoplesDico[x.parent].children.push(x);
})
function Parcour(people){
	if(people.death == '-' && people.religion != 'Catholic')
		print(people.name);
	people.children.sort(
		(a,b) => {
			if(a.gender == 'M' && b.gender == 'F') return -1
			if(a.gender == 'F' && b.gender == 'M') return 1
			return a.birth - b.birth
		}).forEach(x => Parcour(x))
}

Parcour(Peoples.filter(x => x.level == 0)[0]);