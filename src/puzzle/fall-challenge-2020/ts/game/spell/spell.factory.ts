import {SpellType} from './spell.type';
import {DeliverySpell} from './delivery.spell';
import {PlayerSpell} from './player.spell';
import {TomeSpell} from './tome.spell';
import {GameState} from '../../game-state';

export class SpellFactory {

  public static create(type: SpellType, gameState: GameState) {
    switch (type) {
      case SpellType.BREW:
        return new DeliverySpell();
      case SpellType.CAST:
        return new PlayerSpell(gameState._myPlayer);
      case SpellType.OPPONENT_CAST:
        return new PlayerSpell(gameState._enemyPlayer);
      case SpellType.LEARN:
        return new TomeSpell();

    }
  }
}
