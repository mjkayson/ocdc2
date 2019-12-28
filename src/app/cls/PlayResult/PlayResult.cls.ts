


export class PlayResult {
  time: number = 0; // play duration, seconds
  type: string;
  change_of_possession: number = 0;
  gain: number = 0;
  commentary; // text commentary
  score_home: number = 0;
  score_away: number = 0;
  data;
  start_game_state;
  end_game_state;
  segments:any = [];

  constructor(){
    
   this.commentary = [];
   this.data = {};

  }

  getStartGameState(){
    return this.start_game_state;
  }

  addResultSegment(segment){
    this.segments.push(segment);
  }

  addCommentary(str){
    this.commentary.push(str);
  }

  getCommentary(){
    //console.log(this.commentary);
    return this.commentary;
  }
  
}




