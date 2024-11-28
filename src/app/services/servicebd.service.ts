import { Injectable } from '@angular/core';
import { SQLite, SQLiteObject } from '@awesome-cordova-plugins/sqlite/ngx';
import { AlertController, Platform, ToastController } from '@ionic/angular';
import { BehaviorSubject, Observable } from 'rxjs';
import { Cancha } from '../models/cancha';
import { Inscripcion } from '../models/inscripcion';
import { Reserva } from '../models/reserva';
import { Rol } from '../models/rol';
import { Torneo } from '../models/torneo';
import { Usuario } from '../models/usuario';
import { Historialreserva } from '../models/historialreserva';



@Injectable({
  providedIn: 'root'
})
export class ServicebdService {
  //variable de conexión a Base de Datos
  public database!: SQLiteObject;

  //variables de creación de Tablas
  //variables de creación de tablas
  tablaCanchas: string = `CREATE TABLE IF NOT EXISTS canchas (
    id_cancha INTEGER PRIMARY KEY AUTOINCREMENT, 
    tipo_deporte TEXT NOT NULL, 
    nombre_cancha TEXT NOT NULL, 
    estado_cancha TEXT NOT NULL
  );`;

  tablaRoles: string = `CREATE TABLE IF NOT EXISTS roles (
    id_rol INTEGER PRIMARY KEY AUTOINCREMENT, 
    nombre_rol TEXT NOT NULL
  );`;

  tablaUsuarios: string = `CREATE TABLE IF NOT EXISTS usuarios (
    id_usuario INTEGER PRIMARY KEY AUTOINCREMENT, 
    nombre TEXT NOT NULL, 
    id_rol INTEGER NOT NULL, 
    email TEXT NOT NULL, 
    contrasena TEXT NOT NULL, 
    FOREIGN KEY (id_rol) REFERENCES roles(id_rol)
  );`;

  tablaReservas: string = `CREATE TABLE IF NOT EXISTS reservas (
    id_reserva INTEGER PRIMARY KEY AUTOINCREMENT, 
    id_usuario INTEGER NOT NULL, 
    id_cancha INTEGER NOT NULL, 
    fecha_reserva DATETIME DEFAULT CURRENT_TIMESTAMP, 
    horario TEXT NOT NULL, 
    estado_reserva TEXT NOT NULL, 
    correo TEXT NOT NULL,  -- Nueva columna para almacenar el correo electrónico
    FOREIGN KEY(id_usuario) REFERENCES usuarios(id_usuario), 
    FOREIGN KEY(id_cancha) REFERENCES canchas(id_cancha)
  );`;


  tablaHistorialReservas: string = `CREATE TABLE IF NOT EXISTS historial_reservas (
    id_historial INTEGER PRIMARY KEY AUTOINCREMENT, 
    id_reserva INTEGER NOT NULL, 
    id_usuario INTEGER NOT NULL, 
    id_cancha INTEGER NOT NULL, 
    fecha_reserva DATETIME DEFAULT CURRENT_TIMESTAMP, 
    estado_reserva TEXT NOT NULL,
    nombre_cancha TEXT NOT NULL,  -- Agregado para almacenar el nombre de la cancha
    FOREIGN KEY (id_reserva) REFERENCES reservas(id_reserva),
    FOREIGN KEY (id_usuario) REFERENCES usuarios(id_usuario),
    FOREIGN KEY (id_cancha) REFERENCES canchas(id_cancha)
  );`;



  tablaTorneos: string = `CREATE TABLE IF NOT EXISTS torneos (
    id_torneo INTEGER PRIMARY KEY AUTOINCREMENT, 
    nombre_torneo TEXT NOT NULL, 
    descripcion TEXT NOT NULL, 
    fecha_inicio TEXT NOT NULL, 
    fecha_fin TEXT NOT NULL, 
    tipo_deporte TEXT NOT NULL, 
    estado_torneo TEXT NOT NULL
  );`;

  tablaInscripcionesTorneo: string = `CREATE TABLE IF NOT EXISTS inscripciones_torneo (
    id_inscripcion INTEGER PRIMARY KEY AUTOINCREMENT, 
    id_torneo INTEGER NOT NULL, 
    id_usuario INTEGER NOT NULL, 
    fecha_inscripcion TEXT NOT NULL, 
    FOREIGN KEY(id_torneo) REFERENCES torneos(id_torneo), 
    FOREIGN KEY(id_usuario) REFERENCES usuarios(id_usuario)
  );`;

  //variables para los insert por defecto en nuestras tablas
  registroRoles: string = `INSERT OR IGNORE INTO roles (id_rol, nombre_rol) 
  VALUES (1, 'Admin'), (2, 'Usuario');`;
  registroUsuarios: string = `INSERT OR IGNORE INTO usuarios (id_usuario, nombre, id_rol, email, contrasena) 
  VALUES (1, 'Admin', 1, 'admin@gmail.com', 'admin'), (2, 'Usuario', 2, 'usuario@gmail.com', 'usuario');`;
  registroCanchas: string = `INSERT OR IGNORE INTO canchas (id_cancha, tipo_deporte, nombre_cancha, estado_cancha) 
  VALUES (1, 'Futbolito', 'Cancha 1', 'Disponible'), (2, 'Pádel', 'Cancha 2', 'Ocupado');`;


  //variables para guardar los datos de las consultas en las tablas
  listadoUsuarios = new BehaviorSubject([]);
  listadoRoles = new BehaviorSubject([]);
  listadoCanchas = new BehaviorSubject([]);
  listadoReservas = new BehaviorSubject([]);
  listadoTorneos = new BehaviorSubject([]);
  listadoInscripciones = new BehaviorSubject([]);
  listadoHistorialReservas = new BehaviorSubject([]);


  private isDBReady: BehaviorSubject<boolean> = new BehaviorSubject(false);

  constructor(private sqlite: SQLite, private platform: Platform, private alertController: AlertController, private toastcontroller: ToastController) {
    this.createBD();
  }

  async presentAlert(titulo: string, msj: string) {
    const alert = await this.alertController.create({
      header: titulo,
      message: msj,
      buttons: ['ok'],
    });

    await alert.present();
  }

  async presentToast(position: 'top' | 'middle' | 'bottom', text: string) { //posición
    const toast = await this.toastcontroller.create({
      message: text,
      duration: 1500,
      position: position,
    });

    await toast.present();
  }
  dbState() {
    return this.isDBReady.asObservable();
  }
  //función para crear la Base De Datos
  createBD() {
    //verificar si la plataforma esta disponible
    this.platform.ready().then(() => {
      //Crear la base de datos
      this.sqlite.create({
        name: 'ConexionDeporte.db',
        location: 'default'
      }).then((db: SQLiteObject) => {
        //Capturar la conexion a la BD
        this.database = db;
        //llamamos a la funcion para crear las tablas
        this.crearTablas();
      }).catch(e => {
        this.presentAlert('Base De Datos', 'Error en crear la BD: ' + JSON.stringify((e)));
      })
    })
  }
  //Creacionde tablas
  async crearTablas() {
    try {
      //Carga Las Listas

      //ejecuto la creación de Tablas
      await this.database.executeSql(this.tablaRoles, []);
      await this.database.executeSql(this.tablaUsuarios, []);
      await this.database.executeSql(this.tablaCanchas, []);
      await this.database.executeSql(this.tablaReservas, []);
      await this.database.executeSql(this.tablaTorneos, []);
      await this.database.executeSql(this.tablaInscripcionesTorneo, []);
      await this.database.executeSql(this.tablaHistorialReservas, []);

      //ejecuto los insert por defecto en el caso que existan
      await this.database.executeSql(this.registroRoles, []);
      await this.database.executeSql(this.registroUsuarios, []);
      await this.database.executeSql(this.registroCanchas, []);

      //modifica el estado de la Base De Datos
      await this.isDBReady.next(true);

    } catch (e) {
      this.presentAlert('Creacion De Tablas', 'Error en crear la Tablas: ' + JSON.stringify(e));
    }
  }
  
  //metodos para manipular los observables
  //Apartado Canchas
  fetchCanchasl(): Observable<Cancha[]> {
    return this.listadoCanchas.asObservable();
  }
  listarCanchas() {
    return this.database.executeSql('SELECT * FROM canchas', []).then(res => {
      //variable para almacenar el rsultado de la consulta
      let items: Cancha[] = [];
      //valido si trae al menos un registro
      if (res.rows.length > 0) {
        //recorro mi resultado
        for (var i = 0; i < res.rows.length; i++)
          //agrego los registros a mi lista
          items.push({
            id_cancha: res.rows.item(i).id_cancha,
            tipo_deporte: res.rows.item(i).tipo_deporte,
            nombre_cancha: res.rows.item(i).nombre_cancha,
            estado_cancha: res.rows.item(i).estado_cancha,
          })
      }
      this.listadoCanchas.next(items as any);
    })
  }

  eliminarCancha(id: number) {
    return this.database.executeSql('DELETE FROM canchas WHERE id_cancha = ?', [id]).then(res => {
      this.presentToast('bottom',"Cancha Eliminado");
      this.listarCanchas();
    }).catch(e => {
      this.presentAlert('Eliminar Cancha','Error Eliminando Cancha:' + JSON.stringify(e));
    })
  }

  modificarCancha(id: number, tipo_deporte: string,nombre_cancha:string,estado_cancha:string) {
    return this.database.executeSql('UPDATE canchas SET tipo_deporte = ?, nombre_cancha = ?, estado_cancha = ?  WHERE id_rol = ?', [tipo_deporte,nombre_cancha,estado_cancha, id]).then(res => {
      this.presentToast('bottom', "Cancha Modificado");
      this.listarCanchas();
    }).catch(e => {
      this.presentAlert('Modificar', 'Error Modificando Cancha:' + JSON.stringify(e));
    })
  }

  insertarCancha(tipo_deporte: string,nombre_cancha:string,estado_cancha:string) {
    return this.database.executeSql('INSERT INTO canchas(tipo_deporte,nombre_cancha,estado_cancha) VALUES (?)', [tipo_deporte,nombre_cancha,estado_cancha]).then(res => {
      this.presentToast('bottom',"Cancha Insertado");
      this.listarCanchas();
    }).catch(e => {
      this.presentAlert('Insertar','Error Insertando Cancha:' + JSON.stringify(e));
    })
  }
  //Apartado Roles
  fetchRoles(): Observable<Rol[]> {
    return this.listadoRoles.asObservable();
  }
  
  listarRoles() {
    return this.database.executeSql('SELECT * FROM roles', []).then(res => {
      let items: Rol[] = [];
      if (res.rows.length > 0) {
        for (var i = 0; i < res.rows.length; i++) {
          items.push({
            id_rol: res.rows.item(i).id_rol,
            nombre_rol: res.rows.item(i).nombre_rol,
          });
        }
      }
      this.listadoRoles.next(items as any);
    });
  }
  
  eliminarRol(id: number) {
    return this.database.executeSql('DELETE FROM roles WHERE id_rol = ?', [id]).then(res => {
      this.presentToast('bottom', "Rol Eliminado");
      this.listarRoles();
    }).catch(e => {
      this.presentAlert('Eliminar Rol', 'Error Eliminando Rol:' + JSON.stringify(e));
    });
  }
  
  modificarRol(id: number, nombre_rol: string) {
    return this.database.executeSql('UPDATE roles SET nombre_rol = ? WHERE id_rol = ?', [nombre_rol, id]).then(res => {
      this.presentToast('bottom', "Rol Modificado");
      this.listarRoles();
    }).catch(e => {
      this.presentAlert('Modificar', 'Error Modificando Rol:' + JSON.stringify(e));
    });
  }
  
  insertarRol(nombre_rol: string) {
    return this.database.executeSql('INSERT INTO roles(nombre_rol) VALUES (?)', [nombre_rol]).then(res => {
      this.presentToast('bottom', "Rol Insertado");
      this.listarRoles();
    }).catch(e => {
      this.presentAlert('Insertar', 'Error Insertando Rol:' + JSON.stringify(e));
    });
  }
  //Apartado Usuarios
  fetchUsuarios(): Observable<Usuario[]> {
    return this.listadoUsuarios.asObservable();
  }
  
  listarUsuarios() {
    return this.database.executeSql('SELECT * FROM usuarios', []).then(res => {
      let items: Usuario[] = [];
      if (res.rows.length > 0) {
        for (var i = 0; i < res.rows.length; i++) {
          items.push({
            id_usuario: res.rows.item(i).id_usuario,
            nombre: res.rows.item(i).nombre,
            id_rol: res.rows.item(i).id_rol,
            email: res.rows.item(i).email,
            contrasena: res.rows.item(i).contrasena,
          });
        }
      }
      this.listadoUsuarios.next(items as any);
    });
  }
  
  // Validar login del usuario
  validarUsuario(email: string, contrasena: string): Promise<Usuario | null> {
    console.log('Email:', email); // Imprime el correo
    console.log('Contraseña:', contrasena); // Imprime la contraseña

    return this.database.executeSql(`
      SELECT * FROM usuarios WHERE email = ? AND contrasena = ?`, [email, contrasena])
      .then(res => {
        if (res.rows.length > 0) {
          const usuario: Usuario = {
            id_usuario: res.rows.item(0).id_usuario,
            nombre: res.rows.item(0).nombre,
            id_rol: res.rows.item(0).id_rol,
            email: res.rows.item(0).email,
            contrasena: res.rows.item(0).contrasena
          };
          return usuario; // Retorna el usuario si es encontrado
        } else {
          console.log('Usuario no encontrado'); // Indica que no se encontró el usuario
          return null; // Usuario no encontrado
        }
      })
      .catch(e => {
        console.error('Error al validar el usuario: ', e);
        return null;
      });
}
  
  eliminarUsuario(id: number) {
    return this.database.executeSql('DELETE FROM usuarios WHERE id_usuario = ?', [id]).then(res => {
      this.presentToast('bottom', "Usuario Eliminado");
      this.listarUsuarios();
    }).catch(e => {
      this.presentAlert('Eliminar Usuario', 'Error Eliminando Usuario:' + JSON.stringify(e));
    });
  }
  
  modificarUsuario(id: number, nombre: string, id_rol: number, email: string, contrasena: string) {
    return this.database.executeSql('UPDATE usuarios SET nombre = ?, id_rol = ?, email = ?, contrasena = ? WHERE id_usuario = ?', [nombre, id_rol, email, contrasena, id]).then(res => {
      this.presentToast('bottom', "Usuario Modificado");
      this.listarUsuarios();
    }).catch(e => {
      this.presentAlert('Modificar', 'Error Modificando Usuario:' + JSON.stringify(e));
    });
  }
  
  insertarUsuario(nombre: string, id_rol: number, email: string, contrasena: string) {
    return this.database.executeSql('INSERT INTO usuarios(nombre, id_rol, email, contrasena) VALUES (?, ?, ?, ?)', [nombre, id_rol, email, contrasena]).then(res => {
      this.presentToast('bottom', "Usuario Insertado");
      this.listarUsuarios();
    }).catch(e => {
      this.presentAlert('Insertar', 'Error Insertando Usuario:' + JSON.stringify(e));
    });
  }
  //Apartado Reservas
  fetchReservas(): Observable<Reserva[]> {
    return this.listadoReservas.asObservable();
  }
  
  listarReservas() {
    return this.database.executeSql('SELECT * FROM reservas', []).then(res => {
      let items: Reserva[] = [];
      if (res.rows.length > 0) {
        for (var i = 0; i < res.rows.length; i++) {
          items.push({
            id_reserva: res.rows.item(i).id_reserva,
            id_usuario: res.rows.item(i).id_usuario,
            id_cancha: res.rows.item(i).id_cancha,
            fecha_reserva: res.rows.item(i).fecha_reserva,
            horario: res.rows.item(i).horario,
            estado_reserva: res.rows.item(i).estado_reserva,
            correo: res.rows.item(i).correo,
          });
        }
      }
      this.listadoReservas.next(items as any);
    });
  }
  
  eliminarReserva(id: number) {
    return this.database.executeSql('DELETE FROM reservas WHERE id_reserva = ?', [id]).then(res => {
      this.presentToast('bottom', "Reserva Eliminada");
      this.listarReservas();
    }).catch(e => {
      this.presentAlert('Eliminar Reserva', 'Error Eliminando Reserva:' + JSON.stringify(e));
    });
  }
  
  modificarReserva(id: number, id_usuario: number, id_cancha: number, horario: string, estado_reserva: string, correo: string) {
    return this.database.executeSql('UPDATE reservas SET id_usuario = ?, id_cancha = ?, horario = ?, estado_reserva = ?, correo = ? WHERE id_reserva = ?', [id_usuario, id_cancha, horario, estado_reserva, correo, id]).then(res => {
      this.presentToast('bottom', "Reserva Modificada");
      this.listarReservas();
    }).catch(e => {
      this.presentAlert('Modificar', 'Error Modificando Reserva:' + JSON.stringify(e));
    });
  }
  
  insertarReserva(id_usuario: number, id_cancha: number, horario: string, estado_reserva: string, correo: string) {
    return this.database.executeSql('INSERT INTO reservas(id_usuario, id_cancha, horario, estado_reserva, correo) VALUES (?, ?, ?, ?, ?)', [id_usuario, id_cancha, horario, estado_reserva, correo]).then(res => {
      this.presentToast('bottom', "Reserva Insertada");
      this.listarReservas();
    }).catch(e => {
      this.presentAlert('Insertar', 'Error Insertando Reserva:' + JSON.stringify(e));
    });
  }
  //Apartado Historial De Reservas
  fetchHistorialReservas(): Observable<Historialreserva[]> {
    return this.listadoHistorialReservas.asObservable();
  }
  
  listarHistorialReservas() {
    return this.database.executeSql('SELECT * FROM historial_reservas', []).then(res => {
      let items: Historialreserva[] = [];
      if (res.rows.length > 0) {
        for (var i = 0; i < res.rows.length; i++) {
          items.push({
            id_historial: res.rows.item(i).id_historial,
            id_reserva: res.rows.item(i).id_reserva,
            id_usuario: res.rows.item(i).id_usuario,
            id_cancha: res.rows.item(i).id_cancha,
            fecha_reserva: res.rows.item(i).fecha_reserva,
            estado_reserva: res.rows.item(i).estado_reserva,
            nombre_cancha: res.rows.item(i).nombre_cancha,
          });
        }
      }
      this.listadoHistorialReservas.next(items as any);
    });
  }
  
  eliminarHistorialReserva(id: number) {
    return this.database.executeSql('DELETE FROM historial_reservas WHERE id_historial = ?', [id]).then(res => {
      this.presentToast('bottom', "Historial Reserva Eliminada");
      this.listarHistorialReservas();
    }).catch(e => {
      this.presentAlert('Eliminar Historial', 'Error Eliminando Historial Reserva:' + JSON.stringify(e));
    });
  }
  
  insertarHistorialReserva(id_reserva: number, id_usuario: number, id_cancha: number, estado_reserva: string, nombre_cancha: string) {
    return this.database.executeSql('INSERT INTO historial_reservas(id_reserva, id_usuario, id_cancha, estado_reserva, nombre_cancha) VALUES (?, ?, ?, ?, ?)', [id_reserva, id_usuario, id_cancha, estado_reserva, nombre_cancha]).then(res => {
      this.presentToast('bottom', "Historial Reserva Insertada");
      this.listarHistorialReservas();
    }).catch(e => {
      this.presentAlert('Insertar', 'Error Insertando Historial Reserva:' + JSON.stringify(e));
    });
  }
  //Apartado Torneos
  fetchTorneos(): Observable<Torneo[]> {
    return this.listadoTorneos.asObservable();
  }
  
  listarTorneos() {
    return this.database.executeSql('SELECT * FROM torneos', []).then(res => {
      let items: Torneo[] = [];
      if (res.rows.length > 0) {
        for (var i = 0; i < res.rows.length; i++) {
          items.push({
            id_torneo: res.rows.item(i).id_torneo,
            nombre_torneo: res.rows.item(i).nombre_torneo,
            descripcion: res.rows.item(i).descripcion,
            fecha_inicio: res.rows.item(i).fecha_inicio,
            fecha_fin: res.rows.item(i).fecha_fin,
            tipo_deporte: res.rows.item(i).tipo_deporte,
            estado_torneo: res.rows.item(i).estado_torneo,
          });
        }
      }
      this.listadoTorneos.next(items as any);
    });
  }
  
  eliminarTorneo(id: number) {
    return this.database.executeSql('DELETE FROM torneos WHERE id_torneo = ?', [id]).then(res => {
      this.presentToast('bottom', "Torneo Eliminado");
      this.listarTorneos();
    }).catch(e => {
      this.presentAlert('Eliminar Torneo', 'Error Eliminando Torneo:' + JSON.stringify(e));
    });
  }
  
  modificarTorneo(id: number, nombre_torneo: string, descripcion: string, fecha_inicio: string, fecha_fin: string, tipo_deporte: string, estado_torneo: string) {
    return this.database.executeSql('UPDATE torneos SET nombre_torneo = ?, descripcion = ?, fecha_inicio = ?, fecha_fin = ?, tipo_deporte = ?, estado_torneo = ? WHERE id_torneo = ?', [nombre_torneo, descripcion, fecha_inicio, fecha_fin, tipo_deporte, estado_torneo, id]).then(res => {
      this.presentToast('bottom', "Torneo Modificado");
      this.listarTorneos();
    }).catch(e => {
      this.presentAlert('Modificar', 'Error Modificando Torneo:' + JSON.stringify(e));
    });
  }
  
  insertarTorneo(nombre_torneo: string, descripcion: string, fecha_inicio: string, fecha_fin: string, tipo_deporte: string, estado_torneo: string) {
    return this.database.executeSql('INSERT INTO torneos(nombre_torneo, descripcion, fecha_inicio, fecha_fin, tipo_deporte, estado_torneo) VALUES (?, ?, ?, ?, ?, ?)', [nombre_torneo, descripcion, fecha_inicio, fecha_fin, tipo_deporte, estado_torneo]).then(res => {
      this.presentToast('bottom', "Torneo Insertado");
      this.listarTorneos();
    }).catch(e => {
      this.presentAlert('Insertar', 'Error Insertando Torneo:' + JSON.stringify(e));
    });
  }
  //Apartado Inscripciones de torneos
  fetchInscripciones(): Observable<Inscripcion[]> {
    return this.listadoInscripciones.asObservable();
  }
  
  listarInscripciones() {
    return this.database.executeSql('SELECT * FROM inscripciones_torneo', []).then(res => {
      let items: Inscripcion[] = [];
      if (res.rows.length > 0) {
        for (var i = 0; i < res.rows.length; i++) {
          items.push({
            id_inscripcion: res.rows.item(i).id_inscripcion,
            id_torneo: res.rows.item(i).id_torneo,
            id_usuario: res.rows.item(i).id_usuario,
            fecha_inscripcion: res.rows.item(i).fecha_inscripcion,
          });
        }
      }
      this.listadoInscripciones.next(items as any);
    });
  }
  
  eliminarInscripcion(id: number) {
    return this.database.executeSql('DELETE FROM inscripciones_torneo WHERE id_inscripcion = ?', [id]).then(res => {
      this.presentToast('bottom', "Inscripción Eliminada");
      this.listarInscripciones();
    }).catch(e => {
      this.presentAlert('Eliminar Inscripción', 'Error Eliminando Inscripción:' + JSON.stringify(e));
    });
  }
  
  insertarInscripcion(id_torneo: number, id_usuario: number, fecha_inscripcion: string) {
    return this.database.executeSql('INSERT INTO inscripciones_torneo(id_torneo, id_usuario, fecha_inscripcion) VALUES (?, ?, ?)', [id_torneo, id_usuario, fecha_inscripcion]).then(res => {
      this.presentToast('bottom', "Inscripción Insertada");
      this.listarInscripciones();
    }).catch(e => {
      this.presentAlert('Insertar', 'Error Insertando Inscripción:' + JSON.stringify(e));
    });
  }
   
}
