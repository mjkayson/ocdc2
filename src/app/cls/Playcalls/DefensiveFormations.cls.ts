import { DefensiveFormation } from './Formation.cls';
import * as Player from '../Player/Player.cls';

export class DefensiveFormtion_34 extends DefensiveFormation {
    public name:string = '3-4'; 
    public blitzers = [
        new Player.MikeLinebacker(),
        new Player.SamLinebacker(),
        new Player.WillLinebacker(),
        new Player.BuckLinebacker(),
        new Player.Cornerback(),
        new Player.Cornerback(),
        new Player.StrongSafety(),
        new Player.FreeSafety()
    ];
}

export class DefensiveFormtion_43 extends DefensiveFormation {
    public name:string = '4-3'; 
    public blitzers = [
        new Player.MikeLinebacker(),
        new Player.SamLinebacker(),
        new Player.WillLinebacker(),
        new Player.Cornerback(),
        new Player.Cornerback(),
        new Player.StrongSafety(),
        new Player.FreeSafety()
    ];
}

