import { Component, OnInit } from '@angular/core';
import { ToastController, ModalController } from '@ionic/angular';


import { GameService } from '../../cls/GameService/game.service';
import { Play } from 'src/app/cls/Play/Play.cls';
import { PlayCallModalComponent } from 'src/app/components/play-call-modal/play-call-modal.component';

@Component({
  selector: 'app-game',
  templateUrl: './game.page.html',
  styleUrls: ['./game.page.scss'],
})
export class GamePage implements OnInit {
  

  constructor(public toastController: ToastController,
              public modalController: ModalController,
              private game: GameService) {

  }

  ngOnInit() {
    this.showPlaycallPromptToast();
  }

  async showPlaycallModal(type) {
    const modal = await this.modalController.create({
      component: PlayCallModalComponent,
      componentProps: {
        type: type,
        game: this.game
     }
    });
   
    await modal.present();
    let { data } = await modal.onDidDismiss();
    
    if (data.playcall !== null) {
      this.snap(data.playcall);
    }

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
            this.showPlaycallModal('R');
          }
        }
      ]
    });
    toast.present();
  }

  snap(str){
    // do play creation here too for now
    let play = new Play(this.game.getCurrentGameState());
    play.setPlaycall(str);
    this.game.addPlay(play);
    

    this.game.update();
    this.showPlaycallPromptToast();
  }


}
