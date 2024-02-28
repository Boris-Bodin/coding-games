import { CardValue } from './card-value';
export class Card {
    constructor() {
        this.cached = [];
        this.justSummon = false;
        this.canAttack = true;
    }
    get abilities() {
        return this._abilities;
    }
    set abilities(value) {
        this._abilities = value.filter(x => x !== '-');
    }
    get hasCharge() {
        return this.abilities.indexOf('C') !== -1;
    }
    set hasCharge(value) {
        if (value !== this.hasCharge) {
            if (value) {
                this.abilities.push('C');
            }
            else {
                this.abilities.splice(this.abilities.indexOf('C'), 1);
            }
        }
    }
    get hasGuard() {
        return this.abilities.indexOf('G') !== -1;
    }
    set hasGuard(value) {
        if (value !== this.hasGuard) {
            if (value) {
                this.abilities.push('G');
            }
            else {
                this.abilities.splice(this.abilities.indexOf('G'), 1);
            }
        }
    }
    get hasBreakthrough() {
        return this.abilities.indexOf('B') !== -1;
    }
    set hasBreakthrough(value) {
        if (value !== this.hasBreakthrough) {
            if (value) {
                this.abilities.push('B');
            }
            else {
                this.abilities.splice(this.abilities.indexOf('B'), 1);
            }
        }
    }
    get hasDrain() {
        return this.abilities.indexOf('D') !== -1;
    }
    set hasDrain(value) {
        if (value !== this.hasDrain) {
            if (value) {
                this.abilities.push('D');
            }
            else {
                this.abilities.splice(this.abilities.indexOf('D'), 1);
            }
        }
    }
    get hasLethal() {
        return this.abilities.indexOf('L') !== -1;
    }
    set hasLethal(value) {
        if (value !== this.hasLethal) {
            if (value) {
                this.abilities.push('L');
            }
            else {
                this.abilities.splice(this.abilities.indexOf('L'), 1);
            }
        }
    }
    get hasWard() {
        return this.abilities.indexOf('W') !== -1;
    }
    set hasWard(value) {
        if (value !== this.hasWard) {
            if (value) {
                this.abilities.push('W');
            }
            else {
                this.abilities.splice(this.abilities.indexOf('W'), 1);
            }
        }
    }
    value() {
        let value = 0;
        value = CardValue[this.cardNumber] - value;
        return value;
    }
    canUse(object) {
        return false;
    }
    toString() {
        return '[' + [this.instanceId, this.type, this.cost, this.attack + '/' + this.defense, this.abilities.join('')].join(',') + ']';
    }
    debug() {
        printErr(this.toString());
    }
    save() {
        this.cached[0] = this.instanceId;
        this.cached[1] = this.location;
        this.cached[2] = this.attack;
        this.cached[3] = this.defense;
        this.cached[4] = this._abilities.slice(0);
        this.cached[5] = this.myHealthChange;
        this.cached[6] = this.opponentHealthChange;
        this.cached[7] = this.cardDraw;
        this.cached[8] = false;
        this.cached[9] = true;
    }
    load() {
        this.instanceId = this.cached[0];
        this.location = this.cached[1];
        this.attack = this.cached[2];
        this.defense = this.cached[3];
        this._abilities = this.cached[4].slice(0);
        this.myHealthChange = this.cached[5];
        this.opponentHealthChange = this.cached[6];
        this.cardDraw = this.cached[7];
        this.justSummon = this.cached[8];
        this.canAttack = this.cached[9];
    }
    fight(defender, player) {
        this.canAttack = false;
        const damageGiven = defender.hasWard ? 0 : this.attack;
        const damageTaken = this.hasWard ? 0 : defender.attack;
        let healthGain = 0;
        let healthTaken = 0;
        if (this.hasWard && defender.attack > 0) {
            this.hasWard = false;
        }
        if (defender.hasWard && this.attack > 0) {
            defender.hasWard = false;
        }
        if (this.hasBreakthrough && damageGiven >= defender.defense) {
            healthTaken = defender.defense - damageGiven;
        }
        if (this.hasLethal && damageGiven > 0) {
            defender.defense = 0;
        }
        if (this.hasDrain && damageGiven > 0) {
            healthGain = this.attack;
        }
        defender.defense -= damageGiven;
        if (defender.hasLethal && damageTaken > 0) {
            this.defense = 0;
        }
        this.defense -= damageTaken;
        player.health += healthGain;
        player.opponent.health += healthTaken;
    }
}
