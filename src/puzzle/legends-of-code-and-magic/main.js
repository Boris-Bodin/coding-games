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
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"Action\", function() { return Action; });\n/* harmony import */ var _actionType__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./actionType */ \"./ts/actionType.js\");\n\nclass Action {\n    constructor(type, ...args) {\n        this.type = type;\n        this.args = args;\n    }\n    static Pass() {\n        return new Action(_actionType__WEBPACK_IMPORTED_MODULE_0__[\"ActionType\"].PASS);\n    }\n    static output(arr) {\n        print(arr.join(';'));\n    }\n    toString() {\n        return [this.type, ...this.args].join(' ');\n    }\n    getType() {\n        return this.type;\n    }\n    getParams() {\n        return this.args;\n    }\n    getParam(index) {\n        return this.args[index];\n    }\n}\n\n\n//# sourceURL=webpack:///./ts/action.js?");

/***/ }),

/***/ "./ts/actionType.js":
/*!**************************!*\
  !*** ./ts/actionType.js ***!
  \**************************/
/*! exports provided: ActionType */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"ActionType\", function() { return ActionType; });\nvar ActionType;\n(function (ActionType) {\n    ActionType[\"SUMMON\"] = \"SUMMON\";\n    ActionType[\"PASS\"] = \"PASS\";\n    ActionType[\"PICK\"] = \"PICK\";\n    ActionType[\"USE\"] = \"USE\";\n    ActionType[\"ATTACK\"] = \"ATTACK\";\n})(ActionType || (ActionType = {}));\n\n\n//# sourceURL=webpack:///./ts/actionType.js?");

/***/ }),

/***/ "./ts/ai/basic-ia.js":
/*!***************************!*\
  !*** ./ts/ai/basic-ia.js ***!
  \***************************/
/*! exports provided: BasicIA */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"BasicIA\", function() { return BasicIA; });\n/* harmony import */ var _action__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../action */ \"./ts/action.js\");\n/* harmony import */ var _actionType__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../actionType */ \"./ts/actionType.js\");\n/* harmony import */ var _game_cards_card_type__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../game/cards/card-type */ \"./ts/game/cards/card-type.js\");\n\n\n\nclass BasicIA {\n    draft(player) {\n        const id = player.hand.map((card, index) => {\n            return { id: index, score: card.value() };\n        }).sort((a, b) => b.score - a.score)[0].id;\n        return [new _action__WEBPACK_IMPORTED_MODULE_0__[\"Action\"](_actionType__WEBPACK_IMPORTED_MODULE_1__[\"ActionType\"].PICK, id)];\n    }\n    summon(player) {\n        const hand = player.hand.filter((card) => card.type === _game_cards_card_type__WEBPACK_IMPORTED_MODULE_2__[\"CardType\"].CREATURE && card.cost <= player.cristal);\n        return this._summonAndUseList(player.cristal, hand).map((cards) => {\n            return cards.map((card) => new _action__WEBPACK_IMPORTED_MODULE_0__[\"Action\"](_actionType__WEBPACK_IMPORTED_MODULE_1__[\"ActionType\"].SUMMON, card.instanceId));\n        }).filter((x) => x.length <= 6 - player.board.length);\n    }\n    useItems(player) {\n        const hand = player.hand.filter((card) => {\n            if (card.type !== _game_cards_card_type__WEBPACK_IMPORTED_MODULE_2__[\"CardType\"].CREATURE && card.cost <= player.cristal) {\n                if (card.type === _game_cards_card_type__WEBPACK_IMPORTED_MODULE_2__[\"CardType\"].RED) {\n                    return player.opponent.board.length > 0;\n                }\n                if (card.type === _game_cards_card_type__WEBPACK_IMPORTED_MODULE_2__[\"CardType\"].GREEN) {\n                    return player.board.length > 0;\n                }\n            }\n            return false;\n        });\n        return this._useTarget(player, this._summonAndUseList(player.cristal, hand));\n    }\n    fightGuard(player) {\n        const attackers = player.board\n            .filter((x) => (!x.justSummon || x.hasCharge) && x.canAttack && x.defense > 0 && x.attack > 0);\n        if (attackers.length === 0) {\n            return [];\n        }\n        const attackAvailable = [];\n        const opponentCreature = player.opponent.board.filter(x => x.hasGuard && x.defense > 0);\n        attackAvailable.push(...this._combiFight(attackers, opponentCreature));\n        return attackAvailable;\n    }\n    fightOther(player) {\n        const attackers = player.board\n            .filter((x) => (!x.justSummon || x.hasCharge) && x.canAttack && x.defense > 0 && x.attack > 0);\n        if (attackers.length === 0) {\n            return [];\n        }\n        const attackAvailable = [];\n        const opponentCreature = player.opponent.board.filter(x => !x.hasGuard && x.defense > 0);\n        attackAvailable.push(...this._combiFight(attackers, opponentCreature, true));\n        return attackAvailable;\n    }\n    _useTarget(player, cardsAvailable) {\n        const redTarget = player.opponent.board.slice(0);\n        const greenTarget = player.board.slice(0);\n        const actionsAvailable = [];\n        cardsAvailable.forEach((cards) => {\n            actionsAvailable.push(...this._useTargetList(cards, redTarget, greenTarget));\n        });\n        return actionsAvailable;\n    }\n    _useTargetList(hand, redTarget, greenTarget) {\n        if (hand.length === 0) {\n            return [];\n        }\n        const res = [];\n        const card = hand[0];\n        if (card.type === _game_cards_card_type__WEBPACK_IMPORTED_MODULE_2__[\"CardType\"].RED) {\n            for (let i = 0; i < redTarget.length; i++) {\n                const target = redTarget[i];\n                const children = this._useTargetList(hand.slice(1), redTarget, greenTarget);\n                if (children.length > 0) {\n                    children.forEach((child) => {\n                        res.push([...child, new _action__WEBPACK_IMPORTED_MODULE_0__[\"Action\"](_actionType__WEBPACK_IMPORTED_MODULE_1__[\"ActionType\"].USE, card.instanceId, target.instanceId)]);\n                    });\n                }\n                else {\n                    res.push([new _action__WEBPACK_IMPORTED_MODULE_0__[\"Action\"](_actionType__WEBPACK_IMPORTED_MODULE_1__[\"ActionType\"].USE, card.instanceId, target.instanceId)]);\n                }\n            }\n        }\n        if (card.type === _game_cards_card_type__WEBPACK_IMPORTED_MODULE_2__[\"CardType\"].GREEN) {\n            for (let i = 0; i < greenTarget.length; i++) {\n                const target = greenTarget[i];\n                const children = this._useTargetList(hand.slice(1), redTarget, greenTarget);\n                if (children.length > 0) {\n                    children.forEach((child) => {\n                        res.push([...child, new _action__WEBPACK_IMPORTED_MODULE_0__[\"Action\"](_actionType__WEBPACK_IMPORTED_MODULE_1__[\"ActionType\"].USE, card.instanceId, target.instanceId)]);\n                    });\n                }\n                else {\n                    res.push([new _action__WEBPACK_IMPORTED_MODULE_0__[\"Action\"](_actionType__WEBPACK_IMPORTED_MODULE_1__[\"ActionType\"].USE, card.instanceId, target.instanceId)]);\n                }\n            }\n        }\n        return res;\n    }\n    _summonAndUseList(cristal, hand) {\n        if (cristal <= 0 || hand.length === 0) {\n            return [];\n        }\n        const res = [];\n        for (let i = 0; i < hand.length; i++) {\n            const card = hand[i];\n            if (card.cost <= cristal) {\n                const child = this._summonAndUseList(cristal - card.cost, hand.slice(i + 1).filter((x) => x.cost <= cristal));\n                res.push([card]);\n                if (child.length > 0) {\n                    res.push(...child.map((x) => [card].concat(x)));\n                }\n            }\n        }\n        return res;\n    }\n    _combiFight(attackers, opponents, canAttackPlayer = false) {\n        if (attackers.length === 0) {\n            return [];\n        }\n        const res = [];\n        const card = attackers[0];\n        if (canAttackPlayer) {\n            const children = this._combiFight(attackers.slice(1), opponents, canAttackPlayer);\n            if (children.length > 0) {\n                children.forEach((child) => {\n                    res.push([new _action__WEBPACK_IMPORTED_MODULE_0__[\"Action\"](_actionType__WEBPACK_IMPORTED_MODULE_1__[\"ActionType\"].ATTACK, card.instanceId, -1), ...child]);\n                });\n            }\n            res.push([new _action__WEBPACK_IMPORTED_MODULE_0__[\"Action\"](_actionType__WEBPACK_IMPORTED_MODULE_1__[\"ActionType\"].ATTACK, card.instanceId, -1)]);\n        }\n        for (let i = 0; i < opponents.length; i++) {\n            const target = opponents[i];\n            const children = this._combiFight(attackers.slice(1), opponents, canAttackPlayer);\n            if (children.length > 0) {\n                children.forEach((child) => {\n                    res.push([new _action__WEBPACK_IMPORTED_MODULE_0__[\"Action\"](_actionType__WEBPACK_IMPORTED_MODULE_1__[\"ActionType\"].ATTACK, card.instanceId, target.instanceId), ...child]);\n                });\n            }\n            res.push([new _action__WEBPACK_IMPORTED_MODULE_0__[\"Action\"](_actionType__WEBPACK_IMPORTED_MODULE_1__[\"ActionType\"].ATTACK, card.instanceId, target.instanceId)]);\n        }\n        return res;\n    }\n}\n\n\n//# sourceURL=webpack:///./ts/ai/basic-ia.js?");

/***/ }),

/***/ "./ts/game-state.js":
/*!**************************!*\
  !*** ./ts/game-state.js ***!
  \**************************/
/*! exports provided: GameStateType, GameState */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"GameStateType\", function() { return GameStateType; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"GameState\", function() { return GameState; });\n/* harmony import */ var _action__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./action */ \"./ts/action.js\");\n/* harmony import */ var _actionType__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./actionType */ \"./ts/actionType.js\");\n/* harmony import */ var _ai_basic_ia__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./ai/basic-ia */ \"./ts/ai/basic-ia.js\");\n/* harmony import */ var _game_cards_card_factory__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./game/cards/card-factory */ \"./ts/game/cards/card-factory.js\");\n/* harmony import */ var _game_player__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./game/player */ \"./ts/game/player.js\");\n/* harmony import */ var _solution__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./solution */ \"./ts/solution.js\");\n\n\n\n\n\n\nvar GameStateType;\n(function (GameStateType) {\n    GameStateType[GameStateType[\"DRAFT\"] = 0] = \"DRAFT\";\n    GameStateType[GameStateType[\"BATTLE\"] = 1] = \"BATTLE\";\n})(GameStateType || (GameStateType = {}));\nclass GameState {\n    constructor() {\n        this._myPlayer = null;\n        this._enemyPlayer = null;\n        this._firstPlayer = null;\n        this._secondPlayer = null;\n        this._ia = null;\n        this._state = GameStateType.DRAFT;\n        this._myPlayer = new _game_player__WEBPACK_IMPORTED_MODULE_4__[\"Player\"](this);\n        this._enemyPlayer = new _game_player__WEBPACK_IMPORTED_MODULE_4__[\"Player\"](this);\n        this._enemyPlayer.opponent = this._myPlayer;\n        this._myPlayer.opponent = this._enemyPlayer;\n        this._ia = new _ai_basic_ia__WEBPACK_IMPORTED_MODULE_2__[\"BasicIA\"]();\n    }\n    bootstrap() {\n        do {\n            this._myPlayer.update();\n            this._enemyPlayer.update(true);\n            const dateStart = Date.now();\n            this.checkState();\n            this.updateCard();\n            this.save();\n            const solutions = _solution__WEBPACK_IMPORTED_MODULE_5__[\"Solution\"].simulate(this, this._ia, this._state, this._myPlayer, this._myPlayer === this._firstPlayer, dateStart);\n            let bestSolution = null;\n            solutions.forEach((solution) => {\n                if (bestSolution == null || bestSolution.score < solution.score) {\n                    bestSolution = solution;\n                }\n            });\n            this.load();\n            if (bestSolution === null) {\n                bestSolution = new _solution__WEBPACK_IMPORTED_MODULE_5__[\"Solution\"]();\n            }\n            this.play(this._myPlayer, bestSolution.actions);\n            printErr('Nb solutions : ' + solutions.length);\n            printErr('Loop during : ' + (Date.now() - dateStart) + ' ms');\n            _action__WEBPACK_IMPORTED_MODULE_0__[\"Action\"].output(bestSolution.actions);\n        } while (this._myPlayer.health > 0 && this._enemyPlayer.health > 0);\n    }\n    evaluation() {\n        if (this._enemyPlayer.health <= 0) {\n            return +Infinity;\n        }\n        if (this._myPlayer.health <= 0) {\n            return -Infinity;\n        }\n        let score = 0;\n        score += (this._myPlayer.health - this._enemyPlayer.health) * 2;\n        score -= this._enemyPlayer.board.length * 6;\n        this._enemyPlayer.board.forEach((x) => {\n            score -= x.attack * 3;\n            score -= x.defense * 3;\n            score -= x.abilities.length * 3;\n        });\n        this._myPlayer.board.forEach((x) => {\n            score += x.attack * 3;\n            score += x.defense * 3;\n            score += x.abilities.length * 3;\n        });\n        return score;\n    }\n    play(player, actions) {\n        for (let i = 0; i < actions.length; i++) {\n            const action = actions[i];\n            switch (action.getType()) {\n                case _actionType__WEBPACK_IMPORTED_MODULE_1__[\"ActionType\"].PASS:\n                    break;\n                case _actionType__WEBPACK_IMPORTED_MODULE_1__[\"ActionType\"].PICK:\n                    if (!player.pick(action.getParam(0))) {\n                        return false;\n                    }\n                    break;\n                case _actionType__WEBPACK_IMPORTED_MODULE_1__[\"ActionType\"].SUMMON:\n                    if (!player.summon(action.getParam(0))) {\n                        return false;\n                    }\n                    break;\n                case _actionType__WEBPACK_IMPORTED_MODULE_1__[\"ActionType\"].USE:\n                    if (!player.use(action.getParam(0), action.getParam(1))) {\n                        return false;\n                    }\n                    break;\n                case _actionType__WEBPACK_IMPORTED_MODULE_1__[\"ActionType\"].ATTACK:\n                    if (!player.attack(action.getParam(0), action.getParam(1))) {\n                        return false;\n                    }\n                    break;\n            }\n            player.end();\n        }\n        return true;\n    }\n    checkState() {\n        if (this._enemyPlayer.handSize > 0) {\n            if (this._state === GameStateType.DRAFT) {\n                if (this._myPlayer.handSize === 5 && this._myPlayer.deckSize === 30) {\n                    this._firstPlayer = this._myPlayer;\n                    this._secondPlayer = this._enemyPlayer;\n                }\n                else {\n                    this._firstPlayer = this._enemyPlayer;\n                    this._secondPlayer = this._myPlayer;\n                }\n            }\n            this._state = GameStateType.BATTLE;\n        }\n    }\n    updateCard() {\n        const cardCount = parseInt(readline(), 10);\n        console.error('Card count : ' + cardCount);\n        for (let i = 0; i < cardCount; i++) {\n            const inputs = readline().split(' ');\n            console.error('Card : ' + inputs);\n            const location = parseInt(inputs[2], 10);\n            const type = parseInt(inputs[3], 10);\n            if (this._state === GameStateType.DRAFT) {\n                const card = _game_cards_card_factory__WEBPACK_IMPORTED_MODULE_3__[\"CardFactory\"].create(type);\n                card.cardNumber = parseInt(inputs[0], 10);\n                card.instanceId = parseInt(inputs[1], 10);\n                card.location = location;\n                card.type = parseInt(inputs[3], 10);\n                card.cost = parseInt(inputs[4], 10);\n                card.attack = parseInt(inputs[5], 10);\n                card.defense = parseInt(inputs[6], 10);\n                card.abilities = inputs[7].split('');\n                card.myHealthChange = parseInt(inputs[8], 10);\n                card.opponentHealthChange = parseInt(inputs[9], 10);\n                card.cardDraw = parseInt(inputs[10], 10);\n                this._myPlayer.hand.push(card);\n            }\n            else {\n                if (location >= 0) {\n                    this._myPlayer.updateCard(inputs);\n                }\n                else {\n                    this._enemyPlayer.updateCard(inputs);\n                }\n            }\n        }\n    }\n    save() {\n        this._myPlayer.save();\n        this._enemyPlayer.save();\n    }\n    load() {\n        this._myPlayer.load();\n        this._enemyPlayer.load();\n    }\n}\n\n\n//# sourceURL=webpack:///./ts/game-state.js?");

/***/ }),

/***/ "./ts/game/cards/blue.js":
/*!*******************************!*\
  !*** ./ts/game/cards/blue.js ***!
  \*******************************/
/*! exports provided: BlueCard */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"BlueCard\", function() { return BlueCard; });\n/* harmony import */ var _card__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./card */ \"./ts/game/cards/card.js\");\n\nclass BlueCard extends _card__WEBPACK_IMPORTED_MODULE_0__[\"Card\"] {\n    value() {\n        const value = -100;\n        return value;\n    }\n}\n\n\n//# sourceURL=webpack:///./ts/game/cards/blue.js?");

/***/ }),

/***/ "./ts/game/cards/card-factory.js":
/*!***************************************!*\
  !*** ./ts/game/cards/card-factory.js ***!
  \***************************************/
/*! exports provided: CardFactory */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"CardFactory\", function() { return CardFactory; });\n/* harmony import */ var _blue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./blue */ \"./ts/game/cards/blue.js\");\n/* harmony import */ var _card_type__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./card-type */ \"./ts/game/cards/card-type.js\");\n/* harmony import */ var _creature__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./creature */ \"./ts/game/cards/creature.js\");\n/* harmony import */ var _green__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./green */ \"./ts/game/cards/green.js\");\n/* harmony import */ var _red__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./red */ \"./ts/game/cards/red.js\");\n\n\n\n\n\nclass CardFactory {\n    static create(type) {\n        switch (type) {\n            case _card_type__WEBPACK_IMPORTED_MODULE_1__[\"CardType\"].BLUE:\n                return new _blue__WEBPACK_IMPORTED_MODULE_0__[\"BlueCard\"]();\n            case _card_type__WEBPACK_IMPORTED_MODULE_1__[\"CardType\"].CREATURE:\n                return new _creature__WEBPACK_IMPORTED_MODULE_2__[\"CreatureCard\"]();\n            case _card_type__WEBPACK_IMPORTED_MODULE_1__[\"CardType\"].GREEN:\n                return new _green__WEBPACK_IMPORTED_MODULE_3__[\"GreenCard\"]();\n            case _card_type__WEBPACK_IMPORTED_MODULE_1__[\"CardType\"].RED:\n                return new _red__WEBPACK_IMPORTED_MODULE_4__[\"RedCard\"]();\n        }\n    }\n}\n\n\n//# sourceURL=webpack:///./ts/game/cards/card-factory.js?");

/***/ }),

/***/ "./ts/game/cards/card-type.js":
/*!************************************!*\
  !*** ./ts/game/cards/card-type.js ***!
  \************************************/
/*! exports provided: CardType */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"CardType\", function() { return CardType; });\nvar CardType;\n(function (CardType) {\n    CardType[CardType[\"CREATURE\"] = 0] = \"CREATURE\";\n    CardType[CardType[\"GREEN\"] = 1] = \"GREEN\";\n    CardType[CardType[\"RED\"] = 2] = \"RED\";\n    CardType[CardType[\"BLUE\"] = 3] = \"BLUE\";\n})(CardType || (CardType = {}));\n\n\n//# sourceURL=webpack:///./ts/game/cards/card-type.js?");

/***/ }),

/***/ "./ts/game/cards/card-value.js":
/*!*************************************!*\
  !*** ./ts/game/cards/card-value.js ***!
  \*************************************/
/*! exports provided: CardValue */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"CardValue\", function() { return CardValue; });\nconst CardValue = {\n    '1': 81,\n    '2': 69,\n    '3': 87,\n    '4': 81,\n    '5': 89,\n    '6': 89,\n    '7': 127,\n    '8': 83,\n    '9': 92,\n    '10': 62,\n    '11': 86,\n    '12': 78,\n    '13': 77,\n    '14': 54,\n    '15': 79,\n    '16': 66,\n    '17': 79,\n    '18': 93,\n    '19': 76,\n    '20': 58,\n    '21': 79,\n    '22': 60,\n    '23': 86,\n    '24': 60,\n    '25': 79,\n    '26': 85,\n    '27': 69,\n    '28': 91,\n    '29': 99,\n    '30': 70,\n    '31': 59,\n    '32': 97,\n    '33': 94,\n    '34': 71,\n    '35': 53,\n    '36': 68,\n    '37': 86,\n    '38': 75,\n    '39': 72,\n    '40': 68,\n    '41': 79,\n    '42': 52,\n    '43': 52,\n    '44': 88,\n    '45': 55,\n    '46': 47,\n    '47': 76,\n    '48': 122,\n    '49': 111,\n    '50': 99,\n    '51': 111,\n    '52': 102,\n    '53': 111,\n    '54': 97,\n    '55': 37,\n    '56': 70,\n    '57': 52,\n    '58': 56,\n    '59': 61,\n    '60': 46,\n    '61': 68,\n    '62': 61,\n    '63': 55,\n    '64': 99,\n    '65': 127,\n    '66': 106,\n    '67': 98,\n    '68': 124,\n    '69': 111,\n    '70': 79,\n    '71': 71,\n    '72': 74,\n    '73': 70,\n    '74': 57,\n    '75': 79,\n    '76': 50,\n    '77': 63,\n    '78': 36,\n    '79': 66,\n    '80': 90,\n    '81': 72,\n    '82': 83,\n    '83': 84,\n    '84': 113,\n    '85': 96,\n    '86': 89,\n    '87': 92,\n    '88': 91,\n    '89': 67,\n    '90': 64,\n    '91': 81,\n    '92': 30,\n    '93': 78,\n    '94': 70,\n    '95': 86,\n    '96': 87,\n    '97': 86,\n    '98': 77,\n    '99': 88,\n    '100': 72,\n    '101': 67,\n    '102': 61,\n    '103': 81,\n    '104': 75,\n    '105': 68,\n    '106': 70,\n    '107': 45,\n    '108': 52,\n    '109': 76,\n    '110': 13,\n    '111': 69,\n    '112': 59,\n    '113': 33,\n    '114': 64,\n    '115': 73,\n    '116': 114,\n    '117': 38,\n    '118': 59,\n    '119': 52,\n    '120': 54,\n    '121': 76,\n    '122': 62,\n    '123': 44,\n    '124': 43,\n    '125': 58,\n    '126': 60,\n    '127': 64,\n    '128': 58,\n    '129': 68,\n    '130': 54,\n    '131': 47,\n    '132': 48,\n    '133': 74,\n    '134': 63,\n    '135': 64,\n    '136': 47,\n    '137': 71,\n    '138': 35,\n    '139': 99,\n    '140': 4,\n    '141': 80,\n    '142': 52,\n    '143': 16,\n    '144': 85,\n    '145': 87,\n    '146': 68,\n    '147': 92,\n    '148': 94,\n    '149': 75,\n    '150': 85,\n    '151': 121,\n    '152': 83,\n    '153': -100,\n    '154': -100,\n    '155': -100,\n    '156': -100,\n    '157': -100,\n    '158': -100,\n    '159': -100,\n    '160': -100\n};\n\n\n//# sourceURL=webpack:///./ts/game/cards/card-value.js?");

/***/ }),

/***/ "./ts/game/cards/card.js":
/*!*******************************!*\
  !*** ./ts/game/cards/card.js ***!
  \*******************************/
/*! exports provided: Card */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"Card\", function() { return Card; });\n/* harmony import */ var _card_value__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./card-value */ \"./ts/game/cards/card-value.js\");\n\nclass Card {\n    constructor() {\n        this.cached = [];\n        this.justSummon = false;\n        this.canAttack = true;\n    }\n    get abilities() {\n        return this._abilities;\n    }\n    set abilities(value) {\n        this._abilities = value.filter(x => x !== '-');\n    }\n    get hasCharge() {\n        return this.abilities.indexOf('C') !== -1;\n    }\n    set hasCharge(value) {\n        if (value !== this.hasCharge) {\n            if (value) {\n                this.abilities.push('C');\n            }\n            else {\n                this.abilities.splice(this.abilities.indexOf('C'), 1);\n            }\n        }\n    }\n    get hasGuard() {\n        return this.abilities.indexOf('G') !== -1;\n    }\n    set hasGuard(value) {\n        if (value !== this.hasGuard) {\n            if (value) {\n                this.abilities.push('G');\n            }\n            else {\n                this.abilities.splice(this.abilities.indexOf('G'), 1);\n            }\n        }\n    }\n    get hasBreakthrough() {\n        return this.abilities.indexOf('B') !== -1;\n    }\n    set hasBreakthrough(value) {\n        if (value !== this.hasBreakthrough) {\n            if (value) {\n                this.abilities.push('B');\n            }\n            else {\n                this.abilities.splice(this.abilities.indexOf('B'), 1);\n            }\n        }\n    }\n    get hasDrain() {\n        return this.abilities.indexOf('D') !== -1;\n    }\n    set hasDrain(value) {\n        if (value !== this.hasDrain) {\n            if (value) {\n                this.abilities.push('D');\n            }\n            else {\n                this.abilities.splice(this.abilities.indexOf('D'), 1);\n            }\n        }\n    }\n    get hasLethal() {\n        return this.abilities.indexOf('L') !== -1;\n    }\n    set hasLethal(value) {\n        if (value !== this.hasLethal) {\n            if (value) {\n                this.abilities.push('L');\n            }\n            else {\n                this.abilities.splice(this.abilities.indexOf('L'), 1);\n            }\n        }\n    }\n    get hasWard() {\n        return this.abilities.indexOf('W') !== -1;\n    }\n    set hasWard(value) {\n        if (value !== this.hasWard) {\n            if (value) {\n                this.abilities.push('W');\n            }\n            else {\n                this.abilities.splice(this.abilities.indexOf('W'), 1);\n            }\n        }\n    }\n    value() {\n        let value = 0;\n        value = _card_value__WEBPACK_IMPORTED_MODULE_0__[\"CardValue\"][this.cardNumber] - value;\n        return value;\n    }\n    canUse(object) {\n        return false;\n    }\n    toString() {\n        return '[' + [this.instanceId, this.type, this.cost, this.attack + '/' + this.defense, this.abilities.join('')].join(',') + ']';\n    }\n    debug() {\n        printErr(this.toString());\n    }\n    save() {\n        this.cached[0] = this.instanceId;\n        this.cached[1] = this.location;\n        this.cached[2] = this.attack;\n        this.cached[3] = this.defense;\n        this.cached[4] = this._abilities.slice(0);\n        this.cached[5] = this.myHealthChange;\n        this.cached[6] = this.opponentHealthChange;\n        this.cached[7] = this.cardDraw;\n        this.cached[8] = false;\n        this.cached[9] = true;\n    }\n    load() {\n        this.instanceId = this.cached[0];\n        this.location = this.cached[1];\n        this.attack = this.cached[2];\n        this.defense = this.cached[3];\n        this._abilities = this.cached[4].slice(0);\n        this.myHealthChange = this.cached[5];\n        this.opponentHealthChange = this.cached[6];\n        this.cardDraw = this.cached[7];\n        this.justSummon = this.cached[8];\n        this.canAttack = this.cached[9];\n    }\n    fight(defender, player) {\n        this.canAttack = false;\n        const damageGiven = defender.hasWard ? 0 : this.attack;\n        const damageTaken = this.hasWard ? 0 : defender.attack;\n        let healthGain = 0;\n        let healthTaken = 0;\n        if (this.hasWard && defender.attack > 0) {\n            this.hasWard = false;\n        }\n        if (defender.hasWard && this.attack > 0) {\n            defender.hasWard = false;\n        }\n        if (this.hasBreakthrough && damageGiven >= defender.defense) {\n            healthTaken = defender.defense - damageGiven;\n        }\n        if (this.hasLethal && damageGiven > 0) {\n            defender.defense = 0;\n        }\n        if (this.hasDrain && damageGiven > 0) {\n            healthGain = this.attack;\n        }\n        defender.defense -= damageGiven;\n        if (defender.hasLethal && damageTaken > 0) {\n            this.defense = 0;\n        }\n        this.defense -= damageTaken;\n        player.health += healthGain;\n        player.opponent.health += healthTaken;\n    }\n}\n\n\n//# sourceURL=webpack:///./ts/game/cards/card.js?");

/***/ }),

/***/ "./ts/game/cards/creature.js":
/*!***********************************!*\
  !*** ./ts/game/cards/creature.js ***!
  \***********************************/
/*! exports provided: CreatureCard */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"CreatureCard\", function() { return CreatureCard; });\n/* harmony import */ var _card__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./card */ \"./ts/game/cards/card.js\");\n/* harmony import */ var _card_type__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./card-type */ \"./ts/game/cards/card-type.js\");\n\n\nclass CreatureCard extends _card__WEBPACK_IMPORTED_MODULE_0__[\"Card\"] {\n    canUse(object) {\n        if (object.type === _card_type__WEBPACK_IMPORTED_MODULE_1__[\"CardType\"].GREEN) {\n            return object.abilities.length === 0\n                ? true\n                : this.abilities.every(x => object.abilities.indexOf(x) === -1);\n        }\n        else if (object.type === _card_type__WEBPACK_IMPORTED_MODULE_1__[\"CardType\"].RED) {\n            return object.abilities.length === 0\n                ? true\n                : this.abilities.some(x => object.abilities.indexOf(x) !== -1);\n        }\n    }\n    value() {\n        if (this.hasLethal && this.hasCharge) {\n        }\n        if (this.hasLethal) {\n        }\n        return super.value();\n    }\n}\n\n\n//# sourceURL=webpack:///./ts/game/cards/creature.js?");

/***/ }),

/***/ "./ts/game/cards/green.js":
/*!********************************!*\
  !*** ./ts/game/cards/green.js ***!
  \********************************/
/*! exports provided: GreenCard */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"GreenCard\", function() { return GreenCard; });\n/* harmony import */ var _card__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./card */ \"./ts/game/cards/card.js\");\n\nclass GreenCard extends _card__WEBPACK_IMPORTED_MODULE_0__[\"Card\"] {\n    value() {\n        if (this.defense = 3) {\n        }\n        return super.value();\n    }\n}\n\n\n//# sourceURL=webpack:///./ts/game/cards/green.js?");

/***/ }),

/***/ "./ts/game/cards/red.js":
/*!******************************!*\
  !*** ./ts/game/cards/red.js ***!
  \******************************/
/*! exports provided: RedCard */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"RedCard\", function() { return RedCard; });\n/* harmony import */ var _card__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./card */ \"./ts/game/cards/card.js\");\n\nclass RedCard extends _card__WEBPACK_IMPORTED_MODULE_0__[\"Card\"] {\n}\n\n\n//# sourceURL=webpack:///./ts/game/cards/red.js?");

/***/ }),

/***/ "./ts/game/deck.js":
/*!*************************!*\
  !*** ./ts/game/deck.js ***!
  \*************************/
/*! exports provided: Deck */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"Deck\", function() { return Deck; });\n/* harmony import */ var _cards_card_type__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./cards/card-type */ \"./ts/game/cards/card-type.js\");\n\nclass Deck {\n    constructor() {\n        this.cards = [];\n        this.cached = [];\n        this.cards = [];\n    }\n    get nbCard() {\n        return this.cards.length;\n    }\n    get nbCreature() {\n        return this.cards.filter(x => x.type === _cards_card_type__WEBPACK_IMPORTED_MODULE_0__[\"CardType\"].CREATURE).length;\n    }\n    get nbGuardCreature() {\n        return this.cards.filter(x => x.type === _cards_card_type__WEBPACK_IMPORTED_MODULE_0__[\"CardType\"].CREATURE && x.hasGuard).length;\n    }\n    get nbGreen() {\n        return this.cards.filter(x => x.type === _cards_card_type__WEBPACK_IMPORTED_MODULE_0__[\"CardType\"].GREEN).length;\n    }\n    get nbRed() {\n        return this.cards.filter(x => x.type === _cards_card_type__WEBPACK_IMPORTED_MODULE_0__[\"CardType\"].RED).length;\n    }\n    get nbBlue() {\n        return this.cards.filter(x => x.type === _cards_card_type__WEBPACK_IMPORTED_MODULE_0__[\"CardType\"].BLUE).length;\n    }\n    getCards() {\n        return this.cards;\n    }\n    push(card) {\n        this.cards.push(card);\n    }\n    toString() {\n        return 'creature=' + this.nbCreature +\n            ' green=' + this.nbGreen +\n            ' red=' + this.nbRed +\n            ' blue=' + this.nbBlue;\n    }\n    filter(func) {\n        return this.cards.filter(func);\n    }\n    save() {\n        this.cached = this.cards.slice(0);\n        this.cached.forEach((card) => card.save());\n    }\n    load() {\n        this.cards = this.cached.slice(0);\n        this.cards.forEach((card) => card.load());\n    }\n}\n\n\n//# sourceURL=webpack:///./ts/game/deck.js?");

/***/ }),

/***/ "./ts/game/player.js":
/*!***************************!*\
  !*** ./ts/game/player.js ***!
  \***************************/
/*! exports provided: Player */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"Player\", function() { return Player; });\n/* harmony import */ var _cards_card_factory__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./cards/card-factory */ \"./ts/game/cards/card-factory.js\");\n/* harmony import */ var _cards_card_type__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./cards/card-type */ \"./ts/game/cards/card-type.js\");\n/* harmony import */ var _deck__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./deck */ \"./ts/game/deck.js\");\n\n\n\nclass Player {\n    constructor(gameState) {\n        this.gameState = gameState;\n        this.deck = new _deck__WEBPACK_IMPORTED_MODULE_2__[\"Deck\"]();\n        this.hand = [];\n        this.board = [];\n        this.cached = [];\n    }\n    update(isOpponent = false) {\n        this.hand = [];\n        this.board = [];\n        const inputs = readline().split(' ');\n        this.health = parseInt(inputs[0], 10);\n        this.cristal = parseInt(inputs[1], 10);\n        this.deckSize = parseInt(inputs[2], 10);\n        this.rune = parseInt(inputs[3], 10);\n        if (isOpponent) {\n            const opponentDetail = readline().split(' ');\n            this.handSize = parseInt(opponentDetail[0], 10);\n            const nbAction = opponentDetail[1] || 0;\n            for (let i = 0; i < nbAction; i++) {\n                readline();\n            }\n        }\n        this.nextTurnDraw = 1;\n    }\n    updateCard(inputs) {\n        const cardNumber = parseInt(inputs[0], 10);\n        const instanceId = parseInt(inputs[1], 10);\n        const type = parseInt(inputs[3], 10);\n        const cards = this.deck.filter((x) => x.cardNumber === cardNumber);\n        let card = cards.find(x => x.instanceId === instanceId);\n        if (card == null) {\n            console.error('Card not found', instanceId, type);\n            console.error('Card not found', inputs);\n            card = cards.find(x => x.instanceId === -1) || _cards_card_factory__WEBPACK_IMPORTED_MODULE_0__[\"CardFactory\"].create(type);\n        }\n        card.cardNumber = cardNumber;\n        card.instanceId = instanceId;\n        card.location = parseInt(inputs[2], 10);\n        card.type = type;\n        card.cost = parseInt(inputs[4], 10);\n        card.attack = parseInt(inputs[5], 10);\n        card.defense = parseInt(inputs[6], 10);\n        card.abilities = inputs[7].split('');\n        card.myHealthChange = parseInt(inputs[8], 10);\n        card.opponentHealthChange = parseInt(inputs[9], 10);\n        card.cardDraw = parseInt(inputs[10], 10);\n        if (card.location === 0) {\n            this.hand.push(card);\n        }\n        else {\n            this.board.push(card);\n        }\n    }\n    save() {\n        this.cached[1] = this.health;\n        this.cached[2] = this.cristal;\n        this.cached[3] = this.rune;\n        this.cached[4] = this.handSize;\n        this.cached[5] = this.deckSize;\n        this.cached[6] = this.hand.slice(0);\n        this.cached[7] = this.board.slice(0);\n        this.cached[6].forEach((card) => card.save());\n        this.cached[7].forEach((card) => card.save());\n        this.deck.save();\n    }\n    load() {\n        this.deck.load();\n        this.health = this.cached[1];\n        this.cristal = this.cached[2];\n        this.rune = this.cached[3];\n        this.handSize = this.cached[4];\n        this.deckSize = this.cached[5];\n        this.hand = this.cached[6].slice(0);\n        this.board = this.cached[7].slice(0);\n        this.hand.forEach((card) => card.load());\n        this.board.forEach((card) => card.load());\n    }\n    pick(params) {\n        if (params < 0 || params > 2) {\n            return false;\n        }\n        this.deck.push(this.hand[params]);\n        return true;\n    }\n    summon(params) {\n        const summoned = this.hand.find((card) => card.instanceId === params);\n        if (summoned == null || this.cristal < summoned.cost) {\n            return false;\n        }\n        summoned.justSummon = true;\n        this.cristal -= summoned.cost;\n        this.board.push(summoned);\n        this.health += summoned.myHealthChange;\n        this.nextTurnDraw += summoned.cardDraw;\n        this.opponent.health += summoned.opponentHealthChange;\n        this.hand.splice(this.hand.indexOf(summoned), 1);\n        return true;\n    }\n    use(params, params2) {\n        const item = this.hand.find((card) => card.instanceId === params);\n        if (item == null || this.cristal < item.cost) {\n            return false;\n        }\n        let creature = null;\n        if (params2 === -1) {\n        }\n        else {\n            if (item.type === _cards_card_type__WEBPACK_IMPORTED_MODULE_1__[\"CardType\"].GREEN) {\n                creature = this.board.find((card) => card.instanceId === params2);\n                if (creature == null) {\n                    return false;\n                }\n                creature.hasCharge = creature.hasCharge || item.hasCharge;\n                creature.hasBreakthrough = creature.hasBreakthrough || item.hasBreakthrough;\n                creature.hasDrain = creature.hasDrain || item.hasDrain;\n                creature.hasGuard = creature.hasGuard || item.hasGuard;\n                creature.hasLethal = creature.hasLethal || item.hasLethal;\n                creature.hasWard = creature.hasWard || item.hasWard;\n            }\n            else {\n                creature = this.opponent.board.find((card) => card.instanceId === params2);\n                if (creature == null) {\n                    return false;\n                }\n                creature.hasCharge = creature.hasCharge && !item.hasCharge;\n                creature.hasBreakthrough = creature.hasBreakthrough && !item.hasBreakthrough;\n                creature.hasDrain = creature.hasDrain && !item.hasDrain;\n                creature.hasGuard = creature.hasGuard && !item.hasGuard;\n                creature.hasLethal = creature.hasLethal && !item.hasLethal;\n                creature.hasWard = creature.hasWard && !item.hasWard;\n            }\n            creature.attack = Math.max(0, creature.attack + item.attack);\n            if (creature.hasWard && item.defense < 0) {\n                creature.hasWard = false;\n            }\n            else {\n                creature.defense += item.defense;\n            }\n            this.health += item.myHealthChange;\n            this.opponent.health += item.opponentHealthChange;\n            this.nextTurnDraw += item.cardDraw;\n        }\n        this.cristal -= item.cost;\n        this.hand.splice(this.hand.indexOf(item), 1);\n        return true;\n    }\n    attack(params, params2) {\n        const attacker = this.board.find((card) => card.instanceId === params);\n        if (attacker == null) {\n            return false;\n        }\n        if (params2 === -1) {\n            if (this.opponent.board.some(x => x.hasGuard && x.defense > 0)) {\n                return false;\n            }\n            this.opponent.health -= attacker.attack;\n            attacker.canAttack = false;\n            if (attacker.hasDrain) {\n                this.health += attacker.attack;\n            }\n        }\n        else {\n            const opponent = this.opponent.board.find((card) => card.instanceId === params2);\n            if (opponent == null) {\n                return false;\n            }\n            attacker.fight(opponent, this);\n        }\n        return true;\n    }\n    end() {\n        this.board = this.board.filter((card) => card.defense > 0);\n        this.opponent.board = this.opponent.board.filter((card) => card.defense > 0);\n    }\n}\n\n\n//# sourceURL=webpack:///./ts/game/player.js?");

/***/ }),

/***/ "./ts/main.js":
/*!********************!*\
  !*** ./ts/main.js ***!
  \********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _game_state__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./game-state */ \"./ts/game-state.js\");\n\nconst gameState = new _game_state__WEBPACK_IMPORTED_MODULE_0__[\"GameState\"]();\ngameState.bootstrap();\n\n\n//# sourceURL=webpack:///./ts/main.js?");

/***/ }),

/***/ "./ts/solution.js":
/*!************************!*\
  !*** ./ts/solution.js ***!
  \************************/
/*! exports provided: Solution */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"Solution\", function() { return Solution; });\n/* harmony import */ var _action__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./action */ \"./ts/action.js\");\n/* harmony import */ var _game_state__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./game-state */ \"./ts/game-state.js\");\n/* harmony import */ var _game_cards_card_type__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./game/cards/card-type */ \"./ts/game/cards/card-type.js\");\n\n\n\nclass Solution {\n    constructor(actions) {\n        this.actions = actions;\n        if (this.actions == null) {\n            this.actions = [];\n        }\n        if (this.actions.length === 0) {\n            this.actions.push(_action__WEBPACK_IMPORTED_MODULE_0__[\"Action\"].Pass());\n        }\n    }\n    static simulate(gameState, ia, state, player, isFirstPlayer, dateStart) {\n        switch (state) {\n            case _game_state__WEBPACK_IMPORTED_MODULE_1__[\"GameStateType\"].DRAFT:\n                return ia.draft(player).map((x) => {\n                    return new Solution([x]);\n                });\n            case _game_state__WEBPACK_IMPORTED_MODULE_1__[\"GameStateType\"].BATTLE:\n                const solutionsAvailable = [];\n                this.simulateBattle(ia, [], player, gameState, dateStart, solutionsAvailable);\n                return solutionsAvailable;\n        }\n    }\n    static simulateAdversaire(solutionsAvailable, ia, player, gameState, dateStart) {\n        solutionsAvailable.forEach((solution) => {\n            const enemySolutionsAvailable = [];\n            this.simulateBattle(ia, solution.actions, player.opponent, gameState, dateStart, enemySolutionsAvailable);\n            let bestSolution = null;\n            enemySolutionsAvailable.forEach((enemySolution) => {\n                if (bestSolution == null || bestSolution.score > enemySolution.score) {\n                    bestSolution = enemySolution;\n                }\n            });\n            solution.score = bestSolution.score;\n        });\n    }\n    static simulateBattle(ia, foreActions, player, gameState, dateStart, solutionsAvailable) {\n        gameState.load();\n        if (this.haveTime(dateStart) && gameState.play(player, [...foreActions])) {\n            const summonsAvailable = ia.summon(player);\n            if (summonsAvailable.length === 0) {\n                summonsAvailable.push([]);\n            }\n            summonsAvailable.forEach((summon) => {\n                gameState.load();\n                if (this.haveTime(dateStart) && gameState.play(player, [...foreActions, ...summon])) {\n                    const useItemsAvailable = ia.useItems(player);\n                    if (useItemsAvailable.length === 0) {\n                        useItemsAvailable.push([]);\n                    }\n                    useItemsAvailable.forEach((useItem) => {\n                        gameState.load();\n                        if (this.haveTime(dateStart) && gameState.play(player, [...foreActions, ...summon, ...useItem])) {\n                            if (player.hand.length === 0 || player.board.length === 6 || player.hand.every((card) => {\n                                switch (card.type) {\n                                    case _game_cards_card_type__WEBPACK_IMPORTED_MODULE_2__[\"CardType\"].CREATURE:\n                                        return card.cost > player.cristal;\n                                    case _game_cards_card_type__WEBPACK_IMPORTED_MODULE_2__[\"CardType\"].GREEN:\n                                        return card.cost > player.cristal || player.board.length === 0;\n                                    case _game_cards_card_type__WEBPACK_IMPORTED_MODULE_2__[\"CardType\"].RED:\n                                        return card.cost > player.cristal || player.opponent.board.length === 0;\n                                    case _game_cards_card_type__WEBPACK_IMPORTED_MODULE_2__[\"CardType\"].BLUE:\n                                        return card.cost > player.cristal || true;\n                                }\n                            })) {\n                                const figthsGuardAvailable = ia.fightGuard(player);\n                                if (figthsGuardAvailable.length === 0) {\n                                    figthsGuardAvailable.push([]);\n                                }\n                                figthsGuardAvailable.forEach((figthGuard) => {\n                                    gameState.load();\n                                    if (this.haveTime(dateStart) &&\n                                        gameState.play(player, [...foreActions, ...summon, ...useItem, ...figthGuard])) {\n                                        const figthsOtherAvailable = ia.fightOther(player);\n                                        if (figthsOtherAvailable.length === 0) {\n                                            figthsOtherAvailable.push([]);\n                                        }\n                                        figthsOtherAvailable.forEach((fightOther) => {\n                                            const solution = new Solution([\n                                                ...foreActions, ...summon, ...useItem, ...figthGuard, ...fightOther\n                                            ]);\n                                            solution.evaluation(player, gameState);\n                                            solutionsAvailable.push(solution);\n                                        });\n                                    }\n                                });\n                            }\n                        }\n                    });\n                }\n            });\n        }\n    }\n    static haveTime(dateStart) {\n        return (Date.now() - dateStart) < 90;\n    }\n    evaluation(player, gameState) {\n        gameState.load();\n        if (gameState.play(player, this.actions || [])) {\n            this.score = gameState.evaluation();\n        }\n        else {\n            this.score = -Infinity;\n        }\n    }\n}\n\n\n//# sourceURL=webpack:///./ts/solution.js?");

/***/ })

/******/ });