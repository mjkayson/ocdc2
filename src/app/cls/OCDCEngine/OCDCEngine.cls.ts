import { Siri } from '../Siri/Siri.cls';
import { Playcall, OffensivePlaycall, DefensivePlaycall } from '../Playcalls/Playcall.cls';
import { GameService } from '../GameService/game.service';
import { PlayResult } from '../PlayResult/PlayResult.cls';
import { Play } from '../Play/Play.cls';
import * as PlaySegment from '../PlaySegment/PlaySegment.cls';
import * as RunSegment from '../PlaySegment/RunSegments.cls';

export class OCDCEngine {

  public static resolve(game:GameService){
    let play = game.getCurrentPlay();
    while(play.finished == false){
      play.segments.push(OCDCEngine.nextSegment(play));
      console.log('ballY', play.getLastSegment().ballY);
    }
    console.log('gain of', play.getLastSegment().ballY);
  }

  static nextSegment(play:Play){
    let OC:any = play.getOffensivePlaycall();
    switch(OC.playType.name){
      case 'Run': return OCDCEngine.runSegment(play);
      case 'Pass': return OCDCEngine.passSegment(play);
    }
    console.log('playType not found in Engine.nextSegment()');
    return {};
  }

  static runSegment(play){
    switch(play.segments.length){
      case 0: return new PlaySegment.PS_Snap(play);
      case 1: return new RunSegment.RS_Transfer(play);
      case 2: return new RunSegment.RS_Line(play);
      case 3: return new RunSegment.RS_Line(play);
      case 4: return new RunSegment.RS_Location(play);
      case 5: return new RunSegment.RS_Location(play);
      case 6: return new RunSegment.RS_Box(play);
      case 7: return new RunSegment.RS_Box(play);
      case 8: return new RunSegment.RS_Secondary(play);
      case 9: return new RunSegment.RS_Break(play);
    }


  }

  static passSegment(play){}

}





