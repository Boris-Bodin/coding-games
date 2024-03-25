declare function readline(): string;

declare interface Array<T> {
    flatMap<U>(callback: (value: T, index: number, array: T[]) => U[]): U[];

    find(predicate: (value: T, index: number, obj: T[]) => boolean): T | null;

    includes(searchElement: T, fromIndex?: number): boolean;
}


type Cell = string;
type Board = Array<Array<Cell>>;
type Word = Array<CellPosition & {
    letter: Cell;
}>;

interface CellPosition {
    x: number;
    y: number;
}


const TILES_SCORE: { [key: string]: number } = {};

const EMPTY_BOARD: Board = [];
const PREVIOUS_BOARD: Board = [];
const PLAYED_BOARD: Board = [];


function initTilesScore() {
    const nbTiles: number = parseInt(readline(), 10);
    for (let i = 0; i < nbTiles; i++) {
        const inputs: string[] = readline().split(' ');
        TILES_SCORE[inputs[0]] = parseInt(inputs[1], 10);
    }
}

function initBoards() {
    for (let i = 0; i < BOARD_HEIGHT; i++) {
        EMPTY_BOARD.push(readline().split('') as Array<Cell>);
    }
    for (let i = 0; i < BOARD_HEIGHT; i++) {
        PREVIOUS_BOARD.push(readline().split('') as Array<Cell>);
    }
    for (let i = 0; i < BOARD_HEIGHT; i++) {
        PLAYED_BOARD.push(readline().split('') as Array<Cell>);
    }
}

function findNewTiles() {
    const res: Array<CellPosition> = [];

    for (let i = 0; i < BOARD_HEIGHT; i++) {
        for (let j = 0; j < BOARD_WIDTH; j++) {
            if (PREVIOUS_BOARD[i][j] !== PLAYED_BOARD[i][j]) {
                res.push({y: i, x: j});
            }
        }
    }
    return res;
}

function findWords(tilePosition: any, board: Board): Array<Word> {
    const res: Array<Word> = [];
    const {x, y} = tilePosition;
    let word: Word = [];
    let i = 0;
    while (x - i >= 0 && board[y][x - i] !== '.') {
        word.push({x: x - i, y, letter: board[y][x - i]});
        i++;
    }
    i = 1;
    while (x + i < BOARD_WIDTH && board[y][x + i] !== '.') {
        word.push({x: x + i, y, letter: board[y][x + i]});
        i++;
    }
    if (word.length > 1) {
        word.sort((a, b) => a.x - b.x);
        res.push(word);
    }
    word = [];
    i = 0;
    while (y - i >= 0 && board[y - i][x] !== '.') {
        word.push({x, y: y - i, letter: board[y - i][x]});
        i++;
    }
    i = 1;
    while (y + i < BOARD_HEIGHT && board[y + i][x] !== '.') {
        word.push({x, y: y + i, letter: board[y + i][x]});
        i++;
    }
    if (word.length > 1) {
        word.sort((a, b) => a.y - b.y);
        res.push(word);
    }
    return res;
}

function wordToString(word: Word): string {
    return word.map(value => value.letter).join('');
}

function getScoreOf(word: Word, board: Board): number {
    let score = word.reduce((acc, value) => {
        if (PREVIOUS_BOARD[value.y][value.x] === PLAYED_BOARD[value.y][value.x]) {
            return acc + TILES_SCORE[value.letter];
        }

        let multi = 1;
        if (board[value.y][value.x] === 'l') {
            multi = 2;
        }
        if (board[value.y][value.x] === 'L') {
            multi = 3;
        }
        return acc + (TILES_SCORE[value.letter] * multi);
    }, 0);
    word.forEach(value => {
        if (PREVIOUS_BOARD[value.y][value.x] !== PLAYED_BOARD[value.y][value.x]) {
            if (board[value.y][value.x] === 'w') {
                score *= 2;
            }
            if (board[value.y][value.x] === 'W') {
                score *= 3;
            }
        }
    });
    return score;
}


initTilesScore();
const boardSizeInputs: string[] = readline().split(' ');
const BOARD_WIDTH: number = parseInt(boardSizeInputs[0], 10);
const BOARD_HEIGHT: number = parseInt(boardSizeInputs[1], 10);
initBoards();

const playedTiles = findNewTiles();

// @ts-ignore
const newWords: Array<Word> = [];

playedTiles.flatMap(value => findWords(value, PLAYED_BOARD)).forEach((word: Word) => {
    if (newWords.find((value: Word) => wordToString(value) === wordToString(word)) === undefined) {
        newWords.push(word);
    }
});

let totalScore = 0;
newWords.sort((a, b) => wordToString(a).localeCompare(wordToString(b))).forEach((word: Word) => {
    const score = getScoreOf(word, EMPTY_BOARD);
    totalScore += score;
    console.log(`${wordToString(word)} ${score}`);
});

if (playedTiles.length === 7) {
    console.log('Bonus 50');
    totalScore += 50;
}

console.log(`Total ${totalScore}`);
