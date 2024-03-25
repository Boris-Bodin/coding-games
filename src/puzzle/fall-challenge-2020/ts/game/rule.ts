import {GameState} from '../game-state';
import {Player} from './player';
import {SpellType} from "./spell/spell.type";

export class Rule {
    static NB_KEEP_SOLUTION: number = 10;
    static tier4Masse = 2.3;
    static tier3Masse = 2.2;
    static tier2Masse = 2.1;

    static EvaluationSolution(gameState: GameState, player: Player) {
        if (player.deliveriesCount >= gameState.DELIVERY_GOAL) {
            return +Infinity;
        }
        if (player.opponent.deliveriesCount >= gameState.DELIVERY_GOAL) {
            return -Infinity;
        }
        let score = 0;
        score += player.score * 5;
        score += player.inventory.delta[3] * this.tier4Masse;
        score += player.inventory.delta[2] * this.tier3Masse;
        score += player.inventory.delta[1] * this.tier2Masse;
        score += player.inventory.delta[0];
        score += (player.getSpells().filter(c => c.active).length) * 0.2;
        score += player.getSpells().map(c => c.value()).reduce((previousValue, currentValue) => previousValue + currentValue);
        return score;
    }

    static SpellValue(spell: any): number {
        switch (spell.type) {
            case SpellType.CAST:
            case SpellType.OPPONENT_CAST:
                return spell.recipe.delta[0] + spell.recipe.delta[1] * this.tier2Masse + spell.recipe.delta[2] * this.tier3Masse + spell.recipe.delta[3] * this.tier4Masse;
            case SpellType.LEARN:
                return spell.recipe.delta[0] + spell.recipe.delta[1] * this.tier2Masse + spell.recipe.delta[2] * this.tier3Masse + spell.recipe.delta[3] * this.tier4Masse;
            case SpellType.BREW:
                return spell.score;

        }
    }

}
