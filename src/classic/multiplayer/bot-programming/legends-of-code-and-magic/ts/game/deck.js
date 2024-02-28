import { CardType } from './cards/card-type';
export class Deck {
    constructor() {
        this.cards = [];
        this.cached = [];
        this.cards = [];
    }
    get nbCard() {
        return this.cards.length;
    }
    get nbCreature() {
        return this.cards.filter(x => x.type === CardType.CREATURE).length;
    }
    get nbGuardCreature() {
        return this.cards.filter(x => x.type === CardType.CREATURE && x.hasGuard).length;
    }
    get nbGreen() {
        return this.cards.filter(x => x.type === CardType.GREEN).length;
    }
    get nbRed() {
        return this.cards.filter(x => x.type === CardType.RED).length;
    }
    get nbBlue() {
        return this.cards.filter(x => x.type === CardType.BLUE).length;
    }
    getCards() {
        return this.cards;
    }
    push(card) {
        this.cards.push(card);
    }
    toString() {
        return 'creature=' + this.nbCreature +
            ' green=' + this.nbGreen +
            ' red=' + this.nbRed +
            ' blue=' + this.nbBlue;
    }
    filter(func) {
        return this.cards.filter(func);
    }
    save() {
        this.cached = this.cards.slice(0);
        this.cached.forEach((card) => card.save());
    }
    load() {
        this.cards = this.cached.slice(0);
        this.cards.forEach((card) => card.load());
    }
}
