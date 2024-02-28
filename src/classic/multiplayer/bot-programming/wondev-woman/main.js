/**********************
 * Constant
 *********************/

var MoveAndBuild = 'MOVE&BUILD';
var PushAndBuild = 'PUSH&BUILD';
var CountLoop = 0;

/**********************
 * Class
 *********************/

class Map{
	constructor(){
	}

	InitMap(){
		this.map = [];
		for (var i = 0; i < MapSize; i++) {
			this.map.push([]);
			var row = readline();
			for (var j = 0; j < MapSize; j++) {
				this.map[i].push(new Cell(row[j]));
			}
		}
	}

	GetLevel(position){
		return this.map[position.y][position.x].level;
	}

	Debug() {
		var str = "";
		for (var i = 0; i < MapSize; i++) {
			for (var j = 0; j < MapSize; j++) {
				str += this.map[i][j].ToString() + " ";
			}
			str += "\n\r";
		}
		printErr(str);
	}
}

class Cell{
	constructor(level){
		this.level = parseInt(level);
	}

	ToString() {
		return "" + this.level;
	}
}

class Position{
	constructor(x,y){
		this.x = x;
		this.y = y;
	}

	GetDir(direction){
		switch(direction){
			case 'N' :  return new Position(this.x  ,this.y-1);
			case 'NE' : return new Position(this.x+1,this.y-1);
			case 'E' :  return new Position(this.x+1,this.y  );
			case 'SE' : return new Position(this.x+1,this.y+1);
			case 'S' :  return new Position(this.x  ,this.y+1);
			case 'SW' : return new Position(this.x-1,this.y+1);
			case 'W' :  return new Position(this.x-1,this.y  );
			case 'NW' : return new Position(this.x-1,this.y-1);
		}
	}

	ToString() {
		return "(" + this.x + ", " + this.y + ")";
	}
}


class Player{
	constructor(){
	}

	InitPos(){
		this.units = [];
		for (var i = 0; i < UnitsPerPlayer; i++) {
			var inputs = readline().split(' ');
			this.units.push(new Position(parseInt(inputs[0]),parseInt(inputs[1])));
		}
	}

	GetPosition(index){
		return this.units[index];
	}

	Debug() {
		printErr(this.units.length + " " + this.units.map(x => x.ToString()).join(' '))
	}
}

class Action{
	constructor(level){
		this.level = level;
	}

	InitAction(){
		var inputs = readline().split(' ');
		this.atype = inputs[0];
		this.index = parseInt(inputs[1]);
		this.dir1 = inputs[2];
		this.posDir1 = playerOne.GetPosition(this.index).GetDir(this.dir1);
		this.levelDir1 = map.GetLevel(this.posDir1)
		this.dir2 = inputs[3];
		this.posDir2 = this.posDir1.GetDir(this.dir2);
		this.levelDir2 = map.GetLevel(this.posDir2)
	}

	IsType(type){
		return this.atype === type;
	}

	Print() {
		print(this.atype + " " + this.index + " " + this.dir1 + " " + this.dir2)
	}
	Debug() {
		printErr(this.atype + " " + this.index + " " + this.dir1 + " " + this.posDir1.ToString() + "-" + this.levelDir1 + " " + this.dir2 + " " + this.posDir2.ToString()+ "-" + this.levelDir2)
	}
}

/**********************
 * Global
 *********************/

var MapSize = parseInt(readline());
printErr(MapSize)
var UnitsPerPlayer = parseInt(readline());
var map = new Map();

var playerOne = new Player();
var playerTwo = new Player();

/**********************
 * LamdaFunction
 *********************/

function sortByTargetLevel() {
	return function(action1,action2) {
		level1 = map.GetLevel(playerOne.GetPosition(action1.index))
		level2 = map.GetLevel(playerOne.GetPosition(action2.index))
		if(action1.levelDir2 === 3 && action2.levelDir2 === 3) {
			return 0
		}
		if(action1.levelDir2 === 3) {
			return 1
		}
		if(action2.levelDir2 === 3) {
			return -1
		}
		if(action1.levelDir2 > level1+1 && action2.levelDir2 > level2+1){
			return 0
		}
		if(action1.levelDir2 > level1+1){
			return 1
		}
		if(action2.levelDir2 > level2+1){
			return -1
		}
		return action2.levelDir2 - action1.levelDir2;
	}
}

function IsType(type) {
	return function (action) {
		return action.IsType(type)
	}
}

function SortByLevelDir1() {
	return function (action1, action2) {
		return action2.levelDir1 - action1.levelDir1;
	}
}

function FilterByLevelDir1(level) {
	return function (action) {
		return action.levelDir1 === level;
	}
}

/**********************
 * Main
 *********************/

debug = false;

// game loop
while (true) {
	map.InitMap();
	playerOne.InitPos();
	playerTwo.InitPos();
	var legalActions = parseInt(readline());
	actions = []
	for (var i = 0; i < legalActions; i++) {
		var action = new Action();
		action.InitAction()
		actions.push(action);
		debug && action.Debug();
	}

	debug && map.Debug();
	debug && playerOne.Debug();
	debug && playerTwo.Debug();
	var actionSorted = actions
		.filter(IsType(PushAndBuild))
		.filter((a => a.levelDir1 >= 2 && a.levelDir2 <= 0) || (a => a.levelDir1 >= 3 && a.levelDir2 <= 1));

	if(actionSorted.length > 0) {
		actionSorted[0].Print();
		debug && actionSorted[0].Debug();
		continue;
	}

	actionSorted = actions
		.filter(IsType(MoveAndBuild))
		.sort(SortByLevelDir1());
	actionSorted = actionSorted
		.filter(FilterByLevelDir1(actionSorted[0].levelDir1))
		.sort(sortByTargetLevel());

	for (var i = 0; i < legalActions; i++) {
		debug && actionSorted[i].Debug()
	}
	actionSorted[0].Print();
	debug && actionSorted[0].Debug();
	CountLoop++;
}
