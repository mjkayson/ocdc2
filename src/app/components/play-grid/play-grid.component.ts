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
  playcall_off;
  playcall_def;

  offInf;
  defInf;
  infMap;
  infSet = false;

  onDefense;
  showNumbers = true;
   
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
    } else {
      this.rows = new Array(120);
      this.cols = new Array(63);
    }
  }

  update(play){
    this.playcall_off = play.getOffensivePlaycall();
    this.playcall_def = play.getDefensivePlaycall();
    this.yOffset = 10 + play.game_state_start.ytg;
    
    if(this.playcall_off.strongSide){
      this.isStrongLeft = this.playcall_off.strongSide.name == 'Left'? true : false;
    }
    let offensivePlayers = Object.assign([], play.getOffensivePlaycall().getPlayers());
    let defensivePlayers = Object.assign([], play.getDefensivePlaycall().getPlayers());
    this.players = [...offensivePlayers, ...defensivePlayers];
    this.setPlayers(this.players);    
  }

  setInfluenceMap(off, def, map){
    this.offInf = off;
    this.defInf = def;
    this.infMap = map; 
    this.infSet = true;   
  }

  setPlayers(players){
    this.players = players;  
    for(var i=0;i<this.players.length;i++){
      this.players[i].rc = this.getRC(this.players[i]);
    }
  }  

  getPlayers(){
    return this.players;
  }

  hasPlayer(row, col){
    let has = false;
    this.players.forEach(player=>{
      let rc = player.rc;
      if((rc.r == row) && (rc.c == col)) has = true;

    });
    return has;
  }

  getRC(player){
    let r,c;
    let x = player.x, y = player.y;
    if(this.isStrongLeft){
      x *= -1;
    }
    // distance from LoS
    r = this.rows.length - this.yOffset - y;
    c = x + Math.round(this.cols.length / 2);
    return { r: r, c: c };    
  }  

  getPlayerClass(row, pos){
    let str = 'player ';
    this.players.forEach(player=>{
      let rc = player.rc;
      if((rc.r == row) && (rc.c == pos)){
        str += player.pos;
      }
    });
    return str;
  }
  
  getGridInfluence(row, col){
    if(!this.infSet) return 0;
    return this.defInf[row][col];
  }  

  getInfluenceClass(r,c){
    let inf = this.getGridInfluence(r,c);
    let str = 'number ' + inf + ' ';
    if(inf > 7){
      str += 'influence_high';
      //console.log('high inf', r, c);
    } else if(inf > 5){
      str += 'influence_med';
    } else if(inf > 2){
      str += 'influence_low';
    } else {
      
    }
    /*
    if(this.currentCells.includes(i+''+pos)){
      str += " highOpacity";
    } else {
      str += " lowOpacity";
    }
    */
    //console.log(str);
    return str;
  }



}
