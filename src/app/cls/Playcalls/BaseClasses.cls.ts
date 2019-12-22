
export class PlaycallElement {

  public name:string = 'Override Me';
  public id:number;
  public doNotShowInPlaycall:boolean = false;

}

export class Assignment {
  type:string = 'Assignment';
}

export class OffensiveAssignment extends Assignment {
  type:string = 'OffensiveAssignment';
}

export class RunRoute extends OffensiveAssignment {
  type = 'RunRoute';
}

export class PassRoute extends OffensiveAssignment {
  type = 'PassRoute';
}

export class BlockingScheme extends OffensiveAssignment {
  type = 'BlockingScheme';
}

export class StrongSide {}

export class PlayType {
  public name:string = 'Override Me';
}