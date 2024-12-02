import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CanchasPage } from './canchas.page';

const routes: Routes = [
  {
    path: '',
    component: CanchasPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CanchasPageRoutingModule {}
