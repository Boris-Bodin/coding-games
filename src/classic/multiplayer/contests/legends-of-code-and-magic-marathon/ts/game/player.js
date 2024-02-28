import { CardFactory } from './cards/card-factory';
import { CardType } from './cards/card-type';
import { Deck } from './deck';
export class Player {
    constructor(gameState) {
        this.gameState = gameState;
        this.deck = new Deck();
        this.hand = [];
        this.board = [];
        this.cached = [];
    }
    update(isOpponent = false) {
        this.hand = [];
        this.board = [];
        const inputs = readline().split(' ');
        this.health = parseInt(inputs[0], 10);
        this.cristal = parseInt(inputs[1], 10);
        this.deckSize = parseInt(inputs[2], 10);
        this.rune = parseInt(inputs[3], 10);
        if (isOpponent) {
            this.handSize = parseInt(readline(), 10);
        }
        this.nextTurnDraw = 1;
    }
    updateCard(inputs) {
        const cardNumber = parseInt(inputs[0], 10);
        const instanceId = parseInt(inputs[1], 10);
        const type = parseInt(inputs[3], 10);
        const cards = this.deck.filter((x) => x.cardNumber === cardNumber);
        let card = cards.find(x => x.instanceId === instanceId);
        if (card == null) {
            card = cards.find(x => x.instanceId === -1) || CardFactory.create(type);
        }
        card.cardNumber = cardNumber;
        card.instanceId = instanceId;
        card.location = parseInt(inputs[2], 10);
        card.type = type;
        card.cost = parseInt(inputs[4], 10);
        card.attack = parseInt(inputs[5], 10);
        card.defense = parseInt(inputs[6], 10);
        card.abilities = inputs[7].split('');
        card.myHealthChange = parseInt(inputs[8], 10);
        card.opponentHealthChange = parseInt(inputs[9], 10);
        card.cardDraw = parseInt(inputs[10], 10);
        if (card.location === 0) {
            this.hand.push(card);
        }
        else {
            this.board.push(card);
        }
    }
    save() {
        this.cached[1] = this.health;
        this.cached[2] = this.cristal;
        this.cached[3] = this.rune;
        this.cached[4] = this.handSize;
        this.cached[5] = this.deckSize;
        this.cached[6] = this.hand.slice(0);
        this.cached[7] = this.board.slice(0);
        this.cached[6].forEach((card) => card.save());
        this.cached[7].forEach((card) => card.save());
        this.deck.save();
    }
    load() {
        this.deck.load();
        this.health = this.cached[1];
        this.cristal = this.cached[2];
        this.rune = this.cached[3];
        this.handSize = this.cached[4];
        this.deckSize = this.cached[5];
        this.hand = this.cached[6].slice(0);
        this.board = this.cached[7].slice(0);
        this.hand.forEach((card) => card.load());
        this.board.forEach((card) => card.load());
    }
    pick(params) {
        if (params < 0 || params > 2) {
            return false;
        }
        this.deck.push(this.hand[params]);
        return true;
    }
    summon(params) {
        const summoned = this.hand.find((card) => card.instanceId === params);
        if (summoned == null || this.cristal < summoned.cost) {
            return false;
        }
        summoned.justSummon = true;
        this.cristal -= summoned.cost;
        this.board.push(summoned);
        this.health += summoned.myHealthChange;
        this.nextTurnDraw += summoned.cardDraw;
        this.opponent.health += summoned.opponentHealthChange;
        this.hand.splice(this.hand.indexOf(summoned), 1);
        return true;
    }
    use(params, params2) {
        const item = this.hand.find((card) => card.instanceId === params);
        if (item == null || this.cristal < item.cost) {
            return false;
        }
        let creature = null;
        if (params2 === -1) {
        }
        else {
            if (item.type === CardType.GREEN) {
                creature = this.board.find((card) => card.instanceId === params2);
                if (creature == null) {
                    return false;
                }
                creature.hasCharge = creature.hasCharge || item.hasCharge;
                creature.hasBreakthrough = creature.hasBreakthrough || item.hasBreakthrough;
                creature.hasDrain = creature.hasDrain || item.hasDrain;
                creature.hasGuard = creature.hasGuard || item.hasGuard;
                creature.hasLethal = creature.hasLethal || item.hasLethal;
                creature.hasWard = creature.hasWard || item.hasWard;
            }
            else {
                creature = this.opponent.board.find((card) => card.instanceId === params2);
                if (creature == null) {
                    return false;
                }
                creature.hasCharge = creature.hasCharge && !item.hasCharge;
                creature.hasBreakthrough = creature.hasBreakthrough && !item.hasBreakthrough;
                creature.hasDrain = creature.hasDrain && !item.hasDrain;
                creature.hasGuard = creature.hasGuard && !item.hasGuard;
                creature.hasLethal = creature.hasLethal && !item.hasLethal;
                creature.hasWard = creature.hasWard && !item.hasWard;
            }
            creature.attack = Math.max(0, creature.attack + item.attack);
            if (creature.hasWard && item.defense < 0) {
                creature.hasWard = false;
            }
            else {
                creature.defense += item.defense;
            }
            this.health += item.myHealthChange;
            this.opponent.health += item.opponentHealthChange;
            this.nextTurnDraw += item.cardDraw;
        }
        this.cristal -= item.cost;
        this.hand.splice(this.hand.indexOf(item), 1);
        return true;
    }
    attack(params, params2) {
        const attacker = this.board.find((card) => card.instanceId === params);
        if (attacker == null) {
            return false;
        }
        if (params2 === -1) {
            if (this.opponent.board.some(x => x.hasGuard && x.defense > 0)) {
                return false;
            }
            this.opponent.health -= attacker.attack;
            attacker.canAttack = false;
            if (attacker.hasDrain) {
                this.health += attacker.attack;
            }
        }
        else {
            const opponent = this.opponent.board.find((card) => card.instanceId === params2);
            if (opponent == null) {
                return false;
            }
            attacker.fight(opponent, this);
        }
        return true;
    }
    end() {
        this.board = this.board.filter((card) => card.defense > 0);
        this.opponent.board = this.opponent.board.filter((card) => card.defense > 0);
    }
}
