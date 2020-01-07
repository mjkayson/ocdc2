import { Component, Input, AfterContentInit } from '@angular/core';

import { Siri } from '../../cls/Siri/Siri.cls';

@Component({
  selector: 'game-state',
  templateUrl: './game-state.component.html',
  styleUrls: ['./game-state.component.scss'],
})
export class GameStateComponent implements AfterContentInit {

  @Input() game;
  @Input() type;

  yard_line;
  gameState;
  getClock;
  getDownWithSuffix;

  constructor() { 
    this.getClock = Siri.getClock;
    this.getDownWithSuffix = Siri.getDownWithSuffix;
  }

  ngAfterContentInit() {
    this.gameState = this.game.getCurrentGameState();
    //console.log(this.gameState);
    let ytg = this.gameState.ytg;
    //console.log(ytg);
    this.yard_line = ytg > 50? (100 - ytg) : ytg < 50? ytg : 50;
    //console.log(this.yard_line);
  }

}
