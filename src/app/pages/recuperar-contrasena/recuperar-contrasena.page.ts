import { Component, OnInit } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';
import { ServicebdService } from 'src/app/services/servicebd.service';

@Component({
  selector: 'app-recuperar-contrasena',
  templateUrl: './recuperar-contrasena.page.html',
  styleUrls: ['./recuperar-contrasena.page.scss'],
})
export class RecuperarContrasenaPage implements OnInit {
  emailsolicitado: string = '';
  preguntasSeguridad: any[] = [];
  preguntaSeleccionada: number | null = null;
  respuesta: string = '';
  errorPregunta: string = '';
  errorRespuesta: string = '';

  constructor(private router: Router, private bd: ServicebdService) {}

  ngOnInit() {
    this.cargarPreguntas();
  }

  async cargarPreguntas() {
    try {
      this.preguntasSeguridad = await this.bd.listarPreguntas();
    } catch (error) {
      console.error('Error al cargar preguntas de seguridad:', error);
      this.bd.presentAlert('Error', 'No se pudieron cargar las preguntas de seguridad.');
    }
  }

  async verificarDatos() {
    // Validar el formato del correo
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(this.emailsolicitado)) {
      this.bd.presentAlert('Correo Inválido', 'Por favor ingrese un correo válido.');
      return;
    }

    // Verificar si el correo existe en la base de datos
    const emailExiste = await this.bd.verificarUsuario(this.emailsolicitado);
    if (!emailExiste) {
      this.bd.presentAlert('Correo No Encontrado', 'El correo ingresado no está registrado.');
      return;
    }

    // Validar que se seleccione una pregunta de seguridad
    if (this.preguntaSeleccionada === null) {
      this.errorPregunta = 'Por favor seleccione una pregunta de seguridad.';
      return;
    }

    // Validar que se haya ingresado una respuesta
    if (!this.respuesta.trim()) {
      this.errorRespuesta = 'Por favor ingrese la respuesta a la pregunta de seguridad.';
      return;
    }

    // Verificar la respuesta a la pregunta de seguridad
    const respuestaValida = await this.bd.verificarRespuesta(
      this.emailsolicitado,
      this.preguntaSeleccionada,
      this.respuesta
    );

    if (!respuestaValida) {
      this.bd.presentAlert('Respuesta Incorrecta', 'La respuesta ingresada no es válida.');
      return;
    }

    // Redirigir a la página de cambio de contraseña
    const navigationExtras: NavigationExtras = {
      state: { email: this.emailsolicitado },
    };
    this.router.navigate(['/nueva-contrasena'], navigationExtras);
    this.bd.presentToast('bottom', 'Datos verificados correctamente.');
  }
}
