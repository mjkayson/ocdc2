
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
  def;

  constructor(def){
    this.def = def; 
    this.data = {};      
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

export class PlaySegment_Run extends PlaySegment {

  eval(){
    this.time = 18;
    this.gain = Siri.getRandomNumber(1,7);
    if(this.def == 'rund') this.gain -= 4;
    this.end_of_play = true;
    this.commentary = "Run for gain of " + this.gain + ' yards';
  }

}

export class PlaySegment_ShortPass extends PlaySegment {

  eval(){
    let rand = Siri.getRandomNumber(1,9);
    let comp = 7;
    switch(this.def){
      case '52zone': comp = 3; break;
      case '43zone': comp = 4; break;
      case 'blitz' : comp = 5; break;
    }
    let pressure =  Siri.getRandomNumber(1,9);
    if(this.def == 'blitz'){
      pressure += 2;
    }

    if(pressure > 8){
      this.time = 21;
      this.gain = Siri.getRandomNumber(2,8);
      this.commentary = "Sack for loss off " + this.gain + ' yards';
      this.gain *= -1;
    }

    else if(rand < comp){
      this.time = 5;
      this.commentary = "Pass incomplete";
      
    } else {

      this.time = 12;
      this.gain = Siri.getRandomNumber(2,16);
      if(this.def == 'blitz') this.gain -= 2;
      if(this.def == '52zone') this.gain -= 4;
      this.commentary = "Pass complete for gain of " + this.gain + ' yards';

    }
    
    this.end_of_play = true;
  }

}

export class PlaySegment_LongPass extends PlaySegment {

  eval(){

    let rand = Siri.getRandomNumber(1,9);
    let comp = 5;
    switch(this.def){
      case '52zone': comp = 4; break;
      case '43zone': comp = 3; break;
      case 'blitz' : comp = 5; break;
    }
    let pressure =  Siri.getRandomNumber(1,9);
    if(this.def == 'blitz'){
      pressure += 3;
    }

    if(pressure > 8){
      this.time = 21;
      this.gain = Siri.getRandomNumber(4,10);
      this.commentary = "Sack for loss off " + this.gain + ' yards';
      this.gain *= -1;
    }

    else if(rand < comp){
      this.time = 9;
      this.commentary = "Pass incomplete";
      
    } else {

      this.time = 22;
      this.gain = Siri.getRandomNumber(12,36);
      if(this.def == 'blitz') this.gain += Siri.getRandomNumber(2,20);
      if(this.def == '43zone') this.gain -= 8;
      this.commentary = "Pass complete for gain of " + this.gain + ' yards';

    }
    
    this.end_of_play = true;
  }

}

export class PlaySegment_Punt extends PlaySegment {

  eval(){

    this.time = 20;
    this.gain = Siri.getRandomNumber(30,55);
    this.commentary = "Punt for " + this.gain + ' yards';
   
    this.end_of_play = true;
    this.change_of_possession = 1;
  }

}

export class PlaySegment_FieldGoal extends PlaySegment {

  eval(){

    this.time = 15;
    let rand = Siri.getRandomNumber(1,3);
    
    this.commentary = "Field goal attempt of x yards";
    if(rand > 1){
      this.data.fg_good = true;
      this.commentary += ", good.";
    } else {
      this.commentary += ", no good.";
    }
    
    this.end_of_play = true;
  }

}

export class PlaySegment_PAT extends PlaySegment {

  eval(){

    this.time = 0;
    let rand = Siri.getRandomNumber(1,40);
    
    if(rand > 1){
      this.data.pat_good = true;
      this.commentary = "Point after is good.";
    } else {
      this.commentary = "Point after is no good.";
    }
   
    this.end_of_play = true;
  }

}


export class PlaySegment_Kickoff extends PlaySegment {

  eval(){

    let rand = Siri.getRandomNumber(55,80);
    if(rand > 65){
      this.data.touchback = true;
      this.commentary = "Kickoff into the endzone, touchback.";
    } else if(rand == 65){
      this.commentary = "Kickoff to the goal line";
    } else {
      this.commentary = "Kickoff to the " + (65-rand);
    }
    if(!this.data.touchback){
      this.time = 12;
      let ret = Siri.getRandomNumber(15,35);
      this.gain = rand - ret;
      this.commentary += ", returned " + ret + " yards";
    }    
   
    this.end_of_play = true;
    this.change_of_possession = 1;
  }

}












