import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { ServicebdService } from 'src/app/services/servicebd.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {
  correo: string = ''; // Propiedad para el correo
  contrasena: string = ''; // Propiedad para la contraseña

  constructor(
    private router: Router,
    private bd: ServicebdService
  ) {}


  // Método de inicio de sesión
  async onLogin() {
    if (this.correo && this.contrasena) {
      try {
        const usuario = await this.bd.validarUsuario(this.correo, this.contrasena);
        if (usuario) {
          localStorage.setItem('id_usuario', usuario.id_usuario.toString());
          localStorage.setItem('id_rol', usuario.id_rol.toString());

          if (usuario.id_rol === 1) {
            this.router.navigate(['/admin']);
          } else {
            this.router.navigate(['/home']);
          }
        } else {
          this.bd.presentAlert('Inicio Fallido', 'Correo o contraseña incorrectos.');
        }
      } catch (e) {
        console.error('Error al iniciar sesión:', e);
        this.bd.presentAlert('Error', 'Ocurrió un error al validar el usuario.');
      }
    } else {
      this.bd.presentAlert('Formulario Incompleto', 'Por favor, completa todos los campos.');
    }
  }
}
