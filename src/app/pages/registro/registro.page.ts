import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, ToastController } from '@ionic/angular';
import { ServicebdService } from 'src/app/services/servicebd.service';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
})
export class RegistroPage implements OnInit {
  nombre: string = '';
  apellido: string = '';
  id_rol: number = 2; // El rol por defecto es 'Usuario'
  correo: string = '';
  contrasena: string = '';
  Recontrasena: string = '';

  constructor(
    private bd: ServicebdService,
    private router: Router,
    private toastController: ToastController,
    private alertController: AlertController
  ) {}

  ngOnInit() {}

  // Validar correo electrónico
  validarEmail(email: string): boolean {
    const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return re.test(String(email).toLowerCase());
  }

  // Validar formulario y mostrar alertas si es necesario
  async registrarUsuario() {
    if (!this.nombre || !this.apellido || !this.correo || !this.contrasena) {
      this.presentAlert('Campos incompletos', 'Por favor, complete todos los campos.');
      return;
    }

    const nombreRegex = /^[a-zA-ZÀ-ÿ\s-]+$/;
    if (!nombreRegex.test(this.nombre)) {
      this.presentAlert('Nombre inválido', 'El nombre solo debe contener letras, espacios y guiones.');
      return;
    }

    if (!nombreRegex.test(this.apellido)) {
      this.presentAlert('Apellido inválido', 'El apellido solo debe contener letras, espacios y guiones.');
      return;
    }

    if (!this.validarEmail(this.correo)) {
      this.presentAlert('Correo inválido', 'Por favor, ingrese un correo electrónico válido.');
      return;
    }

    if (this.contrasena.length < 8) {
      this.presentAlert('Contraseña corta', 'La contraseña debe tener al menos 8 caracteres.');
      return;
    }
    if (this.contrasena!==this.Recontrasena){
      this.presentAlert('Contraseñas No son Iguales',"Porfavor Ingresar Contraseñas iguales");
      return
    }

    const existeUsuario = await this.verificarUsuarioExistente();
    if (existeUsuario) {
      this.presentAlert('Usuario existente', 'El usuario ya está registrado con ese correo.');
      return;
    }

    await this.onSubmit();
  }

  async verificarUsuarioExistente(): Promise<boolean> {
    const usuarioExistente = await this.bd.verificarUsuario(this.correo);
    return usuarioExistente;
  }

  async onSubmit() {
    try {
      await this.insertarUsuario();

      const toast = await this.toastController.create({
        message: 'Usuario registrado con éxito',
        color: 'success',
        duration: 2000,
      });
      toast.present();

      this.router.navigate(['/login']);
    } catch (error) {
      console.error('Error al registrar el usuario:', error);
      this.presentAlert('Error', 'Hubo un problema al registrar el usuario. Inténtalo nuevamente.');
    }
  }

  insertarUsuario() {
    const nombreUsuario = this.nombre||' '||this.apellido
    return this.bd.insertarUsuario(nombreUsuario,1, this.correo, this.contrasena);
  }

  async presentAlert(header: string, message: string) {
    const alert = await this.alertController.create({
      header,
      message,
      buttons: ['OK'],
    });
    await alert.present();
  }
}
