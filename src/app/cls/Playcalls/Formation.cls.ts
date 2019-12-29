import {StrongSide_Left, StrongSide_Right } from '../Playcalls/StrongSides.cls';
import { Player } from '../Player/Player.cls';

export class Formation {

  name:string = '';

  constructor(){
    
  }

  text(){
    return 'override me';
  }

}

export class DefensiveFormation extends Formation {

  public blitzers:Player[] = [];
  public downLinemen:number;

  shift;

  setShift(shift){
    this.shift = shift;
  }

  text(){
    let str = this.name;
    if(this.shift){
      if(!this.shift.doNotShowInPlaycall){
        str += ' ' + this.shift.name;
      }
    }
    return str;
  }

  
  public getBlitzers(){
    return this.blitzers;
  }

  public getUnassignedBlitzers(){
    let recs = [];
    this.blitzers.forEach(rec=>{
      if(!rec.hasAssignment()){
        recs.push(rec);
      }
    });
    return recs;
  }

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