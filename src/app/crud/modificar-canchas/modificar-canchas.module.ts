import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ModificarCanchasPageRoutingModule } from './modificar-canchas-routing.module';

import { ModificarCanchasPage } from './modificar-canchas.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ModificarCanchasPageRoutingModule
  ],
  declarations: [ModificarCanchasPage]
})
export class ModificarCanchasPageModule {}
