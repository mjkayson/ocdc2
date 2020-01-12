import { Playcall } from '../Playcalls/Playcall.cls';
import { PlayerFactory } from '../Player/PlayerFactory.cls'

import personnel from '../../data/Personnel/OffensivePackages.json';
import snapTypes from '../../data/Calls/SnapTypes.json';
import playTypes from '../../data/Calls/PlayTypes.json';
import runCalls from '../../data/Calls/RunCalls.json';
import RBRoutes from '../../data/Calls/RBRoutes.json';
import TERoutes from '../../data/Calls/TERoutes.json';
import WRRoutes from '../../data/Calls/WRRoutes.json';
import runBlockingSchemes from '../../data/Calls/RunBlockingSchemes.json';
import passBlockingSchemes from '../../data/Calls/PassBlockingSchemes.json';

import OHuddle from '../../data/Alignments/OHuddle.json';
import LineAlignments from '../../data/Alignments/OLine.json';
import QBAlignments from '../../data/Alignments/QB.json';
import RBAlignments from '../../data/Alignments/RB.json';
//import TEAlignments from '../../data/Alignments/TE.json';
import WRAlignments from '../../data/Alignments/WR.json';

export class OffensivePlaycall extends Playcall {

  selectedPosition;
  
  playType;
  snapType;
  formation;
  lineRunAlignment;
  linePassAlignment;
  lineAlignment;
  QBAlignment;
  RBAlignment;
  //TEAlignment;
  WRAlignment;
  strongSide;
  runCall;
  blockingScheme;
  progression = [];

  snapTypes;
  formations;
  playTypes;
  runCalls;
  QBAlignments;
  RBAlignments;
  WRAlignments;
  //TEAlignments;
  RBRoutes;
  WRRoutes;
  TERoutes;
  passBlockingSchemes;
  runBlockingSchemes;

  strongSides = [{name:'Left'},{name:'Right'}]
  
  constructor(){
    super();
    this.personnelOptions = personnel;
    this.runCalls = runCalls;
    this.snapTypes = snapTypes;
    this.playTypes = playTypes;
    this.runBlockingSchemes = runBlockingSchemes;
    this.passBlockingSchemes = passBlockingSchemes;

    this.QBAlignments = QBAlignments;
    this.RBAlignments = RBAlignments;
    //this.TEAlignments = TEAlignments;
    this.WRAlignments = WRAlignments;

    this.RBRoutes = RBRoutes;
    this.TERoutes = TERoutes;
    this.WRRoutes = WRRoutes;

    this.lineRunAlignment  = LineAlignments[0];
    this.linePassAlignment = LineAlignments[1];
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
    this.players = [];
    this.personnel.positions.forEach(pos => {
      this.players.push(PlayerFactory.getPlayer(pos));
    });
    // defaults
    this.setOLAlignments(this.lineRunAlignment);
    this.setStrongSide(this.strongSides[1]);
    this.setQBAlignment(this.QBAlignments[0]);
  }

  getPlayersByPosition(pos){
    let p = [];
    this.players.forEach(player=>{
      if(player.pos == pos){
        p.push(player);
      }
    });
    return p;
  }

  getPlayersByType(type){
    let p = [];
    this.players.forEach(player=>{
      if(player.type == type){
        p.push(player);
      }
    });
    return p;
  }

  setQBAlignment(opt){
    //if(this.QBAlignment == opt) return;
    this.QBAlignment = opt;
    let players = this.getPlayersByPosition('QB');
    if(!players){
      console.log('ALERT: trying to set QB aligments when there are no QBs!');
      return;
    } else if(opt.alignments.length != players.length){
      console.log('ALERT: wrong number of QBs ('+players.length+') for alignments ('+opt.alignments.length+'))');
      return;
    }
    players.forEach((player, i)=>{
      player.setAlignment(opt.alignments[i]);     
    });
  }

  setRBAlignments(opt){
    //if(this.RBAlignment == opt) return;
    this.RBAlignment = opt;
    let players = this.getPlayersByType('B');
    if(!players){
      console.log('ALERT: trying to set RB aligments when there are no RBs! (but is this an empty set?)');
      return;
    } else if(opt.alignments.length != players.length){
      console.log('ALERT: wrong number of RBs ('+players.length+') for alignments ('+opt.alignments.length+'))');
      return;
    }
    players.forEach((player, i)=>{
      player.setAlignment(opt.alignments[i]);     
    });
  }

  setWRAlignments(opt){
    //if(this.WRAlignment == opt) return;
    let players = this.getPlayersByType('R');
    if(!players){
      console.log('ALERT: trying to set WR/TE aligments when there are none!');
      return;
    } else if(opt.alignments.length != players.length){
      console.log('ALERT: wrong number of WRs & TEs ('+players.length+') for alignments ('+opt.alignments.length+'))');
      return;
    }
    

    this.WRAlignment = opt;
    // TODO: currently this ignores whether the player is a TE or a WR,
    // simply has TE alignments first (in the json file) to assign things more-or-less correctly
    players.forEach((player, i)=>{
      player.setAlignment(opt.alignments[i]);
    });
    
  }

  setOLAlignments(opt){
    this.lineAlignment = opt;
    let players = this.getPlayersByPosition('OL');
    if(!players){
      console.log('ALERT: trying to set OL aligments when there are no OLs!');
      return;
    } else if(opt.alignments.length != players.length){
      console.log('ALERT: wrong number of OLs ('+players.length+') for alignments ('+opt.alignments.length+'))');
      return;
    }
    players.forEach((player, i)=>{
      player.setAlignment(opt.alignments[i]);     
    });
  }

  setPlayType(opt){
    if(this.playType == opt) return;
    this.ready = false;
    this.playType = opt;
    if(opt.name == 'Pass'){
      this.setOLAlignments(this.linePassAlignment);
    } else {
      this.setOLAlignments(this.lineRunAlignment);
    }
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
      if(opt.alignments.length == this.getPlayersByType('R').length){
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
      str += this.strongSide.name + ' ';
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
