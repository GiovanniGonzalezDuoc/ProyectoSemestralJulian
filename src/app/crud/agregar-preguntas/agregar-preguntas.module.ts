import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AgregarPreguntasPageRoutingModule } from './agregar-preguntas-routing.module';

import { AgregarPreguntasPage } from './agregar-preguntas.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AgregarPreguntasPageRoutingModule
  ],
  declarations: [AgregarPreguntasPage]
})
export class AgregarPreguntasPageModule {}
