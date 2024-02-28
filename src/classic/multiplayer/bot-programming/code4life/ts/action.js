import { ActionType } from './action-type';
export class Action {
    constructor(type, ...args) {
        this.type = type;
        this.args = args;
    }
    static connect(params) {
        return new Action(ActionType.CONNECT, params);
    }
    static goTo(params) {
        return new Action(ActionType.GOTO, params);
    }
    static wait() {
        return new Action(ActionType.WAIT);
    }
    output() {
        print(this.toString());
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
