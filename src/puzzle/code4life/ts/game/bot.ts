import { SampleData } from './sample-data';
import { Storage } from './storage';

export class Bot {
    public eta: number;
    public sampleDatas: Array<SampleData> = [];
    public module: string;
    public score: number;
    public storage: Storage;
    public expertise: Storage;
    public cached: Array<any> = [];

    public get storageCount(): number {
        return this.storage.count;
    }

    public get expertiseCount(): number {
        return this.expertise.count;
    }

    constructor() {
    }

    update() {
        const inputs = readline().split(' ');
        this.sampleDatas = [];
        this.module = inputs[0];
        this.eta = parseInt(inputs[1], 10);
        this.score = parseInt(inputs[2], 10);
        this.storage = new Storage(
            parseInt(inputs[3], 10),
            parseInt(inputs[4], 10),
            parseInt(inputs[5], 10),
            parseInt(inputs[6], 10),
            parseInt(inputs[7], 10)
        );
        this.expertise = new Storage(
            parseInt(inputs[8], 10),
            parseInt(inputs[9], 10),
            parseInt(inputs[10], 10),
            parseInt(inputs[11], 10),
            parseInt(inputs[12], 10)
        );
    }

    public save() {
        this.cached[0] = this.eta;
        this.cached[1] = this.sampleDatas.slice(0);
        this.cached[1].forEach((x: SampleData) => x.save());
        this.cached[2] = this.module;
        this.cached[3] = this.score;
        this.cached[4] = this.storage;
        this.cached[4].save();
        this.cached[5] = this.expertise;
        this.cached[5].save();
    }

    public load() {
        this.eta = this.cached[0];
        this.sampleDatas = this.cached[1].slice(0);
        this.sampleDatas.forEach((x: SampleData) => x.load());
        this.module = this.cached[2];
        this.score = this.cached[3];
        this.storage = this.cached[4];
        this.storage.load();
        this.expertise = this.cached[5];
        this.expertise.load();
    }

    push(sampleData: SampleData) {
        this.sampleDatas.push(sampleData);
    }
}
