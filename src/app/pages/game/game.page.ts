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
  @ViewChild('fieldView', {static: false}) fieldView:any;

  presnap:boolean = false;
  ai_playcall;
  player_playcall;
  playcall_off;
  playcall_def;

  simulating:boolean = false;
  simCount:number = 0;
  results:any = [];

  showDevTools:boolean = false;

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
      buttons: [{
          side: 'start',
          //icon: 'star',
          text: 'Call Play',
          handler: () => {
            this.ready();
            this.showPlaycallModal();
          }
        },{
          side: 'end',
          text: 'Randomise',
          handler: () => {
            this.CallAIPlays(true);  
          }
        },{
          side: 'end',
          text: 'Fixed',
          handler: () => {
            this.CallAIPlays(false);             
          }
        }
      ]
    });
    toast.present();
  }

  CallAIPlays(random?){
    this.ready();
    this.presnap = true;
    if(random){
      this.playcall_off = AI.getRandomOffensivePlaycall();
      this.playcall_def = AI.getRandomDefensivePlaycall();
    } else {
      this.playcall_off = AI.getSpecificOffensivePlaycall();
      this.playcall_def = AI.getSpecificDefensivePlaycall();
    }
    let play = new Play(this.game.getCurrentGameState());
    play.setPlaycall(this.playcall_off, this.playcall_def);
    this.game.addPlay(play);
    this.fieldView.setPresnap(play);
  }

  simulate(adj){
    this.simulating = true;
    //this.simCount = 0;
    this.devTools.newSeries();

    for(var i=0;i<10000;i++){
      this.playcall_off = AI.getRandomOffensivePlaycall();
      this.playcall_def = AI.getRandomDefensivePlaycall();

      //this.playcall_off = AI.getSpecificOffensivePlaycall();
      //this.playcall_def = AI.getSpecificDefensivePlaycall();
      
      let play = new Play(this.game.getCurrentGameState());
      play.setPlaycall(this.playcall_off, this.playcall_def);
      this.game.addPlay(play);   
      //this.fieldView.setPresnap(play);
      
      OCDCEngine.resolve(this.game, !adj);

      this.game.resolveCurrentPlay();
      let res = this.game.getLastPlay();
      let segment = res.getLastSegment();
      this.devTools.update(segment.ballY);
      this.simCount++;

    }
    
    this.simulating = false;
  }

  snap(){
    this.presnap = false;
    OCDCEngine.resolve(this.game);
    this.game.resolveCurrentPlay();  
    //console.log(this.game.getLastPlay());  
    this.showPlaycallPromptToast();
  }


}
