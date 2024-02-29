declare function readline(): string;

const NB_IN_SIGNAL: number = parseInt(readline());
const NB_OUT_SIGNAL: number = parseInt(readline());

function parseSignal(str: String): Array<number> {
    return str.replace(/_/g, '0').replace(/-/g, '1').split('').map(v => +v);
}

function processSignal(type: string, signalA: Array<number>, signalB: Array<number>): Array<number> {
    return signalA.map((value, index) => compute(type,value, signalB[index]));
}

function compute(type: string, valueA: number, valueB: number): number {
    switch(type){
        case 'AND':
            return valueA & valueB;
        case 'OR':
            return valueA | valueB;
        case 'XOR':
            return valueA ^ valueB;
        case 'NAND':
            return (valueA & valueB) ? 0 : 1;
        case 'NOR':
            return (valueA | valueB) ? 0 : 1;
        case 'NXOR':
            return (valueA ^ valueB) ? 0 : 1;
    }
    return -1;
}

function formatSignal(arr: Array<number>): string {
    return arr.map(v => v ? '-' : '_').join('');
}

const IN_SIGNAL= {}
for (let i = 0; i < NB_IN_SIGNAL; i++) {
    var inputs: string[] = readline().split(' ');
    const inputName: string = inputs[0];
    const inputSignal: string = inputs[1];
    IN_SIGNAL[inputName] = parseSignal(inputSignal);
}

for (let i = 0; i < NB_OUT_SIGNAL; i++) {
    var inputs: string[] = readline().split(' ');
    const outputName: string = inputs[0];
    const type: string = inputs[1];
    const inputName1: string = inputs[2];
    const inputName2: string = inputs[3];
    console.log(outputName + ' ' + formatSignal(processSignal(type, IN_SIGNAL[inputName1], IN_SIGNAL[inputName2])));
}