import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FutbolitoPage } from './futbolito.page';
import { IonicModule } from '@ionic/angular';
import { RouterTestingModule } from '@angular/router/testing';
import { SQLite } from '@awesome-cordova-plugins/sqlite/ngx'; // Importa SQLite
import { ServicebdService } from 'src/app/services/servicebd.service'; // Importa ServicebdService
import { NativeStorage } from '@awesome-cordova-plugins/native-storage/ngx'; // Importa NativeStorage

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

describe('FutbolitoPage', () => {
  let component: FutbolitoPage;
  let fixture: ComponentFixture<FutbolitoPage>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FutbolitoPage],
      imports: [
        IonicModule.forRoot(),
        RouterTestingModule
      ],
      providers: [
        SQLite, // Proveemos SQLite
        ServicebdService, // Proveemos el servicio ServicebdService
        { provide: NativeStorage, useClass: MockNativeStorage } // Mock de NativeStorage
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FutbolitoPage);
    component = fixture.componentInstance;

    fixture.detectChanges(); // Detectar los cambios para que Angular renderice la vista
  });

  it('should create', () => {
    expect(component).toBeTruthy(); // Verifica que el componente se crea correctamente
  });
});
