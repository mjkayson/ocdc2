
import { Siri } from '../Siri/Siri.cls';
import { PlaySegment } from './PlaySegment.cls';
import { Config } from '../Config/Config.cls';
import { ɵConsole } from '@angular/core';


export class RunSegment extends PlaySegment {  
  public name:string = 'override me too';

  resolve(){
    if(this.play.segments.length){
      this.carryOver = this.lastSegment.carryOver;
    } else {
      this.carryOver = 0;
    }
    let adj = this.carryOver + this.offAdj - this.defAdj;
    this.res = this.rand + adj;
    if(this.res <= this.endsOn){
      this.play.finished = true;
      
    }
  }

  setAdj(){   
    //console.log('name', this.name, this.OC.blockingSchemes); 
    if(this.OC.blockingSchemes.length){
      this.OC.blockingSchemes.forEach(scheme=>{
        if(scheme[this.name]){
          //console.log('adj', scheme[this.name]);
          this.offAdj += scheme[this.name];
        }
      });
    }
  }

}

export class RS_Transfer extends RunSegment {
  public name:string = 'transfer';
  endsOn = 1;

  eval(){
    this.ballY = (Siri.getRandomNumber(200,550)/100) * -1;
  }
}

export class RS_Line extends RunSegment {
  name = 'line';
  endsOn = 10;

  eval(){
    
    this.gain = Siri.getRandomNumber(100,250) / 100;
    this.ballY = this.gain + this.lastSegment.ballY;
    if(this.ballY < -1){
      //this.ballY = -1;
    }
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
  name = 'location';
  endsOn = 40;

  eval(){
    this.ballY = (Siri.getRandomNumber(100,300)/100) + this.lastSegment.ballY;
    
  }

}

export class RS_Box extends RunSegment {
  name = 'box';
  endsOn = 50;
  
  eval(){
    this.ballY = (Siri.getRandomNumber(100,500)/100) + this.lastSegment.ballY;
    //this.defAdj = 40;    
  }
}

export class RS_Secondary extends RunSegment {
  name = 'secondary';  
  endsOn = 60;

  eval(){
    this.ballY = (Siri.getRandomNumber(300,900)/100) + this.lastSegment.ballY;
    //this.defAdj = 20;    
  }

}

export class RS_Break extends RunSegment {
  name = 'break';
  endsOn = 100;

  eval(){
    this.ballY = (Siri.getRandomNumber(300,4000)/100) + this.lastSegment.ballY;
    this.play.finished = true;
  }
}



