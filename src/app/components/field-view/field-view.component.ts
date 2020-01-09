import { Component, Input, AfterContentInit, ViewChild } from '@angular/core';

import * as ex from 'excalibur';
import { RunBlockingScheme } from 'src/app/cls/Playcalls/BaseClasses.cls';

@Component({
  selector: 'field-view',
  templateUrl: './field-view.component.html',
  styleUrls: ['./field-view.component.scss'],
})
export class FieldViewComponent implements AfterContentInit {

  @ViewChild('ctx', {static: false}) ctx:any;
  @Input() game;
  @Input() isPlaycall;
  engine;
  field;
  players:any = [];  

  constructor() { }


  ngAfterContentInit() {
    setTimeout(()=>this.init(),100);
  }

  init(){
    this.ctx.nativeElement.id = Math.random().toString(36).substring(7);
    this.engine = new ex.Engine({
      canvasElementId: this.ctx.nativeElement.id,
      displayMode: ex.DisplayMode.Container,
      pointerScope: ex.Input.PointerScope.Canvas,
        backgroundColor: ex.Color.fromRGB(25,111,12,.41)
    });
    this.engine.start();    
  }

  setPresnap(play){
    this.removePlayers();
    let formation = play.getOffensivePlaycall().formation;
    formation.eligibleReceivers.forEach(rec=>{
      this.players.push(this.addPlayer(rec));
    });
    formation.line.forEach(rec=>{
      this.players.push(this.addPlayer(rec));
    });
    // QB
    this.players.push(this.addPlayer({ x:0, y: formation.qbDepth.qb_depth }));

    let def = play.getDefensivePlaycall().formation;
    // DLine
    
    def.line.forEach(rec=>{
      this.players.push(this.addPlayer(rec));
    });
    
  }

  setPlaySelectView(call, onDefense){
    if(!this.engine || !call.personnel) return;
    this.removePlayers();
    if(onDefense){

      if(call.lineAlignment){
        call.getLineAlignment().alignments.forEach(pos=>{
          this.addPlayer(this.getDLineXY(pos));
        });
      }
      if(call.boxAlignment){
        call.getBoxAlignment().alignments.forEach(pos=>{
          this.addPlayer(this.getBoxXY(pos));
        });
      }

    } else {

      // O Line
      call.getLineAlignment().forEach(pos=>{
        this.addPlayer(pos);
      });

      // RBs
      if(call.RBAlignment){
        call.getRBAlignment().alignments.forEach(pos=>{
          this.addPlayer(pos);
        });
      }

      // WRs
      if(call.WRAlignment){
        call.getWRAlignment().alignments.forEach(pos=>{
          let x = pos.x, y = pos.y;
          if(call.personnel.package[1] == 2 && y == 0){
            y = 4;
          }
          if(call.strongSide == 'Left'){
            this.addPlayer({ x: x *= -1, y: y });
          } else {
            this.addPlayer({ x: x, y: y });
          }
          
        });
      } 

      // QB
      if(call.snapType){
        this.addPlayer(call.getSnapType().alignment);
      }
      
      // TE(s)
      if(call.personnel.package[1] > 0){
        if(call.strongSide == 'Right' || call.personnel.package[1] == 2){
          this.addPlayer({ x: 26, y: 2 });
        }
        if(call.strongSide == 'Left' || call.personnel.package[1] == 2){
          this.addPlayer({ x: -26, y: 2 });
        }
      }

    }
  }

  getDLineXY(alignment){
    let x = 0;
    switch(alignment.technique){
      case 1: x = 2; break;
      case 2: x = 6; break;
      case 3: x = 8; break;
      case 4: x = 12; break;
      case 5: x = 14; break;
      case 6: x = 18; break;
      case 7: x = 16; break;
      case 9: x = 21; break;
    }
    if(alignment.inside) x -= 2;
    if(alignment.weak) x *= -1;
    return { x: x, y: 1 };
  }

  getBoxXY(alignment){
    let x = 0;
    switch(alignment.gap){
      case "A": x = 4; break;
      case "B": x = 10; break;
      case "C": x = 17; break;
      case "D": x = 28; break;
    }
    if(alignment.shade == "outside") x += 2;
    if(alignment.shade == "inside") x -= 2;
    if(alignment.weak) x *= -1;
    return { x: x, y: alignment.depth * -3 };
  }

  removePlayers(){
    this.players.forEach(player=>{
      this.engine.remove(player);
    });
  }

  addPlayer(pos){
    let y = this.engine.drawHeight/2;
    let mid = this.engine.drawWidth/2;
    var player = new ex.Actor(mid+pos.x, y+pos.y, 5, 5, ex.Color.White);
    player.body.collider.type  = ex.CollisionType.PreventCollision;
    this.engine.add(player);
    this.players.push(player);
  }

}
