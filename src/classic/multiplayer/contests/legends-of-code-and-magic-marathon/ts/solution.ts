import { Action } from './action';
import { IAInterface } from './ai/ia-interface';
import { GameState, GameStateType } from './game-state';
import { Card } from './game/cards/card';
import { CardType } from './game/cards/card-type';
import { Player } from './game/player';


export class Solution {
    public score: number;

    constructor(public actions?: Array<Action>) {
        if (this.actions == null) {
            this.actions = [];
        }
        if (this.actions.length === 0) {
            this.actions.push(Action.Pass());
        }
    }

    public static simulate(gameState: GameState,
                           ia: IAInterface,
                           state: GameStateType,
                           player: Player,
                           isFirstPlayer: boolean,
                           dateStart: number): Array<Solution> {

        switch (state) {
            case GameStateType.DRAFT:
                return ia.draft(player).map((x: Action) => {
                    return new Solution([x]);
                });
            case GameStateType.BATTLE:
                const solutionsAvailable: Array<Solution> = [];
                this.simulateBattle(ia, [], player, gameState, dateStart, solutionsAvailable);

              // this.simulateAdversaire(solutionsAvailable, ia, player, gameState, dateStart);

                return solutionsAvailable;
        }
    }

    private static simulateAdversaire(solutionsAvailable: Array<Solution>,
                             ia: IAInterface,
                             player: Player,
                             gameState: GameState,
                             dateStart: number) {
        solutionsAvailable.forEach((solution: Solution) => {

            const enemySolutionsAvailable: Array<Solution> = [];
            this.simulateBattle(ia, solution.actions, player.opponent, gameState, dateStart, enemySolutionsAvailable);
            let bestSolution: Solution = null;
            enemySolutionsAvailable.forEach((enemySolution: Solution) => {
                if (bestSolution == null || bestSolution.score > enemySolution.score) {
                    bestSolution = enemySolution;
                }
            });
            solution.score = bestSolution.score;

        });
    }

    private static simulateBattle(ia: IAInterface,
                                  foreActions: Array<Action>,
                                  player: Player,
                                  gameState: GameState,
                                  dateStart: number,
                                  solutionsAvailable: Array<Solution>) {
        gameState.load();
        if (this.haveTime(dateStart) && gameState.play(player, [...foreActions])) {
            const summonsAvailable: Array<Array<Action>> = ia.summon(player);
            if (summonsAvailable.length === 0) {
                summonsAvailable.push([]);
            }
            summonsAvailable.forEach((summon: Array<Action>) => {
                gameState.load();
                if (this.haveTime(dateStart) && gameState.play(player, [...foreActions, ...summon])) {
                    const useItemsAvailable: Array<Array<Action>> = ia.useItems(player);
                    if (useItemsAvailable.length === 0) {
                        useItemsAvailable.push([]);
                    }
                    useItemsAvailable.forEach((useItem: Array<Action>) => {
                        gameState.load();
                        if (this.haveTime(dateStart) && gameState.play(player, [...foreActions, ...summon, ...useItem])) {
                            if (player.hand.length === 0 || player.board.length === 6 || player.hand.every((card: Card) => {
                                switch (card.type) {
                                    case CardType.CREATURE:
                                        return card.cost > player.cristal;
                                    case CardType.GREEN:
                                        return card.cost > player.cristal || player.board.length === 0;
                                    case CardType.RED:
                                        return card.cost > player.cristal || player.opponent.board.length === 0;
                                    case CardType.BLUE:
                                        return card.cost > player.cristal || true;
                                }
                            })) {
                                const figthsGuardAvailable: Array<Array<Action>> = ia.fightGuard(player);

                                if (figthsGuardAvailable.length === 0) {
                                    figthsGuardAvailable.push([]);
                                }
                                figthsGuardAvailable.forEach((figthGuard: Array<Action>) => {
                                    gameState.load();
                                    if (this.haveTime(dateStart) &&
                                        gameState.play(player, [...foreActions, ...summon, ...useItem, ...figthGuard])) {
                                        const figthsOtherAvailable: Array<Array<Action>> = ia.fightOther(player);
                                        if (figthsOtherAvailable.length === 0) {
                                            figthsOtherAvailable.push([]);
                                        }
                                        figthsOtherAvailable.forEach((fightOther: Array<Action>) => {
                                            const solution = new Solution([
                                                ...foreActions, ...summon, ...useItem, ...figthGuard, ...fightOther]);
                                            solution.evaluation(player, gameState);
                                            solutionsAvailable.push(solution);
                                        });
                                    }
                                });
                            }
                        }
                    });
                }
            });
        }
    }

    private static haveTime(dateStart: number) {
        return (Date.now() - dateStart) < 90;
    }

    public evaluation(player: Player, gameState: GameState) {
        gameState.load();
        if (gameState.play(player, this.actions || [] )) {
            this.score =  gameState.evaluation();
        } else {
            this.score = -Infinity;
        }
    }


}
