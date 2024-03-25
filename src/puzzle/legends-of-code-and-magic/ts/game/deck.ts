/**********************
 * Class              *
 **********************/
import { Card } from './cards/card';
import { CardType } from './cards/card-type';

export class Deck {

    private cards: Array<Card> = [];
    private cached: any = [];

    public get nbCard(): number {
        return this.cards.length;
    }

    public get nbCreature(): number {
        return this.cards.filter(x => x.type === CardType.CREATURE).length;
    }

    public get nbGuardCreature(): number {
        return this.cards.filter(x => x.type === CardType.CREATURE && x.hasGuard).length;
    }

    public get nbGreen(): number {
        return this.cards.filter(x => x.type === CardType.GREEN).length;
    }

    public get nbRed(): number {
        return this.cards.filter(x => x.type === CardType.RED).length;
    }

    public get nbBlue(): number {
        return this.cards.filter(x => x.type === CardType.BLUE).length;
    }

    constructor() {
        this.cards = [];
    }

    public getCards(): Array<Card> {
        return this.cards;
    }

    public push(card: Card) {
        this.cards.push(card);
    }

    public toString(): string {
        return 'creature=' + this.nbCreature +
            ' green=' + this.nbGreen +
            ' red=' + this.nbRed +
            ' blue=' + this.nbBlue;
    }

    public filter(func: (x: Card) => boolean): Array<Card> {
        return this.cards.filter(func);
    }

    public save() {
        this.cached = this.cards.slice(0);
        this.cached.forEach((card: Card) => card.save());
    }

    public load() {
        this.cards = this.cached.slice(0);
        this.cards.forEach((card: Card) => card.load());
    }
}
