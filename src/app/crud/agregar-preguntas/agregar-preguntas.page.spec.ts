import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AgregarPreguntasPage } from './agregar-preguntas.page';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { ServicebdService } from 'src/app/services/servicebd.service';
import { AlertController } from '@ionic/angular';
import { of, throwError } from 'rxjs';  // Para simular respuestas exitosas o de error

describe('AgregarPreguntasPage', () => {
  let component: AgregarPreguntasPage;
  let fixture: ComponentFixture<AgregarPreguntasPage>;
  let service: ServicebdService;
  let alertController: AlertController;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AgregarPreguntasPage],
      imports: [IonicModule.forRoot(), FormsModule],
      providers: [
        {
          provide: ServicebdService,
          useValue: {
            insertarPreguntas: jasmine.createSpy('insertarPreguntas').and.returnValue(Promise.resolve()),
          },
        },
        AlertController
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AgregarPreguntasPage);
    component = fixture.componentInstance;
    service = TestBed.inject(ServicebdService);  // Acceder al servicio
    alertController = TestBed.inject(AlertController);  // Acceder al AlertController
    fixture.detectChanges();  // Detectar los cambios
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });


  it('mostrar alerta si la pregunta está vacía', async () => {
    const spy = spyOn(alertController, 'create').and.returnValue(Promise.resolve({
      present: jasmine.createSpy('present')
    } as any));  // Mock de la alerta

    component.pregunta = '';  // Establecer pregunta vacía
    await component.insertar();  // Ejecutar el método insertar

    // Verifica que la alerta se ha mostrado
    expect(spy).toHaveBeenCalledWith({
      header: 'Error',
      message: 'El texto de la pregunta no puede estar vacío.',
      buttons: ['OK']
    });
  });
});
