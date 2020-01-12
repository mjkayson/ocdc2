import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { ModalController } from '@ionic/angular';

import { OffensivePlaycall } from '../../cls/Playcalls/OffensivePlaycall.cls';
import { DefensivePlaycall } from '../../cls/Playcalls/DefensivePlaycall.cls';

@Component({
  selector: 'play-call-modal',
  templateUrl: './play-call-modal.component.html',
  styleUrls: ['./play-call-modal.component.scss'],
})
export class PlayCallModalComponent implements OnInit {
 
  @Input() game;
  @Input() type;
  @ViewChild('fieldView', {static: false}) fieldView:any;
  @ViewChild('playGrid', {static: false}) playGrid:any;

  gameState;
  onDefense:boolean = false;
  phase:number = 0;
  ready:boolean = false;
  interval;

  currentSection:string = 'P'; // P for Personnel, then F for Formation, then T for Type, then C for Call
  personnel:any = {};
  playcall;
  currentReceiver;

  personnelOptions:any = [];
  formationOptions:any = [];
  playTypeOptions:any = [];
  playcallOptions:any  = [];
  runOptions:any  = [];
  passOptions:any  = [];
  RPOOptions:any  = [];

  constructor(public modalController: ModalController) {
  }

  ngOnInit() {
    this.gameState = this.game.getCurrentGameState(); 
    this.init();
  }

  init(){
    this.onDefense = false; //this.gameState.possession == 'A'? true : false;
    this.playcall = this.onDefense? new DefensivePlaycall() : new OffensivePlaycall();
    this.interval = setInterval(()=>this.updateFieldView(),100);
  }

  updateFieldView(){
    if(this.fieldView){
      this.fieldView.setPlaySelectView(this.playcall, this.onDefense);
    }
    if(this.playGrid){
      this.playGrid.update(this.playcall, this.onDefense);
    }
  }
  
  call(){
    this.dismiss();
  }

  dismiss(){
    clearInterval(this.interval);
    this.modalController.dismiss({
      playcall: this.playcall
    });

  }

}
