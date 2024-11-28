import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FutbolitoPage } from './futbolito.page';

const routes: Routes = [
  {
    path: '',
    component: FutbolitoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FutbolitoPageRoutingModule {}
