import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ModificarCanchasPage } from './modificar-canchas.page';

const routes: Routes = [
  {
    path: '',
    component: ModificarCanchasPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ModificarCanchasPageRoutingModule {}
