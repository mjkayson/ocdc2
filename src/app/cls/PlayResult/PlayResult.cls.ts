


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

  constructor(data = null, game_state){
    /*
    for(var i in data){
      this[i] = data[i];
    }
    */
   this.start_game_state = game_state;
   this.commentary = [];
   this.data = {};

  }

  getStartGameState(){
    return this.start_game_state;
  }

  addCommentary(str){
    this.commentary.push(str);
  }

  getCommentary(){
    //console.log(this.commentary);
    return this.commentary;
  }
  
}




