import { Storage } from './storage';
export class Project {
    constructor() {
        this.update();
    }
    update() {
        const inputs = readline().split(' ');
        this._molecules = new Storage(parseInt(inputs[0], 10), parseInt(inputs[1], 10), parseInt(inputs[2], 10), parseInt(inputs[3], 10), parseInt(inputs[4], 10));
    }
}
