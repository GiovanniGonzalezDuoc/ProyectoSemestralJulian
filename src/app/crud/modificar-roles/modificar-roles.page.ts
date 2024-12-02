import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { ServicebdService } from 'src/app/services/servicebd.service';

@Component({
  selector: 'app-modificar-roles',
  templateUrl: './modificar-roles.page.html',
  styleUrls: ['./modificar-roles.page.scss'],
})
export class ModificarRolesPage implements OnInit {
  rol: any;

  constructor(
    private router: Router,
    private activedRouter: ActivatedRoute,
    private bd: ServicebdService,
    private alertController: AlertController
  ) {
    this.activedRouter.queryParams.subscribe((res) => {
      if (this.router.getCurrentNavigation()?.extras.state) {
        this.rol = this.router.getCurrentNavigation()?.extras?.state?.['rol'];
      }
    });
  }

  ngOnInit() {
    if (!this.rol) {
      this.router.navigate(['/crud/rol']); // Si no hay rol, redirige a la lista
    }
  }

  async modificar() {
    if (!this.rol.nombre_rol.trim()) {
      const alert = await this.alertController.create({
        header: 'Error',
        message: 'El nombre del rol no puede estar vacío.',
        buttons: ['OK'],
      });
      await alert.present();
      return;
    }

    try {
      await this.bd.modificarRol(this.rol.id_rol, this.rol.nombre_rol.trim());
      const alert = await this.alertController.create({
        header: 'Éxito',
        message: `El rol "${this.rol.nombre_rol}" ha sido modificado exitosamente.`,
        buttons: ['OK'],
      });
      await alert.present();

      // Redirigir a la lista de roles
      this.router.navigate(['/crud/rol']);
    } catch (error) {
      console.error('Error al modificar el rol:', error);
      const alert = await this.alertController.create({
        header: 'Error',
        message: 'Hubo un problema al modificar el rol. Inténtelo nuevamente.',
        buttons: ['OK'],
      });
      await alert.present();
    }
  }
}
