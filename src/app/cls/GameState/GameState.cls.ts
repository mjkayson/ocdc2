export class GameState {
  
  play_type: string;
  quarter: number;
  down: number;
  dist: number; // yards to first down/goal
  ytg:  number; // yards to goal
  clock: number; // seconds remaining in the game OR CURRENT HALF/QUARTER?
  score_home: number = 0;
  score_away: number = 0;
  possession: string; // 'H' or 'A' (for Home and Away)

  constructor(data){
    for(var i in data){
      this[i] = data[i];
    }
  }

}
