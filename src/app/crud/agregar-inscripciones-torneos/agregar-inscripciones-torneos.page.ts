import { Component } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { ServicebdService } from 'src/app/services/servicebd.service';

@Component({
  selector: 'app-agregar-inscripciones-torneos',
  templateUrl: './agregar-inscripciones-torneos.page.html',
  styleUrls: ['./agregar-inscripciones-torneos.page.scss'],
})
export class AgregarInscripcionesTorneosPage {
  id_usuario!: number;
  id_torneo!: number;
  fecha_inscripcion!: string;

  constructor(private bd: ServicebdService, private alertController: AlertController) {}

  async insertar() {
    if (!this.id_usuario || !this.id_torneo || !this.fecha_inscripcion) {
      const alert = await this.alertController.create({
        header: 'Error',
        message: 'Todos los campos son obligatorios.',
        buttons: ['OK'],
      });
      await alert.present();
      return;
    }

    try {
      await this.bd.insertarInscripcion(this.id_torneo, this.id_usuario, this.fecha_inscripcion);
      const alert = await this.alertController.create({
        header: 'Éxito',
        message: `Inscripción al torneo con ID "${this.id_torneo}" ha sido agregada correctamente.`,
        buttons: ['OK'],
      });
      await alert.present();
      this.id_usuario = 0;
      this.id_torneo = 0;
      this.fecha_inscripcion = '';
    } catch (error) {
      console.error('Error al agregar la inscripción:', error);
      const alert = await this.alertController.create({
        header: 'Error',
        message: 'Hubo un problema al agregar la inscripción. Inténtelo nuevamente.',
        buttons: ['OK'],
      });
      await alert.present();
    }
  }
}
