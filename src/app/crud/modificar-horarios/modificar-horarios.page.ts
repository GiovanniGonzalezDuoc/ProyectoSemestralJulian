import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { ServicebdService } from 'src/app/services/servicebd.service';

@Component({
  selector: 'app-modificar-horarios',
  templateUrl: './modificar-horarios.page.html',
  styleUrls: ['./modificar-horarios.page.scss'],
})
export class ModificarHorariosPage implements OnInit {
  horario: any;

  constructor(
    private router: Router,
    private activedRouter: ActivatedRoute,
    private bd: ServicebdService,
    private alertController: AlertController
  ) {
    this.activedRouter.queryParams.subscribe((res) => {
      if (this.router.getCurrentNavigation()?.extras.state) {
        this.horario = this.router.getCurrentNavigation()?.extras?.state?.['horario'];
      }
    });
  }

  ngOnInit() {
    if (!this.horario) {
      this.router.navigate(['/crud/horarios']);
    }
  }

  async modificar() {
    if (!this.horario.hora_inicio.trim() || !this.horario.hora_fin.trim()) {
      const alert = await this.alertController.create({
        header: 'Error',
        message: 'Ambos campos son obligatorios.',
        buttons: ['OK'],
      });
      await alert.present();
      return;
    }

    try {
      await this.bd.modificarHorario(this.horario.id_horario,this.horario.id_cancha,this.horario.hora_inicio.trim(), this.horario.hora_fin.trim());
      const alert = await this.alertController.create({
        header: 'Éxito',
        message: `El horario "${this.horario.hora_inicio} - ${this.horario.hora_fin}" ha sido modificado correctamente.`,
        buttons: ['OK'],
      });
      await alert.present();
      this.router.navigate(['/crud/horarios']);
    } catch (error) {
      console.error('Error al modificar el horario:', error);
      const alert = await this.alertController.create({
        header: 'Error',
        message: 'Hubo un problema al modificar el horario. Inténtelo nuevamente.',
        buttons: ['OK'],
      });
      await alert.present();
    }
  }
}
