import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ModificarTorneosPageRoutingModule } from './modificar-torneos-routing.module';

import { ModificarTorneosPage } from './modificar-torneos.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ModificarTorneosPageRoutingModule
  ],
  declarations: [ModificarTorneosPage]
})
export class ModificarTorneosPageModule {}
