import { Action } from '../action';
import { Bot } from '../game/bot';


export interface IAInterface {

    simulate(bot: Bot): Action;

}
