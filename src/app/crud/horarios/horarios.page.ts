import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { ServicebdService } from 'src/app/services/servicebd.service';

@Component({
  selector: 'app-horarios',
  templateUrl: './horarios.page.html',
  styleUrls: ['./horarios.page.scss'],
})
export class HorariosPage implements OnInit {
  arregloHorarios: any[] = []; // Lista de horarios

  constructor(
    private bd: ServicebdService,
    private router: Router,
    private alertController: AlertController
  ) {}

  ngOnInit() {
    // Observar si la base de datos está lista
    this.bd.dbState().subscribe((data) => {
      if (data) {
        // Observar la lista de horarios
        this.bd.fetchHorarios().subscribe((res) => {
          this.arregloHorarios = res;
        });
      }
    });
  }

  // Función para modificar un horario
  modificar(horario: any) {
    this.router.navigate(['/crud/modificar-horarios'], {
      state: { horario },
    });
  }

  // Función para eliminar un horario
  async eliminar(horario: any) {
    const alert = await this.alertController.create({
      header: 'Confirmar Eliminación',
      message: `¿Estás seguro de que deseas eliminar el horario "${horario.hora_inicio} - ${horario.hora_fin}"?`,
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
        },
        {
          text: 'Eliminar',
          handler: async () => {
            try {
              await this.bd.eliminarHorario(horario.id_horario);
              this.bd.presentToast('bottom', `Horario eliminado correctamente.`);
            } catch (error) {
              console.error('Error al eliminar el horario:', error);
              this.bd.presentAlert('Error', 'No se pudo eliminar el horario. Inténtelo nuevamente.');
            }
          },
        },
      ],
    });
    await alert.present();
  }

  // Función para agregar un nuevo horario
  agregar() {
    this.router.navigate(['/crud/agregar-horarios']);
  }
}
