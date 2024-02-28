import {Action} from '../action';
import {ActionType} from '../actionType';
import {Player} from '../game/player';
import {IAInterface} from './ia-interface';
import {GameState} from '../game-state';

export class AdvancedIA implements IAInterface {
  public availableAction(gameState: GameState, player: Player): Array<Array<Action>> {
    return [[new Action(ActionType.REST)]].concat(gameState.getPotions().filter(c => player.canDelivery(c))
                                                    .sort((a, b) => b.value() - a.value())
                                                    .map(c => [new Action(ActionType.BREW, c.id)]))
                                   .concat(player.getSpells().filter(spell => player.canCast(spell, 1))
                                                 .sort((a, b) => b.value() - a.value())
                                                 .map(c => {
                                                   if (!c.repeatable) {
                                                     return [new Action(ActionType.CAST, c.id)];
                                                   } else {
                                                     return [new Action(ActionType.CAST, c.id, 1)];
                                                   }
                                                 }))
                                   .concat([]);

  }
}
