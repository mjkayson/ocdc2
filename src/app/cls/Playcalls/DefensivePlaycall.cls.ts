import { Playcall } from '../Playcalls/Playcall.cls';
import { PlayType } from '../Playcalls/BaseClasses.cls';

import personnel from '../../data/Personnel/DefensivePackages.json';
import lineAlignments from '../../data/Alignments/DLine.json';
import boxAlignments from '../../data/Alignments/Box.json';
import secondaryAlignments from '../../data/Alignments/Secondary.json';

import lineCalls from '../../data/Calls/DefensiveLineCalls.json';
import freeCalls from '../../data/Calls/DefensiveFreeCalls.json';
import coverages from '../../data/Calls/DefensiveCoverages.json';
import depths from '../../data/Calls/DefensiveDepths.json';
import blitzes from '../../data/Calls/DefensiveBlitzes.json';

import formations from '../../data/Formations/DefensiveFormations.json';

export class DefensivePlaycall extends Playcall {

  selectedPosition;
  
  coverage;
  depth;
  lineCall;
  blitz;

  playType = new PlayType();

  lineAlignments;
  boxAlignments;
  secondaryAlignments;

  lineCalls;
  freeCalls;
  coverages;
  depths;
  formations;
  blitzes;

  
  constructor(){
    super();
    this.personnelOptions = personnel;
    this.lineAlignments = lineAlignments;
    this.boxAlignments = boxAlignments;
    this.secondaryAlignments = secondaryAlignments;
    this.depths = depths;

    this.lineCalls = lineCalls;
    this.freeCalls = freeCalls;
    this.coverages = coverages;

    this.formations = formations;
    this.blitzes = blitzes;
    
    console.log('personnel', this.personnelOptions);
    console.log('formations', this.formations);
    console.log('line calls', this.lineCalls);
    console.log('coverages', this.coverages);
    
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

  getLineOptions(){
    if(!this.personnel || !this.formation) return [];
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
    if(!this.personnel || !this.formation) return [];
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
    this.formation = null;
    this.lineCall = null;
    this.coverage = null;
    this.depth = null;
    this.blitz = null;
    this.ready = false;
    this.personnel = opt;
  }

  setFormation(opt){
    if(this.formation == opt) return;
    this.lineCall = null;
    this.coverage = null;
    this.depth = null;
    this.blitz = null;
    this.ready = false;
    this.formation = opt;

    console.log(this.getLineAlignment());
    console.log(this.getBoxAlignment());
  }

  setLineCall(opt){
    this.lineCall = opt;
  }

  setCoverage(opt){
    this.coverage = opt;
    this.ready = true;
    this.depth = null;
    this.blitz = null;
  }

  setDepth(opt){
    this.depth = opt;
  }

  setBlitz(opt){
    this.blitz = opt;
  }

  getLineAlignment(){
    if(!this.formation) return [{}];
    return this.lineAlignments[this.formation.alignments[0]];
  }

  getBoxAlignment(){
    return this.boxAlignments[this.formation.alignments[1]];
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
    return 'playcall here'; //this.formation.text() + ' ' + this.text();
  }


}
