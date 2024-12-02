import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { ServicebdService } from 'src/app/services/servicebd.service';

@Component({
  selector: 'app-modificar-canchas',
  templateUrl: './modificar-canchas.page.html',
  styleUrls: ['./modificar-canchas.page.scss'],
})
export class ModificarCanchasPage implements OnInit {
  cancha: any;

  constructor(
    private router: Router,
    private activedRouter: ActivatedRoute,
    private bd: ServicebdService,
    private alertController: AlertController
  ) {
    this.activedRouter.queryParams.subscribe((res) => {
      if (this.router.getCurrentNavigation()?.extras.state) {
        this.cancha = this.router.getCurrentNavigation()?.extras?.state?.['cancha'];
      }
    });
  }

  ngOnInit() {
    if (!this.cancha) {
      this.router.navigate(['/crud/canchas']); // Redirige si no hay cancha seleccionada
    }
  }

  async modificar() {
    if (!this.cancha.nombre_cancha.trim() || !this.cancha.tipo_deporte.trim()) {
      const alert = await this.alertController.create({
        header: 'Error',
        message: 'Todos los campos son obligatorios.',
        buttons: ['OK'],
      });
      await alert.present();
      return;
    }

    try {
      await this.bd.modificarCancha(this.cancha.id_cancha, this.cancha.nombre_cancha.trim(), this.cancha.tipo_deporte.trim(),this.cancha.estado_cancha.trim());
      const alert = await this.alertController.create({
        header: 'Éxito',
        message: `La cancha "${this.cancha.nombre_cancha}" ha sido modificada correctamente.`,
        buttons: ['OK'],
      });
      await alert.present();
      this.router.navigate(['/crud/canchas']);
    } catch (error) {
      console.error('Error al modificar la cancha:', error);
      const alert = await this.alertController.create({
        header: 'Error',
        message: 'Hubo un problema al modificar la cancha. Inténtelo nuevamente.',
        buttons: ['OK'],
      });
      await alert.present();
    }
  }
}
