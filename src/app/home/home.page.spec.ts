import { ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { HomePage } from './home.page';
import { HeaderComponent } from '../components/header/header.component';
import { NativeStorage } from '@awesome-cordova-plugins/native-storage/ngx';  // Importamos NativeStorage

describe('HomePage', () => {
  let component: HomePage;
  let fixture: ComponentFixture<HomePage>;

  beforeEach(async () => {
    // Configuramos el módulo de pruebas
    await TestBed.configureTestingModule({
      declarations: [HomePage, HeaderComponent],  // Declaramos los componentes
      imports: [IonicModule.forRoot()],  // Importamos IonicModule
      providers: [
        {
          provide: NativeStorage,  // Mock de NativeStorage
          useValue: {
            getItem: jasmine.createSpy('getItem').and.returnValue(Promise.resolve('mock-value')),  // Simulamos el comportamiento del getItem
            setItem: jasmine.createSpy('setItem').and.returnValue(Promise.resolve()),  // Simulamos el comportamiento del setItem
          },
        },
      ],
    }).compileComponents();  // Compilamos los componentes

    // Creamos el fixture y el componente
    fixture = TestBed.createComponent(HomePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    // Comprobamos que el componente se crea correctamente
    expect(component).toBeTruthy();
  });
});
