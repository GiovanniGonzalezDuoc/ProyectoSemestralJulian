import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { ServicebdService } from 'src/app/services/servicebd.service';

@Component({
  selector: 'app-roles',
  templateUrl: './roles.page.html',
  styleUrls: ['./roles.page.scss'],
})
export class RolesPage implements OnInit {
  arregloRol: any[] = []; // Lista de roles

  constructor(
    private bd: ServicebdService,
    private router: Router,
    private alertController: AlertController
  ) {}

  ngOnInit() {
    // Observar si la base de datos está lista
    this.bd.dbState().subscribe((data) => {
      if (data) {
        // Observar la lista de roles
        this.bd.fetchRoles().subscribe((res) => {
          this.arregloRol = res;
        });
      }
    });
  }

  // Función para modificar un rol
  modificar(rol: any) {
    let navigationExtras: NavigationExtras = {
      state: {
        rol: rol, // Pasar el rol seleccionado como estado
      },
    };
    this.router.navigate(['/crud/modificar-roles'], navigationExtras);
  }

  // Función para eliminar un rol
  async eliminar(rol: any) {
    const alert = await this.alertController.create({
      header: 'Confirmar Eliminación',
      message: `¿Estás seguro de que deseas eliminar el rol "${rol.nombre_rol}"?`,
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
        },
        {
          text: 'Eliminar',
          handler: async () => {
            try {
              await this.bd.eliminarRol(rol.id_rol);
              this.bd.presentToast('bottom', `Rol "${rol.nombre_rol}" eliminado correctamente.`);
            } catch (error) {
              console.error('Error al eliminar el rol:', error);
              this.bd.presentAlert('Error', 'No se pudo eliminar el rol. Inténtelo nuevamente.');
            }
          },
        },
      ],
    });
    await alert.present();
  }

  // Función para agregar un nuevo rol
  agregar() {
    this.router.navigate(['/crud/agregar-roles']);
  }
}
