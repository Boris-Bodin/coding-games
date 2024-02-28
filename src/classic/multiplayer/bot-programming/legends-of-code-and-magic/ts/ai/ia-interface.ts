import { Action } from '../action';
import { Player } from '../game/player';

export interface IAInterface {

    draft(_myPlayer: Player): Array<Action>;

    summon(player: Player): Array<Array<Action>>;

    useItems(player: Player): Array<Array<Action>>;

    fightOther(player: Player): Array<Array<Action>>;

    fightGuard(player: Player): Array<Array<Action>>;
}
