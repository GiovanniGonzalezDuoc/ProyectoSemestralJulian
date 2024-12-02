import { Component } from '@angular/core';
import { ServicebdService } from 'src/app/services/servicebd.service';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-agregar-roles',
  templateUrl: './agregar-roles.page.html',
  styleUrls: ['./agregar-roles.page.scss'],
})
export class AgregarRolesPage {
  nombre_rol: string = "";

  constructor(
    private bd: ServicebdService,
    private alertController: AlertController
  ) {}

  // Método para insertar un nuevo rol
  async insertar() {
    if (!this.nombre_rol.trim()) {
      const alert = await this.alertController.create({
        header: 'Error',
        message: 'El nombre del rol no puede estar vacío.',
        buttons: ['OK'],
      });
      await alert.present();
      return;
    }

    try {
      await this.bd.insertarRol(this.nombre_rol.trim());
      const alert = await this.alertController.create({
        header: 'Éxito',
        message: `El rol "${this.nombre_rol}" ha sido agregado exitosamente.`,
        buttons: ['OK'],
      });
      await alert.present();

      // Limpiar el campo después de insertar
      this.nombre_rol = '';
    } catch (error) {
      console.error('Error al insertar el rol:', error);
      const alert = await this.alertController.create({
        header: 'Error',
        message: 'Hubo un problema al agregar el rol. Inténtelo nuevamente.',
        buttons: ['OK'],
      });
      await alert.present();
    }
  }
}
