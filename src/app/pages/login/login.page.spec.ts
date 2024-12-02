import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LoginPage } from './login.page';
import { IonicModule } from '@ionic/angular';  // Si el componente depende de Ionic
import { ReactiveFormsModule, FormsModule } from '@angular/forms';  // Si el componente usa formularios
import { SQLite } from '@awesome-cordova-plugins/sqlite/ngx';  // Importar SQLite
import { ServicebdService } from 'src/app/services/servicebd.service';  // Importar el servicio de la base de datos
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

describe('LoginPage', () => {
  let component: LoginPage;
  let fixture: ComponentFixture<LoginPage>;
  let servicebdService: ServicebdService;

  beforeEach(() => {
    // Crear el módulo de pruebas
    TestBed.configureTestingModule({
      declarations: [LoginPage],
      imports: [
        IonicModule.forRoot(),            // Para integrar Ionic en la prueba
        ReactiveFormsModule,              // Si el componente usa formularios reactivos
        FormsModule,                      // Si el componente usa formularios de template
        HttpClientTestingModule           // Si el componente hace peticiones HTTP
      ],
      providers: [
        SQLite,                           // Proveemos el plugin SQLite
        {
          provide: ServicebdService,      // Proveemos el servicio ServicebdService
          useValue: {
            // Puedes simular las funciones que usa el LoginPage del servicio
            login: jasmine.createSpy().and.returnValue(of(true)),  // Simular una función de login exitosa
            // Agrega aquí otras funciones que el servicio pueda tener
          }
        },
        { provide: NativeStorage, useClass: MockNativeStorage } // Mock de NativeStorage
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoginPage);
    component = fixture.componentInstance;
    servicebdService = TestBed.inject(ServicebdService); // Obtener la instancia del servicio
    fixture.detectChanges();  // Detectar los cambios para que Angular renderice la vista
  });

  it('should create', () => {
    expect(component).toBeTruthy();  // Verifica que el componente se crea correctamente
  });

});
