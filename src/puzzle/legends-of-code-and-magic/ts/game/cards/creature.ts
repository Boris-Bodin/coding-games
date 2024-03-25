import { Card } from './card';
import { CardType } from './card-type';

export class CreatureCard extends Card {

    public canUse(object: Card): boolean {
        if (object.type === CardType.GREEN) {
            return object.abilities.length  === 0
                ? true
                : this.abilities.every(x => object.abilities.indexOf(x) === -1);
        } else if (object.type === CardType.RED) {
            return object.abilities.length  === 0
                ? true
                : this.abilities.some(x => object.abilities.indexOf(x) !== -1);
        }
    }

    public value(): number {
        if (this.hasLethal && this.hasCharge) {
          //  return 1000;
        }
        if (this.hasLethal) {
          //  return 200;
        }
        return super.value();
    }
}
