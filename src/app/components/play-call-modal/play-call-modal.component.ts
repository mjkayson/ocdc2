import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

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

  snap(str) {
    this.modalController.dismiss({
      playcall: str
    });
  }

}
