import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PadelPage } from './padel.page';
import { ServicebdService } from 'src/app/services/servicebd.service';  // Agrega tu servicio si es necesario
import { IonicModule } from '@ionic/angular';  // Importa IonicModule si estás utilizando Ionic
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

describe('PadelPage', () => {
  let component: PadelPage;
  let fixture: ComponentFixture<PadelPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PadelPage],
      imports: [IonicModule.forRoot()],  // Agrega módulos como IonicModule si es necesario
      providers: [
        {
          provide: ServicebdService,  // Proveedor del servicio si tu componente lo usa
          useValue: {
            // Simula los métodos del servicio que usas en el componente
            obtenerDatos: jasmine.createSpy('obtenerDatos').and.returnValue(Promise.resolve('Datos obtenidos')),
          },
        },
        { provide: NativeStorage, useClass: MockNativeStorage } // Mock de NativeStorage
        
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PadelPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
