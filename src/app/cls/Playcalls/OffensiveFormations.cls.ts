import { OffensiveFormation } from './Formation.cls';
import * as Player from '../Player/Player.cls';

export class Pro extends OffensiveFormation {
  public name:string = 'Pro';

  eligibleReceivers:any = [
    new Player.SplitEnd(),
    new Player.Flanker(),
    new Player.TightEnd(),
    new Player.Halfback(),
    new Player.Fullback()
  ];

}

export class Single extends OffensiveFormation {
  public name:string = 'Single';
  
  eligibleReceivers:any = [
    new Player.SplitEnd(),
    new Player.Flanker(),
    new Player.Slot(),
    new Player.TightEnd(),
    new Player.Tailback()
  ];
}

export class Slot extends OffensiveFormation {
  public name:string = 'Slot';
    
  eligibleReceivers:any = [
    new Player.SplitEnd(),
    new Player.Flanker(),
    new Player.Slot(),
    new Player.TightEnd(),
    new Player.Halfback()
  ];
}

export class Twin extends OffensiveFormation {
  public name:string = 'Twin';
  
  eligibleReceivers:any = [
    new Player.SplitEnd(),
    new Player.Flanker(),
    new Player.TightEnd(),
    new Player.Halfback(),
    new Player.Fullback()
  ];
}

export class Bunch extends OffensiveFormation {
  public name:string = 'Bunch';
    
  eligibleReceivers:any = [
    new Player.SplitEnd(),
    new Player.Flanker(),
    new Player.Slot(),
    new Player.TightEnd(),
    new Player.Halfback()
  ];
}

export class Heavy extends OffensiveFormation {
  public name:string = 'Heavy';
    
  eligibleReceivers:any = [
    new Player.TightEnd(),
    new Player.Flanker(),
    new Player.TightEnd(),
    new Player.Fullback(),
    new Player.Tailback()
  ];
}

export class Spread extends OffensiveFormation {
  public name:string = 'Spread';
    
  eligibleReceivers:any = [
    new Player.SplitEnd(),
    new Player.Flanker(),
    new Player.Slot(),
    new Player.Slot2(),
    new Player.Tailback()
  ];
}

export class Empty extends OffensiveFormation {
  public name:string = 'Empty';
      
  eligibleReceivers:any = [
    new Player.SplitEnd(),
    new Player.Flanker(),
    new Player.Slot(),
    new Player.Slot2(),
    new Player.TightEnd()
  ];
}


