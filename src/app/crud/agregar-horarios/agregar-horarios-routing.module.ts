import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AgregarHorariosPage } from './agregar-horarios.page';

const routes: Routes = [
  {
    path: '',
    component: AgregarHorariosPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AgregarHorariosPageRoutingModule {}
