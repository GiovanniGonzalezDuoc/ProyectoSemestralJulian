import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TorneoPage } from './torneo.page';
import { IonicModule } from '@ionic/angular';  // Importa IonicModule
import { RouterTestingModule } from '@angular/router/testing';  // Importa RouterTestingModule para pruebas de navegación
import { SQLite } from '@awesome-cordova-plugins/sqlite/ngx';  // Importa SQLite
import { ServicebdService } from 'src/app/services/servicebd.service';  // Importa el servicio de la base de datos
import { HttpClientTestingModule } from '@angular/common/http/testing';  // Para simular peticiones HTTP
import { of } from 'rxjs';  // Para simular observables
import { NativeStorage } from '@awesome-cordova-plugins/native-storage/ngx';

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

// Mock del servicio ServicebdService
class MockServicebdService {
  // Simula el método fetchTorneos
  fetchTorneos() {
    return of([  // Simula una lista de torneos
      { id: 1, nombre: 'Torneo 1' },
      { id: 2, nombre: 'Torneo 2' },
    ]);
  }

  // Simula el método listarTorneos
  listarTorneos() {
    return of([  // Simula una lista de torneos
      { id: 1, nombre: 'Torneo 1' },
      { id: 2, nombre: 'Torneo 2' },
    ]);
  }

  getTorneoDetails() {
    return of({ id: 1, nombre: 'Torneo Ejemplo' });
  }

  updateTorneoDetails() {
    return of(true);  // Simulación de actualización
  }
}

describe('TorneoPage', () => {
  let component: TorneoPage;
  let fixture: ComponentFixture<TorneoPage>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TorneoPage],
      imports: [
        IonicModule.forRoot(),            // Para integrar Ionic en la prueba
        RouterTestingModule,              // Para simular la navegación
        HttpClientTestingModule           // Para simular peticiones HTTP (si es necesario)
      ],
      providers: [
        SQLite,                           // Proveemos el plugin SQLite
        { 
          provide: ServicebdService,      // Proveemos el servicio ServicebdService
          useClass: MockServicebdService  // Usamos la clase MockServicebdService
        },
        { provide: NativeStorage, useClass: MockNativeStorage } // Mock de NativeStorage
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TorneoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();  // Verifica que el componente se crea correctamente
  });
});
