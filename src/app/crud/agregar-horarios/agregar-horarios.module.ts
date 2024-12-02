import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AgregarHorariosPageRoutingModule } from './agregar-horarios-routing.module';

import { AgregarHorariosPage } from './agregar-horarios.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AgregarHorariosPageRoutingModule
  ],
  declarations: [AgregarHorariosPage]
})
export class AgregarHorariosPageModule {}
