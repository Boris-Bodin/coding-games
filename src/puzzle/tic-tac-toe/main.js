/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./ts/main.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./ts/basic-ia.js":
/*!************************!*\
  !*** ./ts/basic-ia.js ***!
  \************************/
/*! exports provided: BasicIa */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"BasicIa\", function() { return BasicIa; });\nclass BasicIa {\r\n    constructor() {\r\n    }\r\n    solve(gameState) {\r\n        this.gameState = gameState;\r\n        const state = {\r\n            player: 1,\r\n            nextBoard: gameState.nextBoard,\r\n            board: this.deepCopy(gameState.state),\r\n            wins: [[0, 0, 0], [0, 0, 0], [0, 0, 0]]\r\n        };\r\n        const result = this.minmax(2, state);\r\n        return [result[1], result[2], result[3], result[4]];\r\n    }\r\n    minmax(depth, state) {\r\n        let best = [-1, -1, -1, -1];\r\n        if (depth === 0 || (Date.now() - this.gameState.dateStart) > 90) {\r\n            return [this.evaluate(state)].concat(best);\r\n        }\r\n        const next = this.generateMoves(state);\r\n        let bestScore = (state.player === 2) ? 100000 : -100000;\r\n        let score;\r\n        if (next.length === 0) {\r\n            bestScore = this.evaluate(state);\r\n        }\r\n        else {\r\n            for (let i = 0; i < next.length; i++) {\r\n                state.board[next[i][0]][next[i][1]][next[i][2]][next[i][3]] = state.player;\r\n                this.handleWins(next[i][0], next[i][1], state.player, state);\r\n                const newState = this.cloneState(state);\r\n                newState.nextBoard = [next[i][2], next[i][3]];\r\n                if (this.hasWon(newState.board[newState.nextBoard[0]][newState.nextBoard[1]], 1) ||\r\n                    this.hasWon(newState.board[newState.nextBoard[0]][newState.nextBoard[1]], 2)) {\r\n                    newState.nextBoard = null;\r\n                }\r\n                newState.player = state.player === 2 ? 1 : 2;\r\n                score = this.minmax(depth - 1, newState)[0];\r\n                if (state.player === 2 && score < bestScore ||\r\n                    state.player === 1 && score > bestScore) {\r\n                    bestScore = score;\r\n                    best = [next[i][0], next[i][1], next[i][2], next[i][3]];\r\n                }\r\n                state.board[next[i][0]][next[i][1]][next[i][2]][next[i][3]] = 0;\r\n            }\r\n        }\r\n        return [bestScore].concat(best);\r\n    }\r\n    evaluate(state) {\r\n        let score = 0;\r\n        if (this.hasWon(state.wins, 2)) {\r\n            return -100000;\r\n        }\r\n        if (this.hasWon(state.wins, 1)) {\r\n            return 100000;\r\n        }\r\n        for (let x = 0; x < 3; x++) {\r\n            for (let y = 0; y < 3; y++) {\r\n                if (this.hasWon(state.board[x][y], 1)) {\r\n                    score += 100;\r\n                }\r\n                else if (this.hasWon(state.board[x][y], 2)) {\r\n                    score -= 100;\r\n                }\r\n                else if (this.hasTwo(state.board[x][y], 1)) {\r\n                    score += 10;\r\n                }\r\n            }\r\n        }\r\n        return score;\r\n    }\r\n    hasTwo(board, turn) {\r\n        return (board[0][0] === turn && board[1][0] === turn && board[2][0] === 0)\r\n            || (board[1][0] === turn && board[2][0] === turn && board[0][0] === 0)\r\n            || (board[0][1] === turn && board[1][1] === turn && board[2][1] === 0)\r\n            || (board[1][1] === turn && board[2][1] === turn && board[0][1] === 0)\r\n            || (board[0][2] === turn && board[1][2] === turn && board[0][2] === 0)\r\n            || (board[1][2] === turn && board[2][2] === turn && board[2][2] === 0)\r\n            || (board[0][0] === turn && board[0][1] === turn && board[0][2] === 0)\r\n            || (board[0][1] === turn && board[0][2] === turn && board[0][0] === 0)\r\n            || (board[1][0] === turn && board[1][1] === turn && board[1][2] === 0)\r\n            || (board[1][1] === turn && board[1][2] === turn && board[1][0] === 0)\r\n            || (board[2][0] === turn && board[2][1] === turn && board[2][2] === 0)\r\n            || (board[2][1] === turn && board[2][2] === turn && board[2][0] === 0)\r\n            || (board[1][1] === turn && board[0][0] === turn && board[2][2] === 0)\r\n            || (board[1][1] === turn && board[2][2] === turn && board[0][0] === 0)\r\n            || (board[1][1] === turn && board[0][2] === turn && board[2][0] === 0)\r\n            || (board[1][1] === turn && board[2][0] === turn && board[0][2] === 0)\r\n            || (board[0][0] === turn && board[1][0] === 0 && board[2][0] === turn)\r\n            || (board[0][1] === turn && board[1][1] === 0 && board[2][1] === turn)\r\n            || (board[0][2] === turn && board[1][2] === 0 && board[2][2] === turn)\r\n            || (board[0][0] === turn && board[0][1] === 0 && board[0][2] === turn)\r\n            || (board[1][0] === turn && board[1][1] === 0 && board[1][2] === turn)\r\n            || (board[2][0] === turn && board[2][1] === 0 && board[2][2] === turn)\r\n            || (board[0][0] === turn && board[1][1] === 0 && board[2][2] === turn)\r\n            || (board[2][0] === turn && board[1][1] === 0 && board[0][2] === turn);\r\n    }\r\n    generateMoves(state) {\r\n        if (this.hasWon(state.wins, 1) || this.hasWon(state.wins, 2)) {\r\n            return [];\r\n        }\r\n        let next = [];\r\n        let x, y;\r\n        if (state.nextBoard == null) {\r\n            next = this.searchAll(state);\r\n        }\r\n        else {\r\n            for (x = 0; x < 3; x++) {\r\n                for (y = 0; y < 3; y++) {\r\n                    if (state.board[state.nextBoard[0]][state.nextBoard[1]][x][y] === 0) {\r\n                        next.push([state.nextBoard[0], state.nextBoard[1], x, y]);\r\n                    }\r\n                }\r\n            }\r\n            if (next.length === 0) {\r\n                next = this.searchAll(state);\r\n            }\r\n        }\r\n        return next;\r\n    }\r\n    searchAll(state) {\r\n        const next = [];\r\n        let i, j, x, y;\r\n        for (i = 0; i < 3; i++) {\r\n            for (j = 0; j < 3; j++) {\r\n                if (!this.hasWon(state.board[i][j], 1) &&\r\n                    !this.hasWon(state.board[i][j], 2)) {\r\n                    for (x = 0; x < 3; x++) {\r\n                        for (y = 0; y < 3; y++) {\r\n                            if (state.board[i][j][x][y] === 0) {\r\n                                next.push([i, j, x, y]);\r\n                            }\r\n                        }\r\n                    }\r\n                }\r\n            }\r\n        }\r\n        return next;\r\n    }\r\n    handleWins(x, y, player, state) {\r\n        if (state.wins[x][y] > 0) {\r\n            return;\r\n        }\r\n        if (this.hasWon(state.board[x][y], player)) {\r\n            state.wins[x][y] = player;\r\n        }\r\n    }\r\n    hasWon(board, player) {\r\n        const m00 = board[0][0] === player;\r\n        const m10 = board[1][0] === player;\r\n        const m20 = board[2][0] === player;\r\n        const m01 = board[0][1] === player;\r\n        const m11 = board[1][1] === player;\r\n        const m21 = board[2][1] === player;\r\n        const m02 = board[0][2] === player;\r\n        const m12 = board[1][2] === player;\r\n        const m22 = board[2][2] === player;\r\n        return m00 && ((m10 && m20) || (m01 && m02) || (m11 && m22))\r\n            || m11 && ((m01 && m21) || (m10 && m12) || (m20 && m02))\r\n            || m22 && ((m02 && m12) || (m20 && m21));\r\n    }\r\n    cloneState(state) {\r\n        return {\r\n            player: state.player,\r\n            board: this.deepCopy(state.board),\r\n            nextBoard: state.nextBoard,\r\n            wins: this.deepCopyBoard(state.wins)\r\n        };\r\n    }\r\n    deepCopy(board) {\r\n        const newBoard = [\r\n            [[[0, 0, 0], [0, 0, 0], [0, 0, 0]], [[0, 0, 0], [0, 0, 0], [0, 0, 0]], [[0, 0, 0], [0, 0, 0], [0, 0, 0]]],\r\n            [[[0, 0, 0], [0, 0, 0], [0, 0, 0]], [[0, 0, 0], [0, 0, 0], [0, 0, 0]], [[0, 0, 0], [0, 0, 0], [0, 0, 0]]],\r\n            [[[0, 0, 0], [0, 0, 0], [0, 0, 0]], [[0, 0, 0], [0, 0, 0], [0, 0, 0]], [[0, 0, 0], [0, 0, 0], [0, 0, 0]]]\r\n        ];\r\n        let i, j, x, y;\r\n        for (i = 0; i < 3; i++) {\r\n            for (j = 0; j < 3; j++) {\r\n                for (x = 0; x < 3; x++) {\r\n                    for (y = 0; y < 3; y++) {\r\n                        newBoard[i][j][x][y] = board[i][j][x][y];\r\n                    }\r\n                }\r\n            }\r\n        }\r\n        return newBoard;\r\n    }\r\n    deepCopyBoard(wins) {\r\n        const newBoard = [[0, 0, 0], [0, 0, 0], [0, 0, 0]];\r\n        let i, j;\r\n        for (i = 0; i < 3; i++) {\r\n            for (j = 0; j < 3; j++) {\r\n                newBoard[i][j] = wins[i][j];\r\n            }\r\n        }\r\n        return newBoard;\r\n    }\r\n}\r\n\n\n//# sourceURL=webpack:///./ts/basic-ia.js?");

/***/ }),

/***/ "./ts/game-state.js":
/*!**************************!*\
  !*** ./ts/game-state.js ***!
  \**************************/
/*! exports provided: GameState */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"GameState\", function() { return GameState; });\n/* harmony import */ var _basic_ia__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./basic-ia */ \"./ts/basic-ia.js\");\n\r\nclass GameState {\r\n    constructor() {\r\n        this.ai = new _basic_ia__WEBPACK_IMPORTED_MODULE_0__[\"BasicIa\"]();\r\n        this.state = [\r\n            [[[0, 0, 0], [0, 0, 0], [0, 0, 0]], [[0, 0, 0], [0, 0, 0], [0, 0, 0]], [[0, 0, 0], [0, 0, 0], [0, 0, 0]]],\r\n            [[[0, 0, 0], [0, 0, 0], [0, 0, 0]], [[0, 0, 0], [0, 0, 0], [0, 0, 0]], [[0, 0, 0], [0, 0, 0], [0, 0, 0]]],\r\n            [[[0, 0, 0], [0, 0, 0], [0, 0, 0]], [[0, 0, 0], [0, 0, 0], [0, 0, 0]], [[0, 0, 0], [0, 0, 0], [0, 0, 0]]]\r\n        ];\r\n        this.wins = [[0, 0, 0], [0, 0, 0], [0, 0, 0]];\r\n        this.nextBoard = null;\r\n    }\r\n    bootstrap() {\r\n        do {\r\n            let inputs = readline().split(' ');\r\n            this.dateStart = Date.now();\r\n            const opponentRow = parseInt(inputs[0], 10);\r\n            const opponentCol = parseInt(inputs[1], 10);\r\n            if (opponentRow > -1) {\r\n                const lx = Math.floor(opponentRow / 3);\r\n                const ly = Math.floor(opponentCol / 3);\r\n                this.state[lx][ly][opponentRow % 3][opponentCol % 3] = 2;\r\n                this.handleWins(lx, ly, 2);\r\n                this.nextBoard = [opponentRow % 3, opponentCol % 3];\r\n                if (this.wins[opponentRow % 3][opponentCol % 3] !== 0) {\r\n                    this.nextBoard = null;\r\n                }\r\n            }\r\n            const validActionCount = parseInt(readline(), 10);\r\n            for (let i = 0; i < validActionCount; i++) {\r\n                inputs = readline().split(' ');\r\n                const row = parseInt(inputs[0], 10);\r\n                const col = parseInt(inputs[1], 10);\r\n            }\r\n            const move = this.ai.solve(this);\r\n            print(((move[0] * 3) + move[2]) + ' ' + ((move[1] * 3) + move[3]));\r\n            this.nextBoard = [move[0], move[1]];\r\n            this.go(move[2], move[3]);\r\n            if (this.nextBoard != null && this.isSubBoardFull(this.getCurrentSubBoard())) {\r\n                this.nextBoard = null;\r\n            }\r\n        } while (!this.hasWon(1) && !this.hasWon(2));\r\n    }\r\n    handleWins(x, y, turn = 1) {\r\n        const board = this.state[x][y];\r\n        if (this.wins[x][y] > 0) {\r\n            return;\r\n        }\r\n        if (board[0][0] === turn && board[1][0] === turn && board[2][0] === turn) {\r\n            this.wins[x][y] = turn;\r\n        }\r\n        if (board[0][1] === turn && board[1][1] === turn && board[2][1] === turn) {\r\n            this.wins[x][y] = turn;\r\n        }\r\n        if (board[0][2] === turn && board[1][2] === turn && board[2][2] === turn) {\r\n            this.wins[x][y] = turn;\r\n        }\r\n        if (board[0][0] === turn && board[0][1] === turn && board[0][2] === turn) {\r\n            this.wins[x][y] = turn;\r\n        }\r\n        if (board[1][0] === turn && board[1][1] === turn && board[1][2] === turn) {\r\n            this.wins[x][y] = turn;\r\n        }\r\n        if (board[2][0] === turn && board[2][1] === turn && board[2][2] === turn) {\r\n            this.wins[x][y] = turn;\r\n        }\r\n        if (board[0][0] === turn && board[1][1] === turn && board[2][2] === turn) {\r\n            this.wins[x][y] = turn;\r\n        }\r\n        if (board[2][0] === turn && board[1][1] === turn && board[0][2] === turn) {\r\n            this.wins[x][y] = turn;\r\n        }\r\n    }\r\n    hasWon(turn) {\r\n        return (this.wins[0][0] === turn && this.wins[1][0] === turn && this.wins[2][0] === turn)\r\n            || (this.wins[0][1] === turn && this.wins[1][1] === turn && this.wins[2][1] === turn)\r\n            || (this.wins[0][2] === turn && this.wins[1][2] === turn && this.wins[2][2] === turn)\r\n            || (this.wins[0][0] === turn && this.wins[0][1] === turn && this.wins[0][2] === turn)\r\n            || (this.wins[1][0] === turn && this.wins[1][1] === turn && this.wins[1][2] === turn)\r\n            || (this.wins[2][0] === turn && this.wins[2][1] === turn && this.wins[2][2] === turn)\r\n            || (this.wins[0][0] === turn && this.wins[1][1] === turn && this.wins[2][2] === turn)\r\n            || (this.wins[2][0] === turn && this.wins[1][1] === turn && this.wins[0][2] === turn);\r\n    }\r\n    go(lx, ly) {\r\n        this.state[this.nextBoard[0]][this.nextBoard[1]][lx][ly] = 1;\r\n        this.handleWins(this.nextBoard[0], this.nextBoard[1], 1);\r\n        this.nextBoard = [lx, ly];\r\n    }\r\n    isSubBoardFull(board) {\r\n        if (board == null) {\r\n            return false;\r\n        }\r\n        return board[0][0] !== 0 && board[1][0] !== 0 && board[2][0] !== 0\r\n            && board[0][1] !== 0 && board[1][1] !== 0 && board[2][1] !== 0\r\n            && board[0][2] !== 0 && board[1][2] !== 0 && board[2][2] !== 0;\r\n    }\r\n    getCurrentSubBoard() {\r\n        return this.state[this.nextBoard[0]][this.nextBoard[1]];\r\n    }\r\n}\r\n\n\n//# sourceURL=webpack:///./ts/game-state.js?");

/***/ }),

/***/ "./ts/main.js":
/*!********************!*\
  !*** ./ts/main.js ***!
  \********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _game_state__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./game-state */ \"./ts/game-state.js\");\n\r\nconst gameState = new _game_state__WEBPACK_IMPORTED_MODULE_0__[\"GameState\"]();\r\ngameState.bootstrap();\r\n\n\n//# sourceURL=webpack:///./ts/main.js?");

/***/ })

/******/ });