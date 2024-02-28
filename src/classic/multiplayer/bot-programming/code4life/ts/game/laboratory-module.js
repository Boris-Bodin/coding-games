import { Project } from './project';
export class LaboratoryModule {
    constructor(_gameState) {
        this._gameState = _gameState;
        this.Projects = [];
    }
    initProject() {
        const projectCount = parseInt(readline(), 10);
        for (let i = 0; i < projectCount; i++) {
            this.Projects.push(new Project());
        }
    }
    canConnect(bot, sampleData) {
        return bot.storage.add(bot.expertise).canBuy(sampleData.cost);
    }
}
