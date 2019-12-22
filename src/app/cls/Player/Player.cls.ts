
export class Player {

  public letter:string;
  public type:string;
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

export class OffensivePlayer extends Player {
  public patternType:string;
}

export class SplitEnd extends OffensivePlayer {
  patternType = 'WR';
  letter = 'X';
}

export class Flanker extends OffensivePlayer {
  patternType = 'WR';
  letter = 'Z';
}

export class Slot extends OffensivePlayer {
  patternType = 'WR';
  letter = 'S';
}

export class Slot2 extends OffensivePlayer {
  patternType = 'WR';
  letter = 'S2';
}

export class TightEnd extends OffensivePlayer {
  patternType = 'TE';
  letter = 'Y';
}

export class Halfback extends OffensivePlayer {
  patternType = 'RB';
  letter = 'H';
}

export class Fullback extends OffensivePlayer {
  patternType = 'RB';
  letter = 'F';
}

export class Tailback extends OffensivePlayer {
  patternType = 'RB';
  letter = 'T';
}

export class Wingback extends OffensivePlayer {
  patternType = 'RB';
  letter = 'W';
}


