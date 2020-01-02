import { BlockingScheme } from './BaseClasses.cls';

export class RunBlockingScheme_Zone extends BlockingScheme {
  public name:string = 'Zone'; 
}

export class RunBlockingScheme_Dive extends BlockingScheme {
  public name:string = 'Dive'; 
}

export class RunBlockingScheme_Lead extends BlockingScheme {
  public name:string = 'Lead'; 
}

export class RunBlockingScheme_Power extends BlockingScheme {
  public name:string = 'Power';
  public line = -5;
  public location = 8;
  public box = 0;  
}

export class RunBlockingScheme_Trap extends BlockingScheme {
  public name:string = 'Trap'; 
}

export class RunBlockingScheme_Pull extends BlockingScheme {
  public name:string = 'Pull'; 
}


export class RunBlockingScheme_Draw extends BlockingScheme {
  public name:string = 'Draw'; 
}

