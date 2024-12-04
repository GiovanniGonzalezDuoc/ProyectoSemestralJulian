import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LoginPage } from './login.page';
import { IonicModule } from '@ionic/angular';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ServicebdService } from 'src/app/services/servicebd.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of } from 'rxjs';
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
    TestBed.configureTestingModule({
      declarations: [LoginPage],
      imports: [
        IonicModule.forRoot(),
        ReactiveFormsModule,
        FormsModule,
        HttpClientTestingModule
      ],
      providers: [
        {
          provide: ServicebdService,
          useValue: {
            login: jasmine.createSpy().and.returnValue(of(true)) // Simula un login exitoso
          }
        },
        { provide: NativeStorage, useClass: MockNativeStorage }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoginPage);
    component = fixture.componentInstance;
    servicebdService = TestBed.inject(ServicebdService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy(); // Verifica que el componente se crea correctamente
  });

});
