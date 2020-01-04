import { RunBlockingScheme } from './BaseClasses.cls';

export class RunBlockingScheme_Zone extends RunBlockingScheme {
  public name:string = 'Zone';
  line1 = 1;
  line2 = 1;
  location1 = 2;
  location2 = -1;
  box1 = -2;
}

export class RunBlockingScheme_Dive extends RunBlockingScheme {
  public name:string = 'Dive';
  line1 = 3;
  line2 = 1;
  location1 = -1;
  location2 = -1;
  box1 = -2; 
}

export class RunBlockingScheme_Lead extends RunBlockingScheme {
  public name:string = 'Lead'; 
  line1 = 3;
  line2 = 1;
  location2 = -1;
  box1 = -2;
}

export class RunBlockingScheme_Power extends RunBlockingScheme { 
  public name:string = 'Power';
  line1 = -1;
  line2 = 2;
  location1 = 2;
  box1 = -2;
}

export class RunBlockingScheme_Trap extends RunBlockingScheme {
  public name:string = 'Trap'; 
  line1 = -4;
  line2 = -2;
  location1 = 4;
  location2 = 2;
}

export class RunBlockingScheme_Pull extends RunBlockingScheme {
  public name:string = 'Pull'; 
}

export class RunBlockingScheme_Draw extends RunBlockingScheme {
  public name:string = 'Draw'; 
}

