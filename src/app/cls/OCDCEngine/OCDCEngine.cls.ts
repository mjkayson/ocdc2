import { Siri } from '../Siri/Siri.cls';
import { Playcall, OffensivePlaycall, DefensivePlaycall } from '../Playcalls/Playcall.cls';
import { GameService } from '../GameService/game.service';
import { PlayResult } from '../PlayResult/PlayResult.cls';
import { Play } from '../Play/Play.cls';
import { PlaySegment } from '../PlaySegment/PlaySegment.cls';

export class OCDCEngine {

  static ended:boolean = false;

  public static resolve(game:GameService){
    let play = game.getCurrentPlay();
    while(OCDCEngine.ended == false){
      play = OCDCEngine.nextSegment(play);
    }
    OCDCEngine.ended = false;
  }

  static nextSegment(play:Play){
    let OC:any = play.getOffensivePlaycall();
    let DC:any = play.getDefensivePlaycall();
    switch(OC.playType.name){
      case 'Run': return OCDCEngine.runSegment(OC, DC);
      case 'Pass': return OCDCEngine.passSegment(OC, DC);
    }
  }

  static runSegment(OC, DC){


  }

  static passSegment(OC, DC){}

}





