import {Recipe} from './recipe';
import {Rule} from "../rule";
import {SpellType} from "./spell.type";

export abstract class Spell {

  public id: number;

  public recipe: Recipe;

  protected cached: Array<any> = [];

  public type: SpellType;

  constructor() {
  }

  public update(inputs: string[]) {
    this.id = parseInt(inputs[0], 10);
    this.type = (inputs[1] as any);
    this.recipe = new Recipe(
      parseInt(inputs[2], 10), // tier-0 ingredient change
      parseInt(inputs[3], 10), // tier-1 ingredient change
      parseInt(inputs[4], 10), // tier-2 ingredient change
      parseInt(inputs[5], 10) // tier-3 ingredient change
    );
  }

  public save() {
    this.cached[0] = this.id;
    this.cached[1] = this.type;
  }

  public load() {
    this.id = this.cached[0];
    this.type = this.cached[1];
  }

  value() {
    return Rule.SpellValue(this);
  }

  toString() {
    return '[' +
           [this.id, this.recipe].join(',') +
           ']';
  }

  debug() {
    printErr(this.toString());
  }
}
