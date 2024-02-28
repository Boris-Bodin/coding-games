declare function readline(): string;

/**
 * Auto-generated code below aims at helping you parse
 * the standard input according to the problem statement.
 **/

var inputs: string[] = readline().split(' ');
const W: number = parseInt(inputs[0]);
const H: number = parseInt(inputs[1]);
const lineHeaders: string = readline();
console.error(lineHeaders);
const headers = lineHeaders.split('  ');

let position = [];
for (let i = 0; i < headers.length; i++) {
    position.push(i);
}

for (let i = 1; i < (
    H - 1
); i++) {
    const line: string = readline();
    console.error(line);
    let legs: string[] = line.split('|');
    for (let j = 1; j < (
        legs.length - 1
    ); j++) {
        if (legs[j] === '--') {
            position = [
                ...position.slice(0, j - 1),
                ...position.slice(j, j + 1),
                ...position.slice(j - 1, j),
                ...position.slice(j + 1)
            ];
        }
    }
    console.error(position.map(p => headers[p]).join('  '));
}
const lineFooters: string = readline();
console.error(lineFooters);
const footers = lineFooters.split('  ');

console.error(position.join('  '));
console.error(position.map(p => footers[p]).join('  '));
for (let i = 0; i < headers.length; i++) {

    console.log(headers[i] + '' + footers[position.indexOf(i)]);
}
