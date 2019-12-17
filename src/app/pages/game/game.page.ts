import { Component, OnInit } from '@angular/core';
import { ToastController, ModalController } from '@ionic/angular';

import { GameService } from '../../cls/GameService/game.service';
import { Play } from 'src/app/cls/Play/Play.cls';
import { PlayCallModalComponent } from 'src/app/components/play-call-modal/play-call-modal.component';

import { AI } from '../../cls/AI/AI.cls';

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
      this.player_playcall = data.playcall;
    }

  }

  ready(){
    this.playcall_off = '';
    this.playcall_def = '';
    // make AI playcall
    this.ai_playcall = AI.getPlaycall(this.game.getCurrentGameState());
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
    // do play creation here too for now
    let gs = this.game.getCurrentGameState();
    let play = new Play(gs);
    this.playcall_off = gs.possession == 'A'? this.ai_playcall : this.player_playcall;
    this.playcall_def = gs.possession == 'H'? this.ai_playcall : this.player_playcall;
    play.setPlaycall(this.playcall_off, this.playcall_def);
    this.game.addPlay(play);    

    this.game.update();
    this.showPlaycallPromptToast();
  }


}
