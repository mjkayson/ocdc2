import {StrongSide_Left, StrongSide_Right } from '../Playcalls/StrongSides.cls';
import { Player } from '../Player/Player.cls';

export class Formation {

  name:string = '';
  segments:any = [];

  constructor(){
    
  }
  
  addSegment(segment){
    this.segments.push(segment);
  }

  getCall(){
    let call = '';
    this.segments.forEach(el=>{
      //call += ' '+el.getCall();
    });
    return call;
  }

  text(){
    return 'override me';
  }

}

export class DefensiveFormation extends Formation {

}

export class OffensiveFormation extends Formation {

  qbDepth;
  strongSide:any;
  motion;
  eligibleReceivers:Player[] = [];

  text(){
    let str = '';
    if(this.qbDepth){
      if(!this.qbDepth.doNotShowInPlaycall){
        str += this.qbDepth.name + ' ';
      }
    }
    str += this.name;
    
    if(this.strongSide){
      if(!this.strongSide.doNotShowInPlaycall){
        str += ' ' + this.strongSide.name;
      }
    }

    if(this.motion){
      if(!this.motion.doNotShowInPlaycall){
        str += ' ' + this.motion.name;
      }
    }
    return str;
  }

  setQbDepth(qbDepth:any){
    this.qbDepth = qbDepth;
  }

  setStrongSide(side:any){
    this.strongSide = side;
  }
  
  public getEligibleReceviers(){
    return this.eligibleReceivers;
  }

  public getUnassignedReceivers(){
    let recs = [];
    this.eligibleReceivers.forEach(rec=>{
      if(!rec.hasAssignment()){
        recs.push(rec);
      }
    });
    return recs;
  }

}