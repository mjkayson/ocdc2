
import { Siri } from '../Siri/Siri.cls';
import { PlaySegment } from './PlaySegment.cls';
import { Config } from '../Config/Config.cls';
import { ɵConsole } from '@angular/core';


export class RunSegment extends PlaySegment {  
  public name:string = 'override me too';

  gainMin:number;
  gainMax:number;
  negative:boolean = false;

  constructor(play, data){
    super(play);
    //console.log(data);
    this.offAdj = data.offMods.min;
    this.defAdj = data.defMods.min;
    this.offEndsOn = data.offMods.endsOn;
    this.defEndsOn = data.defMods.endsOn;
    this.name = data.vars.name;
    this.gainMax = data.vars.max * data.offMods.max * data.defMods.max;
    this.gainMin = data.vars.min * data.offMods.min * data.defMods.min;
    this.negative = data.vars.negative;
    this.endsOn = data.vars.endsOn + data.offMods.endsOn + data.defMods.endsOn;
  }

  eval(){
    this.ballY = Siri.getRandomNumber(this.gainMin,this.gainMax)/100;
    if(this.segmentNumber > 1) this.ballY += this.lastSegment.ballY;
    if(this.negative) this.ballY *= -1;
    this.ballY = Math.round(this.ballY * 100)/100;
    //console.log(this.segmentNumber, this.ballY);
  }

  resolve(){
    //let adj = this.offAdj - this.defAdj;    
    this.res = this.rand; // + adj;
    if(this.res <= this.endsOn){
      this.play.finished = true;      
    }
  }

  setAdj(){   
    /*
    //console.log('name', this.name, this.OC.blockingSchemes); 
    if(this.OC.blockingSchemes.length){
      this.OC.blockingSchemes.forEach(scheme=>{
        if(scheme[this.name]){
          //console.log('adj', scheme[this.name]);
          this.offAdj += scheme[this.name];
        }
      });
    }
    */
  }

}


