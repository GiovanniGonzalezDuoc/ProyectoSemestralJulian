import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { ServicebdService } from 'src/app/services/servicebd.service';

@Component({
  selector: 'app-modificar-preguntas',
  templateUrl: './modificar-preguntas.page.html',
  styleUrls: ['./modificar-preguntas.page.scss'],
})
export class ModificarPreguntasPage implements OnInit {
  pregunta: any;

  constructor(
    private router: Router,
    private activedRouter: ActivatedRoute,
    private bd: ServicebdService,
    private alertController: AlertController
  ) {
    this.activedRouter.queryParams.subscribe((res) => {
      if (this.router.getCurrentNavigation()?.extras.state) {
        this.pregunta = this.router.getCurrentNavigation()?.extras?.state?.['pregunta'];
      }
    });
  }

  ngOnInit() {
    if (!this.pregunta) {
      this.router.navigate(['/crud/preguntas']); // Redirige si no hay pregunta seleccionada
    }
  }

  async modificar() {
    if (!this.pregunta.pregunta.trim()) {
      const alert = await this.alertController.create({
        header: 'Error',
        message: 'El texto de la pregunta no puede estar vacío.',
        buttons: ['OK'],
      });
      await alert.present();
      return;
    }

    try {
      await this.bd.modificarPreguntas(this.pregunta.id_pregunta, this.pregunta.pregunta.trim());
      const alert = await this.alertController.create({
        header: 'Éxito',
        message: `La pregunta ha sido modificada correctamente.`,
        buttons: ['OK'],
      });
      await alert.present();
      this.router.navigate(['/crud/preguntas']);
    } catch (error) {
      console.error('Error al modificar la pregunta:', error);
      const alert = await this.alertController.create({
        header: 'Error',
        message: 'Hubo un problema al modificar la pregunta. Inténtelo nuevamente.',
        buttons: ['OK'],
      });
      await alert.present();
    }
  }
}
