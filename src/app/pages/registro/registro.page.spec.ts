import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RegistroPage } from './registro.page';
import { IonicModule } from '@ionic/angular';
import { RouterTestingModule } from '@angular/router/testing';
import { ServicebdService } from 'src/app/services/servicebd.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { AlertController } from '@ionic/angular';

describe('RegistroPage', () => {
  let component: RegistroPage;
  let fixture: ComponentFixture<RegistroPage>;
  let alertController: AlertController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RegistroPage],
      imports: [
        IonicModule.forRoot(),
        RouterTestingModule,
        HttpClientTestingModule
      ],
      providers: [
        {
          provide: ServicebdService,
          useValue: {
            registrarUsuario: jasmine.createSpy().and.returnValue(Promise.resolve({ success: true, message: 'Registro exitoso' })),
            verificarUsuario: jasmine.createSpy().and.returnValue(Promise.resolve(false)),
            insertarUsuario: jasmine.createSpy().and.returnValue(Promise.resolve())
          }
        },
        AlertController
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegistroPage);
    component = fixture.componentInstance;
    alertController = TestBed.inject(AlertController);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy(); 
  });

  it('Muestra alerta si los campos están incompletos', async () => {
    spyOn(alertController, 'create').and.returnValue(Promise.resolve({ present: () => {} } as any));

    // Dejamos los campos vacíos para simular que están incompletos
    component.nombre = '';
    component.apellido = '';
    component.correo = '';
    component.contrasena = '';
    
    // Ejecutamos la función que valida y registra al usuario
    await component.registrarUsuario();
    
    // Verificamos que la alerta fue llamada con el mensaje esperado
    expect(alertController.create).toHaveBeenCalledWith({
      header: 'Campos incompletos',
      message: 'Por favor, complete todos los campos.',
      buttons: ['OK']
    });
  });
});
