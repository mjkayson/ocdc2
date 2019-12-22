import { Formation } from './Formation.cls';
import { PersonnelPackage } from './PersonnelPackage.cls';
import { PlaycallElement } from './BaseClasses.cls';
import { PlayType } from '../Playcalls/BaseClasses.cls';

import { PassRoute } from './BaseClasses.cls';


export class Playcall {  
  
  //personnel:PersonnelPackage = new PersonnelPackage();

  personnelOptions:any = [];
  formationOptions:any = [];

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


import * as DefensivePackages from '../../cls/Playcalls/DefensivePackages.cls';

export class DefensivePlaycall extends Playcall {

  selectedPosition;

  
  constructor(){
    super();
    
    this.addOptions('Personnel', this.personnelOptions, DefensivePackages);

    this.currentPhase = this.personnelOptions[0];
    
  }  


  
  getPhaseOptions(){
    if(this.phase > 4){
      return this.getCallPhaseOptions();
    }
    return this.currentPhase.opts;
  }

  
  getCallPhaseOptions(){
    /*
    if(this.playType.name == 'Pass' && this.selectedPosition){
      return this.getPatternsByPosition(this.selectedPosition);
    } else if(this.playType.name == 'Run'){
      switch(this.phase){
        case 5: return this.runCallOptions[0].opts;
        case 6: return this.runBlockingSchemeOptions[0].opts;
        case 7: return this.runBlockingSchemeOptions[0].opts;

      }
    }
    */
  }

  

  setPhaseOption(opt){
    switch(this.phase){
      case 0: this.personnel = opt; break;
      case 1: this.formation = opt; break;
      case 2: this.formation.setQbDepth(opt); break;
      case 3: this.formation.setStrongSide(opt); break;
      case 4: this.playType = opt; break;
      //default:
        //this.setOptionByPlayType(opt);
    }

    this.nextPhase();
    this.setCurrentPhase();

  }

  phaseHasPositionOptions(){
    if(this.phase < 5) return false;
    return this.playType.name == 'Pass';
  }

  getPhasePositionOptions(){
    return this.formation.eligibleReceivers;
  }

  setPhasePositionOption(pos){
    let recs = this.formation.eligibleReceivers;
    for(var i=0;i<recs.length;i++){
      recs[i].selected = false;
    }
    pos.selected = !pos.selected;
    this.selectedPosition = pos;
  }

}


import * as OffensivePackages from '../../cls/Playcalls/OffensivePackages.cls';
import * as PlayTypes from '../../cls/Playcalls/PlayTypes.cls';
import * as QBDepth from '../../cls/Playcalls/QBDepth.cls';
import * as StrongSides from '../../cls/Playcalls/StrongSides.cls';
import * as OffensiveFormations from '../../cls/Playcalls/OffensiveFormations.cls';
import * as Runs from '../../cls/Playcalls/Runs.cls';
import * as ReceiverRoutes from '../../cls/Playcalls/ReceiverRoutes.cls';
import * as BackRoutes from '../../cls/Playcalls/BackRoutes.cls';
import * as TightEndRoutes from '../../cls/Playcalls/TightEndRoutes.cls';
import * as RunBlockingSchemes from '../../cls/Playcalls/RunBlockingSchemes.cls';


export class OffensivePlaycall extends Playcall {
  
  qbDepthOptions:any = [];
  strongSideOptions:any = [];
  motionOptions:any = [];
  playTypeOptions:any = [];
  runBlockingSchemeOptions:any = [];
  runBlockingSchemeOptions2:any = [];
  runCallOptions:any = [];
  passOptions:any = [];

  receiverRoutes:any = [];
  tightEndRoutes:any = [];
  backRoutes:any = [];
  
  qbDepth;
  strongSide;
  motion;
  playType:PlayType;  
  
  selectedPosition;

  progression:any = [];

  runCall;
  blockingSchemes:any = [];

  constructor(){
    super();
    
    this.addOptions('Personnel', this.personnelOptions, OffensivePackages);
    this.addOptions('QB Depth', this.qbDepthOptions, QBDepth);
    this.addOptions('Formation', this.formationOptions, OffensiveFormations);
    this.addOptions('Strongside', this.strongSideOptions, StrongSides);
    this.addOptions('Play Type', this.playTypeOptions, PlayTypes);
    this.addOptions('Run', this.runCallOptions, Runs);
    
    this.addOptions('Routes', this.receiverRoutes, ReceiverRoutes);
    this.addOptions('Routes', this.tightEndRoutes, TightEndRoutes);
    this.addOptions('Routes', this.backRoutes, BackRoutes);
    //this.addOptions('Second Read', this.passOptions, ReceiverRoutes);
    //this.addOptions('Third Read', this.passOptions, BackRoutes);
    
    this.addOptions('Blocking Scheme', this.runBlockingSchemeOptions, RunBlockingSchemes);

    this.currentPhase = this.personnelOptions[0];
    
  }  

  getPhaseOptions(){
    if(this.phase > 4){
      return this.getCallPhaseOptions();
    }
    return this.currentPhase.opts;
  }

  getCallPhaseOptions(){
    if(this.playType.name == 'Pass' && this.selectedPosition){
      return this.getPatternsByPosition(this.selectedPosition);
    } else if(this.playType.name == 'Run'){
      switch(this.phase){
        case 5: return this.runCallOptions[0].opts;
        case 6: return this.runBlockingSchemeOptions[0].opts;
        case 7: return this.runBlockingSchemeOptions[0].opts;

      }
    }
  }

  setPhaseOption(opt){
    switch(this.phase){
      case 0: this.personnel = opt; break;
      case 1: this.formation = opt; break;
      case 2: this.formation.setQbDepth(opt); break;
      case 3: this.formation.setStrongSide(opt); break;
      case 4: this.playType = opt; break;
      default:
        this.setOptionByPlayType(opt);
    }

    this.nextPhase();
    this.setCurrentPhase();

  }

  setOptionByPlayType(opt){
    if(this.playType.name == 'Run'){
      return this.setRunPhase(opt);
    } else if(this.playType.name == 'Pass'){
      return this.setPassPhase(opt);
    } else if(this.playType.name == 'RPO'){
      return this.setRPOPhase(opt);
    }
  }


  setCurrentPhase(){
    switch(this.phase){
      case 0 : this.currentPhase = this.personnelOptions[0]; break;
      case 1 : this.currentPhase = this.formationOptions[0]; break;
      case 2 : this.currentPhase = this.qbDepthOptions[0]; break;
      case 3 : this.currentPhase = this.strongSideOptions[0]; break;
      case 4 : this.currentPhase = this.playTypeOptions[0]; break;
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
      case 5 : return this.runCallOptions[0];
      //case 6 : return this.runBlockingSchemeOptions;
      //case 7 : return this.runBlockingSchemeOptions2;
    } 

  }

  setRunPhase(opt){
    switch(this.phase){
      case 5: this.runCall = opt; break;
      default: this.blockingSchemes.push(opt);
    }
  }

  getPassPhase(){
    return this.getPatternsByPosition(this.selectedPosition);
  }

  getPatternsByPosition(pos){
    if(!pos) return [];
    switch(pos.patternType){
      case 'WR': return this.receiverRoutes[0].opts;
      case 'TE': return this.tightEndRoutes[0].opts;
      case 'RB': return this.backRoutes[0].opts;
    }
    return [];
  }

  setPassPhase(opt){
    if(this.selectedPosition && opt.type == 'PassRoute'){
      this.selectedPosition.setAssignment(opt); 
      this.selectedPosition.complete = true;
      this.progression.push(this.selectedPosition);      
      this.selectedPosition.selected = false;
      this.ready = true;
      //this.selectedPosition = null;
    }
  }

  getRPOPhase(){
    
  }

  setRPOPhase(opt){
    
  }

  phaseHasPositionOptions(){
    if(this.phase < 5) return false;
    return this.playType.name == 'Pass';
  }

  getPhasePositionOptions(){
    return this.formation.eligibleReceivers;
  }

  setPhasePositionOption(pos){
    let recs = this.formation.eligibleReceivers;
    for(var i=0;i<recs.length;i++){
      recs[i].selected = false;
    }
    pos.selected = !pos.selected;
    this.selectedPosition = pos;
  }

  getFullText(){
    return this.formation.text() + ' ' + this.text();
  }

  text(){
    switch(this.playType.name){
      case 'Run' : return this.getRunText();
      case 'Pass': return this.getPassText();
      case 'RPO' : return this.getRPOText();
    }
  }

  getRunText(){
    let str = '';
    if(this.runCall){
      str += this.runCall.name;
    }
    if(this.blockingSchemes.length){
      this.blockingSchemes.forEach(el=>{
        str += ' ' + el.name;
      });
    }
    return str;
  }

  getPassText(){
    let str = '';
    if(this.progression.length){
      this.progression.forEach((rec, i)=>{
        if(i>0) str += ' - ';
        str += rec.letter + ' ' + rec.getAssignment().name;        
      });
    }
    return str;
  }

  getRPOText(){
    return 'its an rpo!';
  }


}

