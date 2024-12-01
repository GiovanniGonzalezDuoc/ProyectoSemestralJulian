import { Component, OnInit } from '@angular/core';
import { NativeStorage } from '@awesome-cordova-plugins/native-storage/ngx';
import { Camera, CameraResultType } from '@capacitor/camera';
import { Platform } from '@ionic/angular';
import { ServicebdService } from 'src/app/services/servicebd.service';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
})
export class PerfilPage implements OnInit {
  Usuario: any = {};
  foto!: any;
  id_usuario!: number;
  editando: boolean = false;

  constructor(private bdService: ServicebdService, private platform: Platform,private storage:NativeStorage) {
  }

  async ngOnInit() {
    try {
      const id = await this.storage.getItem('id_usuario');
      if (id) {
        this.id_usuario = id;
        await this.cargarUsuario();
      } else {
        this.bdService.presentAlert('Error', 'No se pudo obtener el ID del usuario.');
      }
    } catch (error) {
      console.error('Error al obtener el ID del usuario:', error);
      this.bdService.presentAlert('Error', 'Error al obtener el ID del usuario.');
    }
  }

  async cargarUsuario() {
    try {
      const usuario = await this.bdService.obtenerUsuario(this.id_usuario);
      if (usuario) {
        this.Usuario = usuario;
        this.foto = usuario.foto || null; // Si no hay foto, muestra un placeholder
        console.log('Usuario cargado:', this.Usuario);
      } else {
        console.warn('No se encontró el usuario con el ID:', this.id_usuario);
      }
    } catch (error) {
      console.error('Error al cargar el usuario:', error);
    }
  }

  async selectPhoto() {
    try {
      const image = await Camera.getPhoto({
        quality: 90,
        allowEditing: false,
        resultType: CameraResultType.Uri, // Retorna la URI de la imagen
      });

      // Asigna la ruta web de la imagen tomada
      this.foto = image.webPath;

      // Guarda la foto en la base de datos
      if (this.foto) {
        await this.bdService.modificarFotoUsuario(this.id_usuario, this.foto);
        this.Usuario.foto = this.foto; // Actualiza el estado del usuario localmente
      }
    } catch (error) {
      console.error('Error al seleccionar la foto:', error);
    }
  }

  toggleEdicion() {
    this.editando = !this.editando;
  }
  async guardarCambios() {
    if (this.Usuario) {
      try {
        await this.bdService.modificarUsuarioIndividual(
          this.Usuario.id_usuario,
          this.Usuario.nombre,
          this.Usuario.email,
          this.Usuario.contrasena,
          this.Usuario.foto
        );
  
        this.editando = false;
  
        // Recargar los datos del usuario
        await this.cargarUsuario();
        this.bdService.presentToast('bottom', 'Cambios guardados exitosamente.');
      } catch (error) {
        console.error('Error al guardar los cambios:', error);
      }
    }
  }
}
