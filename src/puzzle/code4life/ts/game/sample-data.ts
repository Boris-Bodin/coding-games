import { MoleculesIterator } from './molecule-type';
import { Storage } from './storage';

export class SampleData {
    public sampleId: number;
    public carriedBy: number;
    public rank: number;
    public expertiseGain: string;
    public health: number;
    public cost: Storage;
    public cached: Array<any> = [];

    public get costCount(): number {
        return this.cost.count;
    }

    constructor() {
        this.update();
    }

    update() {
        const inputs = readline().split(' ');
        this.sampleId = parseInt(inputs[0], 10);
        this.carriedBy = parseInt(inputs[1], 10);
        this.rank = parseInt(inputs[2], 10);
        this.expertiseGain = inputs[3];
        this.health = parseInt(inputs[4], 10);
        this.cost = new Storage(
            parseInt(inputs[5], 10),
            parseInt(inputs[6], 10),
            parseInt(inputs[7], 10),
            parseInt(inputs[8], 10),
            parseInt(inputs[9], 10)
        );
    }

    public save() {
        this.cached[0] = this.sampleId;
        this.cached[1] = this.carriedBy;
        this.cached[2] = this.rank;
        this.cached[3] = this.expertiseGain;
        this.cached[4] = this.health;
        this.cached[5] = this.cost;
    }

    public load() {
        this.sampleId = this.cached[0];
        this.carriedBy = this.cached[1];
        this.rank = this.cached[2];
        this.expertiseGain = this.cached[3];
        this.health = this.cached[4];
        this.cost = this.cached[5];
    }
}
