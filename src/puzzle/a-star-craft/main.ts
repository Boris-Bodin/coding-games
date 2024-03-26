

for (let i = 0; i < 10; i++) {
    const line: string = readline();
}
const robotCount: number = parseInt(readline());
for (let i = 0; i < robotCount; i++) {
    var inputs: string[] = readline().split(' ');
    const x: number = parseInt(inputs[0]);
    const y: number = parseInt(inputs[1]);
    const direction: string = inputs[2];
}

// Write an action using console.log()
// To debug: console.error('Debug messages...');

console.log('0 0 U 1 1 R 2 2 D 3 3 L');
