import { Component, OnInit } from '@angular/core';
import { NativeStorage } from '@awesome-cordova-plugins/native-storage/ngx';
import { AlertController } from '@ionic/angular';
import { ServicebdService } from 'src/app/services/servicebd.service';

@Component({
  selector: 'app-historial',
  templateUrl: './historial.page.html',
  styleUrls: ['./historial.page.scss'],
})
export class HistorialPage implements OnInit {
  correo: string = ''; // Correo obtenido del NativeStorage
  historialReservas: any[] = []; // Lista de reservas obtenidas

  constructor(
    private bdService: ServicebdService,
    private alertController: AlertController,
    private storage: NativeStorage
  ) {}

  ngOnInit() {
    // Obtener el correo desde NativeStorage y luego cargar el historial
    this.storage
      .getItem('correo')
      .then(correo => {
        this.correo = correo; // Asigna el correo obtenido
        if (this.correo) {
          this.consultarHistorial(); // Carga el historial si el correo es válido
        } else {
          this.mostrarAlertaCorreoNoDefinido();
        }
      })
      .catch(error => {
        console.error('Error al obtener el correo del NativeStorage:', error);
        this.mostrarAlertaCorreoNoDefinido();
      });
  }

  async consultarHistorial() {
    try {
      // Llamar al servicio para obtener las reservas asociadas al correo
      this.historialReservas = await this.bdService.obtenerReservasPorCorreo(this.correo);

      if (this.historialReservas.length === 0) {
        // Mostrar mensaje si no hay reservas
        const alert = await this.alertController.create({
          header: 'Sin resultados',
          message: `No se encontraron reservas asociadas al correo: ${this.correo}.`,
          buttons: ['OK'],
        });
        await alert.present();
      }
    } catch (error) {
      console.error('Error al consultar el historial de reservas:', error);
      const alert = await this.alertController.create({
        header: 'Error',
        message: 'Ocurrió un error al consultar el historial. Inténtelo nuevamente.',
        buttons: ['OK'],
      });
      await alert.present();
    }
  }

  async mostrarAlertaCorreoNoDefinido() {
    const alert = await this.alertController.create({
      header: 'Error',
      message: 'No se pudo obtener el correo electrónico. Asegúrese de haber iniciado sesión correctamente.',
      buttons: ['OK'],
    });
    await alert.present();
  }
}
