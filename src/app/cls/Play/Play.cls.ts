

import { PlayCall } from '../../int/PlayCall.int';
import { GameState } from '../GameState/GameState.cls';
import  {
          PlaySegment_Dropback,
          PlaySegment_Handoff,
          PlaySegment_Run,
          PlaySegment_ShortPass,
          PlaySegment_LongPass,

          PlaySegment_Kickoff,
          PlaySegment_Punt,
          PlaySegment_FieldGoal,
          PlaySegment_PAT
        } from '../PlaySegment/PlaySegment.cls';
import { PlayResult } from '../PlayResult/PlayResult.cls';

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
    
    this.game_state_start = gs;    
    
  }

  setPlaycall(off, def){
    this.playcall_off = off;
    this.playcall_def = def;
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
  }

  getPlaycall(side){
    return side == 'off'? this.playcall_off : this.playcall_def;
  }

  run(){
    this.started = true;
    this.playResult = new PlayResult({}, this.game_state_start );
    this.segments.forEach(segment => {
      if(!this.finished){
        this.resolveSegment(segment);
      } else {
        //this.setEndGameState();
      }
    });
    //console.log('play result', this.playResult);
    this.finished = true;
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





