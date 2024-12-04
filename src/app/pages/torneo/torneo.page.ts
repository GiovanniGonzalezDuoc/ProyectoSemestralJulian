import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NativeStorage } from '@awesome-cordova-plugins/native-storage/ngx';
import { ServicebdService } from 'src/app/services/servicebd.service';

@Component({
  selector: 'app-torneo',
  templateUrl: './torneo.page.html',
  styleUrls: ['./torneo.page.scss'],
})
export class TorneoPage implements OnInit {
  torneos: any[] = []; // Lista de torneos
  id_usuario!:number;
  constructor(private bdService: ServicebdService, private router:Router, private storage:NativeStorage) {}

  ngOnInit() {
    // Cargar los torneos al iniciar la página
    this.cargarTorneos();
    this.storage.getItem('id_usuario').then(id=>{
      this.id_usuario=id;
    })
  }

  cargarTorneos() {
    this.bdService.listarTorneos();
    this.bdService.fetchTorneos().subscribe((data) => {
      this.torneos = data;
    });
  }
  async unirseATorneo(torneo: any) {
    const id_usuario = this.id_usuario; // Asume que `id_usuario` ya está disponible
    const fecha_inscripcion = new Date().toISOString(); // Fecha actual en formato ISO
  
    try {
      // Verificar si el usuario ya está inscrito
      const inscripcion = await this.bdService.obtenerInscripcion(torneo.id_torneo, id_usuario);
  
      if (inscripcion) {
        this.bdService.presentToast('bottom','Ya estas inscrito a este torneo.');
        return;
      }
  
      // Insertar nueva inscripción
      await this.bdService.insertarInscripcion(torneo.id_torneo, id_usuario, fecha_inscripcion);
      torneo.unido = true;
      this.cargarTorneos();
    } catch (error) {
      console.error('Error al inscribirse al torneo:', error);
    }
  }
  
  async salirDelTorneo(torneo: any) {
    try {
      // Busca la inscripción correspondiente
      const inscripcion = await this.bdService.obtenerInscripcion(torneo.id_torneo, this.id_usuario);
  
      if (inscripcion) {
        // Elimina la inscripción usando su `id_inscripcion`
        await this.bdService.eliminarInscripcion(inscripcion.id_inscripcion);
        torneo.unido = false; // Actualiza el estado localmente
        this.cargarTorneos(); // Refresca la lista de torneos
      } else {
        this.bdService.presentToast('bottom','No se encontró inscripción para el usuario y torneo proporcionados.');
      }
    } catch (error) {
      this.bdService.presentToast('bottom','Error al salir del torneo:' + error);
    }
  }
}

