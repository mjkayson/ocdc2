import { Component, OnInit, ViewChild } from '@angular/core';
import { ToastController, ModalController } from '@ionic/angular';

import { GameService } from '../../cls/GameService/game.service';
import { Play } from 'src/app/cls/Play/Play.cls';
import { PlayCallModalComponent } from 'src/app/components/play-call-modal/play-call-modal.component';

import { AI } from '../../cls/AI/AI.cls';
import { Playcall } from 'src/app/cls/Playcalls/Playcall.cls';
import { Siri } from '../../cls/Siri/Siri.cls';
import { OCDCEngine } from '../../cls/OCDCEngine/OCDCEngine.cls';

@Component({
  selector: 'app-game',
  templateUrl: './game.page.html',
  styleUrls: ['./game.page.scss'],
})
export class GamePage implements OnInit {  

  @ViewChild('devTools', {static: false}) devTools:any;

  presnap:boolean = false;
  ai_playcall;
  player_playcall;
  playcall_off;
  playcall_def;

  simulating:boolean = false;
  simCount:number = 0;
  results:any = [];

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

  simulate(adj){
    this.simulating = true;
    //this.simCount = 0;
    this.devTools.newSeries();

    for(var i=0;i<10000;i++){
      //this.playcall_off = AI.getRandomOffensivePlaycall();
      //this.playcall_def = AI.getRandomDefensivePlaycall();

      this.playcall_off = AI.getSpecificOffensivePlaycall();
      this.playcall_def = AI.getSpecificDefensivePlaycall();
      
      let play = new Play(this.game.getCurrentGameState());
      play.setPlaycall(this.playcall_off, this.playcall_def);
      this.game.addPlay(play);   
      
      OCDCEngine.resolve(this.game, !adj);

      this.game.resolveCurrentPlay();
      let res = this.game.getLastPlay();
      let segment = res.getLastSegment();
      let offset = (Siri.getRandomNumber(100,500)/1000);
      if(Siri.getRandomNumber(1,2) == 2) offset *= -1;
      let y = res.segments.length + offset;
      this.devTools.update([segment.ballY, y]);
      this.simCount++;

    }
    
    this.simulating = false;
  }

  snap(){
    this.presnap = false;
    this.game.resolveCurrentPlay();
    let play = this.game.getLastPlay();
    let segment = play.getLastSegment();
    //console.log([segment.ballY, play.segments.length]);
    this.devTools.update([segment.ballY, play.segments.length]);
    this.showPlaycallPromptToast();
  }


}
