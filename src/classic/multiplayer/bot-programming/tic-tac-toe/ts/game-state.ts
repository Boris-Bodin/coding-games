import { BasicIa } from './basic-ia';

export class GameState {

    public ai = new BasicIa();

    public state =
        [
            [[[0, 0, 0], [0, 0, 0], [0, 0, 0]], [[0, 0, 0], [0, 0, 0], [0, 0, 0]], [[0, 0, 0], [0, 0, 0], [0, 0, 0]]],
            [[[0, 0, 0], [0, 0, 0], [0, 0, 0]], [[0, 0, 0], [0, 0, 0], [0, 0, 0]], [[0, 0, 0], [0, 0, 0], [0, 0, 0]]],
            [[[0, 0, 0], [0, 0, 0], [0, 0, 0]], [[0, 0, 0], [0, 0, 0], [0, 0, 0]], [[0, 0, 0], [0, 0, 0], [0, 0, 0]]]
        ];

    public wins = [[0, 0, 0], [0, 0, 0], [0, 0, 0]];

    public nextBoard: number[] = null;
    public dateStart: number;


    constructor() {
    }

    public bootstrap() {

        do {
            let inputs = readline().split(' ');
            this.dateStart = Date.now();
            const opponentRow = parseInt(inputs[0], 10);
            const opponentCol = parseInt(inputs[1], 10);
            if (opponentRow > -1) {
                const lx = Math.floor(opponentRow / 3);
                const ly = Math.floor(opponentCol / 3);
                this.state[lx][ly][opponentRow % 3][opponentCol % 3] = 2;
                this.handleWins(lx, ly, 2);
                this.nextBoard =  [opponentRow % 3, opponentCol % 3];
                if (this.wins[opponentRow % 3][opponentCol % 3] !== 0) {
                    this.nextBoard = null;
                }
            }
            const validActionCount = parseInt(readline(), 10);
            for (let i = 0; i < validActionCount; i++) {
                inputs = readline().split(' ');
                const row = parseInt(inputs[0], 10);
                const col = parseInt(inputs[1], 10);
            }

            const move = this.ai.solve(this);
            print(((move[0] * 3) + move[2]) + ' ' + ((move[1] * 3) + move[3]));

            this.nextBoard = [move[0], move[1]];
            this.go(move[2], move[3]);

            if (this.nextBoard != null && this.isSubBoardFull(this.getCurrentSubBoard())) {
                this.nextBoard = null;
            }

        }  while (!this.hasWon(1) && !this.hasWon(2));
    }

    public handleWins(x: number, y: number, turn = 1) {

        const board = this.state[x][y];
        if (this.wins[x][y] > 0) {
            return;
        }

        if (board[0][0] === turn && board[1][0] === turn && board[2][0] === turn) {
            this.wins[x][y] = turn;
        }
        if (board[0][1] === turn && board[1][1] === turn && board[2][1] === turn) {
            this.wins[x][y] = turn;
        }
        if (board[0][2] === turn && board[1][2] === turn && board[2][2] === turn) {
            this.wins[x][y] = turn;
        }
        // vertical
        if (board[0][0] === turn && board[0][1] === turn && board[0][2] === turn) {
            this.wins[x][y] = turn;
        }
        if (board[1][0] === turn && board[1][1] === turn && board[1][2] === turn) {
            this.wins[x][y] = turn;
        }
        if (board[2][0] === turn && board[2][1] === turn && board[2][2] === turn) {
            this.wins[x][y] = turn;
        }
        // diagonal
        if (board[0][0] === turn && board[1][1] === turn && board[2][2] === turn) {
            this.wins[x][y] = turn;
        }
        if (board[2][0] === turn && board[1][1] === turn && board[0][2] === turn) {
            this.wins[x][y] = turn;
        }
    }

    public hasWon(turn: number) {
        return (this.wins[0][0] === turn && this.wins[1][0] === turn && this.wins[2][0] === turn)
            || (this.wins[0][1] === turn && this.wins[1][1] === turn && this.wins[2][1] === turn)
            || (this.wins[0][2] === turn && this.wins[1][2] === turn && this.wins[2][2] === turn)
            || (this.wins[0][0] === turn && this.wins[0][1] === turn && this.wins[0][2] === turn)
            || (this.wins[1][0] === turn && this.wins[1][1] === turn && this.wins[1][2] === turn)
            || (this.wins[2][0] === turn && this.wins[2][1] === turn && this.wins[2][2] === turn)
            || (this.wins[0][0] === turn && this.wins[1][1] === turn && this.wins[2][2] === turn)
            || (this.wins[2][0] === turn && this.wins[1][1] === turn && this.wins[0][2] === turn);

    }

    private go(lx: any, ly: any) {
        this.state[this.nextBoard[0]][this.nextBoard[1]][lx][ly] = 1;
        this.handleWins(this.nextBoard[0], this.nextBoard[1], 1);
        this.nextBoard = [lx, ly];
    }

    private isSubBoardFull(board: any) {
        if (board == null) {
            return false;
        }
        return board[0][0] !== 0 && board[1][0] !== 0 && board[2][0] !== 0
            && board[0][1] !== 0 && board[1][1] !== 0 && board[2][1] !== 0
            && board[0][2] !== 0 && board[1][2] !== 0 && board[2][2] !== 0;
    }

    private getCurrentSubBoard() {
        return this.state[this.nextBoard[0]][this.nextBoard[1]];
    }
}
