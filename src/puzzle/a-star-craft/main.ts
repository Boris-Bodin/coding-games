declare function readline(): string;

declare interface Array<T> {
    flatMap<U>(callback: (value: T, index: number, array: T[]) => U[]): U[];

    find(predicate: (value: T, index: number, obj: T[]) => boolean): T | null;

    includes(searchElement: T, fromIndex?: number): boolean;
}

const HEIGHT: number = 10;
const WIDTH: number = 19;

type Direction = 'U' | 'D' | 'L' | 'R';
type CellType = '.' | '#' | Direction;
type Grid = Array<Array<Cell>>;
type Coordinates = {x: number; y: number};

class Cell {
    type: CellType;
    position: Coordinates;

    constructor(type: CellType, position: Coordinates) {
        this.type = type;
        this.position = position;
    }

    public isArrow(): this is Cell & {type: Direction} {
        return this.type === 'U' || this.type === 'D' || this.type === 'L' || this.type === 'R';
    }

    public isPlateform(): boolean {
        return this.type === '.';
    }
}

class Robot {
    public position: Coordinates;
    public direction: Direction;
    public isAlive: boolean = true;
    public historique: Array<Coordinates & {direction: Direction}> = [];

    constructor() {}

    public init(): void {
        const inputs: string[] = readline().split(' ');
        this.position = {x: parseInt(inputs[0]), y: parseInt(inputs[1])};
        this.direction = inputs[2] as Direction;
    }

    public move(grid: Grid): void {
        if (!this.isAlive) {
            return;
        }
        const cell: Cell = grid[this.position.y][this.position.x];
        if (cell.isArrow()) {
            this.direction = cell.type;
        }
        this.historique.push({x: this.position.x, y: this.position.y, direction: this.direction});
        this.position = this.getNextPosition(this.position, this.direction);

        this.checkAlive(grid);
    }

    private getNextPosition(position: Coordinates, direction: Direction): Coordinates {
        let newPosition: Coordinates = null;
        switch (direction) {
            case 'U':
                newPosition = {x: position.x, y: position.y - 1};
                break;
            case 'D':
                newPosition = {x: position.x, y: position.y + 1};
                break;
            case 'L':
                newPosition = {x: position.x - 1, y: position.y};
                break;
            case 'R':
                newPosition = {x: position.x + 1, y: position.y};
                break;
        }
        if (newPosition.x < 0) {
            newPosition.x = WIDTH - 1;
        }
        if (newPosition.x >= WIDTH) {
            newPosition.x = 0;
        }
        if (newPosition.y < 0) {
            newPosition.y = HEIGHT - 1;
        }
        if (newPosition.y >= HEIGHT) {
            newPosition.y = 0;
        }
        return newPosition;
    }

    private checkAlive(grid: Grid): void {
        const cell: Cell = grid[this.position.y][this.position.x];
        if (cell.type === '#') {
            this.isAlive = false;
            return;
        }
        this.isAlive = !this.historique.some((position: Coordinates & {direction: Direction}) => {
            return position.x === this.position.x && position.y === this.position.y && position.direction === this.direction;
        });
    }
}

class Board {
    public grid: Grid = [];
    public initialArrowPositions: Array<Coordinates> = [];
    public robots: Array<Robot> = [];
    public score: number = 0;

    constructor() {}

    public init(): void {
        for (let y = 0; y < HEIGHT; y++) {
            let row: Array<Cell> = readline()
                .split('')
                .map((value, x) => new Cell(value as CellType, {x, y}));
            row.filter(this.isArrow).forEach((cell: Cell) => this.initialArrowPositions.push(cell.position));
            this.grid.push(row);
        }

        const robotCount: number = parseInt(readline());
        for (let i = 0; i < robotCount; i++) {
            const robot: Robot = new Robot();
            robot.init();
            this.robots.push(robot);
        }
    }

    public clone(): Board {
        const board: Board = new Board();
        board.grid = this.grid.map((row: Array<Cell>) => row.map((cell: Cell) => new Cell(cell.type, cell.position)));
        board.robots = this.robots.map((robot: Robot) => {
            const newRobot: Robot = new Robot();
            newRobot.position = {...robot.position};
            newRobot.direction = robot.direction;
            newRobot.isAlive = robot.isAlive;
            newRobot.historique = robot.historique.map((position: Coordinates & {direction: Direction}) => ({
                ...position,
            }));
            return newRobot;
        });
        board.score = this.score;
        return board;
    }

    public run(): void {
        let currentAdditionScore: number = this.robots.length;
        this.score += currentAdditionScore;
        while (currentAdditionScore > 0) {
            this.robots.forEach((robot: Robot) => robot.move(this.grid));
            currentAdditionScore = this.robots.filter((robot: Robot) => robot.isAlive).length;
            this.score += currentAdditionScore;
        }
    }

    public getSolution(): Array<Cell> {
        return this.grid
            .flatMap((row: Array<Cell>) => row)
            .filter(this.isArrow)
            .filter((cell: Cell) => !this.initialArrowPositions.includes(cell.position));
    }

    private isArrow(cell: Cell): boolean {
        return cell.isArrow();
    }
}

class GameState {
    constructor(public board: Board) {}

    public findBestSolution(): Board {
        const defaultBoard: Board = this.board.clone();
        defaultBoard.run();
        let maxBoard = defaultBoard;

        const findLastPositionOfAllRobots: Array<Cell> = defaultBoard.robots.map((robot: Robot) => {
            const historique: Array<Coordinates & {direction: Direction}> = robot.historique.slice(0);
            let cellHisto = null;
            do {
                cellHisto = historique.pop();
            } while (!this.board.grid[cellHisto.y][cellHisto.x].isPlateform() && historique.length > 0);
            return new Cell(cellHisto.direction, {x: cellHisto.x, y: cellHisto.y});
        });

        const findAllPossibleArrows: Array<Cell> = findLastPositionOfAllRobots.flatMap((cell: Cell) => {
            return [
                new Cell('U', {x: cell.position.x, y: cell.position.y}),
                new Cell('D', {x: cell.position.x, y: cell.position.y}),
                new Cell('L', {x: cell.position.x, y: cell.position.y}),
                new Cell('R', {x: cell.position.x, y: cell.position.y}),
            ];
        });

        for (let i = 0; i < findAllPossibleArrows.length; i++) {
            const board: Board = this.board.clone();
            let cell: any = findAllPossibleArrows[i];
            board.grid[cell.position.y][cell.position.x] = cell;
            board.run();
            if (maxBoard.score < board.score) {
                maxBoard = board;
            }
        }
        return maxBoard;
    }

    public printSolution(): string {
        return this.board
            .getSolution()
            .map((cell: Cell) => `${cell.position.x} ${cell.position.y} ${cell.type}`)
            .join(' ');
    }
}

const MAX_ARROW = 2;

const BOARD: Board = new Board();
BOARD.init();
const gameState: GameState = new GameState(BOARD);

let lastScore = 0;
for (let i = 0; i < MAX_ARROW; i++) {
    const board = gameState.findBestSolution();
    board.getSolution().forEach((cell: Cell) => {
        gameState.board.grid[cell.position.y][cell.position.x] = cell;
    });

    if (board.score <= lastScore) {
        break;
    }
    lastScore = board.score;
    console.error(`Score: ${board.score}`, gameState.printSolution());
}

console.log(gameState.printSolution());
