

import { PlayCall } from '../../int/PlayCall.int';
import { GameState } from '../GameState/GameState.cls';
import { PlayResult } from '../PlayResult/PlayResult.cls';
import { OffensivePlaycall, DefensivePlaycall } from '../Playcalls/Playcall.cls';

export class Play {
  playcall_off: PlayCall;
  playcall_def: PlayCall;
  game_state_start: GameState;
  game_state_end: GameState;
  segments;
  possession: number = 0;
  playResult: PlayResult;
  started: boolean = false;
  finished: boolean = false;


  constructor(gs:GameState){
    this.playResult = new PlayResult();
    this.game_state_start = gs;    
    
  }

  setPlaycall(off:OffensivePlaycall, def:DefensivePlaycall){
    this.playcall_off = off;
    this.playcall_def = def;
    /*
    if(off == 'short'){
      this.segments = [new PlaySegment_Dropback(def), new PlaySegment_ShortPass(def)];
    } else if(off == 'long'){
      this.segments = [new PlaySegment_Dropback(def), new PlaySegment_LongPass(def)];
    } else if(off == 'punt'){
      this.segments = [new PlaySegment_Punt(def)];
    } else if(off == 'pat'){
      this.segments = [new PlaySegment_PAT(def)];
    } else if(off == 'fg'){
      this.segments = [new PlaySegment_FieldGoal(def)];
    } else if(off == 'ko'){
      this.segments = [new PlaySegment_Kickoff(def)];
    } else {
      this.segments = [new PlaySegment_Handoff(def), new PlaySegment_Run(def)];
    }
    */
  }

  getPlaycall(side){
    return side == 'off'? this.playcall_off : this.playcall_def;
  }

  getOffensivePlaycall(){
    return this.playcall_off;
  }

  getDefensivePlaycall(){
    return this.playcall_def;
  }

  run(){
    
  }

  getPlayResult(){
    return this.playResult;
  }

  getStartGameState(){
    return this.game_state_start;
  }

  getCurrentGameState(){
    return this.finished? this.game_state_end : this.game_state_start;
  }

  getEndGameState(){
    return this.game_state_end;
  }

  setEndGameState(gs){
    this.game_state_end = gs;
  }

  addSegment(segment){
    this.segments.push(segment);
  }

  resolveSegment(segment){
    let end = false;
    segment.eval();
    
    // yards gained
    this.playResult.gain += segment.gain;        
    // time
    this.playResult.time  += segment.time;   
    // specific data
    this.playResult.data  = {...this.playResult.data, ...segment.data};

    if(segment.commentary) this.playResult.addCommentary(segment.commentary);

    // if we are in the endzone
    if(this.possession == 0 && ((this.game_state_start.ytg - this.playResult.gain) <=0)){
      end = true;
    }

    if(segment.change_of_possession) this.playResult.change_of_possession = 1;

    if(end || segment.end_of_play) this.finished = true;
  }


}





