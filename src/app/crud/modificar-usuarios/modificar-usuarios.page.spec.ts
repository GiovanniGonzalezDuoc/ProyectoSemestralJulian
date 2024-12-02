import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ModificarUsuariosPage } from './modificar-usuarios.page';
import { IonicModule } from '@ionic/angular';
import { RouterTestingModule } from '@angular/router/testing';
import { SQLite } from '@awesome-cordova-plugins/sqlite/ngx'; // Importa SQLite
import { ServicebdService } from 'src/app/services/servicebd.service'; // Importa ServicebdService

describe('ModificarUsuariosPage', () => {
  let component: ModificarUsuariosPage;
  let fixture: ComponentFixture<ModificarUsuariosPage>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ModificarUsuariosPage],
      imports: [
        IonicModule.forRoot(),
        RouterTestingModule
      ],
      providers: [
        SQLite, // Proveemos SQLite
        ServicebdService // Proveemos el servicio ServicebdService
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModificarUsuariosPage);
    component = fixture.componentInstance;

    // Inicializa las propiedades necesarias si es que las hay
    component.usuario = [{ id: 1, nombre: 'Juan Pérez', email: 'juan@example.com' }]; // Ejemplo de inicialización de usuarios

    fixture.detectChanges(); // Detectar los cambios para que Angular renderice la vista
  });

  it('should create', () => {
    expect(component).toBeTruthy(); // Verifica que el componente se crea correctamente
  });
});
