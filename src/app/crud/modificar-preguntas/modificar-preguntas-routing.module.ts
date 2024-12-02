import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ModificarPreguntasPage } from './modificar-preguntas.page';

const routes: Routes = [
  {
    path: '',
    component: ModificarPreguntasPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ModificarPreguntasPageRoutingModule {}
