import {Action} from '../action';
import {Player} from '../game/player';
import {GameState} from '../game-state';

export interface IAInterface {
  availableAction(gameState: GameState, player: Player): Array<Array<Action>>;
}
