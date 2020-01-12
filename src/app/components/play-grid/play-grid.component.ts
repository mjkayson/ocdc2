import { Component, OnInit, Input } from '@angular/core';
import { OffensivePlaycall } from 'src/app/cls/Playcalls/OffensivePlaycall.cls';

@Component({
  selector: 'play-grid',
  templateUrl: './play-grid.component.html',
  styleUrls: ['./play-grid.component.scss'],
})
export class PlayGridComponent implements OnInit {

  @Input() type;
  @Input() isPlaycall;

  isStrongLeft:boolean = false;
  playcall;

  onDefense;
   
  rows = [
    1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,,21,22,23,24,25,26,27,28,29,30,31,32,33
  ];

  yOffset = 11;
  
  segments = [1,2,3];
  cols = [
    [31,30,29,28,27,26,25,24,23,22,21,20,19,18,17,16,15,14,13,12,11],
    [10,9,8,7,6,5,4,3,2,1,0,1,2,3,4,5,6,7,8,9,10],
    [10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31]
  ];

  players = [];

  constructor(){}

  ngOnInit() {
    if(this.isPlaycall){
      this.rows = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21];
    }
  }

  update(playcall, onDefense){
    this.onDefense = onDefense;
    if(this.onDefense){
      this.yOffset = 6;
    }
    this.playcall = playcall;
    if(playcall.strongSide){
      this.isStrongLeft = playcall.strongSide.name == 'Left'? true : false;
    }
    if(this.onDefense){
      playcall.addMockOffensiveLine();
    }
    this.setPlayers(playcall.getPlayers());    
  }

  setPlayers(players){
    this.players = players;  
    for(var i=0;i<this.players.length;i++){
      this.players[i].rsi = this.getRSI(this.players[i]);
    }
  }  

  getPlayers(){
    return this.players;
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
    if(this.isStrongLeft){
      x *= -1;
    }
    /*
    if(this.playcall.playType){
      if(this.playcall.playType.name == 'Pass' && player.type == 'R'){
        y -= 1;
      }
    }
    */
    // distance form LoS
    r = this.rows.length - this.yOffset - y;
    // segment 1 is -31 to -11, segment 2 is -10 to 10, segment 3 is 11-31
    // positions are 0-12 (index) within the segment
    if(x < -10){
      s = 1;
      i = 31 + x;
    } else if(x < 11){
      s = 2;
      i = 10 + x;
    } else {
      s = 3;
      i = x - 11;
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
