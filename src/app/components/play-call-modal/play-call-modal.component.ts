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

  constructor(public modalController: ModalController) { }

  ngOnInit() {
    this.gameState = this.game.getCurrentGameState();
    
  }

  ionViewDidEnter(){
    // AI possession so just call a play 
    if(this.gameState.possession == 'A'){
      //console.log('AI calling play');
      this.call(AI.getPlaycall(this.gameState));

    }
  }

  call(str) {
    if(str == 'pat') this.gameState.play_type = 'PAT';
    this.modalController.dismiss({
      playcall: str
    });
  }

}
