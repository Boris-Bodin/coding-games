var ROUNDS = parseInt(readline());
var CASH = parseInt(readline());
for (var i = 0; i < ROUNDS; i++) {
	var PLAY = readline().split(" ");
	var bet = Math.ceil(CASH/4);
	CASH -= bet
	if(PLAY[1] == "PLAIN"){
		if(PLAY[0] === PLAY[2]) {
			CASH += bet*36
		}
	}
	if(PLAY[1] == "EVEN"){
		if(parseInt(PLAY[0])%2 === 0 && PLAY[0] !== '0') {
			CASH += bet*2
		}
	}
	if(PLAY[1] == "ODD"){
		if(parseInt(PLAY[0])%2 === 1 || PLAY[0] === '0') {
			CASH += bet*2
		}
	}
}

print(CASH);