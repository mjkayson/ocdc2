


export class PlayResult {
  time: number = 0; // play duration, seconds
  type: string;
  change_of_possession: number = 0;
  gain: number = 0;
  commentary; // text commentary
  score_home: number = 0;
  score_away: number = 0;
  data;
  game_state_start;
  end_game_state;
  segments:any = [];
  play;

  constructor(play){
    
   this.commentary = [];
   this.data = {};
   this.play = play;
   this.game_state_start = play.game_state_start;
   this.play.segments.forEach(seg=>{
     this.addResultSegment(seg);
   });

  }

  getStartGameState(){
    return this.game_state_start;
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




