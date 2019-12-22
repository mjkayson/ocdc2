import { Formation } from './Formation.cls';
import { PersonnelPackage } from './PersonnelPackage.cls';
import { PlaycallElement } from './BaseClasses.cls';
import { PlayType } from '../Playcalls/BaseClasses.cls';


export class Playcall {  
  
  //personnel:PersonnelPackage = new PersonnelPackage();

  personnelOptions:any = {};
  formationOptions:any = {};

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

  getPhaseName(){
    return this.currentPhase.name;
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
    optionList = { name: name, opts:opts };
  }

  setFormation(formation:Formation){
    this.formation = formation;
  }

  getCall(){
    let call = '';
    this.assignments.forEach(el=>{
      //call += ' '+el.getCall();
    });
    return call;
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

export class DefensivePlaycall extends Playcall {}


import * as OffensivePackages from '../../cls/Playcalls/OffensivePackages.cls';
import * as PlayTypes from '../../cls/Playcalls/PlayTypes.cls';
import * as QBDepth from '../../cls/Playcalls/QBDepth.cls';
import * as StrongSides from '../../cls/Playcalls/StrongSides.cls';
import * as OffensiveFormations from '../../cls/Playcalls/OffensiveFormations.cls';
import * as Runs from '../../cls/Playcalls/Runs.cls';
import * as ReceiverRoutes from '../../cls/Playcalls/ReceiverRoutes.cls';
import * as BackRoutes from '../../cls/Playcalls/BackRoutes.cls';
import * as TightEndRoutes from '../../cls/Playcalls/TightEndRoutes.cls';


export class OffensivePlaycall extends Playcall {
  
  qbDepthOptions:any = {};
  strongSideOptions:any = {};
  motionOptions:any = {};
  playTypeOptions:any = {};
  runBlockingSchemeOptions:any = {};
  runBlockingSchemeOptions2:any = {};
  runCallOptions:any = {};
  passOptions:any = {};
  
  qbDepth;
  strongSide;
  motion;
  playType:PlayType;  
  runCall;
  blockingScheme;

  constructor(){
    super();
    
    this.addOptions('Personnel', this.personnelOptions, OffensivePackages);
    this.addOptions('QB Depth', this.qbDepthOptions, QBDepth);
    this.addOptions('Formation', this.formationOptions, OffensiveFormations);
    this.addOptions('Strongside', this.strongSideOptions, StrongSides);
    this.addOptions('Play Type', this.playTypeOptions, PlayTypes);
    this.addOptions('Run', this.runCallOptions, Runs);
    this.addOptions('Pass', this.passOptions, ReceiverRoutes);
    //this.addOptions('Second Read', this.passOptions, ReceiverRoutes);
    //this.addOptions('Third Read', this.passOptions, BackRoutes);

    this.currentPhase = this.personnelOptions;
    console.log('cur', this.currentPhase);
    
  }

  setPhaseOption(opt){
    switch(this.phase){
      case 0: this.personnel = opt;
      case 1: this.qbDepth = opt;
      case 2: this.formation = opt;
      case 3: this.strongSide = opt;
      case 4: this.playType = opt;
    }
    this.nextPhase();
    this.setCurrentPhase();

  }

  nextPhase(){
    this.phase++;
  }

  setCurrentPhase(){
    switch(this.phase){
      case 0 : this.currentPhase = this.personnelOptions; break;
      case 1 : this.currentPhase = this.qbDepthOptions; break;
      case 2 : this.currentPhase = this.formationOptions; break;
      case 3 : this.currentPhase = this.strongSideOptions; break;
      case 4 : this.currentPhase = this.playTypeOptions; break;
      // anything over four
      default: this.currentPhase = this.getCurrentPhaseByPlayType(); break;
    }

  }

  getCurrentPhaseByPlayType(){
    // dispatch to whatever play type we're on
    if(this.playType.name == 'Run'){
      return this.getRunPhase();
    } else if(this.playType.name == 'Pass'){
      return this.getPassPhase();
    } else if(this.playType.name == 'RPO'){
      return this.getRPOPhase();
    }

  }

  getRunPhase(){
    switch(this.phase){
      case 5 : return this.runCallOptions;
      //case 6 : return this.runBlockingSchemeOptions;
      //case 7 : return this.runBlockingSchemeOptions2;
    }

  }

  getPassPhase(){
    switch(this.phase){
      case 5 : return this.passOptions;
      //case 6 : return this.runBlockingSchemeOptions;
      //case 7 : return this.runBlockingSchemeOptions2;
    }

  }

  getRPOPhase(){
    
  }


}

