import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AgregarRolesPageRoutingModule } from './agregar-roles-routing.module';

import { AgregarRolesPage } from './agregar-roles.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AgregarRolesPageRoutingModule
  ],
  declarations: [AgregarRolesPage]
})
export class AgregarRolesPageModule {}
