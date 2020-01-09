import { Playcall } from '../Playcalls/Playcall.cls';
import { PlayType } from '../Playcalls/BaseClasses.cls';

import personnel from '../../data/Personnel/DefensivePackages.json';
import lineAlignments from '../../data/Alignments/DLine.json';
import boxAlignments from '../../data/Alignments/Box.json';
import secondaryAlignments from '../../data/Alignments/Secondary.json';

import lineCalls from '../../data/Calls/DefensiveLineCalls.json';
import coverages from '../../data/Calls/DefensiveCoverages.json';
import depths from '../../data/Calls/DefensiveDepths.json';
import blitzes from '../../data/Calls/DefensiveBlitzes.json';

import formations from '../../data/Formations/DefensiveFormations.json';

export class DefensivePlaycall extends Playcall {

  selectedPosition;
  
  coverage;
  depth;
  lineAlignment;
  boxAlignment;
  lineCall;
  blitz;

  playType = new PlayType();

  lineAlignments;
  boxAlignments;
  secondaryAlignments;

  lineCalls;
  coverages;
  depths;
  blitzes;

  
  constructor(){
    super();
    this.personnelOptions = personnel;
    this.lineAlignments = lineAlignments;
    this.boxAlignments = boxAlignments;
    this.secondaryAlignments = secondaryAlignments;
    this.depths = depths;

    this.lineCalls = lineCalls;
    this.coverages = coverages;

    this.blitzes = blitzes;
    
    console.log('personnel', this.personnelOptions);
    console.log('line calls', this.lineCalls);
    console.log('coverages', this.coverages);
    
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
    this.lineAlignment = null;
    this.boxAlignment = null;
    this.lineCall = null;
    this.coverage = null;
    this.depth = null;
    this.blitz = null;
    this.ready = false;
    this.personnel = opt;
  }

  setLineAlignment(opt){
    if(this.lineAlignment == opt) return;
    this.lineCall = null;
    this.coverage = null;
    this.depth = null;
    this.blitz = null;
    this.ready = false;
    this.lineAlignment = opt;
  }

  setBoxAlignment(opt){
    if(this.boxAlignment == opt) return;
    this.lineCall = null;
    this.coverage = null;
    this.depth = null;
    this.blitz = null;
    this.ready = false;
    this.boxAlignment = opt;

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
    if(this.depth){
      if(!this.depth.doNotShowInPlaycall){
        str += this.depth.name + ' ';
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
