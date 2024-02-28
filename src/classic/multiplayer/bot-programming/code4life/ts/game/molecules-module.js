import { ModuleType } from './module-type';
import { MoleculesIterator } from './molecule-type';
import { Storage } from './storage';
export class MoleculesModule {
    constructor(_gameState) {
        this._gameState = _gameState;
        this.moleculeAvailable = new Storage(5, 5, 5, 5, 5);
        this._cached = [];
    }
    updateMolecules() {
        const inputs = readline().split(' ');
        this.moleculeAvailable = new Storage(parseInt(inputs[0], 10), parseInt(inputs[1], 10), parseInt(inputs[2], 10), parseInt(inputs[3], 10), parseInt(inputs[4], 10));
    }
    save() {
        this._cached[0] = this.moleculeAvailable;
        this._cached[0].save();
    }
    load() {
        this.moleculeAvailable = this._cached[0];
        this.moleculeAvailable.load();
    }
    consume(bot, target) {
        const molecule = target.cost.sub(bot.storage.add(bot.expertise));
        for (const type of MoleculesIterator) {
            if (molecule[type] > 0 && this._gameState.modulesInstances[ModuleType.MOLECULES].moleculeAvailable[type] > 0) {
                return type;
            }
        }
        return -1;
    }
}
