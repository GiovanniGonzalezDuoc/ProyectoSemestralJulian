import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ModificarInscripcionesTorneosPage } from './modificar-inscripciones-torneos.page';

const routes: Routes = [
  {
    path: '',
    component: ModificarInscripcionesTorneosPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ModificarInscripcionesTorneosPageRoutingModule {}
