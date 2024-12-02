import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { InscripcionesTorneosPageRoutingModule } from './inscripciones-torneos-routing.module';

import { InscripcionesTorneosPage } from './inscripciones-torneos.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    InscripcionesTorneosPageRoutingModule
  ],
  declarations: [InscripcionesTorneosPage]
})
export class InscripcionesTorneosPageModule {}
