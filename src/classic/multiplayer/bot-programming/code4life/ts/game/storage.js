export class Storage {
    constructor(A = 0, B = 0, C = 0, D = 0, E = 0) {
        this.A = A;
        this.B = B;
        this.C = C;
        this.D = D;
        this.E = E;
        this.cached = [];
        this[Symbol.iterator] = () => {
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
        };
    }
    get count() {
        return this.A + this.B + this.C + this.D + this.E;
    }
    save() {
        this.cached[0] = this.A;
        this.cached[1] = this.B;
        this.cached[2] = this.C;
        this.cached[3] = this.D;
        this.cached[4] = this.E;
    }
    load() {
        this.A = this.cached[0];
        this.B = this.cached[1];
        this.C = this.cached[2];
        this.D = this.cached[3];
        this.E = this.cached[4];
    }
    canBuy(store) {
        return this.A >= store.A
            && this.B >= store.B
            && this.C >= store.C
            && this.D >= store.D
            && this.E >= store.E;
    }
    add(store) {
        return new Storage(this.A + store.A, this.B + store.B, this.C + store.C, this.D + store.D, this.E + store.E);
    }
    sub(store) {
        return new Storage(Math.max(0, this.A - store.A), Math.max(0, this.B - store.B), Math.max(0, this.C - store.C), Math.max(0, this.D - store.D), Math.max(0, this.E - store.E));
    }
}
