import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { ServicebdService } from 'src/app/services/servicebd.service';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.page.html',
  styleUrls: ['./usuarios.page.scss'],
})
export class UsuariosPage implements OnInit {
  arregloUsuarios: any[] = []; // Lista de usuarios

  constructor(
    private bd: ServicebdService,
    private router: Router,
    private alertController: AlertController
  ) {}

  ngOnInit() {
    // Observar si la base de datos está lista
    this.bd.dbState().subscribe((data) => {
      if (data) {
        // Observar la lista de usuarios
        this.bd.fetchUsuarios().subscribe((res) => {
          this.arregloUsuarios = res;
        });
      }
    });
  }

  // Función para modificar un usuario
  modificar(usuario: any) {
    this.router.navigate(['/crud/modificar-usuario'], {
      state: { usuario },
    });
  }

  // Función para eliminar un usuario
  async eliminar(usuario: any) {
    const alert = await this.alertController.create({
      header: 'Confirmar Eliminación',
      message: `¿Estás seguro de que deseas eliminar al usuario "${usuario.nombre}"?`,
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
        },
        {
          text: 'Eliminar',
          handler: async () => {
            try {
              await this.bd.eliminarUsuario(usuario.id_usuario);
              this.bd.presentToast('bottom', `Usuario "${usuario.nombre}" eliminado correctamente.`);
            } catch (error) {
              console.error('Error al eliminar el usuario:', error);
              this.bd.presentAlert('Error', 'No se pudo eliminar el usuario. Inténtelo nuevamente.');
            }
          },
        },
      ],
    });
    await alert.present();
  }

  // Función para agregar un nuevo usuario
  agregar() {
    this.router.navigate(['/crud/agregar-usuario']);
  }
}
