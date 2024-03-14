declare function readline(): string;

interface Array<T> {
    flatMap<U>(callback: (value: T, index: number, array: T[]) => U[]): U[];

    find(predicate: (value: T, index: number, obj: T[]) => boolean): T | null;

    includes(searchElement: T, fromIndex?: number): boolean;
}

const INDESTRUCTIBLE_NODE_CASE = '#';
const NODE_CASE = '@';
const FUTURE_DESTROYED_NODE_CASE = '-';
const EMPTY_CASE = '.';
const BOMBE_CASE = '+';

const DELAY_EXPLOSION = 3;
const RANGE_EXPLOSION = 3;

const MAX_ROUND = 20;
const MAX_BOMBES = 10;

const WAIT_COMMAND = 'WAIT';
const NEW_LINE = '\n';

const SIMULATION_MAX_SOLUTION = 3;
const SIMULATION_MAX_ROUND = 3;

const [GRID_WIDTH, GRID_HEIGHT] = readline().split(' ').map(value => parseInt(value, 10));

const SCORE_MAX = GRID_HEIGHT * GRID_WIDTH;

type Grid = Array<Array<string>>;
type Coordinate = [number, number];
type PossiblePlacement = { position: Coordinate, score: number };

class GameState {
    public grid: Grid = [];

    public remainingNodes = 0;

    static fromInput() {
        const [ROUNDS, BOMBS] = readline().split(' ').map(value => parseInt(value, 10));

        const grid: Grid = [];
        for (let i = 0; i < GRID_HEIGHT; i++) {
            const line = readline();
            grid[i] = line.split('');
        }

        return new GameState(grid, BOMBS, ROUNDS);
    }

    static copy(state: GameState) {
        const newState = new GameState(state.grid, state.remainingBombs, state.remainingRound);
        newState.bombesN = state.bombesN;
        newState.bombesNMinus1 = state.bombesNMinus1;
        newState.pastCommands = state.pastCommands.slice(0);
        newState.remainingNodes = state.remainingNodes;
        return newState;
    }

    constructor(
        grid: Grid,
        public remainingBombs: number,
        public remainingRound: number,
        public bombesN: Coordinate = null,
        public bombesNMinus1: Coordinate = null,
        public pastCommands: Array<string> = []) {
        this.copyGrid(grid, this.grid);

        this.updateRemainingNodes();
    }

    private copyGrid(grid: Array<Array<string>>, resultGrid: Array<Array<string>>) {
        for (let i = 0; i < GRID_HEIGHT; i++) {
            resultGrid[i] = [];
            for (let j = 0; j < GRID_WIDTH; j++) {
                resultGrid[i][j] = grid[i][j];
            }
        }
    }

    private updateRemainingNodes() {
        this.remainingNodes = this.grid.flatMap(line => line).filter(value => value === NODE_CASE).length;
    }

    public run(command: string) {
        if (this.bombesNMinus1) {
            this.makeExplode(this.bombesNMinus1[0], this.bombesNMinus1[1]);
        }
        this.bombesNMinus1 = this.bombesN;
        this.bombesN = null;
        if (command !== WAIT_COMMAND) {
            this.bombesN = command.split(' ').map(value => parseInt(value, 10)) as Coordinate;
            this.grid[this.bombesN[1]][this.bombesN[0]] = BOMBE_CASE;
            this.remainingBombs--;
            this.markHasDestroyed(this.bombesN[0], this.bombesN[1]);
        }
        this.pastCommands.push(command);
        this.remainingRound--;

        this.updateRemainingNodes();
    }

    private makeExplode(x: number, y: number) {
        if (this.grid[y][x] !== BOMBE_CASE) {
            return;
        }
        this.grid[y][x] = EMPTY_CASE;

        for (let distance = 1; distance <= RANGE_EXPLOSION; distance++) {
            if (y - distance >= 0 && this.grid[y - distance][x] === INDESTRUCTIBLE_NODE_CASE) {
                break;
            } else if (y - distance >= 0 && this.grid[y - distance][x] === BOMBE_CASE) {
                this.makeExplode(x, y - distance);
            } else if (y - distance >= 0) {
                this.grid[y - distance][x] = EMPTY_CASE;
            }
        }

        for (let distance = 1; distance <= RANGE_EXPLOSION; distance++) {
            if (y + distance < GRID_HEIGHT && this.grid[y + distance][x] === INDESTRUCTIBLE_NODE_CASE) {
                break;
            } else if (y + distance < GRID_HEIGHT && this.grid[y + distance][x] === BOMBE_CASE) {
                this.makeExplode(x, y + distance);
            } else if (y + distance < GRID_HEIGHT) {
                this.grid[y + distance][x] = EMPTY_CASE;
            }
        }

        for (let distance = 1; distance <= RANGE_EXPLOSION; distance++) {
            if (x - distance >= 0 && this.grid[y][x - distance] === INDESTRUCTIBLE_NODE_CASE) {
                break;
            } else if (x - distance >= 0 && this.grid[y][x - distance] === BOMBE_CASE) {
                this.makeExplode(x - distance, y);
            } else if (x - distance >= 0) {
                this.grid[y][x - distance] = EMPTY_CASE;
            }
        }

        for (let distance = 1; distance <= RANGE_EXPLOSION; distance++) {
            if (x + distance < GRID_WIDTH && this.grid[y][x + distance] === INDESTRUCTIBLE_NODE_CASE) {
                break;
            } else if (x + distance < GRID_WIDTH && this.grid[y][x + distance] === BOMBE_CASE) {
                this.makeExplode(x + distance, y);
            } else if (x + distance < GRID_WIDTH) {
                this.grid[y][x + distance] = EMPTY_CASE;
            }
        }
    }

    public findPossibleBombPlacements(): Array<PossiblePlacement> {
        if (this.remainingBombs === 0) {
            return [];
        }
        const positions = [];
        for (let y = 0; y < GRID_HEIGHT; y++) {
            for (let x = 0; x < GRID_WIDTH; x++) {
                if (this.grid[y][x] === EMPTY_CASE) {
                    const score = this.countScore(x, y);
                    if (score > 0) {
                        positions.push({
                            position: [x, y],
                            score,
                        });
                    }
                }
            }
        }
        return positions;
    }

    private countScore(x: number, y: number): number {
        let score = 0;
        for (let distance = 1; distance <= RANGE_EXPLOSION; distance++) {
            if (y - distance >= 0 && this.grid[y - distance][x] === NODE_CASE) {
                score++;
            } else if (y - distance >= 0 && this.grid[y - distance][x] === INDESTRUCTIBLE_NODE_CASE) {
                break;
            }
        }

        for (let distance = 1; distance <= RANGE_EXPLOSION; distance++) {
            if (y + distance < GRID_HEIGHT && this.grid[y + distance][x] === NODE_CASE) {
                score++;
            } else if (y + distance < GRID_HEIGHT && this.grid[y + distance][x] === INDESTRUCTIBLE_NODE_CASE) {
                break;
            }
        }

        for (let distance = 1; distance <= RANGE_EXPLOSION; distance++) {
            if (x - distance >= 0 && this.grid[y][x - distance] === NODE_CASE) {
                score++;
            } else if (x - distance >= 0 && this.grid[y][x - distance] === INDESTRUCTIBLE_NODE_CASE) {
                break;
            }
        }

        for (let distance = 1; distance <= RANGE_EXPLOSION; distance++) {
            if (x + distance < GRID_WIDTH && this.grid[y][x + distance] === NODE_CASE) {
                score++;
            } else if (x + distance < GRID_WIDTH && this.grid[y][x + distance] === INDESTRUCTIBLE_NODE_CASE) {
                break;
            }
        }

        return score;
    }

    public toString() {
        return `Round: ${this.remainingRound}` + NEW_LINE
            + `Remaining nodes: ${this.remainingNodes}` + NEW_LINE
            + `Remaining bombs: ${this.remainingBombs}` + NEW_LINE
            + `Bombes N: ${this.bombesN}` + NEW_LINE
            + `Bombes N-1: ${this.bombesNMinus1}` + NEW_LINE
            + `Past commands: ${this.pastCommands.map(line => '(' + line.replace(' ', ',') + ')').join(' ')}` + NEW_LINE
            + this.grid.map(line => line.join(' ')).join(NEW_LINE);
    }

    public isEnd() {
        return this.remainingRound === 0 || this.remainingNodes === 0;
    }

    public score() {
        if (this.remainingNodes === 0) {
            return SCORE_MAX + this.remainingRound;
        }
        if (this.remainingRound === 0) {
            return -1;
        }
        return SCORE_MAX - this.grid.flatMap(line => line).filter(value => value === NODE_CASE).length;
    }

    private markHasDestroyed(x: number, y: number) {

        for (let distance = 1; distance <= RANGE_EXPLOSION; distance++) {
            if (y - distance >= 0 && this.grid[y - distance][x] === NODE_CASE) {
                this.grid[y - distance][x] = FUTURE_DESTROYED_NODE_CASE;
            } else if (y - distance >= 0 && this.grid[y - distance][x] === INDESTRUCTIBLE_NODE_CASE) {
                break;
            }
        }

        for (let distance = 1; distance <= RANGE_EXPLOSION; distance++) {
            if (y + distance < GRID_HEIGHT && this.grid[y + distance][x] === NODE_CASE) {
                this.grid[y + distance][x] = FUTURE_DESTROYED_NODE_CASE;
            } else if (y + distance < GRID_HEIGHT && this.grid[y + distance][x] === INDESTRUCTIBLE_NODE_CASE) {
                break;
            }
        }

        for (let distance = 1; distance <= RANGE_EXPLOSION; distance++) {
            if (x - distance >= 0 && this.grid[y][x - distance] === NODE_CASE) {
                this.grid[y][x - distance] = FUTURE_DESTROYED_NODE_CASE;
            } else if (x - distance >= 0 && this.grid[y][x - distance] === INDESTRUCTIBLE_NODE_CASE) {
                break;
            }
        }

        for (let distance = 1; distance <= RANGE_EXPLOSION; distance++) {
            if (x + distance < GRID_WIDTH && this.grid[y][x + distance] === NODE_CASE) {
                this.grid[y][x + distance] = FUTURE_DESTROYED_NODE_CASE;
            } else if (x + distance < GRID_WIDTH && this.grid[y][x + distance] === INDESTRUCTIBLE_NODE_CASE) {
                break;
            }
        }

    }
}


function simulate(state: GameState, simulateTurn: number): Array<GameState> {

    if (simulateTurn === -1 || state.isEnd()) {
        return [state];
    }

    const possibleBombPlacements = state.findPossibleBombPlacements();
    possibleBombPlacements.sort((a, b) => b.score - a.score);

    const possibleSolutions: Array<string> = [
        WAIT_COMMAND,
        ...possibleBombPlacements
            .slice(0, SIMULATION_MAX_SOLUTION)
            .map(value => `${value.position[0]} ${value.position[1]}`),
    ];

    return possibleSolutions.flatMap(command => {
        const newState = GameState.copy(state);
        newState.run(command);
        return simulate(newState, simulateTurn - 1);
    });
}

function main() {

    let currentRounds = 0;

    while (true) {
        const state: GameState = GameState.fromInput();

        let nextCommand = WAIT_COMMAND;

        if (!state.isEnd()) {

            console.error(state.toString());

            const allSolutions: Array<GameState> = simulate(state, SIMULATION_MAX_ROUND);

            console.error('Nb solutions : ' + allSolutions.length);
            console.error(allSolutions.map(s => s.score()));

            const bestState = allSolutions.sort((a, b) => b.score() - a.score())[0];

            nextCommand = bestState.pastCommands[currentRounds];
        }

        console.log(nextCommand);
        state.run(nextCommand);
        currentRounds++;

    }
}

main();
