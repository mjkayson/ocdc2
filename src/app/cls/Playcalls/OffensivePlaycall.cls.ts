import { Playcall } from '../Playcalls/Playcall.cls';
import { PlayType } from '../Playcalls/BaseClasses.cls';

import personnel from '../../data/Personnel/OffensivePackages.json';
import snapTypes from '../../data/Calls/SnapTypes.json';
import playTypes from '../../data/Calls/PlayTypes.json';
import runCalls from '../../data/Calls/RunCalls.json';
import RBRoutes from '../../data/Calls/RBRoutes.json';
import TERoutes from '../../data/Calls/TERoutes.json';
import WRRoutes from '../../data/Calls/WRRoutes.json';
import runBlockingSchemes from '../../data/Calls/RunBlockingSchemes.json';
import passBlockingSchemes from '../../data/Calls/PassBlockingSchemes.json';

import formations from '../../data/Formations/OffensiveFormations.json';
import LineAlignments from '../../data/Alignments/OLine.json';
import RBAlignments from '../../data/Alignments/RB.json';
import WRAlignments from '../../data/Alignments/WR.json';

export class OffensivePlaycall extends Playcall {

  selectedPosition;
  
  playType;
  snapType;
  formation;
  lineRunAlignment;
  linePassAlignment;
  RBAlignment;
  WRAlignment;
  strongSide;
  runCall;
  blockingScheme;
  progression = [];

  snapTypes;
  formations;
  playTypes;
  runCalls;
  RBAlignments;
  WRAlignments;
  RBRoutes;
  WRRoutes;
  TERoutes;
  passBlockingSchemes;
  runBlockingSchemes;

  strongSides = ['Left','Right']
  
  constructor(){
    super();
    this.personnelOptions = personnel;
    this.runCalls = runCalls;
    this.snapTypes = snapTypes;
    this.formations = formations;
    this.playTypes = playTypes;
    this.runBlockingSchemes = runBlockingSchemes;
    this.passBlockingSchemes = passBlockingSchemes;

    this.RBAlignments = RBAlignments;
    this.WRAlignments = WRAlignments;

    this.RBRoutes = RBRoutes;
    this.TERoutes = TERoutes;
    this.WRRoutes = WRRoutes;

    this.lineRunAlignment  = LineAlignments.run;
    this.linePassAlignment = LineAlignments.pass;

    console.log(this.RBAlignments);
    console.log(this.WRAlignments);
  }
  
  getFormationOptions(){
    if(!this.personnel) return [];
    let opts = [];
    this.formations.forEach(formation=>{      
      if(formation.personnel == this.personnel.name){
        opts.push(formation);
      }
    });
    return opts;
  }

  getRunCallOptions(){

  }

  getRunBlockingOptions(){

  }

  getPassBlockingOptions(){

  }


  getPlayTypeOptions(){
    if(!this.personnel || !this.formation) return [];
    let opts = [];
    this.playTypes.forEach(opt=>{
      // checks there are the same number of assignments as linemen
      if(opt.assignments.length == this.personnel.package[0]){
        opts.push(opt);
      }
    });
    return opts;
  }

  setPersonnel(opt){
    if(this.personnel == opt) return;
    this.RBAlignment = null;
    this.WRAlignment = null;
    this.strongSide = null;
    this.playType = null;
    this.snapType = null;
    this.runCall = null;
    this.blockingScheme = null;
    this.progression = [];
    this.ready = false;
    this.personnel = opt;
  }

  setRBAlignment(opt){
    this.RBAlignment = opt;
  }

  setWRAlignment(opt){
    this.WRAlignment = opt;
  }

  setPlayType(opt){
    if(this.playType == opt) return;
    this.ready = false;
    this.playType = opt;
  }

  setStrongSide(opt){
    this.strongSide = opt;
  }

  setSnapType(opt){
    this.snapType = opt;
  }

  setRunCall(opt){
    this.runCall = opt;
  }

  setBlockingScheme(opt){
    this.blockingScheme = opt;
    this.ready = true;
  }

  getRBAlignmentOptions(){
    if(!this.personnel) return [];
    let opts = [];
    this.RBAlignments.forEach(opt=>{
      // checks there are the same number of alignments as RBs
      if(opt.alignments.length == this.personnel.package[0]){
        opts.push(opt);
      }
    });
    return opts;
  }

  getWRAlignmentOptions(){
    if(!this.personnel) return [];
    let opts = [];
    this.WRAlignments.forEach(opt=>{
      // checks there are the same number of alignments as WRs
      if(opt.alignments.length == this.personnel.package[2]){
        opts.push(opt);
      }
    });
    return opts;
  }

  getLineAlignment(){
    switch(this.playType){
      case 'Run':  return this.lineRunAlignment;
      case 'RPO':  return this.lineRunAlignment;
      case 'Pass': return this.linePassAlignment;
      default:     return this.lineRunAlignment;
    }
  }

  getPersonnel(){
    return this.personnel;
  }

  getSnapType(){
    return this.snapType;
  }

  getRBAlignment(){
    return this.RBAlignment;
  }

  getWRAlignment(){
    return this.WRAlignment;
  }

  getStrongSide(){
    return this.strongSide;
  }

  isRun(){
    return this.playType == 'Run';
  }

  isPass(){
    return this.playType == 'Pass';
  }

  isRPO(){
    return this.playType == 'RPO';
  }

  isStrongsideRun(){
    return this.playType == 'Run'
           && (
            (this.strongSide == 'Right' && parseInt(this.runCall.name)%2 == 0)
            || (this.strongSide == 'Left' && parseInt(this.runCall.name)%2 != 0)
           );            
  }

  isInsideRun(){
    return this.playType == 'Run'
           && (parseInt(this.runCall.name.charAt(1)) < 5);            
  }

  getFullText(){
    let str = '';
    if(this.personnel){
      str += '('+this.personnel.name+') ';
    }
    if(this.snapType){
      if(!this.snapType.doNotShowInPlaycall){
        str += this.snapType.name + ' ';
      }
    }
    if(this.RBAlignment){
      if(!this.RBAlignment.doNoShowInPlaycall){
        str += this.RBAlignment.name + ' ';
      }
    }
    if(this.WRAlignment){
      if(!this.WRAlignment.doNoShowInPlaycall){
        str += this.WRAlignment.name + ' ';
      }
    }
    if(this.strongSide){
      str += this.strongSide + ' ';
    }
    // RUNS
    if(this.runCall){
      str += this.runCall.name + ' ';
    }

    if(this.blockingScheme){
      str += this.blockingScheme.name + ' ';
    }

    return str;
  }


}
