import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RegistroPage } from './registro.page';
import { IonicModule } from '@ionic/angular';  // Importa IonicModule para pruebas de Ionic
import { RouterTestingModule } from '@angular/router/testing';  // Para simular la navegación
import { SQLite } from '@awesome-cordova-plugins/sqlite/ngx';  // Para usar SQLite en las pruebas
import { ServicebdService } from 'src/app/services/servicebd.service';  // Servicio para la base de datos
import { HttpClientTestingModule } from '@angular/common/http/testing';  // Para simular peticiones HTTP
import { of } from 'rxjs';  // Para simular observables

describe('RegistroPage', () => {
  let component: RegistroPage;
  let fixture: ComponentFixture<RegistroPage>;
  let servicebdService: ServicebdService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RegistroPage],
      imports: [
        IonicModule.forRoot(),            // Para pruebas de Ionic
        RouterTestingModule,              // Para pruebas de navegación
        HttpClientTestingModule           // Para simular peticiones HTTP
      ],
      providers: [
        SQLite,                           // Proveemos el servicio SQLite
        {
          provide: ServicebdService,      // Proveemos el servicio ServicebdService
          useValue: {
            // Simulamos métodos del servicio
            registrarUsuario: jasmine.createSpy().and.returnValue(of({ success: true, message: 'Registro exitoso' })),
          }
        }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegistroPage);
    component = fixture.componentInstance;
    servicebdService = TestBed.inject(ServicebdService);  // Obtener la instancia del servicio
    fixture.detectChanges();  // Detectar los cambios para renderizar la vista
  });

  it('should create', () => {
    expect(component).toBeTruthy();  // Verifica que el componente se crea correctamente
  });
});
