import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ModificarPreguntasPageRoutingModule } from './modificar-preguntas-routing.module';

import { ModificarPreguntasPage } from './modificar-preguntas.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ModificarPreguntasPageRoutingModule
  ],
  declarations: [ModificarPreguntasPage]
})
export class ModificarPreguntasPageModule {}
