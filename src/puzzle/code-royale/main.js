/****************
 * Cosntant
 * *************/

MOVE = 'MOVE';
BUILD = 'BUILD';
WAIT = 'WAIT';
TRAIN = 'TRAIN';

MINE = 'MINE';
TOWER = 'TOWER';
BARRACK = 'BARRACK';

STRUCTURETYPE = {
	'0': 'MINE',
	'1': 'TOWER',
	'2': 'BARRACK',
	'MINE':'0',
	'TOWER':'1',
	'BARRACK':'2'
}

KNIGHT = 'KNIGHT';
ARCHER = 'ARCHER';
GEANT = 'GEANT';

UNITSTYPE = {
	'0': 'KNIGHT',
	'1': 'ARCHER',
	'2': 'GEANT',
	'KNIGHT':'0',
	'ARCHER':'1',
	'GEANT':'2'
}


/****************
 * Class
 * *************/

class Site{

	constructor(){
		var inputs = readline().split(' ');
		this.siteId = parseInt(inputs[0]);
		this.x = parseInt(inputs[1]);
		this.y = parseInt(inputs[2]);
		this.radius = parseInt(inputs[3]);
		Sites[this.siteId] = this;
	}

	static Update(){
		var inputs = readline().split(' ');
		var site = Sites[ parseInt(inputs[0])];
		site.ignore1 = parseInt(inputs[1]);
		site.ignore2 = parseInt(inputs[2]);
		site.structureType = parseInt(inputs[3]);
		site.owner = parseInt(inputs[4]);
		site.param1 = parseInt(inputs[5]);
		site.param2 = parseInt(inputs[6]);
	}

	static OfPlayer(id){
		return Site.Sites.filter(x => x.owner == id);
	}

	static get Sites(){
		return Object.values(Sites);
	}

	static OfType(type){
		return Site.Sites.filter(x => x.structureType == type);
	}

	static OfPlayerAndType(id,type){
		return Site.Sites.filter(x => x.owner == id && x.structureType == type);
	}

	static TowerOpponentRanged(x,y){
		var id = -1;
		var distance = 3000*3000;
		Site.OfPlayerAndType(1,STRUCTURETYPE[TOWER]).forEach((site) => {
			var tmp = site.distanceTo(x,y);
			if(tmp < distance){
				id = site.siteId;
				distance = tmp;
			}
		});

		return id;
	}

	static Nearest(x,y){
		var id = -1;
		var distance = 3000*3000;
		Site.Sites.forEach((site) => {
			var tmp = site.distanceTo(x,y);
			if(tmp < distance){
				id = site.siteId;
				distance = tmp;
			}
		});

		return id;
	}

	static NearestEmpty(x,y){
		var id = -1;
		var distance = 3000*3000;
		Site.OfPlayer(-1).forEach((site) => {
			var tmp = site.distanceTo(x,y);
			if(tmp < distance){
				id = site.siteId;
				distance = tmp;
			}
		});

		return id;
	}
	static NearestUpgradableOfType(x,y,type) {
		var id = -1;
		var distance = 3000*3000;
		Site.OfPlayerAndType(0,type).forEach((site) => {
			var tmp = site.distanceTo(x,y);
			if(tmp < distance){
				id = site.siteId;
				distance = tmp;
			}
		});

		return id;
	}

	distanceTo(x,y){
		return (this.x - x)*(this.x - x) + (this.y - y)*(this.y - y);
	}
}

class Player{

	constructor(){
		this.queen = new Queen();
	}

	Update(){
		var inputs = readline().split(' ');
		this.queen.gold = parseInt(inputs[0]);
		this.queen.touchedSite = parseInt(inputs[1]);
	}

	static UpdateUnits(){
		Players[0].units = [];
		Players[1].units = [];

		var numUnits = parseInt(readline());
		for (var i = 0; i < numUnits; i++) {
			var inputs = readline().split(' ');
			var x = parseInt(inputs[0]);
			var y = parseInt(inputs[1]);
			var owner = parseInt(inputs[2]);
			var unitType = parseInt(inputs[3]); // -1 = QUEEN, 0 = KNIGHT, 1 = ARCHER
			var health = parseInt(inputs[4]);
			if(unitType == -1){
				Players[owner].queen.Update(x,y,health);
			} else {
				Players[owner].units.push(new UnitsType[unitType](x,y,health));
			}
		}

	}

	Loop (){
		this.queen.Process();
		this.Train();
	}

	Train(){
		var barracks = Object.values(Sites).filter((x) => x.owner === 0 && x.structureType === 2);
		var trainBarracks = barracks.slice(0, Math.floor(this.queen.gold/80)).map(x => x.siteId);

		print(['TRAIN'].concat(trainBarracks).join(' '));
	}
}

class Queen{

	constructor(){
	}

	Update(x,y,health){
		this.x = x;
		this.y = y;
		this.health = health;
	}

	Process(){
		if(this.touchedSite !== -1){
			if(this.ChooseBuilding()) return;
		}
		if(this.Move()) return;

		print(['WAIT'].join(' '));
	}

	ChooseBuilding(){
		var site = Sites[this.touchedSite];
		if(site.owner === 0) return false;
		var structureType = this.NeedBuilding();
		if(structureType == -1) structureType = this.NeedUpgradables();

		switch(structureType){
			case TOWER:
				print(['BUILD', this.touchedSite, TOWER].join(' '));
				break;
			case MINE:
				print(['BUILD', this.touchedSite, MINE].join(' '));
				break;
			case BARRACK:
				var unitsType = 0;
				print(['BUILD', this.touchedSite, 'BARRACKS-' + UnitsType[unitsType].type].join(' '));
				break;
			default:
				return false;
		}
		return true;
	}

	Move(){
		if(this.NearestOpponentUnit() < 200*200){
			print(['BUILD',Site.NearestUpgradableOfType(this.x,this.y,STRUCTURETYPE[TOWER]),TOWER].join(' '));
			return true;
		}
		if(Site.TowerOpponentRanged() !== -1){
			print(['MOVE',0,0].join(' '));
			return true;
		}
		/* if(this.touchedSite !== -1){
			 print(['WAIT'].join(' '));
			 return true;
		 }*/
		var id = -1;
		if(this.NeedBuilding() != -1)
			id = Site.NearestEmpty(this.x,this.y);
		else
			id = Site.NearestUpgradableOfType(this.x,this.y,this.NeedUpgradables());
		if(id > -1){
			var site = Sites[id];
			print(['MOVE',site.x,site.y].join(' '));
			return true;
		}

		return false;
	}

	NearestOpponentUnit(){
		var distance = 3000*3000;
		Players[1].units.forEach((unit) => {
			var tmp = (this.x - unit.x)*(this.x - unit.x) + (this.y - unit.y)*(this.y - unit.y)
			if(tmp < distance){
				distance = tmp;
			}
		});

		return distance;
	}

	NeedUpgradables() {
		return Site.OfPlayer(0).sort((a,b) => b.param1 - a.param1)[0].structureType;
	}

	NeedBuilding(){
		if(Site.OfPlayerAndType(0,STRUCTURETYPE[BARRACK]).length < 1) return BARRACK;
		if(Site.OfPlayerAndType(0,STRUCTURETYPE[MINE]).length < 2) return MINE;
		if(Site.OfPlayerAndType(0,STRUCTURETYPE[TOWER]).length < 2) return TOWER;
		if(Site.OfPlayerAndType(0,STRUCTURETYPE[MINE]).length < 4) return MINE;
		return TOWER;
	}
}

class Knight{

	constructor(x,y,health){
		this.x = x;
		this.y = y;
		this.health = health;
	}
}
Knight.cost = 100;
Knight.type = 'KNIGHT';

class Archer{

	constructor(x,y,health){
		this.x = x;
		this.y = y;
		this.health = health;
	}
}
Archer.cost = 100;
Archer.type = 'ARCHER';

class Giant{

	constructor(x,y,health){
		this.x = x;
		this.y = y;
		this.health = health;
	}
}
Giant.cost = 140;
Giant.type = 'GIANT';

/****************
 * Global
 * *************/

var Sites = {};
var Players = [new Player(), new Player()];
var PlayersOne = Players[0];
var UnitsType = [Knight, Archer, Giant];

/****************
 * Main
 * *************/


var numSites = parseInt(readline());
for (var i = 0; i < numSites; i++) {
	new Site();
}


while (true) {
	PlayersOne.Update();
	for (var i = 0; i < numSites; i++) {
		Site.Update();
	}
	Player.UpdateUnits();

	PlayersOne.Loop();
}