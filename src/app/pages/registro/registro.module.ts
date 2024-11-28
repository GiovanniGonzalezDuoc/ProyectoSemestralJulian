import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';

import { RegistroPageRoutingModule } from './registro-routing.module';
import { RegistroPage } from './registro.page';

@NgModule({
  declarations: [RegistroPage],
  imports: [CommonModule, FormsModule, IonicModule, RegistroPageRoutingModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class RegistroPageModule {}
