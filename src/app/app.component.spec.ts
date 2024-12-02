import { TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { IonicModule } from '@ionic/angular';
import { NativeStorage } from '@awesome-cordova-plugins/native-storage/ngx';
import { ActivatedRoute, Router } from '@angular/router'; // Importa las dependencias necesarias
import { NavController } from '@ionic/angular';  // Importa NavController

describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AppComponent],
      imports: [IonicModule.forRoot()],
      providers: [
        {
          provide: NativeStorage, // Mock de NativeStorage
          useValue: {
            getItem: jasmine.createSpy('getItem').and.returnValue(Promise.resolve('mock-value')), // Simula un valor devuelto
            setItem: jasmine.createSpy('setItem').and.returnValue(Promise.resolve()),
          },
        },
        {
          provide: ActivatedRoute,  // Mock de ActivatedRoute
          useValue: {
            snapshot: {
              paramMap: {
                get: jasmine.createSpy('get').and.returnValue('mock-param'),  // Simula el comportamiento de paramMap
              },
            },
          },
        },
        {
          provide: Router,  // Mock de Router si es necesario en tu caso
          useValue: {
            navigate: jasmine.createSpy('navigate')
          }
        },
        {
          provide: NavController, // Mock de NavController
          useValue: {
            navigateForward: jasmine.createSpy('navigateForward'), // Simula la navegación
            navigateBack: jasmine.createSpy('navigateBack') // Simula la navegación hacia atrás
          }
        }
      ],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });
});
