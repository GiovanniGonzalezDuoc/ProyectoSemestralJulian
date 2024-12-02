import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { InscripcionesTorneosPage } from './inscripciones-torneos.page';

const routes: Routes = [
  {
    path: '',
    component: InscripcionesTorneosPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class InscripcionesTorneosPageRoutingModule {}
