import { Component, OnInit } from '@angular/core';
import { ToastController, ModalController } from '@ionic/angular';

import { GameService } from '../../cls/GameService/game.service';
import { Play } from 'src/app/cls/Play/Play.cls';
import { PlayCallModalComponent } from 'src/app/components/play-call-modal/play-call-modal.component';

import { AI } from '../../cls/AI/AI.cls';
import { Playcall } from 'src/app/cls/Playcalls/Playcall.cls';

@Component({
  selector: 'app-game',
  templateUrl: './game.page.html',
  styleUrls: ['./game.page.scss'],
})
export class GamePage implements OnInit {

  presnap:boolean = false;
  ai_playcall;
  player_playcall;
  playcall_off;
  playcall_def;

  constructor(public toastController: ToastController,
              public modalController: ModalController,
              public game: GameService) {

  }

  ngOnInit() {
    this.showPlaycallPromptToast();
  }

  async showPlaycallModal() {
    const modal = await this.modalController.create({
      component: PlayCallModalComponent,
      componentProps: {
        game: this.game
     }
    });
   
    await modal.present();
    let { data } = await modal.onDidDismiss();
    
    if (data.playcall !== null) {
      this.presnap = true;
      let onDefense = this.game.getCurrentGameState().possession == 'A';
      let aiCall = AI.getPlaycall(this.game.getCurrentGameState());
      this.playcall_off = onDefense? aiCall : data.playcall;
      this.playcall_def = onDefense? data.playcall : aiCall;
      
      let play = new Play(this.game.getCurrentGameState());
      play.setPlaycall(this.playcall_off, this.playcall_def);
      this.game.addPlay(play);   

    }

  }

  ready(){
    this.playcall_off = null;
    this.playcall_def = null;
  }

  async showPlaycallPromptToast() {
    const toast = await this.toastController.create({
      //header: 'Toast header',
      //message: 'Call Play',
      position: 'bottom',
      buttons: [
        {
          side: 'start',
          //icon: 'star',
          text: 'Call Play',
          handler: () => {
            this.ready();
            this.showPlaycallModal();
          }
        }
      ]
    });
    toast.present();
  }

  snap(){
    this.presnap = false;
    this.game.resolveCurrentPlay();
    this.showPlaycallPromptToast();
  }


}
