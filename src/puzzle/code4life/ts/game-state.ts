import { BasicIA } from './ai/basic-ia';
import { IAInterface } from './ai/ia-interface';
import { Bot } from './game/bot';
import { DiagnosisModule } from './game/diagnosis-module';
import { LaboratoryModule } from './game/laboratory-module';
import { MoleculesModule } from './game/molecules-module';
import { SamplesModule } from './game/samples-module';

export class GameState {
    private readonly molecules: MoleculesModule;
    private readonly diagnosis: DiagnosisModule;
    private readonly samples: SamplesModule;
    private readonly laboratory: LaboratoryModule;

    private ia: IAInterface;

    public myBot: Bot;
    public enemyBot: Bot;

    public modulesInstances: {
        SAMPLES: SamplesModule;
        DIAGNOSIS: DiagnosisModule;
        MOLECULES: MoleculesModule;
        LABORATORY: LaboratoryModule
    };

    constructor() {
        this.samples = new SamplesModule(this);
        this.diagnosis = new DiagnosisModule(this);
        this.molecules = new MoleculesModule(this);
        this.laboratory = new LaboratoryModule(this);

        this.modulesInstances = {
            SAMPLES: this.samples,
            DIAGNOSIS: this.diagnosis,
            MOLECULES: this.molecules,
            LABORATORY: this.laboratory
        };

        this.myBot = new Bot();
        this.enemyBot = new Bot();

        this.ia = new BasicIA(this);

        this.laboratory.initProject();
    }

    public bootstrap() {
        while (true) {

            this.myBot.update();
            this.enemyBot.update();

            this.molecules.updateMolecules();
            this.diagnosis.updateSampleDatas();
            this.save();

            this.ia.simulate(this.myBot).output();
        }
    }

    private save() {
        this.myBot.save();
        this.enemyBot.save();

        this.molecules.save();
        this.diagnosis.save();
    }

    public load() {
        this.myBot.load();
        this.enemyBot.load();

        this.molecules.load();
        this.diagnosis.load();
    }
}
