export var MoleculeType;
(function (MoleculeType) {
    MoleculeType["A"] = "A";
    MoleculeType["B"] = "B";
    MoleculeType["C"] = "C";
    MoleculeType["D"] = "D";
    MoleculeType["E"] = "E";
})(MoleculeType || (MoleculeType = {}));
class MoleculeTypeIterator {
    constructor() {
        this[Symbol.iterator] = function* () {
            yield 'A';
            yield 'B';
            yield 'C';
            yield 'D';
            yield 'E';
        };
    }
}
export const MoleculesIterator = new MoleculeTypeIterator();
