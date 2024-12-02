import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ModificarPreguntasPage } from './modificar-preguntas.page';
import { IonicModule } from '@ionic/angular';
import { RouterTestingModule } from '@angular/router/testing';
import { SQLite } from '@awesome-cordova-plugins/sqlite/ngx';
import { ServicebdService } from 'src/app/services/servicebd.service';


describe('ModificarPreguntasPage', () => {
  let component: ModificarPreguntasPage;
  let fixture: ComponentFixture<ModificarPreguntasPage>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ModificarPreguntasPage],
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

    fixture = TestBed.createComponent(ModificarPreguntasPage);
    component = fixture.componentInstance;

    // Inicializa las propiedades necesarias si es que las hay
    // Por ejemplo, si tienes alguna propiedad como preguntas, inicialízala aquí
    component.pregunta = [{ id: 1, pregunta: '¿Cuál es tu nombre?' }];

    fixture.detectChanges(); // Detectar los cambios para que Angular renderice la vista
  });

  it('should create', () => {
    expect(component).toBeTruthy(); // Verificar que el componente se cree correctamente
  });
});
