import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { InPlayGridPage } from './in-play-grid.page';

const routes: Routes = [
  {
    path: '',
    component: InPlayGridPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class InPlayGridPageRoutingModule {}
