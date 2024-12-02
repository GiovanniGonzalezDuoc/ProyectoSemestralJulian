import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AgregarCanchasPage } from './agregar-canchas.page';

const routes: Routes = [
  {
    path: '',
    component: AgregarCanchasPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AgregarCanchasPageRoutingModule {}
