import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AgregarPreguntasPage } from './agregar-preguntas.page';

const routes: Routes = [
  {
    path: '',
    component: AgregarPreguntasPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AgregarPreguntasPageRoutingModule {}
