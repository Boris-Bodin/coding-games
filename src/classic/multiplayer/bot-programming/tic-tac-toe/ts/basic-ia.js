export class BasicIa {
    constructor() {
    }
    solve(gameState) {
        this.gameState = gameState;
        const state = {
            player: 1,
            nextBoard: gameState.nextBoard,
            board: this.deepCopy(gameState.state),
            wins: [[0, 0, 0], [0, 0, 0], [0, 0, 0]]
        };
        const result = this.minmax(2, state);
        return [result[1], result[2], result[3], result[4]];
    }
    minmax(depth, state) {
        let best = [-1, -1, -1, -1];
        if (depth === 0 || (Date.now() - this.gameState.dateStart) > 90) {
            return [this.evaluate(state)].concat(best);
        }
        const next = this.generateMoves(state);
        let bestScore = (state.player === 2) ? 100000 : -100000;
        let score;
        if (next.length === 0) {
            bestScore = this.evaluate(state);
        }
        else {
            for (let i = 0; i < next.length; i++) {
                state.board[next[i][0]][next[i][1]][next[i][2]][next[i][3]] = state.player;
                this.handleWins(next[i][0], next[i][1], state.player, state);
                const newState = this.cloneState(state);
                newState.nextBoard = [next[i][2], next[i][3]];
                if (this.hasWon(newState.board[newState.nextBoard[0]][newState.nextBoard[1]], 1) ||
                    this.hasWon(newState.board[newState.nextBoard[0]][newState.nextBoard[1]], 2)) {
                    newState.nextBoard = null;
                }
                newState.player = state.player === 2 ? 1 : 2;
                score = this.minmax(depth - 1, newState)[0];
                if (state.player === 2 && score < bestScore ||
                    state.player === 1 && score > bestScore) {
                    bestScore = score;
                    best = [next[i][0], next[i][1], next[i][2], next[i][3]];
                }
                state.board[next[i][0]][next[i][1]][next[i][2]][next[i][3]] = 0;
            }
        }
        return [bestScore].concat(best);
    }
    evaluate(state) {
        let score = 0;
        if (this.hasWon(state.wins, 2)) {
            return -100000;
        }
        if (this.hasWon(state.wins, 1)) {
            return 100000;
        }
        for (let x = 0; x < 3; x++) {
            for (let y = 0; y < 3; y++) {
                if (this.hasWon(state.board[x][y], 1)) {
                    score += 100;
                }
                else if (this.hasWon(state.board[x][y], 2)) {
                    score -= 100;
                }
                else if (this.hasTwo(state.board[x][y], 1)) {
                    score += 10;
                }
            }
        }
        return score;
    }
    hasTwo(board, turn) {
        return (board[0][0] === turn && board[1][0] === turn && board[2][0] === 0)
            || (board[1][0] === turn && board[2][0] === turn && board[0][0] === 0)
            || (board[0][1] === turn && board[1][1] === turn && board[2][1] === 0)
            || (board[1][1] === turn && board[2][1] === turn && board[0][1] === 0)
            || (board[0][2] === turn && board[1][2] === turn && board[0][2] === 0)
            || (board[1][2] === turn && board[2][2] === turn && board[2][2] === 0)
            || (board[0][0] === turn && board[0][1] === turn && board[0][2] === 0)
            || (board[0][1] === turn && board[0][2] === turn && board[0][0] === 0)
            || (board[1][0] === turn && board[1][1] === turn && board[1][2] === 0)
            || (board[1][1] === turn && board[1][2] === turn && board[1][0] === 0)
            || (board[2][0] === turn && board[2][1] === turn && board[2][2] === 0)
            || (board[2][1] === turn && board[2][2] === turn && board[2][0] === 0)
            || (board[1][1] === turn && board[0][0] === turn && board[2][2] === 0)
            || (board[1][1] === turn && board[2][2] === turn && board[0][0] === 0)
            || (board[1][1] === turn && board[0][2] === turn && board[2][0] === 0)
            || (board[1][1] === turn && board[2][0] === turn && board[0][2] === 0)
            || (board[0][0] === turn && board[1][0] === 0 && board[2][0] === turn)
            || (board[0][1] === turn && board[1][1] === 0 && board[2][1] === turn)
            || (board[0][2] === turn && board[1][2] === 0 && board[2][2] === turn)
            || (board[0][0] === turn && board[0][1] === 0 && board[0][2] === turn)
            || (board[1][0] === turn && board[1][1] === 0 && board[1][2] === turn)
            || (board[2][0] === turn && board[2][1] === 0 && board[2][2] === turn)
            || (board[0][0] === turn && board[1][1] === 0 && board[2][2] === turn)
            || (board[2][0] === turn && board[1][1] === 0 && board[0][2] === turn);
    }
    generateMoves(state) {
        if (this.hasWon(state.wins, 1) || this.hasWon(state.wins, 2)) {
            return [];
        }
        let next = [];
        let x, y;
        if (state.nextBoard == null) {
            next = this.searchAll(state);
        }
        else {
            for (x = 0; x < 3; x++) {
                for (y = 0; y < 3; y++) {
                    if (state.board[state.nextBoard[0]][state.nextBoard[1]][x][y] === 0) {
                        next.push([state.nextBoard[0], state.nextBoard[1], x, y]);
                    }
                }
            }
            if (next.length === 0) {
                next = this.searchAll(state);
            }
        }
        return next;
    }
    searchAll(state) {
        const next = [];
        let i, j, x, y;
        for (i = 0; i < 3; i++) {
            for (j = 0; j < 3; j++) {
                if (!this.hasWon(state.board[i][j], 1) &&
                    !this.hasWon(state.board[i][j], 2)) {
                    for (x = 0; x < 3; x++) {
                        for (y = 0; y < 3; y++) {
                            if (state.board[i][j][x][y] === 0) {
                                next.push([i, j, x, y]);
                            }
                        }
                    }
                }
            }
        }
        return next;
    }
    handleWins(x, y, player, state) {
        if (state.wins[x][y] > 0) {
            return;
        }
        if (this.hasWon(state.board[x][y], player)) {
            state.wins[x][y] = player;
        }
    }
    hasWon(board, player) {
        const m00 = board[0][0] === player;
        const m10 = board[1][0] === player;
        const m20 = board[2][0] === player;
        const m01 = board[0][1] === player;
        const m11 = board[1][1] === player;
        const m21 = board[2][1] === player;
        const m02 = board[0][2] === player;
        const m12 = board[1][2] === player;
        const m22 = board[2][2] === player;
        return m00 && ((m10 && m20) || (m01 && m02) || (m11 && m22))
            || m11 && ((m01 && m21) || (m10 && m12) || (m20 && m02))
            || m22 && ((m02 && m12) || (m20 && m21));
    }
    cloneState(state) {
        return {
            player: state.player,
            board: this.deepCopy(state.board),
            nextBoard: state.nextBoard,
            wins: this.deepCopyBoard(state.wins)
        };
    }
    deepCopy(board) {
        const newBoard = [
            [[[0, 0, 0], [0, 0, 0], [0, 0, 0]], [[0, 0, 0], [0, 0, 0], [0, 0, 0]], [[0, 0, 0], [0, 0, 0], [0, 0, 0]]],
            [[[0, 0, 0], [0, 0, 0], [0, 0, 0]], [[0, 0, 0], [0, 0, 0], [0, 0, 0]], [[0, 0, 0], [0, 0, 0], [0, 0, 0]]],
            [[[0, 0, 0], [0, 0, 0], [0, 0, 0]], [[0, 0, 0], [0, 0, 0], [0, 0, 0]], [[0, 0, 0], [0, 0, 0], [0, 0, 0]]]
        ];
        let i, j, x, y;
        for (i = 0; i < 3; i++) {
            for (j = 0; j < 3; j++) {
                for (x = 0; x < 3; x++) {
                    for (y = 0; y < 3; y++) {
                        newBoard[i][j][x][y] = board[i][j][x][y];
                    }
                }
            }
        }
        return newBoard;
    }
    deepCopyBoard(wins) {
        const newBoard = [[0, 0, 0], [0, 0, 0], [0, 0, 0]];
        let i, j;
        for (i = 0; i < 3; i++) {
            for (j = 0; j < 3; j++) {
                newBoard[i][j] = wins[i][j];
            }
        }
        return newBoard;
    }
}
