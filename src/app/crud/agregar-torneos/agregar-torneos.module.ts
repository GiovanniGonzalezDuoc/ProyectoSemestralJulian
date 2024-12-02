import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AgregarTorneosPageRoutingModule } from './agregar-torneos-routing.module';

import { AgregarTorneosPage } from './agregar-torneos.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AgregarTorneosPageRoutingModule
  ],
  declarations: [AgregarTorneosPage]
})
export class AgregarTorneosPageModule {}
