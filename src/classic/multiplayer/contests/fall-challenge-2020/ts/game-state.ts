import {Action} from './action';
import {IAInterface} from './ai/ia-interface';
import {BasicIA} from './ai/basic-ia';
import {Spell} from './game/spell/spell';
import {Player} from './game/player';
import {Solution} from './solution';
import {SpellType} from './game/spell/spell.type';
import {SpellFactory} from './game/spell/spell.factory';
import {PlayerSpell} from './game/spell/player.spell';
import {TomeSpell} from './game/spell/tome.spell';
import {DeliverySpell} from './game/spell/delivery.spell';
import {ActionType} from './actionType';
import {AdvancedIA} from './ai/advanced-ia';

export class GameState {

  public readonly _myPlayer: Player = null;
  public readonly _enemyPlayer: Player = null;

  private readonly _potions: Array<DeliverySpell> = new Array<DeliverySpell>();
  private readonly _grimoire: Array<TomeSpell> = new Array<TomeSpell>();

  private readonly _ia: IAInterface = null;
  private bonus = [4, 4];
  private bonusValue = [3, 1];
  public DELIVERY_GOAL = 6;
  public MAX_TURN = 100;
  public tomeStockGain: Array<number> = [];

  private cached: any[] = [];
  public currentLap = 0;

  constructor() {

    this._myPlayer = new Player(this);
    this._enemyPlayer = new Player(this);

    this._enemyPlayer.opponent = this._myPlayer;
    this._myPlayer.opponent = this._enemyPlayer;

    this._ia = new BasicIA();
  }

  public bootstrap() {

    do {

      this.reset();

      const actionCount: number = parseInt(readline(), 10);
      const dateStart = Date.now();

      this.updateCommand(actionCount);

      this._myPlayer.update();
      this._enemyPlayer.update();

      this.save();

      const solutions: Array<Solution> = Solution.simulate(this,
                                                           this._ia,
                                                           this._myPlayer,
                                                           dateStart);

      solutions.sort((a, b) => b.score - a.score);

      for (let i = 0; i < solutions.length; i++) {
        solutions[i].debug();
      }

      let bestSolution: Solution = solutions[0];

      this.load();

      if (bestSolution == null) {
        bestSolution = new Solution(this);
      }

      const bestAction = (bestSolution.actions.get(this._myPlayer) || [Action.Wait()]).slice(0, 1);
      this.play(this._myPlayer, bestAction);
      printErr('Nb solutions : ' + solutions.length);
      printErr('Best solution : ' + bestSolution.actions.get(this._myPlayer));
      printErr('Loop during : ' + (Date.now() - dateStart) + ' ms');
      Action.output(bestAction);

      this.end();

    } while (true);
  }

  public play(player: Player, actions: Array<Action>): boolean {
    for (let i = 0; i < actions.length; i++) {
      const action: Action = actions[i];
      switch (action.getType()) {
        case ActionType.BREW:
          if (!player.delivery(...action.getParams() as any)) {
            return false;
          }
          break;
        case ActionType.CAST:
          if (!player.cast(...action.getParams() as any)) {
            return false;
          }
          break;
        case ActionType.LEARN:
          if (!player.learn(...action.getParams() as any)) {
            return false;
          }
          break;
        case ActionType.REST:
          if (!player.rest()) {
            return false;
          }
          break;
        case ActionType.WAIT:
          if (!player.wait()) {
            return false;
          }
          break;
      }
    }

    return true;
  }

  private reset() {
    this._potions.splice(0);
    this._grimoire.splice(0);
    this._myPlayer.reset();
    this._enemyPlayer.reset();
  }

  public updateCommand(actionCount: number) {
    for (let i = 0; i < actionCount; i++) {

      const inputs: string[] = readline().split(' ');
      const actionId: number = parseInt(inputs[0], 10);
      const type = inputs[1] as SpellType;
      let spell: Spell = SpellFactory.create(type, this);

      switch (type) {
        case SpellType.BREW:
          this._potions.push(spell as any);
          break;
        case SpellType.CAST:
          if (this._myPlayer.spells.has(actionId)) {
            spell = this._myPlayer.spells.get(actionId);
          } else {
            this._myPlayer.spells.set(actionId, spell as PlayerSpell);
          }
          break;
        case SpellType.OPPONENT_CAST:
          if (this._enemyPlayer.spells.has(actionId)) {
            spell = this._enemyPlayer.spells.get(actionId);
          } else {
            this._enemyPlayer.spells.set(actionId, spell as PlayerSpell);
          }
          break;
        case SpellType.LEARN:
          this._grimoire.push(spell as any);
          break;

      }
      spell.update(inputs);
    }
  }

  public load() {
    this._myPlayer.load();
    this._enemyPlayer.load();
    this._potions.forEach(value => value.load());
    this._grimoire.forEach(value => value.load());
    this.bonus = this.cached[0].slice(0);
    this.bonusValue = this.cached[1].slice(0);
    this.tomeStockGain = this.cached[2].slice(0);
  }

  private save() {
    this._myPlayer.save();
    this._enemyPlayer.save();
    this._potions.forEach(value => value.save());
    this._grimoire.forEach(value => value.save());
    this.cached[0] = this.bonus.slice(0);
    this.cached[1] = this.bonusValue.slice(0);
    this.cached[2] = this.tomeStockGain.slice(0);
  }

  private end() {
    this.tomeStockGain.splice(0);
    this.currentLap++;
  }

  public getPotion(id: number) {
    return this._potions.find(value => value.id === id);
  }

  public getBonusScore(delivery: DeliverySpell) {
    const index = this._potions.indexOf(delivery);
    let bonusScore = 0;
    if (index < 2) {
      if (this.bonus[index] > 0) {
        bonusScore = this.bonusValue[index];
      }
    }
    return bonusScore;
  }

  public getPotions() {
    return this._potions;
  }

  public getTomes() {
    return this._grimoire;
  }

  public getTomeIndexOf(spell: TomeSpell) {
    return this._grimoire.indexOf(spell);
  }

  public getTome(id: number) {
    return this._grimoire.find(value => value.id === id);
  }
}
