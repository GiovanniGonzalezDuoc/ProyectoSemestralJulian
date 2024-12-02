import { Component } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { ServicebdService } from 'src/app/services/servicebd.service';

@Component({
  selector: 'app-agregar-torneos',
  templateUrl: './agregar-torneos.page.html',
  styleUrls: ['./agregar-torneos.page.scss'],
})
export class AgregarTorneosPage {
  nombre_torneo: string = '';
  descripcion:string = '';
  tipo_deporte: string = '';
  fecha_inicio: string = '';
  fecha_fin: string = '';
  estado_torneo: string = '';

  constructor(private bd: ServicebdService, private alertController: AlertController) {}

  async insertar() {
    if (!this.nombre_torneo.trim() || !this.tipo_deporte.trim() || !this.fecha_inicio || !this.fecha_fin || !this.estado_torneo.trim()) {
      const alert = await this.alertController.create({
        header: 'Error',
        message: 'Todos los campos son obligatorios.',
        buttons: ['OK'],
      });
      await alert.present();
      return;
    }

    try {
      await this.bd.insertarTorneo(
        this.nombre_torneo.trim(),
        this.descripcion.trim(),
        this.tipo_deporte.trim(),
        this.fecha_inicio,
        this.fecha_fin,
        this.estado_torneo.trim()
      );
      const alert = await this.alertController.create({
        header: 'Éxito',
        message: `El torneo "${this.nombre_torneo}" ha sido agregado correctamente.`,
        buttons: ['OK'],
      });
      await alert.present();
      this.nombre_torneo = '';
      this.tipo_deporte = '';
      this.fecha_inicio = '';
      this.fecha_fin = '';
      this.estado_torneo = '';
    } catch (error) {
      console.error('Error al agregar el torneo:', error);
      const alert = await this.alertController.create({
        header: 'Error',
        message: 'Hubo un problema al agregar el torneo. Inténtelo nuevamente.',
        buttons: ['OK'],
      });
      await alert.present();
    }
  }
}
