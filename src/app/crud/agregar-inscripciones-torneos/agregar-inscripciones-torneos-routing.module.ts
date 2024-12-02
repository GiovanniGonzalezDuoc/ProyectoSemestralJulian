import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AgregarInscripcionesTorneosPage } from './agregar-inscripciones-torneos.page';

const routes: Routes = [
  {
    path: '',
    component: AgregarInscripcionesTorneosPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AgregarInscripcionesTorneosPageRoutingModule {}
