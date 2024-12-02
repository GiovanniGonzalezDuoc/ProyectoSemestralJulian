import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { ServicebdService } from 'src/app/services/servicebd.service';

@Component({
  selector: 'app-modificar-torneos',
  templateUrl: './modificar-torneos.page.html',
  styleUrls: ['./modificar-torneos.page.scss'],
})
export class ModificarTorneosPage implements OnInit {
  torneo: any;

  constructor(
    private router: Router,
    private activedRouter: ActivatedRoute,
    private bd: ServicebdService,
    private alertController: AlertController
  ) {
    this.activedRouter.queryParams.subscribe((res) => {
      if (this.router.getCurrentNavigation()?.extras.state) {
        this.torneo = this.router.getCurrentNavigation()?.extras?.state?.['torneo'];
      }
    });
  }

  ngOnInit() {
    if (!this.torneo) {
      this.router.navigate(['/crud/torneos']);
    }
  }

  async modificar() {
    if (!this.torneo.nombre_torneo.trim() || !this.torneo.tipo_deporte.trim() || !this.torneo.fecha_inicio || !this.torneo.fecha_fin || !this.torneo.estado_torneo.trim()) {
      const alert = await this.alertController.create({
        header: 'Error',
        message: 'Todos los campos son obligatorios.',
        buttons: ['OK'],
      });
      await alert.present();
      return;
    }

    try {
      await this.bd.modificarTorneo(
        this.torneo.id_torneo,
        this.torneo.descripcion,
        this.torneo.nombre_torneo.trim(),
        this.torneo.tipo_deporte.trim(),
        this.torneo.fecha_inicio,
        this.torneo.fecha_fin,
        this.torneo.estado_torneo.trim()
      );
      const alert = await this.alertController.create({
        header: 'Éxito',
        message: `El torneo "${this.torneo.nombre_torneo}" ha sido modificado correctamente.`,
        buttons: ['OK'],
      });
      await alert.present();
      this.router.navigate(['/crud/torneos']);
    } catch (error) {
      console.error('Error al modificar el torneo:', error);
      const alert = await this.alertController.create({
        header: 'Error',
        message: 'Hubo un problema al modificar el torneo. Inténtelo nuevamente.',
        buttons: ['OK'],
      });
      await alert.present();
    }
  }
}
