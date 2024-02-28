import {Spell} from './spell';

export class DeliverySpell extends Spell {

  public score: number;

  public update(inputs: string[]) {
    super.update(inputs);
    this.score = parseInt(inputs[6], 10);
  }

  save() {
    super.save();
    this.cached[3] = this.score;
  }

  load() {
    super.load();
    this.score = this.cached[3];
  }
}
