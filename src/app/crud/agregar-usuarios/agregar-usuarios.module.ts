import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AgregarUsuariosPageRoutingModule } from './agregar-usuarios-routing.module';

import { AgregarUsuariosPage } from './agregar-usuarios.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AgregarUsuariosPageRoutingModule
  ],
  declarations: [AgregarUsuariosPage]
})
export class AgregarUsuariosPageModule {}
