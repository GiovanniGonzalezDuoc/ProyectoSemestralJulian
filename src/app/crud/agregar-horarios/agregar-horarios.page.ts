import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { ServicebdService } from 'src/app/services/servicebd.service';

@Component({
  selector: 'app-agregar-horarios',
  templateUrl: './agregar-horarios.page.html',
  styleUrls: ['./agregar-horarios.page.scss'],
})
export class AgregarHorariosPage implements OnInit {
  id_cancha!: number;
  hora_inicio: string = '';
  hora_fin: string = '';
  canchas: any[] = []; // Lista de canchas para el selector

  constructor(private bd: ServicebdService, private alertController: AlertController) {}

  ngOnInit() {
    this.cargarCanchas(); // Cargar la lista de canchas al iniciar
  }

  // Cargar las canchas desde la base de datos
  async cargarCanchas() {
    try {
      this.canchas = await this.bd.obtenerCanchas();
    } catch (error) {
      console.error('Error al cargar las canchas:', error);
    }
  }

  async insertar() {
    if (!this.id_cancha || !this.hora_inicio.trim() || !this.hora_fin.trim()) {
      const alert = await this.alertController.create({
        header: 'Error',
        message: 'Todos los campos son obligatorios.',
        buttons: ['OK'],
      });
      await alert.present();
      return;
    }

    try {
      await this.bd.insertarHorario(this.id_cancha, this.hora_inicio.trim(), this.hora_fin.trim());
      const alert = await this.alertController.create({
        header: 'Éxito',
        message: `El horario "${this.hora_inicio} - ${this.hora_fin}" ha sido agregado correctamente.`,
        buttons: ['OK'],
      });
      await alert.present();
      this.id_cancha = 0;
      this.hora_inicio = '';
      this.hora_fin = '';
    } catch (error) {
      console.error('Error al agregar el horario:', error);
      const alert = await this.alertController.create({
        header: 'Error',
        message: 'Hubo un problema al agregar el horario. Inténtelo nuevamente.',
        buttons: ['OK'],
      });
      await alert.present();
    }
  }
}
