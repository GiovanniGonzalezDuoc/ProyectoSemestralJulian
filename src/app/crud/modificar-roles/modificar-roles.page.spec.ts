import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ModificarRolesPage } from './modificar-roles.page';
import { IonicModule } from '@ionic/angular';
import { RouterTestingModule } from '@angular/router/testing';
import { SQLite } from '@awesome-cordova-plugins/sqlite/ngx';
import { ServicebdService } from 'src/app/services/servicebd.service';


describe('ModificarRolesPage', () => {
  let component: ModificarRolesPage;
  let fixture: ComponentFixture<ModificarRolesPage>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ModificarRolesPage],
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

    fixture = TestBed.createComponent(ModificarRolesPage);
    component = fixture.componentInstance;

    // Inicializar las propiedades necesarias si es que las hay
    // Si el componente tiene alguna propiedad como roles, inicialízala aquí
    component.rol = [{ id: 1, rol: 'Admin' }]; // Ejemplo de inicialización de una propiedad

    fixture.detectChanges(); // Detectar los cambios para que Angular renderice la vista
  });

  it('should create', () => {
    expect(component).toBeTruthy(); // Verificar que el componente se cree correctamente
  });
});
