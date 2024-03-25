var TILES_SCORE = {};
var EMPTY_BOARD = [];
var PREVIOUS_BOARD = [];
var PLAYED_BOARD = [];
function initTilesScore() {
    var nbTiles = parseInt(readline(), 10);
    for (var i = 0; i < nbTiles; i++) {
        var inputs = readline().split(' ');
        TILES_SCORE[inputs[0]] = parseInt(inputs[1], 10);
    }
}
function initBoards() {
    for (var i = 0; i < BOARD_HEIGHT; i++) {
        EMPTY_BOARD.push(readline().split(''));
    }
    for (var i = 0; i < BOARD_HEIGHT; i++) {
        PREVIOUS_BOARD.push(readline().split(''));
    }
    for (var i = 0; i < BOARD_HEIGHT; i++) {
        PLAYED_BOARD.push(readline().split(''));
    }
}
function findNewTiles() {
    var res = [];
    for (var i = 0; i < BOARD_HEIGHT; i++) {
        for (var j = 0; j < BOARD_WIDTH; j++) {
            if (PREVIOUS_BOARD[i][j] !== PLAYED_BOARD[i][j]) {
                res.push({ y: i, x: j });
            }
        }
    }
    return res;
}
function findWords(tilePosition, board) {
    var res = [];
    var x = tilePosition.x, y = tilePosition.y;
    var word = [];
    var i = 0;
    while (x - i >= 0 && board[y][x - i] !== '.') {
        word.push({ x: x - i, y: y, letter: board[y][x - i] });
        i++;
    }
    i = 1;
    while (x + i < BOARD_WIDTH && board[y][x + i] !== '.') {
        word.push({ x: x + i, y: y, letter: board[y][x + i] });
        i++;
    }
    if (word.length > 1) {
        word.sort(function (a, b) { return a.x - b.x; });
        res.push(word);
    }
    word = [];
    i = 0;
    while (y - i >= 0 && board[y - i][x] !== '.') {
        word.push({ x: x, y: y - i, letter: board[y - i][x] });
        i++;
    }
    i = 1;
    while (y + i < BOARD_HEIGHT && board[y + i][x] !== '.') {
        word.push({ x: x, y: y + i, letter: board[y + i][x] });
        i++;
    }
    if (word.length > 1) {
        word.sort(function (a, b) { return a.y - b.y; });
        res.push(word);
    }
    return res;
}
function wordToString(word) {
    return word.map(function (value) { return value.letter; }).join('');
}
function getScoreOf(word, board) {
    var score = word.reduce(function (acc, value) {
        if (PREVIOUS_BOARD[value.y][value.x] === PLAYED_BOARD[value.y][value.x]) {
            return acc + TILES_SCORE[value.letter];
        }
        var multi = 1;
        if (board[value.y][value.x] === 'l') {
            multi = 2;
        }
        if (board[value.y][value.x] === 'L') {
            multi = 3;
        }
        return acc + (TILES_SCORE[value.letter] * multi);
    }, 0);
    word.forEach(function (value) {
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
var boardSizeInputs = readline().split(' ');
var BOARD_WIDTH = parseInt(boardSizeInputs[0], 10);
var BOARD_HEIGHT = parseInt(boardSizeInputs[1], 10);
initBoards();
var playedTiles = findNewTiles();
// @ts-ignore
var newWords = [];
playedTiles.flatMap(function (value) { return findWords(value, PLAYED_BOARD); }).forEach(function (word) {
    if (newWords.find(function (value) { return wordToString(value) === wordToString(word); }) === undefined) {
        newWords.push(word);
    }
});
var totalScore = 0;
newWords.sort(function (a, b) { return wordToString(a).localeCompare(wordToString(b)); }).forEach(function (word) {
    var score = getScoreOf(word, EMPTY_BOARD);
    totalScore += score;
    console.log(wordToString(word) + " " + score);
});
if (playedTiles.length === 7) {
    console.log('Bonus 50');
    totalScore += 50;
}
console.log("Total " + totalScore);
