declare function readline(): string;

const A_CHAR_CODE = 'A'.charCodeAt(0);

const OPERATION: string = readline();
const INITIAL_OFFSET: number = parseInt(readline());
const ROTORS: Array<string> = [];

for (let i = 0; i < 3; i++) {
    ROTORS.push(readline());
}

function encode(message: string): string {
    return message
        .split('')
        .map((c, index) =>
            String.fromCharCode(((c.charCodeAt(0) - A_CHAR_CODE + INITIAL_OFFSET + index) % 26) + A_CHAR_CODE)
        )
        .map((c) => ROTORS[0][c.charCodeAt(0) - A_CHAR_CODE])
        .map((c) => ROTORS[1][c.charCodeAt(0) - A_CHAR_CODE])
        .map((c) => ROTORS[2][c.charCodeAt(0) - A_CHAR_CODE])
        .join('');
}

function decode(message: string): string {
    return message
        .split('')
        .map((c) => String.fromCharCode(ROTORS[2].indexOf(c) + A_CHAR_CODE))
        .map((c) => String.fromCharCode(ROTORS[1].indexOf(c) + A_CHAR_CODE))
        .map((c) => String.fromCharCode(ROTORS[0].indexOf(c) + A_CHAR_CODE))
        .map((c, index) =>
            String.fromCharCode(
                ((c.charCodeAt(0) - A_CHAR_CODE + 26 * Math.ceil(message.length+INITIAL_OFFSET / 26) - (INITIAL_OFFSET + index)) %
                    26) +
                    A_CHAR_CODE
            )
        )
        .join('');
}

const message: string = readline();
if (OPERATION === 'ENCODE') {
    console.log(encode(message));
} else {
    console.log(decode(message));
}
