import {Action} from './action';
import {IAInterface} from './ai/ia-interface';
import {GameState} from './game-state';
import {Player} from './game/player';
import {Rule} from './game/rule';

export class Solution {
    private static maxSimulatedTurn = 100;
    public score: number;

    public actions = new Map<Player, Array<Action>>();

    constructor(public gameState: GameState) {
    }

    public static simulate(gameState: GameState,
                           ia: IAInterface,
                           player: Player,
                           dateStart: number): Array<Solution> {

        let solutions: Array<Solution> = [new Solution(gameState)];
        const solutionsAvailable: Array<Solution> = [];
        let count = 0;
        do {
            for (let i = 0; i < solutions.length; i++) {
                this.simulateTurn(ia, solutions[i], player, gameState, dateStart, solutionsAvailable);
            }
            solutions = solutionsAvailable.slice(0);
            solutionsAvailable.splice(0);
            count++;
        } while (this.haveTime(dateStart) && count < Math.min(this.maxSimulatedTurn, gameState.MAX_TURN - gameState.currentLap));

        return solutions;

    }

    private static simulateTurn(ia: IAInterface,
                                foreActions: Solution,
                                player: Player,
                                gameState: GameState,
                                dateStart: number,
                                solutionsAvailable: Array<Solution>) {
        const mySolutionsAvailable: Array<Solution> = [];
        this.simulateAction(ia, foreActions, player, gameState, dateStart, mySolutionsAvailable);
        for (let i = 0; i < mySolutionsAvailable.length; i++) {
            const solution = new Solution(gameState);
            solution.actions.set(player, mySolutionsAvailable[i].actions.get(player));
            solution.evaluation(player, gameState);
            if (solution.score !== -Infinity) {
                solutionsAvailable.push(solution);
                solutionsAvailable.sort((a, b) => b.score - a.score).splice(Rule.NB_KEEP_SOLUTION);
            }
            if (!this.haveTime(dateStart)) {
                return;
            }
            if (!this.haveTime(dateStart)) {
                return;
            }
        }
    }

    private static simulateAction(ia: IAInterface,
                                  foreActions: Solution,
                                  player: Player,
                                  gameState: GameState,
                                  dateStart: number,
                                  solutionsAvailable: Array<Solution>) {
        gameState.load();
        if (this.haveTime(dateStart) && gameState.play(player, (foreActions.actions.get(player) || []))) {
            const availableAction: Array<Array<Action>> = ia.availableAction(gameState, player);

            availableAction.forEach((action: Array<Action>) => {
                const solution = new Solution(gameState);
                solution.actions.set(player, [...(foreActions.actions.get(player) || []), ...action]);
                solution.evaluation(player, gameState);
                if (solution.score !== -Infinity) {
                    solutionsAvailable.push(solution);
                }
            });
        }
    }

    private static haveTime(dateStart: number) {
        return (Date.now() - dateStart) < 40;
    }

    public evaluation(player: Player, gameState: GameState) {
        gameState.load();
        if (gameState.play(player, this.actions.get(player) || [])) {
            this.score = Rule.EvaluationSolution(gameState, player);
        } else {
            this.score = -Infinity;
        }
    }

    public toString(): string {
        return '[' + this.score + ', ' + this.actions.values() + ']';
    }

    public debug() {
        // printErr({
        //            score: this.score,
        //            myActions: this.actions.get(this.gameState._myPlayer).map(value => value.toString()),
        //            // ennemysActions: this.actions.get(this.gameState._enemyPlayer).map(value => value.toString())
        //          });
    }
}
