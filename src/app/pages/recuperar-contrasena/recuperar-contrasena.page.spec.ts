import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RecuperarContrasenaPage } from './recuperar-contrasena.page';
import { IonicModule } from '@ionic/angular';  // Importa IonicModule para pruebas de Ionic
import { RouterTestingModule } from '@angular/router/testing';  // Para simular la navegación
import { SQLite } from '@awesome-cordova-plugins/sqlite/ngx';  // Para usar SQLite en las pruebas
import { ServicebdService } from 'src/app/services/servicebd.service';  // Servicio para la base de datos
import { HttpClientTestingModule } from '@angular/common/http/testing';  // Para simular peticiones HTTP
import { of } from 'rxjs';  // Para simular observables
import { NativeStorage } from '@awesome-cordova-plugins/native-storage/ngx';

// Mock de NativeStorage
class MockNativeStorage {
  setItem(key: string, value: any): Promise<any> {
    return Promise.resolve(true); // Mock de la función setItem
  }

  getItem(key: string): Promise<any> {
    return Promise.resolve(null); // Mock de la función getItem
  }

  remove(key: string): Promise<any> {
    return Promise.resolve(true); // Mock de la función remove
  }
}

describe('RecuperarContrasenaPage', () => {
  let component: RecuperarContrasenaPage;
  let fixture: ComponentFixture<RecuperarContrasenaPage>;
  let servicebdService: ServicebdService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RecuperarContrasenaPage],
      imports: [
        IonicModule.forRoot(),            // Para pruebas de Ionic
        RouterTestingModule,              // Para pruebas de navegación
        HttpClientTestingModule           // Para simular peticiones HTTP (si es necesario)
      ],
      providers: [
        SQLite,                           // Proveemos el servicio SQLite
        {
          provide: ServicebdService,      // Proveemos el servicio ServicebdService
          useValue: {
            // Simulamos métodos del servicio
            recuperarContrasena: jasmine.createSpy().and.returnValue(of({ success: true, message: 'Correo enviado' })),
          }
        },
        { provide: NativeStorage, useClass: MockNativeStorage } // Mock de NativeStorage
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RecuperarContrasenaPage);
    component = fixture.componentInstance;
    servicebdService = TestBed.inject(ServicebdService);  // Obtener la instancia del servicio
    fixture.detectChanges();  // Detectar los cambios para renderizar la vista
  });

  it('should create', () => {
    expect(component).toBeTruthy();  // Verifica que el componente se crea correctamente
  });
});
