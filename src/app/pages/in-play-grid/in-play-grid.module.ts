import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { InPlayGridPageRoutingModule } from './in-play-grid-routing.module';

import { InPlayGridPage } from './in-play-grid.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    InPlayGridPageRoutingModule
  ],
  declarations: [InPlayGridPage]
})
export class InPlayGridPageModule {}
