import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NativeStorage } from '@awesome-cordova-plugins/native-storage/ngx';
import { AlertController } from '@ionic/angular';
import { ServicebdService } from 'src/app/services/servicebd.service';

@Component({
  selector: 'app-futbolito',
  templateUrl: './futbolito.page.html',
  styleUrls: ['./futbolito.page.scss'],
})
export class FutbolitoPage implements OnInit {
  selectedCancha!: number;
  selectedDay!: number;  // Día seleccionado
  selectedMonth!: number;  // Mes seleccionado
  selectedYear!: number;  // Año seleccionado
  selectedHorario!: number; // ID del horario seleccionado
  correo!: string | null;
  id_usuario!: number;

  // Listas de días, meses y años
  days: number[] = Array.from({ length: 31 }, (_, i) => i + 1);  // Días 1 al 31
  months: string[] = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];  // Meses del año
  years: number[] = [new Date().getFullYear(), new Date().getFullYear() + 1];  // Año actual y siguiente

  // Lista de canchas y horarios
  canchasDisponibles: any[] = [];
  horariosDisponibles: any[] = [];

  constructor(public alertController: AlertController, private bd: ServicebdService, private router: Router, private storage: NativeStorage) { }

  ngOnInit() {
    this.cargarCanchas();
    this.storage.getItem('correo').then(correo => {
      this.correo = correo;
    })
    this.storage.getItem('id_usuario').then(id => {
      this.id_usuario = id;
    })
  }

  async cargarCanchas() {
    try {
      this.canchasDisponibles = await this.bd.obtenerCanchas();
    } catch (error) {
      console.error('Error al cargar las canchas:', error);
    }
  }

  async cargarHorarios() {
    if (this.selectedCancha) {
      try {
        // Obtener los horarios de la cancha seleccionada
        this.horariosDisponibles = await this.bd.obtenerHorariosDisponibles(this.selectedCancha);
        console.log('Horarios disponibles para la cancha seleccionada:', this.horariosDisponibles);
      } catch (error) {
        console.error('Error al cargar los horarios:', error);
      }
    } else {
      // Si no se ha seleccionado una cancha, limpiar los horarios disponibles
      this.horariosDisponibles = [];
    }
  }
  // Validar si una fecha es válida
  esFechaValida(day: number, month: number, year: number): boolean {
    console.log('Validando fecha:', day, month, year);
    const fecha = new Date(year, month - 1, day);
    console.log('Fecha generada:', fecha);
  
    const isValid =
      fecha.getFullYear() === year &&
      fecha.getMonth() === month - 1 &&
      fecha.getDate() === day;
  
    console.log('¿Es válida?', isValid);
    return isValid;
  }


  async confirmarReserva() {
    if (this.selectedCancha && this.selectedDay && this.selectedMonth && this.selectedYear && this.selectedHorario && this.correo) {
      if (!this.esFechaValida(this.selectedDay, this.selectedMonth, this.selectedYear)) {
        console.log('Día:', this.selectedDay, 'Mes:', this.selectedMonth, 'Año:', this.selectedYear);
        const alert = await this.alertController.create({
          header: 'Fecha no válida',
          message: `La fecha seleccionada (${this.selectedDay}/${this.selectedMonth}/${this.selectedYear}) no es válida.`,
          buttons: ['OK'],
        });
        await alert.present();
        return;
      }
      // Formatear la fecha de la reserva
      const fechaReserva = `${this.selectedYear}-${this.selectedMonth < 10 ? '0' : ''}${this.selectedMonth}-${this.selectedDay < 10 ? '0' : ''}${this.selectedDay}`;

      // Puedes asignar el estado de la reserva como 'Confirmada'
      const estadoReserva = 'Confirmada';

      // Llamar a la función insertarReserva para guardar la reserva en la base de datos
      await this.bd.insertarReserva(this.id_usuario, this.selectedCancha, fechaReserva + ' ' + this.selectedHorario, estadoReserva, this.correo);

      // Mostrar mensaje de confirmación
      this.bd.presentToast('bottom', `Reserva Confirmada: ${this.selectedHorario} ${fechaReserva} ${this.correo}`);

      // Redirigir al usuario a la página de inicio o alguna otra página
      this.router.navigate(['/home']);
    } else {
      // Mostrar mensaje de error si algún campo está vacío
      const alert = await this.alertController.create({
        header: 'Error',
        message: 'Por favor completa todos los campos.',
        buttons: ['OK'],
      });
      await alert.present();
    }
  }

}
