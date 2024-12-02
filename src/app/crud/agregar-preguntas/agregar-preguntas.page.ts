import { Component } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { ServicebdService } from 'src/app/services/servicebd.service';

@Component({
  selector: 'app-agregar-preguntas',
  templateUrl: './agregar-preguntas.page.html',
  styleUrls: ['./agregar-preguntas.page.scss'],
})
export class AgregarPreguntasPage {
  texto_pregunta: string = '';

  constructor(private bd: ServicebdService, private alertController: AlertController) {}

  async insertar() {
    if (!this.texto_pregunta.trim()) {
      const alert = await this.alertController.create({
        header: 'Error',
        message: 'El texto de la pregunta no puede estar vacío.',
        buttons: ['OK'],
      });
      await alert.present();
      return;
    }

    try {
      await this.bd.insertarPreguntas(this.texto_pregunta.trim());
      const alert = await this.alertController.create({
        header: 'Éxito',
        message: `La pregunta "${this.texto_pregunta}" ha sido agregada correctamente.`,
        buttons: ['OK'],
      });
      await alert.present();
      this.texto_pregunta = '';
    } catch (error) {
      console.error('Error al agregar la pregunta:', error);
      const alert = await this.alertController.create({
        header: 'Error',
        message: 'Hubo un problema al agregar la pregunta. Inténtelo nuevamente.',
        buttons: ['OK'],
      });
      await alert.present();
    }
  }
}
