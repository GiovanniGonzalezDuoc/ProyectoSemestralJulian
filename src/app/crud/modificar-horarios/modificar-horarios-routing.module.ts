import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ModificarHorariosPage } from './modificar-horarios.page';

const routes: Routes = [
  {
    path: '',
    component: ModificarHorariosPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ModificarHorariosPageRoutingModule {}
