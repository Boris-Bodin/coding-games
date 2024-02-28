
export class Storage {
    [key: string]: any;

    private cached: Array<any> = [];

    public get count() {
        return this.A + this.B + this.C + this.D + this.E;
    }

    constructor(public A: number = 0,
                public B: number = 0,
                public C: number = 0,
                public D: number = 0,
                public E: number = 0) {

    }

    [Symbol.iterator] = () => {
        let index = 0;
        return {
            next: () => {
                switch (index) {
                    case 0:
                        index++;
                        return {
                            value: this.A,
                            done: false
                        };
                    case 1:
                        index++;
                        return {
                            value: this.B,
                            done: false
                        };
                    case 2:
                        index++;
                        return {
                            value: this.C,
                            done: false
                        };
                    case 3:
                        index++;
                        return {
                            value: this.D,
                            done: false
                        };
                    case 4:
                        index++;
                        return {
                            value: this.E,
                            done: false
                        };
                    default:
                        return {
                            value: undefined,
                            done: true
                        };

                }
            }
        };
    }


    public save() {
        this.cached[0] = this.A;
        this.cached[1] = this.B;
        this.cached[2] = this.C;
        this.cached[3] = this.D;
        this.cached[4] = this.E;
    }

    public load() {
        this.A = this.cached[0];
        this.B = this.cached[1];
        this.C = this.cached[2];
        this.D = this.cached[3];
        this.E = this.cached[4];
    }

    public canBuy(store: Storage): boolean {
        return this.A >= store.A
            && this.B >= store.B
            && this.C >= store.C
            && this.D >= store.D
            && this.E >= store.E;
    }

    public add(store: Storage): Storage {
        return  new Storage(this.A + store.A, this.B + store.B, this.C + store.C, this.D + store.D, this.E + store.E);
    }

    public sub(store: Storage): Storage {
        return  new Storage(Math.max(0, this.A - store.A),
                            Math.max(0, this.B - store.B),
                            Math.max(0, this.C - store.C),
                            Math.max(0, this.D - store.D),
                            Math.max(0, this.E - store.E));
    }
}
