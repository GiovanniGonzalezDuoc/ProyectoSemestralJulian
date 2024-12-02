import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NuevaContrasenaPage } from './nueva-contrasena.page';
import { IonicModule } from '@ionic/angular';
import { RouterTestingModule } from '@angular/router/testing';
import { ReactiveFormsModule } from '@angular/forms';  // Si el componente usa formularios reactivos
import { FormsModule } from '@angular/forms'; // Si usas formularios basados en plantillas
import { CommonModule } from '@angular/common'; // Si el componente usa directivas comunes
import { ServicebdService } from 'src/app/services/servicebd.service'; // Si se usa el servicio ServicebdService

// Si el componente usa almacenamiento o servicios nativos:
import { NativeStorage } from '@awesome-cordova-plugins/native-storage/ngx'; // Si se usa NativeStorage
import { SQLite } from '@awesome-cordova-plugins/sqlite/ngx';

describe('NuevaContrasenaPage', () => {
  let component: NuevaContrasenaPage;
  let fixture: ComponentFixture<NuevaContrasenaPage>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NuevaContrasenaPage],
      imports: [
        IonicModule.forRoot(),
        RouterTestingModule,
        ReactiveFormsModule, // Si usas formularios reactivos
        FormsModule, // Si usas formularios basados en plantillas
        CommonModule // Si el componente usa directivas comunes
      ],
      providers: [
        SQLite,
        ServicebdService, // Si se usa el servicio ServicebdService
        { provide: NativeStorage, useClass: MockNativeStorage } // Si usas NativeStorage, agrega el mock si es necesario
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NuevaContrasenaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy(); // Verifica que el componente se crea correctamente
  });
});

// Si necesitas mockear NativeStorage u otros servicios nativos:
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
