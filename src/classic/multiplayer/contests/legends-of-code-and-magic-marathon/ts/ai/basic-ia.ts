import { Action } from '../action';
import { ActionType } from '../actionType';
import { Card } from '../game/cards/card';
import { CardType } from '../game/cards/card-type';
import { Player } from '../game/player';
import { IAInterface } from './ia-interface';

export class BasicIA implements IAInterface {

    public draft(player: Player): Array<Action> {

        const id: number = player.hand.map((card: Card, index: number) => {
            return {id: index, score: card.value()};
        }).sort((a, b) => b.score - a.score)[0].id;
        return [new Action(ActionType.PICK, id)];
    }

    public summon(player: Player): Array<Array<Action>> {

        const hand = player.hand.filter((card: Card) => card.type === CardType.CREATURE && card.cost <= player.cristal);

        return this._summonAndUseList(player.cristal, hand).map((cards: Array<Card>) => {
                return cards.map((card: Card) => new Action(ActionType.SUMMON, card.instanceId));
            }).filter((x: Array<Action>) => x.length <= 6 - player.board.length);
    }

    public useItems(player: Player): Array<Array<Action>> {
        const hand = player.hand.filter((card: Card) => {
            if (card.type !== CardType.CREATURE && card.cost <= player.cristal) {
                if (card.type === CardType.RED) {
                    return player.opponent.board.length > 0;
                }
                if (card.type === CardType.GREEN) {
                    return player.board.length > 0;
                }
            }
            return false;
        });

        return this._useTarget(player, this._summonAndUseList(player.cristal, hand));
    }

    public fightGuard(player: Player): Array<Array<Action>> {
        const attackers = player.board
                                .filter((x: Card) => (!x.justSummon || x.hasCharge) && x.canAttack && x.defense > 0 && x.attack > 0);

        if (attackers.length === 0 ) {
            return [];
        }

        const attackAvailable: Array<Array<Action>> = [];
        const opponentCreature = player.opponent.board.filter(x => x.hasGuard && x.defense > 0);

        attackAvailable.push(... this._combiFight(attackers, opponentCreature));

        return attackAvailable;
    }

    public fightOther(player: Player): Array<Array<Action>> {
        const attackers = player.board
                                .filter((x: Card) => (!x.justSummon || x.hasCharge) && x.canAttack && x.defense > 0 && x.attack > 0);

        if (attackers.length === 0 ) {
            return [];
        }

        const attackAvailable: Array<Array<Action>> = [];
        const opponentCreature = player.opponent.board.filter(x => !x.hasGuard && x.defense > 0);

        attackAvailable.push(... this._combiFight(attackers, opponentCreature, true));

        return attackAvailable;
    }

    private _useTarget(player: Player, cardsAvailable: Array<Array<Card>>): Array<Array<Action>> {
        const redTarget = player.opponent.board.slice(0);
        const greenTarget = player.board.slice(0);

        const actionsAvailable: Array<Array<Action>> = [];

        cardsAvailable.forEach((cards: Array<Card>) => {
            actionsAvailable.push(...this._useTargetList(cards, redTarget, greenTarget));
        });

        return actionsAvailable;
    }

    private _useTargetList(hand: Array<Card>, redTarget: Array<Card>, greenTarget: Array<Card> ): Array < Array < Action >> {
        if (hand.length === 0) {
            return [];
        }
        const res: Array<Array<Action>> = [];
        const card = hand[0];
        if (card.type === CardType.RED) {
            for (let i = 0; i < redTarget.length; i++) {
                const target = redTarget[i];
                const children = this._useTargetList(hand.slice(1), redTarget, greenTarget);
                if (children.length > 0) {
                    children.forEach( (child) => {
                        res.push([...child, new Action(ActionType.USE, card.instanceId, target.instanceId)]);
                    });
                } else {
                    res.push([new Action(ActionType.USE, card.instanceId, target.instanceId)]);
                }
            }
        }
        if (card.type === CardType.GREEN) {
            for (let i = 0; i < greenTarget.length; i++) {
                const target = greenTarget[i];
                const children = this._useTargetList(hand.slice(1), redTarget, greenTarget);
                if (children.length > 0) {
                    children.forEach( (child) => {
                        res.push([...child, new Action(ActionType.USE, card.instanceId, target.instanceId)]);
                    });
                } else {
                    res.push([new Action(ActionType.USE, card.instanceId, target.instanceId)]);
                }
            }
        }
        return res;
    }

    private _summonAndUseList(cristal: number, hand: Array<Card> ): Array < Array < Card >> {

        if (cristal <= 0 || hand.length === 0) {
            return [];
        }
        const res = [];
        for (let i = 0; i < hand.length; i++) {
            const card = hand[i];
            if (card.cost <= cristal) {
                const child = this._summonAndUseList(cristal - card.cost,
                                                     hand.slice(i + 1).filter((x: Card) => x.cost <= cristal));
                res.push([card]);
                if (child.length > 0) {
                    res.push(...child.map((x: Array<Card>) => [card].concat(x)));
                }
            }
        }
        return res;
    }

    private _combiFight(attackers: Card[], opponents: Card[], canAttackPlayer = false): Array<Array<Action>> {
        if (attackers.length === 0) {
            return [];
        }
        const res: Array<Array<Action>> = [];
        const card = attackers[0];

        if (canAttackPlayer) {
            const children = this._combiFight(attackers.slice(1), opponents, canAttackPlayer);
            if (children.length > 0) {
                children.forEach((child) => {
                    res.push([new Action(ActionType.ATTACK, card.instanceId, -1), ...child]);
                });
            }
            res.push([new Action(ActionType.ATTACK, card.instanceId, -1)]);
        }

        for (let i = 0; i < opponents.length; i++) {
            const target = opponents[i];
            const children = this._combiFight(attackers.slice(1), opponents, canAttackPlayer);
            if (children.length > 0) {
                children.forEach((child) => {
                    res.push([new Action(ActionType.ATTACK, card.instanceId, target.instanceId), ...child]);
                });
            }
            res.push([new Action(ActionType.ATTACK, card.instanceId, target.instanceId)]);

        }

        return res;
    }

}
