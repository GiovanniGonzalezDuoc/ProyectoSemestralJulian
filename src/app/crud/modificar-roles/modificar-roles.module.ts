import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ModificarRolesPageRoutingModule } from './modificar-roles-routing.module';

import { ModificarRolesPage } from './modificar-roles.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ModificarRolesPageRoutingModule
  ],
  declarations: [ModificarRolesPage]
})
export class ModificarRolesPageModule {}
