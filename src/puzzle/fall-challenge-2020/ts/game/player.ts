import {GameState} from '../game-state';
import {PlayerSpell} from './spell/player.spell';
import {DeliverySpell} from './spell/delivery.spell';
import {Recipe} from './spell/recipe';
import {TomeSpell} from './spell/tome.spell';

export class Player {

  [action: string]: any;

  public score: number;
  public deliveriesCount = 0;
  public inventory = new Recipe();
  public spells: Map<number, PlayerSpell> = new Map<number, PlayerSpell>();
  public opponent: Player;

  private cached: any[] = [];

  constructor(protected gameState: GameState) {
  }

  public getSpell(id: number): PlayerSpell {
    return this.spells.get(id);
  }

  getSpells() {
    return Array.from(this.spells.values());
  }

  public reset() {
    this.spells.clear();
  }

  public update() {
    const inputs: string[] = readline().split(' ');
    this.inventory = new Recipe(
      parseInt(inputs[0], 10), // tier-0 ingredients in inventory
      parseInt(inputs[1], 10),  // tier-1 ingredients in inventory
      parseInt(inputs[2], 10), // tier-2 ingredients in inventory
      parseInt(inputs[3], 10) // tier-3 ingredients in inventory
    );
    this.score = parseInt(inputs[4], 10); // amount of rupees
  }

  public save() {
    this.cached[0] = this.score;
    this.cached[1] = this.inventory.delta.slice(0);
    this.cached[2] = this.deliveriesCount;

    this.getSpells().forEach(value => value.save());
    this.cached[3] = Array.from(this.spells.entries()).slice(0);
  }

  public load() {
    this.score = this.cached[0];
    this.inventory.delta = this.cached[1].slice(0);
    this.deliveriesCount = this.cached[3];
    this.spells = new Map();
    for (let i = 0; i < this.cached[3].length; i++) {
      const entry = this.cached[3][i];
      this.spells.set(entry[0], entry[1]);
    }
    this.getSpells().forEach(value => value.load());
  }

  learn(id?: number) {
    if (id == null) {
      return false;
    }
    const command = this.gameState.getTome(id);
    if (!this.canLearn(command)) {
      return false;
    }
    return this._learn(id);
  }

  public canLearn(tomeSpell: TomeSpell) {
    const index = this.gameState.getTomeIndexOf(tomeSpell);
    if (this.inventory.delta[0] < index) {
      return false;
    }
    return true;
  }

  public _learn(id: number) {
    const tomeSpell: TomeSpell = this.gameState.getTome(id);

    const index = this.gameState.getTomeIndexOf(tomeSpell);
    for (let i = 0; i < index; ++i) {
      this.gameState.tomeStockGain[i] += 1;
      this.inventory.delta[0] -= 1;
    }

    const maxToGet = 10 - this.inventory.getTotal();
    const ingredientsGot = Math.min(maxToGet, tomeSpell.taxCount);
    this.inventory.add(0, ingredientsGot);

    this.spells.set(id, new PlayerSpell(this, tomeSpell));
    return true;
  }

  cast(id?: number, count?: number) {
    if (id == null) {
      return false;
    }
    count = count || 1;
    const spell = this.getSpell(id);
    if (spell == null || !this.canCast(spell, count)) {
      return false;
    }

    return this._cast(id, count);
  }

  canCast(spell: PlayerSpell, count: number) {
    if (count < 1) {
      return false;
    }
    if (count > 1 && !spell.repeatable) {
      return false;
    }
    if (!spell.active) {
      return false;
    }
    if (!this.canAfford(spell.recipe, count)) {
      return false;
    }
    if (!this.enoughSpace(spell.recipe, count)) {
      return false;
    }

    return true;
  }

  public canAfford(recipe: Recipe, count: number): boolean {
    for (let i = 0; i < recipe.delta.length; i++) {
      if (this.inventory.delta[i] + recipe.delta[i] * count < 0) {
        return false;
      }
    }
    return true;
  }

  public enoughSpace(recipe: Recipe, count: number): boolean {
    return recipe.getTotal() * count + this.inventory.getTotal() <= 10;
  }

  public _cast(id: number, count: number) {
    const spell = this.getSpell(id);
    for (let i = 0; i < spell.recipe.delta.length; i++) {
      this.inventory.add(i, (spell.recipe.delta[i] * count));
    }
    if (!spell.repeatable) {
      spell.active = false;
    }
    return true;
  }

  delivery(id?: number) {
    if (id == null) {
      return false;
    }
    const potion = this.gameState.getPotion(id);
    if (!this.canDelivery(potion)) {
      return false;
    }

    return this._delivery(id);
  }

  canDelivery(potion: DeliverySpell) {
    for (let i = 0; i < potion.recipe.delta.length; i++) {
      if (this.inventory.delta[i] + potion.recipe.delta[i] < 0) {
        return false;
      }
    }
    return true;
  }

  public _delivery(id: number) {
    const deliverySpell = this.gameState.getPotion(id);
    for (let i = 0; i < deliverySpell.recipe.delta.length; i++) {
      this.inventory.add(i, deliverySpell.recipe.delta[i]);
    }
    this.score += this.getScoreOf(deliverySpell);
    this.deliveriesCount++;

    return true;
  }

  rest() {
    return !this.canRest() ? false : this._rest();
  }

  canRest() {
    return this.getSpells().some(spell => !spell.active);
  }

  private _rest() {
    this.getSpells().forEach(x => x.active = true);
    return true;
  }

  wait() {
    return this._wait();
  }

  private _wait() {
    return true;
  }

  private getScoreOf(delivery: DeliverySpell) {
    return delivery.score + this.gameState.getBonusScore(delivery);
  }
}
