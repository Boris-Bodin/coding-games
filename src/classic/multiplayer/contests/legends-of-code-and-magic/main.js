
class Deck{
	constructor(){
		this.cards = [];
	}

	push(card){
		this.cards.push(card);
	}

	size(){
		return this.cards.length;
	}

	debug(){
		printErr('-------------------------');
		this.cards.forEach(card => card.debug());
		printErr('-------------------------');
	}
}

class Card{
	constructor(){
	}

	update(){
		var inputs = readline().split(' ');
		this.cardNumber = parseInt(inputs[0]);
		this.instanceId = parseInt(inputs[1]);
		this.location = parseInt(inputs[2]);
		this.type = parseInt(inputs[3]);
		this.cost = parseInt(inputs[4]);
		this.attack = parseInt(inputs[5]);
		this.defense = parseInt(inputs[6]);
		this.abilities = inputs[7];
		this.myHealthChange = parseInt(inputs[8]);
		this.opponentHealthChange = parseInt(inputs[9]);
		this.cardDraw = parseInt(inputs[10]);
	}

	value(){
		var value = 0;

		if(this.hasCharge) value++;
		if(this.hasGuard) value++;
		if(this.hasBreakthrough) value++;

		value += (this.attack + this.defense) /this.mana;

		value += this.myHealthChange;
		value += this.opponentHealthChange;
		//value -= this.cardDraw;

		return value;
	}

	hasCharge(){
		return this.abilities.includes('C');
	}

	hasGuard(){
		return this.abilities.includes('G');
	}

	hasBreakthrough(){
		return this.abilities.includes('B');
	}

	toString(){
		return ' '+ this.cardNumber + ' '+ this.instanceId + ' '+ this.location + ' '+ this.type + ' ' + this.cost + ' ' + this.attack + '/' + this.defense ;
	}

	debug(){
		printErr(this.toString());
	}
}

class Player{

	constructor(id){
		this.id = id;
		this.deck = new Deck();
		this.hand = [];
		this.board = [];
	}

	update(){
		this.hand = [];
		this.board = [];
		var inputs = readline().split(' ');
		this.health = parseInt(inputs[0]);
		this.mana = parseInt(inputs[1]);
		this.deckSize = parseInt(inputs[2]);
		this.rune = parseInt(inputs[3]);
		if(this.id == 1)
			this.handSize = parseInt(readline());
	}

	add(card){
		if(card.location === 0) this.hand.push(card);
		else this.board.push(card);
	}

	pickDraft(){
		var idBest = 0;
		for (var i = 1; i < this.hand.length; i++) {
			if(this.hand[i].value() == this.hand[idBest].value())
				idBest = i;
		}
		if(idBest != -1) {
			this.deck.push(this.hand[idBest]);
			print('PICK ' + idBest );
		} else {
			print('PASS');
		}
	}

	play(){
		var out = '';

		player1.board = player1.board.sort((a, b) => b.attack - a.attack);
		player2.board = player2.board.sort((a, b) => {
			if(a.hasGuard()&& b.hasGuard()) return 0;
			if(a.hasGuard()) return -1;
			if(b.hasGuard()) return 1;

			return b.defense - a.defense;
		});

		if(this.board.length < 6){
			out += this.summon();
		}

		out += this.fight();

		if(out !== '')
			out = out.substr(0, out.length-1);

		if(out !== '')
			print(out);
		else
			print('PASS');
	}

	summon(){
		var out = '';
		var currentMana = this.mana;
		var plateauSize = this.board.length;
		for (var i = 0; i < this.hand.length; i++) {
			if(this.hand[i].cost <= currentMana){
				out += 'SUMMON ' + this.hand[i].instanceId + ' ;';
				currentMana -= this.hand[i].cost;
				if(this.hand[i].hasCharge())
					this.board.push(this.hand[i]);
				plateauSize++;
				if(plateauSize > 6)
					break;
			}
		}
		return out;
	}

	fight(){
		var out = '';
		var currentMana = this.mana;
		var attackerLeft = this.board.length;
		var i =0;
		for (i = 0; i < player2.board.length; i++) {
			while(player2.board[i].defense > 0 && player2.board[i].hasGuard() && attackerLeft > 0 ) {
				var index = 0;
				if(!this.board[index].hasBreakthrough()) {
					for (var j = 0; j < this.board.length; j++) {
						if(player2.board[i].defense <= this.board[j].attack){
							index = j;
						}
					}
				}
				out += 'ATTACK ' + this.board[index].instanceId + ' ' + player2.board[i].instanceId +' Vlam ;';
				player2.board[i].defense -= this.board[index].attack;
				attackerLeft--;
				this.board.splice(index,1);
			}
		}
		for (i = 0; i < this.board.length; i++) {
			out += 'ATTACK ' + this.board[i].instanceId + ' -1 hihi ;';
		}
		return out;
	}
}

var gameState = "DRAFT";
var player1 = new Player(1);
var player2 = new Player(2);
// game loop
while (true) {
	player1.update();
	player2.update();

	var cardCount = parseInt(readline());
	for (var i = 0; i < cardCount; i++) {
		var card = new Card();
		card.update();
		if(card.location == -1) player2.add(card);
		else player1.add(card);
	}

	if(player1.deck.size() == 30)
		gameState = "BATTLE";

	if(gameState === "DRAFT")
		player1.pickDraft();
	else
		player1.play();
}