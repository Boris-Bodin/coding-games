import { Card } from './card';
import { CardType } from './card-type';
export class CreatureCard extends Card {
    canUse(object) {
        if (object.type === CardType.GREEN) {
            return object.abilities.length === 0
                ? true
                : this.abilities.every(x => object.abilities.indexOf(x) === -1);
        }
        else if (object.type === CardType.RED) {
            return object.abilities.length === 0
                ? true
                : this.abilities.some(x => object.abilities.indexOf(x) !== -1);
        }
    }
    value() {
        if (this.hasLethal && this.hasCharge) {
        }
        if (this.hasLethal) {
        }
        return super.value();
    }
}
