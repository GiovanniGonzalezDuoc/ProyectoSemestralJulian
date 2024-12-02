import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ModificarTorneosPage } from './modificar-torneos.page';

const routes: Routes = [
  {
    path: '',
    component: ModificarTorneosPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ModificarTorneosPageRoutingModule {}
