import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ModificarInscripcionesTorneosPageRoutingModule } from './modificar-inscripciones-torneos-routing.module';

import { ModificarInscripcionesTorneosPage } from './modificar-inscripciones-torneos.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ModificarInscripcionesTorneosPageRoutingModule
  ],
  declarations: [ModificarInscripcionesTorneosPage]
})
export class ModificarInscripcionesTorneosPageModule {}
