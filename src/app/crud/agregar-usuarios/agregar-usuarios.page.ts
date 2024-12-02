import { Component } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { ServicebdService } from 'src/app/services/servicebd.service';

@Component({
  selector: 'app-agregar-usuarios',
  templateUrl: './agregar-usuarios.page.html',
  styleUrls: ['./agregar-usuarios.page.scss'],
})
export class AgregarUsuariosPage {
  nombre: string = '';
  email: string = '';
  contrasena: string = '';
  id_rol!:number;
  id_pregunta!:number;
  respuesta:string='';
  fotoPredeterminada:any = "/assets/icon/perfil.jpg";

  constructor(private bd: ServicebdService, private alertController: AlertController) {}

  async insertar() {
    if (!this.nombre.trim() || !this.email.trim() || !this.contrasena.trim()) {
      const alert = await this.alertController.create({
        header: 'Error',
        message: 'Todos los campos son obligatorios.',
        buttons: ['OK'],
      });
      await alert.present();
      return;
    }

    try {
      await this.bd.insertarUsuario(this.nombre.trim(),this.id_rol, this.email.trim(), this.contrasena.trim(),this.fotoPredeterminada,this.id_pregunta,this.respuesta);
      const alert = await this.alertController.create({
        header: 'Éxito',
        message: `El usuario "${this.nombre}" ha sido agregado correctamente.`,
        buttons: ['OK'],
      });
      await alert.present();
      this.nombre = '';
      this.email = '';
      this.contrasena = '';
    } catch (error) {
      console.error('Error al agregar el usuario:', error);
      const alert = await this.alertController.create({
        header: 'Error',
        message: 'Hubo un problema al agregar el usuario. Inténtelo nuevamente.',
        buttons: ['OK'],
      });
      await alert.present();
    }
  }
}
