import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ModificarTorneosPage } from './modificar-torneos.page';
import { IonicModule } from '@ionic/angular';
import { RouterTestingModule } from '@angular/router/testing';
import { SQLite } from '@awesome-cordova-plugins/sqlite/ngx'; // Importa SQLite
import { ServicebdService } from 'src/app/services/servicebd.service'; // Importa ServicebdService

describe('ModificarTorneosPage', () => {
  let component: ModificarTorneosPage;
  let fixture: ComponentFixture<ModificarTorneosPage>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ModificarTorneosPage],
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

    fixture = TestBed.createComponent(ModificarTorneosPage);
    component = fixture.componentInstance;

    // Inicializa las propiedades necesarias si es que las hay
    component.torneo = [{ id: 1, nombre: 'Torneo de Verano' }]; // Ejemplo de inicialización de torneos

    fixture.detectChanges(); // Detectar los cambios para que Angular renderice la vista
  });

  it('should create', () => {
    expect(component).toBeTruthy(); // Verificar que el componente se crea correctamente
  });
});
