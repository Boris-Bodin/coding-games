import { Action } from './action';
import { ActionType } from './actionType';
import { IAInterface } from './ai/ia-interface';
import { BasicIA } from './ai/basic-ia';
import { Card } from './game/cards/card';
import { CardFactory } from './game/cards/card-factory';
import { Player } from './game/player';
import { Solution } from './solution';

export enum GameStateType {
    DRAFT = 0,
    BATTLE = 1
}

export class GameState {
    private _state: GameStateType;

    private readonly _myPlayer: Player = null;
    private readonly _enemyPlayer: Player = null;
    private _firstPlayer: Player = null;
    private _secondPlayer: Player = null;

    private readonly _ia: IAInterface = null;

    constructor() {
        this._state = GameStateType.DRAFT;

        this._myPlayer  = new Player(this);
        this._enemyPlayer  = new Player(this);

        this._enemyPlayer.opponent = this._myPlayer;
        this._myPlayer.opponent = this._enemyPlayer;

        this._ia = new BasicIA();
    }

    public bootstrap() {
        do {

            this._myPlayer.update();
            this._enemyPlayer.update(true);
            const dateStart = Date.now();

            this.checkState();
            this.updateCard();
            this.save();

            const solutions: Array<Solution> = Solution.simulate(this,
                                                                 this._ia,
                                                                 this._state,
                                                                 this._myPlayer,
                                                                 this._myPlayer === this._firstPlayer, dateStart);

            let bestSolution: Solution = null;
            solutions.forEach((solution: Solution) => {
                if (bestSolution == null || bestSolution.score < solution.score) {
                    bestSolution = solution;
                }
            });

            this.load();

            if (bestSolution === null) {
                bestSolution = new Solution();
            }
            this.play(this._myPlayer, bestSolution.actions);
            printErr( 'Nb solutions : ' + solutions.length);
            printErr( 'Loop during : ' + (Date.now() - dateStart) + ' ms');
            Action.output(bestSolution.actions);

        }  while (this._myPlayer.health > 0 && this._enemyPlayer.health > 0);
    }

    public evaluation() {
        if (this._enemyPlayer.health <= 0) {
            return +Infinity;
        }
        if (this._myPlayer.health <= 0) {
            return -Infinity;
        }
        let score = 0;
        score += (this._myPlayer.health - this._enemyPlayer.health) * 2;
        score -= this._enemyPlayer.board.length * 6;
        this._enemyPlayer.board.forEach((x: Card) => {
            score -= x.attack * 3;
            score -= x.defense * 3;
            score -= x.abilities.length * 3;
        });
        this._myPlayer.board.forEach((x: Card) => {
            score += x.attack * 3;
            score += x.defense * 3;
            score += x.abilities.length * 3;
        });
        return score;
    }

    public play(player: Player, actions: Array<Action>): boolean {
        for (let i = 0; i < actions.length; i++) {
            const action: Action = actions[i];
            switch (action.getType()) {
                case ActionType.PASS:
                    break;
                case ActionType.PICK:
                    if (!player.pick(action.getParam(0) as number)) {
                        return false;
                    }
                    break;
                case ActionType.SUMMON:
                    if (!player.summon(action.getParam(0) as number)) {
                        return false;
                    }
                    break;
                case ActionType.USE:
                    if (!player.use(action.getParam(0) as number, action.getParam(1) as number)) {
                        return false;
                    }
                    break;
                case ActionType.ATTACK:
                    if (!player.attack(action.getParam(0) as number, action.getParam(1) as number)) {
                        return false;
                    }
                    break;
            }
            player.end();
        }

        return true;
    }

    public checkState() {
        if (this._enemyPlayer.handSize  > 0) {
            if (this._state === GameStateType.DRAFT) {
                if (this._myPlayer.handSize === 5 && this._myPlayer.deckSize === 30) {
                    this._firstPlayer = this._myPlayer;
                    this._secondPlayer = this._enemyPlayer;
                } else {
                    this._firstPlayer = this._enemyPlayer;
                    this._secondPlayer = this._myPlayer;
                }
            }
            this._state = GameStateType.BATTLE;
        }
    }

    public updateCard() {

        const cardCount = parseInt(readline(), 10);
        printErr(cardCount);
        for (let i = 0; i < cardCount; i++) {

            const inputs = readline().split(' ');
            printErr(inputs);
            const location = parseInt(inputs[2], 10);
            const type = parseInt(inputs[3], 10);

            if (this._state === GameStateType.DRAFT) {
                const card: Card = CardFactory.create(type);

                card.cardNumber = parseInt(inputs[0], 10);
                card.instanceId = parseInt(inputs[1], 10);
                card.location = location;
                card.type = parseInt(inputs[3], 10);
                card.cost = parseInt(inputs[4], 10);
                card.attack = parseInt(inputs[5], 10);
                card.defense = parseInt(inputs[6], 10);
                card.abilities = inputs[7].split('');
                card.myHealthChange = parseInt(inputs[8], 10);
                card.opponentHealthChange = parseInt(inputs[9], 10);
                card.cardDraw = parseInt(inputs[10], 10);
                this._myPlayer.hand.push(card);

            } else {
                if (location >= 0) {
                    this._myPlayer.updateCard(inputs);
                } else {
                    this._enemyPlayer.updateCard(inputs);
                }
            }
        }
    }

    private save() {
        this._myPlayer.save();
        this._enemyPlayer.save();
    }

    public load() {
        this._myPlayer.load();
        this._enemyPlayer.load();
    }
}
