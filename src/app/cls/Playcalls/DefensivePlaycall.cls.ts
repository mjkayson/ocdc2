import { Playcall } from '../Playcalls/Playcall.cls';
import { OffensivePlaycall } from '../Playcalls/OffensivePlaycall.cls';
import { PlayType } from '../Playcalls/BaseClasses.cls';
import { PlayerFactory } from '../Player/PlayerFactory.cls'

import personnel from '../../data/Personnel/DefensivePackages.json';
import lineAlignments from '../../data/Alignments/DLine.json';
import boxAlignments from '../../data/Alignments/Box.json';
import secondaryAlignments from '../../data/Alignments/Secondary.json';
import dbAlignments from '../../data/Alignments/DB.json';

import lineCalls from '../../data/Calls/DefensiveLineCalls.json';
import coverages from '../../data/Calls/DefensiveCoverages.json';
import depths from '../../data/Calls/DefensiveDepths.json';
import blitzes from '../../data/Calls/DefensiveBlitzes.json';


export class DefensivePlaycall extends Playcall {

  selectedPosition;
  
  coverage;
  depth;
  lineAlignment;
  boxAlignment;
  dbAlignment;
  lineCall;
  blitz;

  playType = new PlayType();

  lineAlignments;
  boxAlignments;
  secondaryAlignments;
  dbAlignments;

  lineCalls;
  coverages;
  depths;
  blitzes;

  mockLineAdded:boolean = false;

  
  constructor(){
    super();
    this.personnelOptions = personnel;
    this.lineAlignments = lineAlignments;
    this.boxAlignments = boxAlignments;
    this.secondaryAlignments = secondaryAlignments;
    this.dbAlignments = dbAlignments;
    this.depths = depths;

    this.lineCalls = lineCalls;
    this.coverages = coverages;

    this.blitzes = blitzes;
    
  }

  addMockOffensiveLine(){
    if(this.mockLineAdded == true) return;
    let mockPlaycall = new OffensivePlaycall();
    mockPlaycall.setPersonnel(mockPlaycall.personnelOptions[0]);
    this.players.push(...mockPlaycall.getPlayers());
    this.mockLineAdded = true;
  }
  
  getLineAlignmentOptions(){
    if(!this.personnel) return [];
    let opts = [];
    this.lineAlignments.forEach(opt=>{
      if(opt.alignments.length == this.personnel.package[0]){
        opts.push(opt);
      }
    });
    return opts;
  }
  
  getBoxAlignmentOptions(){
    if(!this.personnel) return [];
    let opts = [];
    this.boxAlignments.forEach(opt=>{
      if(opt.alignments.length == this.personnel.package[1]){
        opts.push(opt);
      }
    });
    return opts;
  }
  
  getDBAlignmentOptions(){
    if(!this.personnel) return [];
    let opts = [];
    this.dbAlignments.forEach(opt=>{
      if(opt.alignments.length == this.personnel.package[2]){
        opts.push(opt);
      }
    });
    return opts;
  }

  getLineCallOptions(){
    if(!this.personnel) return [];
    let opts = [];
    this.lineCalls.forEach(opt=>{
      // checks there are the same number of assignments as linemen
      if(opt.assignments.length == this.personnel.package[0]){
        opts.push(opt);
      }
    });
    return opts;
  }

  getCoverageOptions(){
    if(!this.personnel) return [];
    let opts = [];
    this.coverages.forEach(opt=>{
      // checks there are the same number of assignments as players
      if(opt.assignments.length == this.personnel.package[2]){
        opts.push(opt);
      }
    });
    return opts;
  }

  getDepthOptions(){
    if(!this.coverage) return [];
    return this.depths;
  }

  getBlitzOptions(){
    if(!this.coverage) return [];
    return this.blitzes;
  }

  setPersonnel(opt){
    if(this.personnel == opt) return;

    this.ready = false;
    this.coverage = null;
    this.mockLineAdded = false;
    this.personnel = opt;
    this.players = [];
    this.personnel.positions.forEach(pos => {
      this.players.push(PlayerFactory.getPlayer(pos));
    });
    this.setLineAlignment(this.getLineAlignmentOptions()[0]);
    this.setBoxAlignment(this.getBoxAlignmentOptions()[0]);
    this.setDBAlignment(this.getDBAlignmentOptions()[0]);
    this.setLineCall(this.getLineCallOptions()[0]);
    // defaults
    //this.setOLAlignments(this.lineRunAlignment);
  }

  setLineAlignment(opt){
    this.lineAlignment = opt;
    let players = this.getPlayersByType('DL');
    if(!players){
      console.log('ALERT: trying to set DL aligments when there are no DLs!');
      return;
    } else if(opt.alignments.length != players.length){
      console.log('ALERT: wrong number of DLs ('+players.length+') for alignments ('+opt.alignments.length+'))');
      return;
    }
    players.forEach((player, i)=>{
      player.setAlignment(opt.alignments[i]);     
    });
  }

  setBoxAlignment(opt){
    this.boxAlignment = opt;
    let players = this.getPlayersByType('LB');
    if(!players){
      console.log('ALERT: trying to set LB aligments when there are no LBs!');
      return;
    } else if(opt.alignments.length != players.length){
      console.log('ALERT: wrong number of LBs ('+players.length+') for alignments ('+opt.alignments.length+'))');
      return;
    }
    players.forEach((player, i)=>{
      player.setAlignment(opt.alignments[i]);     
    });
  }

  setDBAlignment(opt){
    this.dbAlignment = opt;
    let players = this.getPlayersByType('DB');
    if(!players){
      console.log('ALERT: trying to set DB aligments when there are no DBs!');
      return;
    } else if(opt.alignments.length != players.length){
      console.log('ALERT: wrong number of DBs ('+players.length+') for alignments ('+opt.alignments.length+'))');
      return;
    }
    players.forEach((player, i)=>{
      player.setAlignment(opt.alignments[i]);     
    });
  }

  setLineCall(opt){
    this.lineCall = opt;
    let players = this.getPlayersByType('DL');
    if(!players){
      console.log('ALERT: trying to set DL assigments when there are no DLs!');
      return;
    } else if(opt.assignments.length != players.length){
      console.log('ALERT: wrong number of DLs ('+players.length+') for assignments ('+opt.assignments.length+'))');
      return;
    }
    players.forEach((player, i)=>{
      player.setAssignment(opt.assignments[i]);     
    });
    console.log(players, opt);
  }

  setCoverage(opt){
    this.coverage = opt;
    let players = this.getPlayersByType('DB');
    if(!players){
      console.log('ALERT: trying to set secondary aligments when there are no DBs!');
      return;
    } else if(opt.assignments.length != players.length){
      console.log('ALERT: wrong number of DBs ('+players.length+') for assignments ('+opt.assignments.length+'))');
      return;
    }
    players.forEach((player, i)=>{
      player.setAssignment(opt.assignments[i]);     
    });
    console.log(players, opt);
    this.ready = true;
  }

  setDepth(opt){
    this.depth = opt;
  }

  setBlitz(opt){
    this.blitz = opt;
  }

  getLineAlignment(){
    return this.lineAlignment;
  }

  getBoxAlignment(){
    return this.boxAlignment;
  }

  text(){
    let str = '';
    if(this.lineCall){
      if(!this.lineCall.doNotShowInPlaycall){
        str += ' ' + this.lineCall.name + ' ';
      }
    }
    if(this.coverage){
      str += this.coverage.name + ' ';
    }  
    if(this.blitz){
      str += this.blitz.name + ' ';
    }
    return str;
  }

  getFullText(){
    let str = '';
    if(this.personnel){
      str += '('+this.personnel.name+') ';
    }
    if(this.lineAlignment){
      if(!this.lineAlignment.doNotShowInPlaycall){
        str += this.lineAlignment.name + ' ';
      }
    }
    if(this.boxAlignment){
      if(!this.boxAlignment.doNotShowInPlaycall){
        str += this.boxAlignment.name + ' ';
      }
    }
    if(this.dbAlignment){
      if(!this.dbAlignment.doNotShowInPlaycall){
        str += this.dbAlignment.name + ' ';
      }
    }
    if(this.lineCall){
      if(!this.lineCall.doNotShowInPlaycall){
        str += this.lineCall.name + ' ';
      }
    }
    if(this.coverage){
      if(!this.coverage.doNotShowInPlaycall){
        str += this.coverage.name + ' ';
      }
    }
    if(this.blitz){
      if(!this.blitz.doNotShowInPlaycall){
        str += this.blitz.name + ' ';
      }
    }
    return str;
  }


}
