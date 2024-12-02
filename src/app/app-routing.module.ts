import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then(m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'admin/crud',
    loadChildren: () => import('./admin-pages/crud/crud.module').then( m => m.CRUDPageModule)
  },
  {
    path: 'futbolito',
    loadChildren: () => import('./pages/futbolito/futbolito.module').then( m => m.FutbolitoPageModule)
  },
  {
    path: 'historial',
    loadChildren: () => import('./pages/historial/historial.module').then( m => m.HistorialPageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'nosotros',
    loadChildren: () => import('./pages/nosotros/nosotros.module').then( m => m.NosotrosPageModule)
  },
  {
    path: 'padel',
    loadChildren: () => import('./pages/padel/padel.module').then( m => m.PadelPageModule)
  },
  {
    path: 'perfil',
    loadChildren: () => import('./pages/perfil/perfil.module').then( m => m.PerfilPageModule)
  },
  {
    path: 'recuperar-contrasena',
    loadChildren: () => import('./pages/recuperar-contrasena/recuperar-contrasena.module').then( m => m.RecuperarContrasenaPageModule)
  },
  {
    path: 'registro',
    loadChildren: () => import('./pages/registro/registro.module').then( m => m.RegistroPageModule)
  },
  {
    path: 'torneo',
    loadChildren: () => import('./pages/torneo/torneo.module').then( m => m.TorneoPageModule)
  },
  {
    path: 'nueva-contrasena',
    loadChildren: () => import('./pages/nueva-contrasena/nueva-contrasena.module').then( m => m.NuevaContrasenaPageModule)
  },
  {
    path: 'crud/canchas',
    loadChildren: () => import('./crud/canchas/canchas.module').then( m => m.CanchasPageModule)
  },
  {
    path: 'crud/roles',
    loadChildren: () => import('./crud/roles/roles.module').then( m => m.RolesPageModule)
  },
  {
    path: 'crud/usuarios',
    loadChildren: () => import('./crud/usuarios/usuarios.module').then( m => m.UsuariosPageModule)
  },
  {
    path: 'crud/preguntas',
    loadChildren: () => import('./crud/preguntas/preguntas.module').then( m => m.PreguntasPageModule)
  },
  {
    path: 'crud/torneos',
    loadChildren: () => import('./crud/torneos/torneos.module').then( m => m.TorneosPageModule)
  },
  {
    path: 'crud/inscripciones-torneos',
    loadChildren: () => import('./crud/inscripciones-torneos/inscripciones-torneos.module').then( m => m.InscripcionesTorneosPageModule)
  },
  {
    path: 'crud/horarios',
    loadChildren: () => import('./crud/horarios/horarios.module').then( m => m.HorariosPageModule)
  },
  {
    path: 'crud/agregar-canchas',
    loadChildren: () => import('./crud/agregar-canchas/agregar-canchas.module').then( m => m.AgregarCanchasPageModule)
  },
  {
    path: 'crud/modificar-canchas',
    loadChildren: () => import('./crud/modificar-canchas/modificar-canchas.module').then( m => m.ModificarCanchasPageModule)
  },
  {
    path: 'crud/modificar-roles',
    loadChildren: () => import('./crud/modificar-roles/modificar-roles.module').then( m => m.ModificarRolesPageModule)
  },
  {
    path: 'crud/agregar-roles',
    loadChildren: () => import('./crud/agregar-roles/agregar-roles.module').then( m => m.AgregarRolesPageModule)
  },
  {
    path: 'crud/agregar-usuarios',
    loadChildren: () => import('./crud/agregar-usuarios/agregar-usuarios.module').then( m => m.AgregarUsuariosPageModule)
  },
  {
    path: 'crud/modificar-usuarios',
    loadChildren: () => import('./crud/modificar-usuarios/modificar-usuarios.module').then( m => m.ModificarUsuariosPageModule)
  },
  {
    path: 'crud/modificar-inscripciones-torneos',
    loadChildren: () => import('./crud/modificar-inscripciones-torneos/modificar-inscripciones-torneos.module').then( m => m.ModificarInscripcionesTorneosPageModule)
  },
  {
    path: 'crud/agregar-inscripciones-torneos',
    loadChildren: () => import('./crud/agregar-inscripciones-torneos/agregar-inscripciones-torneos.module').then( m => m.AgregarInscripcionesTorneosPageModule)
  },
  {
    path: 'crud/agregar-preguntas',
    loadChildren: () => import('./crud/agregar-preguntas/agregar-preguntas.module').then( m => m.AgregarPreguntasPageModule)
  },
  {
    path: 'crud/modificar-preguntas',
    loadChildren: () => import('./crud/modificar-preguntas/modificar-preguntas.module').then( m => m.ModificarPreguntasPageModule)
  },
  {
    path: 'crud/agregar-horarios',
    loadChildren: () => import('./crud/agregar-horarios/agregar-horarios.module').then( m => m.AgregarHorariosPageModule)
  },
  {
    path: 'crud/modificar-horarios',
    loadChildren: () => import('./crud/modificar-horarios/modificar-horarios.module').then( m => m.ModificarHorariosPageModule)
  },
  {
    path: 'crud/agregar-torneos',
    loadChildren: () => import('./crud/agregar-torneos/agregar-torneos.module').then( m => m.AgregarTorneosPageModule)
  },
  {
    path: 'crud/modificar-torneos',
    loadChildren: () => import('./crud/modificar-torneos/modificar-torneos.module').then( m => m.ModificarTorneosPageModule)
  },

];


@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
