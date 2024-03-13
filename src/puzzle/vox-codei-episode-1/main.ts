declare function readline(): string;

interface Array<T> {
    flatMap<U>(callback: (value: T, index: number, array: T[]) => U[]): U[];

    find(predicate: (value: T, index: number, obj: T[]) => boolean): T | null;

    includes(searchElement: T, fromIndex?: number): boolean;
}

const INDESTRUCTIBLE_NODE_CASE = '#';
const NODE_CASE = '@';
const FUTURE_BOMBED_NODE_CASE = '-';
const EMPTY_CASE = '.';
const BOMBE_CASE = '+';

const DELAY_EXPLOSION = 3;
const RANGE_EXPLOSION = 3;

const WAIT_COMMAND = 'WAIT';

const [GRID_WIDTH, GRID_HEIGHT] = readline().split(' ').map(value => parseInt(value, 10));

type Grid = Array<Array<string>>;
type Coordinate = [number, number];

const INITIAL_GRID: Grid = [];

function initGrid() {
    for (let i = 0; i < GRID_HEIGHT; i++) {
        const line = readline();
        INITIAL_GRID[i] = line.split('');
    }
}

function countScore(x: number, y: number): number {
    let score = 0;
    for (let distance = 1; distance <= RANGE_EXPLOSION; distance++) {
        if (y - distance >= 0 && INITIAL_GRID[y - distance][x] === NODE_CASE) {
            score++;
        } else if (y - distance >= 0 && INITIAL_GRID[y - distance][x] === INDESTRUCTIBLE_NODE_CASE) {
            break;
        }
    }

    for (let distance = 1; distance <= RANGE_EXPLOSION; distance++) {
        if (y + distance < GRID_HEIGHT && INITIAL_GRID[y + distance][x] === NODE_CASE) {
            score++;
        } else if (y + distance < GRID_HEIGHT && INITIAL_GRID[y + distance][x] === INDESTRUCTIBLE_NODE_CASE) {
            break;
        }
    }

    for (let distance = 1; distance <= RANGE_EXPLOSION; distance++) {
        if (x - distance >= 0 && INITIAL_GRID[y][x - distance] === NODE_CASE) {
            score++;
        } else if (x - distance >= 0 && INITIAL_GRID[y][x - distance] === INDESTRUCTIBLE_NODE_CASE) {
            break;
        }
    }

    for (let distance = 1; distance <= RANGE_EXPLOSION; distance++) {
        if (x + distance < GRID_WIDTH && INITIAL_GRID[y][x + distance] === NODE_CASE) {
            score++;
        } else if (x + distance < GRID_WIDTH && INITIAL_GRID[y][x + distance] === INDESTRUCTIBLE_NODE_CASE) {
            break;
        }
    }

    return score;
}

function makeExplode(x: number, y: number) {
    if (INITIAL_GRID[y][x] !== BOMBE_CASE) {
        return;
    }
    INITIAL_GRID[y][x] = EMPTY_CASE;

    for (let distance = 1; distance <= RANGE_EXPLOSION; distance++) {
        if (y - distance >= 0 && INITIAL_GRID[y - distance][x] === INDESTRUCTIBLE_NODE_CASE) {
            break;
        } else if (y - distance >= 0 && INITIAL_GRID[y - distance][x] === BOMBE_CASE) {
            makeExplode(x, y - distance);
        } else if (y - distance >= 0) {
            INITIAL_GRID[y - distance][x] = EMPTY_CASE;
        }
    }

    for (let distance = 1; distance <= RANGE_EXPLOSION; distance++) {
        if (y + distance < GRID_HEIGHT && INITIAL_GRID[y + distance][x] === INDESTRUCTIBLE_NODE_CASE) {
            break;
        } else if (y + distance < GRID_HEIGHT && INITIAL_GRID[y + distance][x] === BOMBE_CASE) {
            makeExplode(x, y + distance);
        } else if (y + distance < GRID_HEIGHT) {
            INITIAL_GRID[y + distance][x] = EMPTY_CASE;
        }
    }

    for (let distance = 1; distance <= RANGE_EXPLOSION; distance++) {
        if (x - distance >= 0 && INITIAL_GRID[y][x - distance] === INDESTRUCTIBLE_NODE_CASE) {
            break;
        } else if (x - distance >= 0 && INITIAL_GRID[y][x - distance] === BOMBE_CASE) {
            makeExplode(x - distance, y);
        } else if (x - distance >= 0) {
            INITIAL_GRID[y][x - distance] = EMPTY_CASE;
        }
    }

    for (let distance = 1; distance <= RANGE_EXPLOSION; distance++) {
        if (x + distance < GRID_WIDTH && INITIAL_GRID[y][x + distance] === INDESTRUCTIBLE_NODE_CASE) {
            break;
        } else if (x + distance < GRID_WIDTH && INITIAL_GRID[y][x + distance] === BOMBE_CASE) {
            makeExplode(x + distance, y);
        } else if (x + distance < GRID_WIDTH) {
            INITIAL_GRID[y][x + distance] = EMPTY_CASE;
        }
    }
}

function plannigExplode(x: number, y: number) {
    INITIAL_GRID[y][x] = BOMBE_CASE;

    for (let distance = 1; distance <= RANGE_EXPLOSION; distance++) {
        if (y - distance >= 0 && INITIAL_GRID[y - distance][x] === NODE_CASE) {
            INITIAL_GRID[y - distance][x] = FUTURE_BOMBED_NODE_CASE;
        } else if (y - distance >= 0 && INITIAL_GRID[y - distance][x] === INDESTRUCTIBLE_NODE_CASE) {
            break;
        }
    }

    for (let distance = 1; distance <= RANGE_EXPLOSION; distance++) {
        if (y + distance < GRID_HEIGHT && INITIAL_GRID[y + distance][x] === NODE_CASE) {
            INITIAL_GRID[y + distance][x] = FUTURE_BOMBED_NODE_CASE;
        } else if (y + distance < GRID_HEIGHT && INITIAL_GRID[y + distance][x] === INDESTRUCTIBLE_NODE_CASE) {
            break;
        }
    }

    for (let distance = 1; distance <= RANGE_EXPLOSION; distance++) {
        if (x - distance >= 0 && INITIAL_GRID[y][x - distance] === NODE_CASE) {
            INITIAL_GRID[y][x - distance] = FUTURE_BOMBED_NODE_CASE;
        } else if (x - distance >= 0 && INITIAL_GRID[y][x - distance] === INDESTRUCTIBLE_NODE_CASE) {
            break;
        }
    }

    for (let distance = 1; distance <= RANGE_EXPLOSION; distance++) {
        if (x + distance < GRID_WIDTH && INITIAL_GRID[y][x + distance] === NODE_CASE) {
            INITIAL_GRID[y][x + distance] = FUTURE_BOMBED_NODE_CASE;
        } else if (x + distance < GRID_WIDTH && INITIAL_GRID[y][x + distance] === INDESTRUCTIBLE_NODE_CASE) {
            break;
        }
    }
}

function findBetterBombPlacement(): Coordinate {
    let maxScore = 0;
    let betterPlacement: Coordinate = [-1, -1];
    for (let y = 0; y < GRID_HEIGHT; y++) {
        for (let x = 0; x < GRID_WIDTH; x++) {
            if (INITIAL_GRID[y][x] === EMPTY_CASE || INITIAL_GRID[y][x] === FUTURE_BOMBED_NODE_CASE) {
                const score = countScore(x, y);
                if (score > 0 && score > maxScore) {
                    maxScore = score;
                    betterPlacement = [x, y];
                }
            }
        }
    }
    return betterPlacement;
}

function debugGrid(grid: Grid) {
    grid.forEach(
        line => console.error(line.join(''))
    );
}

function main() {
    initGrid();

    let bombesCoordinateN: Coordinate = null;
    let bombesCoordinateN1: Coordinate = null;
    let bombesCoordinateN2: Coordinate = null;

    while (true) {

        const [ROUNDS, BOMBS] = readline().split(' ').map(value => parseInt(value, 10));

        if (BOMBS === 0) {
            console.log(WAIT_COMMAND);
            continue;
        }

        if (bombesCoordinateN2) {
            makeExplode(bombesCoordinateN2[0], bombesCoordinateN2[1]);
        }
        bombesCoordinateN2 = bombesCoordinateN1;
        bombesCoordinateN1 = bombesCoordinateN;
        bombesCoordinateN = null;

        debugGrid(INITIAL_GRID);

        const [X, Y] = findBetterBombPlacement();

        if (X === -1 || Y === -1) {
            console.log(WAIT_COMMAND);
        } else {
            if (INITIAL_GRID[Y][X] === EMPTY_CASE) {
                bombesCoordinateN = [X, Y];
                plannigExplode(bombesCoordinateN[0], bombesCoordinateN[1]);
                console.log(`${X} ${Y}`);
            } else {
                console.log(WAIT_COMMAND);
            }
        }

    }

}

main();
