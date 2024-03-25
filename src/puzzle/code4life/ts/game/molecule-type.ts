

export enum MoleculeType {
    A = 'A',
    B = 'B',
    C = 'C',
    D = 'D',
    E = 'E'
}

class MoleculeTypeIterator {

    [Symbol.iterator] = function* () {
        yield 'A';
        yield 'B';
        yield 'C';
        yield 'D';
        yield 'E';
    };
}

export const MoleculesIterator = new MoleculeTypeIterator();
