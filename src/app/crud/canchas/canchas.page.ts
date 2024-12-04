import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { ServicebdService } from 'src/app/services/servicebd.service';

@Component({
  selector: 'app-canchas',
  templateUrl: './canchas.page.html',
  styleUrls: ['./canchas.page.scss'],
})
export class CanchasPage implements OnInit {
  arregloCanchas: any[] = []; // Lista de canchas

  constructor(
    private bd: ServicebdService,
    private router: Router,
    private alertController: AlertController
  ) {}

  ngOnInit() {
    // Observar si la base de datos está lista
    this.bd.dbState().subscribe((data) => {
      if (data) {
        // Observar la lista de canchas
        this.bd.fetchCanchasl().subscribe((res) => {
          this.arregloCanchas = res;
        });
      }
    });
  }

  // Función para modificar una cancha
  modificar(x: any) {
    let navigationsExtras: NavigationExtras ={
      state:{
        cancha: x
      }
    }
    this.router.navigate(['/crud/modificar-canchas'],navigationsExtras);
  }

  // Función para eliminar una cancha
  async eliminar(cancha: any) {
    const alert = await this.alertController.create({
      header: 'Confirmar Eliminación',
      message: `¿Estás seguro de que deseas eliminar la cancha "${cancha.nombre_cancha}"?`,
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
        },
        {
          text: 'Eliminar',
          handler: async () => {
            try {
              await this.bd.eliminarCancha(cancha.id_cancha);
              this.bd.presentToast('bottom', `Cancha "${cancha.nombre_cancha}" eliminada correctamente.`);
            } catch (error) {
              console.error('Error al eliminar la cancha:', error);
              this.bd.presentAlert('Error', 'No se pudo eliminar la cancha. Inténtelo nuevamente.');
            }
          },
        },
      ],
    });
    await alert.present();
  }

  // Función para agregar una nueva cancha
  agregar() {
    this.router.navigate(['/crud/agregar-canchas']);
  }
}
