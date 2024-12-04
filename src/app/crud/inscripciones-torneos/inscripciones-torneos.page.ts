import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { ServicebdService } from 'src/app/services/servicebd.service';

@Component({
  selector: 'app-inscripciones-torneos',
  templateUrl: './inscripciones-torneos.page.html',
  styleUrls: ['./inscripciones-torneos.page.scss'],
})
export class InscripcionesTorneosPage implements OnInit {
  arregloInscripciones: any[] = []; // Lista de inscripciones

  constructor(
    private bd: ServicebdService,
    private router: Router,
    private alertController: AlertController
  ) {}

  ngOnInit() {
    // Observar si la base de datos está lista
    this.bd.dbState().subscribe((data) => {
      if (data) {
        // Observar la lista de inscripciones
        this.bd.fetchInscripciones().subscribe((res) => {
          this.arregloInscripciones = res;
        });
      }
    });
  }

  // Función para modificar una inscripción
  modificar(inscripcion: any) {
    this.router.navigate(['/crud/modificar-inscripciones-torneos'], {
      state: { inscripcion },
    });
  }

  // Función para eliminar una inscripción
  async eliminar(inscripcion: any) {
    const alert = await this.alertController.create({
      header: 'Confirmar Eliminación',
      message: `¿Estás seguro de que deseas eliminar la inscripción del torneo "${inscripcion.nombre_torneo}"?`,
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
        },
        {
          text: 'Eliminar',
          handler: async () => {
            try {
              await this.bd.eliminarInscripcion(inscripcion.id_inscripcion);
              this.bd.presentToast('bottom', `Inscripción eliminada correctamente.`);
            } catch (error) {
              console.error('Error al eliminar la inscripción:', error);
              this.bd.presentAlert('Error', 'No se pudo eliminar la inscripción. Inténtelo nuevamente.');
            }
          },
        },
      ],
    });
    await alert.present();
  }

  // Función para agregar una nueva inscripción
  agregar() {
    this.router.navigate(['/crud/agregar-inscripciones-torneos']);
  }
}
