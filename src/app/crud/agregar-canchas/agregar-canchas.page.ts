import { Component } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { ServicebdService } from 'src/app/services/servicebd.service';

@Component({
  selector: 'app-agregar-canchas',
  templateUrl: './agregar-canchas.page.html',
  styleUrls: ['./agregar-canchas.page.scss'],
})
export class AgregarCanchasPage {
  nombre_cancha: string = '';
  tipo_deporte: string = '';

  constructor(private bd: ServicebdService, private alertController: AlertController) {}

  async insertar() {
    if (!this.nombre_cancha.trim() || !this.tipo_deporte.trim()) {
      const alert = await this.alertController.create({
        header: 'Error',
        message: 'Todos los campos son obligatorios.',
        buttons: ['OK'],
      });
      await alert.present();
      return;
    }

    try {
      await this.bd.insertarCancha(this.nombre_cancha.trim(), this.tipo_deporte.trim(),'Disponible');
      const alert = await this.alertController.create({
        header: 'Éxito',
        message: `La cancha "${this.nombre_cancha}" ha sido agregada correctamente.`,
        buttons: ['OK'],
      });
      await alert.present();
      this.nombre_cancha = '';
      this.tipo_deporte = '';
    } catch (error) {
      console.error('Error al agregar la cancha:', error);
      const alert = await this.alertController.create({
        header: 'Error',
        message: 'Hubo un problema al agregar la cancha. Inténtelo nuevamente.',
        buttons: ['OK'],
      });
      await alert.present();
    }
  }
}
