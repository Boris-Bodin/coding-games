import { ActionType } from './actionType';

export class Action {
    private readonly args: Array<string | number>;



    constructor(private type: ActionType,
                ...args: Array<string | number>) {
        this.args = args;

    }

    public static Pass() {
        return new Action(ActionType.PASS);
    }
    public static output(arr: Action[]) {
        print(arr.join(';'));
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
