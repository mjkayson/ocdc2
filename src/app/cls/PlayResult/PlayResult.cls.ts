


export class PlayResult {
  time: number = 0; // play duration, seconds
  type: string;
  change_of_possession: number = 0;
  gain: number = 0;
  commentary; // text commentary
  score_home: number = 0;
  score_away: number = 0;

  constructor(data=  null){
    /*
    for(var i in data){
      this[i] = data[i];
    }
    */
   this.commentary = [];

  }

  addCommentary(str){
    this.commentary.push(str);
  }

  getCommentary(){
    //console.log(this.commentary);
    return this.commentary.join(', ');
  }
}




