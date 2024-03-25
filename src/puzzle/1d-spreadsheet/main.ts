declare function readline(): string;

/**
 * Auto-generated code below aims at helping you parse
 * the standard input according to the problem statement.
 **/

let cells = [];

const N: number = parseInt(readline());
for (let i = 0; i < N; i++) {
    var inputs: string[] = readline().split(' ');
    cells.push({
                   init: {
                       operation: inputs[0],
                       arg1: inputs[1],
                       arg2: inputs[2]
                   }
               });
}

function resolveArg(arg1: string): number {
    let strings: string[] = arg1.split('$');
    if (strings.length === 1) {
        return resolveArgIsValue(arg1);
    } else {
        return resolveArgIsReference(strings);
    }
}

function resolveArgIsReference(strings: string[]): number {
    return resolveCell(cells[parseInt(strings[1])]);
}

function resolveArgIsValue(arg1: string): number {
    return parseInt(arg1);
}

function resolveCell(cell: any): number {
    if (cell.value !== undefined) {
        return cell.value;
    }
    if (cell.init.operation === 'VALUE') {
        cell.value = resolveArg(cell.init.arg1);
        return cell.value;
    }
    let arg1 = resolveArg(cell.init.arg1);
    let arg2 = resolveArg(cell.init.arg2);
    switch (cell.init.operation) {
        case 'ADD':
            cell.value = arg1 + arg2;
            break;
        case 'SUB':
            cell.value = arg1 - arg2;
            break;
        case 'MULT':
            cell.value = arg1 * arg2;
            break;
    }
    return cell.value;
}

for (let i = 0; i < N; i++) {
    let data: number = resolveCell(cells[i]);
    if (data === -0) {
        data = 0;
    }
    console.log(data);
}
