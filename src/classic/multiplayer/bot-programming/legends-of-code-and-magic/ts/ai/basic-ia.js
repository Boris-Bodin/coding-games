import { Action } from '../action';
import { ActionType } from '../actionType';
import { CardType } from '../game/cards/card-type';
export class BasicIA {
    draft(player) {
        const id = player.hand.map((card, index) => {
            return { id: index, score: card.value() };
        }).sort((a, b) => b.score - a.score)[0].id;
        return [new Action(ActionType.PICK, id)];
    }
    summon(player) {
        const hand = player.hand.filter((card) => card.type === CardType.CREATURE && card.cost <= player.cristal);
        return this._summonAndUseList(player.cristal, hand).map((cards) => {
            return cards.map((card) => new Action(ActionType.SUMMON, card.instanceId));
        }).filter((x) => x.length <= 6 - player.board.length);
    }
    useItems(player) {
        const hand = player.hand.filter((card) => {
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
    fightGuard(player) {
        const attackers = player.board
            .filter((x) => (!x.justSummon || x.hasCharge) && x.canAttack && x.defense > 0 && x.attack > 0);
        if (attackers.length === 0) {
            return [];
        }
        const attackAvailable = [];
        const opponentCreature = player.opponent.board.filter(x => x.hasGuard && x.defense > 0);
        attackAvailable.push(...this._combiFight(attackers, opponentCreature));
        return attackAvailable;
    }
    fightOther(player) {
        const attackers = player.board
            .filter((x) => (!x.justSummon || x.hasCharge) && x.canAttack && x.defense > 0 && x.attack > 0);
        if (attackers.length === 0) {
            return [];
        }
        const attackAvailable = [];
        const opponentCreature = player.opponent.board.filter(x => !x.hasGuard && x.defense > 0);
        attackAvailable.push(...this._combiFight(attackers, opponentCreature, true));
        return attackAvailable;
    }
    _useTarget(player, cardsAvailable) {
        const redTarget = player.opponent.board.slice(0);
        const greenTarget = player.board.slice(0);
        const actionsAvailable = [];
        cardsAvailable.forEach((cards) => {
            actionsAvailable.push(...this._useTargetList(cards, redTarget, greenTarget));
        });
        return actionsAvailable;
    }
    _useTargetList(hand, redTarget, greenTarget) {
        if (hand.length === 0) {
            return [];
        }
        const res = [];
        const card = hand[0];
        if (card.type === CardType.RED) {
            for (let i = 0; i < redTarget.length; i++) {
                const target = redTarget[i];
                const children = this._useTargetList(hand.slice(1), redTarget, greenTarget);
                if (children.length > 0) {
                    children.forEach((child) => {
                        res.push([...child, new Action(ActionType.USE, card.instanceId, target.instanceId)]);
                    });
                }
                else {
                    res.push([new Action(ActionType.USE, card.instanceId, target.instanceId)]);
                }
            }
        }
        if (card.type === CardType.GREEN) {
            for (let i = 0; i < greenTarget.length; i++) {
                const target = greenTarget[i];
                const children = this._useTargetList(hand.slice(1), redTarget, greenTarget);
                if (children.length > 0) {
                    children.forEach((child) => {
                        res.push([...child, new Action(ActionType.USE, card.instanceId, target.instanceId)]);
                    });
                }
                else {
                    res.push([new Action(ActionType.USE, card.instanceId, target.instanceId)]);
                }
            }
        }
        return res;
    }
    _summonAndUseList(cristal, hand) {
        if (cristal <= 0 || hand.length === 0) {
            return [];
        }
        const res = [];
        for (let i = 0; i < hand.length; i++) {
            const card = hand[i];
            if (card.cost <= cristal) {
                const child = this._summonAndUseList(cristal - card.cost, hand.slice(i + 1).filter((x) => x.cost <= cristal));
                res.push([card]);
                if (child.length > 0) {
                    res.push(...child.map((x) => [card].concat(x)));
                }
            }
        }
        return res;
    }
    _combiFight(attackers, opponents, canAttackPlayer = false) {
        if (attackers.length === 0) {
            return [];
        }
        const res = [];
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
