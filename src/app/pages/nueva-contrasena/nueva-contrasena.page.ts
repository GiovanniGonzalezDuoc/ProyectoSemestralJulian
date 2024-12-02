import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ServicebdService } from 'src/app/services/servicebd.service';

@Component({
  selector: 'app-nueva-contrasena',
  templateUrl: './nueva-contrasena.page.html',
  styleUrls: ['./nueva-contrasena.page.scss'],
})
export class NuevaContrasenaPage implements OnInit {
  contrasenasolicitado: string = '';
  recontrasenasolicitada: string = '';
  emailsolicitado: string = '';

  constructor(
    private router: Router,
    private bd: ServicebdService,
    private activedrouter: ActivatedRoute
  ) {
    // Obtener el correo electrónico del estado de navegación
    this.activedrouter.queryParams.subscribe(() => {
      const navigation = this.router.getCurrentNavigation();
      if (navigation?.extras?.state) {
        this.emailsolicitado = navigation.extras.state['email'];
      }
    });
  }

  ngOnInit() {}

  async Contrasena() {
    const contrasena = this.contrasenasolicitado.trim();
    const recontrasena = this.recontrasenasolicitada.trim();

    // Validaciones de contraseña
    if (!/(?=.*[A-Z])(?=.*[!@#$%^&*])(?=.{8,})/.test(contrasena)) {
      this.bd.presentAlert(
        'Contraseña Inválida',
        'La contraseña debe tener al menos 8 caracteres, una mayúscula y un carácter especial.'
      );
      return;
    }

    if (contrasena !== recontrasena) {
      this.bd.presentAlert(
        'Error en las Contraseñas',
        'Las contraseñas ingresadas no coinciden.'
      );
      return;
    }

    try {
      // Actualizar la contraseña en la base de datos
      await this.bd.modificarContrasena(this.emailsolicitado, contrasena);
      this.bd.presentToast(
        'bottom',
        'Se ha cambiado correctamente la contraseña.'
      );
      this.router.navigate(['/login']); // Redirigir al login
    } catch (error) {
      console.error('Error al modificar la contraseña:', error);
      this.bd.presentAlert(
        'Error',
        'No se pudo cambiar la contraseña. Intente nuevamente.'
      );
    }
  }
}
