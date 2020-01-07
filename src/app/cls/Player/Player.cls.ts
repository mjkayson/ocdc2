
export class Player {

  public letter:string;
  public type:string;
  x:number = 0;
  y:number = 0;
  assignment;

  setAssignment(assignment){
    this.assignment = assignment;
  }

  hasAssignment(){
    return this.assignment != null;
  }

  getAssignment(){
    return this.assignment;
  }

}

export class DefensivePlayer extends Player {
  x = 0;
  y = -6;
  
}

export class DLine extends DefensivePlayer {

  constructor(data){
    super();
    this.setAlignment(data);
  }

  setAlignment(data){
    switch(data.a){
      case 1: this.x = 3; break;
      case 2: this.x = 8; break;
      case 3: this.x = 10; break;
      case 4: this.x = 14; break;
      case 5: this.x = 16; break;
      case 6: this.x = 20; break;
      case 7: this.x = 18; break;
      case 9: this.x = 22; break;
    }
    if(data.shade) this.x -= 2;
    if(data.weak) this.x *= -1;
  }
}

export class MikeLinebacker extends DefensivePlayer {
  letter = 'Mike';
}

export class WillLinebacker extends DefensivePlayer {
  letter = 'Will';
}

export class SamLinebacker extends DefensivePlayer {
  letter = 'Sam';
}

export class BuckLinebacker extends DefensivePlayer {
  letter = 'Buck';
}

export class StrongSafety extends DefensivePlayer {
  letter = 'SS';
}

export class FreeSafety extends DefensivePlayer {
  letter = 'FS';
}

export class Cornerback extends DefensivePlayer {
  letter = 'CB';
}

export class Nickelback extends DefensivePlayer {
  letter = 'NB';
}

export class Dimeback extends DefensivePlayer {
  letter = 'DB';
}

export class OffensivePlayer extends Player {
  public patternType:string;
}

export class LeftTackle extends OffensivePlayer {
  letter = 'T';
  x = -14;
  y = 3;
}

export class LeftGuard extends OffensivePlayer {
  letter = 'G';
  x = -8;
  y = 2;
}

export class Center extends OffensivePlayer {
  letter = 'C';
  x = 0;
  y = 1;
}

export class RightGuard extends OffensivePlayer {
  letter = 'G';
  x = 8;
  y = 2;
}

export class RightTackle extends OffensivePlayer {
  letter = 'T';
  x = 14;
  y = 3;
}

export class SplitEnd extends OffensivePlayer {
  patternType = 'WR';
  letter = 'X';
  x = -70;
  y = 2;
}

export class Flanker extends OffensivePlayer {
  patternType = 'WR';
  letter = 'Z';
  x = 70;
  y = 7;
}

export class Slot extends OffensivePlayer {
  patternType = 'WR';
  letter = 'S';
  x = -50;
  y = 7;
}

export class Slot2 extends OffensivePlayer {
  patternType = 'WR';
  letter = 'S2';
  x = 50;
  y = 7;
}

export class TightEnd extends OffensivePlayer {
  patternType = 'TE';
  letter = 'Y';
  x = 20;
  y = 3;
}

export class TightEnd2 extends OffensivePlayer {
  patternType = 'TE';
  letter = 'E';
  x = -20;
  y = 3;
}

export class Halfback extends OffensivePlayer {
  patternType = 'RB';
  letter = 'H';
  x = -8;
  y = 15;
}

export class Fullback extends OffensivePlayer {
  patternType = 'RB';
  letter = 'F';
  x = 6;
  y = 15;
}

export class Tailback extends OffensivePlayer {
  patternType = 'RB';
  letter = 'T';
  x = 0;
  y = 20;
}

export class Wingback extends OffensivePlayer {
  patternType = 'RB';
  letter = 'W';
  x = -30;
  y = 5;
}


