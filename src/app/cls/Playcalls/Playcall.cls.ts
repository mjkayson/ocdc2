import { PlaycallElement } from './BaseClasses.cls';
import { PlayType } from '../Playcalls/BaseClasses.cls';



export class Playcall {  
  
  //personnel:PersonnelPackage = new PersonnelPackage();

  personnelOptions:any = [];
  formationOptions:any = []

  options;
  phase:number = 0;
  currentPhase;
  personnel;
  formation;
  playType:PlayType;
  assignments:PlaycallElement[] = [];
  ready:boolean = false;

  constructor(){}

  setPersonnel(personnel){
    this.personnel = personnel;
  } 
  
  nextPhase(){
    this.phase++;
  }

  setCurrentPhase(){}

  getPhaseName(){
    return '';//this.currentPhase.name;
  }

  getPhaseOptions(){
    return this.currentPhase.opts;
  }
  
  addOptions(name, optionList, mod){
    //console.log(name, optionList, mod);
    var opts = [];
    for(var i in mod){
      opts.push(new mod[i]());
    }
    optionList.push({ name: name, opts:opts });
  }
  
  text(){
    return 'override me';
  }

  setPlayType(type){
    this.playType = type;
  }

  getPlayType(){
    return this.playType;
  }

  addSegment(segment){
    this.assignments.push(segment);
  }

  getSegments(){
    return this.assignments;
  }

}

