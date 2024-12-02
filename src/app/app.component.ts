import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { Router } from '@angular/router';
import { NativeStorage } from '@awesome-cordova-plugins/native-storage/ngx';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit {
  id_rol: number | null = null;

  constructor(
    private menu: MenuController,
    private router: Router,
    private storage: NativeStorage
  ) {}

  async ngOnInit() {
    // Obtener el rol del usuario desde NativeStorage
    try {
      this.id_rol = await this.storage.getItem('id_rol');
    } catch (error) {
      console.error('Error al obtener el rol del usuario:', error);
      this.id_rol = null; // En caso de error, asignar null
    }
  }

  async navigateTo(path: string) {
    // Cierra el menú lateral antes de redirigir
    await this.menu.close();
    this.router.navigate([path]);
  }
}
