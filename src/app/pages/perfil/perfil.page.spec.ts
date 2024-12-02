import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PerfilPage } from './perfil.page';
import { IonicModule } from '@ionic/angular';  // Importa IonicModule
import { SQLite } from '@awesome-cordova-plugins/sqlite/ngx';  // Importa SQLite
import { ServicebdService } from 'src/app/services/servicebd.service';  // Importa el servicio de la base de datos
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

describe('PerfilPage', () => {
  let component: PerfilPage;
  let fixture: ComponentFixture<PerfilPage>;
  let servicebdService: ServicebdService;

  beforeEach(() => {
    // Configuración del TestBed para el componente
    TestBed.configureTestingModule({
      declarations: [PerfilPage],
      imports: [
        IonicModule.forRoot(),            // Para integrar Ionic en la prueba
        HttpClientTestingModule           // Para simular peticiones HTTP (si es necesario)
      ],
      providers: [
        SQLite,                           // Proveemos el plugin SQLite
        {
          provide: ServicebdService,      // Proveemos el servicio ServicebdService
          useValue: {
            // Simulamos los métodos del servicio que usará el componente
            getUserProfile: jasmine.createSpy().and.returnValue(of({ id: 1, name: 'John Doe' })),  // Ejemplo de método simulado
            updateUserProfile: jasmine.createSpy().and.returnValue(of(true)),  // Simulación de actualización
          }
        },
        { provide: NativeStorage, useClass: MockNativeStorage } // Mock de NativeStorage
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PerfilPage);
    component = fixture.componentInstance;
    servicebdService = TestBed.inject(ServicebdService);  // Obtener la instancia del servicio
    fixture.detectChanges();  // Detectar los cambios para que Angular renderice la vista
  });

  it('should create', () => {
    expect(component).toBeTruthy();  // Verifica que el componente se crea correctamente
  });
});
