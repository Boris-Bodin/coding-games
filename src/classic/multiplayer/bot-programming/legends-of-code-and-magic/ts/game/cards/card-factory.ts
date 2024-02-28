import { BlueCard } from './blue';
import { CardType } from './card-type';
import { CreatureCard } from './creature';
import { GreenCard } from './green';
import { RedCard } from './red';

export class CardFactory {

    public static create(type: CardType) {
        switch (type) {
            case CardType.BLUE:
                return new BlueCard();
            case CardType.CREATURE:
                return new CreatureCard();
            case CardType.GREEN:
                return new GreenCard();
            case CardType.RED:
                return new RedCard();
        }
    }
}
