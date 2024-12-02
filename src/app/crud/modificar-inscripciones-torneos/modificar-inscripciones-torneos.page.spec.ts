import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ModificarInscripcionesTorneosPage } from './modificar-inscripciones-torneos.page';
import { IonicModule } from '@ionic/angular';
import { RouterTestingModule } from '@angular/router/testing';
import { SQLite } from '@awesome-cordova-plugins/sqlite/ngx';
import { ServicebdService } from 'src/app/services/servicebd.service';


describe('ModificarInscripcionesTorneosPage', () => {
  let component: ModificarInscripcionesTorneosPage;
  let fixture: ComponentFixture<ModificarInscripcionesTorneosPage>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ModificarInscripcionesTorneosPage],
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

    fixture = TestBed.createComponent(ModificarInscripcionesTorneosPage);
    component = fixture.componentInstance;

    // Inicializar las propiedades necesarias si es que las hay
    // Ejemplo: Si 'inscripciones' es una propiedad usada en la plantilla, inicialízala
    component.inscripcion = [{ torneo: 'Torneo 1', equipo: 'Equipo A' }];

    fixture.detectChanges(); // Detecta los cambios para que Angular renderice la vista
  });

  it('should create', () => {
    expect(component).toBeTruthy(); // Verificar que el componente se cree correctamente
  });
});
