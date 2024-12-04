import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { ServicebdService } from 'src/app/services/servicebd.service';

@Component({
  selector: 'app-preguntas',
  templateUrl: './preguntas.page.html',
  styleUrls: ['./preguntas.page.scss'],
})
export class PreguntasPage implements OnInit {
  arregloPreguntas: any[] = []; // Lista de preguntas

  constructor(
    private bd: ServicebdService,
    private router: Router,
    private alertController: AlertController
  ) { }

  ngOnInit() {
    // Observar si la base de datos está lista
    this.bd.dbState().subscribe((data) => {
      if (data) {
        // Observar la lista de roles
        this.bd.fetchPreguntas().subscribe((res) => {
          this.arregloPreguntas = res;
        });
      }
    });
  }

  // Función para modificar una pregunta
  modificar(pregunta: any) {
    this.router.navigate(['/crud/modificar-preguntas'], {
      state: { pregunta },
    });
  }

  // Función para eliminar una pregunta
  async eliminar(pregunta: any) {
    const alert = await this.alertController.create({
      header: 'Confirmar Eliminación',
      message: `¿Estás seguro de que deseas eliminar la pregunta "${pregunta.pregunta}"?`,
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
        },
        {
          text: 'Eliminar',
          handler: async () => {
            try {
              await this.bd.eliminarPreguntas(pregunta.id_pregunta);
              this.bd.presentToast('bottom', `Pregunta eliminada correctamente.`);
            } catch (error) {
              console.error('Error al eliminar la pregunta:', error);
              this.bd.presentAlert('Error', 'No se pudo eliminar la pregunta. Inténtelo nuevamente.');
            }
          },
        },
      ],
    });
    await alert.present();
  }

  // Función para agregar una nueva pregunta
  agregar() {
    this.router.navigate(['/crud/agregar-preguntas']);
  }
}
