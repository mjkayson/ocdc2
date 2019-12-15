import { Component, Input, AfterContentInit, ViewChild } from '@angular/core';
import { IonContent } from '@ionic/angular';

import { Siri } from '../../cls/Siri/Siri.cls';

@Component({
  selector: 'play-by-play',
  templateUrl: './play-by-play.component.html',
  styleUrls: ['./play-by-play.component.scss'],
})
export class PlayByPlayComponent implements AfterContentInit {

  @Input() game;
  @ViewChild('playByPlay', { static: false}) playByPlay: any;

  getClock;
  
  constructor() {
     this.getClock = Siri.getClock;
  }

  ngAfterContentInit() {
    setInterval(() => {
      this.scrollDown();
    }, 100);
  }

  scrollDown(){
    let el = this.playByPlay.nativeElement;
    el.scrollTop = el.scrollHeight;
  }


}
