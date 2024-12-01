import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-nosotros',
  templateUrl: './nosotros.page.html',
  styleUrls: ['./nosotros.page.scss'],
})
export class NosotrosPage implements OnInit {
  nosotros: any[] = []; // Array para almacenar la información de la API
  loading: boolean = true; // Indicador de carga

  constructor(private apiService: ApiService) {}

  ngOnInit() {
    this.cargarInformacion();
  }

  cargarInformacion() {
    this.apiService.getNoticias().subscribe(
      (data) => {
        this.nosotros = data; // Almacenar los datos obtenidos de la API
        this.loading = false; // Ocultar spinner de carga
      },
      (error) => {
        console.error('Error al cargar la información:', error);
        this.loading = false; // En caso de error, ocultar spinner
      }
    );
  }
}
