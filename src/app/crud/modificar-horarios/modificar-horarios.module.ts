import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ModificarHorariosPageRoutingModule } from './modificar-horarios-routing.module';

import { ModificarHorariosPage } from './modificar-horarios.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ModificarHorariosPageRoutingModule
  ],
  declarations: [ModificarHorariosPage]
})
export class ModificarHorariosPageModule {}
