import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

import { Formation } from '../../cls/Playcalls/Formation.cls';
import { OffensivePlaycall, DefensivePlaycall } from '../../cls/Playcalls/Playcall.cls';

@Component({
  selector: 'app-play-call-modal',
  templateUrl: './play-call-modal.component.html',
  styleUrls: ['./play-call-modal.component.scss'],
})
export class PlayCallModalComponent implements OnInit {
  
  @Input() game;
  @Input() type;

  gameState;
  onDefense:boolean = false;
  phase:number = 0;
  ready:boolean = false;

  currentSection:string = 'P'; // P for Personnel, then F for Formation, then T for Type, then C for Call
  personnel:any = {};
  formation:Formation = new Formation();
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
    this.onDefense = this.gameState.possession == 'A'? true : false;
    this.playcall = this.onDefense? new DefensivePlaycall() : new OffensivePlaycall();
  }

  ionViewDidEnter(){
  }

  reset(){
    this.init();
  }

  call(){
    this.dismiss();
  }

  dismiss(){
    this.modalController.dismiss({
      playcall: this.playcall
    });

  }

}


/*


  defensiveOptions = [{
    name: 'Package',
    opts: [
      ['34', '34'],
      ['43', '43'],
      ['33', '33'],
      ['32', '32'],
      ['52', '52'],
      ['53', '53']
  ]},{
    name: 'Shift',
    opts: [
      ['00', 'None'],
      ['01', 'Over'],
      ['02', 'Under'],
      ['03', 'Split'],
      ['04', 'Tight'],
      ['04', 'Shake']
  ]},{
    name: 'Stunt',
    opts: [
      ['00', 'None'],
      ['01', 'Strong'],
      ['02', 'Weak'],
      ['03', 'Wide']
  ]},{
    name: 'Coverage',
    opts: [
      ['00', 'Man'],
      ['01', 'Cover 1'],
      ['02', 'Cover 2'],
      ['03', 'Cover 3'],
      ['04', 'Cover 4']
  ]},{
    name: 'Blitz',
    opts: [
      ['00', 'Will Fire'],
      ['01', 'Mike Fire'],
      ['02', 'Sam Fire'],
      ['03', 'Double Fire'],
      ['04', 'Zero Blitz']
  ]}
  ];
  */
