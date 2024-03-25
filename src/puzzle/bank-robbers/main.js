/**
 * Auto-generated code below aims at helping you parse
 * the standard input according to the problem statement.
 **/

class Vault{
	constructor(C,N){
		this.voyels = C - N;
		this.digits = N;
		this.time = Math.pow(10,this.digits) *  Math.pow(5,this.voyels) ;
		this.remainedTime = this.time;
	}
}

var Vaults = []
var time = 0;

var R = parseInt(readline());
var V = parseInt(readline());
for (var i = 0; i < V; i++) {
	var inputs = readline().split(' ');
	var C = parseInt(inputs[0]);
	var N = parseInt(inputs[1]);
	Vaults.push(new Vault(C,N));
}

while(Vaults.length > 0) {

	var min = Vaults[0].remainedTime
	for (var i = 0; i < R; i++) {
		if(Vaults[i]) {
			if( min > Vaults[i].remainedTime)
			{
				min = Vaults[i].remainedTime;
			}
		}
	}
	time += min;
	for (var i = 0; i < R; i++) {
		if(Vaults[i]) {
			Vaults[i].remainedTime -= min;
		}
	}
	for (var i = R-1; i >= 0 ; i--) {
		if(Vaults[i]) {
			if(Vaults[i].remainedTime == 0) {
				Vaults.splice(i,1);
			}
		}
	}
}

print(time);