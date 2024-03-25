import { GameState } from '../game-state';
import { Bot } from './bot';
import { Project } from './project';
import { SampleData } from './sample-data';

export class LaboratoryModule {
    public Projects: any[] = [];

    constructor(private _gameState: GameState) {

    }

    initProject() {
        const projectCount = parseInt(readline(), 10);
        for (let i = 0; i < projectCount; i++) {
            this.Projects.push(new Project());
        }
    }

    public canConnect(bot: Bot, sampleData: SampleData) {
        return bot.storage.add(bot.expertise).canBuy(sampleData.cost);
    }
}
