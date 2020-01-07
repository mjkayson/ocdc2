import { Playcall } from '../Playcalls/Playcall.cls';
import { PlayType } from '../Playcalls/BaseClasses.cls';
import * as DefensivePackages from '../../cls/Playcalls/DefensivePackages.cls';
import * as DefensiveFormations from '../../cls/Playcalls/DefensiveFormations.cls';
import * as DefensiveShifts from '../../cls/Playcalls/DefensiveShifts.cls';
import * as Stunts from '../../cls/Playcalls/Stunts.cls';
import * as Coverages from '../../cls/Playcalls/Coverages.cls';
import * as Blitzes from '../../cls/Playcalls/Blitzes.cls';

import asd from '../../data/Data.json';

export class DefensivePlaycall extends Playcall {

  selectedPosition;
  shiftOptions:any = [];
  stuntOptions:any = [];
  coverageOptions:any = [];
  blitzOptions:any = [];
  testOptions;

  stunt;
  coverage;
  blitzes:any = [];

  playType = new PlayType();

  
  constructor(){
    super();
    
    this.addOptions('Personnel', this.personnelOptions, DefensivePackages);
    this.addOptions('Formation', this.formationOptions, DefensiveFormations);
    this.addOptions('Shift', this.shiftOptions, DefensiveShifts);
    this.addOptions('Stunt', this.stuntOptions, Stunts);
    this.addOptions('Coverage', this.coverageOptions, Coverages);
    this.addOptions('Blitz', this.blitzOptions, Blitzes);
    this.currentPhase = this.personnelOptions[0];
    
    this.testOptions = asd;
    console.log('json data', this.testOptions);
    
  }
  
  getPhaseOptions(){
    return this.currentPhase.opts;
  }
  
  setCurrentPhase(){
    switch(this.phase){
      case 0 : this.currentPhase = this.personnelOptions[0]; break;
      case 1 : this.currentPhase = this.formationOptions[0]; break;
      case 2 : this.currentPhase = this.shiftOptions[0]; break;
      case 3 : this.currentPhase = this.stuntOptions[0]; break;
      case 4 : this.currentPhase = this.coverageOptions[0]; break;
      case 5 : this.currentPhase = this.blitzOptions[0]; break;
      case 6 : this.currentPhase = this.blitzOptions[0]; break;
    }

  }  

  setPhaseOption(opt){
    switch(this.phase){
      case 0: this.personnel = opt; break;
      case 1: this.formation = opt; break;
      case 2: this.formation.setShift(opt); break;
      case 3: this.setStunt(opt); break;
      case 4: this.ready = true; this.setCoverage(opt); break;
      case 5: this.setBlitzPhase(opt); break;
      case 6: this.setBlitzPhase(opt); break;
      //default:
        //this.setOptionByPlayType(opt);
    }

    this.nextPhase();
    this.setCurrentPhase();

  }

  setStunt(opt){
    this.stunt = opt;
  }

  setCoverage(opt){
    this.coverage = opt;
  }

  phaseHasPositionOptions(){
    return this.phase >= 5? true : false;
  }

  getPhasePositionOptions(){
    return this.formation.blitzers;
  }

  setPhasePositionOption(pos){
    let blitzers = this.formation.blitzers;
    for(var i=0;i<blitzers.length;i++){
      blitzers[i].selected = false;
    }
    pos.selected = !pos.selected;
    this.selectedPosition = pos;
  }
  
  setBlitzPhase(opt){
    if(this.selectedPosition){
      this.selectedPosition.setAssignment(opt); 
      this.selectedPosition.complete = true;
      this.blitzes.push(this.selectedPosition);      
      this.selectedPosition.selected = false;
    }
  }

  text(){
    let str = '';
    if(this.stunt){
      if(!this.stunt.doNotShowInPlaycall){
        str += ' ' + this.stunt.name + ' ';
      }
    }
    if(this.coverage){
      str += this.coverage.name + ' ';
    }    
    this.blitzes.forEach((rec, i)=>{
      if(i>0) str += ' - ';
      str += rec.letter + ' ' + rec.getAssignment().name;   
    });
    return str;
  }

  getFullText(){
    return this.formation.text() + ' ' + this.text();
  }


}
