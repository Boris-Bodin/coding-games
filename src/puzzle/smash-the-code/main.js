/****************
 * Constant     *
 ****************/
const WIDTH = 6;
const HEIGHT = 12;
/****************
 * Class        *
 ****************/
class Table {
    constructor() {
        this.columns = [];
        for (let i = 0; i < WIDTH; i++) {
            this.columns.push([]);
            for (let j = 0; j < HEIGHT; j++) {
                this.columns[i].push('.');
            }
        }
    }
    update() {
        this.score = +readline();
        for (let i = 0; i < HEIGHT; i++) {
            const row = readline();
            for (let j = 0; j < WIDTH; j++) {
                this.columns[j][i] = row[j];
            }
        }
    }
    canPlace(duo) {
        for (let i = 0; i < WIDTH; i++) {
            const tmp = this.columns[i].filter(x => x !== '.');
            if (tmp.length > 0 && tmp[0] === duo.B) {
                return i;
            }
        }
        return -1;
    }
}
class Duo {
    constructor() {
        const inputs = readline().split(' ');
        this.A = inputs[0];
        this.B = inputs[1];
    }
}
/****************
 * Global     *
 ****************/
const Tables = [new Table(), new Table()];
/****************
 * Main         *
 ****************/
let ic = 0;
let columnsRandomId = [1, 3, 5, 0, 2, 4];
while (true) {
    const colors = [];
    for (let i = 0; i < 8; i++) {
        colors.push(new Duo());
    }
    Tables[0].update();
    Tables[1].update();
    let id = Tables[0].canPlace(colors[0]);
    if (id === -1) {
        id = columnsRandomId[ic % 6];
        ic++;
    }
    print(id);
}
