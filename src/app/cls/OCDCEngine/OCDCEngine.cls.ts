import { Siri } from '../Siri/Siri.cls';
import { Playcall, OffensivePlaycall, DefensivePlaycall } from '../Playcalls/Playcall.cls';
import { GameService } from '../GameService/game.service';
import { PlayResult } from '../PlayResult/PlayResult.cls';
import { Play } from '../Play/Play.cls';
//import * as PlaySegment from '../PlaySegment/PlaySegment.cls';
//import * as RunSegment from '../PlaySegment/RunSegments.cls';
import { SnapSegment } from '../PlaySegment/PlaySegment.cls';
import { RunSegment } from '../PlaySegment/RunSegments.cls';
import { Config } from '../Config/Config.cls';

export class OCDCEngine {

  public static resolve(game:GameService, noAdj?){
    let play = game.getCurrentPlay();
    while(play.finished == false){      
      
      let segment:any = OCDCEngine.nextSegment(play, noAdj);
      if(!noAdj) segment.setAdj();
      segment.eval();
      segment.resolve();
      play.segments.push(segment);
    }
  }

  static nextSegment(play:Play, noAdj?){
    let OC:any = play.getOffensivePlaycall();
    switch(OC.playType.name){
      case 'Run': return OCDCEngine.getRunSegment(play, noAdj);
      case 'Pass': return OCDCEngine.getPassSegment(play, noAdj);
    }
    console.log('playType not found in Engine.nextSegment()');
    return {};
  }

  static getRunSegment(play, noAdj?){
    if(play.segments.length == 0){
      return new SnapSegment(play);
    }
    return new RunSegment(play, OCDCEngine.getRunVars(play, noAdj));
  }

  static getRunVars(play, noAdj?){
    let off = play.getOffensivePlaycall();
    let def = play.getDefensivePlaycall();
    let segmentNum = play.segments.length;
    let name;
    switch(segmentNum){
      case 1: name = 'transfer'; break;
      case 2: name = 'line1'; break;
      case 3: name = 'line2'; break;
      case 4: name = 'location1'; break;
      case 5: name = 'location2'; break;
      case 6: name = 'box1'; break;
      case 7: name = 'box2'; break;
      case 8: name = 'secondary'; break;
      case 9: name = 'break'; break;
    }
    // min and max and ends for this segment
    let vars = {
      name: name,
      negative: segmentNum == 1,
      min: Config.runData[name].min,
      max: Config.runData[name].max,
      endsOn: Config.runData[name].endsOn
    };
    // offensive adjustments for location & blocking
    if(!noAdj){
      //console.log(call.blockingSchemes);
      vars.min *= off.runCall[name];
      vars.max *= off.runCall[name];
      vars.endsOn -= off.blockingSchemes[0][name];
    }
    // defensive adjustments for formation, line calls & assignments - not in the transfer phase
    if(!noAdj && segmentNum > 1){
      let mod = 1;
      let endsOnMod = 0;
      let strong = off.isStrongsideRun();
      let inside = off.isInsideRun();
      //console.log(off, def);
      //console.log(strong, inside);
      
      if(segmentNum < 4){
        // number of down linemen in the line phase
        mod += ((4 - def.formation.downLinemen) * 0.2);
        // shift here
        endsOnMod += strong? def.formation.shift.strongside : def.formation.shift.weakside;
        endsOnMod += inside? def.formation.shift.inside : def.formation.shift.outside;
      } else if(segmentNum < 6){
        // stunt in the location phase
        //console.log('location phase', def.stunt);
        endsOnMod += strong? def.stunt.strongside : def.stunt.weakside;   
        endsOnMod += inside? def.stunt.inside : def.stunt.outside;     
      } else if(segmentNum < 8){
        // nothing here yet

      }
      //console.log(mod, endsOnMod);
      vars.min *= mod;
      vars.max *= mod;
      vars.endsOn += endsOnMod;
    }
    //console.log(vars);
    return vars;
  }

  static getPassSegment(play, noAdj?){
    return {};
  }

}





