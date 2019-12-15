import { Siri } from '../Siri/Siri.cls';

export class AI {

  
  public static getPlaycall(gs){
    switch(gs.play_type){
      case 'KO': return 'ko';
      case 'CNV': return 'pat';
      case 'REG':
      default   : return AI.getRegularPlaycall(gs);
    }   

  }

  public static getRegularPlaycall(gs){
    switch(gs.down){
      case 1: return AI.getFirstDownPlay(gs);
      case 2: return AI.getSecondDownPlay(gs);
      case 3: return AI.getThirdDownPlay(gs);
      case 4: return AI.getFourthDownPlay(gs);
    }

    return 'run';

  }

  public static getFirstDownPlay(gs){
    let rand = Siri.getRandomNumber(1,2);
    if(rand == 1) return 'run';
    return 'short';
  }

  public static getSecondDownPlay(gs){
    if(gs.dist > 15) return 'long';
    if(gs.dist > 6) return 'short';
    let rand = Siri.getRandomNumber(1,9);
    if(rand == 9){
      return 'long';
    }
    return 'run';
  }

  public static getThirdDownPlay(gs){
    if(gs.dist > 15) return 'long';
    if(gs.dist > 3) return 'short';
    let rand = Siri.getRandomNumber(1,4);
    if(rand == 4){
      return 'short';
    }
    return 'run';
  }

  public static getFourthDownPlay(gs){
    if(gs.ytg > 35){
      return 'punt';
    } else {
      return 'fg';
    }
  }

}





