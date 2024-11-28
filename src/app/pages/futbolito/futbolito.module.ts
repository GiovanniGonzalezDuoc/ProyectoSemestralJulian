import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FutbolitoPageRoutingModule } from './futbolito-routing.module';

import { FutbolitoPage } from './futbolito.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FutbolitoPageRoutingModule
  ],
  declarations: [FutbolitoPage]
})
export class FutbolitoPageModule {}
