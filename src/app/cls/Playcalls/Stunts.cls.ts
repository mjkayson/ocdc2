import { DefensiveStunt } from './BaseClasses.cls';

export class Stunt_None extends DefensiveStunt {
  doNotShowInPlaycall = true;
  public name:string = 'None'; 
}

export class Stunt_Strong extends DefensiveStunt {
  public name:string = 'Strong';
  strongside = 10;
  weakside = -10;
}

export class Stunt_Weak extends DefensiveStunt {
  public name:string = 'Weak'; 
  strongside = -10;
  weakside = 10;
}

export class Stunt_Slant extends DefensiveStunt {
  public name:string = 'Slant';
  outside = 10;
  inside = -10;
}

export class Stunt_Pinch extends DefensiveStunt {
  public name:string = 'Pinch';
  outside = -10;
  inside = 10;
}

/*

export class Stunt_Tex {
  public name:string = 'Tex';
}

export class Stunt_Twist {
  public name:string = 'Twist'; 
}

export class Stunt_Jet {
  public name:string = 'Jet'; 
}

*/