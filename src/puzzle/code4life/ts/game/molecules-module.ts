import { GameState } from '../game-state';
import { Bot } from './bot';
import { ModuleType } from './module-type';
import { MoleculesIterator } from './molecule-type';
import { SampleData } from './sample-data';
import { Storage } from './storage';

export class MoleculesModule {
    public moleculeAvailable: Storage = new Storage(5, 5, 5, 5, 5);
    private _cached: Array<any> = [];

    constructor(private _gameState: GameState) {

    }

    updateMolecules() {
        const inputs = readline().split(' ');
        this.moleculeAvailable = new Storage(
            parseInt(inputs[0], 10),
            parseInt(inputs[1], 10),
            parseInt(inputs[2], 10),
            parseInt(inputs[3], 10),
            parseInt(inputs[4], 10)
        );
    }

    public save() {
        this._cached[0] = this.moleculeAvailable;
        this._cached[0].save();
    }

    public load() {
        this.moleculeAvailable = this._cached[0];
        this.moleculeAvailable.load();
    }

    public consume(bot: Bot, target: SampleData) {
        const molecule = target.cost.sub(bot.storage.add(bot.expertise));
        for (const type of MoleculesIterator) {
            if (molecule[type] > 0 && this._gameState.modulesInstances[ModuleType.MOLECULES].moleculeAvailable[type] > 0) {
                return type;
            }
        }
        return -1;
    }
}
