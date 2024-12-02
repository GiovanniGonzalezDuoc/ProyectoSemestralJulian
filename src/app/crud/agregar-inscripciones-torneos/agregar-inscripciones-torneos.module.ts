import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AgregarInscripcionesTorneosPageRoutingModule } from './agregar-inscripciones-torneos-routing.module';

import { AgregarInscripcionesTorneosPage } from './agregar-inscripciones-torneos.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AgregarInscripcionesTorneosPageRoutingModule
  ],
  declarations: [AgregarInscripcionesTorneosPage]
})
export class AgregarInscripcionesTorneosPageModule {}
