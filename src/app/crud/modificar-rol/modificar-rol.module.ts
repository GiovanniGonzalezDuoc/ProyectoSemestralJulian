import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ModificarRolPageRoutingModule } from './modificar-rol-routing.module';

import { ModificarRolPage } from './modificar-rol.page';
import { ComponentsModule } from 'src/app/components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ModificarRolPageRoutingModule,
    ComponentsModule
  ],
  declarations: [ModificarRolPage]
})
export class ModificarRolPageModule {}
