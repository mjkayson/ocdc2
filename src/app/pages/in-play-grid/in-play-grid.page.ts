import { Component, OnInit } from '@angular/core';
import { PlayResult } from 'src/app/cls/PlayResult/PlayResult.cls';

@Component({
  selector: 'app-in-play-grid',
  templateUrl: './in-play-grid.page.html',
  styleUrls: ['./in-play-grid.page.scss'],
})
export class InPlayGridPage implements OnInit {

  
  rows = [
    1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,348,39,40,41,42,43,44,45
  ];

  yOffset = 14;
  
  segments = [1,2,3];
  cols = [
    [19,18,17,16,15,14,13,12,11,10,9,8,7],
    [6,5,4,3,2,1,0,1,2,3,4,5,6],
    [7,8,9,10,11,12,13,14,15,16,17,18,19]
  ];

  players:any = [
    // OFFENSE
    // LINE
    { pos: 'OL', x: -4, y: 0 },
    { pos: 'OL', x: -2, y: 0 },
    { pos: 'C',  x: 0,  y: 0 },
    { pos: 'OL', x: 2,  y: 0 },
    { pos: 'OL', x: 4,  y: 0 },
    // QB
    { pos: 'QB', x: 0,  y: -1 },
    // WRs & RBs
    { pos: 'WR', x: -13, y: 0 },
    { pos: 'WR', x: 13,  y: -2 },
    { pos: 'WR', x: 6,  y: 0 },
    { pos: 'WR', x: -8,  y: -1 },
    { pos: 'WR', x: 0,  y: -5 },

    // DEFENSE
    // DLINE
    { pos: 'DL', x: -4, y: 1 },
    { pos: 'DL', x: -1, y: 1 },
    { pos: 'DL', x: 3,  y: 1 },
    { pos: 'DL', x: 6,  y: 1 },
    // LBs,
    { pos: 'LB', x: -6,  y: 1 },
    { pos: 'LB', x: 1,  y: 4 },
    { pos: 'LB', x: 4,  y: 4 },
    // DBs,
    { pos: 'DB', x: -13,  y: 3 },
    { pos: 'DB', x: 13,  y: 3 },
    { pos: 'DB', x: 8,  y: 2 },
    { pos: 'DB', x: -2,  y: 13 }


  ]

  constructor() { }

  ngOnInit() {
    for(var i=0;i<this.players.length;i++){
      this.players[i].rsi = this.getRSI(this.players[i]);
    }
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

    // segment 1 is -19 to -7, segment 2 is -6 to 6, segment 3 is 7-19
    // positions are 0-12 (index) within the segment
    if(x < -6){
      s = 1;
      i = 19 + x;
    } else if(x < 7){
      s = 2;
      i = 6 + x;
    } else {
      s = 3;
      i = x - 7;
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

}
