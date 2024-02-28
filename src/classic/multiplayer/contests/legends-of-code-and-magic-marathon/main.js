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

/***/ "./ts/action.js":
/*!**********************!*\
  !*** ./ts/action.js ***!
  \**********************/
/*! exports provided: Action */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"Action\", function() { return Action; });\n/* harmony import */ var _actionType__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./actionType */ \"./ts/actionType.js\");\n\r\nclass Action {\r\n    constructor(type, ...args) {\r\n        this.type = type;\r\n        this.args = args;\r\n    }\r\n    static Pass() {\r\n        return new Action(_actionType__WEBPACK_IMPORTED_MODULE_0__[\"ActionType\"].PASS);\r\n    }\r\n    static output(arr) {\r\n        print(arr.join(';'));\r\n    }\r\n    toString() {\r\n        return [this.type, ...this.args].join(' ');\r\n    }\r\n    getType() {\r\n        return this.type;\r\n    }\r\n    getParams() {\r\n        return this.args;\r\n    }\r\n    getParam(index) {\r\n        return this.args[index];\r\n    }\r\n}\r\n\n\n//# sourceURL=webpack:///./ts/action.js?");

/***/ }),

/***/ "./ts/actionType.js":
/*!**************************!*\
  !*** ./ts/actionType.js ***!
  \**************************/
/*! exports provided: ActionType */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"ActionType\", function() { return ActionType; });\nvar ActionType;\r\n(function (ActionType) {\r\n    ActionType[\"SUMMON\"] = \"SUMMON\";\r\n    ActionType[\"PASS\"] = \"PASS\";\r\n    ActionType[\"PICK\"] = \"PICK\";\r\n    ActionType[\"USE\"] = \"USE\";\r\n    ActionType[\"ATTACK\"] = \"ATTACK\";\r\n})(ActionType || (ActionType = {}));\r\n\n\n//# sourceURL=webpack:///./ts/actionType.js?");

/***/ }),

/***/ "./ts/ai/basic-ia.js":
/*!***************************!*\
  !*** ./ts/ai/basic-ia.js ***!
  \***************************/
/*! exports provided: BasicIA */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"BasicIA\", function() { return BasicIA; });\n/* harmony import */ var _action__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../action */ \"./ts/action.js\");\n/* harmony import */ var _actionType__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../actionType */ \"./ts/actionType.js\");\n/* harmony import */ var _game_cards_card_type__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../game/commands/card-type */ \"./ts/game/commands/card-type.js\");\n\r\n\r\n\r\nclass BasicIA {\r\n    draft(player) {\r\n        const id = player.hand.map((card, index) => {\r\n            return { id: index, score: card.value() };\r\n        }).sort((a, b) => b.score - a.score)[0].id;\r\n        return [new _action__WEBPACK_IMPORTED_MODULE_0__[\"Action\"](_actionType__WEBPACK_IMPORTED_MODULE_1__[\"ActionType\"].PICK, id)];\r\n    }\r\n    summon(player) {\r\n        const hand = player.hand.filter((card) => card.type === _game_cards_card_type__WEBPACK_IMPORTED_MODULE_2__[\"CardType\"].CREATURE && card.cost <= player.cristal);\r\n        return this._summonAndUseList(player.cristal, hand).map((commands) => {\r\n            return commands.map((card) => new _action__WEBPACK_IMPORTED_MODULE_0__[\"Action\"](_actionType__WEBPACK_IMPORTED_MODULE_1__[\"ActionType\"].SUMMON, card.instanceId));\r\n        }).filter((x) => x.length <= 6 - player.board.length);\r\n    }\r\n    useItems(player) {\r\n        const hand = player.hand.filter((card) => {\r\n            if (card.type !== _game_cards_card_type__WEBPACK_IMPORTED_MODULE_2__[\"CardType\"].CREATURE && card.cost <= player.cristal) {\r\n                if (card.type === _game_cards_card_type__WEBPACK_IMPORTED_MODULE_2__[\"CardType\"].RED) {\r\n                    return player.opponent.board.length > 0;\r\n                }\r\n                if (card.type === _game_cards_card_type__WEBPACK_IMPORTED_MODULE_2__[\"CardType\"].GREEN) {\r\n                    return player.board.length > 0;\r\n                }\r\n            }\r\n            return false;\r\n        });\r\n        return this._useTarget(player, this._summonAndUseList(player.cristal, hand));\r\n    }\r\n    fightGuard(player) {\r\n        const attackers = player.board\r\n            .filter((x) => (!x.justSummon || x.hasCharge) && x.canAttack && x.defense > 0 && x.attack > 0);\r\n        if (attackers.length === 0) {\r\n            return [];\r\n        }\r\n        const attackAvailable = [];\r\n        const opponentCreature = player.opponent.board.filter(x => x.hasGuard && x.defense > 0);\r\n        attackAvailable.push(...this._combiFight(attackers, opponentCreature));\r\n        return attackAvailable;\r\n    }\r\n    fightOther(player) {\r\n        const attackers = player.board\r\n            .filter((x) => (!x.justSummon || x.hasCharge) && x.canAttack && x.defense > 0 && x.attack > 0);\r\n        if (attackers.length === 0) {\r\n            return [];\r\n        }\r\n        const attackAvailable = [];\r\n        const opponentCreature = player.opponent.board.filter(x => !x.hasGuard && x.defense > 0);\r\n        attackAvailable.push(...this._combiFight(attackers, opponentCreature, true));\r\n        return attackAvailable;\r\n    }\r\n    _useTarget(player, cardsAvailable) {\r\n        const redTarget = player.opponent.board.slice(0);\r\n        const greenTarget = player.board.slice(0);\r\n        const actionsAvailable = [];\r\n        cardsAvailable.forEach((commands) => {\r\n            actionsAvailable.push(...this._useTargetList(commands, redTarget, greenTarget));\r\n        });\r\n        return actionsAvailable;\r\n    }\r\n    _useTargetList(hand, redTarget, greenTarget) {\r\n        if (hand.length === 0) {\r\n            return [];\r\n        }\r\n        const res = [];\r\n        const card = hand[0];\r\n        if (card.type === _game_cards_card_type__WEBPACK_IMPORTED_MODULE_2__[\"CardType\"].RED) {\r\n            for (let i = 0; i < redTarget.length; i++) {\r\n                const target = redTarget[i];\r\n                const children = this._useTargetList(hand.slice(1), redTarget, greenTarget);\r\n                if (children.length > 0) {\r\n                    children.forEach((child) => {\r\n                        res.push([...child, new _action__WEBPACK_IMPORTED_MODULE_0__[\"Action\"](_actionType__WEBPACK_IMPORTED_MODULE_1__[\"ActionType\"].USE, card.instanceId, target.instanceId)]);\r\n                    });\r\n                }\r\n                else {\r\n                    res.push([new _action__WEBPACK_IMPORTED_MODULE_0__[\"Action\"](_actionType__WEBPACK_IMPORTED_MODULE_1__[\"ActionType\"].USE, card.instanceId, target.instanceId)]);\r\n                }\r\n            }\r\n        }\r\n        if (card.type === _game_cards_card_type__WEBPACK_IMPORTED_MODULE_2__[\"CardType\"].GREEN) {\r\n            for (let i = 0; i < greenTarget.length; i++) {\r\n                const target = greenTarget[i];\r\n                const children = this._useTargetList(hand.slice(1), redTarget, greenTarget);\r\n                if (children.length > 0) {\r\n                    children.forEach((child) => {\r\n                        res.push([...child, new _action__WEBPACK_IMPORTED_MODULE_0__[\"Action\"](_actionType__WEBPACK_IMPORTED_MODULE_1__[\"ActionType\"].USE, card.instanceId, target.instanceId)]);\r\n                    });\r\n                }\r\n                else {\r\n                    res.push([new _action__WEBPACK_IMPORTED_MODULE_0__[\"Action\"](_actionType__WEBPACK_IMPORTED_MODULE_1__[\"ActionType\"].USE, card.instanceId, target.instanceId)]);\r\n                }\r\n            }\r\n        }\r\n        return res;\r\n    }\r\n    _summonAndUseList(cristal, hand) {\r\n        if (cristal <= 0 || hand.length === 0) {\r\n            return [];\r\n        }\r\n        const res = [];\r\n        for (let i = 0; i < hand.length; i++) {\r\n            const card = hand[i];\r\n            if (card.cost <= cristal) {\r\n                const child = this._summonAndUseList(cristal - card.cost, hand.slice(i + 1).filter((x) => x.cost <= cristal));\r\n                res.push([card]);\r\n                if (child.length > 0) {\r\n                    res.push(...child.map((x) => [card].concat(x)));\r\n                }\r\n            }\r\n        }\r\n        return res;\r\n    }\r\n    _combiFight(attackers, opponents, canAttackPlayer = false) {\r\n        if (attackers.length === 0) {\r\n            return [];\r\n        }\r\n        const res = [];\r\n        const card = attackers[0];\r\n        if (canAttackPlayer) {\r\n            const children = this._combiFight(attackers.slice(1), opponents, canAttackPlayer);\r\n            if (children.length > 0) {\r\n                children.forEach((child) => {\r\n                    res.push([new _action__WEBPACK_IMPORTED_MODULE_0__[\"Action\"](_actionType__WEBPACK_IMPORTED_MODULE_1__[\"ActionType\"].ATTACK, card.instanceId, -1), ...child]);\r\n                });\r\n            }\r\n            res.push([new _action__WEBPACK_IMPORTED_MODULE_0__[\"Action\"](_actionType__WEBPACK_IMPORTED_MODULE_1__[\"ActionType\"].ATTACK, card.instanceId, -1)]);\r\n        }\r\n        for (let i = 0; i < opponents.length; i++) {\r\n            const target = opponents[i];\r\n            const children = this._combiFight(attackers.slice(1), opponents, canAttackPlayer);\r\n            if (children.length > 0) {\r\n                children.forEach((child) => {\r\n                    res.push([new _action__WEBPACK_IMPORTED_MODULE_0__[\"Action\"](_actionType__WEBPACK_IMPORTED_MODULE_1__[\"ActionType\"].ATTACK, card.instanceId, target.instanceId), ...child]);\r\n                });\r\n            }\r\n            res.push([new _action__WEBPACK_IMPORTED_MODULE_0__[\"Action\"](_actionType__WEBPACK_IMPORTED_MODULE_1__[\"ActionType\"].ATTACK, card.instanceId, target.instanceId)]);\r\n        }\r\n        return res;\r\n    }\r\n}\r\n\n\n//# sourceURL=webpack:///./ts/ai/basic-ia.js?");

/***/ }),

/***/ "./ts/game-state.js":
/*!**************************!*\
  !*** ./ts/game-state.js ***!
  \**************************/
/*! exports provided: GameStateType, GameState */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"GameStateType\", function() { return GameStateType; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"GameState\", function() { return GameState; });\n/* harmony import */ var _action__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./action */ \"./ts/action.js\");\n/* harmony import */ var _actionType__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./actionType */ \"./ts/actionType.js\");\n/* harmony import */ var _ai_basic_ia__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./ai/basic-ia */ \"./ts/ai/basic-ia.js\");\n/* harmony import */ var _game_cards_card_factory__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./game/commands/card-factory */ \"./ts/game/commands/card-factory.js\");\n/* harmony import */ var _game_player__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./game/player */ \"./ts/game/player.js\");\n/* harmony import */ var _solution__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./solution */ \"./ts/solution.js\");\n\r\n\r\n\r\n\r\n\r\n\r\nvar GameStateType;\r\n(function (GameStateType) {\r\n    GameStateType[GameStateType[\"DRAFT\"] = 0] = \"DRAFT\";\r\n    GameStateType[GameStateType[\"BATTLE\"] = 1] = \"BATTLE\";\r\n})(GameStateType || (GameStateType = {}));\r\nclass GameState {\r\n    constructor() {\r\n        this._myPlayer = null;\r\n        this._enemyPlayer = null;\r\n        this._firstPlayer = null;\r\n        this._secondPlayer = null;\r\n        this._ia = null;\r\n        this._state = GameStateType.DRAFT;\r\n        this._myPlayer = new _game_player__WEBPACK_IMPORTED_MODULE_4__[\"Player\"](this);\r\n        this._enemyPlayer = new _game_player__WEBPACK_IMPORTED_MODULE_4__[\"Player\"](this);\r\n        this._enemyPlayer.opponent = this._myPlayer;\r\n        this._myPlayer.opponent = this._enemyPlayer;\r\n        this._ia = new _ai_basic_ia__WEBPACK_IMPORTED_MODULE_2__[\"BasicIA\"]();\r\n    }\r\n    bootstrap() {\r\n        do {\r\n            this._myPlayer.update();\r\n            this._enemyPlayer.update(true);\r\n            const dateStart = Date.now();\r\n            this.checkState();\r\n            this.updateCard();\r\n            this.save();\r\n            const solutions = _solution__WEBPACK_IMPORTED_MODULE_5__[\"Solution\"].simulate(this, this._ia, this._state, this._myPlayer, this._myPlayer === this._firstPlayer, dateStart);\r\n            let bestSolution = null;\r\n            solutions.forEach((solution) => {\r\n                if (bestSolution == null || bestSolution.score < solution.score) {\r\n                    bestSolution = solution;\r\n                }\r\n            });\r\n            this.load();\r\n            if (bestSolution === null) {\r\n                bestSolution = new _solution__WEBPACK_IMPORTED_MODULE_5__[\"Solution\"]();\r\n            }\r\n            this.play(this._myPlayer, bestSolution.actions);\r\n            printErr('Nb solutions : ' + solutions.length);\r\n            printErr('Loop during : ' + (Date.now() - dateStart) + ' ms');\r\n            _action__WEBPACK_IMPORTED_MODULE_0__[\"Action\"].output(bestSolution.actions);\r\n        } while (this._myPlayer.health > 0 && this._enemyPlayer.health > 0);\r\n    }\r\n    evaluation() {\r\n        if (this._enemyPlayer.health <= 0) {\r\n            return +Infinity;\r\n        }\r\n        if (this._myPlayer.health <= 0) {\r\n            return -Infinity;\r\n        }\r\n        let score = 0;\r\n        score += (this._myPlayer.health - this._enemyPlayer.health) * 2;\r\n        score -= this._enemyPlayer.board.length * 6;\r\n        this._enemyPlayer.board.forEach((x) => {\r\n            score -= x.attack * 3;\r\n            score -= x.defense * 3;\r\n            score -= x.abilities.length * 3;\r\n        });\r\n        this._myPlayer.board.forEach((x) => {\r\n            score += x.attack * 3;\r\n            score += x.defense * 3;\r\n            score += x.abilities.length * 3;\r\n        });\r\n        return score;\r\n    }\r\n    play(player, actions) {\r\n        for (let i = 0; i < actions.length; i++) {\r\n            const action = actions[i];\r\n            switch (action.getType()) {\r\n                case _actionType__WEBPACK_IMPORTED_MODULE_1__[\"ActionType\"].PASS:\r\n                    break;\r\n                case _actionType__WEBPACK_IMPORTED_MODULE_1__[\"ActionType\"].PICK:\r\n                    if (!player.pick(action.getParam(0))) {\r\n                        return false;\r\n                    }\r\n                    break;\r\n                case _actionType__WEBPACK_IMPORTED_MODULE_1__[\"ActionType\"].SUMMON:\r\n                    if (!player.summon(action.getParam(0))) {\r\n                        return false;\r\n                    }\r\n                    break;\r\n                case _actionType__WEBPACK_IMPORTED_MODULE_1__[\"ActionType\"].USE:\r\n                    if (!player.use(action.getParam(0), action.getParam(1))) {\r\n                        return false;\r\n                    }\r\n                    break;\r\n                case _actionType__WEBPACK_IMPORTED_MODULE_1__[\"ActionType\"].ATTACK:\r\n                    if (!player.attack(action.getParam(0), action.getParam(1))) {\r\n                        return false;\r\n                    }\r\n                    break;\r\n            }\r\n            player.end();\r\n        }\r\n        return true;\r\n    }\r\n    checkState() {\r\n        if (this._enemyPlayer.handSize > 0) {\r\n            if (this._state === GameStateType.DRAFT) {\r\n                if (this._myPlayer.handSize === 5 && this._myPlayer.deckSize === 30) {\r\n                    this._firstPlayer = this._myPlayer;\r\n                    this._secondPlayer = this._enemyPlayer;\r\n                }\r\n                else {\r\n                    this._firstPlayer = this._enemyPlayer;\r\n                    this._secondPlayer = this._myPlayer;\r\n                }\r\n            }\r\n            this._state = GameStateType.BATTLE;\r\n        }\r\n    }\r\n    updateCard() {\r\n        const cardCount = parseInt(readline(), 10);\r\n        for (let i = 0; i < cardCount; i++) {\r\n            const inputs = readline().split(' ');\r\n            const location = parseInt(inputs[2], 10);\r\n            const type = parseInt(inputs[3], 10);\r\n            if (this._state === GameStateType.DRAFT) {\r\n                const card = _game_cards_card_factory__WEBPACK_IMPORTED_MODULE_3__[\"CardFactory\"].create(type);\r\n                card.cardNumber = parseInt(inputs[0], 10);\r\n                card.instanceId = parseInt(inputs[1], 10);\r\n                card.location = location;\r\n                card.type = parseInt(inputs[3], 10);\r\n                card.cost = parseInt(inputs[4], 10);\r\n                card.attack = parseInt(inputs[5], 10);\r\n                card.defense = parseInt(inputs[6], 10);\r\n                card.abilities = inputs[7].split('');\r\n                card.myHealthChange = parseInt(inputs[8], 10);\r\n                card.opponentHealthChange = parseInt(inputs[9], 10);\r\n                card.cardDraw = parseInt(inputs[10], 10);\r\n                this._myPlayer.hand.push(card);\r\n            }\r\n            else {\r\n                if (location >= 0) {\r\n                    this._myPlayer.updateCard(inputs);\r\n                }\r\n                else {\r\n                    this._enemyPlayer.updateCard(inputs);\r\n                }\r\n            }\r\n        }\r\n    }\r\n    save() {\r\n        this._myPlayer.save();\r\n        this._enemyPlayer.save();\r\n    }\r\n    load() {\r\n        this._myPlayer.load();\r\n        this._enemyPlayer.load();\r\n    }\r\n}\r\n\n\n//# sourceURL=webpack:///./ts/game-state.js?");

/***/ }),

/***/ "./ts/game/cards/blue.js":
/*!*******************************!*\
  !*** ./ts/game/commands/blue.js ***!
  \*******************************/
/*! exports provided: BlueCard */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"BlueCard\", function() { return BlueCard; });\n/* harmony import */ var _card__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./card */ \"./ts/game/commands/command.js\");\n\r\nclass BlueCard extends _card__WEBPACK_IMPORTED_MODULE_0__[\"Command\"] {\r\n    value() {\r\n        const value = -100;\r\n        return value;\r\n    }\r\n}\r\n\n\n//# sourceURL=webpack:///./ts/game/commands/blue.js?");

/***/ }),

/***/ "./ts/game/cards/card-factory.js":
/*!***************************************!*\
  !*** ./ts/game/commands/card-factory.js ***!
  \***************************************/
/*! exports provided: CardFactory */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"CardFactory\", function() { return CardFactory; });\n/* harmony import */ var _blue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./blue */ \"./ts/game/commands/blue.js\");\n/* harmony import */ var _card_type__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./card-type */ \"./ts/game/commands/card-type.js\");\n/* harmony import */ var _creature__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./creature */ \"./ts/game/commands/creature.js\");\n/* harmony import */ var _green__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./green */ \"./ts/game/commands/green.js\");\n/* harmony import */ var _red__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./red */ \"./ts/game/commands/red.js\");\n\r\n\r\n\r\n\r\n\r\nclass CardFactory {\r\n    static create(type) {\r\n        switch (type) {\r\n            case _card_type__WEBPACK_IMPORTED_MODULE_1__[\"CardType\"].BLUE:\r\n                return new _blue__WEBPACK_IMPORTED_MODULE_0__[\"BlueCard\"]();\r\n            case _card_type__WEBPACK_IMPORTED_MODULE_1__[\"CardType\"].CREATURE:\r\n                return new _creature__WEBPACK_IMPORTED_MODULE_2__[\"CreatureCard\"]();\r\n            case _card_type__WEBPACK_IMPORTED_MODULE_1__[\"CardType\"].GREEN:\r\n                return new _green__WEBPACK_IMPORTED_MODULE_3__[\"GreenCard\"]();\r\n            case _card_type__WEBPACK_IMPORTED_MODULE_1__[\"CardType\"].RED:\r\n                return new _red__WEBPACK_IMPORTED_MODULE_4__[\"RedCard\"]();\r\n        }\r\n    }\r\n}\r\n\n\n//# sourceURL=webpack:///./ts/game/commands/card-factory.js?");

/***/ }),

/***/ "./ts/game/cards/card-type.js":
/*!************************************!*\
  !*** ./ts/game/commands/card-type.js ***!
  \************************************/
/*! exports provided: CardType */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"CardType\", function() { return CardType; });\nvar CardType;\r\n(function (CardType) {\r\n    CardType[CardType[\"CREATURE\"] = 0] = \"CREATURE\";\r\n    CardType[CardType[\"GREEN\"] = 1] = \"GREEN\";\r\n    CardType[CardType[\"RED\"] = 2] = \"RED\";\r\n    CardType[CardType[\"BLUE\"] = 3] = \"BLUE\";\r\n})(CardType || (CardType = {}));\r\n\n\n//# sourceURL=webpack:///./ts/game/commands/card-type.js?");

/***/ }),

/***/ "./ts/game/cards/card-value.js":
/*!*************************************!*\
  !*** ./ts/game/commands/card-value.js ***!
  \*************************************/
/*! exports provided: CardValue */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"CardValue\", function() { return CardValue; });\nconst CardValue = {\r\n    '160': 0,\r\n    '143': 1,\r\n    '92': 2,\r\n    '110': 3,\r\n    '153': 4,\r\n    '156': 5,\r\n    '140': 6,\r\n    '55': 7,\r\n    '113': 8,\r\n    '154': 9,\r\n    '117': 10,\r\n    '78': 11,\r\n    '138': 12,\r\n    '107': 13,\r\n    '124': 14,\r\n    '136': 15,\r\n    '46': 16,\r\n    '123': 17,\r\n    '131': 18,\r\n    '60': 19,\r\n    '132': 20,\r\n    '76': 21,\r\n    '155': 22,\r\n    '142': 23,\r\n    '159': 24,\r\n    '157': 25,\r\n    '119': 26,\r\n    '57': 27,\r\n    '108': 28,\r\n    '158': 29,\r\n    '42': 30,\r\n    '43': 31,\r\n    '35': 32,\r\n    '14': 33,\r\n    '130': 34,\r\n    '120': 35,\r\n    '63': 36,\r\n    '45': 37,\r\n    '58': 38,\r\n    '74': 39,\r\n    '128': 40,\r\n    '20': 41,\r\n    '125': 42,\r\n    '31': 43,\r\n    '118': 44,\r\n    '112': 45,\r\n    '126': 46,\r\n    '22': 47,\r\n    '24': 48,\r\n    '59': 49,\r\n    '102': 50,\r\n    '62': 51,\r\n    '122': 52,\r\n    '10': 53,\r\n    '134': 54,\r\n    '77': 55,\r\n    '114': 56,\r\n    '90': 57,\r\n    '135': 58,\r\n    '127': 59,\r\n    '79': 60,\r\n    '16': 61,\r\n    '101': 62,\r\n    '89': 63,\r\n    '129': 64,\r\n    '36': 65,\r\n    '40': 66,\r\n    '61': 67,\r\n    '146': 68,\r\n    '105': 69,\r\n    '2': 70,\r\n    '111': 71,\r\n    '27': 72,\r\n    '106': 73,\r\n    '56': 74,\r\n    '73': 75,\r\n    '30': 76,\r\n    '94': 77,\r\n    '71': 78,\r\n    '137': 79,\r\n    '34': 80,\r\n    '39': 81,\r\n    '81': 82,\r\n    '100': 83,\r\n    '115': 84,\r\n    '72': 85,\r\n    '133': 86,\r\n    '149': 87,\r\n    '38': 88,\r\n    '104': 89,\r\n    '109': 90,\r\n    '19': 91,\r\n    '47': 92,\r\n    '121': 93,\r\n    '98': 94,\r\n    '13': 95,\r\n    '93': 96,\r\n    '12': 97,\r\n    '70': 98,\r\n    '75': 99,\r\n    '21': 100,\r\n    '41': 101,\r\n    '25': 102,\r\n    '17': 103,\r\n    '15': 104,\r\n    '141': 105,\r\n    '1': 106,\r\n    '91': 107,\r\n    '4': 108,\r\n    '103': 109,\r\n    '152': 110,\r\n    '82': 111,\r\n    '8': 112,\r\n    '83': 113,\r\n    '26': 114,\r\n    '150': 115,\r\n    '144': 116,\r\n    '23': 117,\r\n    '97': 118,\r\n    '95': 119,\r\n    '37': 120,\r\n    '11': 121,\r\n    '145': 122,\r\n    '3': 123,\r\n    '96': 124,\r\n    '44': 125,\r\n    '99': 126,\r\n    '5': 127,\r\n    '86': 128,\r\n    '6': 129,\r\n    '80': 130,\r\n    '88': 131,\r\n    '28': 132,\r\n    '87': 133,\r\n    '147': 134,\r\n    '9': 135,\r\n    '18': 136,\r\n    '33': 137,\r\n    '148': 138,\r\n    '85': 139,\r\n    '32': 140,\r\n    '54': 141,\r\n    '67': 142,\r\n    '139': 143,\r\n    '50': 144,\r\n    '64': 145,\r\n    '29': 146,\r\n    '52': 147,\r\n    '66': 148,\r\n    '69': 149,\r\n    '49': 150,\r\n    '53': 151,\r\n    '51': 152,\r\n    '84': 153,\r\n    '116': 154,\r\n    '151': 155,\r\n    '48': 156,\r\n    '68': 157,\r\n    '7': 158,\r\n    '65': 159\r\n};\r\n\n\n//# sourceURL=webpack:///./ts/game/commands/card-value.js?");

/***/ }),

/***/ "./ts/game/cards/card.js":
/*!*******************************!*\
  !*** ./ts/game/commands/command.js ***!
  \*******************************/
/*! exports provided: Command */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"Command\", function() { return Command; });\n/* harmony import */ var _card_value__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./card-value */ \"./ts/game/commands/card-value.js\");\n\r\nclass Command {\r\n    constructor() {\r\n        this.cached = [];\r\n        this.justSummon = false;\r\n        this.canAttack = true;\r\n    }\r\n    get abilities() {\r\n        return this._abilities;\r\n    }\r\n    set abilities(value) {\r\n        this._abilities = value.filter(x => x !== '-');\r\n    }\r\n    get hasCharge() {\r\n        return this.abilities.indexOf('C') !== -1;\r\n    }\r\n    set hasCharge(value) {\r\n        if (value !== this.hasCharge) {\r\n            if (value) {\r\n                this.abilities.push('C');\r\n            }\r\n            else {\r\n                this.abilities.splice(this.abilities.indexOf('C'), 1);\r\n            }\r\n        }\r\n    }\r\n    get hasGuard() {\r\n        return this.abilities.indexOf('G') !== -1;\r\n    }\r\n    set hasGuard(value) {\r\n        if (value !== this.hasGuard) {\r\n            if (value) {\r\n                this.abilities.push('G');\r\n            }\r\n            else {\r\n                this.abilities.splice(this.abilities.indexOf('G'), 1);\r\n            }\r\n        }\r\n    }\r\n    get hasBreakthrough() {\r\n        return this.abilities.indexOf('B') !== -1;\r\n    }\r\n    set hasBreakthrough(value) {\r\n        if (value !== this.hasBreakthrough) {\r\n            if (value) {\r\n                this.abilities.push('B');\r\n            }\r\n            else {\r\n                this.abilities.splice(this.abilities.indexOf('B'), 1);\r\n            }\r\n        }\r\n    }\r\n    get hasDrain() {\r\n        return this.abilities.indexOf('D') !== -1;\r\n    }\r\n    set hasDrain(value) {\r\n        if (value !== this.hasDrain) {\r\n            if (value) {\r\n                this.abilities.push('D');\r\n            }\r\n            else {\r\n                this.abilities.splice(this.abilities.indexOf('D'), 1);\r\n            }\r\n        }\r\n    }\r\n    get hasLethal() {\r\n        return this.abilities.indexOf('L') !== -1;\r\n    }\r\n    set hasLethal(value) {\r\n        if (value !== this.hasLethal) {\r\n            if (value) {\r\n                this.abilities.push('L');\r\n            }\r\n            else {\r\n                this.abilities.splice(this.abilities.indexOf('L'), 1);\r\n            }\r\n        }\r\n    }\r\n    get hasWard() {\r\n        return this.abilities.indexOf('W') !== -1;\r\n    }\r\n    set hasWard(value) {\r\n        if (value !== this.hasWard) {\r\n            if (value) {\r\n                this.abilities.push('W');\r\n            }\r\n            else {\r\n                this.abilities.splice(this.abilities.indexOf('W'), 1);\r\n            }\r\n        }\r\n    }\r\n    value() {\r\n        let value = 0;\r\n        value = _card_value__WEBPACK_IMPORTED_MODULE_0__[\"CardValue\"][this.cardNumber] - value;\r\n        return value;\r\n    }\r\n    canUse(object) {\r\n        return false;\r\n    }\r\n    toString() {\r\n        return '[' + [this.instanceId, this.type, this.cost, this.attack + '/' + this.defense, this.abilities.join('')].join(',') + ']';\r\n    }\r\n    debug() {\r\n        printErr(this.toString());\r\n    }\r\n    save() {\r\n        this.cached[0] = this.instanceId;\r\n        this.cached[1] = this.location;\r\n        this.cached[2] = this.attack;\r\n        this.cached[3] = this.defense;\r\n        this.cached[4] = this._abilities.slice(0);\r\n        this.cached[5] = this.myHealthChange;\r\n        this.cached[6] = this.opponentHealthChange;\r\n        this.cached[7] = this.cardDraw;\r\n        this.cached[8] = false;\r\n        this.cached[9] = true;\r\n    }\r\n    load() {\r\n        this.instanceId = this.cached[0];\r\n        this.location = this.cached[1];\r\n        this.attack = this.cached[2];\r\n        this.defense = this.cached[3];\r\n        this._abilities = this.cached[4].slice(0);\r\n        this.myHealthChange = this.cached[5];\r\n        this.opponentHealthChange = this.cached[6];\r\n        this.cardDraw = this.cached[7];\r\n        this.justSummon = this.cached[8];\r\n        this.canAttack = this.cached[9];\r\n    }\r\n    fight(defender, player) {\r\n        this.canAttack = false;\r\n        const damageGiven = defender.hasWard ? 0 : this.attack;\r\n        const damageTaken = this.hasWard ? 0 : defender.attack;\r\n        let healthGain = 0;\r\n        let healthTaken = 0;\r\n        if (this.hasWard && defender.attack > 0) {\r\n            this.hasWard = false;\r\n        }\r\n        if (defender.hasWard && this.attack > 0) {\r\n            defender.hasWard = false;\r\n        }\r\n        if (this.hasBreakthrough && damageGiven >= defender.defense) {\r\n            healthTaken = defender.defense - damageGiven;\r\n        }\r\n        if (this.hasLethal && damageGiven > 0) {\r\n            defender.defense = 0;\r\n        }\r\n        if (this.hasDrain && damageGiven > 0) {\r\n            healthGain = this.attack;\r\n        }\r\n        defender.defense -= damageGiven;\r\n        if (defender.hasLethal && damageTaken > 0) {\r\n            this.defense = 0;\r\n        }\r\n        this.defense -= damageTaken;\r\n        player.health += healthGain;\r\n        player.opponent.health += healthTaken;\r\n    }\r\n}\r\n\n\n//# sourceURL=webpack:///./ts/game/commands/command.js?");

/***/ }),

/***/ "./ts/game/cards/creature.js":
/*!***********************************!*\
  !*** ./ts/game/commands/creature.js ***!
  \***********************************/
/*! exports provided: CreatureCard */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"CreatureCard\", function() { return CreatureCard; });\n/* harmony import */ var _card__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./card */ \"./ts/game/commands/command.js\");\n/* harmony import */ var _card_type__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./card-type */ \"./ts/game/commands/card-type.js\");\n\r\n\r\nclass CreatureCard extends _card__WEBPACK_IMPORTED_MODULE_0__[\"Command\"] {\r\n    canUse(object) {\r\n        if (object.type === _card_type__WEBPACK_IMPORTED_MODULE_1__[\"CardType\"].GREEN) {\r\n            return object.abilities.length === 0\r\n                ? true\r\n                : this.abilities.every(x => object.abilities.indexOf(x) === -1);\r\n        }\r\n        else if (object.type === _card_type__WEBPACK_IMPORTED_MODULE_1__[\"CardType\"].RED) {\r\n            return object.abilities.length === 0\r\n                ? true\r\n                : this.abilities.some(x => object.abilities.indexOf(x) !== -1);\r\n        }\r\n    }\r\n    value() {\r\n        if (this.hasLethal && this.hasCharge) {\r\n        }\r\n        if (this.hasLethal) {\r\n        }\r\n        return super.value();\r\n    }\r\n}\r\n\n\n//# sourceURL=webpack:///./ts/game/commands/creature.js?");

/***/ }),

/***/ "./ts/game/cards/green.js":
/*!********************************!*\
  !*** ./ts/game/commands/green.js ***!
  \********************************/
/*! exports provided: GreenCard */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"GreenCard\", function() { return GreenCard; });\n/* harmony import */ var _card__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./card */ \"./ts/game/commands/command.js\");\n\r\nclass GreenCard extends _card__WEBPACK_IMPORTED_MODULE_0__[\"Command\"] {\r\n    value() {\r\n        if (this.defense = 3) {\r\n        }\r\n        return super.value();\r\n    }\r\n}\r\n\n\n//# sourceURL=webpack:///./ts/game/commands/green.js?");

/***/ }),

/***/ "./ts/game/cards/red.js":
/*!******************************!*\
  !*** ./ts/game/commands/red.js ***!
  \******************************/
/*! exports provided: RedCard */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"RedCard\", function() { return RedCard; });\n/* harmony import */ var _card__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./card */ \"./ts/game/commands/command.js\");\n\r\nclass RedCard extends _card__WEBPACK_IMPORTED_MODULE_0__[\"Command\"] {\r\n}\r\n\n\n//# sourceURL=webpack:///./ts/game/commands/red.js?");

/***/ }),

/***/ "./ts/game/deck.js":
/*!*************************!*\
  !*** ./ts/game/deck.js ***!
  \*************************/
/*! exports provided: Deck */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"Deck\", function() { return Deck; });\n/* harmony import */ var _cards_card_type__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./commands/card-type */ \"./ts/game/commands/card-type.js\");\n\r\nclass Deck {\r\n    constructor() {\r\n        this.commands = [];\r\n        this.cached = [];\r\n        this.commands = [];\r\n    }\r\n    get nbCard() {\r\n        return this.commands.length;\r\n    }\r\n    get nbCreature() {\r\n        return this.commands.filter(x => x.type === _cards_card_type__WEBPACK_IMPORTED_MODULE_0__[\"CardType\"].CREATURE).length;\r\n    }\r\n    get nbGuardCreature() {\r\n        return this.commands.filter(x => x.type === _cards_card_type__WEBPACK_IMPORTED_MODULE_0__[\"CardType\"].CREATURE && x.hasGuard).length;\r\n    }\r\n    get nbGreen() {\r\n        return this.commands.filter(x => x.type === _cards_card_type__WEBPACK_IMPORTED_MODULE_0__[\"CardType\"].GREEN).length;\r\n    }\r\n    get nbRed() {\r\n        return this.commands.filter(x => x.type === _cards_card_type__WEBPACK_IMPORTED_MODULE_0__[\"CardType\"].RED).length;\r\n    }\r\n    get nbBlue() {\r\n        return this.commands.filter(x => x.type === _cards_card_type__WEBPACK_IMPORTED_MODULE_0__[\"CardType\"].BLUE).length;\r\n    }\r\n    getCards() {\r\n        return this.commands;\r\n    }\r\n    push(card) {\r\n        this.commands.push(card);\r\n    }\r\n    toString() {\r\n        return 'creature=' + this.nbCreature +\r\n            ' green=' + this.nbGreen +\r\n            ' red=' + this.nbRed +\r\n            ' blue=' + this.nbBlue;\r\n    }\r\n    filter(func) {\r\n        return this.commands.filter(func);\r\n    }\r\n    save() {\r\n        this.cached = this.commands.slice(0);\r\n        this.cached.forEach((card) => card.save());\r\n    }\r\n    load() {\r\n        this.commands = this.cached.slice(0);\r\n        this.commands.forEach((card) => card.load());\r\n    }\r\n}\r\n\n\n//# sourceURL=webpack:///./ts/game/deck.js?");

/***/ }),

/***/ "./ts/game/player.js":
/*!***************************!*\
  !*** ./ts/game/player.js ***!
  \***************************/
/*! exports provided: Player */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"Player\", function() { return Player; });\n/* harmony import */ var _cards_card_factory__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./commands/card-factory */ \"./ts/game/commands/card-factory.js\");\n/* harmony import */ var _cards_card_type__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./commands/card-type */ \"./ts/game/commands/card-type.js\");\n/* harmony import */ var _deck__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./deck */ \"./ts/game/deck.js\");\n\r\n\r\n\r\nclass Player {\r\n    constructor(gameState) {\r\n        this.gameState = gameState;\r\n        this.deck = new _deck__WEBPACK_IMPORTED_MODULE_2__[\"Deck\"]();\r\n        this.hand = [];\r\n        this.board = [];\r\n        this.cached = [];\r\n    }\r\n    update(isOpponent = false) {\r\n        this.hand = [];\r\n        this.board = [];\r\n        const inputs = readline().split(' ');\r\n        this.health = parseInt(inputs[0], 10);\r\n        this.cristal = parseInt(inputs[1], 10);\r\n        this.deckSize = parseInt(inputs[2], 10);\r\n        this.rune = parseInt(inputs[3], 10);\r\n        if (isOpponent) {\r\n            this.handSize = parseInt(readline(), 10);\r\n        }\r\n        this.nextTurnDraw = 1;\r\n    }\r\n    updateCard(inputs) {\r\n        const cardNumber = parseInt(inputs[0], 10);\r\n        const instanceId = parseInt(inputs[1], 10);\r\n        const type = parseInt(inputs[3], 10);\r\n        const commands = this.deck.filter((x) => x.cardNumber === cardNumber);\r\n        let card = commands.find(x => x.instanceId === instanceId);\r\n        if (card == null) {\r\n            card = commands.find(x => x.instanceId === -1) || _cards_card_factory__WEBPACK_IMPORTED_MODULE_0__[\"CardFactory\"].create(type);\r\n        }\r\n        card.cardNumber = cardNumber;\r\n        card.instanceId = instanceId;\r\n        card.location = parseInt(inputs[2], 10);\r\n        card.type = type;\r\n        card.cost = parseInt(inputs[4], 10);\r\n        card.attack = parseInt(inputs[5], 10);\r\n        card.defense = parseInt(inputs[6], 10);\r\n        card.abilities = inputs[7].split('');\r\n        card.myHealthChange = parseInt(inputs[8], 10);\r\n        card.opponentHealthChange = parseInt(inputs[9], 10);\r\n        card.cardDraw = parseInt(inputs[10], 10);\r\n        if (card.location === 0) {\r\n            this.hand.push(card);\r\n        }\r\n        else {\r\n            this.board.push(card);\r\n        }\r\n    }\r\n    save() {\r\n        this.cached[1] = this.health;\r\n        this.cached[2] = this.cristal;\r\n        this.cached[3] = this.rune;\r\n        this.cached[4] = this.handSize;\r\n        this.cached[5] = this.deckSize;\r\n        this.cached[6] = this.hand.slice(0);\r\n        this.cached[7] = this.board.slice(0);\r\n        this.cached[6].forEach((card) => card.save());\r\n        this.cached[7].forEach((card) => card.save());\r\n        this.deck.save();\r\n    }\r\n    load() {\r\n        this.deck.load();\r\n        this.health = this.cached[1];\r\n        this.cristal = this.cached[2];\r\n        this.rune = this.cached[3];\r\n        this.handSize = this.cached[4];\r\n        this.deckSize = this.cached[5];\r\n        this.hand = this.cached[6].slice(0);\r\n        this.board = this.cached[7].slice(0);\r\n        this.hand.forEach((card) => card.load());\r\n        this.board.forEach((card) => card.load());\r\n    }\r\n    pick(params) {\r\n        if (params < 0 || params > 2) {\r\n            return false;\r\n        }\r\n        this.deck.push(this.hand[params]);\r\n        return true;\r\n    }\r\n    summon(params) {\r\n        const summoned = this.hand.find((card) => card.instanceId === params);\r\n        if (summoned == null || this.cristal < summoned.cost) {\r\n            return false;\r\n        }\r\n        summoned.justSummon = true;\r\n        this.cristal -= summoned.cost;\r\n        this.board.push(summoned);\r\n        this.health += summoned.myHealthChange;\r\n        this.nextTurnDraw += summoned.cardDraw;\r\n        this.opponent.health += summoned.opponentHealthChange;\r\n        this.hand.splice(this.hand.indexOf(summoned), 1);\r\n        return true;\r\n    }\r\n    use(params, params2) {\r\n        const item = this.hand.find((card) => card.instanceId === params);\r\n        if (item == null || this.cristal < item.cost) {\r\n            return false;\r\n        }\r\n        let creature = null;\r\n        if (params2 === -1) {\r\n        }\r\n        else {\r\n            if (item.type === _cards_card_type__WEBPACK_IMPORTED_MODULE_1__[\"CardType\"].GREEN) {\r\n                creature = this.board.find((card) => card.instanceId === params2);\r\n                if (creature == null) {\r\n                    return false;\r\n                }\r\n                creature.hasCharge = creature.hasCharge || item.hasCharge;\r\n                creature.hasBreakthrough = creature.hasBreakthrough || item.hasBreakthrough;\r\n                creature.hasDrain = creature.hasDrain || item.hasDrain;\r\n                creature.hasGuard = creature.hasGuard || item.hasGuard;\r\n                creature.hasLethal = creature.hasLethal || item.hasLethal;\r\n                creature.hasWard = creature.hasWard || item.hasWard;\r\n            }\r\n            else {\r\n                creature = this.opponent.board.find((card) => card.instanceId === params2);\r\n                if (creature == null) {\r\n                    return false;\r\n                }\r\n                creature.hasCharge = creature.hasCharge && !item.hasCharge;\r\n                creature.hasBreakthrough = creature.hasBreakthrough && !item.hasBreakthrough;\r\n                creature.hasDrain = creature.hasDrain && !item.hasDrain;\r\n                creature.hasGuard = creature.hasGuard && !item.hasGuard;\r\n                creature.hasLethal = creature.hasLethal && !item.hasLethal;\r\n                creature.hasWard = creature.hasWard && !item.hasWard;\r\n            }\r\n            creature.attack = Math.max(0, creature.attack + item.attack);\r\n            if (creature.hasWard && item.defense < 0) {\r\n                creature.hasWard = false;\r\n            }\r\n            else {\r\n                creature.defense += item.defense;\r\n            }\r\n            this.health += item.myHealthChange;\r\n            this.opponent.health += item.opponentHealthChange;\r\n            this.nextTurnDraw += item.cardDraw;\r\n        }\r\n        this.cristal -= item.cost;\r\n        this.hand.splice(this.hand.indexOf(item), 1);\r\n        return true;\r\n    }\r\n    attack(params, params2) {\r\n        const attacker = this.board.find((card) => card.instanceId === params);\r\n        if (attacker == null) {\r\n            return false;\r\n        }\r\n        if (params2 === -1) {\r\n            if (this.opponent.board.some(x => x.hasGuard && x.defense > 0)) {\r\n                return false;\r\n            }\r\n            this.opponent.health -= attacker.attack;\r\n            attacker.canAttack = false;\r\n            if (attacker.hasDrain) {\r\n                this.health += attacker.attack;\r\n            }\r\n        }\r\n        else {\r\n            const opponent = this.opponent.board.find((card) => card.instanceId === params2);\r\n            if (opponent == null) {\r\n                return false;\r\n            }\r\n            attacker.fight(opponent, this);\r\n        }\r\n        return true;\r\n    }\r\n    end() {\r\n        this.board = this.board.filter((card) => card.defense > 0);\r\n        this.opponent.board = this.opponent.board.filter((card) => card.defense > 0);\r\n    }\r\n}\r\n\n\n//# sourceURL=webpack:///./ts/game/player.js?");

/***/ }),

/***/ "./ts/main.js":
/*!********************!*\
  !*** ./ts/main.js ***!
  \********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _game_state__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./game-state */ \"./ts/game-state.js\");\n\r\nconst gameState = new _game_state__WEBPACK_IMPORTED_MODULE_0__[\"GameState\"]();\r\ngameState.bootstrap();\r\n\n\n//# sourceURL=webpack:///./ts/main.js?");

/***/ }),

/***/ "./ts/solution.js":
/*!************************!*\
  !*** ./ts/solution.js ***!
  \************************/
/*! exports provided: Solution */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"Solution\", function() { return Solution; });\n/* harmony import */ var _action__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./action */ \"./ts/action.js\");\n/* harmony import */ var _game_state__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./game-state */ \"./ts/game-state.js\");\n/* harmony import */ var _game_cards_card_type__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./game/commands/card-type */ \"./ts/game/commands/card-type.js\");\n\r\n\r\n\r\nclass Solution {\r\n    constructor(actions) {\r\n        this.actions = actions;\r\n        if (this.actions == null) {\r\n            this.actions = [];\r\n        }\r\n        if (this.actions.length === 0) {\r\n            this.actions.push(_action__WEBPACK_IMPORTED_MODULE_0__[\"Action\"].Pass());\r\n        }\r\n    }\r\n    static simulate(gameState, ia, state, player, isFirstPlayer, dateStart) {\r\n        switch (state) {\r\n            case _game_state__WEBPACK_IMPORTED_MODULE_1__[\"GameStateType\"].DRAFT:\r\n                return ia.draft(player).map((x) => {\r\n                    return new Solution([x]);\r\n                });\r\n            case _game_state__WEBPACK_IMPORTED_MODULE_1__[\"GameStateType\"].BATTLE:\r\n                const solutionsAvailable = [];\r\n                this.simulateBattle(ia, [], player, gameState, dateStart, solutionsAvailable);\r\n                return solutionsAvailable;\r\n        }\r\n    }\r\n    static simulateAdversaire(solutionsAvailable, ia, player, gameState, dateStart) {\r\n        solutionsAvailable.forEach((solution) => {\r\n            const enemySolutionsAvailable = [];\r\n            this.simulateBattle(ia, solution.actions, player.opponent, gameState, dateStart, enemySolutionsAvailable);\r\n            let bestSolution = null;\r\n            enemySolutionsAvailable.forEach((enemySolution) => {\r\n                if (bestSolution == null || bestSolution.score > enemySolution.score) {\r\n                    bestSolution = enemySolution;\r\n                }\r\n            });\r\n            solution.score = bestSolution.score;\r\n        });\r\n    }\r\n    static simulateBattle(ia, foreActions, player, gameState, dateStart, solutionsAvailable) {\r\n        gameState.load();\r\n        if (this.haveTime(dateStart) && gameState.play(player, [...foreActions])) {\r\n            const summonsAvailable = ia.summon(player);\r\n            if (summonsAvailable.length === 0) {\r\n                summonsAvailable.push([]);\r\n            }\r\n            summonsAvailable.forEach((summon) => {\r\n                gameState.load();\r\n                if (this.haveTime(dateStart) && gameState.play(player, [...foreActions, ...summon])) {\r\n                    const useItemsAvailable = ia.useItems(player);\r\n                    if (useItemsAvailable.length === 0) {\r\n                        useItemsAvailable.push([]);\r\n                    }\r\n                    useItemsAvailable.forEach((useItem) => {\r\n                        gameState.load();\r\n                        if (this.haveTime(dateStart) && gameState.play(player, [...foreActions, ...summon, ...useItem])) {\r\n                            if (player.hand.length === 0 || player.board.length === 6 || player.hand.every((card) => {\r\n                                switch (card.type) {\r\n                                    case _game_cards_card_type__WEBPACK_IMPORTED_MODULE_2__[\"CardType\"].CREATURE:\r\n                                        return card.cost > player.cristal;\r\n                                    case _game_cards_card_type__WEBPACK_IMPORTED_MODULE_2__[\"CardType\"].GREEN:\r\n                                        return card.cost > player.cristal || player.board.length === 0;\r\n                                    case _game_cards_card_type__WEBPACK_IMPORTED_MODULE_2__[\"CardType\"].RED:\r\n                                        return card.cost > player.cristal || player.opponent.board.length === 0;\r\n                                    case _game_cards_card_type__WEBPACK_IMPORTED_MODULE_2__[\"CardType\"].BLUE:\r\n                                        return card.cost > player.cristal || true;\r\n                                }\r\n                            })) {\r\n                                const figthsGuardAvailable = ia.fightGuard(player);\r\n                                if (figthsGuardAvailable.length === 0) {\r\n                                    figthsGuardAvailable.push([]);\r\n                                }\r\n                                figthsGuardAvailable.forEach((figthGuard) => {\r\n                                    gameState.load();\r\n                                    if (this.haveTime(dateStart) &&\r\n                                        gameState.play(player, [...foreActions, ...summon, ...useItem, ...figthGuard])) {\r\n                                        const figthsOtherAvailable = ia.fightOther(player);\r\n                                        if (figthsOtherAvailable.length === 0) {\r\n                                            figthsOtherAvailable.push([]);\r\n                                        }\r\n                                        figthsOtherAvailable.forEach((fightOther) => {\r\n                                            const solution = new Solution([\r\n                                                ...foreActions, ...summon, ...useItem, ...figthGuard, ...fightOther\r\n                                            ]);\r\n                                            solution.evaluation(player, gameState);\r\n                                            solutionsAvailable.push(solution);\r\n                                        });\r\n                                    }\r\n                                });\r\n                            }\r\n                        }\r\n                    });\r\n                }\r\n            });\r\n        }\r\n    }\r\n    static haveTime(dateStart) {\r\n        return (Date.now() - dateStart) < 90;\r\n    }\r\n    evaluation(player, gameState) {\r\n        gameState.load();\r\n        if (gameState.play(player, this.actions || [])) {\r\n            this.score = gameState.evaluation();\r\n        }\r\n        else {\r\n            this.score = -Infinity;\r\n        }\r\n    }\r\n}\r\n\n\n//# sourceURL=webpack:///./ts/solution.js?");

/***/ })

/******/ });
