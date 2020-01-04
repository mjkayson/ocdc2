import { DefensiveFormation } from './Formation.cls';
import * as Player from '../Player/Player.cls';



export class DefensiveFormtion_62 extends DefensiveFormation {
    public name:string = '6-3'; 
    downLinemen = 6;
    
    public blitzers = [
        new Player.MikeLinebacker(),
        new Player.SamLinebacker(),
        new Player.WillLinebacker(),
        new Player.Cornerback(),
        new Player.StrongSafety()
    ];
}


export class DefensiveFormtion_34 extends DefensiveFormation {
    public name:string = '3-4'; 
    downLinemen = 3;

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
    downLinemen = 4;
    
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

export class DefensiveFormtion_42 extends DefensiveFormation {
    public name:string = '4-2'; 
    downLinemen = 4;
    
    public blitzers = [
        new Player.SamLinebacker(),
        new Player.WillLinebacker(),
        new Player.Cornerback(),
        new Player.Cornerback(),
        new Player.Nickelback(),
        new Player.StrongSafety(),
        new Player.FreeSafety()
    ];
}

export class DefensiveFormtion_33 extends DefensiveFormation {
    public name:string = '3-3'; 
    downLinemen = 3;
    
    public blitzers = [
        new Player.MikeLinebacker(),
        new Player.SamLinebacker(),
        new Player.WillLinebacker(),
        new Player.Cornerback(),
        new Player.Cornerback(),
        new Player.Nickelback(),
        new Player.StrongSafety(),
        new Player.FreeSafety()
    ];
}

export class DefensiveFormtion_53 extends DefensiveFormation {
    public name:string = '5-3'; 
    downLinemen = 5;
    
    public blitzers = [
        new Player.MikeLinebacker(),
        new Player.SamLinebacker(),
        new Player.WillLinebacker(),
        new Player.Cornerback(),
        new Player.StrongSafety(),
        new Player.FreeSafety()
    ];
}


