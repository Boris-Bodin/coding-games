import { Card } from './card';

export class BlueCard extends Card {

    public value(): number {
        const value = -100;
        return value;
    }
}
