import { Component, OnInit, Input, ViewChild, ViewChildren } from '@angular/core';

@Component({
  selector: 'line-grid',
  templateUrl: './line-grid.component.html',
  styleUrls: ['./line-grid.component.scss'],
})
export class LineGridComponent implements OnInit {

  @Input() type;
  @ViewChild('POA', {static: false}) POA:any;
  @ViewChildren('A') PositionEl:any;

  showGrid:boolean = true;
   
  rows = [
    1,2,3,4,5,6,7,8,9,10,11,12,13,14,15
  ];

  yOffset = 7;
  showNumbers = true;
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
  
  segments = [1,2,3];
  segmentLength = 7;
  cols = [
    [10,9,8,7,6,5,4],
    [3,2,1,0,1,2,3],
    [4,5,6,7,8,9,10]
  ];

  players:any = [
    // OFFENSE
    // LINE
    { pos: 'OL', team: 'O', x: -4, y: 0, assignment: '' },
    { pos: 'OL', team: 'O', x: -2, y: 0, assignment: '' },
    { pos: 'C', team: 'O',  x: 0,  y: 0, assignment: '' },
    { pos: 'OL', team: 'O', x: 2,  y: 0, assignment: '' },
    { pos: 'OL', team: 'O', x: 4,  y: 0, assignment: '' },
    // QB
    { pos: 'QB', team: 'O', x: 0,  y: -1, assignment: '' },
    // WRs & RBs
    { pos: 'TE', team: 'O', x: 6,  y: 0, assignment: '' },
    { pos: 'WR', team: 'O', x: 0,  y: -3, assignment: '' },
    { pos: 'WR', team: 'O', x: 0,  y: -5, assignment: '' },

    // DEFENSE
    // DLINE
    { pos: 'DL', team: 'D', x: -4, y: 1, assignment: '' },
    { pos: 'DL', team: 'D', x: -1, y: 1, assignment: '' },
    { pos: 'DL', team: 'D', x: 2,  y: 1, assignment: '' },
    { pos: 'DL', team: 'D', x: 6,  y: 1, assignment: 'weak' },
    // LBs,
    { pos: 'LB', team: 'D', x: -3,  y: 3, assignment: '' },
    { pos: 'LB', team: 'D', x: 1,  y: 3, assignment: '' },
    { pos: 'LB', team: 'D', x: 5,  y: 2, assignment: '' },
    // DBs,
    { pos: 'DB', team: 'D', x: 6,  y: 5, assignment: '' }
  ]

  ready = false;

  constructor() {}

  ngOnInit() {
    this.resetGridInfluence();
    for(var i=0;i<this.players.length;i++){
      this.players[i].rsi = this.getRSI(this.players[i]);
      //console.log(this.players[i]);
      this.setGridInfluence(this.players[i], 1);
    }
    this.ready = true;
  }

  hasPlayer(row, segment, pos){
    let has = false;
    this.players.forEach(player=>{
      let rsi = player.rsi;
      if((rsi.r == row) && (rsi.s == segment) && (rsi.i == pos)) has = true;

    });
    return has;
  }

  getRSI(player){
    let r,s,i;
    let x = player.x, y = player.y;

    // distance form LoS
    r = this.rows.length - this.yOffset - y;
    // and adjust to leave two rows in the centre
    if(this.showNumbers){
      if(r < this.yOffset+1){
        r -= 1;
      } else {
        r += 1;
      }
    }

    // segment 1 is -19 to -7, segment 2 is -6 to 6, segment 3 is 7-19
    // positions are 0-12 (index) within the segment
    if(x < -3){
      s = 1;
      i = 10 + x;
    } else if(x < 4){
      s = 2;
      i = 3 + x;
    } else {
      s = 3;
      i = x - 4;
    }

    return {r:r,s:s,i:i};    
  }  

  getPlayerClass(row, segment, pos){
    let str = 'player ';
    this.players.forEach(player=>{
      let rsi = player.rsi;
      if((rsi.r == row) && (rsi.s == segment) && (rsi.i == pos)){
        str += player.pos;
      }
    });
    return str;
  }

  resetGridInfluence(){
    this.influence = [];
    for(var r=0;r<this.rows.length;r++){
      let seg = [];
      for(var s=0;s<this.cols.length;s++){
        let a = [];
        for(let c=0;c<this.cols[s].length;c++){
          a.push(0);
        }
        seg.push(a)        
      }
      this.influence.push(seg);  
    }
  }

  setGridInfluence(player, phase?){
    let r = player.rsi.r, s = player.rsi.s - 1, i = player.rsi.i;
    if(r < 8){
      //console.log(r,s,i, this.influence[r+1][s][i]);
      let mod = this.getPlayerInfluence(player, phase);
      let offset = (mod.length-1)/2;
       
      for(var c=0;c<mod.length;c++){
        let currentI = i - offset + c;
        let currentS = s;
        // rudimentary assignment
        if(player.assignment == 'strong'){
          currentI++;
        } else if(player.assignment == 'weak'){
          currentI--;
        }

        if(currentI < 0){
          currentS--;
          currentI += this.segmentLength;
        } else if(currentI > (this.segmentLength-1)){
          currentS++;
          currentI -= this.segmentLength;

        }
        if(this.influence[r+1][currentS]){
          this.influence[r+1][currentS][currentI] += mod[c];
        }

      }
    }
    else if(r  == 9){
      //console.log(r,s,i, this.influence[r+1][s][i]);
      let mod = this.getPlayerInfluence(player);
      let offset = (mod.length-1)/2;
       
      for(var c=0;c<mod.length;c++){
        let currentI = i - offset + c;
        let currentS = s;
        if(currentI < 0){
          currentS--;
          currentI += this.segmentLength;
        } else if(currentI > (this.segmentLength-1)){
          currentS++;
          currentI -= this.segmentLength;

        }
        if(this.influence[r-1][currentS]){
          this.influence[r-1][currentS][currentI] += mod[c];
        }

      }
    }
    
  }

  getInfluenceClass(r,i,pos){
    let str = 'number ';
    let inf = this.getGridInfluence(r,i,pos);
    if(inf > 7){
      str += 'influence_high';
    } else if(inf > 5){
      str += 'influence_med';
    } else if(inf > 2){
      str += 'influence_low';
    } else {
      
    }
    if(this.currentCells.includes(i+''+pos)){
      str += " highOpacity";
    } else {
      str += " lowOpacity";
    }
    //console.log(str);
    return str;
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

  getGridInfluence(row, segment, pos){
    if(!this.ready) return 0;
    return this.influence[row][segment][pos];
  }

  getOTotal(){
    let s = this.currentS, i = this.currentI;
    let total = 0;
    let offset = (this.influenceWidth-1)/2;  
    
    for(var c=0;c<this.influenceWidth;c++){
      
      let currentI = i - offset + c;
      let currentS = s;

      if(currentI < 0){
        currentS--;
        currentI += this.segmentLength;
      } else if(currentI > (this.segmentLength-1)){
        currentS++;
        currentI -= this.segmentLength;
      }
      //console.log(currentS, currentI);
      if(this.influence[8][currentS]){
        total += this.influence[8][currentS][currentI];
      }       
    }
    return total;
  }

  getDTotal(phase){
    phase += 1;
    let s = this.currentS, i = this.currentI;
    let total = 0;
    
    let offset = (this.influenceWidth-1)/2;  
    
    for(var c=0;c<this.influenceWidth;c++){
      
      let currentI = i - offset + c;
      let currentS = s;

      if(currentI < 0){
        currentS--;
        currentI += this.segmentLength;
      } else if(currentI > (this.segmentLength-1)){
        currentS++;
        currentI -= this.segmentLength;
      }
      //console.log(currentS, currentI);
      for(var cur = 0; cur < phase; cur++){
        if(this.influence[7-cur][currentS]){
         total += this.influence[7-cur][currentS][currentI];
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
        //this.players[p].rsi = this.getRSI(this.players[p]);
        //console.log(this.players[i]);
        this.setGridInfluence(this.players[p], phase);
      }
      this.probs[phase] = this.getProbability(phase);
    }
    this.setInfluenceCellClasses();
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

  setInfluenceCellClasses(){
    this.currentCells = [];
    //leftmost cell
    let offset = (this.influenceWidth-1)/2; 
    let i = this.currentI - offset;
    let s = this.currentS;
    //console.log(this.currentS, this.currentI);
    if(i < 0){
      i += 7;
      s -= 1;
    }
    if(s < 0){
      s = 0;
      i = 0;
    }
    if(s == 2 && i > 2){
      i = 2;
    }
    //console.log(s, i);
    for(var p=0;p<this.influenceWidth;p++){
      let pos = p+i;
      let seg = s;
      if(pos > 6){
        pos -= 7;
        seg += 1;
      }
      this.currentCells.push(seg+''+pos);
    }
    //console.log(this.currentCells);
  }


}
