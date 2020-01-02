import { Injectable, OnDestroy } from '@angular/core';

import { Storage } from '@ionic/storage';
import { GameState } from '../GameState/GameState.cls';
import { Play } from '../Play/Play.cls';
import { Team } from '../Team/Team.cls';
import { OCDCEngine } from '../OCDCEngine/OCDCEngine.cls';

@Injectable({
  providedIn: 'root'
})
export class GameService {

  num;
  team_home;
  team_away;
  quarter_length:number = 300;
  plays = [];
  ended: boolean = false;

  constructor(private storage: Storage) {
    // load it from storage

    // set a key/value
    // this.storage.set('age', '43');

    // Or to get a key/value pair
    /*
    this.storage.get('age').then((val) => {
      //console.log('Your age is', val);
    });
    */
    this.team_home = new Team();
    this.team_away = new Team();

    this.plays.push(new Play(new GameState({
      play_type: "KO",
      down: 1,
      dist: 10,
      ytg: 65,
      quarter: 1,
      clock: this.quarter_length,
      score_home: 0,
      score_away: 0,
      possession: 'H'
    })));

  }

  getTeamInPossession(){
    return this.getCurrentPlay().getCurrentGameState().possession == 'H'? this.team_home : this.team_away;
  }

  getCurrentGameState(){
    return this.getCurrentPlay().getCurrentGameState();
  }

  addPlay(play){
    this.plays.push(play);
  }

  getCurrentPlay(){
    return this.plays[this.plays.length-1];
  }

  getLastPlayResult(){
    return this.getCurrentPlay().getPlayResult();
  }

  getLastPlay(){    
    return this.getCurrentPlay();
  }

  getCurrentDrivePlayResults(){
    let res = [];
    this.plays.forEach((play)=>{
      if(play.getPlayResult()){
        res.push(play.getPlayResult());
      }
    });
    return res;
  }

  /*
   * Implements the logic for end-of-play
   */
  resolveCurrentPlay(){

    let play = this.getCurrentPlay();
    // TODO: this does not belong here
    let res = play.getPlayResult();
    //console.log(res);
    

    let gs = new GameState(this.getCurrentPlay().getStartGameState());
    gs.clock -= res.time;
    /*
    
    switch(gs.play_type){
      case 'CNV': gs = this.resolveTwoPointTry(res, gs); break;
      case 'PAT': gs = this.resolvePAT(res, gs); break;
      case 'KO':  gs = this.resolveKickoff(res, gs); break;
      case 'FG':  gs = this.resolveFieldGoalAttempt(res, gs); break;
      default:    gs = this.resolveRegularPlay(res, gs);
    }

    //console.log('gs', gs);
    */

    gs = this.checkClock(res, gs);
    play.setEndGameState(gs);

  }

  checkClock(res, gs){
    if(gs.clock < 0){

      res.addCommentary('End of quarter' + gs.quarter);
      gs.quarter++;
      gs.clock = this.quarter_length;
      //halftime
      if(gs.quarter == 3){

        // TODO handle possession according to coin toss
        gs.possession = 'A';
        gs = this.setUpForKickoff(gs);
      
      // end of game
      } else if(gs.quarter > 4){
        this.ended = true;

      }
          
    }
    return gs;

  }

  resolveKickoff(res, gs){    

    gs.ytg -= res.gain;
    gs.down = 1;
    gs.dist = 10;
    gs = this.doChangeOfPossession(gs);
    if(res.data.touchback){
      gs = this.doTouchback(gs);
    }
    gs.play_type = 'REG';
    
    return gs;
  }

  resolveTwoPointTry(res, gs){
    gs.ytg -= res.gain;
    if(gs.ytg <= 0){
      res.addCommentary('Two point try is good!');
      gs = this.offensiveScore(gs, 2);   
    }
    gs = this.setUpForKickoff(gs);
    return gs;

  }

  resolvePAT(res, gs){
    if(res.data.pat_good){
      gs = this.offensiveScore(gs, 1);   
    }
    gs = this.setUpForKickoff(gs);
    return gs;

  }

  resolveFieldGoalAttempt(res, gs){
    if(res.data.fg_good){
      gs = this.offensiveScore(gs, 3);
      gs = this.setUpForKickoff(gs);
    } else {
      gs = this.doChangeOfPossession(gs);
      // ball is placed at the spot of the kick
      gs.ytg -= 7;
      gs.play_type = 'REG';
    }

    return gs;

  }

  setUpForKickoff(gs){
    gs.play_type = 'KO';
    gs.ytg = 65;
    // doesn't actually need these two
    gs.down = 1;
    gs.dist = 10;
    return gs;
  }

  resolveRegularPlay(res, gs){

    //console.log('play result', res);
    if(res.type == 'P'){

      console.log('penalty resolution here');

    } else {

      gs.down++;
      gs.dist -= res.gain;
      gs.ytg -= res.gain;

      if(res.change_of_possession > 0){

        gs = this.doChangeOfPossession(gs);
        // if this was a punt into the endzone
        if(gs.ytg > 99){
          
          res.addCommentary('Touchback');
          gs = this.doTouchback(gs);
        }
        
      } else if(gs.dist > 0 && gs.down > 4){

        res.addCommentary('Turnover on downs!');
        gs = this.doChangeOfPossession(gs);

      // TD
      } else if(gs.ytg <= 0){
        res.addCommentary('Touchdown!');
        gs = this.offensiveScore(gs, 6);   
        gs.play_type = 'CNV';     
        gs.ytg = 2;
        gs.dist = 2;
        gs.down = 1;
        //gs = this.doChangeOfPossession(gs);
        //gs = this.newDrive(gs);

      // First Down  
      } else if(gs.dist <= 0){

        res.addCommentary('First down');
        gs.down = 1;
        gs.dist = gs.ytg < 10? gs.ytg : 10;

      }

    }
      
    return gs;
 
  }

  doChangeOfPossession(gs){
    gs.possession = gs.possession == 'H'? 'A' : 'H';
    gs.down = 1;
    gs.dist = 10;
    gs.ytg = 100 - gs.ytg;
    return gs;
  }

  offensiveScore(gs, points){
    gs.possession == 'H'? gs.score_home += points : gs.score_away += points;
    return gs;
  }

  newDrive(gs){
    gs.down = 1;
    gs.dist = 10;
    gs.ytg = 75;
    return gs;
  }

  doTouchback(gs){
    gs.ytg = 80;
    return gs;
  }



}
