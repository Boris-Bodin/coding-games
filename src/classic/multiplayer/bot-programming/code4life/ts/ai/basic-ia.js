import { Action } from '../action';
import { ModuleType } from '../game/module-type';
import { MoleculesIterator } from '../game/molecule-type';
export class BasicIA {
    constructor(_gameState) {
        this._gameState = _gameState;
        this._rankAims = [3, 3, 3, 3, 4, 4, 4, 4, 5, 5, 5, 5, 6, 6, 6, 7, 7, 7, 8, 8, 8, 9];
    }
    simulate(bot) {
        if (bot.module === ModuleType.START_POS) {
            return this.goTo(bot, ModuleType.SAMPLES);
        }
        const action = this.Process(bot);
        if (action === null) {
            return Action.wait();
        }
        switch (action) {
            case ModuleType.SAMPLES:
                return this.goToSamples(bot);
            case ModuleType.DIAGNOSIS:
                return this.goToDiagnosis(bot);
            case ModuleType.MOLECULES:
                return this.goToMolecules(bot);
            case ModuleType.LABORATORY:
                return this.goToLaboratory(bot);
            case ModuleType.EMPTY:
                return Action.goTo(action);
            default:
                return this.connect(action);
        }
    }
    goTo(bot, module) {
        bot.module = module;
        return Action.goTo(module);
    }
    goToSamples(bot) {
        if (bot.sampleDatas.length < 3) {
            if (this._gameState.modulesInstances[ModuleType.DIAGNOSIS].canFullyCompleteTwo(bot)) {
                return this.goToDiagnosis(bot);
            }
            else {
                return this.goTo(bot, ModuleType.SAMPLES);
            }
        }
        else {
            return this.goToDiagnosis(bot);
        }
    }
    goToDiagnosis(bot) {
        if (bot.sampleDatas.length < 3 && this._gameState.modulesInstances[ModuleType.DIAGNOSIS].canFullyCompleteTwo(bot)) {
            return this.goTo(bot, ModuleType.DIAGNOSIS);
        }
        if (bot.sampleDatas.length === 0) {
            return this.goToSamples(bot);
        }
        return this.goTo(bot, ModuleType.DIAGNOSIS);
    }
    goToMolecules(bot) {
        if (bot.storageCount < 10) {
            return this.goTo(bot, ModuleType.MOLECULES);
        }
        else {
            return this.goToLaboratory(bot);
        }
    }
    goToLaboratory(bot) {
        if (bot.sampleDatas.some((sampleData) => this._gameState.modulesInstances[ModuleType.LABORATORY].canConnect(bot, sampleData))) {
            return this.goTo(bot, ModuleType.LABORATORY);
        }
        else {
            return this.goToSamples(bot);
        }
    }
    connect(id) {
        return Action.connect(id);
    }
    Process(bot) {
        if (bot.eta > 0) {
            return ModuleType.EMPTY;
        }
        switch (bot.module) {
            case ModuleType.SAMPLES:
                return this.ProcessSamples(bot);
            case ModuleType.DIAGNOSIS:
                return this.ProcessDiagnosis(bot);
            case ModuleType.MOLECULES:
                return this.ProcessMolecules(bot);
            case ModuleType.LABORATORY:
                return this.ProcessLaboratory(bot);
        }
    }
    ProcessSamples(bot) {
        if (bot.eta > 0) {
            return ModuleType.SAMPLES;
        }
        const rankAim = this._rankAims[Math.min(bot.expertiseCount, this._rankAims.length - 1)];
        let rank = 0;
        for (const sampleData of bot.sampleDatas) {
            rank += sampleData.rank;
        }
        if (bot.sampleDatas.length < 3 && rank < rankAim) {
            return Math.ceil((rankAim - rank) / (3 - bot.sampleDatas.length));
        }
        return ModuleType.DIAGNOSIS;
    }
    ProcessDiagnosis(bot) {
        if (bot.eta > 0) {
            return ModuleType.DIAGNOSIS;
        }
        for (const sampleData of bot.sampleDatas) {
            if (sampleData.cost.A === -1) {
                return sampleData.sampleId;
            }
        }
        this._gameState.load();
        this.play(bot);
        if (bot.sampleDatas.length > 0) {
            return bot.sampleDatas[0].sampleId;
        }
        else {
            if (bot.sampleDatas.length < 3) {
                for (const sampleData of bot.sampleDatas) {
                    this._gameState.load();
                    bot.sampleDatas.push(sampleData);
                    this.play(bot);
                    if (bot.sampleDatas.length === 0) {
                        return sampleData.sampleId;
                    }
                }
            }
        }
        this._gameState.load();
        if (bot.sampleDatas.length > 0) {
            return ModuleType.MOLECULES;
        }
        else {
            return ModuleType.SAMPLES;
        }
    }
    ProcessMolecules(bot) {
        if (bot.eta > 0) {
            return ModuleType.MOLECULES;
        }
        this._gameState.load();
        if (bot.storageCount < 10) {
            let sampleDatas = bot.sampleDatas.slice(0);
            for (const sampleData of sampleDatas) {
                if (this._gameState.modulesInstances[ModuleType.LABORATORY].canConnect(bot, sampleData)) {
                    bot.storage = bot.storage.sub(sampleData.cost.sub(bot.expertise));
                    bot.expertise[sampleData.expertiseGain]++;
                    bot.sampleDatas.splice(bot.sampleDatas.indexOf(sampleData), 1);
                }
            }
            sampleDatas = bot.sampleDatas.slice(0);
            for (const sampleData of sampleDatas) {
                if (this._gameState.modulesInstances[ModuleType.LABORATORY].canConnect(bot, sampleData)) {
                    bot.storage = bot.storage.sub(sampleData.cost.sub(bot.expertise));
                    bot.expertise[sampleData.expertiseGain]++;
                    bot.sampleDatas.splice(bot.sampleDatas.indexOf(sampleData), 1);
                }
            }
            if (bot.sampleDatas.length > 0) {
                for (const sampleData of bot.sampleDatas) {
                    const type = (this._gameState.modulesInstances[ModuleType.MOLECULES].consume(bot, sampleData));
                    if (type !== -1) {
                        return type;
                    }
                }
            }
        }
        this._gameState.load();
        return ModuleType.LABORATORY;
    }
    ProcessLaboratory(bot) {
        if (bot.eta > 0) {
            return ModuleType.LABORATORY;
        }
        for (const sampleData of bot.sampleDatas) {
            if (this._gameState.modulesInstances[ModuleType.LABORATORY].canConnect(bot, sampleData)) {
                return sampleData.sampleId;
            }
        }
        if (bot.sampleDatas.length > 1) {
            this._gameState.load();
            const size = bot.sampleDatas.length;
            this.play(bot);
            if (bot.sampleDatas.length < size) {
                return ModuleType.MOLECULES;
            }
        }
        return ModuleType.SAMPLES;
    }
    play(bot) {
        const sampleDatas = bot.sampleDatas.slice(0);
        for (let i = 0; i < sampleDatas.length; i++) {
            const sampleData = sampleDatas[0];
            if (bot.storage.add(bot.expertise).canBuy(sampleData.cost)) {
                bot.expertise[sampleData.expertiseGain]++;
                bot.storage = bot.storage.sub(sampleData.cost.sub(bot.expertise));
                bot.sampleDatas.splice(bot.sampleDatas.indexOf(sampleData), 1);
                this._gameState.modulesInstances[ModuleType.MOLECULES].moleculeAvailable =
                    this._gameState.modulesInstances[ModuleType.MOLECULES].moleculeAvailable.add(sampleData.cost);
            }
            else {
                const remain = sampleData.cost.sub(bot.expertise.add(bot.storage));
                for (const type of MoleculesIterator) {
                    const available = this._gameState.modulesInstances[ModuleType.MOLECULES].moleculeAvailable[type];
                    const willTake = Math.min(10 - bot.storageCount, Math.min(available, remain[type]));
                    bot.storage[type] += willTake;
                    this._gameState.modulesInstances[ModuleType.MOLECULES].moleculeAvailable[type] -= willTake;
                }
                if (bot.storage.add(bot.expertise).canBuy(sampleData.cost)) {
                    bot.expertise[sampleData.expertiseGain]++;
                    bot.storage = bot.storage.sub(sampleData.cost.sub(bot.expertise));
                    bot.sampleDatas.splice(bot.sampleDatas.indexOf(sampleData), 1);
                    this._gameState.modulesInstances[ModuleType.MOLECULES].moleculeAvailable =
                        this._gameState.modulesInstances[ModuleType.MOLECULES].moleculeAvailable.add(sampleData.cost);
                }
            }
        }
        return true;
    }
}
