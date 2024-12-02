import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { ServicebdService } from 'src/app/services/servicebd.service';

@Component({
  selector: 'app-torneos',
  templateUrl: './torneos.page.html',
  styleUrls: ['./torneos.page.scss'],
})
export class TorneosPage implements OnInit {
  arregloTorneos: any[] = []; // Lista de torneos

  constructor(
    private bd: ServicebdService,
    private router: Router,
    private alertController: AlertController
  ) {}

  ngOnInit() {
    // Observar si la base de datos está lista
    this.bd.dbState().subscribe((data) => {
      if (data) {
        // Observar la lista de torneos
        this.bd.fetchTorneos().subscribe((res) => {
          this.arregloTorneos = res;
        });
      }
    });
  }

  // Función para modificar un torneo
  modificar(torneo: any) {
    this.router.navigate(['/crud/modificar-torneo'], {
      state: { torneo },
    });
  }

  // Función para eliminar un torneo
  async eliminar(torneo: any) {
    const alert = await this.alertController.create({
      header: 'Confirmar Eliminación',
      message: `¿Estás seguro de que deseas eliminar el torneo "${torneo.nombre_torneo}"?`,
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
        },
        {
          text: 'Eliminar',
          handler: async () => {
            try {
              await this.bd.eliminarTorneo(torneo.id_torneo);
              this.bd.presentToast('bottom', `Torneo eliminado correctamente.`);
            } catch (error) {
              console.error('Error al eliminar el torneo:', error);
              this.bd.presentAlert('Error', 'No se pudo eliminar el torneo. Inténtelo nuevamente.');
            }
          },
        },
      ],
    });
    await alert.present();
  }

  // Función para agregar un nuevo torneo
  agregar() {
    this.router.navigate(['/crud/agregar-torneo']);
  }
}
