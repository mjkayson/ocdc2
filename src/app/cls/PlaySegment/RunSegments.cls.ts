
import { Siri } from '../Siri/Siri.cls';
import { PlaySegment } from './PlaySegment.cls';

export class RunSegment extends PlaySegment {  

  constructor(play){
    super(play);

    if(play.segments.length){
      this.carryOver = this.lastSegment.carryOver;
    }
    this.eval();
    let adj = this.offAdj - this.defAdj;
    this.res = this.rand + adj;
    console.log('res', this.res);
    if(this.res<=30){
      play.finished = true;
      console.log('finished');
    } else {
      this.carryOver += adj;
      console.log('carryOver', this.carryOver);
    }
  }

}

export class RS_Transfer extends RunSegment {
  name = 'Transfer';

  eval(){
    this.offAdj = 25;
    this.ballY = -3;
  }
}

export class RS_Line extends RunSegment {
  name = 'Line';

  eval(){
    // headcount
    this.ballY = Siri.getRandomNumber(0,3) + this.lastSegment.ballY;
    this.carryOver = 0;
    for(var i=0;i<5;i++){
      this.offAdj += Siri.getRandomNumber(1,10);
    }
    for(var i=0;i<this.DC.formation.downLinemen;i++){
      this.defAdj += Siri.getRandomNumber(4,12);
    }
  }

}

export class RS_Location extends RunSegment {
  name = 'Location';

  eval(){
    this.ballY = Siri.getRandomNumber(0,3) + this.lastSegment.ballY;
    this.defAdj = 20;   
  }

}

export class RS_Box extends RunSegment {
  name = 'Box';
  
  eval(){
    this.ballY = Siri.getRandomNumber(1,4) + this.lastSegment.ballY;
    this.defAdj = 40;    
  }
}

export class RS_Secondary extends RunSegment {
  name = 'Secondary';  

  eval(){
    this.ballY = Siri.getRandomNumber(2,7) + this.lastSegment.ballY;
    this.defAdj = 20;    
  }

}

export class RS_Break extends RunSegment {
  name = 'Break';

  eval(){
    this.play.finished = true;
  }
}



