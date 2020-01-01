
import { Siri } from '../Siri/Siri.cls';
import { PlaySegment } from './PlaySegment.cls';
import { Config } from '../Config/Config.cls';


export class RunSegment extends PlaySegment {  


  constructor(play){
    super(play);

    if(play.segments.length){
      this.carryOver = this.lastSegment.carryOver;
    }
    this.eval();
    let adj = this.offAdj - this.defAdj;
    this.res = this.rand + adj;
    //console.log('res', this.res);
    if(this.res <= this.endsOn){
      play.finished = true;
      //console.log('finished');
    } else {
      this.carryOver += adj;
      //console.log('carryOver', this.carryOver);
    }
  }

}

export class RS_Transfer extends RunSegment {
  name = 'Transfer';

  eval(){
    this.endsOn = 1;
    //this.offAdj = 25;
    this.ballY = (Siri.getRandomNumber(200,550)/100) * -1;
  }
}

export class RS_Line extends RunSegment {
  name = 'Line';

  eval(){
    this.endsOn = 3;
    // headcount
    this.gain = Siri.getRandomNumber(100,250) / 100;
    this.ballY = this.gain + this.lastSegment.ballY;
    if(this.ballY < -1){
      //this.ballY = -1;
    }
    this.carryOver = 0;
    /*
    for(var i=0;i<5;i++){
      this.offAdj += Siri.getRandomNumber(1,10);
    }
    for(var i=0;i<this.DC.formation.downLinemen;i++){
      this.defAdj += Siri.getRandomNumber(1,10);
    }
    */
  }

}

export class RS_Location extends RunSegment {
  name = 'Location';

  eval(){
    this.endsOn = 40;
    this.ballY = (Siri.getRandomNumber(0,300)/100) + this.lastSegment.ballY;
    //this.defAdj = 20;   
  }

}

export class RS_Box extends RunSegment {
  name = 'Box';
  
  eval(){
    this.endsOn = 50;
    this.ballY = (Siri.getRandomNumber(100,500)/100) + this.lastSegment.ballY;
    //this.defAdj = 40;    
  }
}

export class RS_Secondary extends RunSegment {
  name = 'Secondary';  

  eval(){
    this.endsOn = 60;
    this.ballY = (Siri.getRandomNumber(300,900)/100) + this.lastSegment.ballY;
    //this.defAdj = 20;    
  }

}

export class RS_Break extends RunSegment {
  name = 'Break';
  endsOn = 100;

  eval(){
    this.ballY = (Siri.getRandomNumber(300,4000)/100) + this.lastSegment.ballY;
    this.play.finished = true;
  }
}



