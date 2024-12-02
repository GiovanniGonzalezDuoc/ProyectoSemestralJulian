import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AgregarTorneosPage } from './agregar-torneos.page';

const routes: Routes = [
  {
    path: '',
    component: AgregarTorneosPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AgregarTorneosPageRoutingModule {}
