import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { ServicebdService } from 'src/app/services/servicebd.service';

@Component({
  selector: 'app-modificar-inscripciones-torneos',
  templateUrl: './modificar-inscripciones-torneos.page.html',
  styleUrls: ['./modificar-inscripciones-torneos.page.scss'],
})
export class ModificarInscripcionesTorneosPage implements OnInit {
  inscripcion: any;

  constructor(
    private router: Router,
    private activedRouter: ActivatedRoute,
    private bd: ServicebdService,
    private alertController: AlertController
  ) {
    this.activedRouter.queryParams.subscribe((res) => {
      if (this.router.getCurrentNavigation()?.extras.state) {
        this.inscripcion = this.router.getCurrentNavigation()?.extras?.state?.['inscripcion'];
      }
    });
  }

  ngOnInit() {
    if (!this.inscripcion) {
      this.router.navigate(['/crud/inscripciones-torneos']);
    }
  }

  async modificar() {
    if (!this.inscripcion.id_usuario || !this.inscripcion.id_torneo || !this.inscripcion.fecha_inscripcion) {
      const alert = await this.alertController.create({
        header: 'Error',
        message: 'Todos los campos son obligatorios.',
        buttons: ['OK'],
      });
      await alert.present();
      return;
    }

    try {
      await this.bd.modificarInscripcion(
        this.inscripcion.id_inscripcion,
        this.inscripcion.id_torneo,
        this.inscripcion.id_usuario,
        this.inscripcion.fecha_inscripcion
      );
      const alert = await this.alertController.create({
        header: 'Éxito',
        message: `La inscripción ha sido modificada correctamente.`,
        buttons: ['OK'],
      });
      await alert.present();
      this.router.navigate(['/crud/inscripciones-torneos']);
    } catch (error) {
      console.error('Error al modificar la inscripción:', error);
      const alert = await this.alertController.create({
        header: 'Error',
        message: 'Hubo un problema al modificar la inscripción. Inténtelo nuevamente.',
        buttons: ['OK'],
      });
      await alert.present();
    }
  }
}
