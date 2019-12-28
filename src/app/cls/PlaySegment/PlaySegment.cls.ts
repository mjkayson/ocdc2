
import { Siri } from '../Siri/Siri.cls';

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

  constructor(){
    
  }

  // any rng calculations for the segment happen here
  eval(){}

  get(key){
    return this[key];
  }

}

export class PlaySegment_Dropback extends PlaySegment {

  eval(){

    this.time = 1;

  }

}

export class PlaySegment_Handoff extends PlaySegment {

  eval(){

  }

}









