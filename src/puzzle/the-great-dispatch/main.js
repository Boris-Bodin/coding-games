const dateTime = Date.now();
/**********************
 * Constant
 **********************/
let VolumeMax = 100;
let TrucksCount = 100;
let MARGE = 100;
/**********************
 * Class
 **********************/
class Truck {
    constructor(id) {
        this.boxes = [];
        this.id = id;
        this.boxes = [];
    }
    get volume() {
        let volume = 0;
        for (let i = 0; i < this.boxes.length; i++) {
            volume += this.boxes[i].volume;
        }
        return volume;
    }
    get weight() {
        let weight = 0;
        for (let i = 0; i < this.boxes.length; i++) {
            weight += this.boxes[i].weight;
        }
        return weight;
    }
    static SortByWeight() {
        return Trucks.slice(0).sort((a, b) => {
            return a.weight - b.weight;
        });
    }
    static Lighter() {
        let id = 0;
        let weight = Trucks[id].weight;
        for (let i = 0; i < TrucksCount; i++) {
            const tmpWeight = Trucks[i].weight;
            if (weight > tmpWeight) {
                id = i;
                weight = tmpWeight;
            }
        }
        return Trucks[id];
    }
    static Heavier() {
        let id = 0;
        let weight = Trucks[id].weight;
        for (let i = 0; i < TrucksCount; i++) {
            const tmpWeight = Trucks[i].weight;
            if (weight < tmpWeight) {
                id = i;
                weight = tmpWeight;
            }
        }
        return Trucks[id];
    }
    static GetDelta() {
        return Truck.Heavier().weight - Truck.Lighter().weight;
    }
    canHave(box) {
        return (this.volume + box.volume) < VolumeMax;
    }
    addBox(box) {
        if (box.truck !== null) {
            box.truck.boxes.splice(box.truck.boxes.indexOf(box), 1);
        }
        box.truck = this;
        this.boxes.push(box);
    }
    toString() {
        return this.id + '[' + this.volume + ',' + this.weight + ']';
    }
    clear() {
        this.boxes.forEach(x => x.truck = null);
        this.boxes.splice(0);
    }
}
class Box {
    constructor(id, weight, volume) {
        this.id = id;
        this.weight = weight;
        this.volume = volume;
        this.truck = null;
    }
    toString() {
        return this.id + '[' + this.volume + ',' + this.weight + ']';
    }
}
/**********************
 * TOOL
 **********************/
function clearBad() {
    Trucks.forEach((truck) => {
        if (Math.abs(truck.weight - MeanWeight) >= MARGE) {
            truck.clear();
        }
    });
}
function clearAll() {
    Trucks.forEach((truck) => truck.clear());
}
/*****************
 * Global
 *****************/
let Trucks = [];
let Boxes = [];
let MeanWeight = 0;
/**********************
 * INIT
 **********************/
for (let i = 0; i < TrucksCount; i++) {
    Trucks.push(new Truck(i));
}
let BoxesCount = parseInt(readline(), 10);
for (let i = 0; i < BoxesCount; i++) {
    const inputs = readline().split(' ');
    const weight = parseFloat(inputs[0]);
    const volume = parseFloat(inputs[1]);
    Boxes.push(new Box(i, weight, volume));
    MeanWeight += weight;
}
MeanWeight /= TrucksCount;
printErr('MeanWeight : ' + MeanWeight);
/**********************
 * Algo Random
 **********************/
function f0() {
    function filterVolumeMax(box) {
        return function (a) {
            return a.canHave(box);
        };
    }
    let boxesSorted;
    while ((boxesSorted = Boxes.slice(0).filter(x => x.truck == null)).length > 0) {
        const sortedTrucks = Truck.SortByWeight().filter(filterVolumeMax(boxesSorted[0]));
        sortedTrucks[Math.floor(Math.random() * sortedTrucks.length)].addBox(boxesSorted[0]);
    }
}
/**********************
 * Algo Remplisage propre
 **********************/
function f1() {
    printErr('-------- f1 ');
    function filterVolumeMax(box) {
        return function (a) {
            return a.canHave(box);
        };
    }
    const boxesSorted = Boxes.slice(0).filter(x => x.truck == null).sort((a, b) => b.volume - a.volume);
    for (let i = 0; i < boxesSorted.length; i++) {
        const sortedTrucks = Truck.SortByWeight().filter(filterVolumeMax(boxesSorted[i]));
        sortedTrucks[0].addBox(boxesSorted[i]);
    }
}
/**********************
 * Algo Opti truck by truck
 **********************/
function f2() {
    printErr('-------- f2 ');
    for (let i = 0; i < TrucksCount; i++) {
        const truck = Trucks[i];
        const boxesSorted = Boxes.slice(0).sort((a, b) => b.volume - a.volume);
        for (let j = 0; j < boxesSorted.length; j++) {
            const box = boxesSorted[j];
            if (box.truck == null && truck.canHave(box) && (truck.weight + box.weight) <= (MeanWeight + MARGE)) {
                truck.addBox(boxesSorted[j]);
            }
        }
        // printErr('After : ' + truck.toString());
    }
}
/**********************
 * Algo Opti truck by value of box
 **********************/
function f3() {
    printErr('-------- f3 ');
    for (let i = 0; i < TrucksCount; i++) {
        const truck = Trucks[i];
        let haveFound = true;
        while (haveFound) {
            haveFound = false;
            let id = 0;
            let min = Math.abs((truck.weight + Boxes[0].weight) - MeanWeight);
            let max = Boxes[0].volume;
            for (let j = 1; j < Boxes.length; j++) {
                const box = Boxes[j];
                if (box.truck == null && truck.canHave(box) && (truck.weight + box.weight) <= (MeanWeight + MARGE)) {
                    const toMin = Math.abs((truck.weight + box.weight) - MeanWeight);
                    const toMax = box.volume;
                    if (min > toMin && max < toMax) {
                        haveFound = true;
                        min = toMin;
                        max = toMax;
                        id = j;
                    }
                }
            }
            if (haveFound) {
                truck.addBox(Boxes[id]);
            }
            if (truck.weight <= MeanWeight) {
                break;
            }
        }
    }
}
/**********************
 * Res
 **********************/
f3();
clearBad();
f1();
let res = Boxes.map(x => x.truck.id).join(' ');
let delta = Truck.GetDelta();
while (true) {
    clearAll();
    f0();
    const delta1 = Truck.GetDelta();
    if (delta1 < delta) {
        delta = delta1;
        res = Boxes.map(x => x.truck.id).join(' ');
    }
    if (Date.now() - dateTime > 1000 * 49) {
        print(res);
        break;
    }
}
