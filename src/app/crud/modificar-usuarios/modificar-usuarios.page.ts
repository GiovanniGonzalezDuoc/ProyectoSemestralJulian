import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { ServicebdService } from 'src/app/services/servicebd.service';

@Component({
  selector: 'app-modificar-usuarios',
  templateUrl: './modificar-usuarios.page.html',
  styleUrls: ['./modificar-usuarios.page.scss'],
})
export class ModificarUsuariosPage implements OnInit {
  usuario: any;
  fotoPredeterminada:any = "/assets/icon/perfil.jpg";

  constructor(
    private router: Router,
    private activedRouter: ActivatedRoute,
    private bd: ServicebdService,
    private alertController: AlertController
  ) {
    this.activedRouter.queryParams.subscribe((res) => {
      if (this.router.getCurrentNavigation()?.extras.state) {
        this.usuario = this.router.getCurrentNavigation()?.extras?.state?.['usuario'];
      }
    });
  }

  ngOnInit() {
    if (!this.usuario) {
      this.router.navigate(['/crud/usuarios']); // Redirige si no hay usuario seleccionado
    }
  }

  async modificar() {
    if (!this.usuario.nombre.trim() || !this.usuario.email.trim() || !this.usuario.contrasena.trim()) {
      const alert = await this.alertController.create({
        header: 'Error',
        message: 'Todos los campos son obligatorios.',
        buttons: ['OK'],
      });
      await alert.present();
      return;
    }

    try {
      await this.bd.modificarUsuarioIndividual(this.usuario.id_usuario, this.usuario.nombre.trim(), this.usuario.email.trim(), this.usuario.contrasena.trim(),this.fotoPredeterminada);
      const alert = await this.alertController.create({
        header: 'Éxito',
        message: `El usuario "${this.usuario.nombre}" ha sido modificado correctamente.`,
        buttons: ['OK'],
      });
      await alert.present();
      this.router.navigate(['/crud/usuarios']);
    } catch (error) {
      console.error('Error al modificar el usuario:', error);
      const alert = await this.alertController.create({
        header: 'Error',
        message: 'Hubo un problema al modificar el usuario. Inténtelo nuevamente.',
        buttons: ['OK'],
      });
      await alert.present();
    }
  }
}
