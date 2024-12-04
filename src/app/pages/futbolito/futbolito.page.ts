import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NativeStorage } from '@awesome-cordova-plugins/native-storage/ngx';
import { LocalNotifications } from '@capacitor/local-notifications';
import { AlertController } from '@ionic/angular';
import { ServicebdService } from 'src/app/services/servicebd.service';

@Component({
  selector: 'app-futbolito',
  templateUrl: './futbolito.page.html',
  styleUrls: ['./futbolito.page.scss'],
})
export class FutbolitoPage implements OnInit {
  selectedCancha!: number;
  selectedDay!: number;
  selectedMonth!: number;
  selectedYear!: number;
  selectedHorario!: number;
  correo!: string | null;
  id_usuario!: number;

  days: number[] = Array.from({ length: 31 }, (_, i) => i + 1);
  months: string[] = [
    'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
    'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre',
  ];
  years: number[] = [new Date().getFullYear() + 1];

  canchasDisponibles: any[] = [];
  horariosDisponibles: any[] = [];

  constructor(
    public alertController: AlertController,
    private bd: ServicebdService,
    private router: Router,
    private storage: NativeStorage
  ) {}

  ngOnInit() {
    this.cargarCanchas();
    this.storage.getItem('correo').then(correo => {
      this.correo = correo;
    });
    this.storage.getItem('id_usuario').then(id => {
      this.id_usuario = id;
    });
  }

  // Cargar solo canchas de tipo "Futbolito"
  async cargarCanchas() {
    try {
      const todasCanchas = await this.bd.obtenerCanchas();
      this.canchasDisponibles = todasCanchas.filter(
        (cancha: any) => cancha.tipo_deporte === 'Futbolito' && cancha.estado_cancha === 'Disponible'
      );
    } catch (error) {
      console.error('Error al cargar las canchas:', error);
    }
  }

  // Cargar horarios con estado activo (estado = 1)
  async cargarHorarios() {
    if (this.selectedCancha) {
      try {
        console.log('Cargando horarios para la cancha seleccionada:', this.selectedCancha);
        const horarios = await this.bd.obtenerHorariosDisponiblesFutbolito(this.selectedCancha);
        
        // Verifica que los datos se reciban correctamente
        if (horarios && horarios.length > 0) {
          this.horariosDisponibles = horarios;
          console.log('Horarios disponibles:', this.horariosDisponibles);
        } else {
          console.log('No se encontraron horarios disponibles para esta cancha.');
          this.horariosDisponibles = [];
        }
      } catch (error) {
        console.error('Error al cargar los horarios:', error);
        this.horariosDisponibles = [];
      }
    } else {
      console.log('No se ha seleccionado ninguna cancha.');
      this.horariosDisponibles = [];
    }
  }

  // Confirmar reserva y actualizar estado del horario a inactivo (estado = 0)
  async confirmarReserva() {
    if (
      this.selectedCancha &&
      this.selectedDay &&
      this.selectedMonth &&
      this.selectedYear &&
      this.selectedHorario &&
      this.correo
    ) {
      if (!this.esFechaValida(this.selectedDay, this.selectedMonth, this.selectedYear)) {
        const alert = await this.alertController.create({
          header: 'Fecha no válida',
          message: `La fecha seleccionada (${this.selectedDay}/${this.selectedMonth}/${this.selectedYear}) no es válida.`,
          buttons: ['OK'],
        });
        await alert.present();
        return;
      }

      const fechaReserva = `${this.selectedYear}-${this.selectedMonth < 10 ? '0' : ''}${this.selectedMonth}-${this.selectedDay < 10 ? '0' : ''}${this.selectedDay}`;
      const estadoReserva = 'Confirmada';

      try {
        // Guardar la reserva en la base de datos
        await this.bd.insertarReserva(
          this.id_usuario,
          this.selectedCancha,
          fechaReserva + ' ' + this.selectedHorario,
          estadoReserva,
          this.correo
        );

        // Actualizar el estado del horario a inactivo (estado = 0)
        await this.bd.modificarEstadoHorario(this.selectedHorario, 0);

        // Mostrar mensaje de confirmación
        this.bd.presentToast('bottom', `Reserva Confirmada: ${this.selectedHorario} ${fechaReserva} ${this.correo}`);
        const horarioTexto = this.horariosDisponibles.find(h => h.id === this.selectedHorario)?.horario || 'Horario no disponible';

        // Enviar notificación local
        await LocalNotifications.schedule({
          notifications: [
            {
              title: '¡Reserva Confirmada!',
              body: `Tu reserva en la cancha ${this.selectedCancha} ha sido creada para el ${this.selectedDay}/${this.selectedMonth}/${this.selectedYear} en el horario ${horarioTexto}.`,
              id: 1,
              schedule: { at: new Date(Date.now() + 1000 * 5) },
              sound: undefined,
              attachments: [],
              actionTypeId: '',
              extra: null,
            },
          ],
        });

        // Redirigir al usuario a la página de inicio
        this.router.navigate(['/home']);
      } catch (error) {
        console.error('Error al confirmar la reserva:', error);
        const alert = await this.alertController.create({
          header: 'Error',
          message: 'Hubo un problema al confirmar la reserva. Inténtelo nuevamente.',
          buttons: ['OK'],
        });
        await alert.present();
      }
    } else {
      const alert = await this.alertController.create({
        header: 'Error',
        message: 'Por favor completa todos los campos.',
        buttons: ['OK'],
      });
      await alert.present();
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
}