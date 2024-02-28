import { Action } from './action';
import { GameStateType } from './game-state';
import { CardType } from './game/cards/card-type';
export class Solution {
    constructor(actions) {
        this.actions = actions;
        if (this.actions == null) {
            this.actions = [];
        }
        if (this.actions.length === 0) {
            this.actions.push(Action.Pass());
        }
    }
    static simulate(gameState, ia, state, player, isFirstPlayer, dateStart) {
        switch (state) {
            case GameStateType.DRAFT:
                return ia.draft(player).map((x) => {
                    return new Solution([x]);
                });
            case GameStateType.BATTLE:
                const solutionsAvailable = [];
                this.simulateBattle(ia, [], player, gameState, dateStart, solutionsAvailable);
                return solutionsAvailable;
        }
    }
    static simulateAdversaire(solutionsAvailable, ia, player, gameState, dateStart) {
        solutionsAvailable.forEach((solution) => {
            const enemySolutionsAvailable = [];
            this.simulateBattle(ia, solution.actions, player.opponent, gameState, dateStart, enemySolutionsAvailable);
            let bestSolution = null;
            enemySolutionsAvailable.forEach((enemySolution) => {
                if (bestSolution == null || bestSolution.score > enemySolution.score) {
                    bestSolution = enemySolution;
                }
            });
            solution.score = bestSolution.score;
        });
    }
    static simulateBattle(ia, foreActions, player, gameState, dateStart, solutionsAvailable) {
        gameState.load();
        if (this.haveTime(dateStart) && gameState.play(player, [...foreActions])) {
            const summonsAvailable = ia.summon(player);
            if (summonsAvailable.length === 0) {
                summonsAvailable.push([]);
            }
            summonsAvailable.forEach((summon) => {
                gameState.load();
                if (this.haveTime(dateStart) && gameState.play(player, [...foreActions, ...summon])) {
                    const useItemsAvailable = ia.useItems(player);
                    if (useItemsAvailable.length === 0) {
                        useItemsAvailable.push([]);
                    }
                    useItemsAvailable.forEach((useItem) => {
                        gameState.load();
                        if (this.haveTime(dateStart) && gameState.play(player, [...foreActions, ...summon, ...useItem])) {
                            if (player.hand.length === 0 || player.board.length === 6 || player.hand.every((card) => {
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
                                const figthsGuardAvailable = ia.fightGuard(player);
                                if (figthsGuardAvailable.length === 0) {
                                    figthsGuardAvailable.push([]);
                                }
                                figthsGuardAvailable.forEach((figthGuard) => {
                                    gameState.load();
                                    if (this.haveTime(dateStart) &&
                                        gameState.play(player, [...foreActions, ...summon, ...useItem, ...figthGuard])) {
                                        const figthsOtherAvailable = ia.fightOther(player);
                                        if (figthsOtherAvailable.length === 0) {
                                            figthsOtherAvailable.push([]);
                                        }
                                        figthsOtherAvailable.forEach((fightOther) => {
                                            const solution = new Solution([
                                                ...foreActions, ...summon, ...useItem, ...figthGuard, ...fightOther
                                            ]);
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
    static haveTime(dateStart) {
        return (Date.now() - dateStart) < 90;
    }
    evaluation(player, gameState) {
        gameState.load();
        if (gameState.play(player, this.actions || [])) {
            this.score = gameState.evaluation();
        }
        else {
            this.score = -Infinity;
        }
    }
}
