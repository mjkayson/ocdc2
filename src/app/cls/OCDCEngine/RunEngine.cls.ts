import { Siri } from '../Siri/Siri.cls';
import { OffensivePlaycall } from '../Playcalls/OffensivePlaycall.cls';
import { DefensivePlaycall } from '../Playcalls/DefensivePlaycall.cls';
import { GameService } from '../GameService/game.service';
import { PlayResult } from '../PlayResult/PlayResult.cls';
import { Play } from '../Play/Play.cls';
import { SnapSegment } from '../PlaySegment/PlaySegment.cls';
import { RunSegment } from '../PlaySegment/RunSegments.cls';
import { Config } from '../Config/Config.cls';




export class RunEngine {

  play;
  playcall_off;
  playcall_def;
  currentSegment:number = 0;

  showGrid:boolean = true;
  isStrongLeft:boolean = false;
   
    
  rows = new Array(120);
  cols = new Array(63);
  LOS:number = 35;  
  
  showNumbers = true;
  offInf = [];
  defInf = [];
  influence = [];
  currentCells = [];
  
  influenceWidth = 5;
  currentS;
  currentI;
  oTotal;
  dTotal;
  mod;
  percent;
  prob;
  probs = [];

  players = [];

  offensivePlayers;
  defensivePlayers;

  ready = false;
  constructor(play){
    this.play = play;
    // + 10 for the top endzone
    this.LOS = play.game_state_start.ytg + 10;
    this.playcall_off = play.getOffensivePlaycall();
    this.playcall_def = play.getDefensivePlaycall();
    this.offensivePlayers = this.playcall_off.getPlayers();
    this.defensivePlayers = this.playcall_def.getPlayers();
    this.players = [...this.offensivePlayers, ...this.defensivePlayers];

    this.resetGridInfluence();
  }

  step(){
    if(this.play.ended){
      console.log('ALERT: calling engine.step when the play has ended!');
      return;
    }    
    this.resetGridInfluence();
    for(var i=0;i<this.players.length;i++){
      //console.log(this.players[i]);
      this.setGridInfluence(this.players[i], 1);
    }    
    console.log('infArray', this.offInf);   
  }
  
  resetGridInfluence(){
    this.offInf = [];
    this.defInf = [];
    this.influence = [];
    for(var r=0;r<this.rows.length;r++){
      let row = [];
      for(let c=0;c<this.cols.length;c++){
        row.push(0);
      }      
      this.offInf.push(row);
      this.defInf.push(row);
      this.influence.push(row);
    }
  }

  setGridInfluence(player, phase?){
    let mod = this.getPlayerInfluence(player, phase);
    let offset = (mod.length-1)/2;
    //console.log(mod);
    let colIndex = player.x + 32;
    // LOS is yards to goal, y value is positive 'above' the LOS
    let rowIndex = 120 - this.LOS - player.y;
    // offense the influence row is 'above' the player, defense is 'below'
    let infArray;
    if(player.od == "O"){
      //console.log('setting offInf');
      rowIndex -= 1;
      infArray = this.offInf;
    } else {
      //console.log('setting defInf');
      //rowIndex -= 1;
      infArray = this.defInf;
    }       
    for(var c=0;c<mod.length;c++){
      let currentI = colIndex - offset + c;
      if(infArray[rowIndex]){
        //console.log('HERE');
        infArray[rowIndex][currentI] += mod[c];
      } else {
        console.log('ALERT: infMap row not found with r,i', rowIndex, colIndex);
      } 
    } 
  }

  getPlayerInfluence(player, phase?){
    let inf = [0,0,0];
    let pos = player.pos;
    switch(pos){
      case 'DL': inf = [2,4,5,4,2]; break;
      case 'LB': inf = [2,4,4,4,2]; break;
      case 'DB': inf = [1,2,2,3,2,2,1]; break;
      case 'OL':
      case 'C' : inf = [2,4,6,4,2]; break;
      case 'RB': inf = [1,2,3,2,1]; break;
      case 'TE': inf = [1,2,4,2,1]; break;
      case 'WR': inf = [1,2,1]; break;
    }
    // the last bit so a player's lateral movement is greater the further they are from the line
    if(phase > 1){
      inf = this.growInfluenceArray(inf, phase, player.y, player.team);
      //console.log('new inf for', player.pos);
    }
    return inf;
  }

  growInfluenceArray(inf, phase, playerY, team){
    let centerIndex = Math.round(inf.length/2) -1;
    let coreValue = inf[centerIndex];
    let add = [];
    //console.log('grow phase, playerY', phase, playerY);
    let addCount = 0;

    for(var i = 0; i < phase; i++){
      if((team == 'D' && (i+1) < playerY) || team == 'O'){
        //console.log('adding');
        add.push(coreValue);
        add.push(coreValue);
        addCount++;
      }    
    }
    //console.log('addCount', addCount);
    inf.splice(centerIndex, 0, ...add);
    return inf;
  }

  getGridInfluence(row, pos){
    if(!this.ready) return 0;
    return this.influence[row][pos];
  }

  getOTotal(phase?){
    let i = this.currentI;
    let total = 0;
    let offset = (this.influenceWidth-1)/2;    
    for(var c=0;c<this.influenceWidth;c++){      
      let currentI = i - offset + c;
      if(this.offInf[this.LOS]){
        total += this.offInf[this.LOS][currentI];
      }       
    }
    return total;
  }

  getDTotal(phase?){
    phase += 1;
    let s = this.currentS, i = this.currentI;
    let total = 0;    
    let offset = (this.influenceWidth-1)/2;      
    for(var c=0;c<this.influenceWidth;c++){      
      let currentI = i - offset + c;
      for(var cur = 0; cur < phase; cur++){
        if(this.defInf[this.LOS-1-cur]){
         total += this.defInf[this.LOS-1-cur][currentI];
        }
      }
    }
    return total;
  }

  getProbability(phase){
    //console.log(phase, this.getOTotal(), this.getDTotal(phase));
    return (1-Math.sqrt((this.getOTotal() / (this.getOTotal() + this.getDTotal(phase))))).toFixed(2);
  }

  showModTotals(s,i){
    this.currentS = s;
    this.currentI = i;
    for(var phase = 0; phase < 7; phase++){
      this.resetGridInfluence();
      for(var p=0;p<this.players.length;p++){
        //console.log(this.players[i]);
        this.setGridInfluence(this.players[p], phase);
      }
      this.probs[phase] = this.getProbability(phase);
    }
    //this.setInfluenceCellClasses();
  }

  setRunLocation(hole){
    switch(hole){
      case 0: this.showModTotals(1,3); break;
      case 1: this.showModTotals(1,1); break;
      case 2: this.showModTotals(1,5); break;
      case 3: this.showModTotals(0,6); break;
      case 4: this.showModTotals(2,0); break;
      case 5: this.showModTotals(0,4); break;
      case 6: this.showModTotals(2,2); break;
      case 7: this.showModTotals(0,2); break;
      case 8: this.showModTotals(2,4); break;
    }
  }

  getProbs(){
    return this.probs;
  }

}