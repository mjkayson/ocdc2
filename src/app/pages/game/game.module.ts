import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { GamePageRoutingModule } from './game-routing.module';

import { GamePage } from './game.page';

import { GameStateComponent } from 'src/app/components/game-state/game-state.component';
import { PlayByPlayComponent } from 'src/app/components/play-by-play/play-by-play.component';
import { FieldViewComponent } from 'src/app/components/field-view/field-view.component';
import { PlayCallModalComponent } from 'src/app/components/play-call-modal/play-call-modal.component';

import { DevToolsComponent } from 'src/app/components/dev-tools/dev-tools.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    GamePageRoutingModule
  ],
  declarations: [
    GamePage,
    GameStateComponent,
    PlayByPlayComponent,
    FieldViewComponent,
    PlayCallModalComponent,
    DevToolsComponent
  ],
  entryComponents: [
    PlayCallModalComponent
  ]
})
export class GamePageModule {}
