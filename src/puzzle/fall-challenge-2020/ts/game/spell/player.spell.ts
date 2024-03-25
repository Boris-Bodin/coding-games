import {Spell} from './spell';
import {Player} from '../player';
import {TomeSpell} from './tome.spell';

export class PlayerSpell extends Spell {
  public active = true;

  public repeatable = false;
  public owner: Player;

  constructor(player: Player, tomeSpell?: TomeSpell) {
    super();
    this.owner = player;

    if (tomeSpell) {
      this.recipe = tomeSpell.recipe;
      this.repeatable = tomeSpell.repeatable;
    }
  }

  public update(inputs: string[]) {
    super.update(inputs);
    this.active = inputs[9] !== '0';
    this.repeatable = inputs[10] !== '0';
  }

  save() {
    super.save();
    this.cached[6] = this.active;
    this.cached[7] = this.repeatable;
  }

  load() {
    super.load();
    this.active = this.cached[6];
    this.repeatable = this.cached[7];
  }
}
