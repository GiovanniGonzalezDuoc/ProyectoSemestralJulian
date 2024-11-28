import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PadelPage } from './padel.page';

const routes: Routes = [
  {
    path: '',
    component: PadelPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PadelPageRoutingModule {}
