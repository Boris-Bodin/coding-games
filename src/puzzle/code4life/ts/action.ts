import { ActionType } from './action-type';

export class Action {
    private readonly args: Array<string | number>;

    constructor(private type: ActionType,
                ...args: Array<string | number>) {
        this.args = args;

    }

    public static connect(params: string) {
        return new Action(ActionType.CONNECT, params);
    }

    public static goTo(params: string) {
        return new Action(ActionType.GOTO, params);
    }

    public static wait() {
        return new Action(ActionType.WAIT);
    }

    public output() {
        print(this.toString());
    }

    public toString() {
        return [this.type, ...this.args].join(' ');
    }

    public getType(): ActionType {
        return this.type;
    }

    public getParams(): Array<string | number> {
        return this.args;
    }

    public getParam(index: number): string | number {
        return this.args[index];
    }

}
