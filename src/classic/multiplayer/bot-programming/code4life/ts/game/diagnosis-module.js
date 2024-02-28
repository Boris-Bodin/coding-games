import { SampleData } from './sample-data';
export class DiagnosisModule {
    constructor(_gameState) {
        this._gameState = _gameState;
        this._sampleDatas = [];
        this._cached = [];
    }
    updateSampleDatas() {
        this._sampleDatas = [];
        const sampleCount = parseInt(readline(), 10);
        for (let i = 0; i < sampleCount; i++) {
            const sampleData = new SampleData();
            if (sampleData.carriedBy === -1) {
                this._sampleDatas.push(sampleData);
            }
            else {
                [this._gameState.myBot, this._gameState.enemyBot][sampleData.carriedBy].push(sampleData);
            }
        }
        this._sampleDatas = this._sampleDatas.sort((a, b) => {
            return b.health - a.health;
        });
    }
    save() {
        this._cached[0] = this._sampleDatas.slice(0);
        this._cached[0].forEach((x) => x.save());
    }
    load() {
        this._sampleDatas = this._cached[0].slice(0);
        this._sampleDatas.forEach((x) => x.load());
    }
    canFullyCompleteTwo(bot) {
        return this._sampleDatas.filter((sampleData) => bot.expertise.canBuy(sampleData.cost)).length > 2;
    }
}
