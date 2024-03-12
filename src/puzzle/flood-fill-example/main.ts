const GRID_WIDTH = parseInt(readline(), 10);
const GRID_HEIGHT = parseInt(readline(), 10);

type Grid = Array<Array<string>>;

const INITIAL_GRID: Grid = [];

function initGrid() {
    for (let i = 0; i < GRID_HEIGHT; i++) {
        const line = readline();
        INITIAL_GRID[i] = line.split('');
    }
}

const REVERSE_ID_MAP: { [key: string]: string } = {};

function idMapping(grid: Grid) {
    let idCounter = 0;

    for (let i = 0; i < GRID_HEIGHT; i++) {
        for (let j = 0; j < GRID_WIDTH; j++) {
            const c = grid[i][j];
            if (c !== '.' && c !== '+' && c !== '#') {
                const newId = String.fromCharCode('A'.charCodeAt(0) + idCounter);
                grid[i][j] = newId;
                REVERSE_ID_MAP[newId] = c;
                idCounter++;
            }
        }
    }
}

function reverseIdMapping(grid: Grid) {
    for (let i = 0; i < GRID_HEIGHT; i++) {
        for (let j = 0; j < GRID_WIDTH; j++) {
            const c = grid[i][j];
            if (c !== '.' && c !== '+' && c !== '#') {
                grid[i][j] = REVERSE_ID_MAP[c];
            }
        }
    }
}

function copyGrid(grid: Array<Array<string>>, resultGrid: Array<Array<string>>) {
    for (let i = 0; i < GRID_HEIGHT; i++) {
        resultGrid[i] = [];
        for (let j = 0; j < GRID_WIDTH; j++) {
            resultGrid[i][j] = grid[i][j];
        }
    }
}

function getUniqueNeighBors(grid: Array<Array<string>>, x: number, y: number) {
    const neighbors: Array<string> = [];

    const top = y > 0 ? grid[y - 1][x] : null;
    if (top && top !== '.' && top !== '#') {
        neighbors.push(top);
    }

    const bottom = y < GRID_HEIGHT - 1 ? grid[y + 1][x] : null;
    if (bottom && bottom !== '.' && bottom !== '#') {
        neighbors.push(bottom);
    }

    const left = x > 0 ? grid[y][x - 1] : null;
    if (left && left !== '.' && left !== '#') {
        neighbors.push(left);
    }

    const right = x < GRID_WIDTH - 1 ? grid[y][x + 1] : null;
    if (right && right !== '.' && right !== '#') {
        neighbors.push(right);
    }

    return Array.from(new Set(neighbors));
}

function processFlood(grid: Grid): { grid: Grid; hasChanged: boolean } {
    let hasChanged = false;
    const resultGrid: Grid = [];

    copyGrid(grid, resultGrid);

    for (let y = 0; y < GRID_HEIGHT; y++) {
        for (let x = 0; x < GRID_WIDTH; x++) {
            const c = grid[y][x];
            if (c === '.') {
                const uniqueNeighbors = getUniqueNeighBors(grid, x, y);
                if (uniqueNeighbors.length === 1) {
                    resultGrid[y][x] = uniqueNeighbors[0];
                    hasChanged = true;
                } else if (uniqueNeighbors.length > 1) {
                    resultGrid[y][x] = '+';
                    hasChanged = true;
                }
            }
        }
    }
    return {hasChanged, grid: resultGrid};
}

function main() {
    initGrid();

    let currentGrid: Grid = [];
    copyGrid(INITIAL_GRID, currentGrid);
    idMapping(currentGrid);

    let hasChange = true;
    while (hasChange) {
        const result = processFlood(currentGrid);
        hasChange = result.hasChanged;
        currentGrid = result.grid;
    }

    reverseIdMapping(currentGrid);

    currentGrid.forEach(x => console.log(x.join('')));
}

main();
