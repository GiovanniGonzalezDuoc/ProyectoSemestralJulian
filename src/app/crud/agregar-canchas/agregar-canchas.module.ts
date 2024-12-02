import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AgregarCanchasPageRoutingModule } from './agregar-canchas-routing.module';

import { AgregarCanchasPage } from './agregar-canchas.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AgregarCanchasPageRoutingModule
  ],
  declarations: [AgregarCanchasPage]
})
export class AgregarCanchasPageModule {}
