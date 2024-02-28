import {Spell} from './spell';

export class TomeSpell extends Spell {
  public repeatable: boolean;
  public taxCount: number;
  public tomeIndex: any;


  public update(inputs: string[]) {
    super.update(inputs);
    this.tomeIndex = parseInt(inputs[7], 10);
    this.taxCount = parseInt(inputs[8], 10);
    this.repeatable = inputs[10] !== '0';
  }

  public save() {
    super.save();
    this.cached[4] = this.tomeIndex;
    this.cached[5] = this.taxCount;
    this.cached[7] = this.repeatable;
  }

  public load() {
    super.load();
    this.tomeIndex = this.cached[4];
    this.taxCount = this.cached[5];
    this.repeatable = this.cached[7];
  }
}
