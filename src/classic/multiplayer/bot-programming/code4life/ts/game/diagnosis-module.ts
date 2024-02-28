import { GameState } from '../game-state';
import { Bot } from './bot';
import { SampleData } from './sample-data';

export class DiagnosisModule {
    private _sampleDatas: SampleData[] = [];
    private _cached: Array<any> = [];

    constructor(private _gameState: GameState) {

    }

    updateSampleDatas() {
        this._sampleDatas = [];
        const sampleCount = parseInt(readline(), 10);
        for (let i = 0; i < sampleCount; i++) {
            const sampleData: SampleData = new SampleData();
            if (sampleData.carriedBy === -1) {
                this._sampleDatas.push(sampleData);
            } else {
                [this._gameState.myBot, this._gameState.enemyBot][sampleData.carriedBy].push(sampleData);
            }
        }

        this._sampleDatas = this._sampleDatas.sort((a, b) => {
            return b.health - a.health;
        });
    }

    public save() {
        this._cached[0] = this._sampleDatas.slice(0);
        this._cached[0].forEach((x: SampleData) => x.save());
    }

    public load() {
        this._sampleDatas = this._cached[0].slice(0);
        this._sampleDatas.forEach((x: SampleData) => x.load());
    }

    public canFullyCompleteTwo(bot: Bot) {
        return this._sampleDatas.filter((sampleData: SampleData) => bot.expertise.canBuy(sampleData.cost)).length > 2;
    }
}
