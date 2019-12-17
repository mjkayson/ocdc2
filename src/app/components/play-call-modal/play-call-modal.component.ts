import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

import { AI } from '../../cls/AI/AI.cls';

@Component({
  selector: 'app-play-call-modal',
  templateUrl: './play-call-modal.component.html',
  styleUrls: ['./play-call-modal.component.scss'],
})
export class PlayCallModalComponent implements OnInit {
  
  @Input() game;
  @Input() type;

  playcall;
  gameState;
  onDefense:boolean = false;

  constructor(public modalController: ModalController) { }

  ngOnInit() {
    this.gameState = this.game.getCurrentGameState();
    
  }

  ionViewDidEnter(){
    // AI possession so just call a play 
    if(this.gameState.possession == 'A'){
      //console.log('AI calling play');
      this.onDefense = true;
    } else {
      this.onDefense = false;
    }
  }

  call(str) {
    if(str == 'pat') this.gameState.play_type = 'PAT';
    if(str == 'fg') this.gameState.play_type = 'FG';
    this.modalController.dismiss({
      playcall: str
    });
  }

}
