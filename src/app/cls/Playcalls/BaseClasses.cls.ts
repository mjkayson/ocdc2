
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
  transfer = 1;
  line1 = 1;
  line2 = 1;
  location1 = 1;
  location2 = 1;
  box1 = 1;
  box2 = 1;
  secondary = 1;
  break =  1;
  
}

export class PassRoute extends OffensiveAssignment {
  type = 'PassRoute';
}

export class BlockingScheme extends OffensiveAssignment {
  type = 'BlockingScheme';
}

export class RunBlockingScheme extends BlockingScheme {
  type = 'RunBlockingScheme';
  transfer = 0;
  line1 = 0;
  line2 = 0;
  location1 = 0;
  location2 = 0;
  box1 = 0;  
  box2 = 0;  
  secondary = 0;
  break = 0;
}

export class StrongSide {}

export class PlayType {
  public name:string = 'Override Me';
}

export class DefensiveStunt {
  inside = 0;
  outside = 0;
  weakside = 0;
  strongside = 0;
}