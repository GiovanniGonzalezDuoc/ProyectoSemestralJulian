import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AgregarUsuariosPage } from './agregar-usuarios.page';

const routes: Routes = [
  {
    path: '',
    component: AgregarUsuariosPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AgregarUsuariosPageRoutingModule {}
