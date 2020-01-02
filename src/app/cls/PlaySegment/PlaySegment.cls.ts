
import { Siri } from '../Siri/Siri.cls';
import { NumericValueAccessor } from '@ionic/angular';

export class PlaySegment {
  time: number = 0; // play duration, seconds
  type: string;
  change_of_possession: number = 0; // 1 for yes
  team_in_possession: string;
  start_ball_carrier: number;
  end_ball_carrier: number;
  gain: number = 0;
  score: number = 0; // of points
  scoring_team: number; // id of the team that scored
  end_of_play: boolean = false; // 1 for yes
  commentary: string = ""; // text commentary
  data;
  play;
  name:string = 'PlaySegment';
  OC;
  DC;
  ballX:number = 5; // 1-9 from left to right on the field
  ballLineX:number = 5; // 1-9 from left to right on the line
  ballY:number = 0; // yds from LoS

  carryOver:number = 0;
  rand:number; // base rng, 1-100
  offAdj:number = 0;
  defAdj:number = 0;
  res:number = 0;

  lastSegment;
  segmentNumber:number;
  endsOn:number = 0;



  constructor(play){
    this.play = play;
    this.OC = play.getOffensivePlaycall();
    this.DC = play.getDefensivePlaycall();
    this.rand = Siri.getRandomNumber(1,100);
    this.lastSegment = play.getLastSegment();
    this.segmentNumber = play.segments.length;
  }

  // any rng calculations for the segment happen here
  eval(){}

  resolve(){}

  setAdj(){}

  get(key){
    return this[key];
  }

}

export class PS_Snap extends PlaySegment {

  name = 'Snap';

  eval(){
    this.time = 1;
    this.ballY = this.OC.formation.qbDepth.qb_depth;
  }

}







