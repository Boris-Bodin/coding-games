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

/***/ "./ts/action-type.js":
/*!***************************!*\
  !*** ./ts/action-type.js ***!
  \***************************/
/*! exports provided: ActionType */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"ActionType\", function() { return ActionType; });\nvar ActionType;\r\n(function (ActionType) {\r\n    ActionType[\"CONNECT\"] = \"CONNECT \";\r\n    ActionType[\"GOTO\"] = \"GOTO \";\r\n    ActionType[\"WAIT\"] = \"WAIT \";\r\n})(ActionType || (ActionType = {}));\r\n\n\n//# sourceURL=webpack:///./ts/action-type.js?");

/***/ }),

/***/ "./ts/action.js":
/*!**********************!*\
  !*** ./ts/action.js ***!
  \**********************/
/*! exports provided: Action */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"Action\", function() { return Action; });\n/* harmony import */ var _action_type__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./action-type */ \"./ts/action-type.js\");\n\r\nclass Action {\r\n    constructor(type, ...args) {\r\n        this.type = type;\r\n        this.args = args;\r\n    }\r\n    static connect(params) {\r\n        return new Action(_action_type__WEBPACK_IMPORTED_MODULE_0__[\"ActionType\"].CONNECT, params);\r\n    }\r\n    static goTo(params) {\r\n        return new Action(_action_type__WEBPACK_IMPORTED_MODULE_0__[\"ActionType\"].GOTO, params);\r\n    }\r\n    static wait() {\r\n        return new Action(_action_type__WEBPACK_IMPORTED_MODULE_0__[\"ActionType\"].WAIT);\r\n    }\r\n    output() {\r\n        print(this.toString());\r\n    }\r\n    toString() {\r\n        return [this.type, ...this.args].join(' ');\r\n    }\r\n    getType() {\r\n        return this.type;\r\n    }\r\n    getParams() {\r\n        return this.args;\r\n    }\r\n    getParam(index) {\r\n        return this.args[index];\r\n    }\r\n}\r\n\n\n//# sourceURL=webpack:///./ts/action.js?");

/***/ }),

/***/ "./ts/ai/basic-ia.js":
/*!***************************!*\
  !*** ./ts/ai/basic-ia.js ***!
  \***************************/
/*! exports provided: BasicIA */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"BasicIA\", function() { return BasicIA; });\n/* harmony import */ var _action__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../action */ \"./ts/action.js\");\n/* harmony import */ var _game_module_type__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../game/module-type */ \"./ts/game/module-type.js\");\n/* harmony import */ var _game_molecule_type__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../game/molecule-type */ \"./ts/game/molecule-type.js\");\n\r\n\r\n\r\nclass BasicIA {\r\n    constructor(_gameState) {\r\n        this._gameState = _gameState;\r\n        this._rankAims = [3, 3, 3, 3, 4, 4, 4, 4, 5, 5, 5, 5, 6, 6, 6, 7, 7, 7, 8, 8, 8, 9];\r\n    }\r\n    simulate(bot) {\r\n        if (bot.module === _game_module_type__WEBPACK_IMPORTED_MODULE_1__[\"ModuleType\"].START_POS) {\r\n            return this.goTo(bot, _game_module_type__WEBPACK_IMPORTED_MODULE_1__[\"ModuleType\"].SAMPLES);\r\n        }\r\n        const action = this.Process(bot);\r\n        if (action === null) {\r\n            return _action__WEBPACK_IMPORTED_MODULE_0__[\"Action\"].wait();\r\n        }\r\n        switch (action) {\r\n            case _game_module_type__WEBPACK_IMPORTED_MODULE_1__[\"ModuleType\"].SAMPLES:\r\n                return this.goToSamples(bot);\r\n            case _game_module_type__WEBPACK_IMPORTED_MODULE_1__[\"ModuleType\"].DIAGNOSIS:\r\n                return this.goToDiagnosis(bot);\r\n            case _game_module_type__WEBPACK_IMPORTED_MODULE_1__[\"ModuleType\"].MOLECULES:\r\n                return this.goToMolecules(bot);\r\n            case _game_module_type__WEBPACK_IMPORTED_MODULE_1__[\"ModuleType\"].LABORATORY:\r\n                return this.goToLaboratory(bot);\r\n            case _game_module_type__WEBPACK_IMPORTED_MODULE_1__[\"ModuleType\"].EMPTY:\r\n                return _action__WEBPACK_IMPORTED_MODULE_0__[\"Action\"].goTo(action);\r\n            default:\r\n                return this.connect(action);\r\n        }\r\n    }\r\n    goTo(bot, module) {\r\n        bot.module = module;\r\n        return _action__WEBPACK_IMPORTED_MODULE_0__[\"Action\"].goTo(module);\r\n    }\r\n    goToSamples(bot) {\r\n        if (bot.sampleDatas.length < 3) {\r\n            if (this._gameState.modulesInstances[_game_module_type__WEBPACK_IMPORTED_MODULE_1__[\"ModuleType\"].DIAGNOSIS].canFullyCompleteTwo(bot)) {\r\n                return this.goToDiagnosis(bot);\r\n            }\r\n            else {\r\n                return this.goTo(bot, _game_module_type__WEBPACK_IMPORTED_MODULE_1__[\"ModuleType\"].SAMPLES);\r\n            }\r\n        }\r\n        else {\r\n            return this.goToDiagnosis(bot);\r\n        }\r\n    }\r\n    goToDiagnosis(bot) {\r\n        if (bot.sampleDatas.length < 3 && this._gameState.modulesInstances[_game_module_type__WEBPACK_IMPORTED_MODULE_1__[\"ModuleType\"].DIAGNOSIS].canFullyCompleteTwo(bot)) {\r\n            return this.goTo(bot, _game_module_type__WEBPACK_IMPORTED_MODULE_1__[\"ModuleType\"].DIAGNOSIS);\r\n        }\r\n        if (bot.sampleDatas.length === 0) {\r\n            return this.goToSamples(bot);\r\n        }\r\n        return this.goTo(bot, _game_module_type__WEBPACK_IMPORTED_MODULE_1__[\"ModuleType\"].DIAGNOSIS);\r\n    }\r\n    goToMolecules(bot) {\r\n        if (bot.storageCount < 10) {\r\n            return this.goTo(bot, _game_module_type__WEBPACK_IMPORTED_MODULE_1__[\"ModuleType\"].MOLECULES);\r\n        }\r\n        else {\r\n            return this.goToLaboratory(bot);\r\n        }\r\n    }\r\n    goToLaboratory(bot) {\r\n        if (bot.sampleDatas.some((sampleData) => this._gameState.modulesInstances[_game_module_type__WEBPACK_IMPORTED_MODULE_1__[\"ModuleType\"].LABORATORY].canConnect(bot, sampleData))) {\r\n            return this.goTo(bot, _game_module_type__WEBPACK_IMPORTED_MODULE_1__[\"ModuleType\"].LABORATORY);\r\n        }\r\n        else {\r\n            return this.goToSamples(bot);\r\n        }\r\n    }\r\n    connect(id) {\r\n        return _action__WEBPACK_IMPORTED_MODULE_0__[\"Action\"].connect(id);\r\n    }\r\n    Process(bot) {\r\n        if (bot.eta > 0) {\r\n            return _game_module_type__WEBPACK_IMPORTED_MODULE_1__[\"ModuleType\"].EMPTY;\r\n        }\r\n        switch (bot.module) {\r\n            case _game_module_type__WEBPACK_IMPORTED_MODULE_1__[\"ModuleType\"].SAMPLES:\r\n                return this.ProcessSamples(bot);\r\n            case _game_module_type__WEBPACK_IMPORTED_MODULE_1__[\"ModuleType\"].DIAGNOSIS:\r\n                return this.ProcessDiagnosis(bot);\r\n            case _game_module_type__WEBPACK_IMPORTED_MODULE_1__[\"ModuleType\"].MOLECULES:\r\n                return this.ProcessMolecules(bot);\r\n            case _game_module_type__WEBPACK_IMPORTED_MODULE_1__[\"ModuleType\"].LABORATORY:\r\n                return this.ProcessLaboratory(bot);\r\n        }\r\n    }\r\n    ProcessSamples(bot) {\r\n        if (bot.eta > 0) {\r\n            return _game_module_type__WEBPACK_IMPORTED_MODULE_1__[\"ModuleType\"].SAMPLES;\r\n        }\r\n        const rankAim = this._rankAims[Math.min(bot.expertiseCount, this._rankAims.length - 1)];\r\n        let rank = 0;\r\n        for (const sampleData of bot.sampleDatas) {\r\n            rank += sampleData.rank;\r\n        }\r\n        if (bot.sampleDatas.length < 3 && rank < rankAim) {\r\n            return Math.ceil((rankAim - rank) / (3 - bot.sampleDatas.length));\r\n        }\r\n        return _game_module_type__WEBPACK_IMPORTED_MODULE_1__[\"ModuleType\"].DIAGNOSIS;\r\n    }\r\n    ProcessDiagnosis(bot) {\r\n        if (bot.eta > 0) {\r\n            return _game_module_type__WEBPACK_IMPORTED_MODULE_1__[\"ModuleType\"].DIAGNOSIS;\r\n        }\r\n        for (const sampleData of bot.sampleDatas) {\r\n            if (sampleData.cost.A === -1) {\r\n                return sampleData.sampleId;\r\n            }\r\n        }\r\n        this._gameState.load();\r\n        this.play(bot);\r\n        if (bot.sampleDatas.length > 0) {\r\n            return bot.sampleDatas[0].sampleId;\r\n        }\r\n        else {\r\n            if (bot.sampleDatas.length < 3) {\r\n                for (const sampleData of bot.sampleDatas) {\r\n                    this._gameState.load();\r\n                    bot.sampleDatas.push(sampleData);\r\n                    this.play(bot);\r\n                    if (bot.sampleDatas.length === 0) {\r\n                        return sampleData.sampleId;\r\n                    }\r\n                }\r\n            }\r\n        }\r\n        this._gameState.load();\r\n        if (bot.sampleDatas.length > 0) {\r\n            return _game_module_type__WEBPACK_IMPORTED_MODULE_1__[\"ModuleType\"].MOLECULES;\r\n        }\r\n        else {\r\n            return _game_module_type__WEBPACK_IMPORTED_MODULE_1__[\"ModuleType\"].SAMPLES;\r\n        }\r\n    }\r\n    ProcessMolecules(bot) {\r\n        if (bot.eta > 0) {\r\n            return _game_module_type__WEBPACK_IMPORTED_MODULE_1__[\"ModuleType\"].MOLECULES;\r\n        }\r\n        this._gameState.load();\r\n        if (bot.storageCount < 10) {\r\n            let sampleDatas = bot.sampleDatas.slice(0);\r\n            for (const sampleData of sampleDatas) {\r\n                if (this._gameState.modulesInstances[_game_module_type__WEBPACK_IMPORTED_MODULE_1__[\"ModuleType\"].LABORATORY].canConnect(bot, sampleData)) {\r\n                    bot.storage = bot.storage.sub(sampleData.cost.sub(bot.expertise));\r\n                    bot.expertise[sampleData.expertiseGain]++;\r\n                    bot.sampleDatas.splice(bot.sampleDatas.indexOf(sampleData), 1);\r\n                }\r\n            }\r\n            sampleDatas = bot.sampleDatas.slice(0);\r\n            for (const sampleData of sampleDatas) {\r\n                if (this._gameState.modulesInstances[_game_module_type__WEBPACK_IMPORTED_MODULE_1__[\"ModuleType\"].LABORATORY].canConnect(bot, sampleData)) {\r\n                    bot.storage = bot.storage.sub(sampleData.cost.sub(bot.expertise));\r\n                    bot.expertise[sampleData.expertiseGain]++;\r\n                    bot.sampleDatas.splice(bot.sampleDatas.indexOf(sampleData), 1);\r\n                }\r\n            }\r\n            if (bot.sampleDatas.length > 0) {\r\n                for (const sampleData of bot.sampleDatas) {\r\n                    const type = (this._gameState.modulesInstances[_game_module_type__WEBPACK_IMPORTED_MODULE_1__[\"ModuleType\"].MOLECULES].consume(bot, sampleData));\r\n                    if (type !== -1) {\r\n                        return type;\r\n                    }\r\n                }\r\n            }\r\n        }\r\n        this._gameState.load();\r\n        return _game_module_type__WEBPACK_IMPORTED_MODULE_1__[\"ModuleType\"].LABORATORY;\r\n    }\r\n    ProcessLaboratory(bot) {\r\n        if (bot.eta > 0) {\r\n            return _game_module_type__WEBPACK_IMPORTED_MODULE_1__[\"ModuleType\"].LABORATORY;\r\n        }\r\n        for (const sampleData of bot.sampleDatas) {\r\n            if (this._gameState.modulesInstances[_game_module_type__WEBPACK_IMPORTED_MODULE_1__[\"ModuleType\"].LABORATORY].canConnect(bot, sampleData)) {\r\n                return sampleData.sampleId;\r\n            }\r\n        }\r\n        if (bot.sampleDatas.length > 1) {\r\n            this._gameState.load();\r\n            const size = bot.sampleDatas.length;\r\n            this.play(bot);\r\n            if (bot.sampleDatas.length < size) {\r\n                return _game_module_type__WEBPACK_IMPORTED_MODULE_1__[\"ModuleType\"].MOLECULES;\r\n            }\r\n        }\r\n        return _game_module_type__WEBPACK_IMPORTED_MODULE_1__[\"ModuleType\"].SAMPLES;\r\n    }\r\n    play(bot) {\r\n        const sampleDatas = bot.sampleDatas.slice(0);\r\n        for (let i = 0; i < sampleDatas.length; i++) {\r\n            const sampleData = sampleDatas[0];\r\n            if (bot.storage.add(bot.expertise).canBuy(sampleData.cost)) {\r\n                bot.expertise[sampleData.expertiseGain]++;\r\n                bot.storage = bot.storage.sub(sampleData.cost.sub(bot.expertise));\r\n                bot.sampleDatas.splice(bot.sampleDatas.indexOf(sampleData), 1);\r\n                this._gameState.modulesInstances[_game_module_type__WEBPACK_IMPORTED_MODULE_1__[\"ModuleType\"].MOLECULES].moleculeAvailable =\r\n                    this._gameState.modulesInstances[_game_module_type__WEBPACK_IMPORTED_MODULE_1__[\"ModuleType\"].MOLECULES].moleculeAvailable.add(sampleData.cost);\r\n            }\r\n            else {\r\n                const remain = sampleData.cost.sub(bot.expertise.add(bot.storage));\r\n                for (const type of _game_molecule_type__WEBPACK_IMPORTED_MODULE_2__[\"MoleculesIterator\"]) {\r\n                    const available = this._gameState.modulesInstances[_game_module_type__WEBPACK_IMPORTED_MODULE_1__[\"ModuleType\"].MOLECULES].moleculeAvailable[type];\r\n                    const willTake = Math.min(10 - bot.storageCount, Math.min(available, remain[type]));\r\n                    bot.storage[type] += willTake;\r\n                    this._gameState.modulesInstances[_game_module_type__WEBPACK_IMPORTED_MODULE_1__[\"ModuleType\"].MOLECULES].moleculeAvailable[type] -= willTake;\r\n                }\r\n                if (bot.storage.add(bot.expertise).canBuy(sampleData.cost)) {\r\n                    bot.expertise[sampleData.expertiseGain]++;\r\n                    bot.storage = bot.storage.sub(sampleData.cost.sub(bot.expertise));\r\n                    bot.sampleDatas.splice(bot.sampleDatas.indexOf(sampleData), 1);\r\n                    this._gameState.modulesInstances[_game_module_type__WEBPACK_IMPORTED_MODULE_1__[\"ModuleType\"].MOLECULES].moleculeAvailable =\r\n                        this._gameState.modulesInstances[_game_module_type__WEBPACK_IMPORTED_MODULE_1__[\"ModuleType\"].MOLECULES].moleculeAvailable.add(sampleData.cost);\r\n                }\r\n            }\r\n        }\r\n        return true;\r\n    }\r\n}\r\n\n\n//# sourceURL=webpack:///./ts/ai/basic-ia.js?");

/***/ }),

/***/ "./ts/game-state.js":
/*!**************************!*\
  !*** ./ts/game-state.js ***!
  \**************************/
/*! exports provided: GameState */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"GameState\", function() { return GameState; });\n/* harmony import */ var _ai_basic_ia__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ai/basic-ia */ \"./ts/ai/basic-ia.js\");\n/* harmony import */ var _game_bot__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./game/bot */ \"./ts/game/bot.js\");\n/* harmony import */ var _game_diagnosis_module__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./game/diagnosis-module */ \"./ts/game/diagnosis-module.js\");\n/* harmony import */ var _game_laboratory_module__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./game/laboratory-module */ \"./ts/game/laboratory-module.js\");\n/* harmony import */ var _game_molecules_module__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./game/molecules-module */ \"./ts/game/molecules-module.js\");\n/* harmony import */ var _game_samples_module__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./game/samples-module */ \"./ts/game/samples-module.js\");\n\r\n\r\n\r\n\r\n\r\n\r\nclass GameState {\r\n    constructor() {\r\n        this.samples = new _game_samples_module__WEBPACK_IMPORTED_MODULE_5__[\"SamplesModule\"](this);\r\n        this.diagnosis = new _game_diagnosis_module__WEBPACK_IMPORTED_MODULE_2__[\"DiagnosisModule\"](this);\r\n        this.molecules = new _game_molecules_module__WEBPACK_IMPORTED_MODULE_4__[\"MoleculesModule\"](this);\r\n        this.laboratory = new _game_laboratory_module__WEBPACK_IMPORTED_MODULE_3__[\"LaboratoryModule\"](this);\r\n        this.modulesInstances = {\r\n            SAMPLES: this.samples,\r\n            DIAGNOSIS: this.diagnosis,\r\n            MOLECULES: this.molecules,\r\n            LABORATORY: this.laboratory\r\n        };\r\n        this.myBot = new _game_bot__WEBPACK_IMPORTED_MODULE_1__[\"Bot\"]();\r\n        this.enemyBot = new _game_bot__WEBPACK_IMPORTED_MODULE_1__[\"Bot\"]();\r\n        this.ia = new _ai_basic_ia__WEBPACK_IMPORTED_MODULE_0__[\"BasicIA\"](this);\r\n        this.laboratory.initProject();\r\n    }\r\n    bootstrap() {\r\n        while (true) {\r\n            this.myBot.update();\r\n            this.enemyBot.update();\r\n            this.molecules.updateMolecules();\r\n            this.diagnosis.updateSampleDatas();\r\n            this.save();\r\n            this.ia.simulate(this.myBot).output();\r\n        }\r\n    }\r\n    save() {\r\n        this.myBot.save();\r\n        this.enemyBot.save();\r\n        this.molecules.save();\r\n        this.diagnosis.save();\r\n    }\r\n    load() {\r\n        this.myBot.load();\r\n        this.enemyBot.load();\r\n        this.molecules.load();\r\n        this.diagnosis.load();\r\n    }\r\n}\r\n\n\n//# sourceURL=webpack:///./ts/game-state.js?");

/***/ }),

/***/ "./ts/game/bot.js":
/*!************************!*\
  !*** ./ts/game/bot.js ***!
  \************************/
/*! exports provided: Bot */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"Bot\", function() { return Bot; });\n/* harmony import */ var _storage__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./storage */ \"./ts/game/storage.js\");\n\r\nclass Bot {\r\n    constructor() {\r\n        this.sampleDatas = [];\r\n        this.cached = [];\r\n    }\r\n    get storageCount() {\r\n        return this.storage.count;\r\n    }\r\n    get expertiseCount() {\r\n        return this.expertise.count;\r\n    }\r\n    update() {\r\n        const inputs = readline().split(' ');\r\n        this.sampleDatas = [];\r\n        this.module = inputs[0];\r\n        this.eta = parseInt(inputs[1], 10);\r\n        this.score = parseInt(inputs[2], 10);\r\n        this.storage = new _storage__WEBPACK_IMPORTED_MODULE_0__[\"Storage\"](parseInt(inputs[3], 10), parseInt(inputs[4], 10), parseInt(inputs[5], 10), parseInt(inputs[6], 10), parseInt(inputs[7], 10));\r\n        this.expertise = new _storage__WEBPACK_IMPORTED_MODULE_0__[\"Storage\"](parseInt(inputs[8], 10), parseInt(inputs[9], 10), parseInt(inputs[10], 10), parseInt(inputs[11], 10), parseInt(inputs[12], 10));\r\n    }\r\n    save() {\r\n        this.cached[0] = this.eta;\r\n        this.cached[1] = this.sampleDatas.slice(0);\r\n        this.cached[1].forEach((x) => x.save());\r\n        this.cached[2] = this.module;\r\n        this.cached[3] = this.score;\r\n        this.cached[4] = this.storage;\r\n        this.cached[4].save();\r\n        this.cached[5] = this.expertise;\r\n        this.cached[5].save();\r\n    }\r\n    load() {\r\n        this.eta = this.cached[0];\r\n        this.sampleDatas = this.cached[1].slice(0);\r\n        this.sampleDatas.forEach((x) => x.load());\r\n        this.module = this.cached[2];\r\n        this.score = this.cached[3];\r\n        this.storage = this.cached[4];\r\n        this.storage.load();\r\n        this.expertise = this.cached[5];\r\n        this.expertise.load();\r\n    }\r\n    push(sampleData) {\r\n        this.sampleDatas.push(sampleData);\r\n    }\r\n}\r\n\n\n//# sourceURL=webpack:///./ts/game/bot.js?");

/***/ }),

/***/ "./ts/game/diagnosis-module.js":
/*!*************************************!*\
  !*** ./ts/game/diagnosis-module.js ***!
  \*************************************/
/*! exports provided: DiagnosisModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"DiagnosisModule\", function() { return DiagnosisModule; });\n/* harmony import */ var _sample_data__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./sample-data */ \"./ts/game/sample-data.js\");\n\r\nclass DiagnosisModule {\r\n    constructor(_gameState) {\r\n        this._gameState = _gameState;\r\n        this._sampleDatas = [];\r\n        this._cached = [];\r\n    }\r\n    updateSampleDatas() {\r\n        this._sampleDatas = [];\r\n        const sampleCount = parseInt(readline(), 10);\r\n        for (let i = 0; i < sampleCount; i++) {\r\n            const sampleData = new _sample_data__WEBPACK_IMPORTED_MODULE_0__[\"SampleData\"]();\r\n            if (sampleData.carriedBy === -1) {\r\n                this._sampleDatas.push(sampleData);\r\n            }\r\n            else {\r\n                [this._gameState.myBot, this._gameState.enemyBot][sampleData.carriedBy].push(sampleData);\r\n            }\r\n        }\r\n        this._sampleDatas = this._sampleDatas.sort((a, b) => {\r\n            return b.health - a.health;\r\n        });\r\n    }\r\n    save() {\r\n        this._cached[0] = this._sampleDatas.slice(0);\r\n        this._cached[0].forEach((x) => x.save());\r\n    }\r\n    load() {\r\n        this._sampleDatas = this._cached[0].slice(0);\r\n        this._sampleDatas.forEach((x) => x.load());\r\n    }\r\n    canFullyCompleteTwo(bot) {\r\n        return this._sampleDatas.filter((sampleData) => bot.expertise.canBuy(sampleData.cost)).length > 2;\r\n    }\r\n}\r\n\n\n//# sourceURL=webpack:///./ts/game/diagnosis-module.js?");

/***/ }),

/***/ "./ts/game/laboratory-module.js":
/*!**************************************!*\
  !*** ./ts/game/laboratory-module.js ***!
  \**************************************/
/*! exports provided: LaboratoryModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"LaboratoryModule\", function() { return LaboratoryModule; });\n/* harmony import */ var _project__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./project */ \"./ts/game/project.js\");\n\r\nclass LaboratoryModule {\r\n    constructor(_gameState) {\r\n        this._gameState = _gameState;\r\n        this.Projects = [];\r\n    }\r\n    initProject() {\r\n        const projectCount = parseInt(readline(), 10);\r\n        for (let i = 0; i < projectCount; i++) {\r\n            this.Projects.push(new _project__WEBPACK_IMPORTED_MODULE_0__[\"Project\"]());\r\n        }\r\n    }\r\n    canConnect(bot, sampleData) {\r\n        return bot.storage.add(bot.expertise).canBuy(sampleData.cost);\r\n    }\r\n}\r\n\n\n//# sourceURL=webpack:///./ts/game/laboratory-module.js?");

/***/ }),

/***/ "./ts/game/module-type.js":
/*!********************************!*\
  !*** ./ts/game/module-type.js ***!
  \********************************/
/*! exports provided: ModuleType */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"ModuleType\", function() { return ModuleType; });\nvar ModuleType;\r\n(function (ModuleType) {\r\n    ModuleType[\"SAMPLES\"] = \"SAMPLES\";\r\n    ModuleType[\"DIAGNOSIS\"] = \"DIAGNOSIS\";\r\n    ModuleType[\"MOLECULES\"] = \"MOLECULES\";\r\n    ModuleType[\"LABORATORY\"] = \"LABORATORY\";\r\n    ModuleType[\"START_POS\"] = \"START_POS\";\r\n    ModuleType[\"EMPTY\"] = \"EMPTY\";\r\n})(ModuleType || (ModuleType = {}));\r\n\n\n//# sourceURL=webpack:///./ts/game/module-type.js?");

/***/ }),

/***/ "./ts/game/molecule-type.js":
/*!**********************************!*\
  !*** ./ts/game/molecule-type.js ***!
  \**********************************/
/*! exports provided: MoleculeType, MoleculesIterator */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"MoleculeType\", function() { return MoleculeType; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"MoleculesIterator\", function() { return MoleculesIterator; });\nvar MoleculeType;\r\n(function (MoleculeType) {\r\n    MoleculeType[\"A\"] = \"A\";\r\n    MoleculeType[\"B\"] = \"B\";\r\n    MoleculeType[\"C\"] = \"C\";\r\n    MoleculeType[\"D\"] = \"D\";\r\n    MoleculeType[\"E\"] = \"E\";\r\n})(MoleculeType || (MoleculeType = {}));\r\nclass MoleculeTypeIterator {\r\n    constructor() {\r\n        this[Symbol.iterator] = function* () {\r\n            yield 'A';\r\n            yield 'B';\r\n            yield 'C';\r\n            yield 'D';\r\n            yield 'E';\r\n        };\r\n    }\r\n}\r\nconst MoleculesIterator = new MoleculeTypeIterator();\r\n\n\n//# sourceURL=webpack:///./ts/game/molecule-type.js?");

/***/ }),

/***/ "./ts/game/molecules-module.js":
/*!*************************************!*\
  !*** ./ts/game/molecules-module.js ***!
  \*************************************/
/*! exports provided: MoleculesModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"MoleculesModule\", function() { return MoleculesModule; });\n/* harmony import */ var _module_type__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./module-type */ \"./ts/game/module-type.js\");\n/* harmony import */ var _molecule_type__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./molecule-type */ \"./ts/game/molecule-type.js\");\n/* harmony import */ var _storage__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./storage */ \"./ts/game/storage.js\");\n\r\n\r\n\r\nclass MoleculesModule {\r\n    constructor(_gameState) {\r\n        this._gameState = _gameState;\r\n        this.moleculeAvailable = new _storage__WEBPACK_IMPORTED_MODULE_2__[\"Storage\"](5, 5, 5, 5, 5);\r\n        this._cached = [];\r\n    }\r\n    updateMolecules() {\r\n        const inputs = readline().split(' ');\r\n        this.moleculeAvailable = new _storage__WEBPACK_IMPORTED_MODULE_2__[\"Storage\"](parseInt(inputs[0], 10), parseInt(inputs[1], 10), parseInt(inputs[2], 10), parseInt(inputs[3], 10), parseInt(inputs[4], 10));\r\n    }\r\n    save() {\r\n        this._cached[0] = this.moleculeAvailable;\r\n        this._cached[0].save();\r\n    }\r\n    load() {\r\n        this.moleculeAvailable = this._cached[0];\r\n        this.moleculeAvailable.load();\r\n    }\r\n    consume(bot, target) {\r\n        const molecule = target.cost.sub(bot.storage.add(bot.expertise));\r\n        for (const type of _molecule_type__WEBPACK_IMPORTED_MODULE_1__[\"MoleculesIterator\"]) {\r\n            if (molecule[type] > 0 && this._gameState.modulesInstances[_module_type__WEBPACK_IMPORTED_MODULE_0__[\"ModuleType\"].MOLECULES].moleculeAvailable[type] > 0) {\r\n                return type;\r\n            }\r\n        }\r\n        return -1;\r\n    }\r\n}\r\n\n\n//# sourceURL=webpack:///./ts/game/molecules-module.js?");

/***/ }),

/***/ "./ts/game/project.js":
/*!****************************!*\
  !*** ./ts/game/project.js ***!
  \****************************/
/*! exports provided: Project */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"Project\", function() { return Project; });\n/* harmony import */ var _storage__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./storage */ \"./ts/game/storage.js\");\n\r\nclass Project {\r\n    constructor() {\r\n        this.update();\r\n    }\r\n    update() {\r\n        const inputs = readline().split(' ');\r\n        this._molecules = new _storage__WEBPACK_IMPORTED_MODULE_0__[\"Storage\"](parseInt(inputs[0], 10), parseInt(inputs[1], 10), parseInt(inputs[2], 10), parseInt(inputs[3], 10), parseInt(inputs[4], 10));\r\n    }\r\n}\r\n\n\n//# sourceURL=webpack:///./ts/game/project.js?");

/***/ }),

/***/ "./ts/game/sample-data.js":
/*!********************************!*\
  !*** ./ts/game/sample-data.js ***!
  \********************************/
/*! exports provided: SampleData */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"SampleData\", function() { return SampleData; });\n/* harmony import */ var _storage__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./storage */ \"./ts/game/storage.js\");\n\r\nclass SampleData {\r\n    constructor() {\r\n        this.cached = [];\r\n        this.update();\r\n    }\r\n    get costCount() {\r\n        return this.cost.count;\r\n    }\r\n    update() {\r\n        const inputs = readline().split(' ');\r\n        this.sampleId = parseInt(inputs[0], 10);\r\n        this.carriedBy = parseInt(inputs[1], 10);\r\n        this.rank = parseInt(inputs[2], 10);\r\n        this.expertiseGain = inputs[3];\r\n        this.health = parseInt(inputs[4], 10);\r\n        this.cost = new _storage__WEBPACK_IMPORTED_MODULE_0__[\"Storage\"](parseInt(inputs[5], 10), parseInt(inputs[6], 10), parseInt(inputs[7], 10), parseInt(inputs[8], 10), parseInt(inputs[9], 10));\r\n    }\r\n    save() {\r\n        this.cached[0] = this.sampleId;\r\n        this.cached[1] = this.carriedBy;\r\n        this.cached[2] = this.rank;\r\n        this.cached[3] = this.expertiseGain;\r\n        this.cached[4] = this.health;\r\n        this.cached[5] = this.cost;\r\n    }\r\n    load() {\r\n        this.sampleId = this.cached[0];\r\n        this.carriedBy = this.cached[1];\r\n        this.rank = this.cached[2];\r\n        this.expertiseGain = this.cached[3];\r\n        this.health = this.cached[4];\r\n        this.cost = this.cached[5];\r\n    }\r\n}\r\n\n\n//# sourceURL=webpack:///./ts/game/sample-data.js?");

/***/ }),

/***/ "./ts/game/samples-module.js":
/*!***********************************!*\
  !*** ./ts/game/samples-module.js ***!
  \***********************************/
/*! exports provided: SamplesModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"SamplesModule\", function() { return SamplesModule; });\nclass SamplesModule {\r\n    constructor(_gameState) {\r\n        this._gameState = _gameState;\r\n    }\r\n}\r\n\n\n//# sourceURL=webpack:///./ts/game/samples-module.js?");

/***/ }),

/***/ "./ts/game/storage.js":
/*!****************************!*\
  !*** ./ts/game/storage.js ***!
  \****************************/
/*! exports provided: Storage */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"Storage\", function() { return Storage; });\nclass Storage {\r\n    constructor(A = 0, B = 0, C = 0, D = 0, E = 0) {\r\n        this.A = A;\r\n        this.B = B;\r\n        this.C = C;\r\n        this.D = D;\r\n        this.E = E;\r\n        this.cached = [];\r\n        this[Symbol.iterator] = () => {\r\n            let index = 0;\r\n            return {\r\n                next: () => {\r\n                    switch (index) {\r\n                        case 0:\r\n                            index++;\r\n                            return {\r\n                                value: this.A,\r\n                                done: false\r\n                            };\r\n                        case 1:\r\n                            index++;\r\n                            return {\r\n                                value: this.B,\r\n                                done: false\r\n                            };\r\n                        case 2:\r\n                            index++;\r\n                            return {\r\n                                value: this.C,\r\n                                done: false\r\n                            };\r\n                        case 3:\r\n                            index++;\r\n                            return {\r\n                                value: this.D,\r\n                                done: false\r\n                            };\r\n                        case 4:\r\n                            index++;\r\n                            return {\r\n                                value: this.E,\r\n                                done: false\r\n                            };\r\n                        default:\r\n                            return {\r\n                                value: undefined,\r\n                                done: true\r\n                            };\r\n                    }\r\n                }\r\n            };\r\n        };\r\n    }\r\n    get count() {\r\n        return this.A + this.B + this.C + this.D + this.E;\r\n    }\r\n    save() {\r\n        this.cached[0] = this.A;\r\n        this.cached[1] = this.B;\r\n        this.cached[2] = this.C;\r\n        this.cached[3] = this.D;\r\n        this.cached[4] = this.E;\r\n    }\r\n    load() {\r\n        this.A = this.cached[0];\r\n        this.B = this.cached[1];\r\n        this.C = this.cached[2];\r\n        this.D = this.cached[3];\r\n        this.E = this.cached[4];\r\n    }\r\n    canBuy(store) {\r\n        return this.A >= store.A\r\n            && this.B >= store.B\r\n            && this.C >= store.C\r\n            && this.D >= store.D\r\n            && this.E >= store.E;\r\n    }\r\n    add(store) {\r\n        return new Storage(this.A + store.A, this.B + store.B, this.C + store.C, this.D + store.D, this.E + store.E);\r\n    }\r\n    sub(store) {\r\n        return new Storage(Math.max(0, this.A - store.A), Math.max(0, this.B - store.B), Math.max(0, this.C - store.C), Math.max(0, this.D - store.D), Math.max(0, this.E - store.E));\r\n    }\r\n}\r\n\n\n//# sourceURL=webpack:///./ts/game/storage.js?");

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