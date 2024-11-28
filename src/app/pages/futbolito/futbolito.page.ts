import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { ServicebdService } from 'src/app/services/servicebd.service';

@Component({
  selector: 'app-futbolito',
  templateUrl: './futbolito.page.html',
  styleUrls: ['./futbolito.page.scss'],
})
export class FutbolitoPage implements OnInit {
  selectedCancha!: number;
  selectedDate!: string;
  selectedHorario!: number; // ID del horario seleccionado
  correo!: string;
  minDate: string = new Date().toISOString().split('T')[0];
  canchasDisponibles: any[] = [];
  horariosDisponibles: any[] = []; // Horarios dinámicos

  constructor(public alertController: AlertController, private bd: ServicebdService) {}

  ngOnInit() {
    this.cargarCanchas();
  }

  async cargarCanchas() {
    try {
      this.canchasDisponibles = await this.bd.obtenerCanchas();
    } catch (error) {
      console.error('Error al cargar las canchas:', error);
    }
  }

  async cargarHorarios() {
    if (this.selectedCancha && this.selectedDate) {
      try {
        this.horariosDisponibles = await this.bd.obtenerHorariosDisponibles(
          this.selectedCancha,
          this.selectedDate
        );
      } catch (error) {
        console.error('Error al cargar los horarios:', error);
      }
    }
  }

  async confirmarReserva() {
    if (this.selectedCancha && this.selectedDate && this.selectedHorario && this.correo) {
      // Aquí insertarías la lógica para confirmar la reserva, guardando el ID del horario
      console.log('Reserva confirmada:', this.selectedHorario, this.selectedDate, this.correo);
    } else {
      const alert = await this.alertController.create({
        header: 'Error',
        message: 'Por favor completa todos los campos.',
        buttons: ['OK'],
      });
      await alert.present();
    }
  }
}
