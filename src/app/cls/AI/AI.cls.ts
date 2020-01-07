import { Siri } from '../Siri/Siri.cls';
import { OffensivePlaycall } from '../Playcalls/OffensivePlaycall.cls';
import { DefensivePlaycall } from '../Playcalls/DefensivePlaycall.cls';

export class AI {

  
  public static getPlaycall(gs){
    return gs.possession == 'A'? AI.getSpecificOffensivePlaycall() : AI.getSpecificDefensivePlaycall();
    //return gs.possession == 'A'? AI.getRandomOffensivePlaycall() : AI.getRandomDefensivePlaycall();
  }

  static getSpecificOffensivePlaycall(){
    let call = new OffensivePlaycall();
    call.personnel = call.personnelOptions[0].opts[4]; // 11

    let formation = call.formationOptions[0].opts[1]; // Single
    //formation.setQbDepth(call.qbDepthOptions[0].opts[0]); // -
    //formation.setStrongSide(call.strongSideOptions[0].opts[0]); // Right
    call.formation = formation;

    //let playType = call.playTypeOptions[0].opts[0]; // Run
    //call.playType = playType;

    //call.runCall = call.runCallOptions[0].opts[8]; // 28
    //call.blockingSchemes.push(call.runBlockingSchemeOptions[0].opts[2]); // Lead

    return call;
  }

  static getSpecificDefensivePlaycall(){
    let call = new DefensivePlaycall();
    call.personnel = call.personnelOptions[0].opts[0]; // 43
    let formation = call.formationOptions[0].opts[2]; // 4-30
    call.formation = formation;
    //call.line = call.stuntOptions[0].opts[2]; // Weak
    //call.coverage = call.coverageOptions[0].opts[1]; // Cover 2
    // no blitzes yet

    return call;
  }

  public static getRandomDefensivePlaycall(){
    let call = new DefensivePlaycall();
    call.personnel = AI.getRandomOption(call.personnelOptions[0].opts);    
    let formation = AI.getRandomOption(call.formationOptions[0].opts);
    //formation.setShift(AI.getRandomOption(call.shiftOptions[0].opts));
    call.formation = formation;
    //call.stunt = AI.getRandomOption(call.stuntOptions[0].opts);
    //call.coverage = AI.getRandomOption(call.coverageOptions[0].opts);
    if(Siri.getRandomNumber(1, 3) == 3){
      let player = AI.getRandomOption(call.formation.getUnassignedBlitzers());
      //let blitz = AI.getRandomOption(call.blitzOptions[0].opts);
      //player.setAssignment(blitz);
      //call.blitzes.push(player);
    }
    return call;
  }

  public static getRandomOffensivePlaycall(){
    let call = new OffensivePlaycall();
    call.personnel = AI.getRandomOption(call.personnelOptions[0].opts);
    //console.log('AI personnel', call.personnel);
    let formation = AI.getRandomOption(call.formationOptions[0].opts);
    //formation.setQbDepth(AI.getRandomOption(call.qbDepthOptions[0].opts));
    //formation.setStrongSide(AI.getRandomOption(call.strongSideOptions[0].opts));
    //console.log('AI formation', formation);
    call.formation = formation;
    //let playType = AI.getRandomOption(call.playTypeOptions[0].opts);
    //let playType = call.playTypeOptions[0].opts[0];
    //console.log('AI playType', playType);
    /*
    call.playType = playType;
    if(playType.name == 'Run'){
      call = AI.getRandomRun(call);
    } else if(playType.name == 'Pass'){
      call = AI.getRandomPass(call);
    } else if(playType.name == 'RPO'){
      // not done RPOs yet
      call = AI.getRandomPass(call);
    }
    //console.log('AI Call', call);
    */
    return call;
  }

  public static getRandomRun(call){
    //call.runCall = call.runCallOptions[0].opts[8];
    //call.blockingSchemes.push(call.runBlockingSchemeOptions[0].opts[3]);
    call.runCall = AI.getRandomOption(call.runCallOptions[0].opts);
    call.blockingSchemes.push(AI.getRandomOption(call.runBlockingSchemeOptions[0].opts));
    return call;
  }

  public static getRandomPass(call){
    for(var i=0;i<Siri.getRandomNumber(2, 4);i++){
      call.progression.push(AI.getRandomPassRoute(call));
    }
    return call;
  }

  public static getRandomPassRoute(call){
    let rec = AI.getRandomOption(call.formation.getUnassignedReceivers());
    let pattern = AI.getRandomOption(call.getPatternsByPosition(rec));
    rec.setAssignment(pattern);
    return rec;
  }

  public static getRandomRPO(call){
    return call;
  }

  public static getRandomOption(options){
    let pos = Siri.getRandomNumber(0, options.length-1);
    return options[pos];
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





