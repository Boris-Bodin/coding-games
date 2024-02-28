import { ActionType } from './actionType';
export class Action {
    constructor(type, ...args) {
        this.type = type;
        this.args = args;
    }
    static Pass() {
        return new Action(ActionType.PASS);
    }
    static output(arr) {
        print(arr.join(';'));
    }
    toString() {
        return [this.type, ...this.args].join(' ');
    }
    getType() {
        return this.type;
    }
    getParams() {
        return this.args;
    }
    getParam(index) {
        return this.args[index];
    }
}
